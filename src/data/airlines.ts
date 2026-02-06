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

    // Mexico Bus Companies
    { name: 'ETN' },
    { name: 'Turistar Lujo' },
    { name: 'ADO' },
    { name: 'Futura' },
    { name: 'Primera Plus' },
    { name: 'ADO GL' },
    { name: 'ADO Platino' },
    { name: 'Pullman De Morelos' },
    { name: 'Omnibus de Mexico' },
    { name: 'Omnibus de Mexico Plus' },
    { name: 'Elite' },
    { name: 'Elite Select' },
    { name: 'Tufesa' },
    { name: 'Tufesa Platinum' },
    { name: 'Tufesa Titanium' },
    { name: 'Tufesa Plus' },
    { name: 'Tufesa Megaplus' },
    { name: 'Senda TDN Diamante' },
    { name: 'OCC' },
    { name: 'Estrella de Oro' },
    { name: 'Estrella de Oro Plus' },
    { name: 'Estrella de Oro Diamante' },
    { name: 'Autovias' },
    { name: 'La Linea' },
    { name: 'Caminante' },
    { name: 'Chihuahenses' },
    { name: 'Chihuahenses Select' },
    { name: 'Conexion' },
    { name: 'Noreste' },
    { name: 'Noreste Plus' },
    { name: 'Anahuac' },
    { name: 'Aguacaliente' },
    { name: 'Oriente Select' },
    { name: 'Transportes Frontera' },
    { name: 'Transpais' },
    { name: 'Transpais Vista' },
    { name: 'Del Norte' },
    { name: 'Pullman De Morelos Ejecutivo Dorado' },
    { name: 'Parhikuni Platinum' },
    { name: 'Futura Select' },
    { name: 'Coordinados' },
];
