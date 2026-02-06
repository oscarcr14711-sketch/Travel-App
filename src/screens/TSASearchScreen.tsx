import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing } from '../theme';
import { TSA_ITEMS, TSA_CATEGORIES, searchTSAItems, TSAItem, TSAStatus } from '../data/tsa-items.data';

export default function TSASearchScreen({ navigation }: any) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Search and filter items
    const filteredItems = useMemo(() => {
        return searchTSAItems(searchQuery, selectedCategory);
    }, [searchQuery, selectedCategory]);

    const getStatusIcon = (status: TSAStatus) => {
        switch (status) {
            case 'yes': return '✅';
            case 'no': return '❌';
            case 'conditional': return '⚠️';
        }
    };

    const getStatusColor = (status: TSAStatus) => {
        switch (status) {
            case 'yes': return '#10B981';
            case 'no': return '#EF4444';
            case 'conditional': return '#F59E0B';
        }
    };

    const getStatusText = (status: TSAStatus) => {
        switch (status) {
            case 'yes': return 'Allowed';
            case 'no': return 'Prohibited';
            case 'conditional': return 'Restrictions';
        }
    };

    const getCategoryIcon = (category: string) => {
        const icons: Record<string, string> = {
            'Liquids & Gels': '🧴',
            'Electronics': '💻',
            'Sharp Objects': '✂️',
            'Tools': '🔧',
            'Food & Beverages': '🍎',
            'Medical': '💊',
            'Sports & Recreation': '⚽',
            'Personal Care': '🧼',
            'Baby Items': '👶',
            'Miscellaneous': '📦'
        };
        return icons[category] || '📋';
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#1a1a3e', '#2d1b4e', '#3d2755']}
                style={styles.gradientBackground}
            >
                {/* Header */}
                <SafeAreaView>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.backArrow}>←</Text>
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.headerTitle}>🔍 Can I Bring This?</Text>
                            <Text style={styles.headerSubtitle}>TSA security guidelines</Text>
                        </View>
                    </View>
                </SafeAreaView>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search items..."
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Text style={styles.clearButton}>✕</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Category Filters */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoriesContainer}
                    contentContainerStyle={styles.categoriesContent}
                >
                    {TSA_CATEGORIES.map((category) => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.categoryChip,
                                selectedCategory === category && styles.categoryChipActive
                            ]}
                            onPress={() => setSelectedCategory(category)}
                            activeOpacity={0.7}
                        >
                            {category !== 'All' && (
                                <Text style={styles.categoryIcon}>{getCategoryIcon(category)}</Text>
                            )}
                            <Text style={[
                                styles.categoryText,
                                selectedCategory === category && styles.categoryTextActive
                            ]}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Results Count */}
                <View style={styles.resultsHeader}>
                    <Text style={styles.resultsCount}>
                        {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
                    </Text>
                </View>

                {/* Results List */}
                <ScrollView
                    style={styles.resultsList}
                    contentContainerStyle={styles.resultsContent}
                    showsVerticalScrollIndicator={false}
                >
                    {filteredItems.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyIcon}>🔍</Text>
                            <Text style={styles.emptyTitle}>No items found</Text>
                            <Text style={styles.emptyText}>
                                Try searching for common items like "laptop", "liquids", or "scissors"
                            </Text>
                        </View>
                    ) : (
                        filteredItems.map((item, index) => (
                            <TSAItemCard key={index} item={item} getStatusIcon={getStatusIcon} getStatusColor={getStatusColor} getStatusText={getStatusText} />
                        ))
                    )}

                    {/* Footer Disclaimer */}
                    <View style={styles.disclaimer}>
                        <Text style={styles.disclaimerText}>
                            ℹ️ Information based on TSA guidelines. Final decisions rest with TSA officers.
                        </Text>
                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
    );
}

