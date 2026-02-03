// Airline fleet mappings for major US and Mexico airlines
// Maps airline codes to their typical aircraft types

export interface AirlineFleet {
    name: string;
    country: string;
    aircraft: string[]; // List of aircraft models they operate
}

export const AIRLINE_FLEET_DATABASE: Record<string, AirlineFleet> = {
    // ========== MAJOR US AIRLINES ==========
    'AA': {
        name: 'American Airlines',
        country: 'USA',
        aircraft: ['737-800', '737 MAX 8', '757-200', '777-200', '777-300ER', '787-8', '787-9', 'A321', 'A320']
    },
    'DL': {
        name: 'Delta Air Lines',
        country: 'USA',
        aircraft: ['737-800', '737-900', '757-200', '767-300', '777-200', 'A321', 'A320']
    },
    'UA': {
        name: 'United Airlines',
        country: 'USA',
        aircraft: ['737-800', '737-900', '737 MAX 8', '757-200', '767-300', '777-200', '777-300ER', '787-8', '787-9', 'A320']
    },
    'WN': {
        name: 'Southwest Airlines',
        country: 'USA',
        aircraft: ['737-700', '737-800', '737 MAX 8'] // Southwest only flies Boeing 737s
    },
    'B6': {
        name: 'JetBlue Airways',
        country: 'USA',
        aircraft: ['A320', 'A321', 'ERJ-175'] // Focus on Airbus
    },
    'AS': {
        name: 'Alaska Airlines',
        country: 'USA',
        aircraft: ['737-700', '737-800', '737-900', '737 MAX 8', 'A320', 'A321']
    },
    'NK': {
        name: 'Spirit Airlines',
        country: 'USA',
        aircraft: ['A320', 'A321'] // All Airbus fleet
    },
    'F9': {
        name: 'Frontier Airlines',
        country: 'USA',
        aircraft: ['A320', 'A321'] // All Airbus fleet
    },

    // ========== MAJOR MEXICO AIRLINES ==========
    'AM': {
        name: 'Aeroméxico',
        country: 'Mexico',
        aircraft: ['737-700', '737-800', '737 MAX 8', '787-8', '787-9']
    },
    'Y4': {
        name: 'Volaris',
        country: 'Mexico',
        aircraft: ['A320', 'A321'] // Low-cost, Airbus only
    },
    'VB': {
        name: 'VivaAerobus',
        country: 'Mexico',
        aircraft: ['A320', 'A321'] // Low-cost, Airbus only
    },
    '5D': {
        name: 'Aeroméxico Connect',
        country: 'Mexico',
        aircraft: ['ERJ-175', 'CRJ-900'] // Regional carrier, mostly Embraer
    },

    // ========== COMMON REGIONAL CARRIERS (US) ==========
    'OO': {
        name: 'SkyWest Airlines',
        country: 'USA',
        aircraft: ['CRJ-900', 'ERJ-175']
    },
    'YX': {
        name: 'Republic Airways',
        country: 'USA',
        aircraft: ['ERJ-175']
    }
};

// Helper function to get airline fleet
export const getAirlineFleet = (airlineCode: string): AirlineFleet | null => {
    return AIRLINE_FLEET_DATABASE[airlineCode] || null;
};

// Helper function to get all airlines
export const getAllAirlines = (): string[] => {
    return Object.keys(AIRLINE_FLEET_DATABASE);
};

// Helper function to check if airline operates a specific aircraft
export const airlineOperatesAircraft = (airlineCode: string, aircraftModel: string): boolean => {
    const fleet = getAirlineFleet(airlineCode);
    if (!fleet) return false;
    return fleet.aircraft.includes(aircraftModel);
};

// Get airlines by country
export const getAirlinesByCountry = (country: 'USA' | 'Mexico'): AirlineFleet[] => {
    return Object.values(AIRLINE_FLEET_DATABASE).filter(airline => airline.country === country);
};

// Helper to extract airline code from full airline name
export const getAirlineCode = (airlineName: string): string | null => {
    const entry = Object.entries(AIRLINE_FLEET_DATABASE).find(
        ([_, fleet]) => fleet.name.toLowerCase() === airlineName.toLowerCase()
    );
    return entry ? entry[0] : null;
};
