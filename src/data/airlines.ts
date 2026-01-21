export interface Airline {
    code: string;
    name: string;
}

export const AIRLINES: Airline[] = [
    // US Major
    { code: 'AA', name: 'American Airlines' },
    { code: 'DL', name: 'Delta Air Lines' },
    { code: 'UA', name: 'United Airlines' },
    { code: 'WN', name: 'Southwest Airlines' },
    { code: 'B6', name: 'JetBlue Airways' },
    { code: 'AS', name: 'Alaska Airlines' },
    { code: 'NK', name: 'Spirit Airlines' },
    { code: 'F9', name: 'Frontier Airlines' },
    { code: 'HA', name: 'Hawaiian Airlines' },

    // International
    { code: 'BA', name: 'British Airways' },
    { code: 'LH', name: 'Lufthansa' },
    { code: 'AF', name: 'Air France' },
    { code: 'KL', name: 'KLM' },
    { code: 'EK', name: 'Emirates' },
    { code: 'QR', name: 'Qatar Airways' },
    { code: 'SQ', name: 'Singapore Airlines' },
    { code: 'VS', name: 'Virgin Atlantic' },
    { code: 'AC', name: 'Air Canada' },
    { code: 'AM', name: 'Aeromexico' },
    { code: 'Y4', name: 'Volaris' },
    { code: 'VB', name: 'Viva Aerobus' },
    { code: 'NH', name: 'All Nippon Airways' },
    { code: 'JL', name: 'Japan Airlines' },
    { code: 'QF', name: 'Qantas' },
];

export interface BusCompany {
    name: string;
}

export const BUS_COMPANIES: BusCompany[] = [
    // USA Bus Companies
    { name: 'Tornado Bus' },
    { name: 'El Expreso' },
    { name: 'Greyhound' },
    { name: 'Omex VIP' },
    { name: 'Flixbus' },
];
