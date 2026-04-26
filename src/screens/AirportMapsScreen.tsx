import React, { useLayoutEffect, useState, useRef } from 'react';
import {
    View, StyleSheet, TouchableOpacity, Text, SafeAreaView, StatusBar,
    Platform, Linking, ScrollView,
} from 'react-native';
import MapView, { Region, Marker } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, spacing, typography } from '../theme';
import { Airport } from '../data/airports-data';

const SEARCH_CATEGORIES = [
    { key: 'food', emoji: '🍽️', label: 'Food', tags: 'node["amenity"~"restaurant|fast_food"]' },
    { key: 'coffee', emoji: '☕', label: 'Coffee', tags: 'node["amenity"="cafe"]' },
    { key: 'lounge', emoji: '🛋️', label: 'Lounges', tags: 'node["aeroway"="lounge"]' },
    { key: 'shop', emoji: '🛍️', label: 'Shops', tags: 'node["shop"]' },
    { key: 'bar', emoji: '🍺', label: 'Bars', tags: 'node["amenity"="bar"]' },
    { key: 'pharmacy', emoji: '💊', label: 'Pharmacy', tags: 'node["amenity"="pharmacy"]' },
    { key: 'exchange', emoji: '💱', label: 'Exchange', tags: 'node["amenity"="bureau_de_change"]' },
    { key: 'charging', emoji: '🔌', label: 'Charging', tags: 'node["amenity"="charging_station"]' },
];

interface POI {
    id: number;
    lat: number;
    lon: number;
    tags: { name?: string; brand?: string };
}