// Item Card Component
function TSAItemCard({ item, getStatusIcon, getStatusColor, getStatusText }: {
    item: TSAItem;
    getStatusIcon: (status: TSAStatus) => string;
    getStatusColor: (status: TSAStatus) => string;
    getStatusText: (status: TSAStatus) => string;
}) {
    const [expanded, setExpanded] = useState(false);

    return (
        <TouchableOpacity
            style={styles.itemCard}
            onPress={() => setExpanded(!expanded)}
            activeOpacity={0.7}
        >
            <View style={styles.itemHeader}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.expandIcon}>{expanded ? '▼' : '▶'}</Text>
            </View>

            <Text style={styles.itemCategory}>{item.category}</Text>

            {/* Status Row */}
            <View style={styles.statusRow}>
                {/* Carry-On Status */}
                <View style={styles.statusItem}>
                    <Text style={styles.statusLabel}>Carry-On</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.carryOn) + '20' }]}>
                        <Text style={styles.statusIcon}>{getStatusIcon(item.carryOn)}</Text>
                        <Text style={[styles.statusValue, { color: getStatusColor(item.carryOn) }]}>
                            {getStatusText(item.carryOn)}
                        </Text>
                    </View>
                </View>

                {/* Checked Status */}
                <View style={styles.statusItem}>
                    <Text style={styles.statusLabel}>Checked Bag</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.checked) + '20' }]}>
                        <Text style={styles.statusIcon}>{getStatusIcon(item.checked)}</Text>
                        <Text style={[styles.statusValue, { color: getStatusColor(item.checked) }]}>
                            {getStatusText(item.checked)}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Expanded Details */}
            {expanded && (
                <View style={styles.expandedContent}>
                    <View style={styles.divider} />

                    <Text style={styles.detailLabel}>Details:</Text>
                    <Text style={styles.detailText}>{item.notes}</Text>

                    {item.restrictions && (
                        <>
                            <Text style={[styles.detailLabel, { marginTop: spacing.md }]}>Restrictions:</Text>
                            <View style={styles.restrictionBox}>
                                <Text style={styles.restrictionText}>⚠️ {item.restrictions}</Text>
                            </View>
                        </>
                    )}
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a3e',
    },
    gradientBackground: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: spacing.lg,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    backArrow: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
        marginTop: 2,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 16,
        marginHorizontal: spacing.lg,
        marginTop: spacing.md,
        paddingHorizontal: spacing.md,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    searchIcon: {
        fontSize: 20,
        marginRight: spacing.sm,
    },
    searchInput: {
        flex: 1,
        paddingVertical: spacing.md,
        fontSize: 16,
        color: '#fff',
    },
    clearButton: {
        fontSize: 20,
        color: 'rgba(255,255,255,0.6)',
        paddingHorizontal: spacing.sm,
    },
    categoriesContainer: {
        marginTop: spacing.lg,
        maxHeight: 50,
    },
    categoriesContent: {
        paddingHorizontal: spacing.lg,
        gap: spacing.sm,
    },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        gap: 6,
    },
    categoryChipActive: {
        backgroundColor: '#7C3AED',
        borderColor: '#9333EA',
    },
    categoryIcon: {
        fontSize: 16,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.8)',
    },
    categoryTextActive: {
        color: '#fff',
    },
    resultsHeader: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    resultsCount: {
        fontSize: 14,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.7)',
    },
    resultsList: {
        flex: 1,
    },
    resultsContent: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xl,
    },
    itemCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 16,
        padding: spacing.lg,
        marginBottom: spacing.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    itemName: {
        flex: 1,
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a3e',
    },
    expandIcon: {
        fontSize: 12,
        color: '#7C3AED',
        marginLeft: spacing.sm,
    },
    itemCategory: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: spacing.md,
    },
    statusRow: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    statusItem: {
        flex: 1,
    },
    statusLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6B7280',
        marginBottom: spacing.xs,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.sm,
        borderRadius: 12,
        gap: 6,
    },
    statusIcon: {
        fontSize: 16,
    },
    statusValue: {
        fontSize: 14,
        fontWeight: '700',
    },
    expandedContent: {
        marginTop: spacing.md,
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginBottom: spacing.md,
    },
    detailLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1a1a3e',
        marginBottom: spacing.xs,
    },
    detailText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#4B5563',
    },
    restrictionBox: {
        backgroundColor: '#FEF3C7',
        borderRadius: 12,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: '#FDE68A',
    },
    restrictionText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#92400E',
        fontWeight: '600',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: spacing.xl * 2,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: spacing.lg,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        marginBottom: spacing.sm,
    },
    emptyText: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'center',
        paddingHorizontal: spacing.xl,
    },
    disclaimer: {
        marginTop: spacing.xl,
        padding: spacing.lg,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    disclaimerText: {
        fontSize: 12,
        lineHeight: 18,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
    },
});
