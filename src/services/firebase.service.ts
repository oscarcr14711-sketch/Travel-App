import AsyncStorage from '@react-native-async-storage/async-storage';
import { Trip, CreateTripInput } from '../types/trip.types';

const TRIPS_STORAGE_KEY = '@flyride_trips';
const MOCK_USER_ID = 'user_001';

/**
 * Load trips from AsyncStorage
 */
const loadTripsFromStorage = async (): Promise<Trip[]> => {
    try {
        const stored = await AsyncStorage.getItem(TRIPS_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        return [];
    } catch (error) {
        console.error('Error loading trips from storage:', error);
        return [];
    }
};

/**
 * Save trips to AsyncStorage
 */
const saveTripsToStorage = async (trips: Trip[]): Promise<void> => {
    try {
        await AsyncStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips));
    } catch (error) {
        console.error('Error saving trips to storage:', error);
    }
};

/**
 * Create a new trip
 */
export const createTrip = async (tripData: CreateTripInput): Promise<Trip> => {
    try {
        const trips = await loadTripsFromStorage();

        const newTrip: Trip = {
            id: `trip_${Date.now()}`,
            userId: MOCK_USER_ID,
            ...tripData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            status: 'upcoming',
        };

        trips.push(newTrip);
        await saveTripsToStorage(trips);

        console.log('Trip created and saved:', newTrip.id);
        return newTrip;
    } catch (error) {
        console.error('Error creating trip:', error);
        throw error;
    }
};

/**
 * Get all trips for the current user
 */
export const getUserTrips = async (): Promise<Trip[]> => {
    try {
        const trips = await loadTripsFromStorage();
        const userTrips = trips.filter(trip => trip.userId === MOCK_USER_ID);
        console.log('Fetched trips from storage:', userTrips.length);
        return userTrips;
    } catch (error) {
        console.error('Error fetching trips:', error);
        throw error;
    }
};

/**
 * Get a single trip by ID
 */
export const getTripById = async (tripId: string): Promise<Trip | null> => {
    try {
        const trips = await loadTripsFromStorage();
        const trip = trips.find(t => t.id === tripId);
        return trip || null;
    } catch (error) {
        console.error('Error fetching trip:', error);
        throw error;
    }
};

/**
 * Update a trip
 */
export const updateTrip = async (tripId: string, updates: Partial<Trip>): Promise<Trip> => {
    try {
        const trips = await loadTripsFromStorage();
        const index = trips.findIndex(t => t.id === tripId);

        if (index === -1) {
            throw new Error('Trip not found');
        }

        trips[index] = {
            ...trips[index],
            ...updates,
            updatedAt: new Date().toISOString(),
        };

        await saveTripsToStorage(trips);
        return trips[index];
    } catch (error) {
        console.error('Error updating trip:', error);
        throw error;
    }
};

/**
 * Delete a trip
 */
export const deleteTrip = async (tripId: string): Promise<void> => {
    try {
        const trips = await loadTripsFromStorage();
        const filtered = trips.filter(t => t.id !== tripId);
        await saveTripsToStorage(filtered);
        console.log('Trip deleted:', tripId);
    } catch (error) {
        console.error('Error deleting trip:', error);
        throw error;
    }
};

/**
 * Initialize Firebase (placeholder for future Firebase integration)
 */
export const initializeFirebase = async () => {
    console.log('Storage initialized with AsyncStorage');
};

export default {
    initialize: initializeFirebase,
    createTrip,
    getUserTrips,
    getTripById,
    updateTrip,
    deleteTrip,
};
