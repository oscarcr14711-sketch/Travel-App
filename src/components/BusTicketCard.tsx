import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trip } from '../types/trip.types';
import { getBusColors } from '../utils/logoMapper';

interface BusTicketCardProps {
    trip: Trip;
    onDelete: (id: string) => void;
    onViewDetails?: () => void;
}

export default function BusTicketCard({ trip, onDelete, onViewDetails }: BusTicketCardProps) {
    const [timeRemaining, setTimeRemaining] = useState('');
    const [duration, setDuration] = useState('');

    useEffect(() => {
        const calculateTimeRemaining = () => {
            try {
                const departureDateTime = new Date(`${trip.departureDate} ${trip.departureTime}`);
                const now = new Date();
                const diff = departureDateTime.getTime() - now.getTime();

                if (isNaN(diff) || diff < 0) {
                    setTimeRemaining('Departed');
                    return;
                }

                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

                if (days > 0) {
                    setTimeRemaining(`${days}d ${hours}h`);
                } else if (hours > 0) {
                    setTimeRemaining(`${hours}h ${minutes}m`);
                } else if (minutes > 0) {
                    setTimeRemaining(`${minutes}m`);
                } else {
                    setTimeRemaining('Soon');
                }
            } catch {
                setTimeRemaining('--');
            }
        };

        const calculateDuration = () => {
            try {
                const departureDateTime = new Date(`${trip.departureDate} ${trip.departureTime}`);
                const arrivalDateTime = new Date(`${trip.arrivalDate} ${trip.arrivalTime}`);
                const diff = arrivalDateTime.getTime() - departureDateTime.getTime();

                if (isNaN(diff) || diff <= 0) {
                    setDuration('Direct');
                    return;
                }

                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

                if (hours > 0) {
                    setDuration(`${hours}h ${minutes}m`);
                } else {
                    setDuration(`${minutes}m`);
                }
            } catch {
                setDuration('--');
            }
        };

        calculateTimeRemaining();
        calculateDuration();
        const interval = setInterval(calculateTimeRemaining, 60000);

        return () => clearInterval(interval);
    }, [trip]);

    const gradientColors = getBusColors(trip.busCompany || '') as [string, string, ...string[]];
    const origin = trip.origin || trip.departureStation || 'Origin';
    const destination = trip.destination || trip.arrivalStation || 'Destination';

    return (
        <View style={styles.cardContainer}>
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
            >
                {/* Header Row */}
                <View style={styles.header}>
                    <View style={styles.companyInfo}>
                        <View style={styles.companyTextContainer}>
                            <Text style={styles.companyName}>{trip.busCompany || 'Bus'}</Text>
                            {trip.busNumber && (
                                <Text style={styles.busNumber}>Bus #{trip.busNumber}</Text>
                            )}
                        </View>
                    </View>
                    {timeRemaining !== 'Departed' && (
                        <View style={styles.countdownBadge}>
                            <Text style={styles.countdownLabel}>Departs in</Text>
                            <Text style={styles.countdownValue}>{timeRemaining}</Text>
                        </View>
                    )}
                </View>

                {/* Route Section */}
                <View style={styles.routeSection}>
                    <View style={styles.routeEndpoint}>
                        <Text style={styles.cityCode}>{origin.slice(0, 3).toUpperCase()}</Text>
                        <Text style={styles.cityName} numberOfLines={1}>{origin}</Text>
                        <Text style={styles.timeText}>{trip.departureTime}</Text>
                    </View>

                    <View style={styles.routeMiddle}>
                        <View style={styles.routeLine}>
                            <View style={styles.routeDot} />
                            <View style={styles.dottedLine} />
                            <Text style={styles.busIcon}>🚌</Text>
                            <View style={styles.dottedLine} />
                            <View style={styles.routeDot} />
                        </View>
                        <Text style={styles.durationText}>{duration}</Text>
                    </View>

                    <View style={styles.routeEndpoint}>
                        <Text style={styles.cityCode}>{destination.slice(0, 3).toUpperCase()}</Text>
                        <Text style={styles.cityName} numberOfLines={1}>{destination}</Text>
                        <Text style={styles.timeText}>{trip.arrivalTime || '--:--'}</Text>
                    </View>
                </View>

                {/* Date Row */}
                <View style={styles.dateRow}>
                    <View style={styles.dateItem}>
                        <Text style={styles.dateLabel}>📅 Departure</Text>
                        <Text style={styles.dateValue}>{trip.departureDate}</Text>
                    </View>
                    {trip.arrivalDate && (
                        <View style={styles.dateItem}>
                            <Text style={styles.dateLabel}>📅 Arrival</Text>
                            <Text style={styles.dateValue}>{trip.arrivalDate}</Text>
                        </View>
                    )}
                </View>

                {/* Ticket Tear Line */}
                <View style={styles.tearLine}>
                    {Array.from({ length: 20 }).map((_, i) => (
                        <View key={i} style={styles.tearDot} />
                    ))}
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    {onViewDetails && (
                        <TouchableOpacity style={styles.viewDetailsBtn} onPress={onViewDetails}>
                            <Text style={styles.viewDetailsBtnText}>View Details →</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(trip.id)}>
                        <Text style={styles.deleteBtnText}>🗑️</Text>
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
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
            },
            android: {
                elevation: 12,
            },
        }),
    },
    card: {
        borderRadius: 20,
        padding: 20,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    companyInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    companyTextContainer: {
        flex: 1,
    },
    companyName: {
        fontSize: 19,
        fontWeight: '700',
        color: '#fff',
    },
    busNumber: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.85)',
        marginTop: 3,
        fontWeight: '500',
    },
    countdownBadge: {
        backgroundColor: 'rgba(255,255,255,0.25)',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    countdownLabel: {
        fontSize: 10,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 2,
        fontWeight: '600',
    },
    countdownValue: {
        fontSize: 17,
        fontWeight: '800',
        color: '#fff',
    },
    routeSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    routeEndpoint: {
        flex: 1,
        alignItems: 'center',
    },
    cityCode: {
        fontSize: 30,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: 1,
    },
    cityName: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.85)',
        marginTop: 4,
        textAlign: 'center',
    },
    timeText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
        marginTop: 6,
    },
    routeMiddle: {
        flex: 1.2,
        alignItems: 'center',
    },
    routeLine: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    routeDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.7)',
    },
    dottedLine: {
        flex: 1,
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.4)',
    },
    busIcon: {
        fontSize: 22,
        marginHorizontal: 4,
    },
    durationText: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.85)',
        marginTop: 8,
        fontWeight: '600',
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 12,
        padding: 14,
        marginBottom: 16,
    },
    dateItem: {
        alignItems: 'center',
    },
    dateLabel: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 4,
    },
    dateValue: {
        fontSize: 14,
        fontWeight: '700',
        color: '#fff',
    },
    tearLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    tearDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.25)',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewDetailsBtn: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    viewDetailsBtnText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#fff',
    },
    deleteBtn: {
        padding: 8,
    },
    deleteBtnText: {
        fontSize: 20,
    },
});
