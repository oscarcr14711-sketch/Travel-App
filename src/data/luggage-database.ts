export interface LuggageModel {
    brand: string;
    model: string;
    type: 'carry-on' | 'checked' | 'personal-item' | 'duffel';
    emptyWeight: {
        lbs: number;
        kg: number;
    };
    dimensions: {
        height: number; // inches
        width: number;
        depth: number;
    };
    capacity: number; // liters
    material: 'hardshell-polycarbonate' | 'hardshell-abs' | 'softside-nylon' | 'softside-polyester' | 'canvas' | 'leather';
}

export const LUGGAGE_DATABASE: LuggageModel[] = [
    // AWAY
    {
        brand: 'Away',
        model: 'The Carry-On',
        type: 'carry-on',
        emptyWeight: { lbs: 7.6, kg: 3.4 },
        dimensions: { height: 21.7, width: 13.7, depth: 9 },
        capacity: 37.7,
        material: 'hardshell-polycarbonate'
    },
    {
        brand: 'Away',
        model: 'The Bigger Carry-On',
        type: 'carry-on',
        emptyWeight: { lbs: 8, kg: 3.6 },
        dimensions: { height: 22.7, width: 14.7, depth: 9.6 },
        capacity: 44.6,
        material: 'hardshell-polycarbonate'
    },
    {
        brand: 'Away',
        model: 'The Medium',
        type: 'checked',
        emptyWeight: { lbs: 10.2, kg: 4.6 },
        dimensions: { height: 26.5, width: 17.7, depth: 11.2 },
        capacity: 73.8,
        material: 'hardshell-polycarbonate'
    },
    {
        brand: 'Away',
        model: 'The Large',
        type: 'checked',
        emptyWeight: { lbs: 11.9, kg: 5.4 },
        dimensions: { height: 29.5, width: 20, depth: 12.5 },
        capacity: 104.7,
        material: 'hardshell-polycarbonate'
    },

    // SAMSONITE
    {
        brand: 'Samsonite',
        model: 'Winfield 2 Carry-On',
        type: 'carry-on',
        emptyWeight: { lbs: 7.5, kg: 3.4 },
        dimensions: { height: 20, width: 13.5, depth: 9 },
        capacity: 34,
        material: 'hardshell-polycarbonate'
    },
    {
        brand: 'Samsonite',
        model: 'Omni PC Carry-On',
        type: 'carry-on',
        emptyWeight: { lbs: 6.8, kg: 3.1 },
        dimensions: { height: 20, width: 13.5, depth: 9.5 },
        capacity: 36,
        material: 'hardshell-polycarbonate'
    },
    {
        brand: 'Samsonite',
        model: 'Freeform 21"',
        type: 'carry-on',
        emptyWeight: { lbs: 5.9, kg: 2.7 },
        dimensions: { height: 21, width: 14.5, depth: 9.5 },
        capacity: 40,
        material: 'hardshell-polycarbonate'
    },
    {
        brand: 'Samsonite',
        model: 'Winfield 2 28"',
        type: 'checked',
        emptyWeight: { lbs: 11.6, kg: 5.3 },
        dimensions: { height: 28, width: 19.5, depth: 12.5 },
        capacity: 98,
        material: 'hardshell-polycarbonate'
    },

    // RIMOWA
    {
        brand: 'Rimowa',
        model: 'Essential Cabin S',
        type: 'carry-on',
        emptyWeight: { lbs: 7.3, kg: 3.3 },
        dimensions: { height: 21.7, width: 15.7, depth: 9.1 },
        capacity: 36,
        material: 'hardshell-polycarbonate'
    },
    {
        brand: 'Rimowa',
        model: 'Classic Cabin',
        type: 'carry-on',
        emptyWeight: { lbs: 9.5, kg: 4.3 },
        dimensions: { height: 21.7, width: 15.7, depth: 9.1 },
        capacity: 36,
        material: 'hardshell-abs'
    },
    {
        brand: 'Rimowa',
        model: 'Essential Check-In M',
        type: 'checked',
        emptyWeight: { lbs: 10.1, kg: 4.6 },
        dimensions: { height: 26.8, width: 17.7, depth: 10.6 },
        capacity: 68,
        material: 'hardshell-polycarbonate'
    },

    // TRAVELPRO
    {
        brand: 'Travelpro',
        model: 'Maxlite 5 Carry-On',
        type: 'carry-on',
        emptyWeight: { lbs: 5.3, kg: 2.4 },
        dimensions: { height: 21, width: 14, depth: 9 },
        capacity: 38,
        material: 'softside-polyester'
    },
    {
        brand: 'Travelpro',
        model: 'Platinum Elite Carry-On',
        type: 'carry-on',
        emptyWeight: { lbs: 7.4, kg: 3.4 },
        dimensions: { height: 21, width: 14, depth: 9 },
        capacity: 38,
        material: 'softside-nylon'
    },
    {
        brand: 'Travelpro',
        model: 'Crew Versapack 25"',
        type: 'checked',
        emptyWeight: { lbs: 9.1, kg: 4.1 },
        dimensions: { height: 25, width: 17, depth: 11 },
        capacity: 70,
        material: 'softside-nylon'
    },

    // DELSEY
    {
        brand: 'Delsey',
        model: 'Helium Aero Carry-On',
        type: 'carry-on',
        emptyWeight: { lbs: 6.6, kg: 3.0 },
        dimensions: { height: 21, width: 15, depth: 9 },
        capacity: 40,
        material: 'hardshell-polycarbonate'
    },
    {
        brand: 'Delsey',
        model: 'Chatelet Hard+',
        type: 'carry-on',
        emptyWeight: { lbs: 8.8, kg: 4.0 },
        dimensions: { height: 21, width: 15, depth: 9.5 },
        capacity: 42,
        material: 'hardshell-polycarbonate'
    },

    // TUMI
    {
        brand: 'Tumi',
        model: 'Alpha 3 International Carry-On',
        type: 'carry-on',
        emptyWeight: { lbs: 11.9, kg: 5.4 },
        dimensions: { height: 22, width: 14, depth: 9 },
        capacity: 40,
        material: 'softside-nylon'
    },
    {
        brand: 'Tumi',
        model: 'V4 International Carry-On',
        type: 'carry-on',
        emptyWeight: { lbs: 8.4, kg: 3.8 },
        dimensions: { height: 22, width: 14, depth: 9 },
        capacity: 37,
        material: 'hardshell-polycarbonate'
    },

    // BRIGGS & RILEY
    {
        brand: 'Briggs & Riley',
        model: 'Baseline Carry-On',
        type: 'carry-on',
        emptyWeight: { lbs: 7.8, kg: 3.5 },
        dimensions: { height: 21, width: 14, depth: 9 },
        capacity: 39,
        material: 'softside-nylon'
    },

    // OSPREY
    {
        brand: 'Osprey',
        model: 'Farpoint 40',
        type: 'carry-on',
        emptyWeight: { lbs: 3.1, kg: 1.4 },
        dimensions: { height: 21.5, width: 14, depth: 9.8 },
        capacity: 40,
        material: 'softside-nylon'
    },
    {
        brand: 'Osprey',
        model: 'Porter 46',
        type: 'carry-on',
        emptyWeight: { lbs: 3.5, kg: 1.6 },
        dimensions: { height: 22, width: 14, depth: 10 },
        capacity: 46,
        material: 'softside-nylon'
    },

    // GENERIC OPTIONS
    {
        brand: 'Generic',
        model: 'Standard Carry-On Hardshell',
        type: 'carry-on',
        emptyWeight: { lbs: 7.0, kg: 3.2 },
        dimensions: { height: 22, width: 14, depth: 9 },
        capacity: 40,
        material: 'hardshell-abs'
    },
    {
        brand: 'Generic',
        model: 'Standard Carry-On Softside',
        type: 'carry-on',
        emptyWeight: { lbs: 6.0, kg: 2.7 },
        dimensions: { height: 22, width: 14, depth: 9 },
        capacity: 40,
        material: 'softside-polyester'
    },
    {
        brand: 'Generic',
        model: 'Personal Item / Backpack',
        type: 'personal-item',
        emptyWeight: { lbs: 2.5, kg: 1.1 },
        dimensions: { height: 18, width: 14, depth: 8 },
        capacity: 25,
        material: 'softside-nylon'
    },
    {
        brand: 'Generic',
        model: 'Duffel Bag',
        type: 'duffel',
        emptyWeight: { lbs: 2.0, kg: 0.9 },
        dimensions: { height: 22, width: 12, depth: 11 },
        capacity: 50,
        material: 'canvas'
    },
];

export function searchLuggage(query: string): LuggageModel[] {
    const lowerQuery = query.toLowerCase();
    return LUGGAGE_DATABASE.filter(
        item =>
            item.brand.toLowerCase().includes(lowerQuery) ||
            item.model.toLowerCase().includes(lowerQuery)
    );
}

export function getLuggageByType(type: LuggageModel['type']): LuggageModel[] {
    return LUGGAGE_DATABASE.filter(item => item.type === type);
}
