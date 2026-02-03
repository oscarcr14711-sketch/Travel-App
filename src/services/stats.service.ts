import { Trip } from '../types/trip.types';
import { getUserTrips } from './firebase.service';

export interface TravelStats {
    totalTrips: number;
    countriesVisited: number;
    citiesVisited: number;
    totalMiles: number;
    favoriteAirline: string;
    favoriteDestination: string;
}

// Airport coordinates for distance calculation (sample data)
const AIRPORT_COORDS: Record<string, { lat: number; lon: number }> = {
    'JFK': { lat: 40.6413, lon: -73.7781 },
    'LAX': { lat: 33.9416, lon: -118.4085 },
    'ORD': { lat: 41.9742, lon: -87.9073 },
    'MIA': { lat: 25.7959, lon: -80.2870 },
    'DFW': { lat: 32.8998, lon: -97.0403 },
    'SFO': { lat: 37.6213, lon: -122.3790 },
    'ATL': { lat: 33.6407, lon: -84.4277 },
    'BOS': { lat: 42.3656, lon: -71.0096 },
    // Add more as needed
};

// Haversine formula to calculate distance between two coordinates
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

// Extract airport code from city string "Miami (MIA)" -> "MIA"
const extractAirportCode = (cityString: string): string | null => {
    const match = cityString.match(/\(([A-Z]{3})\)/);
    return match ? match[1] : null;
};

// Calculate miles for a single trip
const calculateTripMiles = (trip: Trip): number => {
    if (trip.type !== 'flight') return 0;

    const originCode = extractAirportCode(trip.origin);
    const destCode = extractAirportCode(trip.destination);

    if (!originCode || !destCode) return 0;

    const origin = AIRPORT_COORDS[originCode];
    const dest = AIRPORT_COORDS[destCode];

    if (!origin || !dest) return 0;

    return calculateDistance(origin.lat, origin.lon, dest.lat, dest.lon);
};

// Get travel statistics
export const getTravelStats = async (): Promise<TravelStats> => {
    const trips = await getUserTrips();

    // Total trips
    const totalTrips = trips.length;

    // Countries visited (unique)
    const countries = new Set(trips.map(trip => trip.country));
    const countriesVisited = countries.size;

    // Cities visited (unique destinations)
    const cities = new Set(trips.map(trip => trip.destination));
    const citiesVisited = cities.size;

    // Total miles flown
    const totalMiles = Math.round(trips.reduce((sum, trip) => sum + calculateTripMiles(trip), 0));

    // Favorite airline (most used)
    const airlineCounts: Record<string, number> = {};
    trips.forEach(trip => {
        if (trip.type === 'flight' && trip.airline) {
            airlineCounts[trip.airline] = (airlineCounts[trip.airline] || 0) + 1;
        }
    });
    const favoriteAirline = Object.entries(airlineCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    // Favorite destination (most visited)
    const destCounts: Record<string, number> = {};
    trips.forEach(trip => {
        destCounts[trip.destination] = (destCounts[trip.destination] || 0) + 1;
    });
    const favoriteDestination = Object.entries(destCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    return {
        totalTrips,
        countriesVisited,
        citiesVisited,
        totalMiles,
        favoriteAirline,
        favoriteDestination,
    };
};

// Format miles with K suffix
export const formatMiles = (miles: number): string => {
    if (miles >= 1000) {
        return `${(miles / 1000).toFixed(1)}K`;
    }
    return miles.toString();
};
