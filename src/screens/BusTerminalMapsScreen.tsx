import React, { useLayoutEffect, useState, useRef } from 'react';
import {
    View, StyleSheet, TouchableOpacity, Text, SafeAreaView, StatusBar,
    Platform, Linking, ScrollView,
} from 'react-native';
import MapView, { Region } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../theme';
import { BusTerminal } from '../data/bus-terminals.data';

const SEARCH_CATEGORIES = [
    { key: 'food', emoji: '🍽️', label: 'Food', query: 'restaurant' },
    { key: 'coffee', emoji: '☕', label: 'Coffee', query: 'coffee' },
    { key: 'shop', emoji: '🛍️', label: 'Shops', query: 'shop' },
    { key: 'atm', emoji: '🏧', label: 'ATM', query: 'ATM' },
    { key: 'pharmacy', emoji: '💊', label: 'Pharmacy', query: 'pharmacy' },
    { key: 'taxi', emoji: '🚕', label: 'Taxi', query: 'taxi stand' },
    { key: 'gas', emoji: '⛽', label: 'Gas', query: 'gas station' },
    { key: 'hotel', emoji: '🏨', label: 'Hotels', query: 'hotel' },
];

export default function BusTerminalMapsScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { terminal } = route.params as { terminal: BusTerminal };
    const mapRef = useRef<MapView>(null);

    const [mapRegion] = useState<Region>({
        latitude: terminal.coordinate.latitude,
        longitude: terminal.coordinate.longitude,
        latitudeDelta: 0.006,
        longitudeDelta: 0.006,
    });

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const openInMaps = () => {
        const { latitude, longitude } = terminal.coordinate;
        if (Platform.OS === 'ios') {
            Linking.openURL(`maps://?ll=${latitude},${longitude}&z=17&q=${encodeURIComponent(terminal.name)}`);
        } else {
            Linking.openURL(`geo:${latitude},${longitude}?z=17&q=${encodeURIComponent(terminal.name)}`);
        }
    };

    const searchInMaps = (query: string) => {
        const { latitude, longitude } = terminal.coordinate;
        if (Platform.OS === 'ios') {
            Linking.openURL(`maps://?q=${encodeURIComponent(query)}&sll=${latitude},${longitude}&z=17`);
        } else {
            Linking.openURL(`geo:${latitude},${longitude}?q=${encodeURIComponent(query)}`);
        }
    };

    const resetMap = () => {
        mapRef.current?.animateToRegion({
            latitude: terminal.coordinate.latitude,
            longitude: terminal.coordinate.longitude,
            latitudeDelta: 0.006,
            longitudeDelta: 0.006,
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
                        <Text style={styles.headerTitle}>🚌 {terminal.shortName}</Text>
                        <Text style={styles.headerSub} numberOfLines={1}>{terminal.name}</Text>
                    </View>
                    <TouchableOpacity style={styles.headerBtn} onPress={resetMap}>
                        <Text style={styles.resetText}>⟲</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {/* Full-screen Map */}
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
            />

            {/* Bottom Panel */}
            <View style={styles.bottomPanel}>
                <TouchableOpacity style={styles.mapsBtn} onPress={openInMaps} activeOpacity={0.8}>
                    <Text style={styles.mapsBtnEmoji}>🗺️</Text>
                    <View style={styles.mapsBtnText}>
                        <Text style={styles.mapsBtnTitle}>Open in Maps</Text>
                        <Text style={styles.mapsBtnSub}>Tap businesses for hours, phone & more</Text>
                    </View>
                    <Text style={styles.mapsBtnChevron}>›</Text>
                </TouchableOpacity>

                <Text style={styles.catTitle}>Find nearby at {terminal.shortName}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catRow}>
                    {SEARCH_CATEGORIES.map(cat => (
                        <TouchableOpacity
                            key={cat.key}
                            style={styles.catChip}
                            onPress={() => searchInMaps(cat.query)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.catEmoji}>{cat.emoji}</Text>
                            <Text style={styles.catLabel}>{cat.label}</Text>
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
    catTitle: { fontSize: 14, fontWeight: '700', color: '#1a1a2e', marginBottom: 8 },
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
    catEmoji: { fontSize: 14 },
    catLabel: { fontSize: 12, fontWeight: '600', color: '#1a1a2e' },
});
