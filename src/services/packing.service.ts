// Smart Packing List Generator
// Generates weather-aware packing lists based on destination and trip length

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Trip } from '../types/trip.types';
import { getWeatherForDestination } from './weather.service';

const PACKING_LISTS_KEY = '@flyride_packing_lists';

export interface PackingItem {
    id: string;
    category: string;
    item: string;
    packed: boolean;
    essential: boolean;
    weatherDependent?: boolean; // e.g., umbrella, sunscreen
}

export interface PackingList {
    id: string;
    tripId: string;
    items: PackingItem[];
    createdAt: string;
}

// ─── Categories and Base Items ───────────────────────

const BASE_ESSENTIALS = [
    { category: 'Documents', item: 'Passport or ID', essential: true },
    { category: 'Documents', item: 'Boarding pass / Ticket (PDF)', essential: true },
    { category: 'Documents', item: 'Travel insurance documents', essential: false },
    { category: 'Documents', item: 'Hotel reservation confirmation', essential: false },
    { category: 'Money', item: 'Credit/Debit cards', essential: true },
    { category: 'Money', item: 'Some cash (local currency)', essential: true },
    { category: 'Tech', item: 'Phone charger', essential: true },
    { category: 'Tech', item: 'Power bank', essential: false },
    { category: 'Toiletries', item: 'Toothbrush & toothpaste', essential: true },
    { category: 'Toiletries', item: 'Deodorant', essential: true },
    { category: 'Toiletries', item: 'Medications (if needed)', essential: true },
];

// ─── Weather-dependent items ─────────────────────────

function getWeatherItems(temp: number, condition: string): PackingItem[] {
    const items: Omit<PackingItem, 'id' | 'packed'>[] = [];

    // Hot weather (>75°F)
    if (temp > 75) {
        items.push(
            { category: 'Clothes', item: 'Shorts', essential: false, weatherDependent: true },
            { category: 'Clothes', item: 'T-shirts (lightweight)', essential: true, weatherDependent: true },
            { category: 'Clothes', item: 'Sandals or comfortable shoes', essential: false, weatherDependent: true },
            { category: 'Accessories', item: 'Sunglasses', essential: true, weatherDependent: true },
            { category: 'Accessories', item: 'Sunscreen SPF 30+', essential: true, weatherDependent: true },
            { category: 'Accessories', item: 'Hat or cap', essential: false, weatherDependent: true },
        );
    }

    // Cold weather (<55°F)
    if (temp < 55) {
        items.push(
            { category: 'Clothes', item: 'Jacket or coat', essential: true, weatherDependent: true },
            { category: 'Clothes', item: 'Long pants', essential: true, weatherDependent: true },
            { category: 'Clothes', item: 'Sweater or hoodie', essential: false, weatherDependent: true },
            { category: 'Accessories', item: 'Scarf', essential: false, weatherDependent: true },
            { category: 'Accessories', item: 'Gloves', essential: false, weatherDependent: true },
        );
    }

    // Mild weather (55-75°F)
    if (temp >= 55 && temp <= 75) {
        items.push(
            { category: 'Clothes', item: 'Jeans or casual pants', essential: true, weatherDependent: true },
            { category: 'Clothes', item: 'Light jacket or cardigan', essential: false, weatherDependent: true },
            { category: 'Clothes', item: 'T-shirts or casual shirts', essential: true, weatherDependent: true },
        );
    }

    // Rainy conditions
    if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('shower')) {
        items.push(
            { category: 'Accessories', item: 'Umbrella or raincoat', essential: true, weatherDependent: true },
            { category: 'Clothes', item: 'Waterproof shoes or boots', essential: false, weatherDependent: true },
        );
    }

    return items.map((item, idx) => ({
        ...item,
        id: `weather_${idx}`,
        packed: false,
    }));
}

// ─── Trip length items ───────────────────────────────

function getTripLengthItems(days: number): Omit<PackingItem, 'id' | 'packed'>[] {
    const items: Omit<PackingItem, 'id' | 'packed'>[] = [];

    // Multi-day trips
    if (days >= 2) {
        items.push(
            { category: 'Clothes', item: `Underwear (${days + 1} pairs)`, essential: true },
            { category: 'Clothes', item: `Socks (${days + 1} pairs)`, essential: true },
            { category: 'Toiletries', item: 'Shampoo & conditioner', essential: false },
            { category: 'Toiletries', item: 'Body wash or soap', essential: false },
        );
    }

    // Long trips (5+ days)
    if (days >= 5) {
        items.push(
            { category: 'Clothes', item: 'Laundry detergent or pods', essential: false },
            { category: 'Toiletries', item: 'Razor & shaving cream', essential: false },
            { category: 'Tech', item: 'Extra charging cables', essential: false },
        );
    }

    // Week+ trips
    if (days >= 7) {
        items.push(
            { category: 'Entertainment', item: 'Book or e-reader', essential: false },
            { category: 'Entertainment', item: 'Headphones', essential: false },
            { category: 'Toiletries', item: 'Nail clippers', essential: false },
        );
    }

    return items;
}

