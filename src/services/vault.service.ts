// Document Vault Service
// Securely store travel documents with biometric protection
// Uses: expo-local-authentication for Face ID / Touch ID / Fingerprint

import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DOCUMENTS_STORAGE_KEY = '@flyride_documents';
const VAULT_LOCK_KEY = '@flyride_vault_lock';
const DOCUMENTS_DIR = `${FileSystem.documentDirectory}documents/`;

// ─── Biometric Authentication ────────────────────────────────────────

/**
 * Check if biometric authentication is available on this device
 */
export async function isBiometricAvailable(): Promise<boolean> {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    return compatible && enrolled;
}

/**
 * Get available biometric type name (Face ID, Touch ID, Fingerprint)
 */
export async function getBiometricType(): Promise<string> {
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
        return 'Face ID';
    }
    if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
        return 'Touch ID';
    }
    return 'Biometric';
}

/**
 * Authenticate user with biometrics before accessing vault
 */
export async function authenticateVault(): Promise<boolean> {
    const isAvailable = await isBiometricAvailable();
    if (!isAvailable) return true; // Skip if not available

    const isLocked = await isVaultLocked();
    if (!isLocked) return true; // Skip if user hasn't enabled lock

    const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access Document Vault',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false,
        fallbackLabel: 'Use Passcode',
    });

    return result.success;
}

/**
 * Check if vault lock is enabled
 */
export async function isVaultLocked(): Promise<boolean> {
    try {
        const value = await AsyncStorage.getItem(VAULT_LOCK_KEY);
        return value === 'true';
    } catch {
        return false;
    }
}

/**
 * Toggle vault biometric lock on/off
 */
export async function setVaultLock(enabled: boolean): Promise<void> {
    await AsyncStorage.setItem(VAULT_LOCK_KEY, enabled ? 'true' : 'false');
}

export type DocumentCategory =
    | 'passport'
    | 'visa'
    | 'insurance'
    | 'hotel'
    | 'rental'
    | 'vaccination'
    | 'prescription'
    | 'other';

export interface VaultDocument {
    id: string;
    category: DocumentCategory;
    title: string;
    fileUri: string;
    fileName: string;
    fileType: 'image' | 'pdf';
    size?: number;
    notes?: string;
    expiryDate?: string; // For passports, visas, insurance
    createdAt: string;
    lastAccessed?: string;
}

// ─── Import/Add ──────────────────────────────────────

/**
 * Import a PDF document (insurance, hotel booking, etc.)
 */
export async function importPdfDocument(
    category: DocumentCategory,
    title: string
): Promise<VaultDocument | null> {
    try {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'application/pdf',
            copyToCacheDirectory: true,
        });

        if (result.canceled) return null;

        const asset = result.assets[0];

        // Ensure documents directory exists
        const dirInfo = await FileSystem.getInfoAsync(DOCUMENTS_DIR);
        if (!dirInfo.exists) {
            await FileSystem.makeDirectoryAsync(DOCUMENTS_DIR, { intermediates: true });
        }

        // Save file
        const uniqueName = `${Date.now()}_${asset.name}`;
        const destPath = `${DOCUMENTS_DIR}${uniqueName}`;
        await FileSystem.copyAsync({ from: asset.uri, to: destPath });

        const doc: VaultDocument = {
            id: `doc_${Date.now()}`,
            category,
            title,
            fileUri: destPath,
            fileName: asset.name,
            fileType: 'pdf',
            size: asset.size,
            createdAt: new Date().toISOString(),
        };

        await saveDocument(doc);
        return doc;
    } catch (error) {
        console.error('Error importing PDF:', error);
        throw error;
    }
}

/**
 * Take a photo of a document (passport, visa, ID)
 */
export async function captureDocumentPhoto(
    category: DocumentCategory,
    title: string
): Promise<VaultDocument | null> {
    try {
        // Request camera permissions
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            throw new Error('Camera permission denied');
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.9,
            allowsEditing: true,
        });

        if (result.canceled) return null;

        const asset = result.assets[0];

        // Ensure documents directory exists
        const dirInfo = await FileSystem.getInfoAsync(DOCUMENTS_DIR);
        if (!dirInfo.exists) {
            await FileSystem.makeDirectoryAsync(DOCUMENTS_DIR, { intermediates: true });
        }

        // Save image
        const uniqueName = `${Date.now()}_${category}.jpg`;
        const destPath = `${DOCUMENTS_DIR}${uniqueName}`;
        await FileSystem.copyAsync({ from: asset.uri, to: destPath });

        const doc: VaultDocument = {
            id: `doc_${Date.now()}`,
            category,
            title,
            fileUri: destPath,
            fileName: uniqueName,
            fileType: 'image',
            createdAt: new Date().toISOString(),
        };

        await saveDocument(doc);
        return doc;
    } catch (error) {
        console.error('Error capturing photo:', error);
        throw error;
    }
}

