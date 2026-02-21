import React, { useState, useCallback, useEffect } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    ActivityIndicator, Platform, Modal, TextInput, Alert, Image, Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import * as Sharing from 'expo-sharing';
import {
    getAllDocuments,
    getDocumentsByCategory,
    captureDocumentPhoto,
    importPdfDocument,
    selectImageFromGallery,
    deleteDocument,
    updateDocument,
    VaultDocument,
    DocumentCategory,
    getCategoryIcon,
    getCategoryLabel,
    isExpired,
    isExpiringSoon,
    authenticateVault,
    isVaultLocked,
    setVaultLock,
    isBiometricAvailable,
    getBiometricType,
} from '../services/vault.service';

export default function DocumentVaultScreen({ navigation }: any) {
    const [documents, setDocuments] = useState<VaultDocument[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<DocumentCategory>('passport');
    const [title, setTitle] = useState('');
    const [isLocked, setIsLocked] = useState(false);
    const [biometricAvailable, setBiometricAvailable] = useState(false);
    const [biometricType, setBiometricType] = useState('Biometric');
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        checkBiometrics();
    }, []);

    const checkBiometrics = async () => {
        const available = await isBiometricAvailable();
        setBiometricAvailable(available);
        if (available) {
            const type = await getBiometricType();
            setBiometricType(type);
        }
        const locked = await isVaultLocked();
        setIsLocked(locked);
    };

    const handleToggleLock = async (value: boolean) => {
        if (value) {
            // Authenticate before enabling lock
            const success = await authenticateVault();
            if (!success) {
                Alert.alert('Authentication Failed', 'Could not enable vault lock.');
                return;
            }
        }
        await setVaultLock(value);
        setIsLocked(value);
        Alert.alert(
            value ? '🔒 Vault Locked' : '🔓 Vault Unlocked',
            value
                ? `${biometricType} will be required to open the vault.`
                : 'Biometric lock has been disabled.'
        );
    };

    const categories: DocumentCategory[] = [
        'passport',
        'visa',
        'insurance',
        'hotel',
        'rental',
        'vaccination',
        'prescription',
        'other',
    ];

    useFocusEffect(useCallback(() => {
        const run = async () => {
            const locked = await isVaultLocked();
            if (locked) {
                const success = await authenticateVault();
                if (!success) {
                    navigation.goBack();
                    return;
                }
            }
            setAuthenticated(true);
            loadDocuments();
        };
        run();
    }, []));

    const loadDocuments = async () => {
        try {
            setLoading(true);
            const docs = await getAllDocuments();
            setDocuments(docs);
        } catch (error) {
            console.error('Error loading documents:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCapturePhoto = async () => {
        try {
            if (!title.trim()) {
                Alert.alert('Missing Title', 'Please enter a document title');
                return;
            }
            const doc = await captureDocumentPhoto(selectedCategory, title);
            if (doc) {
                setShowAddModal(false);
                setTitle('');
                loadDocuments();
                Alert.alert('Success', 'Document photo captured!');
            }
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to capture photo');
        }
    };

    const handleSelectImage = async () => {
        try {
            if (!title.trim()) {
                Alert.alert('Missing Title', 'Please enter a document title');
                return;
            }
            const doc = await selectImageFromGallery(selectedCategory, title);
            if (doc) {
                setShowAddModal(false);
                setTitle('');
                loadDocuments();
                Alert.alert('Success', 'Document imported from gallery!');
            }
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to select image');
        }
    };

    const handleImportPdf = async () => {
        try {
            if (!title.trim()) {
                Alert.alert('Missing Title', 'Please enter a document title');
                return;
            }
            const doc = await importPdfDocument(selectedCategory, title);
            if (doc) {
                setShowAddModal(false);
                setTitle('');
                loadDocuments();
                Alert.alert('Success', 'PDF imported!');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to import PDF');
        }
    };

    const handleOpenDocument = async (doc: VaultDocument) => {
        try {
            await updateDocument(doc.id, { lastAccessed: new Date().toISOString() });
            if (doc.fileType === 'pdf') {
                navigation.navigate('PdfViewer', {
                    uri: doc.fileUri,
                    title: doc.title,
                });
            } else {
                // Images — use share sheet to view
                await Sharing.shareAsync(doc.fileUri);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to open document');
        }
    };

    const handleDeleteDocument = async (docId: string, docTitle: string) => {
        Alert.alert('Delete Document', `Delete "${docTitle}"?`, [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    await deleteDocument(docId);
                    loadDocuments();
                },
            },
        ]);
    };

    // Group by category
    const groupedDocs: Record<string, VaultDocument[]> = {};
    documents.forEach(doc => {
        if (!groupedDocs[doc.category]) groupedDocs[doc.category] = [];
        groupedDocs[doc.category].push(doc);
    });

    return (
        <View style={styles.container}>
            {/* Header */}
            <LinearGradient
                colors={['#1a1a2e', '#2a2a4e', '#3a3a6e']}
                style={styles.header}
            >
                <View style={styles.headerRow}>
                    <View>
                        <Text style={styles.title}>🛂 Document Vault</Text>
                        <Text style={styles.subtitle}>
                            {documents.length} document{documents.length !== 1 ? 's' : ''} stored
                        </Text>
                    </View>
                    {biometricAvailable && (
                        <View style={styles.lockToggle}>
                            <Text style={styles.lockLabel}>{isLocked ? '🔒' : '🔓'}</Text>
                            <Switch
                                value={isLocked}
                                onValueChange={handleToggleLock}
                                trackColor={{ false: 'rgba(255,255,255,0.2)', true: '#6b5fcc' }}
                                thumbColor={isLocked ? '#fff' : '#ccc'}
                            />
                        </View>
                    )}
                </View>
            </LinearGradient>

            {loading ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#6b5fcc" />
                </View>
            ) : documents.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyIcon}>📭</Text>
                    <Text style={styles.emptyTitle}>No documents yet</Text>
                    <Text style={styles.emptyText}>
                        Store your travel documents securely: passport photos, visa PDFs,
                        insurance documents, hotel confirmations, and more.
                    </Text>
                    <TouchableOpacity style={styles.emptyBtn} onPress={() => setShowAddModal(true)}>
                        <Text style={styles.emptyBtnText}>+ Add First Document</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
                    {Object.entries(groupedDocs).map(([cat, docs]) => (
                        <View key={cat} style={styles.categorySection}>
                            <View style={styles.categoryHeader}>
                                <Text style={styles.categoryIcon}>
                                    {getCategoryIcon(cat as DocumentCategory)}
                                </Text>
                                <Text style={styles.categoryTitle}>
                                    {getCategoryLabel(cat as DocumentCategory)}
                                </Text>
                                <Text style={styles.categoryCount}>{docs.length}</Text>
                            </View>

                            {docs.map(doc => (
                                <TouchableOpacity
                                    key={doc.id}
                                    style={styles.docCard}
                                    onPress={() => handleOpenDocument(doc)}
                                    activeOpacity={0.8}
                                >
                                    <View style={styles.docIcon}>
                                        <Text style={styles.docIconText}>
                                            {doc.fileType === 'image' ? '🖼️' : '📄'}
                                        </Text>
                                    </View>
                                    <View style={styles.docInfo}>
                                        <Text style={styles.docTitle}>{doc.title}</Text>
                                        <Text style={styles.docDate}>
                                            Added {new Date(doc.createdAt).toLocaleDateString()}
                                        </Text>
                                        {doc.expiryDate && (
                                            <View
                                                style={[
                                                    styles.expiryBadge,
                                                    isExpired(doc) && styles.expiryBadgeExpired,
                                                    isExpiringSoon(doc) && styles.expiryBadgeWarning,
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.expiryText,
                                                        (isExpired(doc) || isExpiringSoon(doc)) &&
                                                        styles.expiryTextAlert,
                                                    ]}
                                                >
                                                    {isExpired(doc)
                                                        ? '⚠️ Expired'
                                                        : isExpiringSoon(doc)
                                                            ? '⏰ Expiring Soon'
                                                            : `Expires ${new Date(doc.expiryDate).toLocaleDateString()}`}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => handleDeleteDocument(doc.id, doc.title)}
                                        style={styles.deleteDocBtn}
                                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                    >
                                        <Text style={styles.deleteDocBtnText}>🗑️</Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}

                    <View style={{ height: 100 }} />
                </ScrollView>
            )}

            {/* FAB */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setShowAddModal(true)}
                activeOpacity={0.8}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            {/* Add Document Modal */}
            <Modal visible={showAddModal} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Add Document</Text>
                            <TouchableOpacity onPress={() => setShowAddModal(false)}>
                                <Text style={styles.modalClose}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.fieldLabel}>CATEGORY</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.categoryScroll}
                        >
                            {categories.map(cat => (
                                <TouchableOpacity
                                    key={cat}
                                    style={[
                                        styles.catChip,
                                        selectedCategory === cat && styles.catChipActive,
                                    ]}
                                    onPress={() => setSelectedCategory(cat)}
                                >
                                    <Text style={styles.catChipIcon}>{getCategoryIcon(cat)}</Text>
                                    <Text
                                        style={[
                                            styles.catChipText,
                                            selectedCategory === cat && styles.catChipTextActive,
                                        ]}
                                    >
                                        {getCategoryLabel(cat)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <Text style={styles.fieldLabel}>TITLE</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., My Passport, Travel Insurance"
                            placeholderTextColor="#999"
                            value={title}
                            onChangeText={setTitle}
                        />

                        <Text style={styles.fieldLabel}>IMPORT METHOD</Text>
                        <TouchableOpacity style={styles.methodBtn} onPress={handleCapturePhoto}>
                            <Text style={styles.methodIcon}>📷</Text>
                            <View style={styles.methodTextContainer}>
                                <Text style={styles.methodTitle}>Take Photo</Text>
                                <Text style={styles.methodSubtitle}>Use camera to scan document</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.methodBtn} onPress={handleSelectImage}>
                            <Text style={styles.methodIcon}>🖼️</Text>
                            <View style={styles.methodTextContainer}>
                                <Text style={styles.methodTitle}>Select from Gallery</Text>
                                <Text style={styles.methodSubtitle}>Choose existing photo</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.methodBtn} onPress={handleImportPdf}>
                            <Text style={styles.methodIcon}>📄</Text>
                            <View style={styles.methodTextContainer}>
                                <Text style={styles.methodTitle}>Import PDF</Text>
                                <Text style={styles.methodSubtitle}>Select PDF file</Text>
                            </View>
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
        paddingBottom: 18,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lockToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    lockLabel: { fontSize: 20 },
    title: { fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 4 },
    subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.7)' },

    // Content
    content: { flex: 1 },
    contentInner: { padding: 16 },
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },

    // Empty State
    emptyState: { alignItems: 'center', paddingVertical: 60, paddingHorizontal: 30 },
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

    // Category Section
    categorySection: { marginBottom: 20 },
    categoryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 8,
    },
    categoryIcon: { fontSize: 20 },
    categoryTitle: { flex: 1, fontSize: 16, fontWeight: '700', color: '#1a1a2e' },
    categoryCount: { fontSize: 14, fontWeight: '600', color: '#888' },

    // Document Card
    docCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    docIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#f0f0f5',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    docIconText: { fontSize: 20 },
    docInfo: { flex: 1 },
    docTitle: { fontSize: 15, fontWeight: '600', color: '#1a1a2e', marginBottom: 3 },
    docDate: { fontSize: 12, color: '#999' },
    expiryBadge: {
        backgroundColor: '#e8f4fd',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        alignSelf: 'flex-start',
        marginTop: 4,
    },
    expiryBadgeWarning: { backgroundColor: '#fff3cd' },
    expiryBadgeExpired: { backgroundColor: '#f8d7da' },
    expiryText: { fontSize: 11, fontWeight: '600', color: '#0c5460' },
    expiryTextAlert: { color: '#721c24' },
    deleteDocBtn: { padding: 4 },
    deleteDocBtnText: { fontSize: 20 },

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
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
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
    categoryScroll: { marginBottom: 8 },
    catChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f5',
        marginRight: 8,
    },
    catChipActive: { backgroundColor: '#6b5fcc' },
    catChipIcon: { fontSize: 16 },
    catChipText: { fontSize: 12, fontWeight: '600', color: '#666' },
    catChipTextActive: { color: '#fff' },
    input: {
        backgroundColor: '#f5f5f8',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: '#1a1a2e',
        marginBottom: 8,
    },
    methodBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8fa',
        padding: 14,
        borderRadius: 12,
        marginBottom: 10,
        gap: 12,
    },
    methodIcon: { fontSize: 28 },
    methodTextContainer: { flex: 1 },
    methodTitle: { fontSize: 15, fontWeight: '600', color: '#1a1a2e', marginBottom: 2 },
    methodSubtitle: { fontSize: 12, color: '#888' },
});
