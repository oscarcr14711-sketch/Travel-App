import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '../theme';
import { Trip } from '../types/trip.types';
import { getCompanyLogoUrl } from '../utils/logoMapper';

interface BusTicketCardProps {
    trip: Trip;
    onDelete: (id: string) => void;
}

export default function BusTicketCard({ trip, onDelete }: BusTicketCardProps) {
    const [timeRemaining, setTimeRemaining] = useState('');

    useEffect(() => {
        const calculateTimeRemaining = () => {
            const departureDateTime = new Date(`${trip.departureDate} ${trip.departureTime}`);
            const now = new Date();
            const diff = departureDateTime.getTime() - now.getTime();

            if (diff < 0) {
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
            } else {
                setTimeRemaining(`${minutes}m`);
            }
        };

        calculateTimeRemaining();
        const interval = setInterval(calculateTimeRemaining, 60000);

        return () => clearInterval(interval);
    }, [trip.departureDate, trip.departureTime]);

    return (
        <View style={styles.card}>
            {/* Header with bus company and countdown */}
            <View style={styles.header}>
                <View style={styles.companySection}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={{ uri: getCompanyLogoUrl(trip.busCompany || '') || '' }}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.companyName}>{trip.busCompany}</Text>
                </View>
                <View style={styles.countdownBadge}>
                    <Text style={styles.countdownText}>{timeRemaining}</Text>
                </View>
            </View>

            {/* Route details */}
            <View style={styles.detailsSection}>
                <View style={styles.routeInfo}>
                    <View style={styles.locationBlock}>
                        <Text style={styles.locationLabel}>From</Text>
                        <Text style={styles.locationText}>
                            {trip.origin || trip.departureStation || 'Origin'}
                        </Text>
                    </View>
                    <View style={styles.arrowContainer}>
                        <Text style={styles.arrow}>→</Text>
                    </View>
                    <View style={styles.locationBlock}>
                        <Text style={styles.locationLabel}>To</Text>
                        <Text style={styles.locationText}>
                            {trip.arrivalStation || trip.destination}
                        </Text>
                    </View>
                </View>

                {/* Time info */}
                <View style={styles.timeInfo}>
                    <View style={styles.timeBlock}>
                        <Text style={styles.timeLabel}>Departure</Text>
                        <Text style={styles.timeValue}>{trip.departureTime}</Text>
                        <Text style={styles.dateValue}>{trip.departureDate}</Text>
                    </View>
                    {trip.arrivalTime && (
                        <View style={styles.timeBlock}>
                            <Text style={styles.timeLabel}>Arrival</Text>
                            <Text style={styles.timeValue}>{trip.arrivalTime}</Text>
                            <Text style={styles.dateValue}>{trip.arrivalDate}</Text>
                        </View>
                    )}
                </View>

                {/* Bus number */}
                {trip.busNumber && (
                    <View style={styles.busNumberSection}>
                        <Text style={styles.busNumberLabel}>Bus</Text>
                        <Text style={styles.busNumberValue}>{trip.busNumber}</Text>
                    </View>
                )}
            </View>

            {/* Footer note */}
            <View style={styles.footer}>
                <Text style={styles.footerNote}>
                    📱 This digital ticket can be shown to the driver
                </Text>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => onDelete(trip.id)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.deleteButtonText}>🗑️ Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.neutral.white,
        borderRadius: 16,
        marginHorizontal: spacing.lg,
        marginBottom: spacing.lg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.lg,
        backgroundColor: '#10B981',
    },
    companySection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    logoContainer: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.neutral.white,
        borderRadius: 16,
        overflow: 'hidden',
    },
    logo: {
        width: 24,
        height: 24,
    },
    companyEmoji: {
        fontSize: 24,
    },
    companyName: {
        ...typography.styles.h4,
        fontSize: 18,
        fontWeight: '700',
        color: colors.neutral.white,
    },
    countdownBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: 12,
    },
    countdownText: {
        ...typography.styles.bodySmall,
        fontSize: 14,
        fontWeight: '600',
        color: colors.neutral.white,
    },
    detailsSection: {
        padding: spacing.lg,
        gap: spacing.lg,
    },
    routeInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    locationBlock: {
        flex: 1,
    },
    locationLabel: {
        ...typography.styles.bodySmall,
        fontSize: 12,
        color: colors.neutral.gray500,
        marginBottom: spacing.xs,
    },
    locationText: {
        ...typography.styles.h5,
        fontSize: 16,
        fontWeight: '600',
        color: colors.neutral.gray800,
    },
    arrowContainer: {
        paddingHorizontal: spacing.md,
    },
    arrow: {
        fontSize: 24,
        color: colors.neutral.gray400,
    },
    timeInfo: {
        flexDirection: 'row',
        gap: spacing.lg,
    },
    timeBlock: {
        flex: 1,
        backgroundColor: colors.light.surface,
        padding: spacing.md,
        borderRadius: 12,
    },
    timeLabel: {
        ...typography.styles.bodySmall,
        fontSize: 12,
        color: colors.neutral.gray500,
        marginBottom: spacing.xs,
    },
    timeValue: {
        ...typography.styles.h4,
        fontSize: 18,
        fontWeight: '700',
        color: colors.neutral.gray800,
    },
    dateValue: {
        ...typography.styles.bodySmall,
        fontSize: 12,
        color: colors.neutral.gray600,
        marginTop: spacing.xs,
    },
    busNumberSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    busNumberLabel: {
        ...typography.styles.body,
        fontSize: 14,
        color: colors.neutral.gray600,
    },
    busNumberValue: {
        ...typography.styles.body,
        fontSize: 14,
        fontWeight: '600',
        color: colors.neutral.gray800,
    },
    footer: {
        backgroundColor: '#D1FAE5',
        padding: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.light.border,
    },
    footerNote: {
        ...typography.styles.bodySmall,
        fontSize: 12,
        color: '#065F46',
        textAlign: 'center',
    },
    deleteButton: {
        marginTop: spacing.md,
        alignSelf: 'center',
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.sm,
    },
    deleteButtonText: {
        fontSize: 12,
        color: colors.semantic.error,
        fontWeight: '600',
    },
});