/**
 * Select an image from gallery
 */
export async function selectImageFromGallery(
    category: DocumentCategory,
    title: string
): Promise<VaultDocument | null> {
    try {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            throw new Error('Gallery permission denied');
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.9,
            allowsEditing: true,
        });

        if (result.canceled) return null;

        const asset = result.assets[0];

        const dirInfo = await FileSystem.getInfoAsync(DOCUMENTS_DIR);
        if (!dirInfo.exists) {
            await FileSystem.makeDirectoryAsync(DOCUMENTS_DIR, { intermediates: true });
        }

        const uniqueName = `${Date.now()}_${category}.jpg`;
        const destPath = `${DOCUMENTS_DIR}${uniqueName}`;
        await FileSystem.copyAsync({ from: asset.uri, to: destPath });

        const doc: VaultDocument = {
            id: `doc_${Date.now()}`,
            category,
            title,
            fileUri: destPath,
            fileName: uniqueName,
            fileType: 'image',
            createdAt: new Date().toISOString(),
        };

        await saveDocument(doc);
        return doc;
    } catch (error) {
        console.error('Error selecting image:', error);
        throw error;
    }
}

// ─── CRUD ────────────────────────────────────────────

async function saveDocument(doc: VaultDocument) {
    try {
        const stored = await AsyncStorage.getItem(DOCUMENTS_STORAGE_KEY);
        const documents: VaultDocument[] = stored ? JSON.parse(stored) : [];
        documents.push(doc);
        await AsyncStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(documents));
    } catch (error) {
        console.error('Error saving document:', error);
    }
}

export async function getAllDocuments(): Promise<VaultDocument[]> {
    try {
        const stored = await AsyncStorage.getItem(DOCUMENTS_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error loading documents:', error);
        return [];
    }
}

export async function getDocumentsByCategory(category: DocumentCategory): Promise<VaultDocument[]> {
    try {
        const all = await getAllDocuments();
        return all.filter(d => d.category === category);
    } catch (error) {
        console.error('Error filtering documents:', error);
        return [];
    }
}

export async function updateDocument(
    docId: string,
    updates: Partial<VaultDocument>
): Promise<void> {
    try {
        const stored = await AsyncStorage.getItem(DOCUMENTS_STORAGE_KEY);
        if (!stored) return;

        const documents: VaultDocument[] = JSON.parse(stored);
        const index = documents.findIndex(d => d.id === docId);

        if (index !== -1) {
            documents[index] = { ...documents[index], ...updates };
            await AsyncStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(documents));
        }
    } catch (error) {
        console.error('Error updating document:', error);
    }
}

export async function deleteDocument(docId: string): Promise<void> {
    try {
        const stored = await AsyncStorage.getItem(DOCUMENTS_STORAGE_KEY);
        if (!stored) return;

        const documents: VaultDocument[] = JSON.parse(stored);
        const doc = documents.find(d => d.id === docId);

        // Delete file
        if (doc) {
            try {
                const info = await FileSystem.getInfoAsync(doc.fileUri);
                if (info.exists) {
                    await FileSystem.deleteAsync(doc.fileUri);
                }
            } catch (e) {
                console.log('Could not delete document file:', e);
            }
        }

        // Remove from storage
        const filtered = documents.filter(d => d.id !== docId);
        await AsyncStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
        console.error('Error deleting document:', error);
    }
}

// ─── Helpers ─────────────────────────────────────────

export function getCategoryIcon(category: DocumentCategory): string {
    const icons: Record<DocumentCategory, string> = {
        passport: '🛂',
        visa: '📝',
        insurance: '🛡️',
        hotel: '🏨',
        rental: '🚗',
        vaccination: '💉',
        prescription: '💊',
        other: '📄',
    };
    return icons[category];
}

export function getCategoryLabel(category: DocumentCategory): string {
    const labels: Record<DocumentCategory, string> = {
        passport: 'Passport',
        visa: 'Visa',
        insurance: 'Insurance',
        hotel: 'Hotel Confirmation',
        rental: 'Rental Agreement',
        vaccination: 'Vaccination Record',
        prescription: 'Prescription',
        other: 'Other Document',
    };
    return labels[category];
}

/**
 * Check if a document is expiring soon (within 30 days)
 */
export function isExpiringSoon(doc: VaultDocument): boolean {
    if (!doc.expiryDate) return false;
    try {
        const expiry = new Date(doc.expiryDate);
        const now = new Date();
        const daysUntil = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
        return daysUntil > 0 && daysUntil <= 30;
    } catch {
        return false;
    }
}

/**
 * Check if a document is expired
 */
export function isExpired(doc: VaultDocument): boolean {
    if (!doc.expiryDate) return false;
    try {
        const expiry = new Date(doc.expiryDate);
        return expiry < new Date();
    } catch {
        return false;
    }
}
