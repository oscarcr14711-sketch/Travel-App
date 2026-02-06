import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trip } from '../types/trip.types';
import { useTheme } from '../context/ThemeContext';

interface BusTicketCardProps {
    trip: Trip;
    onDelete: (id: string) => void;
    onViewDetails?: () => void;
    onViewAmenities?: () => void;
}

export default function BusTicketCard({ trip, onDelete, onViewDetails, onViewAmenities }: BusTicketCardProps) {
    const { theme } = useTheme();

    return (
        <View style={[styles.cardContainer, { shadowColor: theme.busCardShadow }]}>
            <LinearGradient
                colors={theme.busCardColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.companyName}>{trip.busCompany || 'Bus Company'}</Text>
                    <Text style={styles.busNumber}>Bus #{trip.busNumber || 'N/A'}</Text>
                </View>

                {/* Route Visualization */}
                <View style={styles.routeContainer}>
                    <View style={styles.stationContainer}>
                        <Text style={styles.stationCode}>{trip.origin || 'XXX'}</Text>
                        <Text style={styles.cityName} numberOfLines={1}>
                            {trip.origin === 'MEX' ? 'Mexico City' :
                                trip.origin === 'MTY' ? 'Monterrey' :
                                    trip.origin === 'GDL' ? 'Guadalajara' :
                                        trip.origin}
                        </Text>
                        <Text style={styles.time}>{trip.departureTime || '--:--'}</Text>
                    </View>

                    <View style={styles.routeLine}>
                        <View style={styles.dashedLine} />
                        <Text style={styles.busIcon}>🚌</Text>
                        <View style={styles.dashedLine} />
                        <Text style={styles.directLabel}>Direct</Text>
                    </View>

                    <View style={styles.stationContainer}>
                        <Text style={styles.stationCode}>{trip.destination || 'XXX'}</Text>
                        <Text style={styles.cityName} numberOfLines={1}>
                            {trip.destination === 'MEX' ? 'Mexico City' :
                                trip.destination === 'MTY' ? 'Monterrey' :
                                    trip.destination === 'GDL' ? 'Guadalajara' :
                                        trip.destination}
                        </Text>
                        <Text style={styles.time}>{trip.arrivalTime || '--:--'}</Text>
                    </View>
                </View>

                {/* Date Row */}
                <View style={styles.dateRow}>
                    <View style={styles.dateItem}>
                        <View style={styles.dateHeader}>
                            <Text style={styles.dateIcon}>📅</Text>
                            <Text style={styles.dateLabel}>Departure</Text>
                        </View>
                        <Text style={styles.dateValue}>{trip.departureDate || 'N/A'}</Text>
                    </View>
                    <View style={styles.dateItem}>
                        <View style={styles.dateHeader}>
                            <Text style={styles.dateIcon}>📅</Text>
                            <Text style={styles.dateLabel}>Arrival</Text>
                        </View>
                        <Text style={styles.dateValue}>{trip.arrivalDate || trip.departureDate || 'N/A'}</Text>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionRow}>
                    <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={onViewDetails}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.detailsButtonText}>View Details →</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.amenitiesButton}
                        onPress={onViewAmenities}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.amenitiesIcon}>🚌</Text>
                        <Text style={styles.amenitiesText}>Amenities</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => onDelete(trip.id)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.deleteIcon}>🗑</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 20,
        overflow: 'hidden',
        // Teal/green glow effect
        shadowColor: '#3a9a8a',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },
    card: {
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(100, 140, 200, 0.3)',
    },
    header: {
        marginBottom: 20,
    },
    companyName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 2,
    },
    busNumber: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.6)',
    },
    routeContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    stationContainer: {
        flex: 1,
        alignItems: 'center',
    },
    stationCode: {
        fontSize: 32,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 4,
    },
    cityName: {
        fontSize: 11,
        color: 'rgba(255, 255, 255, 0.6)',
        marginBottom: 4,
        textAlign: 'center',
    },
    time: {
        fontSize: 14,
        fontWeight: '600',
        color: '#ffffff',
    },
    routeLine: {
        flex: 1.2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 8,
    },
    dashedLine: {
        width: '80%',
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginVertical: 4,
    },
    busIcon: {
        fontSize: 18,
    },
    directLabel: {
        fontSize: 10,
        color: 'rgba(255, 255, 255, 0.5)',
        marginTop: 2,
    },
    dateRow: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        gap: 12,
    },
    dateItem: {
        flex: 1,
    },
    dateHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 4,
    },
    dateIcon: {
        fontSize: 12,
    },
    dateLabel: {
        fontSize: 11,
        color: 'rgba(255, 255, 255, 0.6)',
    },
    dateValue: {
        fontSize: 13,
        fontWeight: '600',
        color: '#ffffff',
    },
    actionRow: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    detailsButton: {
        flex: 1,
        backgroundColor: 'rgba(80, 120, 180, 0.4)',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(100, 150, 220, 0.4)',
    },
    detailsButtonText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#ffffff',
    },
    amenitiesButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(80, 120, 180, 0.4)',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(100, 150, 220, 0.4)',
        paddingVertical: 12,
        paddingHorizontal: 12,
        gap: 4,
    },
    amenitiesIcon: {
        fontSize: 14,
    },
    amenitiesText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#ffffff',
    },
    deleteButton: {
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteIcon: {
        fontSize: 16,
    },
});
