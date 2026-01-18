import { firebaseConfig } from '../config/firebase.config';
import { Trip, CreateTripInput } from '../types/trip.types';

// Note: Firebase initialization for React Native
// This is a placeholder structure. Once Firebase packages are installed,
// this will be updated with actual Firebase initialization code.

/**
 * Initialize Firebase services when packages are ready
 * 
 * Usage:
 * import firebase from '@react-native-firebase/app';
 * import auth from '@react-native-firebase/auth';
 * import firestore from '@react-native-firebase/firestore';
 * import storage from '@react-native-firebase/storage';
 */

export const initializeFirebase = async () => {
    console.log('Firebase configuration loaded');
    // Firebase will be auto-initialized by @react-native-firebase/app
    // Additional initialization logic can be added here
};

// Mock user ID for development (will be replaced with actual auth)
const MOCK_USER_ID = 'user_001';

// In-memory storage for development (will be replaced with Firestore)
let tripsStore: Trip[] = [];

/**
 * Create a new trip
 */
export const createTrip = async (tripData: CreateTripInput): Promise<Trip> => {
    try {
        const newTrip: Trip = {
            id: `trip_${Date.now()}`,
            userId: MOCK_USER_ID,
            ...tripData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            status: 'upcoming',
        };

        // TODO: Replace with Firestore
        // await firestore().collection('trips').doc(newTrip.id).set(newTrip);
        tripsStore.push(newTrip);

        console.log('Trip created:', newTrip);
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
        // TODO: Replace with Firestore query
        // const snapshot = await firestore()
        //     .collection('trips')
        //     .where('userId', '==', MOCK_USER_ID)
        //     .orderBy('departureDate', 'asc')
        //     .get();

        const trips = tripsStore.filter(trip => trip.userId === MOCK_USER_ID);
        console.log('Fetched trips:', trips.length);
        return trips;
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
        // TODO: Replace with Firestore
        // const doc = await firestore().collection('trips').doc(tripId).get();
        // return doc.exists ? doc.data() as Trip : null;

        const trip = tripsStore.find(t => t.id === tripId);
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
        const updatedData = {
            ...updates,
            updatedAt: new Date().toISOString(),
        };

        // TODO: Replace with Firestore
        // await firestore().collection('trips').doc(tripId).update(updatedData);

        const index = tripsStore.findIndex(t => t.id === tripId);
        if (index !== -1) {
            tripsStore[index] = { ...tripsStore[index], ...updatedData };
            return tripsStore[index];
        }

        throw new Error('Trip not found');
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
        // TODO: Replace with Firestore
        // await firestore().collection('trips').doc(tripId).delete();

        tripsStore = tripsStore.filter(t => t.id !== tripId);
        console.log('Trip deleted:', tripId);
    } catch (error) {
        console.error('Error deleting trip:', error);
        throw error;
    }
};

// Export Firebase services (will be implemented once packages are installed)
export const FirebaseServices = {
    // auth: auth(),
    // firestore: firestore(),
    // storage: storage(),
};

export default {
    config: firebaseConfig,
    initialize: initializeFirebase,
    services: FirebaseServices,
    createTrip,
    getUserTrips,
    getTripById,
    updateTrip,
    deleteTrip,
};
