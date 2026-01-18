import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { colors, typography, spacing } from '../theme';
import { getUserTrips, deleteTrip } from '../services/firebase.service';
import { Trip } from '../types/trip.types';
import FlightTicketCard from '../components/FlightTicketCard';
import BusTicketCard from '../components/BusTicketCard';

export default function TripsScreen({ navigation, route }: any) {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTrips = async () => {
        try {
            setLoading(true);
            const fetchedTrips = await getUserTrips();
            setTrips(fetchedTrips);
        } catch (error) {
            console.error('Error fetching trips:', error);
            Alert.alert('Error', 'Failed to fetch trips');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTrip = async (tripId: string) => {
        Alert.alert(
            'Delete Trip',
            'Are you sure you want to delete this trip? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            setLoading(true);
                            await deleteTrip(tripId);
                            await fetchTrips();
                        } catch (error) {
                            console.error('Error deleting trip:', error);
                            Alert.alert('Error', 'Failed to delete trip');
                            setLoading(false);
                        }
                    },
                },
            ]
        );
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    useEffect(() => {
        // Refresh trips when navigating back from add trip screens
        if (route.params?.refresh) {
            fetchTrips();
            // Clear the refresh param
            navigation.setParams({ refresh: undefined });
        }
    }, [route.params?.refresh]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>📅 My Trips</Text>
                <Text style={styles.subtitle}>Smart itinerary & timeline</Text>
            </View>

            <ScrollView style={styles.content}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.primary.main} />
                    </View>
                ) : trips.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>🗺️</Text>
                        <Text style={styles.emptyTitle}>No trips planned</Text>
                        <Text style={styles.emptyText}>
                            Create your first trip to get started
                        </Text>
                    </View>
                ) : (
                    <View style={styles.tripsContainer}>
                        {trips.map((trip) => (
                            trip.type === 'flight' ? (
                                <FlightTicketCard
                                    key={trip.id}
                                    trip={trip}
                                    onDelete={handleDeleteTrip}
                                />
                            ) : (
                                <BusTicketCard
                                    key={trip.id}
                                    trip={trip}
                                    onDelete={handleDeleteTrip}
                                />
                            )
                        ))}
                    </View>
                )}
            </ScrollView>

            {/* Floating Add Button */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('TransportationSelection', { country: 'USA' })}
                activeOpacity={0.8}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light.background,
    },
    header: {
        paddingTop: spacing.xl,
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.lg,
        backgroundColor: colors.travel.hotel,
    },
    title: {
        ...typography.styles.h3,
        color: colors.neutral.white,
        marginBottom: spacing.xs,
    },
    subtitle: {
        ...typography.styles.bodySmall,
        color: colors.neutral.white,
        opacity: 0.9,
    },
    content: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: spacing['4xl'],
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing['4xl'],
        paddingHorizontal: spacing.xl,
    },
    emptyIcon: {
        fontSize: 80,
        marginBottom: spacing.lg,
    },
    emptyTitle: {
        ...typography.styles.h4,
        color: colors.light.text,
        marginBottom: spacing.sm,
    },
    emptyText: {
        ...typography.styles.body,
        color: colors.light.textSecondary,
        textAlign: 'center',
    },
    tripsContainer: {
        paddingTop: spacing.lg,
        paddingBottom: 100,
    },
    addButton: {
        position: 'absolute',
        bottom: 80,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 8,
    },
    addButtonText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: colors.neutral.white,
        lineHeight: 36,
    },
});
