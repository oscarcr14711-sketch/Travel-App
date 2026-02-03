import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAircraftData, getClassAmenities, ClassAmenities } from '../data/aircraft.data';
import { CabinClass } from '../types/trip.types';

// Helper to format cabin class name
const getCabinClassName = (cabinClass: CabinClass): string => {
    const names: Record<CabinClass, string> = {
        economy: 'Economy',
        premium_economy: 'Premium Economy',
        business: 'Business Class',
        first: 'First Class'
    };
    return names[cabinClass];
};

// Helper to get cabin class icon
const getCabinClassIcon = (cabinClass: CabinClass): string => {
    const icons: Record<CabinClass, string> = {
        economy: '💺',
        premium_economy: '✈️',
        business: '🛫',
        first: '👑'
    };
    return icons[cabinClass];
};

export default function FlightAmenitiesScreen({ route, navigation }: any) {
    const { trip } = route.params;

    // Use the aircraft model from the trip, or default to A320 if not specified
    const aircraftModel = trip.aircraftModel || 'A320';
    const cabinClass: CabinClass = trip.cabinClass || 'economy';

    const aircraft = getAircraftData(aircraftModel);
    const amenities = getClassAmenities(aircraftModel, cabinClass);

    const renderFeatureList = (title: string, icon: string, items: string[]) => {
        if (!items || items.length === 0) return null;

        return (
            <View style={styles.featureSection}>
                <Text style={styles.featureSectionTitle}>{icon} {title}</Text>
                {items.map((item, index) => (
                    <View key={index} style={styles.featureItem}>
                        <Text style={styles.featureBullet}>•</Text>
                        <Text style={styles.featureText}>{item}</Text>
                    </View>
                ))}
            </View>
        );
    };

    const renderSeatDetails = (amenities: ClassAmenities) => (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>💺 Seating Details</Text>
            <View style={styles.seatGrid}>
                <View style={styles.seatStat}>
                    <Text style={styles.seatStatLabel}>Seat Type</Text>
                    <Text style={styles.seatStatValue}>{amenities.seatType}</Text>
                </View>
                <View style={styles.seatStat}>
                    <Text style={styles.seatStatLabel}>Width</Text>
                    <Text style={styles.seatStatValue}>{amenities.seatWidth}</Text>
                </View>
                <View style={styles.seatStat}>
                    <Text style={styles.seatStatLabel}>Pitch</Text>
                    <Text style={styles.seatStatValue}>{amenities.seatPitch}</Text>
                </View>
                <View style={styles.seatStat}>
                    <Text style={styles.seatStatLabel}>Recline</Text>
                    <Text style={styles.seatStatValue}>{amenities.recline}</Text>
                </View>
            </View>
        </View>
    );

    if (!amenities) {
        return (
            <View style={styles.container}>
                <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={styles.backText}>← Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Flight Amenities</Text>
                </LinearGradient>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorIcon}>⚠️</Text>
                    <Text style={styles.errorText}>Amenities data not available for this cabin class</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>✈️ {trip.airline || 'Flight'} {trip.flightNumber}</Text>
                    <Text style={styles.headerSubtitle}>{trip.origin} → {trip.destination}</Text>
                </View>
            </LinearGradient>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Cabin Class Banner */}
                <View style={styles.classBanner}>
                    <Text style={styles.classBannerIcon}>{getCabinClassIcon(cabinClass)}</Text>
                    <View style={styles.classBannerText}>
                        <Text style={styles.classBannerTitle}>Your Cabin Class</Text>
                        <Text style={styles.classBannerClass}>{getCabinClassName(cabinClass)}</Text>
                    </View>
                </View>

                {/* Disclaimer */}
                <View style={styles.disclaimerBanner}>
                    <Text style={styles.disclaimerIcon}>ℹ️</Text>
                    <Text style={styles.disclaimerText}>
                        Amenities shown are typical for this aircraft and cabin class. Actual configurations may vary by specific aircraft, route, or recent upgrades.
                    </Text>
                </View>

                {/* Aircraft Info */}
                {aircraft && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>🛩️ Aircraft</Text>
                        <Text style={styles.aircraftModel}>{aircraft.manufacturer} {aircraft.model}</Text>
                        <Text style={styles.aircraftVariant}>{aircraft.variant}</Text>
                    </View>
                )}

                {/* Seating */}
                {renderSeatDetails(amenities)}

                {/* Features */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>✨ Seat Features</Text>
                    {renderFeatureList('Features', '🪑', amenities.features)}
                </View>

                {/* Entertainment */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>🎬 Entertainment</Text>
                    {renderFeatureList('Available', '📺', amenities.entertainment)}
                </View>

                {/* Power */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>🔌 Power & Connectivity</Text>
                    {renderFeatureList('Power Options', '⚡', amenities.power)}
                </View>

                {/* Food & Beverage */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>🍽️ Food & Beverage</Text>
                    {renderFeatureList('Food', '🍴', amenities.food)}
                    {renderFeatureList('Beverages', '🥤', amenities.beverages)}
                </View>

                {/* Extras */}
                {amenities.extras && amenities.extras.length > 0 && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>🎁 Additional Benefits</Text>
                        {renderFeatureList('Perks', '⭐', amenities.extras)}
                    </View>
                )}

                {/* Images Placeholder */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>📸 Cabin Photos</Text>
                    <View style={styles.imagesPlaceholder}>
                        <Text style={styles.placeholderIcon}>🖼️</Text>
                        <Text style={styles.placeholderText}>Aircraft images coming soon</Text>
                        <Text style={styles.placeholderSubtext}>You can add photos manually to assets/aircraft/</Text>
                    </View>
                </View>

                {/* Bottom Padding */}
                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 24,
        paddingHorizontal: 20,
    },
    backButton: {
        marginBottom: 12,
    },
    backText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    headerContent: {
        marginTop: 8,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 6,
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    classBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: '#3B82F6',
        ...Platform.select({
            ios: {
                shadowColor: '#3B82F6',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    classBannerIcon: {
        fontSize: 48,
        marginRight: 16,
    },
    classBannerText: {
        flex: 1,
    },
    classBannerTitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    classBannerClass: {
        fontSize: 22,
        fontWeight: '700',
        color: '#3B82F6',
    },
    disclaimerBanner: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#FFF9E6',
        borderRadius: 12,
        padding: 14,
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#F59E0B',
    },
    disclaimerIcon: {
        fontSize: 18,
        marginRight: 10,
        marginTop: 1,
    },
    disclaimerText: {
        flex: 1,
        fontSize: 13,
        lineHeight: 18,
        color: '#92400E',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
            },
            android: {
                elevation: 4,
            },
        }),
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1e3c72',
        marginBottom: 16,
    },
    aircraftModel: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    aircraftVariant: {
        fontSize: 14,
        color: '#666',
    },
    seatGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    seatStat: {
        backgroundColor: '#f8f9fb',
        borderRadius: 12,
        padding: 16,
        width: '48%',
    },
    seatStatLabel: {
        fontSize: 12,
        color: '#999',
        marginBottom: 6,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    seatStatValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    featureSection: {
        marginBottom: 16,
    },
    featureSectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1e3c72',
        marginBottom: 10,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
        paddingLeft: 8,
    },
    featureBullet: {
        fontSize: 16,
        color: '#3B82F6',
        marginRight: 8,
        marginTop: 1,
    },
    featureText: {
        flex: 1,
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    imagesPlaceholder: {
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#f8f9fb',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#e0e0e0',
        borderStyle: 'dashed',
    },
    placeholderIcon: {
        fontSize: 48,
        marginBottom: 12,
    },
    placeholderText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    placeholderSubtext: {
        fontSize: 12,
        color: '#999',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    errorIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    errorText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});
