import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFlightStatus, checkGateAssignment, checkFlightDelay, checkFlightCancellation } from './aerodatabox.service';

const FLIGHT_CHECK_TASK = 'BACKGROUND_FLIGHT_STATUS_CHECK';
const TRACKED_FLIGHTS_KEY = '@flyride_tracked_flights';
const LAST_FLIGHT_STATUS_KEY = '@flyride_last_status';

// Configure notification behavior
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const NOTIFICATION_STORAGE_KEY = '@trip_notifications';

export interface TripNotifications {
    tripId: string;
    notificationIds: string[];
}

/**
 * Request notification permissions from the user
 */
export async function requestNotificationPermissions(): Promise<boolean> {
    if (!Device.isDevice) {
        console.warn('Notifications only work on physical devices');
        return false;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        console.warn('Notification permission not granted');
        return false;
    }

    // For Android, set up notification channel
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('trip-reminders', {
            name: 'Trip Reminders',
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#1e3c72',
        });
    }

    return true;
}

/**
 * Schedule all notifications for a trip
 */
export async function scheduleAllTripNotifications(trip: any): Promise<string[]> {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) return [];

    const notificationIds: string[] = [];
    const now = new Date();
    const departureDate = new Date(trip.departureDate);
    const secondsUntilDeparture = (departureDate.getTime() - now.getTime()) / 1000;

    // Don't schedule if trip is in the past
    if (secondsUntilDeparture < 0) return [];

    try {
        // Trip Created Confirmation
        const confirmId = await Notifications.scheduleNotificationAsync({
            content: {
                title: '✈️ Trip Saved!',
                body: `${trip.type === 'flight' ? 'Flight' : 'Bus'} to ${trip.destination} - Departure in ${Math.ceil(secondsUntilDeparture / 86400)} days`,
                sound: true,
            },
            trigger: { seconds: 2 },
        });
        notificationIds.push(confirmId);

        // One Week Countdown
        if (secondsUntilDeparture > 7 * 86400) {
            const weekId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: '📅 One Week Until Your Trip!',
                    body: `${trip.destination} trip in 7 days - Time to start preparing!`,
                    sound: true,
                },
                trigger: { seconds: secondsUntilDeparture - (7 * 86400) },
            });
            notificationIds.push(weekId);
        }

        // Packing Reminder (1 day before)
        if (secondsUntilDeparture > 86400) {
            const packingId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: '🎒 Time to Pack!',
                    body: `Don't forget to pack for your ${trip.type === 'flight' ? 'flight' : 'bus trip'} to ${trip.destination} tomorrow`,
                    sound: true,
                },
                trigger: { seconds: secondsUntilDeparture - 86400 },
            });
            notificationIds.push(packingId);
        }

        // Morning of Travel
        if (secondsUntilDeparture > 21600) { // 6 hours
            const morningId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: '☀️ Travel Day!',
                    body: `Today's the day! Check your checklist for ${trip.destination}`,
                    sound: true,
                },
                trigger: { seconds: secondsUntilDeparture - 21600 },
            });
            notificationIds.push(morningId);
        }

        // 24 Hour Reminder
        if (secondsUntilDeparture > 86400) {
            const dayId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: '⏰ 24 Hours Until Departure',
                    body: `${trip.type === 'flight' ? 'Flight' : 'Bus'} to ${trip.destination} departs tomorrow at ${trip.departureTime}`,
                    sound: true,
                },
                trigger: { seconds: secondsUntilDeparture - 86400 },
            });
            notificationIds.push(dayId);
        }

        // Check-in Reminder (Flights only, 24h before)
        if (trip.type === 'flight' && secondsUntilDeparture > 86400) {
            const checkinId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: '✅ Check-in Now Open!',
                    body: `Check in for your ${trip.airline} flight ${trip.flightNumber} to ${trip.destination}`,
                    sound: true,
                },
                trigger: { seconds: secondsUntilDeparture - 86400 },
            });
            notificationIds.push(checkinId);
        }

        // Bus Early Arrival Reminder (Luxury buses only)
        if (trip.type === 'bus' && trip.busServiceClass === 'lujo' && secondsUntilDeparture > 3600) {
            const busEarlyId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: '🚌 Arrive Early for Luxury Bus',
                    body: `${trip.busCompany} recommends arriving 15 minutes early`,
                    sound: true,
                },
                trigger: { seconds: secondsUntilDeparture - 5400 }, // 1.5 hours before
            });
            notificationIds.push(busEarlyId);
        }

        // 3 Hour Reminder
        if (secondsUntilDeparture > 10800) {
            const threeHourId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: '🚨 Departure in 3 Hours',
                    body: `Time to head to the ${trip.type === 'flight' ? 'airport' : 'bus station'} for your trip to ${trip.destination}`,
                    sound: true,
                },
                trigger: { seconds: secondsUntilDeparture - 10800 },
            });
            notificationIds.push(threeHourId);
        }

        // 1 Hour Reminder
        if (secondsUntilDeparture > 3600) {
            const oneHourId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: '⏱️ Departure in 1 Hour!',
                    body: `Last reminder! ${trip.type === 'flight' ? 'Flight' : 'Bus'} to ${trip.destination} departs soon`,
                    sound: true,
                },
                trigger: { seconds: secondsUntilDeparture - 3600 },
            });
            notificationIds.push(oneHourId);
        }

        // Departure Wake-Up Call (2 hours before, different from morning reminder)
        if (secondsUntilDeparture > 7200) {
            const wakeupId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: '☀️ Good Morning!',
                    body: `${trip.type === 'flight' ? 'Flight' : 'Bus'} to ${trip.destination} at ${trip.departureTime} today`,
                    sound: true,
                },
                trigger: { seconds: secondsUntilDeparture - 7200 }, // 2 hours before
            });
            notificationIds.push(wakeupId);
        }

        // Boarding Call (Flights only, 30 min before)
        if (trip.type === 'flight' && secondsUntilDeparture > 1800) {
            const boardingId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: '🛫 Boarding Soon!',
                    body: `Boarding starts in 30 minutes for flight ${trip.flightNumber} to ${trip.destination}`,
                    sound: true,
                },
                trigger: { seconds: secondsUntilDeparture - 1800 }, // 30 min before
            });
            notificationIds.push(boardingId);
        }

        // Day-of Checklist Reminder (morning of travel, 8 hours before)
        if (secondsUntilDeparture > 28800) {
            const checklistId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: '📋 Don\'t Forget!',
                    body: `Morning of travel - check your passport, tickets, and packing list!`,
                    sound: true,
                },
                trigger: { seconds: secondsUntilDeparture - 28800 }, // 8 hours before
            });
            notificationIds.push(checklistId);
        }

        // Weather Alert (2 days before - check destination weather)
        if (secondsUntilDeparture > 172800) {
            // Simple weather tip based on common destinations
            // In a real app, you'd call a weather API here
            const weatherId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: '🌤️ Weather Check',
                    body: `Check the weather in ${trip.destination} and pack accordingly!`,
                    sound: true,
                },
                trigger: { seconds: secondsUntilDeparture - 172800 }, // 2 days before
            });
            notificationIds.push(weatherId);
        }

        // Return Trip Welcome (if this is a round trip with return date)
        if (trip.arrivalDate && trip.returnDate) {
            const returnDate = new Date(trip.returnDate);
            const secondsUntilReturn = (returnDate.getTime() - now.getTime()) / 1000;

            if (secondsUntilReturn > 0) {
                const welcomeId = await Notifications.scheduleNotificationAsync({
                    content: {
                        title: '🏠 Welcome Back!',
                        body: `Hope you enjoyed ${trip.destination}! Your trip is now complete.`,
                        sound: true,
                    },
                    trigger: { seconds: secondsUntilReturn + 3600 }, // 1 hour after return
                });
                notificationIds.push(welcomeId);
            }
        }

        // Bus Platform/Bay Reminder (10 min before, if platform specified)
        if (trip.type === 'bus' && trip.departurePlatform && secondsUntilDeparture > 600) {
            const platformId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: '🚏 Platform Information',
                    body: `Your bus departs from Platform ${trip.departurePlatform} in 10 minutes`,
                    sound: true,
                },
                trigger: { seconds: secondsUntilDeparture - 600 }, // 10 min before
            });
            notificationIds.push(platformId);
        }

        // Store notification IDs
        await storeTripNotifications(trip.id, notificationIds);

        // For flights, schedule real-time status checks
        if (trip.type === 'flight' && trip.flightNumber) {
            scheduleFlightStatusChecks(trip, notificationIds);
        }

        return notificationIds;
    } catch (error) {
        console.error('Error scheduling notifications:', error);
        return [];
    }
}

