import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    ActivityIndicator, Platform, Modal, TextInput, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
    generatePackingList,
    getPackingList,
    togglePackingItem,
    addCustomPackingItem,
    deletePackingItem,
    PackingList,
    PackingItem,
} from '../services/packing.service';
import { Trip } from '../types/trip.types';

export default function PackingListScreen({ route, navigation }: any) {
    const trip: Trip = route.params?.trip;
    const [packingList, setPackingList] = useState<PackingList | null>(null);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newItemText, setNewItemText] = useState('');
    const [newItemCategory, setNewItemCategory] = useState('Other');

    useEffect(() => {
        loadPackingList();
    }, []);

    const loadPackingList = async () => {
        try {
            setLoading(true);
            let list = await getPackingList(trip.id);
            if (!list) {
                // Generate new list
                list = await generatePackingList(trip);
            }
            setPackingList(list);
        } catch (error) {
            console.error('Error loading packing list:', error);
            Alert.alert('Error', 'Failed to load packing list');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleItem = async (itemId: string) => {
        await togglePackingItem(trip.id, itemId);
        loadPackingList();
    };

    const handleAddCustomItem = async () => {
        if (!newItemText.trim()) return;
        await addCustomPackingItem(trip.id, newItemCategory, newItemText.trim());
        setNewItemText('');
        setShowAddModal(false);
        loadPackingList();
    };

    const handleDeleteItem = async (itemId: string) => {
        Alert.alert('Delete Item', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    await deletePackingItem(trip.id, itemId);
                    loadPackingList();
                },
            },
        ]);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6b5fcc" />
                <Text style={styles.loadingText}>Generating smart packing list...</Text>
            </View>
        );
    }

    if (!packingList) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Failed to load packing list</Text>
            </View>
        );
    }

    // Group items by category
    const groupedItems: Record<string, PackingItem[]> = {};
    packingList.items.forEach(item => {
        if (!groupedItems[item.category]) {
            groupedItems[item.category] = [];
        }
        groupedItems[item.category].push(item);
    });

    const packedCount = packingList.items.filter(i => i.packed).length;
    const totalCount = packingList.items.length;
    const progress = totalCount > 0 ? (packedCount / totalCount) * 100 : 0;

    const categoryIcons: Record<string, string> = {
        Documents: '📄',
        Money: '💰',
        Tech: '🔌',
        Toiletries: '🧴',
        Clothes: '👕',
        Accessories: '🕶️',
        'Travel Comfort': '✈️',
        Entertainment: '🎮',
        Other: '📦',
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <LinearGradient
                colors={['#6b5fcc', '#8b7fdf', '#ab9fef']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>🎒 Packing List</Text>
                    <Text style={styles.headerSubtitle}>
                        {trip.origin} → {trip.destination}
                    </Text>
                </View>
            </LinearGradient>

            {/* Progress Card */}
            <View style={styles.progressCard}>
                <View style={styles.progressHeader}>
                    <Text style={styles.progressTitle}>Packing Progress</Text>
                    <Text style={styles.progressPercent}>{Math.round(progress)}%</Text>
                </View>
                <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                </View>
                <Text style={styles.progressText}>
                    {packedCount} of {totalCount} items packed
                </Text>
            </View>

            {/* Items List */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {Object.entries(groupedItems).map(([category, items]) => (
                    <View key={category} style={styles.categorySection}>
                        <View style={styles.categoryHeader}>
                            <Text style={styles.categoryIcon}>{categoryIcons[category] || '📦'}</Text>
                            <Text style={styles.categoryTitle}>{category}</Text>
                            <Text style={styles.categoryCount}>
                                {items.filter(i => i.packed).length}/{items.length}
                            </Text>
                        </View>

                        {items.map(item => (
                            <View key={item.id} style={styles.itemRow}>
                                <TouchableOpacity
                                    style={styles.itemMain}
                                    onPress={() => handleToggleItem(item.id)}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.checkbox, item.packed && styles.checkboxChecked]}>
                                        {item.packed && <Text style={styles.checkmark}>✓</Text>}
                                    </View>
                                    <View style={styles.itemTextContainer}>
                                        <Text style={[styles.itemText, item.packed && styles.itemTextPacked]}>
                                            {item.item}
                                        </Text>
                                        {item.essential && !item.packed && (
                                            <View style={styles.essentialBadge}>
                                                <Text style={styles.essentialText}>ESSENTIAL</Text>
                                            </View>
                                        )}
                                        {item.weatherDependent && (
                                            <View style={styles.weatherBadge}>
                                                <Text style={styles.weatherBadgeText}>🌡️</Text>
                                            </View>
                                        )}
                                    </View>
                                </TouchableOpacity>
                                {!item.essential && item.id.startsWith('custom_') && (
                                    <TouchableOpacity
                                        onPress={() => handleDeleteItem(item.id)}
                                        style={styles.deleteBtn}
                                    >
                                        <Text style={styles.deleteBtnText}>🗑️</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}
                    </View>
                ))}

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* FAB */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setShowAddModal(true)}
                activeOpacity={0.8}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            {/* Add Item Modal */}
            <Modal visible={showAddModal} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Add Custom Item</Text>
                            <TouchableOpacity onPress={() => setShowAddModal(false)}>
                                <Text style={styles.modalClose}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.fieldLabel}>CATEGORY</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                            {Object.keys(categoryIcons).map(cat => (
                                <TouchableOpacity
                                    key={cat}
                                    style={[
                                        styles.categoryChip,
                                        newItemCategory === cat && styles.categoryChipActive,
                                    ]}
                                    onPress={() => setNewItemCategory(cat)}
                                >
                                    <Text style={styles.categoryChipIcon}>{categoryIcons[cat]}</Text>
                                    <Text
                                        style={[
                                            styles.categoryChipText,
                                            newItemCategory === cat && styles.categoryChipTextActive,
                                        ]}
                                    >
                                        {cat}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <Text style={styles.fieldLabel}>ITEM NAME</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., Extra phone charger"
                            placeholderTextColor="#999"
                            value={newItemText}
                            onChangeText={setNewItemText}
                            autoFocus
                        />

                        <TouchableOpacity
                            style={[styles.addBtn, !newItemText.trim() && styles.addBtnDisabled]}
                            onPress={handleAddCustomItem}
                            disabled={!newItemText.trim()}
                        >
                            <Text style={styles.addBtnText}>Add Item</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f4f4f8' },

    // Header
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingHorizontal: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backBtn: { marginRight: 12 },
    backIcon: { fontSize: 28, color: '#fff', fontWeight: 'bold' },
    headerContent: { flex: 1 },
    headerTitle: { fontSize: 24, fontWeight: '800', color: '#fff', marginBottom: 4 },
    headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },

    // Progress
    progressCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 8,
        padding: 16,
        borderRadius: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    progressTitle: { fontSize: 16, fontWeight: '700', color: '#1a1a2e' },
    progressPercent: { fontSize: 20, fontWeight: '800', color: '#6b5fcc' },
    progressBarBg: {
        height: 8,
        backgroundColor: '#e8e8f0',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressBarFill: { height: '100%', backgroundColor: '#6b5fcc', borderRadius: 4 },
    progressText: { fontSize: 13, color: '#888', textAlign: 'center' },

    // Content
    content: { flex: 1, paddingHorizontal: 16 },

    // Category
    categorySection: { marginBottom: 16 },
    categoryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        gap: 8,
    },
    categoryIcon: { fontSize: 18 },
    categoryTitle: { flex: 1, fontSize: 15, fontWeight: '700', color: '#1a1a2e' },
    categoryCount: { fontSize: 13, fontWeight: '600', color: '#888' },

    // Item
    itemRow: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f5',
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemMain: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        gap: 12,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: { backgroundColor: '#6b5fcc', borderColor: '#6b5fcc' },
    checkmark: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
    itemTextContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 },
    itemText: { fontSize: 14, color: '#1a1a2e', flex: 1 },
    itemTextPacked: { textDecorationLine: 'line-through', color: '#999' },
    essentialBadge: {
        backgroundColor: '#ff6b6b',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    essentialText: { fontSize: 9, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },
    weatherBadge: { marginLeft: 4 },
    weatherBadgeText: { fontSize: 14 },
    deleteBtn: { padding: 12 },
    deleteBtnText: { fontSize: 18 },

    // FAB
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#6b5fcc',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#6b5fcc',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 8,
    },
    fabText: { fontSize: 32, color: '#fff', fontWeight: 'bold', marginTop: -2 },

    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '70%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: { fontSize: 20, fontWeight: '800', color: '#1a1a2e' },
    modalClose: { fontSize: 24, color: '#888' },
    fieldLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#999',
        letterSpacing: 1,
        marginBottom: 8,
        marginTop: 12,
    },
    categoryScroll: { marginBottom: 12 },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f5',
        marginRight: 8,
    },
    categoryChipActive: { backgroundColor: '#6b5fcc' },
    categoryChipIcon: { fontSize: 16 },
    categoryChipText: { fontSize: 13, fontWeight: '600', color: '#666' },
    categoryChipTextActive: { color: '#fff' },
    input: {
        backgroundColor: '#f5f5f8',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: '#1a1a2e',
        marginBottom: 16,
    },
    addBtn: {
        backgroundColor: '#6b5fcc',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    addBtnDisabled: { opacity: 0.5 },
    addBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },

    // Loading/Error
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f8',
    },
    loadingText: { marginTop: 12, fontSize: 14, color: '#888' },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f8',
    },
    errorText: { fontSize: 16, color: '#e74c3c' },
});