export default function AirportMapsScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { airport } = route.params as { airport: Airport };
    const mapRef = useRef<MapView>(null);

    const [mapRegion] = useState<Region>({
        latitude: airport.coordinate.latitude,
        longitude: airport.coordinate.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    });

    const [poiMarkers, setPoiMarkers] = useState<POI[]>([]);
    const [loadingPoi, setLoadingPoi] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    // Open Apple Maps at the airport
    const openInMaps = () => {
        const { latitude, longitude } = airport.coordinate;
        if (Platform.OS === 'ios') {
            Linking.openURL(`maps://?ll=${latitude},${longitude}&z=17&q=${encodeURIComponent(airport.name)}`);
        } else {
            Linking.openURL(`geo:${latitude},${longitude}?z=17&q=${encodeURIComponent(airport.name)}`);
        }
    };

    // Search a category near the airport directly inside the app using Overpass API
    const searchInMaps = async (category: any) => {
        if (activeCategory === category.key) {
            setPoiMarkers([]);
            setActiveCategory(null);
            return;
        }

        setActiveCategory(category.key);
        setLoadingPoi(true);
        setPoiMarkers([]);

        const { latitude, longitude } = airport.coordinate;
        const radius = 1000; // 1km radius around airport center

        const query = `
            [out:json][timeout:25];
            (
              ${category.tags}(around:${radius},${latitude},${longitude});
            );
            out body;
            >;
            out skel qt;
        `;

        try {
            const res = await fetch('https://overpass-api.de/api/interpreter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `data=${encodeURIComponent(query)}`
            });
            const data = await res.json();
            
            // Filter elements that have a name and are nodes
            const pois = data.elements.filter((e: any) => e.type === 'node' && (e.tags?.name || e.tags?.brand));
            setPoiMarkers(pois);
        } catch (error) {
            console.error('POI Fetch Error:', error);
        } finally {
            setLoadingPoi(false);
        }
    };

    const resetMap = () => {
        setPoiMarkers([]);
        setActiveCategory(null);
        mapRef.current?.animateToRegion({
            latitude: airport.coordinate.latitude,
            longitude: airport.coordinate.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }, 500);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <SafeAreaView style={styles.headerSafe}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
                        <Text style={styles.backText}>←</Text>
                    </TouchableOpacity>
                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>{airport.iataCode} Airport</Text>
                        <Text style={styles.headerSub} numberOfLines={1}>{airport.name}</Text>
                    </View>
                    <TouchableOpacity style={styles.headerBtn} onPress={resetMap}>
                        <Text style={styles.resetText}>⟲</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {/* Full-screen Native Maps (Apple Maps on iOS, Google Maps on Android) */}
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={mapRegion}
                showsUserLocation={true}
                showsCompass={true}
                showsScale={true}
                showsIndoors={true}
                showsIndoorLevelPicker={true}
                showsPointsOfInterest={true}
                showsBuildings={true}
                pitchEnabled={true}
                rotateEnabled={true}
            >
                {poiMarkers.map((poi) => (
                    <Marker
                        key={poi.id}
                        coordinate={{ latitude: poi.lat, longitude: poi.lon }}
                        title={poi.tags.name || poi.tags.brand || "Location"}
                        pinColor={colors.primary.main}
                    />
                ))}
            </MapView>

            {/* Bottom Panel */}
            <View style={styles.bottomPanel}>
                {/* Open in Apple Maps */}
                <TouchableOpacity style={styles.mapsBtn} onPress={openInMaps} activeOpacity={0.8}>
                    <Text style={styles.mapsBtnEmoji}>🗺️</Text>
                    <View style={styles.mapsBtnText}>
                        <Text style={styles.mapsBtnTitle}>Open in Apple Maps</Text>
                        <Text style={styles.mapsBtnSub}>Tap businesses for hours, phone & more</Text>
                    </View>
                    <Text style={styles.mapsBtnChevron}>›</Text>
                </TouchableOpacity>

                {/* Quick Search Categories */}
                <View style={styles.catHeader}>
                    <Text style={styles.catTitle}>Find nearby at {airport.iataCode}</Text>
                    {loadingPoi && <Text style={styles.loadingText}>Searching...</Text>}
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catRow}>
                    {SEARCH_CATEGORIES.map(cat => (
                        <TouchableOpacity
                            key={cat.key}
                            style={[
                                styles.catChip,
                                activeCategory === cat.key && styles.catChipActive
                            ]}
                            onPress={() => searchInMaps(cat)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.catEmoji}>{cat.emoji}</Text>
                            <Text style={[
                                styles.catLabel,
                                activeCategory === cat.key && styles.catLabelActive
                            ]}>
                                {cat.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f8fa' },
    headerSafe: {
        backgroundColor: '#fff',
        zIndex: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        height: 50,
    },
    headerBtn: { padding: 8, width: 44, alignItems: 'center' },
    backText: { fontSize: 24, color: colors.primary.main, fontWeight: 'bold' },
    resetText: { fontSize: 22, color: colors.primary.main },
    headerCenter: { flex: 1, alignItems: 'center' },
    headerTitle: { fontSize: 17, fontWeight: '700', color: '#1a1a2e' },
    headerSub: { fontSize: 11, color: '#888' },
    map: { flex: 1 },
    bottomPanel: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: Platform.OS === 'ios' ? 30 : 16,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 8,
    },
    mapsBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f7',
        borderRadius: 14,
        padding: 14,
        marginBottom: 14,
    },
    mapsBtnEmoji: { fontSize: 26, marginRight: 12 },
    mapsBtnText: { flex: 1 },
    mapsBtnTitle: { fontSize: 15, fontWeight: '700', color: '#1a1a2e' },
    mapsBtnSub: { fontSize: 12, color: '#666', marginTop: 2 },
    mapsBtnChevron: { fontSize: 22, color: '#999' },
    catHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    catTitle: { fontSize: 14, fontWeight: '700', color: '#1a1a2e' },
    loadingText: { fontSize: 12, color: colors.primary.main, fontWeight: '600' },
    catRow: { gap: 8, paddingRight: 16 },
    catChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f7',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        gap: 5,
    },
    catChipActive: {
        backgroundColor: colors.primary.main,
    },
    catEmoji: { fontSize: 14 },
    catLabel: { fontSize: 12, fontWeight: '600', color: '#1a1a2e' },
    catLabelActive: { color: '#fff' },
});
