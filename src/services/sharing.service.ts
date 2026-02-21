// Trip Sharing Service
// Export trip itinerary as a shareable formatted card or text

import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as Clipboard from 'expo-clipboard';
import { Trip } from '../types/trip.types';
import { getAirlineEmoji, getBusEmoji } from '../utils/logoMapper';

/**
 * Format trip as text for sharing via WhatsApp, iMessage, etc.
 */
export function formatTripAsText(trip: Trip): string {
    const isFlight = trip.type === 'flight';
    const emoji = isFlight ? getAirlineEmoji(trip.airline || '') : getBusEmoji(trip.busCompany || '');

    let text = '';

    // Header
    text += `${emoji} MY TRAVEL ITINERARY ${emoji}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

    // Trip Type
    text += `📍 TYPE: ${isFlight ? 'Flight' : 'Bus'}\n`;

    // Carrier
    if (isFlight && trip.airline) {
        text += `✈️ AIRLINE: ${trip.airline}\n`;
        if (trip.flightNumber) text += `🎫 FLIGHT: ${trip.flightNumber}\n`;
        if (trip.cabinClass) {
            const classLabel = trip.cabinClass.replace('_', ' ').toUpperCase();
            text += `💺 CLASS: ${classLabel}\n`;
        }
    } else if (!isFlight && trip.busCompany) {
        text += `🚌 COMPANY: ${trip.busCompany}\n`;
        if (trip.busNumber) text += `🎫 BUS: ${trip.busNumber}\n`;
        if (trip.busServiceClass) {
            const classLabel = trip.busServiceClass.toUpperCase();
            text += `💺 CLASS: ${classLabel}\n`;
        }
    }

    text += `\n`;

    // Route
    text += `🛫 DEPARTURE\n`;
    text += `   From: ${trip.origin}\n`;
    text += `   Date: ${trip.departureDate}\n`;
    text += `   Time: ${trip.departureTime}\n`;
    if (trip.departureStation) text += `   Station: ${trip.departureStation}\n`;

    text += `\n🛬 ARRIVAL\n`;
    text += `   To: ${trip.destination}\n`;
    text += `   Date: ${trip.arrivalDate}\n`;
    text += `   Time: ${trip.arrivalTime}\n`;
    if (trip.arrivalStation) text += `   Station: ${trip.arrivalStation}\n`;

    text += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `📱 Powered by FlyRide Travel App`;

    return text;
}

/**
 * Share trip via system share sheet (WhatsApp, iMessage, Email, etc.)
 */
export async function shareTrip(trip: Trip): Promise<boolean> {
    try {
        const isAvailable = await Sharing.isAvailableAsync();
        if (!isAvailable) {
            console.log('Sharing not available on this device');
            return false;
        }

        const tripText = formatTripAsText(trip);

        // Create a temporary file with trip details
        const fileName = `flyride_trip_${trip.id}.txt`;
        const fileUri = `${FileSystem.cacheDirectory}${fileName}`;

        await FileSystem.writeAsStringAsync(fileUri, tripText);
        await Sharing.shareAsync(fileUri, {
            dialogTitle: `Share Trip: ${trip.origin} → ${trip.destination}`,
        });

        return true;
    } catch (error) {
        console.error('Error sharing trip:', error);
        return false;
    }
}

/**
 * Format trip as a short summary for quick sharing
 */
export function formatTripSummary(trip: Trip): string {
    const isFlight = trip.type === 'flight';
    const carrier = isFlight ? trip.airline : trip.busCompany;
    const number = isFlight ? trip.flightNumber : trip.busNumber;

    return `${isFlight ? '✈️' : '🚌'} ${carrier || 'Travel'} ${number || ''} | ${trip.origin} → ${trip.destination} | ${trip.departureDate} at ${trip.departureTime}`;
}

/**
 * Generate a shareable deep link (for future implementation)
 */
export function generateShareableLink(trip: Trip): string {
    return `flyride://trip/${trip.id}`;
}

/**
 * Copy trip details to clipboard
 */
export async function copyTripToClipboard(trip: Trip): Promise<void> {
    try {
        const tripText = formatTripAsText(trip);
        await Clipboard.setStringAsync(tripText);
    } catch (error) {
        console.error('Error copying to clipboard:', error);
        throw error;
    }
}
