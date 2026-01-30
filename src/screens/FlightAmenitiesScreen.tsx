import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Platform, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getFlightData, getAircraftAmenities, FlightData, AircraftAmenities, getFlightStatusColor } from '../services/flight.service';

export default function FlightAmenitiesScreen({ route }: any) {
    const { flightNumber, departureDate, airline } = route.params;
    const [loading, setLoading] = useState(true);
    const [flightData, setFlightData] = useState<FlightData | null>(null);
    const [amenities, setAmenities] = useState<AircraftAmenities | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadFlightData();
    }, []);

    const loadFlightData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch real-time flight data
            const data = await getFlightData(flightNumber, departureDate);

            if (data) {
                setFlightData(data);
                // Get amenities based on aircraft model
                if (data.aircraft?.model) {
                    const amenitiesData = getAircraftAmenities(data.aircraft.model, data.airline);
                    setAmenities(amenitiesData);
                }
            } else {
                // If no data from API, use fallback
                setError('Flight data not yet available. Showing typical aircraft information.');
                // Use default amenities for the airline
                const defaultAmenities = getAircraftAmenities('A320', airline || 'Unknown');
                setAmenities(defaultAmenities);
            }
        } catch (err) {
            console.error('Error loading flight data:', err);
            setError('Unable to fetch flight information');
        } finally {
            setLoading(false);
        }
    };

    const renderStatusBadge = () => {
        if (!flightData) return null;
        const color = getFlightStatusColor(flightData.status);

        return (
            <View style={[styles.statusBadge, { backgroundColor: color }]}>
                <Text style={styles.statusText}>{flightData.status}</Text>
            </View>
        );
    };

    const renderAmenityCard = (
        icon: string,
        title: string,
        value: string,
        description?: string,
        available?: boolean
    ) => (
        <View style={styles.amenityCard}>
            <View style={styles.amenityHeader}>
                <Text style={styles.amenityIcon}>{icon}</Text>
                <View style={styles.amenityTitleContainer}>
                    <Text style={styles.amenityTitle}>{title}</Text>
                    {available !== undefined && (
                        <View style={[styles.availabilityDot, { backgroundColor: available ? '#4CAF50' : '#9E9E9E' }]} />
                    )}
                </View>
            </View>
            <Text style={styles.amenityValue}>{value}</Text>
            {description && <Text style={styles.amenityDescription}>{description}</Text>}
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1e3c72" />
                <Text style={styles.loadingText}>Fetching flight information...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <LinearGradient
                colors={['#1e3c72', '#2a5298']}
                style={styles.header}
            >
                <View style={styles.headerContent}>
                    <Text style={styles.headerFlightNumber}>{flightNumber}</Text>
                    <Text style={styles.headerAirline}>{flightData?.airline || airline || 'Airline'}</Text>
                    {renderStatusBadge()}
                </View>
            </LinearGradient>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {error && (
                    <View style={styles.errorBanner}>
                        <Text style={styles.errorIcon}>ℹ️</Text>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                )}

                {/* Flight Route Card */}
                {flightData && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>✈️ Flight Route</Text>
                        <View style={styles.routeContainer}>
                            <View style={styles.routePoint}>
                                <Text style={styles.routeCode}>{flightData.departure.airportCode}</Text>
                                <Text style={styles.routeAirport} numberOfLines={2}>{flightData.departure.airport}</Text>
                                {flightData.departure.terminal && (
                                    <Text style={styles.routeTerminal}>Terminal {flightData.departure.terminal}</Text>
                                )}
                                {flightData.departure.gate && (
                                    <Text style={styles.routeGate}>Gate {flightData.departure.gate}</Text>
                                )}
                            </View>
                            <View style={styles.routeArrow}>
                                <Text style={styles.routeArrowIcon}>→</Text>
                            </View>
                            <View style={styles.routePoint}>
                                <Text style={styles.routeCode}>{flightData.arrival.airportCode}</Text>
                                <Text style={styles.routeAirport} numberOfLines={2}>{flightData.arrival.airport}</Text>
                                {flightData.arrival.terminal && (
                                    <Text style={styles.routeTerminal}>Terminal {flightData.arrival.terminal}</Text>
                                )}
                                {flightData.arrival.gate && (
                                    <Text style={styles.routeGate}>Gate {flightData.arrival.gate}</Text>
                                )}
                            </View>
                        </View>
                    </View>
                )}

                {/* Aircraft Info Card */}
                {amenities && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>🛩️ Aircraft</Text>
                        <View style={styles.aircraftInfo}>
                            <View style={styles.aircraftMain}>
                                <Text style={styles.aircraftModel}>{amenities.model}</Text>
                                <Text style={styles.aircraftManufacturer}>{amenities.manufacturer}</Text>
                                {flightData?.aircraft?.registration && (
                                    <Text style={styles.aircraftReg}>Reg: {flightData.aircraft.registration}</Text>
                                )}
                            </View>
                            <View style={styles.aircraftStats}>
                                <View style={styles.statItem}>
                                    <Text style={styles.statValue}>{amenities.seatConfiguration}</Text>
                                    <Text style={styles.statLabel}>Config</Text>
                                </View>
                                {amenities.totalSeats && (
                                    <View style={styles.statItem}>
                                        <Text style={styles.statValue}>{amenities.totalSeats}</Text>
                                        <Text style={styles.statLabel}>Seats</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                )}

                {/* Amenities Cards */}
                {amenities && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>🎬 Amenities</Text>

                        {renderAmenityCard(
                            '📺',
                            'Entertainment',
                            amenities.entertainment.type,
                            amenities.entertainment.description,
                            amenities.entertainment.available
                        )}

                        {renderAmenityCard(
                            '🍽️',
                            'Food & Beverage',
                            amenities.food.type,
                            amenities.food.description,
                            amenities.food.available
                        )}

                        {renderAmenityCard(
                            '🔌',
                            'Power',
                            amenities.power.type,
                            undefined,
                            amenities.power.available
                        )}

                        {renderAmenityCard(
                            '📶',
                            'WiFi',
                            amenities.wifi.type,
                            undefined,
                            amenities.wifi.available
                        )}
                    </View>
                )}

                {/* Seat Features Card */}
                {amenities && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>💺 Seat Features</Text>
                        <View style={styles.seatGrid}>
                            <View style={styles.seatItem}>
                                <Text style={styles.seatIcon}>📏</Text>
                                <Text style={styles.seatLabel}>Legroom</Text>
                                <Text style={styles.seatValue}>{amenities.seatFeatures.legroom}</Text>
                            </View>
                            <View style={styles.seatItem}>
                                <Text style={styles.seatIcon}>↕️</Text>
                                <Text style={styles.seatLabel}>Recline</Text>
                                <Text style={styles.seatValue}>{amenities.seatFeatures.recline ? 'Yes' : 'No'}</Text>
                            </View>
                            <View style={styles.seatItem}>
                                <Text style={styles.seatIcon}>↔️</Text>
                                <Text style={styles.seatLabel}>Width</Text>
                                <Text style={styles.seatValue}>{amenities.seatFeatures.width}</Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* Images Placeholder */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>📸 Cabin Photos</Text>
                    <View style={styles.imagesPlaceholder}>
                        <Text style={styles.placeholderIcon}>🖼️</Text>
                        <Text style={styles.placeholderText}>Aircraft images coming soon</Text>
                        <Text style={styles.placeholderSubtext}>Add photos manually in assets/aircraft/</Text>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f7fa',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 24,
        paddingHorizontal: 20,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    headerFlightNumber: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 12,
    },
    headerAirline: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.9)',
        flex: 1,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    statusText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    errorBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF3E0',
        padding: 12,
        borderRadius: 12,
        marginBottom: 16,
    },
    errorIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    errorText: {
        flex: 1,
        fontSize: 14,
        color: '#E65100',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
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
    routeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    routePoint: {
        flex: 1,
    },
    routeCode: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    routeAirport: {
        fontSize: 13,
        color: '#666',
        marginTop: 4,
    },
    routeTerminal: {
        fontSize: 12,
        color: '#1e3c72',
        marginTop: 4,
        fontWeight: '500',
    },
    routeGate: {
        fontSize: 12,
        color: '#4CAF50',
        fontWeight: '600',
    },
    routeArrow: {
        paddingHorizontal: 16,
    },
    routeArrowIcon: {
        fontSize: 24,
        color: '#1e3c72',
    },
    aircraftInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    aircraftMain: {
        flex: 1,
    },
    aircraftModel: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    aircraftManufacturer: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    aircraftReg: {
        fontSize: 13,
        color: '#999',
        marginTop: 8,
        fontStyle: 'italic',
    },
    aircraftStats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statItem: {
        alignItems: 'center',
        marginLeft: 24,
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1e3c72',
    },
    statLabel: {
        fontSize: 11,
        color: '#999',
        marginTop: 2,
    },
    amenityCard: {
        backgroundColor: '#f8f9fb',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    amenityHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    amenityIcon: {
        fontSize: 24,
        marginRight: 12,
    },
    amenityTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    amenityTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    availabilityDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 8,
    },
    amenityValue: {
        fontSize: 15,
        fontWeight: '500',
        color: '#1e3c72',
        marginLeft: 36,
    },
    amenityDescription: {
        fontSize: 13,
        color: '#666',
        marginTop: 6,
        marginLeft: 36,
    },
    seatGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    seatItem: {
        alignItems: 'center',
        padding: 12,
    },
    seatIcon: {
        fontSize: 28,
        marginBottom: 8,
    },
    seatLabel: {
        fontSize: 12,
        color: '#999',
    },
    seatValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginTop: 4,
        textAlign: 'center',
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
});
