import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '../theme';
import { getTravelStats, formatMiles, TravelStats } from '../services/stats.service';

export default function TravelStatsScreen({ navigation }: any) {
    const [stats, setStats] = useState<TravelStats | null>(null);
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            setLoadingStats(true);
            const travelStats = await getTravelStats();
            setStats(travelStats);
        } catch (error) {
            console.error('Error loading stats:', error);
        } finally {
            setLoadingStats(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.title}>📊 Travel Stats</Text>
                <Text style={styles.subtitle}>Your travel journey in numbers</Text>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {loadingStats ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.primary.main} />
                        <Text style={styles.loadingText}>Calculating your stats...</Text>
                    </View>
                ) : stats ? (
                    <View style={styles.statsContainer}>
                        {/* Stats Grid */}
                        <View style={styles.statsGrid}>
                            {/* Row 1 */}
                            <View style={styles.statCard}>
                                <Text style={styles.statIcon}>📅</Text>
                                <Text style={styles.statValue}>{stats.totalTrips}</Text>
                                <Text style={styles.statLabel}>Total Trips</Text>
                            </View>
                            <View style={styles.statCard}>
                                <Text style={styles.statIcon}>🌍</Text>
                                <Text style={styles.statValue}>{stats.countriesVisited}</Text>
                                <Text style={styles.statLabel}>Countries</Text>
                            </View>
                            <View style={styles.statCard}>
                                <Text style={styles.statIcon}>🏙️</Text>
                                <Text style={styles.statValue}>{stats.citiesVisited}</Text>
                                <Text style={styles.statLabel}>Cities</Text>
                            </View>

                            {/* Row 2 */}
                            <View style={styles.statCard}>
                                <Text style={styles.statIcon}>✈️</Text>
                                <Text style={styles.statValue}>{formatMiles(stats.totalMiles)}</Text>
                                <Text style={styles.statLabel}>Miles Flown</Text>
                            </View>
                            <View style={[styles.statCard, styles.statCardWide]}>
                                <Text style={styles.statIcon}>🏆</Text>
                                <Text style={styles.statValueSmall}>{stats.favoriteAirline}</Text>
                                <Text style={styles.statLabel}>Favorite Airline</Text>
                            </View>
                            <View style={[styles.statCard, styles.statCardWide]}>
                                <Text style={styles.statIcon}>⭐</Text>
                                <Text style={styles.statValueSmall}>{stats.favoriteDestination}</Text>
                                <Text style={styles.statLabel}>Top Destination</Text>
                            </View>
                        </View>

                        {/* Summary Section */}
                        {stats.totalTrips > 0 && (
                            <View style={styles.summaryCard}>
                                <Text style={styles.summaryTitle}>🎉 Your Journey</Text>
                                <Text style={styles.summaryText}>
                                    You've taken <Text style={styles.highlight}>{stats.totalTrips}</Text> {stats.totalTrips === 1 ? 'trip' : 'trips'} across{' '}
                                    <Text style={styles.highlight}>{stats.countriesVisited}</Text> {stats.countriesVisited === 1 ? 'country' : 'countries'},
                                    visiting <Text style={styles.highlight}>{stats.citiesVisited}</Text> unique {stats.citiesVisited === 1 ? 'destination' : 'destinations'}.
                                </Text>
                                {stats.totalMiles > 0 && (
                                    <Text style={styles.summaryText}>
                                        That's a total of <Text style={styles.highlight}>{formatMiles(stats.totalMiles)}</Text> miles in the air! ✈️
                                    </Text>
                                )}
                            </View>
                        )}

                        {stats.totalTrips === 0 && (
                            <View style={styles.emptyState}>
                                <Text style={styles.emptyIcon}>✈️</Text>
                                <Text style={styles.emptyTitle}>No trips yet!</Text>
                                <Text style={styles.emptyText}>Start planning your first adventure to see your travel stats</Text>
                            </View>
                        )}
                    </View>
                ) : null}
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
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: colors.primary.main,
    },
    backButton: {
        marginBottom: 12,
    },
    backText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.9,
    },
    content: {
        flex: 1,
    },
    loadingContainer: {
        padding: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: colors.light.textSecondary,
    },
    statsContainer: {
        padding: 16,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 20,
    },
    statCard: {
        backgroundColor: colors.neutral.white,
        borderRadius: 16,
        padding: 20,
        width: '31%',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 130,
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
    statCardWide: {
        width: '48%',
    },
    statIcon: {
        fontSize: 40,
        marginBottom: 12,
    },
    statValue: {
        fontSize: 32,
        fontWeight: '700',
        color: colors.primary.main,
        marginBottom: 6,
    },
    statValueSmall: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.primary.main,
        marginBottom: 6,
        textAlign: 'center',
    },
    statLabel: {
        fontSize: 13,
        color: colors.light.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        fontWeight: '600',
        textAlign: 'center',
    },
    summaryCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
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
    summaryTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.primary.main,
        marginBottom: 12,
    },
    summaryText: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.light.text,
        marginBottom: 8,
    },
    highlight: {
        fontWeight: '700',
        color: colors.primary.main,
    },
    emptyState: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 48,
        alignItems: 'center',
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
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.light.text,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 16,
        color: colors.light.textSecondary,
        textAlign: 'center',
    },
});
