import React, { useState, useRef } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Platform, Alert,
    Image, SafeAreaView, ScrollView, TextInput, Modal
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { colors } from '../theme';
import { LuggageModel, LUGGAGE_DATABASE, searchLuggage, getLuggageByType } from '../data/luggage-database';
import { PackingItem, PACKING_ITEMS, getItemsByCategory, calculatePackingWeight } from '../data/packing-items.data';

type ScreenMode = 'luggage-selection' | 'packing-list' | 'camera' | 'results';

interface SelectedPackingItem {
    item: PackingItem;
    quantity: number;
}

export default function ARLuggageScreen({ navigation }: any) {
    const [permission, requestPermission] = useCameraPermissions();
    const [mode, setMode] = useState<ScreenMode>('luggage-selection');
    const [selectedLuggage, setSelectedLuggage] = useState<LuggageModel | null>(null);
    const [packingItems, setPackingItems] = useState<SelectedPackingItem[]>([]);
    const [image, setImage] = useState<string | null>(null);
    const cameraRef = useRef<CameraView>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Luggage Selection Screen
    const renderLuggageSelection = () => {
        const filteredLuggage = searchQuery
            ? searchLuggage(searchQuery)
            : getLuggageByType('carry-on');

        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={styles.headerButton}>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Select Luggage</Text>
                        <View style={styles.headerPlaceholder} />
                    </View>

                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search brand or model..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholderTextColor="#999"
                        />
                    </View>

                    <ScrollView style={styles.scrollView}>
                        {filteredLuggage.map((luggage, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.luggageCard}
                                onPress={() => {
                                    setSelectedLuggage(luggage);
                                    setMode('packing-list');
                                }}
                            >
                                <View style={styles.luggageInfo}>
                                    <Text style={styles.luggageBrand}>{luggage.brand}</Text>
                                    <Text style={styles.luggageModel}>{luggage.model}</Text>
                                    <Text style={styles.luggageDetails}>
                                        {luggage.dimensions.height}" × {luggage.dimensions.width}" × {luggage.dimensions.depth}"
                                    </Text>
                                </View>
                                <View style={styles.luggageWeight}>
                                    <Text style={styles.luggageWeightText}>{luggage.emptyWeight.lbs} lbs</Text>
                                    <Text style={styles.luggageWeightLabel}>empty</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    };

    // Packing List Screen
    const renderPackingList = () => {
        const totalPackingWeight = calculatePackingWeight(packingItems);
        const totalWeight = (selectedLuggage?.emptyWeight.lbs || 0) + totalPackingWeight;

        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => setMode('luggage-selection')}>
                            <Text style={styles.headerButton}>Back</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Packing List</Text>
                        <TouchableOpacity onPress={() => setMode('camera')}>
                            <Text style={styles.headerButton}>Next</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryTitle}>{selectedLuggage?.brand} {selectedLuggage?.model}</Text>
                        <View style={styles.weightRow}>
                            <Text style={styles.weightLabel}>Empty:</Text>
                            <Text style={styles.weightValue}>{selectedLuggage?.emptyWeight.lbs} lbs</Text>
                        </View>
                        <View style={styles.weightRow}>
                            <Text style={styles.weightLabel}>Packing:</Text>
                            <Text style={styles.weightValue}>{totalPackingWeight.toFixed(1)} lbs</Text>
                        </View>
                        <View style={[styles.weightRow, styles.totalRow]}>
                            <Text style={styles.totalLabel}>Total:</Text>
                            <Text style={styles.totalValue}>{totalWeight.toFixed(1)} lbs</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.addItemButton}
                        onPress={() => setShowCategoryModal(true)}
                    >
                        <Text style={styles.addItemButtonText}>+ Add Items</Text>
                    </TouchableOpacity>

                    <ScrollView style={styles.itemsList}>
                        {packingItems.map((item, index) => (
                            <View key={index} style={styles.packingItemCard}>
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemName}>{item.item.name}</Text>
                                    <Text style={styles.itemWeight}>
                                        {(item.item.typicalWeight.average * item.quantity).toFixed(1)} lbs
                                    </Text>
                                </View>
                                <View style={styles.quantityControls}>
                                    <TouchableOpacity
                                        style={styles.quantityButton}
                                        onPress={() => {
                                            if (item.quantity > 1) {
                                                const updated = packingItems.map((p, i) =>
                                                    i === index ? { ...p, quantity: p.quantity - 1 } : p
                                                );
                                                setPackingItems(updated);
                                            } else {
                                                setPackingItems(packingItems.filter((_, i) => i !== index));
                                            }
                                        }}
                                    >
                                        <Text style={styles.quantityButtonText}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.quantityText}>{item.quantity}</Text>
                                    <TouchableOpacity
                                        style={styles.quantityButton}
                                        onPress={() => {
                                            const updated = packingItems.map((p, i) =>
                                                i === index ? { ...p, quantity: p.quantity + 1 } : p
                                            );
                                            setPackingItems(updated);
                                        }}
                                    >
                                        <Text style={styles.quantityButtonText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </SafeAreaView>

                {/* Category Modal */}
                <Modal
                    visible={showCategoryModal}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setShowCategoryModal(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>
                                {selectedCategory ? 'Select Item' : 'Select Category'}
                            </Text>
                            {!selectedCategory ? (
                                <ScrollView>
                                    {['clothing', 'shoes', 'electronics', 'toiletries', 'accessories', 'documents'].map(cat => (
                                        <TouchableOpacity
                                            key={cat}
                                            style={styles.categoryOption}
                                            onPress={() => setSelectedCategory(cat)}
                                        >
                                            <Text style={styles.categoryOptionText}>
                                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            ) : (
                                <>
                                    <TouchableOpacity
                                        style={styles.backButton}
                                        onPress={() => setSelectedCategory(null)}
                                    >
                                        <Text style={styles.backButtonText}>← Back to Categories</Text>
                                    </TouchableOpacity>
                                    <ScrollView>
                                        {getItemsByCategory(selectedCategory).map(item => (
                                            <TouchableOpacity
                                                key={item.id}
                                                style={styles.itemOption}
                                                onPress={() => {
                                                    const existing = packingItems.find(p => p.item.id === item.id);
                                                    if (existing) {
                                                        setPackingItems(packingItems.map(p =>
                                                            p.item.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
                                                        ));
                                                    } else {
                                                        setPackingItems([...packingItems, { item, quantity: 1 }]);
                                                    }
                                                    setShowCategoryModal(false);
                                                    setSelectedCategory(null);
                                                }}
                                            >
                                                <Text style={styles.itemOptionName}>{item.name}</Text>
                                                <Text style={styles.itemOptionWeight}>
                                                    ~{item.typicalWeight.average} lbs
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </>
                            )}
                            <TouchableOpacity
                                style={styles.modalCloseButton}
                                onPress={() => {
                                    setShowCategoryModal(false);
                                    setSelectedCategory(null);
                                }}
                            >
                                <Text style={styles.modalCloseButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };

    // Camera Screen
    const takePicture = async () => {
        if (cameraRef.current) {
            setAnalyzing(true);
            try {
                const photo = await cameraRef.current.takePictureAsync();
                setImage(photo?.uri || null);
                setMode('results');
            } catch (error) {
                Alert.alert("Error", "Failed to take photo");
            } finally {
                setAnalyzing(false);
            }
        }
    };

    const renderCamera = () => {
        if (!permission?.granted) {
            return (
                <View style={styles.permissionContainer}>
                    <Text style={styles.permissionText}>We need your camera permission to scan luggage.</Text>
                    <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                        <Text style={styles.permissionButtonText}>Grant Permission</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.backButtonSimple} onPress={() => setMode('packing-list')}>
                        <Text style={styles.backButtonTextSimple}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <CameraView style={styles.camera} facing="back" ref={cameraRef}>
                    <SafeAreaView style={styles.cameraUi}>
                        <View style={styles.header}>
                            <TouchableOpacity
                                style={styles.backButtonCamera}
                                onPress={() => setMode('packing-list')}
                            >
                                <Text style={styles.backIcon}>←</Text>
                            </TouchableOpacity>
                            <View style={styles.modeBadge}>
                                <Text style={styles.modeText}>AR Scanner</Text>
                            </View>
                            <View style={styles.controlPlaceholder} />
                        </View>

                        <View style={styles.guideContainer}>
                            <View style={styles.guideBox}>
                                <View style={[styles.corner, styles.tl]} />
                                <View style={[styles.corner, styles.tr]} />
                                <View style={[styles.corner, styles.bl]} />
                                <View style={[styles.corner, styles.br]} />
                                <Text style={styles.guideText}>Align bag within box</Text>
                            </View>
                        </View>

                        <View style={styles.controls}>
                            <TouchableOpacity
                                style={styles.captureButton}
                                onPress={takePicture}
                                disabled={analyzing}
                            >
                                <View style={styles.captureInner} />
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </CameraView>
            </View>
        );
    };

    // Results Screen
    const renderResults = () => {
        const totalPackingWeight = calculatePackingWeight(packingItems);
        const emptyWeight = selectedLuggage?.emptyWeight.lbs || 0;
        const totalWeight = emptyWeight + totalPackingWeight;
        const isCarryOn = selectedLuggage?.type === 'carry-on';
        const maxCarryOnWeight = 40; // Most airlines limit carry-on to 40 lbs
        const isOverWeight = isCarryOn && totalWeight > maxCarryOnWeight;

        return (
            <View style={styles.container}>
                <Image source={{ uri: image || '' }} style={styles.previewImage} />
                <View style={styles.overlay}>
                    <ScrollView style={styles.resultsScrollView}>
                        <View style={styles.resultCard}>
                            <Text style={styles.resultTitle}>Weight Analysis</Text>

                            <View style={styles.matchContainer}>
                                <Text style={styles.matchIcon}>{isOverWeight ? '⚠️' : '✅'}</Text>
                                <Text style={[styles.matchText, isOverWeight && styles.warningText]}>
                                    {isOverWeight
                                        ? `Over Carry-On Limit (${maxCarryOnWeight} lbs)`
                                        : 'Within Carry-On Limits'}
                                </Text>
                            </View>

                            <View style={styles.weightBreakdown}>
                                <Text style={styles.breakdownTitle}>Weight Breakdown</Text>
                                <View style={styles.breakdownRow}>
                                    <Text style={styles.breakdownLabel}>Luggage (Empty):</Text>
                                    <Text style={styles.breakdownValue}>{emptyWeight.toFixed(1)} lbs</Text>
                                </View>
                                <View style={styles.breakdownRow}>
                                    <Text style={styles.breakdownLabel}>Packed Items:</Text>
                                    <Text style={styles.breakdownValue}>{totalPackingWeight.toFixed(1)} lbs</Text>
                                </View>
                                <View style={[styles.breakdownRow, styles.totalBreakdownRow]}>
                                    <Text style={styles.breakdownTotalLabel}>Total Weight:</Text>
                                    <Text style={[styles.breakdownTotalValue, isOverWeight && styles.warningValue]}>
                                        {totalWeight.toFixed(1)} lbs
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.dimensionsContainer}>
                                <Text style={styles.dimensionsLabel}>Dimensions:</Text>
                                <Text style={styles.dimensionsText}>
                                    {selectedLuggage?.dimensions.height}" × {selectedLuggage?.dimensions.width}" × {selectedLuggage?.dimensions.depth}"
                                </Text>
                            </View>

                            <Text style={styles.disclaimerText}>
                                *Estimation based on luggage model and packing list. Always verify with airline sizer and scale.
                            </Text>

                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    style={styles.secondaryButton}
                                    onPress={() => {
                                        setImage(null);
                                        setMode('packing-list');
                                    }}
                                >
                                    <Text style={styles.secondaryButtonText}>Edit List</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.primaryButton}
                                    onPress={() => {
                                        setImage(null);
                                        setSelectedLuggage(null);
                                        setPackingItems([]);
                                        setMode('luggage-selection');
                                    }}
                                >
                                    <Text style={styles.primaryButtonText}>New Scan</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    };

    // Route to correct screen
    switch (mode) {
        case 'luggage-selection':
            return renderLuggageSelection();
        case 'packing-list':
            return renderPackingList();
        case 'camera':
            return renderCamera();
        case 'results':
            return renderResults();
        default:
            return renderLuggageSelection();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
    headerButton: {
        color: colors.primary.main,
        fontSize: 16,
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerPlaceholder: {
        width: 60,
    },
    searchContainer: {
        padding: 16,
    },
    searchInput: {
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 10,
        fontSize: 16,
    },
    scrollView: {
        flex: 1,
    },
    luggageCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 12,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e5e5',
    },
    luggageInfo: {
        flex: 1,
    },
    luggageBrand: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    luggageModel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    luggageDetails: {
        fontSize: 12,
        color: '#999',
    },
    luggageWeight: {
        alignItems: 'flex-end',
    },
    luggageWeightText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary.main,
    },
    luggageWeightLabel: {
        fontSize: 12,
        color: '#999',
    },
    summaryCard: {
        margin: 16,
        padding: 16,
        backgroundColor: '#f0f9ff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#bfdbfe',
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    weightRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    weightLabel: {
        fontSize: 14,
        color: '#666',
    },
    weightValue: {
        fontSize: 14,
        fontWeight: '600',
    },
    totalRow: {
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#bfdbfe',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primary.main,
    },
    addItemButton: {
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 16,
        backgroundColor: colors.primary.main,
        borderRadius: 12,
        alignItems: 'center',
    },
    addItemButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemsList: {
        flex: 1,
    },
    packingItemCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        marginHorizontal: 16,
        marginBottom: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    itemWeight: {
        fontSize: 12,
        color: '#666',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.primary.main,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantityText: {
        marginHorizontal: 12,
        fontSize: 16,
        fontWeight: '600',
        minWidth: 24,
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    categoryOption: {
        padding: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        marginBottom: 8,
    },
    categoryOptionText: {
        fontSize: 16,
        fontWeight: '600',
    },
    backButton: {
        marginBottom: 12,
    },
    backButtonText: {
        color: colors.primary.main,
        fontSize: 14,
    },
    itemOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        marginBottom: 8,
    },
    itemOptionName: {
        fontSize: 14,
        fontWeight: '600',
    },
    itemOptionWeight: {
        fontSize: 12,
        color: '#666',
    },
    modalCloseButton: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalCloseButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    permissionContainer: {
        flex: 1,
        backgroundColor: colors.light.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    permissionText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: colors.light.text,
    },
    permissionButton: {
        backgroundColor: colors.primary.main,
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    permissionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButtonSimple: {
        padding: 10,
    },
    backButtonTextSimple: {
        color: colors.primary.main,
        fontSize: 16,
    },
    camera: {
        flex: 1,
    },
    cameraUi: {
        flex: 1,
        justifyContent: 'space-between',
    },
    backButtonCamera: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    modeBadge: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    modeText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    controlPlaceholder: {
        width: 40,
    },
    guideContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    guideBox: {
        width: '70%',
        aspectRatio: 0.7,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    guideText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        fontWeight: '500',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 8,
        borderRadius: 8,
    },
    corner: {
        position: 'absolute',
        width: 30,
        height: 30,
        borderColor: '#2ecc71',
        borderWidth: 4,
    },
    tl: { top: -2, left: -2, borderBottomWidth: 0, borderRightWidth: 0 },
    tr: { top: -2, right: -2, borderBottomWidth: 0, borderLeftWidth: 0 },
    bl: { bottom: -2, left: -2, borderTopWidth: 0, borderRightWidth: 0 },
    br: { bottom: -2, right: -2, borderTopWidth: 0, borderLeftWidth: 0 },
    controls: {
        padding: 30,
        alignItems: 'center',
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    captureInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
    },
    previewImage: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    resultsScrollView: {
        flex: 1,
    },
    resultCard: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
    },
    resultTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
        textAlign: 'center',
    },
    matchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e6fffa',
        padding: 12,
        borderRadius: 12,
        marginBottom: 16,
    },
    matchIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    matchText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c7a7b',
    },
    warningText: {
        color: '#c53030',
    },
    weightBreakdown: {
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    breakdownTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    breakdownRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    breakdownLabel: {
        fontSize: 14,
        color: '#666',
    },
    breakdownValue: {
        fontSize: 14,
        fontWeight: '600',
    },
    totalBreakdownRow: {
        marginTop: 8,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#e5e5e5',
    },
    breakdownTotalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    breakdownTotalValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primary.main,
    },
    warningValue: {
        color: '#c53030',
    },
    dimensionsContainer: {
        marginBottom: 16,
    },
    dimensionsLabel: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    dimensionsText: {
        fontSize: 16,
        color: '#4a5568',
    },
    disclaimerText: {
        fontSize: 12,
        color: '#a0aec0',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
    },
    secondaryButton: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    primaryButton: {
        flex: 1,
        backgroundColor: colors.primary.main,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