// ─── Flight vs Bus specific ─────────────────────────

function getTripTypeItems(type: 'flight' | 'bus'): Omit<PackingItem, 'id' | 'packed'>[] {
    const items: Omit<PackingItem, 'id' | 'packed'>[] = [];

    if (type === 'flight') {
        items.push(
            { category: 'Travel Comfort', item: 'Neck pillow', essential: false },
            { category: 'Travel Comfort', item: 'Eye mask & ear plugs', essential: false },
            { category: 'Documents', item: 'TSA-approved liquids bag', essential: false },
        );
    }

    if (type === 'bus') {
        items.push(
            { category: 'Travel Comfort', item: 'Snacks for the road', essential: false },
            { category: 'Travel Comfort', item: 'Water bottle', essential: true },
            { category: 'Travel Comfort', item: 'Blanket or light throw', essential: false },
        );
    }

    return items;
}

// ─── Main Generator ──────────────────────────────────

export async function generatePackingList(trip: Trip): Promise<PackingList> {
    try {
        // Calculate trip length
        const deptDate = new Date(trip.departureDate);
        const arrDate = new Date(trip.arrivalDate);
        const days = Math.max(1, Math.ceil((arrDate.getTime() - deptDate.getTime()) / (1000 * 60 * 60 * 24)));

        // Get weather
        const weather = await getWeatherForDestination(trip.destination);

        // Build items
        let allItems: Array<Omit<PackingItem, 'id' | 'packed'>> = [
            ...BASE_ESSENTIALS,
            ...getTripLengthItems(days),
            ...getTripTypeItems(trip.type),
        ];

        // Add weather items if we have weather data
        if (weather) {
            const weatherItems = getWeatherItems(weather.temp, weather.condition);
            allItems.push(...weatherItems);
        }

        // Add IDs and packed status
        const items: PackingItem[] = allItems.map((item, idx) => ({
            ...item,
            id: item.category ? `${item.category}_${idx}` : `item_${idx}`,
            packed: false,
        }));

        const packingList: PackingList = {
            id: `packing_${trip.id}_${Date.now()}`,
            tripId: trip.id,
            items,
            createdAt: new Date().toISOString(),
        };

        // Save to storage
        await savePackingList(packingList);

        return packingList;
    } catch (error) {
        console.error('Error generating packing list:', error);
        // Return basic list if there's an error
        const items: PackingItem[] = BASE_ESSENTIALS.map((item, idx) => ({
            ...item,
            id: `essential_${idx}`,
            packed: false,
        }));

        return {
            id: `packing_${trip.id}_${Date.now()}`,
            tripId: trip.id,
            items,
            createdAt: new Date().toISOString(),
        };
    }
}

// ─── Storage ─────────────────────────────────────────

async function savePackingList(list: PackingList) {
    try {
        const existing = await AsyncStorage.getItem(PACKING_LISTS_KEY);
        const lists: PackingList[] = existing ? JSON.parse(existing) : [];

        // Replace if exists for this trip, otherwise add
        const index = lists.findIndex(l => l.tripId === list.tripId);
        if (index !== -1) {
            lists[index] = list;
        } else {
            lists.push(list);
        }

        await AsyncStorage.setItem(PACKING_LISTS_KEY, JSON.stringify(lists));
    } catch (error) {
        console.error('Error saving packing list:', error);
    }
}

export async function getPackingList(tripId: string): Promise<PackingList | null> {
    try {
        const stored = await AsyncStorage.getItem(PACKING_LISTS_KEY);
        if (!stored) return null;

        const lists: PackingList[] = JSON.parse(stored);
        return lists.find(l => l.tripId === tripId) || null;
    } catch (error) {
        console.error('Error loading packing list:', error);
        return null;
    }
}

export async function togglePackingItem(tripId: string, itemId: string): Promise<void> {
    try {
        const list = await getPackingList(tripId);
        if (!list) return;

        const item = list.items.find(i => i.id === itemId);
        if (item) {
            item.packed = !item.packed;
            await savePackingList(list);
        }
    } catch (error) {
        console.error('Error toggling packing item:', error);
    }
}

export async function addCustomPackingItem(tripId: string, category: string, item: string): Promise<void> {
    try {
        const list = await getPackingList(tripId);
        if (!list) return;

        const newItem: PackingItem = {
            id: `custom_${Date.now()}`,
            category,
            item,
            packed: false,
            essential: false,
        };

        list.items.push(newItem);
        await savePackingList(list);
    } catch (error) {
        console.error('Error adding custom item:', error);
    }
}

export async function deletePackingItem(tripId: string, itemId: string): Promise<void> {
    try {
        const list = await getPackingList(tripId);
        if (!list) return;

        list.items = list.items.filter(i => i.id !== itemId);
        await savePackingList(list);
    } catch (error) {
        console.error('Error deleting packing item:', error);
    }
}
