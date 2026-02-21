export interface Ticket {
    id: string;
    userId: string;
    title: string;
    type: 'flight' | 'bus' | 'train' | 'other';
    fileUri: string; // Path to the local file
    fileName: string;
    mimeType: string;
    size?: number;
    createdAt: string;

    // Trip linking
    tripId?: string;
    tripOrigin?: string;
    tripDestination?: string;
    tripDate?: string;       // departure date
    tripTime?: string;       // departure time
    airline?: string;
    busCompany?: string;
    flightNumber?: string;
    busNumber?: string;
    gate?: string;
    seat?: string;
    terminal?: string;
    boardingGroup?: string;
    confirmationCode?: string;
}
