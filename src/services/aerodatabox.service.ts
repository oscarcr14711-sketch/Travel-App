import { getFunctions, httpsCallable } from 'firebase/functions';
import app from './firebase.service'; // Ensure firebase is initialized

export interface FlightAutofill {
    airline: string;
    flightNumber: string;
    origin: string;         // city name
    originIata: string;
    destination: string;    // city name
    destinationIata: string;
    departureDate: string;  // MM/DD/YYYY
    departureTime: string;  // HH:MM
    arrivalDate: string;
    arrivalTime: string;
    aircraftModel?: string;
    departureTerminal?: string;
    departureGate?: string;
    arrivalTerminal?: string;
    status: string;
}

/**
 * Lookup a flight by IATA number + departure date (YYYY-MM-DD).
 * Returns autofill-ready fields or null if not found.
 */
export async function lookupFlightByNumber(
    flightNumber: string,
    date: string  // YYYY-MM-DD
): Promise<FlightAutofill | null> {
    try {
        const functions = getFunctions(app, 'us-central1'); // Make sure region matches deployment
        const lookupFn = httpsCallable<{ flightNumber: string, date: string }, FlightAutofill>(functions, 'lookupFlight');

        const clean = flightNumber.trim().toUpperCase().replace(/\s/g, '');
        const response = await lookupFn({ flightNumber: clean, date });

        return response.data;

    } catch (err: any) {
        // Firebase HttpsError exposes the code and message
        if (err.code === 'resource-exhausted' || err.message === 'API_RATELIMIT_EXCEEDED') {
            console.warn('AeroDataBox API Rate Limit Exceeded!');
            throw new Error('API_RATELIMIT_EXCEEDED');
        }
        if (err.code === 'permission-denied' || err.message === 'API_FORBIDDEN') {
            console.warn('AeroDataBox API Forbidden (Not Subscribed)');
            throw new Error('API_FORBIDDEN');
        }

        console.error('Cloud Function lookup failed:', err);
        return null;
    }
} return {
    date: `${m}/${day}/${y}`,
    time: t ? t.substring(0, 5) : '',
};
        };

const dep = parseDateTime(
    f.departure?.scheduledTime?.local || f.departure?.scheduledTime?.utc
);
const arr = parseDateTime(
    f.arrival?.scheduledTime?.local || f.arrival?.scheduledTime?.utc
);

return {
    airline: f.airline?.name || '',
    flightNumber: f.number || clean,
    origin: f.departure?.airport?.municipalityName || f.departure?.airport?.name || '',
    originIata: f.departure?.airport?.iata || '',
    destination: f.arrival?.airport?.municipalityName || f.arrival?.airport?.name || '',
    destinationIata: f.arrival?.airport?.iata || '',
    departureDate: dep.date,
    departureTime: dep.time,
    arrivalDate: arr.date,
    arrivalTime: arr.time,
    aircraftModel: f.aircraft?.model || undefined,
    departureTerminal: f.departure?.terminal || undefined,
    departureGate: f.departure?.gate || undefined,
    arrivalTerminal: f.arrival?.terminal || undefined,
    status: f.status || 'scheduled',
};
    } catch (err: any) {
    if (err.message === 'API_RATELIMIT_EXCEEDED' || err.message === 'API_FORBIDDEN') {
        throw err;
    }
    console.error('AeroDataBox lookup error:', err);
    return null;
}
}

export interface FlightStatus {
    flightNumber: string;
    airline: string;
    departure: {
        airport: string;
        scheduledTime: string;
        actualTime?: string;
        terminal?: string;
        gate?: string;
    };
    arrival: {
        airport: string;
        scheduledTime: string;
        actualTime?: string;
        terminal?: string;
        gate?: string;
    };
    status: 'scheduled' | 'active' | 'landed' | 'cancelled' | 'diverted' | 'unknown';
    delayMinutes?: number;
}

/**
 * Fetch real-time flight status from AeroDataBox
 */
export async function getFlightStatus(
    flightNumber: string,
    date: string // Format: YYYY-MM-DD
): Promise<FlightStatus | null> {
    try {
        const response = await fetch(
            `${AERODATABOX_BASE_URL}/flights/number/${flightNumber}/${date}`,
            {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': AERODATABOX_API_KEY,
                    'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
                }
            }
        );

        if (!response.ok) {
            console.error('AeroDataBox API error:', response.status);
            return null;
        }

        const data = await response.json();

        // AeroDataBox returns an array of flights (same flight number, different dates)
        const flight = data[0];
        if (!flight) return null;

        return {
            flightNumber: flight.number,
            airline: flight.airline?.name || 'Unknown',
            departure: {
                airport: flight.departure?.airport?.iata || '',
                scheduledTime: flight.departure?.scheduledTime?.local || '',
                actualTime: flight.departure?.actualTime?.local,
                terminal: flight.departure?.terminal,
                gate: flight.departure?.gate
            },
            arrival: {
                airport: flight.arrival?.airport?.iata || '',
                scheduledTime: flight.arrival?.scheduledTime?.local || '',
                actualTime: flight.arrival?.actualTime?.local,
                terminal: flight.arrival?.terminal,
                gate: flight.arrival?.gate
            },
            status: flight.status || 'unknown',
            delayMinutes: flight.departure?.delay || 0
        };
    } catch (error) {
        console.error('Error fetching flight status:', error);
        return null;
    }
}

/**
 * Check if flight gate has been assigned
 */
export async function checkGateAssignment(
    flightNumber: string,
    date: string
): Promise<string | null> {
    const status = await getFlightStatus(flightNumber, date);
    return status?.departure.gate || null;
}

/**
 * Check if flight is delayed
 */
export async function checkFlightDelay(
    flightNumber: string,
    date: string
): Promise<{ isDelayed: boolean; delayMinutes: number } | null> {
    const status = await getFlightStatus(flightNumber, date);
    if (!status) return null;

    return {
        isDelayed: (status.delayMinutes || 0) > 0,
        delayMinutes: status.delayMinutes || 0
    };
}

/**
 * Check if flight is cancelled
 */
export async function checkFlightCancellation(
    flightNumber: string,
    date: string
): Promise<boolean> {
    const status = await getFlightStatus(flightNumber, date);
    return status?.status === 'cancelled';
}
