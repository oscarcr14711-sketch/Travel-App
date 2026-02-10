import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, StatusBar, Platform } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, spacing, typography } from '../theme';
import { Airport } from '../data/airports-data';

export default function AirportMapsScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { airport } = route.params as { airport: Airport };

    const [mapRegion, setMapRegion] = useState<Region>({
        latitude: airport.coordinate.latitude,
        longitude: airport.coordinate.longitude,
        latitudeDelta: 0.01, // Zoomed in for terminals
        longitudeDelta: 0.01,
    });

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <SafeAreaView style={styles.headerContainer}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}>{airport.iataCode} Map</Text>
                        <Text style={styles.headerSubtitle}>{airport.name}</Text>
                    </View>
                    <View style={styles.placeholderButton} />
                </View>
            </SafeAreaView>

            {/* Map */}
            <MapView
                style={styles.map}

                initialRegion={mapRegion}
                showsUserLocation={true}
                showsCompass={true}
                showsScale={true}
                showsIndoors={true} // Enable indoor maps
                showsIndoorLevelPicker={true} // Enable floor picker
                showsPointsOfInterest={true}
                showsBuildings={true}
                pitchEnabled={true}
                rotateEnabled={true}
            />

            {/* Info Overlay */}
            <View style={styles.infoOverlay}>
                <View style={styles.infoContent}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoIcon}>🏢</Text>
                        <Text style={styles.infoText}>
                            {airport.hasIndoorMap
                                ? 'Indoor maps available. Zoom in to see terminals.'
                                : 'Standard map view.'}
                        </Text>
                    </View>
                    <Text style={styles.hintText}>
                        Tip: Use the level picker on the side to change floors.
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light.background,
    },
    headerContainer: {
        backgroundColor: colors.neutral.white,
        zIndex: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        height: 50,
    },
    backButton: {
        padding: spacing.sm,
        width: 40,
        alignItems: 'flex-start',
    },
    backButtonText: {
        fontSize: 24,
        color: colors.primary.main,
        fontWeight: 'bold',
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerTitle: {
        ...typography.styles.h4,
        color: colors.light.text,
    },
    headerSubtitle: {
        ...typography.styles.caption,
        color: colors.light.textSecondary,
        numberOfLines: 1,
    },
    placeholderButton: {
        width: 40,
    },
    map: {
        flex: 1,
    },
    infoOverlay: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: spacing.md,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 5,
    },
    infoContent: {
        gap: spacing.xs,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    infoIcon: {
        fontSize: 18,
    },
    infoText: {
        ...typography.styles.body,
        color: colors.light.text,
        flex: 1,
    },
    hintText: {
        ...typography.styles.caption,
        color: colors.light.textSecondary,
        fontStyle: 'italic',
        marginTop: 4,
    },
});
