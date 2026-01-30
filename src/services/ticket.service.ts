import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Ticket } from '../types/ticket.types';

// Mock in-memory storage for development
// In a real app, this would be persisted to Firestore or AsyncStorage
let ticketsStore: Ticket[] = [];

/**
 * Pick a PDF document and create a ticket from it
 */
export const pickTicketPDF = async (): Promise<Ticket | null> => {
    try {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'application/pdf',
            copyToCacheDirectory: true,
        });

        if (result.canceled) {
            return null;
        }

        const asset = result.assets[0];

        // Ensure tickets directory exists
        const ticketsDir = `${FileSystem.documentDirectory}tickets/`;
        const dirInfo = await FileSystem.getInfoAsync(ticketsDir);
        if (!dirInfo.exists) {
            await FileSystem.makeDirectoryAsync(ticketsDir, { intermediates: true });
        }

        // Generate unique filename and destination path
        const uniqueName = `${Date.now()}_${asset.name}`;
        const destPath = `${ticketsDir}${uniqueName}`;

        // Copy file to permanent storage
        await FileSystem.copyAsync({
            from: asset.uri,
            to: destPath
        });

        console.log('File saved to:', destPath);

        const newTicket: Ticket = {
            id: `ticket_${Date.now()}`,
            userId: 'user_001', // Mock user
            title: asset.name.replace('.pdf', ''),
            type: 'other', // Default type
            fileUri: destPath, // Use permanent path
            fileName: asset.name,
            mimeType: asset.mimeType || 'application/pdf',
            size: asset.size,
            createdAt: new Date().toISOString(),
        };

        ticketsStore.push(newTicket);
        return newTicket;
    } catch (error) {
        console.error('Error picking document:', error);
        throw error;
    }
};

/**
 * Get all tickets for the current user
 */
export const getUserTickets = async (): Promise<Ticket[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...ticketsStore];
};

/**
 * Delete a ticket
 */
export const deleteTicket = async (ticketId: string): Promise<void> => {
    ticketsStore = ticketsStore.filter(t => t.id !== ticketId);
};
