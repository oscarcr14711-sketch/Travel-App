export type CabinClass = 'economy' | 'premium_economy' | 'business' | 'first';
export type BusServiceClass = 'economy' | 'standard' | 'ejecutivo' | 'lujo';

export interface Connection {
    city: string;
    airport: string;
    arrivalTime: string;
    departureTime: string;
    duration: number; // in minutes
}

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
    cabinClass?: CabinClass;
    aircraftModel?: string; // e.g., 'A320', '737-800'

    // Bus-specific fields
    busCompany?: string;
    busNumber?: string;
    busModel?: string; // e.g., 'Volvo 9700', 'Scania Marcopolo G7'
    busServiceClass?: BusServiceClass; // economy, standard, ejecutivo, lujo
    departureStation?: string;
    arrivalStation?: string;

    // Common fields
    departureDate: string;
    departureTime: string;
    arrivalDate: string;
    arrivalTime: string;

    // Timeline enhancements
    connections?: Connection[]; // Layovers/connections
    originTimeZone?: string; // e.g., 'America/Los_Angeles'
    destinationTimeZone?: string; // e.g., 'America/New_York'
    durationDays?: number; // For multi-day trips

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
    cabinClass?: CabinClass;
    aircraftModel?: string;
    busCompany?: string;
    busNumber?: string;
    busModel?: string;
    busServiceClass?: BusServiceClass;
    departureStation?: string;
    arrivalStation?: string;
    departureDate: string;
    departureTime: string;
    arrivalDate: string;
    arrivalTime: string;
}
