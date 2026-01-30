// Smart checklist service - generates context-aware packing/preparation lists
import { Trip } from '../types/trip.types';

export interface ChecklistItem {
    id: string;
    label: string;
    category: 'Pre-Departure (1 Week)' | 'Pre-Departure (3 Days)' | 'Pre-Departure (1 Day)' | 'Packing' | 'Travel Day' | 'At Destination';
    completed: boolean;
    priority: 'high' | 'medium' | 'low';
}

// In-memory storage for checklists (keyed by trip id)
const checklistsStore: Record<string, ChecklistItem[]> = {};

// Pre-Departure (1 Week) items
const preWeekItems: Omit<ChecklistItem, 'id'>[] = [
    { category: 'Pre-Departure (1 Week)', label: 'Confirm flight/bus reservation', completed: false, priority: 'high' },
    { category: 'Pre-Departure (1 Week)', label: 'Check passport/ID expiration date', completed: false, priority: 'high' },
    { category: 'Pre-Departure (1 Week)', label: 'Book hotel/accommodation', completed: false, priority: 'high' },
    { category: 'Pre-Departure (1 Week)', label: 'Research destination weather', completed: false, priority: 'medium' },
    { category: 'Pre-Departure (1 Week)', label: 'Notify bank of travel plans', completed: false, priority: 'medium' },
    { category: 'Pre-Departure (1 Week)', label: 'Arrange pet/plant care', completed: false, priority: 'medium' },
    { category: 'Pre-Departure (1 Week)', label: 'Request time off work', completed: false, priority: 'high' },
];

// Pre-Departure (3 Days) items
const pre3DayItems: Omit<ChecklistItem, 'id'>[] = [
    { category: 'Pre-Departure (3 Days)', label: 'Start packing clothes', completed: false, priority: 'high' },
    { category: 'Pre-Departure (3 Days)', label: 'Gather travel documents', completed: false, priority: 'high' },
    { category: 'Pre-Departure (3 Days)', label: 'Download offline maps', completed: false, priority: 'medium' },
    { category: 'Pre-Departure (3 Days)', label: 'Check luggage weight limits', completed: false, priority: 'medium' },
    { category: 'Pre-Departure (3 Days)', label: 'Prepare medications', completed: false, priority: 'high' },
    { category: 'Pre-Departure (3 Days)', label: 'Confirm transportation to airport/station', completed: false, priority: 'medium' },
];

// Pre-Departure (1 Day) items
const pre1DayItems: Omit<ChecklistItem, 'id'>[] = [
    { category: 'Pre-Departure (1 Day)', label: 'Check-in online (if available)', completed: false, priority: 'high' },
    { category: 'Pre-Departure (1 Day)', label: 'Print/save boarding pass', completed: false, priority: 'high' },
    { category: 'Pre-Departure (1 Day)', label: 'Charge all devices', completed: false, priority: 'medium' },
    { category: 'Pre-Departure (1 Day)', label: 'Set multiple alarms', completed: false, priority: 'high' },
    { category: 'Pre-Departure (1 Day)', label: 'Pack toiletries', completed: false, priority: 'medium' },
    { category: 'Pre-Departure (1 Day)', label: 'Confirm departure time', completed: false, priority: 'high' },
    { category: 'Pre-Departure (1 Day)', label: 'Check weather forecast', completed: false, priority: 'low' },
];

// Packing items
const packingItems: Omit<ChecklistItem, 'id'>[] = [
    { category: 'Packing', label: 'Clothes for trip duration', completed: false, priority: 'high' },
    { category: 'Packing', label: 'Phone charger', completed: false, priority: 'high' },
    { category: 'Packing', label: 'Laptop/tablet charger', completed: false, priority: 'medium' },
    { category: 'Packing', label: 'Headphones', completed: false, priority: 'medium' },
    { category: 'Packing', label: 'Toothbrush & toothpaste', completed: false, priority: 'high' },
    { category: 'Packing', label: 'Deodorant', completed: false, priority: 'medium' },
    { category: 'Packing', label: 'Medications', completed: false, priority: 'high' },
    { category: 'Packing', label: 'Wallet & cards', completed: false, priority: 'high' },
    { category: 'Packing', label: 'Sunglasses', completed: false, priority: 'low' },
    { category: 'Packing', label: 'Travel pillow', completed: false, priority: 'low' },
    { category: 'Packing', label: 'Snacks', completed: false, priority: 'low' },
    { category: 'Packing', label: 'Water bottle (empty for security)', completed: false, priority: 'medium' },
];

