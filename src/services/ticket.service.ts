import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ticket } from '../types/ticket.types';

const TICKETS_STORAGE_KEY = '@flyride_tickets';

// ─── Persistence ─────────────────────────────────────

const saveTicketsToStorage = async (tickets: Ticket[]) => {
    try {
        await AsyncStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tickets));
    } catch (err) {
        console.error('Error saving tickets:', err);
    }
};

const loadTicketsFromStorage = async (): Promise<Ticket[]> => {
    try {
        const data = await AsyncStorage.getItem(TICKETS_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.error('Error loading tickets:', err);
        return [];
    }
};

// ─── In-memory cache ─────────────────────────────────

let ticketsStore: Ticket[] = [];
let initialized = false;

const ensureInitialized = async () => {
    if (!initialized) {
        ticketsStore = await loadTicketsFromStorage();
        initialized = true;
    }
};

// ─── Pick & Import ───────────────────────────────────

/**
 * Pick a PDF document and create a ticket from it
 */
export const pickTicketPDF = async (): Promise<Ticket | null> => {
    await ensureInitialized();

    try {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'application/pdf',
            copyToCacheDirectory: true,
        });

        if (result.canceled) return null;

        const asset = result.assets[0];

        // Ensure tickets directory exists
        const ticketsDir = `${FileSystem.documentDirectory}tickets/`;
        const dirInfo = await FileSystem.getInfoAsync(ticketsDir);
        if (!dirInfo.exists) {
            await FileSystem.makeDirectoryAsync(ticketsDir, { intermediates: true });
        }

        const uniqueName = `${Date.now()}_${asset.name}`;
        const destPath = `${ticketsDir}${uniqueName}`;

        await FileSystem.copyAsync({ from: asset.uri, to: destPath });

        const newTicket: Ticket = {
            id: `ticket_${Date.now()}`,
            userId: 'user_001',
            title: asset.name.replace('.pdf', ''),
            type: 'other',
            fileUri: destPath,
            fileName: asset.name,
            mimeType: asset.mimeType || 'application/pdf',
            size: asset.size,
            createdAt: new Date().toISOString(),
        };

        ticketsStore.push(newTicket);
        await saveTicketsToStorage(ticketsStore);
        return newTicket;
    } catch (error) {
        console.error('Error picking document:', error);
        throw error;
    }
};

// ─── CRUD ────────────────────────────────────────────

/**
 * Get all tickets for the current user
 */
export const getUserTickets = async (): Promise<Ticket[]> => {
    await ensureInitialized();
    return [...ticketsStore];
};

/**
 * Update a ticket (for trip linking, adding details, etc.)
 */
export const updateTicket = async (ticketId: string, updates: Partial<Ticket>): Promise<Ticket | null> => {
    await ensureInitialized();
    const index = ticketsStore.findIndex(t => t.id === ticketId);
    if (index === -1) return null;

    ticketsStore[index] = { ...ticketsStore[index], ...updates };
    await saveTicketsToStorage(ticketsStore);
    return ticketsStore[index];
};

/**
 * Delete a ticket
 */
export const deleteTicket = async (ticketId: string): Promise<void> => {
    await ensureInitialized();

    const ticket = ticketsStore.find(t => t.id === ticketId);
    if (ticket) {
        // Try to delete the file too
        try {
            const fileInfo = await FileSystem.getInfoAsync(ticket.fileUri);
            if (fileInfo.exists) {
                await FileSystem.deleteAsync(ticket.fileUri);
            }
        } catch (err) {
            console.log('Could not delete ticket file:', err);
        }
    }

    ticketsStore = ticketsStore.filter(t => t.id !== ticketId);
    await saveTicketsToStorage(ticketsStore);
};

/**
 * Link a ticket to a trip (copies trip info into the ticket)
 */
export const linkTicketToTrip = async (
    ticketId: string,
    tripData: {
        tripId: string;
        type: 'flight' | 'bus';
        origin: string;
        destination: string;
        date: string;
        time: string;
        airline?: string;
        busCompany?: string;
        flightNumber?: string;
        busNumber?: string;
    }
): Promise<Ticket | null> => {
    return updateTicket(ticketId, {
        tripId: tripData.tripId,
        type: tripData.type,
        tripOrigin: tripData.origin,
        tripDestination: tripData.destination,
        tripDate: tripData.date,
        tripTime: tripData.time,
        airline: tripData.airline,
        busCompany: tripData.busCompany,
        flightNumber: tripData.flightNumber,
        busNumber: tripData.busNumber,
    });
};
