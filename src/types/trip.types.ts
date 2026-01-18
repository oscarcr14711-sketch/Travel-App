export interface Trip {
    id: string;
    userId: string;
    type: 'flight' | 'bus';
    country: string;
    origin: string;
    destination: string;

    // Flight-specific fields
    airline?: string;
    flightNumber?: string;

    // Bus-specific fields
    busCompany?: string;
    busNumber?: string;
    departureStation?: string;
    arrivalStation?: string;

    // Common fields
    departureDate: string;
    departureTime: string;
    arrivalDate: string;
    arrivalTime: string;

    // Metadata
    createdAt: string;
    updatedAt: string;
    status: 'upcoming' | 'active' | 'completed' | 'cancelled';
}

export interface CreateTripInput {
    type: 'flight' | 'bus';
    country: string;
    origin: string;
    destination: string;
    airline?: string;
    flightNumber?: string;
    busCompany?: string;
    busNumber?: string;
    departureStation?: string;
    arrivalStation?: string;
    departureDate: string;
    departureTime: string;
    arrivalDate: string;
    arrivalTime: string;
}
