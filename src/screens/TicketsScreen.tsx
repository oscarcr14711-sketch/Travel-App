import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert, RefreshControl, Linking } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme';
import { Ticket } from '../types/ticket.types';
import { pickTicketPDF, getUserTickets, deleteTicket } from '../services/ticket.service';

export default function TicketsScreen() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadTickets = async () => {
        try {
            const fetchedTickets = await getUserTickets();
            setTickets(fetchedTickets);
        } catch (error) {
            console.error('Error loading tickets:', error);
            Alert.alert('Error', 'Failed to load tickets');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadTickets();
        }, [])
    );

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadTickets();
    }, []);

    const handleImport = async () => {
        try {
            const newTicket = await pickTicketPDF();
            console.log('Pick result:', newTicket);
            if (newTicket) {
                // Refresh list
                loadTickets();
                Alert.alert('Success', 'Ticket imported successfully!');
            }
        } catch (error) {
            console.error('Error importing ticket:', error);
            Alert.alert('Error', 'Failed to import PDF');
        }
    };

    const handleDelete = async (id: string, name: string) => {
        Alert.alert(
            'Delete Ticket',
            `Are you sure you want to delete "${name}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteTicket(id);
                            loadTickets();
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete ticket');
                        }
                    }
                }
            ]
        );
    };

    const handleOpenTicket = async (ticket: Ticket) => {
        try {
            console.log('Opening ticket:', ticket.fileUri);
            const supported = await Linking.canOpenURL(ticket.fileUri);

            if (supported) {
                await Linking.openURL(ticket.fileUri);
            } else {
                Alert.alert('Info', 'Could not open file directly. Path: ' + ticket.fileUri);
            }
        } catch (error) {
            console.error('Error opening ticket:', error);
            Alert.alert('Error', 'Failed to open ticket file');
        }
    };

    const TicketItem = ({ ticket }: { ticket: Ticket }) => (
        <View style={styles.ticketCard}>
            <TouchableOpacity
                style={styles.ticketContent}
                onPress={() => handleOpenTicket(ticket)}
            >
                <View style={styles.ticketIconContainer}>
                    <Text style={styles.ticketIcon}>📄</Text>
                </View>
                <View style={styles.ticketInfo}>
                    <Text style={styles.ticketTitle} numberOfLines={1}>{ticket.title}</Text>
                    <Text style={styles.ticketMeta}>
                        {new Date(ticket.createdAt).toLocaleDateString()}
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleDelete(ticket.id, ticket.title)}
                style={styles.deleteButton}
            >
                <Text style={styles.deleteIcon}>🗑️</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>🎫 Ticket Wallet</Text>
                <Text style={styles.subtitle}>All your travel tickets</Text>
            </View>

            <ScrollView
                style={styles.content}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.primary.main} />
                    </View>
                ) : tickets.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>📭</Text>
                        <Text style={styles.emptyTitle}>No tickets yet</Text>
                        <Text style={styles.emptyText}>
                            Import your tickets by scanning PDFs or QR codes
                        </Text>
                    </View>
                ) : (
                    <View style={styles.ticketsList}>
                        {tickets.map(ticket => (
                            <TicketItem key={ticket.id} ticket={ticket} />
                        ))}
                    </View>
                )}
            </ScrollView>

            {/* Floating Import Button */}
            <TouchableOpacity
                style={styles.importButton}
                onPress={handleImport}
                activeOpacity={0.8}
            >
                <Text style={styles.importButtonText}>+</Text>
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
        backgroundColor: colors.travel.flight,
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
        paddingTop: spacing['4xl'],
        alignItems: 'center',
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
    ticketsList: {
        padding: spacing.lg,
        gap: spacing.md,
    },
    ticketCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.neutral.white,
        padding: spacing.md,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        gap: spacing.md,
    },
    ticketContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    ticketIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ticketIcon: {
        fontSize: 24,
    },
    ticketInfo: {
        flex: 1,
    },
    ticketTitle: {
        ...typography.styles.h5,
        color: colors.light.text,
        marginBottom: 4,
    },
    ticketMeta: {
        ...typography.styles.bodySmall,
        color: colors.light.textSecondary,
    },
    deleteButton: {
        padding: spacing.sm,
    },
    deleteIcon: {
        fontSize: 20,
    },
    importButton: {
        position: 'absolute',
        bottom: 100, // Above tab bar
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.primary.main, // Or specific color
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    importButtonText: {
        fontSize: 32,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginTop: -2,
    },
});
