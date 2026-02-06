// Accurate bus models database for Mexico and USA intercity buses
// Based on real 2024-2025 fleet data with ALL service classes properly tiered
// Key differences: Luxury (2 restrooms, individual screens) > Standard (1 restroom, overhead screens) > Economy (1 restroom, ambient TV)

export interface BusClassAmenities {
    seatType: string;
    seatPitch: string;
    seatConfiguration: string;
    recline: string;
    features: string[];
    entertainment: string[];
    power: string[];
    food: string[];
    beverages: string[];
    extras: string[];
}

export interface BusModelData {
    model: string;
    manufacturer: string;
    variant: string;
    commonOperators: string[];
    classes: {
        economy?: BusClassAmenities;
        standard?: BusClassAmenities;
        ejecutivo?: BusClassAmenities;
        lujo?: BusClassAmenities;
    };
}

export const BUS_MODELS_DATABASE: Record<string, BusModelData> = {
    // ========== PREMIUM LUXURY BUSES ==========
    'Volvo 9800 Euro 6': {
        model: 'Volvo 9800 Euro 6',
        manufacturer: 'Volvo',
        variant: 'Double Decker (2024-2025)',
        commonOperators: ['ETN', 'Turistar Lujo', 'Futura Select', 'Primera Plus'],
        classes: {
            economy: {
                seatType: 'Basic Reclining Seat',
                seatPitch: '36-38 inches',
                seatConfiguration: '2x2',
                recline: '110-120 degrees',
                features: ['Basic seating', 'Minimal recline'],
                entertainment: ['Ambient TV screens', 'Shared movies'],
                power: [],
                food: [],
                beverages: [],
                extras: ['AC', '1 restroom', 'Budget pricing']
            },
            standard: {
                seatType: 'Standard Reclining Seat',
                seatPitch: '40-42 inches',
                seatConfiguration: '2x2',
                recline: '120-130 degrees',
                features: ['Comfortable seats', 'Headrest', 'Armrest'],
                entertainment: ['Overhead screens', 'Shared movies'],
                power: ['USB port (some seats)'],
                food: [],
                beverages: ['For purchase at stops'],
                extras: ['WiFi (basic)', '1 restroom', 'AC', 'Luggage storage']
            },
            ejecutivo: {
                seatType: 'Ejecutivo Recliner',
                seatPitch: '48-52 inches',
                seatConfiguration: '2x1 (no middle seat)',
                recline: '140-155 degrees',
                features: ['Leather seats', 'Adjustable headrest', 'Footrest', 'Reading light', 'Extra legroom'],
                entertainment: ['Individual screen (10-12 inches)', 'Movies on demand', 'WiFi streaming'],
                power: ['USB-A port', 'USB-C port', 'AC outlet (select seats)'],
                food: [],
                beverages: ['Complimentary water', 'Soft drinks'],
                extras: ['WiFi included', '1 restroom', 'Climate control', 'Priority boarding']
            },
            lujo: {
                seatType: 'Luxury Lie-Flat Seat',
                seatPitch: '65-72 inches',
                seatConfiguration: '1x2 or 2x1 (ultra-spacious)',
                recline: '160-180 degrees',
                features: ['Premium leather seats', 'Adjustable lumbar', 'Personal reading light', 'Footrest', 'Panoramic upper deck views', 'Privacy features'],
                entertainment: ['Individual HD screen (13-15 inches)', 'On-demand movies/TV', 'WiFi streaming', 'Premium headphones'],
                power: ['USB-A port', 'USB-C port', 'AC power outlet', 'Wireless charging (select)'],
                food: [],
                beverages: ['Complimentary water', 'Soft drinks', 'Juice', 'Coffee/tea'],
                extras: ['High-speed WiFi', '2 restrooms (men/women)', 'Premium blanket & pillow', 'VIP lounge access', 'Priority boarding', 'Luxury amenity kit']
            }
        }
    },

    'Marcopolo G8 DD': {
        model: 'Marcopolo G8 DD',
        manufacturer: 'Marcopolo (on Scania/Volvo chassis)',
        variant: 'Double Decker - Luxury Only (2024-2025)',
        commonOperators: ['ETN', 'Turistar Lujo', 'ADO Platino', 'Primera Plus', 'Futura Select'],
        classes: {
            lujo: {
                seatType: 'Luxury Lie-Flat Seat',
                seatPitch: '65-72 inches',
                seatConfiguration: '1x2 or 2x1 (ultra-spacious)',
                recline: '160-180 degrees',
                features: ['Premium leather seats', 'Adjustable lumbar', 'Personal reading light', 'Footrest', 'Upper deck panoramic views', 'Privacy features', 'Memory foam cushioning'],
                entertainment: ['Individual HD screen (13-15 inches)', 'On-demand movies/TV', 'WiFi streaming', 'Premium headphones', 'Multiple languages'],
                power: ['USB-A port', 'USB-C port', 'AC power outlet', 'Wireless charging (select)'],
                food: ['Premium snack box'],
                beverages: ['Complimentary water', 'Soft drinks', 'Juice', 'Coffee/tea', 'Premium beverages'],
                extras: ['High-speed WiFi', '2 restrooms (men/women)', 'Premium blanket & pillow', 'VIP lounge access', 'Priority boarding', 'Luxury amenity kit', 'Upper deck exclusive seating']
            }
        }
    },

    'Volvo 9800 DD': {
        model: 'Volvo 9800 DD',
        manufacturer: 'Volvo',
        variant: 'Double Decker - Luxury Only (2024-2025)',
        commonOperators: ['ETN', 'Turistar Lujo', 'Primera Plus', 'Futura', 'ADO Platino'],
        classes: {
            lujo: {
                seatType: 'Luxury Lie-Flat Seat',
                seatPitch: '65-75 inches',
                seatConfiguration: '1x2 or 2x1 (ultra-spacious)',
                recline: '160-180 degrees',
                features: ['Premium leather seats', 'Adjustable lumbar', 'Personal reading light', 'Footrest', 'Panoramic upper deck views', 'Privacy partitions', 'Massage function (select)', 'Memory foam'],
                entertainment: ['Individual HD screen (13-15 inches)', 'On-demand movies/TV/music', 'WiFi streaming', 'Premium headphones', 'Gaming options'],
                power: ['USB-A port', 'USB-C port', 'AC power outlet', 'Wireless charging'],
                food: ['Gourmet snack box', 'Hot meal (long routes)'],
                beverages: ['Premium bottled water', 'Soft drinks', 'Juice', 'Coffee/tea', 'Hot chocolate'],
                extras: ['High-speed WiFi', '2 restrooms (men/women)', 'Premium blanket & pillow', 'VIP lounge access', 'Priority boarding', 'Luxury amenity kit', 'Upper deck VIP section', 'Concierge service']
            }
        }
    },

    'Irizar i8 Efficient': {
        model: 'Irizar i8 Efficient',
        manufacturer: 'Irizar (on Scania K450/K500 chassis)',
        variant: 'Premium Coach (2024-2025)',
        commonOperators: ['Primera Plus', 'Futura', 'ADO Platino', 'ADO GL', 'Elite Select'],
        classes: {
            economy: {
                seatType: 'Economy Seat',
                seatPitch: '34-38 inches',
                seatConfiguration: '2x2',
                recline: '100-120 degrees',
                features: ['Basic seating'],
                entertainment: ['Ambient TV', 'Shared content'],
                power: [],
                food: [],
                beverages: [],
                extras: ['AC', '1 restroom', 'Affordable']
            },
            standard: {
                seatType: 'Standard Reclining',
                seatPitch: '38-42 inches',
                seatConfiguration: '2x2',
                recline: '120-130 degrees',
                features: ['Comfortable seating', 'Headrest', 'Armrest'],
                entertainment: ['Overhead screens', 'Movies'],
                power: ['USB port (most seats)'],
                food: [],
                beverages: ['Snacks for purchase'],
                extras: ['WiFi', '1 restroom', 'AC']
            },
            ejecutivo: {
                seatType: 'Ejecutivo Recliner',
                seatPitch: '48-52 inches',
                seatConfiguration: '2x1 (no middle seat)',
                recline: '140-150 degrees',
                features: ['Comfortable leather seats', 'Adjustable headrest', 'Footrest', 'Reading light', 'Extra legroom'],
                entertainment: ['Individual screen (10-12 inches)', 'Movies on demand', 'Music channels', 'WiFi streaming'],
                power: ['USB-A port', 'USB-C port', 'AC power outlet'],
                food: [],
                beverages: ['Complimentary water', 'Soft drinks'],
                extras: ['WiFi included', '1 restroom', 'Climate control', 'Luggage compartment']
            },
            lujo: {
                seatType: 'Platinum Class Suite',
                seatPitch: '60-70 inches',
                seatConfiguration: '2x1 premium',
                recline: '160-170 degrees',
                features: ['Premium leather', 'Full recline', 'Massage function', 'Privacy features', 'Ambient lighting', 'Memory foam'],
                entertainment: ['Individual HD screen (13+ inches)', 'Premium content library', 'WiFi streaming', 'Premium headphones'],
                power: ['Multiple USB ports', 'AC outlets', 'Wireless charging (select buses)'],
                food: ['Snack box (complimentary)'],
                beverages: ['Premium bottled water', 'Soft drinks', 'Coffee/tea', 'Juice'],
                extras: ['High-speed WiFi', '2 restrooms (men/women)', 'VIP lounge access', 'Premium bedding', 'Priority service', 'Amenity kit']
            }
        }
    },

    'Scania Marcopolo G8': {
        model: 'Scania Marcopolo G8',
        manufacturer: 'Marcopolo/Scania',
        variant: 'Double Decker Premium (K500 chassis)',
        commonOperators: ['ETN', 'Turistar Lujo', 'ADO Platino'],
        classes: {
            economy: {
                seatType: 'Economy Seat',
                seatPitch: '36-38 inches',
                seatConfiguration: '2x2',
                recline: '110-120 degrees',
                features: ['Basic seating', 'Standard padding'],
                entertainment: ['Ambient TV screens'],
                power: [],
                food: [],
                beverages: [],
                extras: ['AC', '1 restroom', 'Budget option']
            },
            standard: {
                seatType: 'Standard Seat',
                seatPitch: '40-44 inches',
                seatConfiguration: '2x2',
                recline: '125-135 degrees',
                features: ['Comfortable seating', 'Headrest', 'Armrest'],
                entertainment: ['Overhead screens', 'Shared entertainment'],
                power: ['USB port (select seats)'],
                food: [],
                beverages: ['For purchase'],
                extras: ['WiFi (basic)', '1 restroom', 'AC']
            },
            ejecutivo: {
                seatType: 'Ejecutivo Semi-Sleeper',
                seatPitch: '50-55 inches',
                seatConfiguration: '2x1',
                recline: '145-160 degrees',
                features: ['Premium seats', 'Leg rest', 'Adjustable headrest', 'Reading light'],
                entertainment: ['Individual screen (12 inches)', 'Movies/music', 'WiFi streaming'],
                power: ['USB-A/C ports', 'AC outlet'],
                food: [],
                beverages: ['Complimentary water', 'Soft drinks'],
                extras: ['WiFi', '1 restroom', 'Climate control']
            },
            lujo: {
                seatType: 'Diamond Class Suite',
                seatPitch: '70-80 inches',
                seatConfiguration: '1x2 (suite style)',
                recline: 'Full 180-degree bed',
                features: ['Luxury suite seating', 'Privacy partition', 'Massage', 'Memory foam', 'Premium leather', 'Mood lighting'],
                entertainment: ['Large individual screen (15-17 inches)', 'Premium content', 'Noise-canceling headphones', 'WiFi'],
                power: ['Multiple USB ports', 'AC outlets', 'Wireless charging', 'Reading lights'],
                food: ['Premium snack box'],
                beverages: ['Premium water', 'Full beverage service', 'Specialty drinks', 'Coffee/tea'],
                extras: ['Ultra-fast WiFi', '2 restrooms (men/women)', 'VIP lounge', 'Luxury amenity kit', 'Premium bedding', 'Concierge service']
            }
        }
    },

    // ========== STANDARD/MID-TIER BUSES ==========
    'Irizar i8 (Scania K420)': {
        model: 'Irizar i8',
        manufacturer: 'Irizar (on Scania K420 chassis)',
        variant: 'Standard Premium (2019-2023)',
        commonOperators: ['Primera Plus', 'Futura', 'Elite', 'La Linea', 'Chihuahenses', 'Anahuac', 'Aguacaliente'],
        classes: {
            economy: {
                seatType: 'Economy Seat',
                seatPitch: '34-36 inches',
                seatConfiguration: '2x2',
                recline: '100-115 degrees',
                features: ['Basic seating'],
                entertainment: ['Ambient TV', 'Shared movies'],
                power: [],
                food: [],
                beverages: [],
                extras: ['AC', '1 restroom', 'Budget-friendly']
            },
            standard: {
                seatType: 'Standard Reclining Seat',
                seatPitch: '40-44 inches',
                seatConfiguration: '2x2 seating',
                recline: '125-135 degrees',
                features: ['Comfortable seats', 'Adjustable headrest', 'Armrest', 'Reading light'],
                entertainment: ['Shared overhead screens', 'WiFi streaming to device', 'Movies'],
                power: ['USB port (most seats)'],
                food: [],
                beverages: ['Water (for purchase)', 'Snacks available'],
                extras: ['WiFi', '1 restroom', 'AC', 'Luggage storage']
            },
            ejecutivo: {
                seatType: 'Semi-Ejecutivo',
                seatPitch: '46-50 inches',
                seatConfiguration: '2x1',
                recline: '135-145 degrees',
                features: ['Enhanced comfort', 'Footrest', 'Better padding', 'Personal light'],
                entertainment: ['Individual screen (10 inches)', 'Basic content', 'WiFi'],
                power: ['USB port', 'AC outlet (some seats)'],
                food: [],
                beverages: ['Complimentary water'],
                extras: ['WiFi included', '1 restroom', 'More legroom']
            }
        }
    },

    'Irizar PB': {
        model: 'Irizar PB',
        manufacturer: 'Irizar',
        variant: 'Standard Coach',
        commonOperators: ['Primera Plus', 'Pullman de Morelos', 'Estrella Blanca', 'Autovias', 'Transpais'],
        classes: {
            economy: {
                seatType: 'Economy Seat',
                seatPitch: '32-36 inches',
                seatConfiguration: '2x2',
                recline: '100-115 degrees',
                features: ['Basic seating'],
                entertainment: ['Ambient TV screens'],
                power: [],
                food: [],
                beverages: [],
                extras: ['AC', '1 restroom', 'Affordable']
            },
            standard: {
                seatType: 'Standard Coach Seat',
                seatPitch: '38-42 inches',
                seatConfiguration: '2x2',
                recline: '120-130 degrees',
                features: ['Basic reclining', 'Headrest', 'Armrest'],
                entertainment: ['Shared overhead screens', 'WiFi (basic)'],
                power: ['USB available (some buses)'],
                food: [],
                beverages: ['Snacks/drinks for purchase'],
                extras: ['WiFi', '1 restroom', 'AC']
            }
        }
    },

    // ========== ECONOMY BUSES ==========
    'Mercedes-Benz LO-916': {
        model: 'Mercedes-Benz LO-916',
        manufacturer: 'Mercedes-Benz',
        variant: 'Economy',
        commonOperators: ['OCC', 'Frontera', 'Estrella de Oro Primera', 'Caminante', 'Conexion', 'Noreste', 'Del Norte', 'Coordinados'],
        classes: {
            economy: {
                seatType: 'Basic Coach Seat',
                seatPitch: '32-36 inches',
                seatConfiguration: '2x2',
                recline: '100-115 degrees',
                features: ['Basic seating', 'Minimal recline'],
                entertainment: ['Ambient TV with movies'],
                power: [],
                food: [],
                beverages: [],
                extras: ['Basic AC', '1 restroom', 'Affordable pricing']
            },
            standard: {
                seatType: 'Standard Seat',
                seatPitch: '36-40 inches',
                seatConfiguration: '2x2',
                recline: '115-125 degrees',
                features: ['Decent comfort', 'Headrest', 'Armrest'],
                entertainment: ['Overhead screen', 'Shared movies'],
                power: ['USB (some newer buses)'],
                food: [],
                beverages: ['For purchase'],
                extras: ['AC', '1 restroom', 'Reliably service']
            }
        }
    },

    'Volvo B11R': {
        model: 'Volvo B11R',
        manufacturer: 'Volvo (with Irizar i6 body)',
        variant: 'Standard/Economy',
        commonOperators: ['ADO', 'OCC', 'Cristobal Colon'],
        classes: {
            economy: {
                seatType: 'Economy Seat',
                seatPitch: '32-36 inches',
                seatConfiguration: '2x2',
                recline: '100-120 degrees',
                features: ['Basic seating', 'Minimal recline'],
                entertainment: ['Ambient TV screens', 'Shared movies'],
                power: [],
                food: [],
                beverages: [],
                extras: ['AC', '1 restroom', 'Budget-friendly']
            },
            standard: {
                seatType: 'Standard Reclining',
                seatPitch: '38-40 inches',
                seatConfiguration: '2x2',
                recline: '120-130 degrees',
                features: ['Comfortable seating', 'Headrest', 'Armrest', 'Reading light'],
                entertainment: ['Overhead screens', 'WiFi (select routes)'],
                power: ['USB port (newer buses)'],
                food: [],
                beverages: ['Snacks for purchase'],
                extras: ['WiFi (select)', '1 restroom', 'AC', 'Reliable service']
            }
        }
    },

    // ========== USA BUSES ==========
    'MCI J4500': {
        model: 'MCI J4500',
        manufacturer: 'Motor Coach Industries',
        variant: 'USA Standard',
        commonOperators: ['Greyhound', 'Tornado Bus'],
        classes: {
            standard: {
                seatType: 'Standard Coach Seat',
                seatPitch: '36-38 inches',
                seatConfiguration: '2x2',
                recline: '110-120 degrees',
                features: ['Basic reclining', 'Headrest', 'Armrest', 'Reading light'],
                entertainment: ['WiFi', 'No screens'],
                power: ['AC outlet', 'USB port'],
                food: [],
                beverages: [],
                extras: ['WiFi', '1 restroom', 'Luggage under']
            }
        }
    },

    'Prevost X3-45': {
        model: 'Prevost X3-45',
        manufacturer: 'Prevost',
        variant: 'USA Premium',
        commonOperators: ['El Expreso', 'Flixbus', 'Omex VIP'],
        classes: {
            standard: {
                seatType: 'Premium Coach Seat',
                seatPitch: '38-40 inches',
                seatConfiguration: '2x2',
                recline: '120-130 degrees',
                features: ['Leather seats', 'Adjustable headrest', 'Footrest', 'Reading light'],
                entertainment: ['WiFi', 'Entertainment streaming', 'Device holder'],
                power: ['AC outlet', 'USB-A/C'],
                food: [],
                beverages: [],
                extras: ['Premium WiFi', '1 restroom', 'Smooth ride', 'More legroom']
            }
        }
    }
};

// Helper function to get bus model data
export const getBusModelData = (busModel: string): BusModelData | null => {
    return BUS_MODELS_DATABASE[busModel] || null;
};

// Helper function to get amenities for specific service class
export const getBusClassAmenities = (
    busModel: string,
    serviceClass: 'economy' | 'standard' | 'ejecutivo' | 'lujo'
): BusClassAmenities | null => {
    const bus = getBusModelData(busModel);
    if (!bus) return null;
    return bus.classes[serviceClass] || null;
};

// Get list of all available bus models
export const getAvailableBusModels = (): string[] => {
    return Object.keys(BUS_MODELS_DATABASE);
};

// Get service classes available for a bus model
export const getAvailableServiceClasses = (busModel: string): string[] => {
    const bus = getBusModelData(busModel);
    if (!bus) return [];
    return Object.keys(bus.classes);
};

// Get common operators for a bus model
export const getBusOperators = (busModel: string): string[] => {
    const bus = getBusModelData(busModel);
    if (!bus) return [];
    return bus.commonOperators || [];
};
