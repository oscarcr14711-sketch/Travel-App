import React, { useState, useCallback } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    ActivityIndicator, Alert, RefreshControl, Linking, Platform,
    TextInput, Modal, Animated,
} from 'react-native';
import * as Sharing from 'expo-sharing';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme';
import { Ticket } from '../types/ticket.types';
import { pickTicketPDF, getUserTickets, deleteTicket, updateTicket } from '../services/ticket.service';
import { getAirlineEmoji, getBusEmoji, getAirlineColors, getBusColors } from '../utils/logoMapper';

// ─── Helpers ─────────────────────────────────────────

function getCountdown(date?: string, time?: string): string | null {
    if (!date) return null;
    try {
        const dateStr = time ? `${date}T${time}` : date;
        const departure = new Date(dateStr);
        const now = new Date();
        const diff = departure.getTime() - now.getTime();

        if (diff < 0) return 'Departed';
        if (diff < 60 * 1000) return 'Now!';

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) return `${days}d ${hours}h`;
        if (hours > 0) return `${hours}h ${mins}m`;
        return `${mins}m`;
    } catch {
        return null;
    }
}

function formatDate(dateStr?: string): string {
    if (!dateStr) return '';
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            weekday: 'short', month: 'short', day: 'numeric'
        });
    } catch {
        return dateStr;
    }
}

function isUpcoming(date?: string, time?: string): boolean {
    if (!date) return true; // Unlinked tickets show as "upcoming"
    try {
        const dateStr = time ? `${date}T${time}` : date;
        return new Date(dateStr).getTime() > new Date().getTime();
    } catch {
        return true;
    }
}

type FilterTab = 'all' | 'upcoming' | 'past' | 'flights' | 'buses';

// ─── Component ───────────────────────────────────────