/**
 * Cancel all notifications for a trip
 */
export async function cancelTripNotifications(tripId: string): Promise<void> {
    try {
        const stored = await AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY);
        if (!stored) return;

        const allNotifications: TripNotifications[] = JSON.parse(stored);
        const tripNotifications = allNotifications.find(n => n.tripId === tripId);

        if (tripNotifications) {
            for (const notifId of tripNotifications.notificationIds) {
                await Notifications.cancelScheduledNotificationAsync(notifId);
            }
            const updated = allNotifications.filter(n => n.tripId !== tripId);
            await AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(updated));
        }
    } catch (error) {
        console.error('Error canceling notifications:', error);
    }
}

/**
 * Store notification IDs for a trip
 */
async function storeTripNotifications(tripId: string, notificationIds: string[]): Promise<void> {
    try {
        const stored = await AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY);
        const allNotifications: TripNotifications[] = stored ? JSON.parse(stored) : [];
        const filtered = allNotifications.filter(n => n.tripId !== tripId);
        filtered.push({ tripId, notificationIds });
        await AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
        console.error('Error storing notification IDs:', error);
    }
}

/**
 * Send immediate notification for flight gate assignment
 */
export async function notifyGateAssignment(trip: any, gate: string): Promise<void> {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: '🚪 Gate Assigned!',
            body: `Your flight ${trip.flightNumber} to ${trip.destination} is at Gate ${gate}`,
            sound: true,
        },
        trigger: null,
    });
}

