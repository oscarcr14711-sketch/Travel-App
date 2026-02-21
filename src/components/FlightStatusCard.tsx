import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Linking, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getFlightStatus, FlightStatus } from '../services/aerodatabox.service';

interface FlightStatusCardProps {
    flightNumber: string;
    departureDate: string; // MM/DD/YY format
}

export default function FlightStatusCard({ flightNumber, departureDate }: FlightStatusCardProps) {
    const [status, setStatus] = useState<FlightStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(new Date());

    // Convert MM/DD/YY to YYYY-MM-DD for API
    const convertDate = (dateStr: string): string => {
        try {
            const parts = dateStr.split('/');
            if (parts.length !== 3) return '';
            const [month, day, yearPart] = parts.map(Number);
            const year = yearPart < 100 ? 2000 + yearPart : yearPart;
            return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        } catch {
            return '';
        }
    };

    const loadStatus = async () => {
        setLoading(true);
        setError(false);
        try {
            const apiDate = convertDate(departureDate);
            if (!apiDate) throw new Error('Invalid date');

            const flightStatus = await getFlightStatus(flightNumber, apiDate);
            setStatus(flightStatus);
            setError(flightStatus === null);
            setLastUpdate(new Date());
        } catch (err) {
            console.error('Flight status error:', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStatus();
    }, [flightNumber, departureDate]);

    const getStatusColor = (st: string): string[] => {
        switch (st) {
            case 'scheduled': return ['#3498db', '#2980b9'];
            case 'active': return ['#2ecc71', '#27ae60'];
            case 'landed': return ['#9b59b6', '#8e44ad'];
            case 'cancelled': return ['#e74c3c', '#c0392b'];
            case 'diverted': return ['#e67e22', '#d35400'];
            default: return ['#95a5a6', '#7f8c8d'];
        }
    };

    const getStatusEmoji = (st: string): string => {
        switch (st) {
            case 'scheduled': return '🕐';
            case 'active': return '✈️';
            case 'landed': return '🛬';
            case 'cancelled': return '❌';
            case 'diverted': return '⚠️';
            default: return '❓';
        }
    };

    const handleRefresh = () => {
        loadStatus();
    };

    if (loading) {
        return (
            <View style={styles.card}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#3498db" />
                    <Text style={styles.loadingText}>Fetching live flight status...</Text>
                </View>
            </View>
        );
    }

    if (error || !status) {
        return (
            <View style={styles.card}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorIcon}>⚠️</Text>
                    <Text style={styles.errorText}>Unable to load flight status</Text>
                    <Text style={styles.errorSubtext}>
                        This feature requires an AeroDataBox API key
                    </Text>
                    <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
                        <Text style={styles.retryText}>Try Again</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const statusColors = getStatusColor(status.status);

    return (
        <View style={styles.card}>
            <LinearGradient
                colors={statusColors as [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.headerEmoji}>{getStatusEmoji(status.status)}</Text>
                        <Text style={styles.headerTitle}>Live Flight Status</Text>
                    </View>
                    <TouchableOpacity style={styles.refreshBtn} onPress={handleRefresh}>
                        <Text style={styles.refreshIcon}>🔄</Text>
                    </TouchableOpacity>
                </View>

                {/* Status Badge */}
                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{status.status.toUpperCase()}</Text>
                </View>

                {/* Delay Warning */}
                {status.delayMinutes && status.delayMinutes > 0 && (
                    <View style={styles.delayBanner}>
                        <Text style={styles.delayIcon}>⏰</Text>
                        <Text style={styles.delayText}>
                            Delayed by {status.delayMinutes} minute{status.delayMinutes !== 1 ? 's' : ''}
                        </Text>
                    </View>
                )}

                {/* Route */}
                <View style={styles.routeContainer}>
                    <View style={styles.airport}>
                        <Text style={styles.airportCode}>{status.departure.airport}</Text>
                        <Text style={styles.airportTime}>
                            {status.departure.actualTime || status.departure.scheduledTime}
                        </Text>
                        {status.departure.gate && (
                            <View style={styles.gateChip}>
                                <Text style={styles.gateText}>Gate {status.departure.gate}</Text>
                            </View>
                        )}
                        {status.departure.terminal && (
                            <Text style={styles.terminalText}>Terminal {status.departure.terminal}</Text>
                        )}
                    </View>

                    <View style={styles.planeLine}>
                        <View style={styles.planeDot} />
                        <View style={styles.planeDash} />
                        <Text style={styles.planeIcon}>✈️</Text>
                        <View style={styles.planeDash} />
                        <View style={styles.planeDot} />
                    </View>

                    <View style={styles.airport}>
                        <Text style={styles.airportCode}>{status.arrival.airport}</Text>
                        <Text style={styles.airportTime}>
                            {status.arrival.actualTime || status.arrival.scheduledTime}
                        </Text>
                        {status.arrival.gate && (
                            <View style={styles.gateChip}>
                                <Text style={styles.gateText}>Gate {status.arrival.gate}</Text>
                            </View>
                        )}
                        {status.arrival.terminal && (
                            <Text style={styles.terminalText}>Terminal {status.arrival.terminal}</Text>
                        )}
                    </View>
                </View>

                {/* Last Updated */}
                <View style={styles.footer}>
                    <Text style={styles.updateText}>
                        🔴 Last updated: {lastUpdate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </Text>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    gradient: {
        padding: 16,
    },

    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    headerEmoji: { fontSize: 20 },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
    refreshBtn: {
        padding: 4,
    },
    refreshIcon: { fontSize: 18 },

    // Status Badge
    statusBadge: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.25)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        marginBottom: 12,
    },
    statusText: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 12,
        letterSpacing: 1,
    },

    // Delay Banner
    delayBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        marginBottom: 12,
        gap: 6,
    },
    delayIcon: { fontSize: 16 },
    delayText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 13,
    },

    // Route
    routeContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    airport: {
        flex: 1,
        alignItems: 'center',
    },
    airportCode: {
        fontSize: 26,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: 2,
        marginBottom: 4,
    },
    airportTime: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.85)',
        marginBottom: 6,
    },
    gateChip: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: 3,
    },
    gateText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#fff',
    },
    terminalText: {
        fontSize: 10,
        color: 'rgba(255,255,255,0.7)',
    },

    planeLine: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingTop: 10,
        gap: 4,
    },
    planeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.6)',
    },
    planeDash: {
        flex: 1,
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.4)',
    },
    planeIcon: { fontSize: 18 },

    // Footer
    footer: {
        alignItems: 'center',
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.2)',
    },
    updateText: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '600',
    },

    // Loading
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        gap: 12,
    },
    loadingText: {
        fontSize: 14,
        color: '#666',
    },

    // Error
    errorContainer: {
        alignItems: 'center',
        padding: 20,
    },
    errorIcon: { fontSize: 40, marginBottom: 8 },
    errorText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#e74c3c',
        marginBottom: 4,
    },
    errorSubtext: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
        marginBottom: 12,
    },
    retryButton: {
        backgroundColor: '#3498db',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    retryText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 13,
    },
});
