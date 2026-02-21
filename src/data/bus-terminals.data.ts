// Bus terminal locations for major cities in Mexico and USA
// Used for showing terminal maps on bus trip overviews

export interface BusTerminal {
    id: string;
    name: string;
    shortName: string;
    city: string;
    coordinate: {
        latitude: number;
        longitude: number;
    };
}

export const BUS_TERMINALS: BusTerminal[] = [
    // ========== MEXICO ==========
    // Mexico City
    {
        id: 'tapo',
        name: 'Terminal de Autobuses de Pasajeros de Oriente (TAPO)',
        shortName: 'TAPO',
        city: 'Mexico City',
        coordinate: { latitude: 19.4264, longitude: -99.1207 },
    },
    {
        id: 'terminal-norte',
        name: 'Terminal Central de Autobuses del Norte',
        shortName: 'Terminal Norte',
        city: 'Mexico City',
        coordinate: { latitude: 19.4875, longitude: -99.1478 },
    },
    {
        id: 'terminal-sur',
        name: 'Terminal Central de Autobuses del Sur (Taxqueña)',
        shortName: 'Terminal Sur',
        city: 'Mexico City',
        coordinate: { latitude: 19.3444, longitude: -99.1406 },
    },
    {
        id: 'terminal-poniente',
        name: 'Terminal Central de Autobuses de Poniente (Observatorio)',
        shortName: 'Terminal Poniente',
        city: 'Mexico City',
        coordinate: { latitude: 19.3983, longitude: -99.1986 },
    },
    // Guadalajara
    {
        id: 'gdl-nueva',
        name: 'Nueva Central Camionera de Guadalajara',
        shortName: 'Central Gdl',
        city: 'Guadalajara',
        coordinate: { latitude: 20.6350, longitude: -103.2900 },
    },
    // Monterrey
    {
        id: 'mty-central',
        name: 'Central de Autobuses de Monterrey',
        shortName: 'Central MTY',
        city: 'Monterrey',
        coordinate: { latitude: 25.6895, longitude: -100.3147 },
    },
    // Puebla
    {
        id: 'capu',
        name: 'Central de Autobuses de Puebla (CAPU)',
        shortName: 'CAPU',
        city: 'Puebla',
        coordinate: { latitude: 19.0622, longitude: -98.2306 },
    },
    // Querétaro
    {
        id: 'qro-central',
        name: 'Terminal de Autobuses de Querétaro (TAQ)',
        shortName: 'TAQ',
        city: 'Querétaro',
        coordinate: { latitude: 20.5933, longitude: -100.4050 },
    },
    // León / Guanajuato
    {
        id: 'leon-central',
        name: 'Central de Autobuses de León',
        shortName: 'Central León',
        city: 'León',
        coordinate: { latitude: 21.1167, longitude: -101.6728 },
    },
    // Aguascalientes
    {
        id: 'ags-central',
        name: 'Central de Autobuses de Aguascalientes',
        shortName: 'Central AGS',
        city: 'Aguascalientes',
        coordinate: { latitude: 21.8706, longitude: -102.2956 },
    },
    // Cancún
    {
        id: 'cun-ado',
        name: 'Terminal ADO Cancún Centro',
        shortName: 'ADO Cancún',
        city: 'Cancún',
        coordinate: { latitude: 21.1619, longitude: -86.8269 },
    },
    // Mérida
    {
        id: 'merida-came',
        name: 'Terminal CAME Mérida',
        shortName: 'CAME Mérida',
        city: 'Mérida',
        coordinate: { latitude: 20.9667, longitude: -89.6233 },
    },
    // San Luis Potosí
    {
        id: 'slp-tip',
        name: 'Terminal Terrestre Potosina (TTP)',
        shortName: 'TTP',
        city: 'San Luis Potosí',
        coordinate: { latitude: 22.1564, longitude: -100.9761 },
    },
    // Tijuana
    {
        id: 'tij-central',
        name: 'Central de Autobuses de Tijuana',
        shortName: 'Central TJ',
        city: 'Tijuana',
        coordinate: { latitude: 32.5177, longitude: -117.0382 },
    },

    // ========== USA ==========
    {
        id: 'nyc-pabt',
        name: 'Port Authority Bus Terminal',
        shortName: 'Port Authority',
        city: 'New York',
        coordinate: { latitude: 40.7569, longitude: -73.9903 },
    },
    {
        id: 'la-greyhound',
        name: 'Los Angeles Greyhound Station',
        shortName: 'LA Greyhound',
        city: 'Los Angeles',
        coordinate: { latitude: 34.0469, longitude: -118.2389 },
    },
    {
        id: 'hou-greyhound',
        name: 'Houston Greyhound Station',
        shortName: 'Houston Bus',
        city: 'Houston',
        coordinate: { latitude: 29.7553, longitude: -95.3615 },
    },
    {
        id: 'dal-greyhound',
        name: 'Dallas Greyhound Station',
        shortName: 'Dallas Bus',
        city: 'Dallas',
        coordinate: { latitude: 32.7777, longitude: -96.8017 },
    },
    {
        id: 'chi-greyhound',
        name: 'Chicago Greyhound Station',
        shortName: 'Chicago Bus',
        city: 'Chicago',
        coordinate: { latitude: 41.8800, longitude: -87.6383 },
    },
    {
        id: 'sa-greyhound',
        name: 'San Antonio Greyhound Station',
        shortName: 'SA Bus',
        city: 'San Antonio',
        coordinate: { latitude: 29.4147, longitude: -98.4958 },
    },
    {
        id: 'laredo-bus',
        name: 'Laredo Bus Station',
        shortName: 'Laredo Bus',
        city: 'Laredo',
        coordinate: { latitude: 27.5036, longitude: -99.5075 },
    },
    {
        id: 'el-paso-bus',
        name: 'El Paso Greyhound Station',
        shortName: 'El Paso Bus',
        city: 'El Paso',
        coordinate: { latitude: 31.7619, longitude: -106.4850 },
    },
];

export const findBusTerminal = (query: string): BusTerminal | undefined => {
    if (!query) return undefined;
    const q = query.toUpperCase().trim();
    // Priority 1: exact short name (e.g. "TAPO", "CAPU", "TAQ")
    let match = BUS_TERMINALS.find(t => t.shortName.toUpperCase() === q);
    if (match) return match;
    // Priority 2: short name substring match
    match = BUS_TERMINALS.find(t =>
        q.includes(t.shortName.toUpperCase()) || t.shortName.toUpperCase().includes(q)
    );
    if (match) return match;
    // Priority 3: full terminal name contains query
    match = BUS_TERMINALS.find(t => t.name.toUpperCase().includes(q));
    if (match) return match;
    // Priority 4: exact city name match
    match = BUS_TERMINALS.find(t => t.city.toUpperCase() === q);
    if (match) return match;
    // Priority 5: city-name fallback (city name inside query string)
    return BUS_TERMINALS.find(t => q.includes(t.city.toUpperCase()));
};