/**
 * Send immediate notification for flight delay
 */
export async function notifyFlightDelay(trip: any, delayMinutes: number): Promise<void> {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: '⏰ Flight Delayed',
            body: `Your flight ${trip.flightNumber} to ${trip.destination} is delayed by ${delayMinutes} minutes`,
            sound: true,
        },
        trigger: null,
    });
}

/**
 * Send immediate notification for flight cancellation
 */
export async function notifyFlightCancellation(trip: any): Promise<void> {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: '❌ Flight Cancelled',
            body: `Your flight ${trip.flightNumber} to ${trip.destination} has been cancelled. Check with ${trip.airline} for alternatives.`,
            sound: true,
        },
        trigger: null,
    });
}

/**
 * Schedule background checks for flight status updates
 * Now uses expo-background-fetch + expo-task-manager for real background polling
 */
async function scheduleFlightStatusChecks(trip: any, notificationIds: string[]) {
    // Track this flight for background monitoring
    const tracked = await getTrackedFlights();
    const alreadyTracked = tracked.find((f: any) => f.flightNumber === trip.flightNumber && f.departureDate === trip.departureDate);
    if (!alreadyTracked) {
        tracked.push({
            flightNumber: trip.flightNumber,
            departureDate: trip.departureDate,
            destination: trip.destination,
            airline: trip.airline,
            tripId: trip.id,
        });
        await AsyncStorage.setItem(TRACKED_FLIGHTS_KEY, JSON.stringify(tracked));
    }

    // Ensure background task is registered
    await registerBackgroundFlightCheck();
}

// ─── Flight Tracking Helpers ─────────────────────────────────────────

