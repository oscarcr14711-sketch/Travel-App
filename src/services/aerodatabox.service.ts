import AsyncStorage from '@react-native-async-storage/async-storage';

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
    isOffline?: boolean;
}

/**
 * Lookup a flight by IATA number + departure date (YYYY-MM-DD).
 * Returns autofill-ready fields or null if not found.
 */
export async function lookupFlightByNumber(
    flightNumber: string,
    date: string  // YYYY-MM-DD
): Promise<FlightAutofill | null> {
    const clean = flightNumber.trim().toUpperCase().replace(/\s/g, '');
    const cacheKey = `@flight_lookup_${clean}_${date}`;

    try {
        const url = `${VERCEL_FLIGHT_API}?flightNumber=${encodeURIComponent(clean)}&date=${encodeURIComponent(date)}`;
        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
            const body = await response.text().catch(() => '(no body)');
            console.error(`Flight lookup error: ${response.status} — ${body}`);
            throw new Error(`API_ERROR_${response.status}`);
        }

        const data = await response.json();
        const f = Array.isArray(data) ? data[0] : data;
        if (!f) return null;

        // Parse ISO local time helper
        const parseDateTime = (iso?: string): { date: string; time: string } => {
            if (!iso) return { date: '', time: '' };
            const [d, t] = iso.replace('T', ' ').split(' ');
            if (!d) return { date: '', time: '' };
            const [y, m, day] = d.split('-');
            return { date: `${m}/${day}/${y}`, time: t ? t.substring(0, 5) : '' };
        };

        const dep = parseDateTime(f.departure?.scheduledTime?.local || f.departure?.scheduledTime?.utc);
        const arr = parseDateTime(f.arrival?.scheduledTime?.local || f.arrival?.scheduledTime?.utc);

        const result: FlightAutofill = {
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
            aircraftModel: f.aircraft?.model || null,
            departureTerminal: f.departure?.terminal || null,
            departureGate: f.departure?.gate || null,
            arrivalTerminal: f.arrival?.terminal || null,
            status: f.status || 'scheduled',
        };

        await AsyncStorage.setItem(cacheKey, JSON.stringify(result));
        return result;

    } catch (err: any) {
        // Fallback to cache on offline/error
        try {
            const cached = await AsyncStorage.getItem(cacheKey);
            if (cached) {
                const parsed = JSON.parse(cached);
                return { ...parsed, isOffline: true };
            }
        } catch (e) {
            console.error('Cache read error', e);
        }

        console.error('Flight lookup failed:', err);
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
    isOffline?: boolean;
}

// Vercel proxy URL — API key is stored securely as a server-side environment variable
const VERCEL_FLIGHT_API = 'https://travel-app-rose-one.vercel.app/api/flight';

/**
 * Fetch real-time flight status via the secure Vercel proxy.
 * The API key is never exposed to the client.
 */
export async function getFlightStatus(
    flightNumber: string,
    date: string // Format: YYYY-MM-DD
): Promise<FlightStatus | null> {
    const clean = flightNumber.trim().toUpperCase().replace(/\s/g, '');
    const cacheKey = `@flight_status_${clean}_${date}`;
    const tsKey = `${cacheKey}_ts`;

    // Check cache first for cooldown
    try {
        const cached = await AsyncStorage.getItem(cacheKey);
        const lastTs = await AsyncStorage.getItem(tsKey);
        
        if (cached) {
            const parsed = JSON.parse(cached);
            
            // If within 10 min cooldown, return cached
            if (lastTs && (Date.now() - parseInt(lastTs, 10) < 600000)) {
                return parsed; // returns as live, saving API credits
            }
        }
    } catch (e) {
        console.error('Cache read error', e);
    }

    try {
        const url = `${VERCEL_FLIGHT_API}?flightNumber=${encodeURIComponent(clean)}&date=${encodeURIComponent(date)}`;

        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
            const body = await response.text().catch(() => '(no body)');
            console.error(`Vercel flight proxy error: ${response.status} — ${body}`);
            return null;
        }

        const data = await response.json();

        // AeroDataBox returns an array of flights
        const flight = Array.isArray(data) ? data[0] : data;
        if (!flight) return null;

        const result: FlightStatus = {
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

        await AsyncStorage.setItem(cacheKey, JSON.stringify(result));
        await AsyncStorage.setItem(tsKey, Date.now().toString());
        return result;
    } catch (error) {
        // Fallback to cache on network failure
        try {
            const cached = await AsyncStorage.getItem(cacheKey);
            if (cached) {
                const parsed = JSON.parse(cached);
                return { ...parsed, isOffline: true };
            }
        } catch (e) {}

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