// Travel Day items
const travelDayItems: Omit<ChecklistItem, 'id'>[] = [
    { category: 'Travel Day', label: 'Wake up on time', completed: false, priority: 'high' },
    { category: 'Travel Day', label: 'Double-check passport/ID', completed: false, priority: 'high' },
    { category: 'Travel Day', label: 'Verify boarding pass is accessible', completed: false, priority: 'high' },
    { category: 'Travel Day', label: 'Lock all doors/windows', completed: false, priority: 'medium' },
    { category: 'Travel Day', label: 'Turn off non-essential appliances', completed: false, priority: 'low' },
    { category: 'Travel Day', label: 'Arrive early at airport/station', completed: false, priority: 'high' },
    { category: 'Travel Day', label: 'Go through security', completed: false, priority: 'high' },
    { category: 'Travel Day', label: 'Find departure gate/platform', completed: false, priority: 'high' },
];

// At Destination items
const atDestinationItems: Omit<ChecklistItem, 'id'>[] = [
    { category: 'At Destination', label: 'Collect luggage', completed: false, priority: 'high' },
    { category: 'At Destination', label: 'Arrange transport to hotel', completed: false, priority: 'medium' },
    { category: 'At Destination', label: 'Check into accommodation', completed: false, priority: 'high' },
    { category: 'At Destination', label: 'Get local SIM/data plan', completed: false, priority: 'medium' },
    { category: 'At Destination', label: 'Explore neighborhood', completed: false, priority: 'low' },
];

export const generateChecklistForTrip = async (trip: Trip): Promise<ChecklistItem[]> => {
    // Check if checklist already exists for this trip
    if (checklistsStore[trip.id]) {
        return checklistsStore[trip.id];
    }

    // Build comprehensive checklist
    let items: Omit<ChecklistItem, 'id'>[] = [
        ...preWeekItems,
        ...pre3DayItems,
        ...pre1DayItems,
        ...packingItems,
        ...travelDayItems,
        ...atDestinationItems,
    ];

    // Add flight-specific items
    if (trip.type === 'flight') {
        items.push(
            { category: 'Packing', label: 'Liquids in 3.4oz containers', completed: false, priority: 'high' },
            { category: 'Packing', label: 'Clear quart-size bag for liquids', completed: false, priority: 'high' },
            { category: 'Travel Day', label: 'Remove laptop from bag at security', completed: false, priority: 'medium' },
            { category: 'Travel Day', label: 'Remove shoes/belt at security', completed: false, priority: 'medium' },
        );
    }

    // Add bus-specific items
    if (trip.type === 'bus') {
        items.push(
            { category: 'Packing', label: 'Neck pillow for long ride', completed: false, priority: 'medium' },
            { category: 'Packing', label: 'Entertainment (book/tablet)', completed: false, priority: 'medium' },
            { category: 'Travel Day', label: 'Arrive 30 min before departure', completed: false, priority: 'high' },
        );
    }

    // Convert to ChecklistItem with IDs
    const checklistItems: ChecklistItem[] = items.map((item, index) => ({
        ...item,
        id: `${trip.id}_${index}`,
    }));

    // Store in memory
    checklistsStore[trip.id] = checklistItems;

    return checklistItems;
};

export const toggleChecklistItem = async (itemId: string): Promise<void> => {
    // Find the item across all checklists and toggle it
    for (const tripId in checklistsStore) {
        const item = checklistsStore[tripId].find(i => i.id === itemId);
        if (item) {
            item.completed = !item.completed;
            return;
        }
    }
};

export const addCustomChecklistItem = async (tripId: string, label: string): Promise<ChecklistItem | null> => {
    if (!checklistsStore[tripId]) {
        return null;
    }

    // Create a new custom item
    const newItem: ChecklistItem = {
        id: `${tripId}_custom_${Date.now()}`,
        label,
        category: 'Packing', // Put custom items in Packing category
        completed: false,
        priority: 'medium',
    };

    // Add to the checklist
    checklistsStore[tripId].push(newItem);

    return newItem;
};

export const deleteChecklistItem = async (tripId: string, itemId: string): Promise<boolean> => {
    if (!checklistsStore[tripId]) {
        return false;
    }

    const index = checklistsStore[tripId].findIndex(i => i.id === itemId);
    if (index !== -1) {
        checklistsStore[tripId].splice(index, 1);
        return true;
    }
    return false;
};

export const getChecklistProgress = (items: ChecklistItem[]): { completed: number; total: number; percent: number } => {
    const completed = items.filter(i => i.completed).length;
    const total = items.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percent };
};