async function getTrackedFlights(): Promise<any[]> {
    try {
        const data = await AsyncStorage.getItem(TRACKED_FLIGHTS_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

async function checkFlightAndNotify(flight: any): Promise<void> {
    try {
        const dateString = new Date(flight.departureDate).toISOString().split('T')[0];
        const status = await getFlightStatus(flight.flightNumber, dateString);
        if (!status) return;

        const lastStatusKey = `${LAST_FLIGHT_STATUS_KEY}_${flight.flightNumber}`;
        const lastData = await AsyncStorage.getItem(lastStatusKey);
        const lastStatus = lastData ? JSON.parse(lastData) : null;

        // Gate change
        if (status.departure.gate && lastStatus?.gate !== status.departure.gate) {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: `🚪 Gate Change - ${flight.flightNumber}`,
                    body: `Gate updated to ${status.departure.gate}${status.departure.terminal ? ` (Terminal ${status.departure.terminal})` : ''}`,
                    sound: true,
                },
                trigger: null,
            });
        }

        // Delay
        if (status.delayMinutes && status.delayMinutes > 0 && lastStatus?.delayMinutes !== status.delayMinutes) {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: `⏰ Delay - ${flight.flightNumber}`,
                    body: `Your flight is delayed by ${status.delayMinutes} minutes`,
                    sound: true,
                },
                trigger: null,
            });
        }

        // Cancellation
        if (status.status === 'cancelled' && lastStatus?.status !== 'cancelled') {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: `❌ Cancelled - ${flight.flightNumber}`,
                    body: `Your flight has been cancelled. Contact ${flight.airline || 'your airline'} for rebooking.`,
                    sound: true,
                },
                trigger: null,
            });
        }

        // Landed
        if (status.status === 'landed' && lastStatus?.status !== 'landed') {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: `🛬 ${flight.flightNumber} Landed`,
                    body: `Welcome to ${flight.destination}! Your flight has landed.`,
                    sound: true,
                },
                trigger: null,
            });
        }

        // Save last known status
        await AsyncStorage.setItem(lastStatusKey, JSON.stringify({
            status: status.status,
            gate: status.departure.gate,
            delayMinutes: status.delayMinutes,
            checkedAt: new Date().toISOString(),
        }));
    } catch (error) {
        console.error(`Background check error for ${flight.flightNumber}:`, error);
    }
}

// ─── Background Task Definition ──────────────────────────────────────

TaskManager.defineTask(FLIGHT_CHECK_TASK, async () => {
    try {
        const flights = await getTrackedFlights();
        const now = new Date();
        const cutoff = new Date(now.getTime() + 48 * 60 * 60 * 1000); // Next 48 hours

        // Only check upcoming flights
        const relevantFlights = flights.filter((f: any) => {
            const dep = new Date(f.departureDate);
            return dep >= now && dep <= cutoff;
        });

        for (const flight of relevantFlights) {
            await checkFlightAndNotify(flight);
        }

        // Clean up old flights (older than 24 hours past departure)
        const activeFlights = flights.filter((f: any) => {
            const dep = new Date(f.departureDate);
            return dep >= new Date(now.getTime() - 24 * 60 * 60 * 1000);
        });
        await AsyncStorage.setItem(TRACKED_FLIGHTS_KEY, JSON.stringify(activeFlights));

        return BackgroundFetch.BackgroundFetchResult.NewData;
    } catch (error) {
        console.error('Background flight check failed:', error);
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
});

// ─── Register Background Task ────────────────────────────────────────

export async function registerBackgroundFlightCheck(): Promise<void> {
    try {
        const isRegistered = await TaskManager.isTaskRegisteredAsync(FLIGHT_CHECK_TASK);
        if (!isRegistered) {
            await BackgroundFetch.registerTaskAsync(FLIGHT_CHECK_TASK, {
                minimumInterval: 15 * 60, // every 15 minutes
                stopOnTerminate: false,
                startOnBoot: true,
            });
            console.log('✅ Background flight status check registered');
        }
    } catch (error) {
        console.error('Failed to register background flight check:', error);
    }
}

// ─── Initialize Notifications System ─────────────────────────────────

export async function initializeNotifications(): Promise<void> {
    const hasPermission = await requestNotificationPermissions();
    if (hasPermission) {
        await registerBackgroundFlightCheck();
    }
}

