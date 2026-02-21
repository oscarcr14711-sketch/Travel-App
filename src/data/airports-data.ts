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
    },
    // USA - Additional Major Hubs
    {
        id: 'dfw',
        name: 'Dallas/Fort Worth International Airport',
        iataCode: 'DFW',
        city: 'Dallas',
        coordinate: { latitude: 32.8998, longitude: -97.0403 },
        hasIndoorMap: true,
    },
    {
        id: 'den',
        name: 'Denver International Airport',
        iataCode: 'DEN',
        city: 'Denver',
        coordinate: { latitude: 39.8561, longitude: -104.6737 },
        hasIndoorMap: true,
    },
    {
        id: 'sea',
        name: 'Seattle-Tacoma International Airport',
        iataCode: 'SEA',
        city: 'Seattle',
        coordinate: { latitude: 47.4502, longitude: -122.3088 },
        hasIndoorMap: true,
    },
    {
        id: 'phx',
        name: 'Phoenix Sky Harbor International Airport',
        iataCode: 'PHX',
        city: 'Phoenix',
        coordinate: { latitude: 33.4352, longitude: -112.0101 },
        hasIndoorMap: true,
    },
    {
        id: 'las',
        name: 'Harry Reid International Airport',
        iataCode: 'LAS',
        city: 'Las Vegas',
        coordinate: { latitude: 36.0840, longitude: -115.1537 },
        hasIndoorMap: true,
    },
    {
        id: 'mco',
        name: 'Orlando International Airport',
        iataCode: 'MCO',
        city: 'Orlando',
        coordinate: { latitude: 28.4312, longitude: -81.3081 },
        hasIndoorMap: true,
    },
    {
        id: 'bos',
        name: 'Logan International Airport',
        iataCode: 'BOS',
        city: 'Boston',
        coordinate: { latitude: 42.3656, longitude: -71.0096 },
        hasIndoorMap: true,
    },
    {
        id: 'ewr',
        name: 'Newark Liberty International Airport',
        iataCode: 'EWR',
        city: 'Newark',
        coordinate: { latitude: 40.6895, longitude: -74.1745 },
        hasIndoorMap: true,
    },
    {
        id: 'clt',
        name: 'Charlotte Douglas International Airport',
        iataCode: 'CLT',
        city: 'Charlotte',
        coordinate: { latitude: 35.2144, longitude: -80.9473 },
        hasIndoorMap: true,
    },
    {
        id: 'dtw',
        name: 'Detroit Metropolitan Airport',
        iataCode: 'DTW',
        city: 'Detroit',
        coordinate: { latitude: 42.2162, longitude: -83.3554 },
        hasIndoorMap: true,
    },
    {
        id: 'msp',
        name: 'Minneapolis-Saint Paul International Airport',
        iataCode: 'MSP',
        city: 'Minneapolis',
        coordinate: { latitude: 44.8820, longitude: -93.2218 },
        hasIndoorMap: true,
    },
    {
        id: 'iah',
        name: 'George Bush Intercontinental Airport',
        iataCode: 'IAH',
        city: 'Houston',
        coordinate: { latitude: 29.9902, longitude: -95.3368 },
        hasIndoorMap: true,
    },
    {
        id: 'phl',
        name: 'Philadelphia International Airport',
        iataCode: 'PHL',
        city: 'Philadelphia',
        coordinate: { latitude: 39.8744, longitude: -75.2424 },
        hasIndoorMap: true,
    },
    {
        id: 'san',
        name: 'San Diego International Airport',
        iataCode: 'SAN',
        city: 'San Diego',
        coordinate: { latitude: 32.7336, longitude: -117.1933 },
        hasIndoorMap: true,
    },
    {
        id: 'slc',
        name: 'Salt Lake City International Airport',
        iataCode: 'SLC',
        city: 'Salt Lake City',
        coordinate: { latitude: 40.7899, longitude: -111.9791 },
        hasIndoorMap: true,
    },
    {
        id: 'iad',
        name: 'Washington Dulles International Airport',
        iataCode: 'IAD',
        city: 'Washington',
        coordinate: { latitude: 38.9531, longitude: -77.4565 },
        hasIndoorMap: true,
    },
    {
        id: 'dca',
        name: 'Ronald Reagan Washington National Airport',
        iataCode: 'DCA',
        city: 'Washington',
        coordinate: { latitude: 38.8512, longitude: -77.0402 },
        hasIndoorMap: true,
    },
    {
        id: 'bwi',
        name: 'Baltimore/Washington International Airport',
        iataCode: 'BWI',
        city: 'Baltimore',
        coordinate: { latitude: 39.1774, longitude: -76.6684 },
        hasIndoorMap: true,
    },
    {
        id: 'lga',
        name: 'LaGuardia Airport',
        iataCode: 'LGA',
        city: 'New York',
        coordinate: { latitude: 40.7769, longitude: -73.8740 },
        hasIndoorMap: true,
    },
    {
        id: 'pdx',
        name: 'Portland International Airport',
        iataCode: 'PDX',
        city: 'Portland',
        coordinate: { latitude: 45.5898, longitude: -122.5951 },
        hasIndoorMap: true,
    },
    {
        id: 'tpa',
        name: 'Tampa International Airport',
        iataCode: 'TPA',
        city: 'Tampa',
        coordinate: { latitude: 27.9755, longitude: -82.5332 },
        hasIndoorMap: true,
    },
    {
        id: 'fll',
        name: 'Fort Lauderdale-Hollywood International Airport',
        iataCode: 'FLL',
        city: 'Fort Lauderdale',
        coordinate: { latitude: 26.0742, longitude: -80.1506 },
        hasIndoorMap: true,
    },
    {
        id: 'bna',
        name: 'Nashville International Airport',
        iataCode: 'BNA',
        city: 'Nashville',
        coordinate: { latitude: 36.1245, longitude: -86.6782 },
        hasIndoorMap: true,
    },
    {
        id: 'aus',
        name: 'Austin-Bergstrom International Airport',
        iataCode: 'AUS',
        city: 'Austin',
        coordinate: { latitude: 30.1945, longitude: -97.6699 },
        hasIndoorMap: true,
    },
    {
        id: 'mdw',
        name: 'Chicago Midway International Airport',
        iataCode: 'MDW',
        city: 'Chicago',
        coordinate: { latitude: 41.7868, longitude: -87.7522 },
        hasIndoorMap: true,
    },
    {
        id: 'hnl',
        name: 'Daniel K. Inouye International Airport',
        iataCode: 'HNL',
        city: 'Honolulu',
        coordinate: { latitude: 21.3187, longitude: -157.9225 },
        hasIndoorMap: true,
    },
    {
        id: 'rdu',
        name: 'Raleigh-Durham International Airport',
        iataCode: 'RDU',
        city: 'Raleigh',
        coordinate: { latitude: 35.8776, longitude: -78.7875 },
        hasIndoorMap: true,
    },
    {
        id: 'sna',
        name: 'John Wayne Airport',
        iataCode: 'SNA',
        city: 'Orange County',
        coordinate: { latitude: 33.6762, longitude: -117.8682 },
        hasIndoorMap: true,
    },
    {
        id: 'msy',
        name: 'Louis Armstrong New Orleans International Airport',
        iataCode: 'MSY',
        city: 'New Orleans',
        coordinate: { latitude: 29.9934, longitude: -90.2580 },
        hasIndoorMap: true,
    },
    {
        id: 'sat',
        name: 'San Antonio International Airport',
        iataCode: 'SAT',
        city: 'San Antonio',
        coordinate: { latitude: 29.5337, longitude: -98.4698 },
        hasIndoorMap: true,
    },
    {
        id: 'stl',
        name: 'St. Louis Lambert International Airport',
        iataCode: 'STL',
        city: 'St. Louis',
        coordinate: { latitude: 38.7487, longitude: -90.3700 },
        hasIndoorMap: true,
    },
    {
        id: 'ind',
        name: 'Indianapolis International Airport',
        iataCode: 'IND',
        city: 'Indianapolis',
        coordinate: { latitude: 39.7173, longitude: -86.2944 },
        hasIndoorMap: true,
    },
    {
        id: 'cvg',
        name: 'Cincinnati/Northern Kentucky International Airport',
        iataCode: 'CVG',
        city: 'Cincinnati',
        coordinate: { latitude: 39.0533, longitude: -84.6630 },
        hasIndoorMap: true,
    },
    {
        id: 'cmh',
        name: 'John Glenn Columbus International Airport',
        iataCode: 'CMH',
        city: 'Columbus',
        coordinate: { latitude: 39.9980, longitude: -82.8919 },
        hasIndoorMap: true,
    },
    {
        id: 'cle',
        name: 'Cleveland Hopkins International Airport',
        iataCode: 'CLE',
        city: 'Cleveland',
        coordinate: { latitude: 41.4117, longitude: -81.8498 },
        hasIndoorMap: true,
    },
    {
        id: 'pit',
        name: 'Pittsburgh International Airport',
        iataCode: 'PIT',
        city: 'Pittsburgh',
        coordinate: { latitude: 40.4915, longitude: -80.2329 },
        hasIndoorMap: true,
    },
    {
        id: 'rsw',
        name: 'Southwest Florida International Airport',
        iataCode: 'RSW',
        city: 'Fort Myers',
        coordinate: { latitude: 26.5362, longitude: -81.7552 },
        hasIndoorMap: true,
    },
    {
        id: 'anc',
        name: 'Ted Stevens Anchorage International Airport',
        iataCode: 'ANC',
        city: 'Anchorage',
        coordinate: { latitude: 61.1743, longitude: -149.9962 },
        hasIndoorMap: true,
    },
    // Mexico - Additional Airports
    {
        id: 'mty',
        name: 'Monterrey International Airport',
        iataCode: 'MTY',
        city: 'Monterrey',
        coordinate: { latitude: 25.7785, longitude: -100.1074 },
        hasIndoorMap: true,
    },
    {
        id: 'tij',
        name: 'Tijuana International Airport',
        iataCode: 'TIJ',
        city: 'Tijuana',
        coordinate: { latitude: 32.5411, longitude: -116.9701 },
        hasIndoorMap: false,
    },
    {
        id: 'pvr',
        name: 'Puerto Vallarta International Airport',
        iataCode: 'PVR',
        city: 'Puerto Vallarta',
        coordinate: { latitude: 20.6801, longitude: -105.2544 },
        hasIndoorMap: false,
    },
    {
        id: 'sjd',
        name: 'Los Cabos International Airport',
        iataCode: 'SJD',
        city: 'Cabo San Lucas',
        coordinate: { latitude: 23.1518, longitude: -109.7211 },
        hasIndoorMap: false,
    },
    // Canada - Major Airports
    {
        id: 'yvr',
        name: 'Vancouver International Airport',
        iataCode: 'YVR',
        city: 'Vancouver',
        coordinate: { latitude: 49.1939, longitude: -123.1844 },
        hasIndoorMap: true,
    },
    {
        id: 'yul',
        name: 'Montréal-Pierre Elliott Trudeau International Airport',
        iataCode: 'YUL',
        city: 'Montreal',
        coordinate: { latitude: 45.4657, longitude: -73.7455 },
        hasIndoorMap: true,
    },
    // International - Additional Major Hubs
    {
        id: 'nrt',
        name: 'Narita International Airport',
        iataCode: 'NRT',
        city: 'Tokyo',
        coordinate: { latitude: 35.7720, longitude: 140.3929 },
        hasIndoorMap: true,
    },
    {
        id: 'syd',
        name: 'Sydney Airport',
        iataCode: 'SYD',
        city: 'Sydney',
        coordinate: { latitude: -33.9399, longitude: 151.1753 },
        hasIndoorMap: true,
    },
    {
        id: 'mel',
        name: 'Melbourne Airport',
        iataCode: 'MEL',
        city: 'Melbourne',
        coordinate: { latitude: -37.6733, longitude: 144.8433 },
        hasIndoorMap: true,
    },
    {
        id: 'fco',
        name: 'Leonardo da Vinci-Fiumicino Airport',
        iataCode: 'FCO',
        city: 'Rome',
        coordinate: { latitude: 41.8003, longitude: 12.2389 },
        hasIndoorMap: true,
    },
    {
        id: 'muc',
        name: 'Munich Airport',
        iataCode: 'MUC',
        city: 'Munich',
        coordinate: { latitude: 48.3538, longitude: 11.7750 },
        hasIndoorMap: true,
    },
    {
        id: 'ist',
        name: 'Istanbul Airport',
        iataCode: 'IST',
        city: 'Istanbul',
        coordinate: { latitude: 41.2753, longitude: 28.7519 },
        hasIndoorMap: true,
    },
    {
        id: 'hkg',
        name: 'Hong Kong International Airport',
        iataCode: 'HKG',
        city: 'Hong Kong',
        coordinate: { latitude: 22.3080, longitude: 113.9185 },
        hasIndoorMap: true,
    },
    {
        id: 'pek',
        name: 'Beijing Capital International Airport',
        iataCode: 'PEK',
        city: 'Beijing',
        coordinate: { latitude: 40.0799, longitude: 116.6031 },
        hasIndoorMap: true,
    },
    {
        id: 'pvg',
        name: 'Shanghai Pudong International Airport',
        iataCode: 'PVG',
        city: 'Shanghai',
        coordinate: { latitude: 31.1443, longitude: 121.8083 },
        hasIndoorMap: true,
    },
    {
        id: 'del',
        name: 'Indira Gandhi International Airport',
        iataCode: 'DEL',
        city: 'New Delhi',
        coordinate: { latitude: 28.5562, longitude: 77.1000 },
        hasIndoorMap: true,
    },
    {
        id: 'bkk',
        name: 'Suvarnabhumi Airport',
        iataCode: 'BKK',
        city: 'Bangkok',
        coordinate: { latitude: 13.6900, longitude: 100.7501 },
        hasIndoorMap: true,
    },
    {
        id: 'doh',
        name: 'Hamad International Airport',
        iataCode: 'DOH',
        city: 'Doha',
        coordinate: { latitude: 25.2731, longitude: 51.6080 },
        hasIndoorMap: true,
    },

    // ── SPAIN ──────────────────────────────────────────────────────────────
    { id: 'mad', name: 'Adolfo Suárez Madrid–Barajas Airport', iataCode: 'MAD', city: 'Madrid', coordinate: { latitude: 40.4936, longitude: -3.5668 }, hasIndoorMap: true },
    { id: 'bcn', name: 'Barcelona–El Prat Airport', iataCode: 'BCN', city: 'Barcelona', coordinate: { latitude: 41.2974, longitude: 2.0833 }, hasIndoorMap: true },
    { id: 'agp', name: 'Málaga–Costa del Sol Airport', iataCode: 'AGP', city: 'Málaga', coordinate: { latitude: 36.6749, longitude: -4.4991 }, hasIndoorMap: false },
    { id: 'pmi', name: 'Palma de Mallorca Airport', iataCode: 'PMI', city: 'Palma', coordinate: { latitude: 39.5517, longitude: 2.7388 }, hasIndoorMap: false },
    { id: 'vlc', name: 'Valencia Airport', iataCode: 'VLC', city: 'Valencia', coordinate: { latitude: 39.4893, longitude: -0.4816 }, hasIndoorMap: false },
    { id: 'svq', name: 'Seville Airport', iataCode: 'SVQ', city: 'Seville', coordinate: { latitude: 37.4180, longitude: -5.8931 }, hasIndoorMap: false },
    { id: 'ibz', name: 'Ibiza Airport', iataCode: 'IBZ', city: 'Ibiza', coordinate: { latitude: 38.8729, longitude: 1.3731 }, hasIndoorMap: false },
    { id: 'lpa', name: 'Gran Canaria Airport', iataCode: 'LPA', city: 'Gran Canaria', coordinate: { latitude: 27.9319, longitude: -15.3866 }, hasIndoorMap: false },
    { id: 'tfe', name: 'Tenerife South Airport', iataCode: 'TFS', city: 'Tenerife', coordinate: { latitude: 28.0445, longitude: -16.5725 }, hasIndoorMap: false },
    { id: 'alc', name: 'Alicante–Elche Airport', iataCode: 'ALC', city: 'Alicante', coordinate: { latitude: 38.2822, longitude: -0.5582 }, hasIndoorMap: false },

    // ── FRANCE ─────────────────────────────────────────────────────────────
    { id: 'cdg', name: 'Charles de Gaulle Airport', iataCode: 'CDG', city: 'Paris', coordinate: { latitude: 49.0097, longitude: 2.5479 }, hasIndoorMap: true },
    { id: 'ory', name: 'Paris Orly Airport', iataCode: 'ORY', city: 'Paris', coordinate: { latitude: 48.7262, longitude: 2.3652 }, hasIndoorMap: true },
    { id: 'nce', name: "Nice Côte d'Azur Airport", iataCode: 'NCE', city: 'Nice', coordinate: { latitude: 43.6584, longitude: 7.2159 }, hasIndoorMap: false },
    { id: 'lys', name: 'Lyon–Saint-Exupéry Airport', iataCode: 'LYS', city: 'Lyon', coordinate: { latitude: 45.7256, longitude: 5.0811 }, hasIndoorMap: false },
    { id: 'mrs', name: 'Marseille Provence Airport', iataCode: 'MRS', city: 'Marseille', coordinate: { latitude: 43.4393, longitude: 5.2214 }, hasIndoorMap: false },
    { id: 'tls', name: 'Toulouse–Blagnac Airport', iataCode: 'TLS', city: 'Toulouse', coordinate: { latitude: 43.6293, longitude: 1.3638 }, hasIndoorMap: false },
    { id: 'bod', name: 'Bordeaux–Mérignac Airport', iataCode: 'BOD', city: 'Bordeaux', coordinate: { latitude: 44.8283, longitude: -0.7156 }, hasIndoorMap: false },
    { id: 'nte', name: 'Nantes Atlantique Airport', iataCode: 'NTE', city: 'Nantes', coordinate: { latitude: 47.1532, longitude: -1.6107 }, hasIndoorMap: false },

    // ── NETHERLANDS ────────────────────────────────────────────────────────
    { id: 'ams', name: 'Amsterdam Airport Schiphol', iataCode: 'AMS', city: 'Amsterdam', coordinate: { latitude: 52.3086, longitude: 4.7639 }, hasIndoorMap: true },
    { id: 'ein', name: 'Eindhoven Airport', iataCode: 'EIN', city: 'Eindhoven', coordinate: { latitude: 51.4501, longitude: 5.3746 }, hasIndoorMap: false },
    { id: 'rtm', name: 'Rotterdam The Hague Airport', iataCode: 'RTM', city: 'Rotterdam', coordinate: { latitude: 51.9569, longitude: 4.4372 }, hasIndoorMap: false },

    // ── SWITZERLAND ────────────────────────────────────────────────────────
    { id: 'zrh', name: 'Zurich Airport', iataCode: 'ZRH', city: 'Zurich', coordinate: { latitude: 47.4647, longitude: 8.5492 }, hasIndoorMap: true },
    { id: 'gva', name: 'Geneva Airport', iataCode: 'GVA', city: 'Geneva', coordinate: { latitude: 46.2381, longitude: 6.1089 }, hasIndoorMap: true },
    { id: 'bsl', name: 'EuroAirport Basel-Mulhouse-Freiburg', iataCode: 'BSL', city: 'Basel', coordinate: { latitude: 47.5896, longitude: 7.5299 }, hasIndoorMap: false },

    // ── SWEDEN ─────────────────────────────────────────────────────────────
    { id: 'arn', name: 'Stockholm Arlanda Airport', iataCode: 'ARN', city: 'Stockholm', coordinate: { latitude: 59.6519, longitude: 17.9186 }, hasIndoorMap: true },
    { id: 'got', name: 'Gothenburg Landvetter Airport', iataCode: 'GOT', city: 'Gothenburg', coordinate: { latitude: 57.6628, longitude: 12.2798 }, hasIndoorMap: false },
    { id: 'mmx', name: 'Malmö Airport', iataCode: 'MMX', city: 'Malmö', coordinate: { latitude: 55.5363, longitude: 13.3762 }, hasIndoorMap: false },

    // ── UNITED KINGDOM ─────────────────────────────────────────────────────
    { id: 'lhr', name: 'London Heathrow Airport', iataCode: 'LHR', city: 'London', coordinate: { latitude: 51.4700, longitude: -0.4543 }, hasIndoorMap: true },
    { id: 'lgw', name: 'London Gatwick Airport', iataCode: 'LGW', city: 'London', coordinate: { latitude: 51.1481, longitude: -0.1903 }, hasIndoorMap: true },
    { id: 'stn', name: 'London Stansted Airport', iataCode: 'STN', city: 'London', coordinate: { latitude: 51.8850, longitude: 0.2350 }, hasIndoorMap: false },
    { id: 'ltn', name: 'London Luton Airport', iataCode: 'LTN', city: 'London', coordinate: { latitude: 51.8747, longitude: -0.3683 }, hasIndoorMap: false },
    { id: 'lcy', name: 'London City Airport', iataCode: 'LCY', city: 'London', coordinate: { latitude: 51.5048, longitude: 0.0553 }, hasIndoorMap: false },
    { id: 'man', name: 'Manchester Airport', iataCode: 'MAN', city: 'Manchester', coordinate: { latitude: 53.3537, longitude: -2.2750 }, hasIndoorMap: true },
    { id: 'edi', name: 'Edinburgh Airport', iataCode: 'EDI', city: 'Edinburgh', coordinate: { latitude: 55.9500, longitude: -3.3725 }, hasIndoorMap: true },
    { id: 'bhx', name: 'Birmingham Airport', iataCode: 'BHX', city: 'Birmingham', coordinate: { latitude: 52.4539, longitude: -1.7480 }, hasIndoorMap: false },
    { id: 'brs', name: 'Bristol Airport', iataCode: 'BRS', city: 'Bristol', coordinate: { latitude: 51.3827, longitude: -2.7191 }, hasIndoorMap: false },
    { id: 'gla', name: 'Glasgow Airport', iataCode: 'GLA', city: 'Glasgow', coordinate: { latitude: 55.8719, longitude: -4.4330 }, hasIndoorMap: false },

    // ── NORWAY ─────────────────────────────────────────────────────────────
    { id: 'osl', name: 'Oslo Gardermoen Airport', iataCode: 'OSL', city: 'Oslo', coordinate: { latitude: 60.1939, longitude: 11.1004 }, hasIndoorMap: true },
    { id: 'bgo', name: 'Bergen Airport', iataCode: 'BGO', city: 'Bergen', coordinate: { latitude: 60.2934, longitude: 5.2181 }, hasIndoorMap: false },

    // ── DENMARK ────────────────────────────────────────────────────────────
    { id: 'cph', name: 'Copenhagen Airport', iataCode: 'CPH', city: 'Copenhagen', coordinate: { latitude: 55.6180, longitude: 12.6508 }, hasIndoorMap: true },

    // ── BELGIUM ────────────────────────────────────────────────────────────
    { id: 'bru', name: 'Brussels Airport', iataCode: 'BRU', city: 'Brussels', coordinate: { latitude: 50.9010, longitude: 4.4844 }, hasIndoorMap: true },

    // ── AUSTRIA ────────────────────────────────────────────────────────────
    { id: 'vie', name: 'Vienna International Airport', iataCode: 'VIE', city: 'Vienna', coordinate: { latitude: 48.1103, longitude: 16.5697 }, hasIndoorMap: true },
    { id: 'szg', name: 'Salzburg Airport', iataCode: 'SZG', city: 'Salzburg', coordinate: { latitude: 47.7933, longitude: 13.0043 }, hasIndoorMap: false },

    // ── PORTUGAL ───────────────────────────────────────────────────────────
    { id: 'lis', name: 'Humberto Delgado Airport (Lisbon)', iataCode: 'LIS', city: 'Lisbon', coordinate: { latitude: 38.7813, longitude: -9.1359 }, hasIndoorMap: true },
    { id: 'opo', name: 'Francisco Sá Carneiro Airport', iataCode: 'OPO', city: 'Porto', coordinate: { latitude: 41.2481, longitude: -8.6814 }, hasIndoorMap: false },
    { id: 'fao', name: 'Faro Airport', iataCode: 'FAO', city: 'Faro', coordinate: { latitude: 37.0144, longitude: -7.9659 }, hasIndoorMap: false },

    // ── GREECE ─────────────────────────────────────────────────────────────
    { id: 'ath', name: 'Athens International Airport', iataCode: 'ATH', city: 'Athens', coordinate: { latitude: 37.9364, longitude: 23.9445 }, hasIndoorMap: true },
    { id: 'her', name: 'Heraklion International Airport', iataCode: 'HER', city: 'Heraklion', coordinate: { latitude: 35.3397, longitude: 25.1803 }, hasIndoorMap: false },
    { id: 'jmk', name: 'Mykonos Airport', iataCode: 'JMK', city: 'Mykonos', coordinate: { latitude: 37.4351, longitude: 25.3481 }, hasIndoorMap: false },
    { id: 'thira', name: 'Santorini (Thira) Airport', iataCode: 'JTR', city: 'Santorini', coordinate: { latitude: 36.3992, longitude: 25.4793 }, hasIndoorMap: false },

    // ── POLAND ─────────────────────────────────────────────────────────────
    { id: 'waw', name: 'Warsaw Chopin Airport', iataCode: 'WAW', city: 'Warsaw', coordinate: { latitude: 52.1657, longitude: 20.9671 }, hasIndoorMap: true },
    { id: 'krk', name: 'Kraków John Paul II International Airport', iataCode: 'KRK', city: 'Kraków', coordinate: { latitude: 50.0777, longitude: 19.7848 }, hasIndoorMap: false },

    // ── CZECH REPUBLIC ─────────────────────────────────────────────────────
    { id: 'prg', name: 'Václav Havel Airport Prague', iataCode: 'PRG', city: 'Prague', coordinate: { latitude: 50.1008, longitude: 14.2600 }, hasIndoorMap: true },

    // ── HUNGARY ────────────────────────────────────────────────────────────
    { id: 'bud', name: 'Budapest Ferenc Liszt International Airport', iataCode: 'BUD', city: 'Budapest', coordinate: { latitude: 47.4298, longitude: 19.2611 }, hasIndoorMap: true },

    // ── FINLAND ────────────────────────────────────────────────────────────
    { id: 'hel', name: 'Helsinki-Vantaa Airport', iataCode: 'HEL', city: 'Helsinki', coordinate: { latitude: 60.3172, longitude: 24.9633 }, hasIndoorMap: true },

    // ── IRELAND ────────────────────────────────────────────────────────────
    { id: 'dub', name: 'Dublin Airport', iataCode: 'DUB', city: 'Dublin', coordinate: { latitude: 53.4213, longitude: -6.2701 }, hasIndoorMap: true },

    // ── ITALY (additional) ─────────────────────────────────────────────────
    { id: 'vce', name: 'Venice Marco Polo Airport', iataCode: 'VCE', city: 'Venice', coordinate: { latitude: 45.5053, longitude: 12.3519 }, hasIndoorMap: false },
    { id: 'nap', name: 'Naples International Airport', iataCode: 'NAP', city: 'Naples', coordinate: { latitude: 40.8860, longitude: 14.2908 }, hasIndoorMap: false },
    { id: 'psa', name: 'Pisa International Airport', iataCode: 'PSA', city: 'Pisa', coordinate: { latitude: 43.6839, longitude: 10.3927 }, hasIndoorMap: false },
    { id: 'cta', name: 'Catania–Fontanarossa Airport', iataCode: 'CTA', city: 'Catania', coordinate: { latitude: 37.4668, longitude: 15.0664 }, hasIndoorMap: false },

    // ── CANADA ─────────────────────────────────────────────────────────────
    { id: 'yyz', name: 'Toronto Pearson International Airport', iataCode: 'YYZ', city: 'Toronto', coordinate: { latitude: 43.6777, longitude: -79.6248 }, hasIndoorMap: true },
    { id: 'yvr', name: 'Vancouver International Airport', iataCode: 'YVR', city: 'Vancouver', coordinate: { latitude: 49.1967, longitude: -123.1815 }, hasIndoorMap: true },
    { id: 'yul', name: 'Montréal–Trudeau International Airport', iataCode: 'YUL', city: 'Montreal', coordinate: { latitude: 45.4706, longitude: -73.7408 }, hasIndoorMap: true },
    { id: 'yyc', name: 'Calgary International Airport', iataCode: 'YYC', city: 'Calgary', coordinate: { latitude: 51.1215, longitude: -114.0076 }, hasIndoorMap: false },

    // ── AUSTRALIA ──────────────────────────────────────────────────────────
    { id: 'syd', name: 'Sydney Kingsford Smith Airport', iataCode: 'SYD', city: 'Sydney', coordinate: { latitude: -33.9399, longitude: 151.1753 }, hasIndoorMap: true },
    { id: 'mel', name: 'Melbourne Airport', iataCode: 'MEL', city: 'Melbourne', coordinate: { latitude: -37.6690, longitude: 144.8410 }, hasIndoorMap: true },
    { id: 'bne', name: 'Brisbane Airport', iataCode: 'BNE', city: 'Brisbane', coordinate: { latitude: -27.3842, longitude: 153.1175 }, hasIndoorMap: false },

    // ── LATIN AMERICA (additional) ─────────────────────────────────────────
    { id: 'gru', name: 'São Paulo–Guarulhos International Airport', iataCode: 'GRU', city: 'São Paulo', coordinate: { latitude: -23.4356, longitude: -46.4731 }, hasIndoorMap: true },
    { id: 'eze', name: 'Ministro Pistarini International Airport', iataCode: 'EZE', city: 'Buenos Aires', coordinate: { latitude: -34.8222, longitude: -58.5358 }, hasIndoorMap: true },
    { id: 'bog', name: 'El Dorado International Airport', iataCode: 'BOG', city: 'Bogotá', coordinate: { latitude: 4.7016, longitude: -74.1469 }, hasIndoorMap: true },
    { id: 'scl', name: 'Arturo Merino Benítez International Airport', iataCode: 'SCL', city: 'Santiago', coordinate: { latitude: -33.3930, longitude: -70.7858 }, hasIndoorMap: true },
    { id: 'lim', name: 'Jorge Chávez International Airport', iataCode: 'LIM', city: 'Lima', coordinate: { latitude: -12.0219, longitude: -77.1143 }, hasIndoorMap: true },
    { id: 'gig', name: 'Rio de Janeiro–Galeão International Airport', iataCode: 'GIG', city: 'Rio de Janeiro', coordinate: { latitude: -22.8099, longitude: -43.2505 }, hasIndoorMap: false },

    // ── MIDDLE EAST / AFRICA ───────────────────────────────────────────────
    { id: 'dxb', name: 'Dubai International Airport', iataCode: 'DXB', city: 'Dubai', coordinate: { latitude: 25.2532, longitude: 55.3657 }, hasIndoorMap: true },
    { id: 'adl2', name: 'Abu Dhabi International Airport', iataCode: 'AUH', city: 'Abu Dhabi', coordinate: { latitude: 24.4330, longitude: 54.6511 }, hasIndoorMap: true },
    { id: 'jnb', name: 'O.R. Tambo International Airport', iataCode: 'JNB', city: 'Johannesburg', coordinate: { latitude: -26.1367, longitude: 28.2411 }, hasIndoorMap: true },
    { id: 'cai', name: 'Cairo International Airport', iataCode: 'CAI', city: 'Cairo', coordinate: { latitude: 30.1219, longitude: 31.4056 }, hasIndoorMap: false },
    { id: 'cmn', name: 'Mohammed V International Airport', iataCode: 'CMN', city: 'Casablanca', coordinate: { latitude: 33.3675, longitude: -7.5898 }, hasIndoorMap: false },

    // ── SOUTH / SOUTHEAST ASIA ─────────────────────────────────────────────
    { id: 'sin', name: 'Singapore Changi Airport', iataCode: 'SIN', city: 'Singapore', coordinate: { latitude: 1.3644, longitude: 103.9915 }, hasIndoorMap: true },
    { id: 'kul', name: 'Kuala Lumpur International Airport', iataCode: 'KUL', city: 'Kuala Lumpur', coordinate: { latitude: 2.7456, longitude: 101.7099 }, hasIndoorMap: true },
    { id: 'cgk', name: 'Soekarno–Hatta International Airport', iataCode: 'CGK', city: 'Jakarta', coordinate: { latitude: -6.1256, longitude: 106.6558 }, hasIndoorMap: false },
    { id: 'mnl', name: 'Ninoy Aquino International Airport', iataCode: 'MNL', city: 'Manila', coordinate: { latitude: 14.5086, longitude: 121.0197 }, hasIndoorMap: false },
    { id: 'han', name: 'Noi Bai International Airport', iataCode: 'HAN', city: 'Hanoi', coordinate: { latitude: 21.2212, longitude: 105.8072 }, hasIndoorMap: false },
    { id: 'sgn', name: 'Tan Son Nhat International Airport', iataCode: 'SGN', city: 'Ho Chi Minh City', coordinate: { latitude: 10.8188, longitude: 106.6520 }, hasIndoorMap: false },

    // ── JAPAN (additional) ─────────────────────────────────────────────────
    { id: 'kix', name: 'Kansai International Airport', iataCode: 'KIX', city: 'Osaka', coordinate: { latitude: 34.4272, longitude: 135.2440 }, hasIndoorMap: true },
    { id: 'cts', name: 'New Chitose Airport', iataCode: 'CTS', city: 'Sapporo', coordinate: { latitude: 42.7751, longitude: 141.6922 }, hasIndoorMap: false },
    { id: 'fuk', name: 'Fukuoka Airport', iataCode: 'FUK', city: 'Fukuoka', coordinate: { latitude: 33.5853, longitude: 130.4511 }, hasIndoorMap: false },
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
