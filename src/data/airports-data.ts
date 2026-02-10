export interface Airport {
    id: string;
    name: string;
    iataCode: string;
    city: string;
    coordinate: {
        latitude: number;
        longitude: number;
    };
    hasIndoorMap: boolean;
}

export const AIRPORTS: Airport[] = [
    {
        id: 'mex',
        name: 'Aeropuerto Internacional Benito Juárez',
        iataCode: 'MEX',
        city: 'Mexico City',
        coordinate: {
            latitude: 19.4361,
            longitude: -99.0719,
        },
        hasIndoorMap: true, // Apple Maps supports MEX
    },
    {
        id: 'gdl',
        name: 'Aeropuerto Internacional de Guadalajara',
        iataCode: 'GDL',
        city: 'Guadalajara',
        coordinate: {
            latitude: 20.5218,
            longitude: -103.3112,
        },
        hasIndoorMap: true, // Apple Maps supports GDL
    },
    {
        id: 'lax',
        name: 'Los Angeles International Airport',
        iataCode: 'LAX',
        city: 'Los Angeles',
        coordinate: {
            latitude: 33.9416,
            longitude: -118.4085,
        },
        hasIndoorMap: true, // Huge indoor map support
    },
    {
        id: 'jfk',
        name: 'John F. Kennedy International Airport',
        iataCode: 'JFK',
        city: 'New York',
        coordinate: {
            latitude: 40.6413,
            longitude: -73.7781,
        },
        hasIndoorMap: true,
    },
    {
        id: 'sfo',
        name: 'San Francisco International Airport',
        iataCode: 'SFO',
        city: 'San Francisco',
        coordinate: {
            latitude: 37.6213,
            longitude: -122.3790,
        },
        hasIndoorMap: true,
    },
    {
        id: 'mia',
        name: 'Miami International Airport',
        iataCode: 'MIA',
        city: 'Miami',
        coordinate: {
            latitude: 25.7959,
            longitude: -80.2870,
        },
        hasIndoorMap: true,
    },
    {
        id: 'cun',
        name: 'Cancún International Airport',
        iataCode: 'CUN',
        city: 'Cancún',
        coordinate: {
            latitude: 21.0365,
            longitude: -86.8771,
        },
        hasIndoorMap: true,
    },
    {
        id: 'atl',
        name: 'Hartsfield-Jackson Atlanta International Airport',
        iataCode: 'ATL',
        city: 'Atlanta',
        coordinate: { latitude: 33.6407, longitude: -84.4277 },
        hasIndoorMap: true,
    },
    {
        id: 'ord',
        name: 'O\'Hare International Airport',
        iataCode: 'ORD',
        city: 'Chicago',
        coordinate: { latitude: 41.9742, longitude: -87.9073 },
        hasIndoorMap: true,
    },
    {
        id: 'lhr',
        name: 'Heathrow Airport',
        iataCode: 'LHR',
        city: 'London',
        coordinate: { latitude: 51.4700, longitude: -0.4543 },
        hasIndoorMap: true,
    },
    {
        id: 'cdg',
        name: 'Paris Charles de Gaulle Airport',
        iataCode: 'CDG',
        city: 'Paris',
        coordinate: { latitude: 49.0097, longitude: 2.5479 },
        hasIndoorMap: true,
    },
    {
        id: 'dxb',
        name: 'Dubai International Airport',
        iataCode: 'DXB',
        city: 'Dubai',
        coordinate: { latitude: 25.2532, longitude: 55.3657 },
        hasIndoorMap: true,
    },
    {
        id: 'hnd',
        name: 'Tokyo Haneda Airport',
        iataCode: 'HND',
        city: 'Tokyo',
        coordinate: { latitude: 35.5494, longitude: 139.7798 },
        hasIndoorMap: true,
    },
    {
        id: 'ams',
        name: 'Amsterdam Airport Schiphol',
        iataCode: 'AMS',
        city: 'Amsterdam',
        coordinate: { latitude: 52.3105, longitude: 4.7683 },
        hasIndoorMap: true,
    },
    {
        id: 'fra',
        name: 'Frankfurt Airport',
        iataCode: 'FRA',
        city: 'Frankfurt',
        coordinate: { latitude: 50.0379, longitude: 8.5622 },
        hasIndoorMap: true,
    },
    {
        id: 'sin',
        name: 'Singapore Changi Airport',
        iataCode: 'SIN',
        city: 'Singapore',
        coordinate: { latitude: 1.3644, longitude: 103.9915 },
        hasIndoorMap: true,
    },
    {
        id: 'mad',
        name: 'Adolfo Suárez Madrid–Barajas Airport',
        iataCode: 'MAD',
        city: 'Madrid',
        coordinate: { latitude: 40.4839, longitude: -3.5679 },
        hasIndoorMap: true,
    },
    {
        id: 'bcn',
        name: 'Josep Tarradellas Barcelona-El Prat Airport',
        iataCode: 'BCN',
        city: 'Barcelona',
        coordinate: { latitude: 41.2974, longitude: 2.0833 },
        hasIndoorMap: true,
    },
    {
        id: 'icn',
        name: 'Incheon International Airport',
        iataCode: 'ICN',
        city: 'Seoul',
        coordinate: { latitude: 37.4602, longitude: 126.4407 },
        hasIndoorMap: true,
    },
    {
        id: 'yyz',
        name: 'Toronto Pearson International Airport',
        iataCode: 'YYZ',
        city: 'Toronto',
        coordinate: { latitude: 43.6777, longitude: -79.6248 },
        hasIndoorMap: true,
    },
    {
        id: 'gru',
        name: 'São Paulo/Guarulhos International Airport',
        iataCode: 'GRU',
        city: 'São Paulo',
        coordinate: { latitude: -23.4356, longitude: -46.4731 },
        hasIndoorMap: true,
    },
    {
        id: 'bog',
        name: 'El Dorado International Airport',
        iataCode: 'BOG',
        city: 'Bogotá',
        coordinate: { latitude: 4.7016, longitude: -74.1469 },
        hasIndoorMap: true,
    }
];

export const getAirportByCode = (code: string): Airport | undefined => {
    return AIRPORTS.find(a => a.iataCode === code.toUpperCase());
};

export const findAirport = (query: string): Airport | undefined => {
    if (!query) return undefined;
    const q = query.toUpperCase();
    return AIRPORTS.find(a =>
        a.iataCode === q ||
        q.includes(a.iataCode) ||
        a.city.toUpperCase() === q ||
        q.includes(a.city.toUpperCase()) ||
        a.name.toUpperCase().includes(q)
    );
};