export default function TicketsScreen({ navigation }: any) {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState<FilterTab>('all');

    // Edit modal state
    const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
    const [editFields, setEditFields] = useState({
        type: 'other' as Ticket['type'],
        tripOrigin: '',
        tripDestination: '',
        tripDate: '',
        tripTime: '',
        airline: '',
        busCompany: '',
        flightNumber: '',
        busNumber: '',
        gate: '',
        seat: '',
        terminal: '',
        confirmationCode: '',
    });

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

    useFocusEffect(useCallback(() => { loadTickets(); }, []));

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadTickets();
    }, []);

    const handleImport = async () => {
        try {
            const newTicket = await pickTicketPDF();
            if (newTicket) {
                loadTickets();
                Alert.alert('Success', 'Ticket imported! Tap the info icon (ℹ️) to add trip details.');
            }
        } catch (error) {
            console.error('Error importing ticket:', error);
            Alert.alert('Error', 'Failed to import PDF');
        }
    };

    const handleDelete = async (id: string, name: string) => {
        Alert.alert(
            'Delete Ticket',
            `Delete "${name}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete', style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteTicket(id);
                            loadTickets();
                        } catch {
                            Alert.alert('Error', 'Failed to delete ticket');
                        }
                    }
                },
            ]
        );
    };

    const handleOpenTicket = (ticket: Ticket) => {
        navigation.navigate('PdfViewer', {
            uri: ticket.fileUri,
            title: ticket.title || 'Ticket',
        });
    };

    // ─── Edit/Link Trip Modal ────────────────────────

    const openEditModal = (ticket: Ticket) => {
        setEditingTicket(ticket);
        setEditFields({
            type: ticket.type || 'other',
            tripOrigin: ticket.tripOrigin || '',
            tripDestination: ticket.tripDestination || '',
            tripDate: ticket.tripDate || '',
            tripTime: ticket.tripTime || '',
            airline: ticket.airline || '',
            busCompany: ticket.busCompany || '',
            flightNumber: ticket.flightNumber || '',
            busNumber: ticket.busNumber || '',
            gate: ticket.gate || '',
            seat: ticket.seat || '',
            terminal: ticket.terminal || '',
            confirmationCode: ticket.confirmationCode || '',
        });
    };

    const saveEdits = async () => {
        if (!editingTicket) return;
        await updateTicket(editingTicket.id, editFields);
        setEditingTicket(null);
        loadTickets();
    };

    // ─── Filtering ───────────────────────────────────

    const filteredTickets = tickets.filter(t => {
        if (activeTab === 'all') return true;
        if (activeTab === 'upcoming') return isUpcoming(t.tripDate, t.tripTime);
        if (activeTab === 'past') return !isUpcoming(t.tripDate, t.tripTime);
        if (activeTab === 'flights') return t.type === 'flight';
        if (activeTab === 'buses') return t.type === 'bus';
        return true;
    });

    // ─── Boarding Pass Card ──────────────────────────

    const BoardingPassCard = ({ ticket }: { ticket: Ticket }) => {
        const isLinked = ticket.tripOrigin && ticket.tripDestination;
        const isFlight = ticket.type === 'flight';
        const isBus = ticket.type === 'bus';
        const countdown = getCountdown(ticket.tripDate, ticket.tripTime);
        const upcoming = isUpcoming(ticket.tripDate, ticket.tripTime);

        const emoji = isFlight
            ? getAirlineEmoji(ticket.airline || '')
            : isBus ? getBusEmoji(ticket.busCompany || '') : '📄';

        const gradientColors = isFlight
            ? getAirlineColors(ticket.airline || '') as [string, string, string]
            : isBus ? getBusColors(ticket.busCompany || '') as [string, string, string]
                : ['#6b5fcc', '#8b7fdf', '#ab9fef'] as [string, string, string];

        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => handleOpenTicket(ticket)}
                style={styles.cardOuter}
            >
                <LinearGradient
                    colors={gradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[
                        styles.boardingPass,
                        !upcoming && styles.pastCard,
                    ]}
                >
                    {/* Top Row — Carrier & Actions */}
                    <View style={styles.cardTopRow}>
                        <View style={styles.cardCarrier}>
                            <Text style={styles.cardEmoji}>{emoji}</Text>
                            <Text style={styles.cardCarrierName} numberOfLines={1}>
                                {isFlight ? (ticket.airline || 'Flight')
                                    : isBus ? (ticket.busCompany || 'Bus')
                                        : 'Ticket'}
                            </Text>
                        </View>
                        <View style={styles.cardActions}>
                            <TouchableOpacity
                                onPress={() => openEditModal(ticket)}
                                style={styles.infoBtn}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            >
                                <Text style={styles.infoBtnText}>ℹ️</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleDelete(ticket.id, ticket.title)}
                                style={styles.deleteBtn}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            >
                                <Text style={styles.deleteBtnText}>🗑️</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Route — Origin → Destination */}
                    {isLinked ? (
                        <View style={styles.routeRow}>
                            <View style={styles.routeCity}>
                                <Text style={styles.routeCode}>{ticket.tripOrigin}</Text>
                            </View>
                            <View style={styles.routeLine}>
                                <View style={styles.routeDot} />
                                <View style={styles.routeDash} />
                                <Text style={styles.routeIcon}>{isFlight ? '✈️' : '🚌'}</Text>
                                <View style={styles.routeDash} />
                                <View style={styles.routeDot} />
                            </View>
                            <View style={[styles.routeCity, { alignItems: 'flex-end' }]}>
                                <Text style={styles.routeCode}>{ticket.tripDestination}</Text>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.unlinkedRow}>
                            <Text style={styles.unlinkedTitle} numberOfLines={1}>{ticket.title}</Text>
                            <Text style={styles.unlinkedHint}>Tap ℹ️ to add trip details</Text>
                        </View>
                    )}

                    {/* Dashed Separator */}
                    <View style={styles.separator}>
                        <View style={styles.notchLeft} />
                        <View style={styles.dashLine} />
                        <View style={styles.notchRight} />
                    </View>

                    {/* Bottom Details Row */}
                    <View style={styles.detailsRow}>
                        {ticket.tripDate && (
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>DATE</Text>
                                <Text style={styles.detailValue}>{formatDate(ticket.tripDate)}</Text>
                            </View>
                        )}
                        {ticket.tripTime && (
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>TIME</Text>
                                <Text style={styles.detailValue}>{ticket.tripTime}</Text>
                            </View>
                        )}
                        {(ticket.flightNumber || ticket.busNumber) && (
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>{isFlight ? 'FLIGHT' : 'BUS'}</Text>
                                <Text style={styles.detailValue}>{ticket.flightNumber || ticket.busNumber}</Text>
                            </View>
                        )}
                        {ticket.gate && (
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>GATE</Text>
                                <Text style={styles.detailValue}>{ticket.gate}</Text>
                            </View>
                        )}
                        {ticket.seat && (
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>SEAT</Text>
                                <Text style={styles.detailValue}>{ticket.seat}</Text>
                            </View>
                        )}
                        {!isLinked && (
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>IMPORTED</Text>
                                <Text style={styles.detailValue}>
                                    {new Date(ticket.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Countdown Badge */}
                    {countdown && (
                        <View style={[
                            styles.countdownBadge,
                            !upcoming && styles.countdownPast
                        ]}>
                            <Text style={styles.countdownText}>
                                {upcoming ? `⏱ Departing in ${countdown}` : '✓ Completed'}
                            </Text>
                        </View>
                    )}

                    {/* Confirmation Code */}
                    {ticket.confirmationCode && (
                        <View style={styles.confirmRow}>
                            <Text style={styles.confirmLabel}>CONFIRMATION</Text>
                            <Text style={styles.confirmValue}>{ticket.confirmationCode}</Text>
                        </View>
                    )}
                </LinearGradient>
            </TouchableOpacity>
        );
    };

    // ─── Filter Tabs ─────────────────────────────────

    const TABS: { key: FilterTab; label: string; emoji: string }[] = [
        { key: 'all', label: 'All', emoji: '🎫' },
        { key: 'upcoming', label: 'Upcoming', emoji: '⏳' },
        { key: 'past', label: 'Past', emoji: '✓' },
        { key: 'flights', label: 'Flights', emoji: '✈️' },
        { key: 'buses', label: 'Buses', emoji: '🚌' },
    ];

    // ─── Render ──────────────────────────────────────

    return (
        <View style={styles.container}>
            {/* Header */}
            <LinearGradient
                colors={['#1a1a2e', '#2a2a4e', '#3a3a6e']}
                style={styles.header}
            >
                <Text style={styles.title}>🎫 Ticket Wallet</Text>
                <Text style={styles.subtitle}>
                    {tickets.length === 0
                        ? 'Import your travel tickets'
                        : `${tickets.length} ticket${tickets.length !== 1 ? 's' : ''}`}
                </Text>
            </LinearGradient>

            {/* Filter Tabs */}
            {tickets.length > 0 && (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tabRow}
                    style={styles.tabScroll}
                >
                    {TABS.map(tab => (
                        <TouchableOpacity
                            key={tab.key}
                            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
                            onPress={() => setActiveTab(tab.key)}
                        >
                            <Text style={styles.tabEmoji}>{tab.emoji}</Text>
                            <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}

            {/* Content */}
            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentInner}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {loading ? (
                    <View style={styles.centerContainer}>
                        <ActivityIndicator size="large" color={colors.primary.main} />
                    </View>
                ) : tickets.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>📭</Text>
                        <Text style={styles.emptyTitle}>No tickets yet</Text>
                        <Text style={styles.emptyText}>
                            Import your boarding passes and travel tickets as PDFs.
                            Add trip details to see beautiful boarding pass cards!
                        </Text>
                        <TouchableOpacity style={styles.emptyBtn} onPress={handleImport}>
                            <Text style={styles.emptyBtnText}>+ Import First Ticket</Text>
                        </TouchableOpacity>
                    </View>
                ) : filteredTickets.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>🔍</Text>
                        <Text style={styles.emptyTitle}>No {activeTab} tickets</Text>
                        <Text style={styles.emptyText}>
                            Try a different filter or import more tickets.
                        </Text>
                    </View>
                ) : (
                    filteredTickets.map(ticket => (
                        <BoardingPassCard key={ticket.id} ticket={ticket} />
                    ))
                )}

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* FAB Import Button */}
            <TouchableOpacity style={styles.fab} onPress={handleImport} activeOpacity={0.8}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            {/* ─── Edit / Link Trip Modal ─── */}
            <Modal visible={!!editingTicket} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>✏️ Ticket Details</Text>
                            <TouchableOpacity onPress={() => setEditingTicket(null)}>
                                <Text style={styles.modalClose}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} style={styles.modalScroll}>
                            {/* Type Selector */}
                            <Text style={styles.fieldLabel}>TYPE</Text>
                            <View style={styles.typeRow}>
                                {(['flight', 'bus', 'other'] as const).map(type => (
                                    <TouchableOpacity
                                        key={type}
                                        style={[styles.typeBtn, editFields.type === type && styles.typeBtnActive]}
                                        onPress={() => setEditFields(prev => ({ ...prev, type }))}
                                    >
                                        <Text style={styles.typeEmoji}>
                                            {type === 'flight' ? '✈️' : type === 'bus' ? '🚌' : '📄'}
                                        </Text>
                                        <Text style={[styles.typeTxt, editFields.type === type && styles.typeTxtActive]}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* Route */}
                            <View style={styles.fieldRow}>
                                <View style={styles.fieldHalf}>
                                    <Text style={styles.fieldLabel}>ORIGIN</Text>
                                    <TextInput
                                        style={styles.fieldInput}
                                        value={editFields.tripOrigin}
                                        onChangeText={v => setEditFields(p => ({ ...p, tripOrigin: v.toUpperCase() }))}
                                        placeholder="LAX"
                                        placeholderTextColor="#999"
                                        maxLength={4}
                                    />
                                </View>
                                <View style={styles.fieldHalf}>
                                    <Text style={styles.fieldLabel}>DESTINATION</Text>
                                    <TextInput
                                        style={styles.fieldInput}
                                        value={editFields.tripDestination}
                                        onChangeText={v => setEditFields(p => ({ ...p, tripDestination: v.toUpperCase() }))}
                                        placeholder="JFK"
                                        placeholderTextColor="#999"
                                        maxLength={4}
                                    />
                                </View>
                            </View>

                            {/* Carrier */}
                            {editFields.type === 'flight' && (
                                <View style={styles.fieldRow}>
                                    <View style={styles.fieldHalf}>
                                        <Text style={styles.fieldLabel}>AIRLINE</Text>
                                        <TextInput
                                            style={styles.fieldInput}
                                            value={editFields.airline}
                                            onChangeText={v => setEditFields(p => ({ ...p, airline: v }))}
                                            placeholder="Delta"
                                            placeholderTextColor="#999"
                                        />
                                    </View>
                                    <View style={styles.fieldHalf}>
                                        <Text style={styles.fieldLabel}>FLIGHT #</Text>
                                        <TextInput
                                            style={styles.fieldInput}
                                            value={editFields.flightNumber}
                                            onChangeText={v => setEditFields(p => ({ ...p, flightNumber: v.toUpperCase() }))}
                                            placeholder="DL 1234"
                                            placeholderTextColor="#999"
                                        />
                                    </View>
                                </View>
                            )}
                            {editFields.type === 'bus' && (
                                <View style={styles.fieldRow}>
                                    <View style={styles.fieldHalf}>
                                        <Text style={styles.fieldLabel}>BUS COMPANY</Text>
                                        <TextInput
                                            style={styles.fieldInput}
                                            value={editFields.busCompany}
                                            onChangeText={v => setEditFields(p => ({ ...p, busCompany: v }))}
                                            placeholder="Greyhound"
                                            placeholderTextColor="#999"
                                        />
                                    </View>
                                    <View style={styles.fieldHalf}>
                                        <Text style={styles.fieldLabel}>BUS #</Text>
                                        <TextInput
                                            style={styles.fieldInput}
                                            value={editFields.busNumber}
                                            onChangeText={v => setEditFields(p => ({ ...p, busNumber: v }))}
                                            placeholder="4521"
                                            placeholderTextColor="#999"
                                        />
                                    </View>
                                </View>
                            )}

                            {/* Date & Time */}
                            <View style={styles.fieldRow}>
                                <View style={styles.fieldHalf}>
                                    <Text style={styles.fieldLabel}>DATE (YYYY-MM-DD)</Text>
                                    <TextInput
                                        style={styles.fieldInput}
                                        value={editFields.tripDate}
                                        onChangeText={v => setEditFields(p => ({ ...p, tripDate: v }))}
                                        placeholder="2026-03-15"
                                        placeholderTextColor="#999"
                                    />
                                </View>
                                <View style={styles.fieldHalf}>
                                    <Text style={styles.fieldLabel}>TIME (HH:MM)</Text>
                                    <TextInput
                                        style={styles.fieldInput}
                                        value={editFields.tripTime}
                                        onChangeText={v => setEditFields(p => ({ ...p, tripTime: v }))}
                                        placeholder="14:30"
                                        placeholderTextColor="#999"
                                    />
                                </View>
                            </View>

                            {/* Gate, Seat, Terminal */}
                            <View style={styles.fieldRow}>
                                <View style={styles.fieldThird}>
                                    <Text style={styles.fieldLabel}>GATE</Text>
                                    <TextInput
                                        style={styles.fieldInput}
                                        value={editFields.gate}
                                        onChangeText={v => setEditFields(p => ({ ...p, gate: v.toUpperCase() }))}
                                        placeholder="B12"
                                        placeholderTextColor="#999"
                                    />
                                </View>
                                <View style={styles.fieldThird}>
                                    <Text style={styles.fieldLabel}>SEAT</Text>
                                    <TextInput
                                        style={styles.fieldInput}
                                        value={editFields.seat}
                                        onChangeText={v => setEditFields(p => ({ ...p, seat: v.toUpperCase() }))}
                                        placeholder="12A"
                                        placeholderTextColor="#999"
                                    />
                                </View>
                                <View style={styles.fieldThird}>
                                    <Text style={styles.fieldLabel}>TERMINAL</Text>
                                    <TextInput
                                        style={styles.fieldInput}
                                        value={editFields.terminal}
                                        onChangeText={v => setEditFields(p => ({ ...p, terminal: v }))}
                                        placeholder="T3"
                                        placeholderTextColor="#999"
                                    />
                                </View>
                            </View>

                            {/* Confirmation Code */}
                            <Text style={styles.fieldLabel}>CONFIRMATION CODE</Text>
                            <TextInput
                                style={styles.fieldInput}
                                value={editFields.confirmationCode}
                                onChangeText={v => setEditFields(p => ({ ...p, confirmationCode: v.toUpperCase() }))}
                                placeholder="XK4R7P"
                                placeholderTextColor="#999"
                            />

                            {/* Save Button */}
                            <TouchableOpacity style={styles.saveBtn} onPress={saveEdits} activeOpacity={0.8}>
                                <Text style={styles.saveBtnText}>💾 Save Details</Text>
                            </TouchableOpacity>

                            <View style={{ height: 40 }} />
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

// ─── Styles ──────────────────────────────────────────

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f4f4f8' },

    // Header
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingHorizontal: 20,
        paddingBottom: 18,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
    },

    // Tabs
    tabScroll: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    tabRow: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 8,
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f5',
        gap: 5,
    },
    tabActive: {
        backgroundColor: '#1a1a2e',
    },
    tabEmoji: { fontSize: 14 },
    tabLabel: { fontSize: 12, fontWeight: '600', color: '#555' },
    tabLabelActive: { color: '#fff' },

    // Content
    content: { flex: 1 },
    contentInner: { padding: 16 },
    centerContainer: { paddingTop: 60, alignItems: 'center' },

    // Empty State
    emptyState: {
        alignItems: 'center',
        paddingVertical: 60,
        paddingHorizontal: 30,
    },
    emptyIcon: { fontSize: 70, marginBottom: 16 },
    emptyTitle: { fontSize: 22, fontWeight: '700', color: '#1a1a2e', marginBottom: 8 },
    emptyText: { fontSize: 14, color: '#888', textAlign: 'center', lineHeight: 21 },
    emptyBtn: {
        backgroundColor: '#6b5fcc',
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 14,
        marginTop: 20,
    },
    emptyBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },

    // ─── Boarding Pass Card ───
    cardOuter: { marginBottom: 16 },
    boardingPass: {
        borderRadius: 18,
        padding: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    pastCard: { opacity: 0.65 },

    // Card Top
    cardTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    cardCarrier: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    cardEmoji: { fontSize: 20 },
    cardCarrierName: { fontSize: 14, fontWeight: '700', color: 'rgba(255,255,255,0.9)', maxWidth: 160 },
    cardActions: { flexDirection: 'row', gap: 8 },
    infoBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
    infoBtnText: { fontSize: 14 },
    deleteBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
    deleteBtnText: { fontSize: 14 },

    // Route
    routeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    routeCity: { width: 70 },
    routeCode: { fontSize: 28, fontWeight: '900', color: '#fff', letterSpacing: 2 },
    routeLine: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    routeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.6)' },
    routeDash: { flex: 1, height: 1.5, backgroundColor: 'rgba(255,255,255,0.35)' },
    routeIcon: { fontSize: 18, marginHorizontal: 4 },

    // Unlinked
    unlinkedRow: { marginBottom: 14 },
    unlinkedTitle: { fontSize: 18, fontWeight: '700', color: '#fff' },
    unlinkedHint: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4 },

    // Separator
    separator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
    },
    notchLeft: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#f4f4f8',
        marginLeft: -25,
    },
    dashLine: {
        flex: 1,
        borderBottomWidth: 2,
        borderStyle: 'dashed',
        borderBottomColor: 'rgba(255,255,255,0.3)',
        marginHorizontal: 4,
    },
    notchRight: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#f4f4f8',
        marginRight: -25,
    },

    // Details Row
    detailsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    detailItem: {},
    detailLabel: { fontSize: 9, fontWeight: '700', color: 'rgba(255,255,255,0.5)', letterSpacing: 1 },
    detailValue: { fontSize: 15, fontWeight: '700', color: '#fff', marginTop: 2 },

    // Countdown
    countdownBadge: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 12,
        marginTop: 12,
    },
    countdownPast: { backgroundColor: 'rgba(0,0,0,0.15)' },
    countdownText: { fontSize: 12, fontWeight: '700', color: '#fff' },

    // Confirmation
    confirmRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap: 8,
    },
    confirmLabel: { fontSize: 9, fontWeight: '700', color: 'rgba(255,255,255,0.5)', letterSpacing: 1 },
    confirmValue: { fontSize: 16, fontWeight: '800', color: '#fff', letterSpacing: 3 },

    // FAB
    fab: {
        position: 'absolute',
        bottom: 100,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#6b5fcc',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#6b5fcc',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 8,
    },
    fabText: { fontSize: 32, color: '#fff', fontWeight: 'bold', marginTop: -2 },

    // ─── Modal ───
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        maxHeight: '85%',
        paddingTop: 16,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    modalTitle: { fontSize: 20, fontWeight: '800', color: '#1a1a2e' },
    modalClose: { fontSize: 20, color: '#888', fontWeight: '600' },
    modalScroll: { paddingHorizontal: 20 },

    // Fields
    fieldLabel: { fontSize: 10, fontWeight: '700', color: '#999', letterSpacing: 1, marginBottom: 5, marginTop: 12 },
    fieldInput: {
        backgroundColor: '#f5f5f8',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
        color: '#1a1a2e',
        fontWeight: '600',
    },
    fieldRow: { flexDirection: 'row', gap: 10 },
    fieldHalf: { flex: 1 },
    fieldThird: { flex: 1 },

    // Type Selector
    typeRow: { flexDirection: 'row', gap: 8 },
    typeBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: '#f0f0f5',
    },
    typeBtnActive: { backgroundColor: '#1a1a2e' },
    typeEmoji: { fontSize: 16 },
    typeTxt: { fontSize: 13, fontWeight: '700', color: '#555' },
    typeTxtActive: { color: '#fff' },

    // Save
    saveBtn: {
        backgroundColor: '#6b5fcc',
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 20,
    },
    saveBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
});
