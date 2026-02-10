// AeroDataBox API Service for real-time flight data
// Documentation: https://rapidapi.com/aerodatabox/api/aerodatabox

// ⚠️ SECURITY WARNING FOR PRODUCTION:
// This API key is currently hardcoded for development/testing only.
// Before launching to production, you MUST:
// 1. Remove this API key from the app code
// 2. Create a backend server (Firebase Functions, AWS Lambda, etc.)
// 3. Store the API key on your backend
// 4. Have the app call your backend, which then calls AeroDataBox
// Otherwise, users can extract your API key and use your credits!

const AERODATABOX_API_KEY = 'YOUR_AERODATABOX_API_KEY'; // TODO: Replace with your actual key
const AERODATABOX_BASE_URL = 'https://aerodatabox.p.rapidapi.com';

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
