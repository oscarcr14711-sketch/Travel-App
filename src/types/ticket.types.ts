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
}
