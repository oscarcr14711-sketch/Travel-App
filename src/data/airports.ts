export interface Airport {
    code: string;
    name: string;
    city: string;
    country: string;
}

export const AIRPORTS: Airport[] = [
    // USA - Major Hubs
    { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport', city: 'Atlanta', country: 'United States' },
    { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'United States' },
    { code: 'ORD', name: 'O\'Hare International Airport', city: 'Chicago', country: 'United States' },
    { code: 'DFW', name: 'Dallas/Fort Worth International Airport', city: 'Dallas', country: 'United States' },
    { code: 'DEN', name: 'Denver International Airport', city: 'Denver', country: 'United States' },
    { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'United States' },
    { code: 'SFO', name: 'San Francisco International Airport', city: 'San Francisco', country: 'United States' },
    { code: 'SEA', name: 'Seattle-Tacoma International Airport', city: 'Seattle', country: 'United States' },
    { code: 'MCO', name: 'Orlando International Airport', city: 'Orlando', country: 'United States' },
    { code: 'LAS', name: 'Harry Reid International Airport', city: 'Las Vegas', country: 'United States' },
    { code: 'CLT', name: 'Charlotte Douglas International Airport', city: 'Charlotte', country: 'United States' },
    { code: 'EWR', name: 'Newark Liberty International Airport', city: 'Newark', country: 'United States' },
    { code: 'PHX', name: 'Phoenix Sky Harbor International Airport', city: 'Phoenix', country: 'United States' },
    { code: 'IAH', name: 'George Bush Intercontinental Airport', city: 'Houston', country: 'United States' },
    { code: 'MIA', name: 'Miami International Airport', city: 'Miami', country: 'United States' },
    { code: 'BOS', name: 'Logan International Airport', city: 'Boston', country: 'United States' },
    { code: 'MSP', name: 'Minneapolis-Saint Paul International Airport', city: 'Minneapolis', country: 'United States' },
    { code: 'DTW', name: 'Detroit Metropolitan Airport', city: 'Detroit', country: 'United States' },
    { code: 'PHL', name: 'Philadelphia International Airport', city: 'Philadelphia', country: 'United States' },
    { code: 'LGA', name: 'LaGuardia Airport', city: 'New York', country: 'United States' },

    // International - Major Hubs
    { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'United Kingdom' },
    { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
    { code: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands' },
    { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
    { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'United Arab Emirates' },
    { code: 'HND', name: 'Haneda Airport', city: 'Tokyo', country: 'Japan' },
    { code: 'NRT', name: 'Narita International Airport', city: 'Tokyo', country: 'Japan' },
    { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
    { code: 'ICN', name: 'Incheon International Airport', city: 'Seoul', country: 'South Korea' },
    { code: 'YYZ', name: 'Toronto Pearson International Airport', city: 'Toronto', country: 'Canada' },
    { code: 'MEX', name: 'Mexico City International Airport', city: 'Mexico City', country: 'Mexico' },
    { code: 'CUN', name: 'Cancún International Airport', city: 'Cancún', country: 'Mexico' },
    { code: 'SYD', name: 'Sydney Airport', city: 'Sydney', country: 'Australia' },
];
