// Comprehensive aircraft database with class-specific amenities
// for major US and Mexico airlines

export interface ClassAmenities {
    seatType: string;
    seatWidth: string;
    seatPitch: string;
    recline: string;
    features: string[];
    entertainment: string[];
    power: string[];
    food: string[];
    beverages: string[];
    extras: string[];
}

export interface AircraftData {
    model: string;
    manufacturer: string;
    variant: string;
    classes: {
        economy?: ClassAmenities;
        premium_economy?: ClassAmenities;
        business?: ClassAmenities;
        first?: ClassAmenities;
    };
}

export const AIRCRAFT_DATABASE: Record<string, AircraftData> = {
    // ========== BOEING 737 FAMILY ==========
    '737-700': {
        model: '737-700',
        manufacturer: 'Boeing',
        variant: 'Next Generation',
        classes: {
            economy: {
                seatType: 'Standard Economy Seat',
                seatWidth: '17.2 inches',
                seatPitch: '30-32 inches',
                recline: '3-4 inches',
                features: ['Overhead bin', 'Tray table', 'Reading light'],
                entertainment: ['Streaming WiFi entertainment', 'Seatback device holder'],
                power: ['USB port (select aircraft)'],
                food: ['Snacks for purchase', 'Pretzels/cookies (complimentary)'],
                beverages: ['Soft drinks', 'Coffee/tea', 'Water'],
                extras: ['Blanket & pillow (long-haul)']
            },
            first: {
                seatType: 'First Class Recliner',
                seatWidth: '20.5 inches',
                seatPitch: '37-38 inches',
                recline: '5-6 inches',
                features: ['Leather seat', 'Adjustable headrest', 'Footrest'],
                entertainment: ['Streaming WiFi entertainment', 'Larger device holder'],
                power: ['AC power outlet', 'USB port'],
                food: ['Complimentary meals (long-haul)', 'Fresh snacks', 'Premium options'],
                beverages: ['Full bar', 'Premium wine', 'Specialty cocktails', 'Espresso'],
                extras: ['Priority boarding', 'Extra checked bag', 'Dedicated overhead bin']
            }
        }
    },

    '737-800': {
        model: '737-800',
        manufacturer: 'Boeing',
        variant: 'Next Generation',
        classes: {
            economy: {
                seatType: 'Standard Economy Seat',
                seatWidth: '17.2 inches',
                seatPitch: '30-32 inches',
                recline: '3-4 inches',
                features: ['Overhead bin', 'Tray table', 'Reading light'],
                entertainment: ['Streaming WiFi entertainment', 'Live TV (select airlines)'],
                power: ['USB port', 'AC power (newer aircraft)'],
                food: ['Snacks for purchase', 'Complimentary pretzels'],
                beverages: ['Soft drinks', 'Coffee/tea', 'Juice', 'Water'],
                extras: ['WiFi available (fee applies)']
            },
            first: {
                seatType: 'First Class Recliner',
                seatWidth: '21 inches',
                seatPitch: '37-39 inches',
                recline: '5-6 inches',
                features: ['Leather seat', 'Adjustable headrest', 'Leg rest', 'Coat hook'],
                entertainment: ['Streaming entertainment', 'Live TV', 'Premium content'],
                power: ['AC power outlet', 'USB-A port', 'USB-C port (newer)'],
                food: ['Fresh meals', 'Seasonal menu', 'Premium snacks'],
                beverages: ['Premium wines', 'Craft beer', 'Specialty cocktails', 'Champagne'],
                extras: ['Priority everything', 'Dedicated overhead space', 'Extra baggage allowance']
            }
        }
    },

    '737-900': {
        model: '737-900',
        manufacturer: 'Boeing',
        variant: 'Next Generation',
        classes: {
            economy: {
                seatType: 'Standard Economy Seat',
                seatWidth: '17.2 inches',
                seatPitch: '31-32 inches',
                recline: '3-4 inches',
                features: ['Overhead bin', 'Tray table', 'Reading light', 'Seatback pocket'],
                entertainment: ['Streaming WiFi entertainment', 'Seatback holder'],
                power: ['USB-A port'],
                food: ['Snacks for purchase', 'Light refreshments'],
                beverages: ['Soft drinks', 'Coffee/tea', 'Water'],
                extras: ['WiFi (fee)', 'Streaming to personal device']
            },
            first: {
                seatType: 'First Class Recliner',
                seatWidth: '21 inches',
                seatPitch: '37-38 inches',
                recline: '6 inches',
                features: ['Leather seat', 'Adjustable headrest & lumbar', 'Footrest', 'Armrest storage'],
                entertainment: ['Streaming entertainment', 'Live TV', 'Movies on demand'],
                power: ['110V AC outlet', 'USB-A', 'USB-C'],
                food: ['Chef-curated meals', 'Fresh salads', 'Hot entrees'],
                beverages: ['Premium bar service', 'Sommelier-selected wines', 'Artisan cocktails'],
                extras: ['Priority boarding', 'Lounge access (select airlines)', 'Extra bags']
            }
        }
    },

    '737 MAX 8': {
        model: '737 MAX 8',
        manufacturer: 'Boeing',
        variant: 'MAX',
        classes: {
            economy: {
                seatType: 'Slim-line Economy Seat',
                seatWidth: '17.3 inches',
                seatPitch: '30-32 inches',
                recline: '3-4 inches',
                features: ['Modern slim seat', 'LED mood lighting', 'Larger windows'],
                entertainment: ['High-speed WiFi streaming', 'Live TV', 'On-demand content'],
                power: ['USB-A port', 'USB-C port'],
                food: ['Snacks for purchase', 'Variety packs'],
                beverages: ['Soft drinks', 'Juices', 'Coffee/tea', 'Water'],
                extras: ['Better cabin pressure', 'Quieter engines']
            },
            first: {
                seatType: 'First Class Recliner',
                seatWidth: '21 inches',
                seatPitch: '37-39 inches',
                recline: '6 inches',
                features: ['Premium leather', 'Adjustable everything', 'Personal storage'],
                entertainment: ['High-speed streaming', '4K content', 'Live sports'],
                power: ['AC outlet', 'USB-A', 'USB-C', 'Wireless charging'],
                food: ['Fresh meals', 'Locally sourced ingredients', 'Chef specials'],
                beverages: ['Full premium bar', 'Wine selection', 'Craft cocktails'],
                extras: ['Priority boarding', 'Fast-track security', 'Extra baggage']
            }
        }
    },

    // ========== BOEING 757 ==========
    '757-200': {
        model: '757-200',
        manufacturer: 'Boeing',
        variant: 'Standard',
        classes: {
            economy: {
                seatType: 'Standard Economy Seat',
                seatWidth: '17.2 inches',
                seatPitch: '31-32 inches',
                recline: '4 inches',
                features: ['Overhead bin', 'Tray table', 'Reading light'],
                entertainment: ['Streaming entertainment', 'Seatback screens (select aircraft)'],
                power: ['USB port (select rows)'],
                food: ['Meals for purchase', 'Snack boxes'],
                beverages: ['Soft drinks', 'Coffee/tea', 'Juice'],
                extras: ['WiFi available']
            },
            premium_economy: {
                seatType: 'Economy Plus / Comfort+',
                seatWidth: '17.2 inches',
                seatPitch: '34-36 inches',
                recline: '5 inches',
                features: ['Extra legroom', 'Priority boarding', 'Dedicated overhead'],
                entertainment: ['Streaming entertainment', 'Premium content access'],
                power: ['AC outlet', 'USB port'],
                food: ['Complimentary snacks', 'Premium buy-on-board'],
                beverages: ['Full beverage service', 'Premium water'],
                extras: ['Free checked bag', 'Priority boarding', 'Upgraded amenity kit']
            },
            business: {
                seatType: 'Lie-Flat Business Seat',
                seatWidth: '20-22 inches',
                seatPitch: '76-78 inches (bed)',
                recline: 'Fully flat (180 degrees)',
                features: ['Direct aisle access', 'Privacy divider', 'Personal storage', 'Reading light'],
                entertainment: ['Large touchscreen IFE', 'Noise-canceling headphones', 'Premium content library'],
                power: ['110V AC', 'USB-A', 'USB-C'],
                food: ['Multi-course dining', 'Chef-designed menus', 'Fresh ingredients'],
                beverages: ['Premium wine list', 'Champagne served', 'Artisan cocktails', 'Espresso bar'],
                extras: ['Lounge access', 'Priority check-in', 'Amenity kit', 'Duvet & pillow']
            }
        }
    },

    // ========== BOEING 767 ==========
    '767-300': {
        model: '767-300',
        manufacturer: 'Boeing',
        variant: 'Extended Range',
        classes: {
            economy: {
                seatType: 'Standard Economy Seat',
                seatWidth: '17.9 inches',
                seatPitch: '31-32 inches',
                recline: '4 inches',
                features: ['Overhead bin', 'Tray table', 'Personal reading light'],
                entertainment: ['Seatback screens (9-12 inch)', 'Movies', 'TV shows', 'Games'],
                power: ['USB port'],
                food: ['Complimentary meal (international)', 'Snacks'],
                beverages: ['Soft drinks', 'Juices', 'Coffee/tea', 'Water'],
                extras: ['Amenity kit (international)', 'Pillow & blanket']
            },
            premium_economy: {
                seatType: 'Premium Economy Seat',
                seatWidth: '18.5 inches',
                seatPitch: '38 inches',
                recline: '7 inches',
                features: ['Enhanced comfort', 'Adjustable headrest', 'Footrest', 'Leg rest'],
                entertainment: ['Larger seatback screen', 'Premium headphones', 'Expanded library'],
                power: ['AC power', 'USB-A', 'USB-C'],
                food: ['Enhanced meal service', 'Premium snacks', 'Complimentary alcohol'],
                beverages: ['Full bar service', 'Premium wines', 'Specialty drinks'],
                extras: ['Priority boarding', 'Premium amenity kit', 'Extra baggage allowance']
            },
            business: {
                seatType: 'Lie-Flat Business Seat',
                seatWidth: '20-21 inches',
                seatPitch: '76 inches',
                recline: 'Fully flat',
                features: ['Direct aisle access (some configs)', 'Privacy screens', 'Personal storage'],
                entertainment: ['15-17 inch touchscreen', 'Bose headphones', 'On-demand everything'],
                power: ['AC outlet', 'USB ports', 'Dedicated lighting'],
                food: ['Multi-course meals', 'Dine on demand', 'Premium selections'],
                beverages: ['Premium champagne', 'Wine sommelier selections', 'Full bar'],
                extras: ['Lounge access', 'Priority services', 'Luxury amenity kit', 'Bedding']
            }
        }
    },

    // ========== BOEING 777 ==========
    '777-200': {
        model: '777-200',
        manufacturer: 'Boeing',
        variant: 'Standard / LR',
        classes: {
            economy: {
                seatType: 'Standard Economy Seat',
                seatWidth: '17-18 inches',
                seatPitch: '31-32 inches',
                recline: '4 inches',
                features: ['Adjustable headrest', 'Tray table', 'Personal reading light'],
                entertainment: ['Seatback touchscreen (10-12 inch)', 'Movies', 'TV', 'Games', 'Music'],
                power: ['USB port', 'AC power (select rows)'],
                food: ['Complimentary meals', 'Special meal options', 'Snacks'],
                beverages: ['Full beverage service', 'Soft drinks', 'Coffee/tea'],
                extras: ['Amenity kit', 'Pillow & blanket', 'WiFi (fee)']
            },
            premium_economy: {
                seatType: 'Premium Economy Seat',
                seatWidth: '18-19 inches',
                seatPitch: '38 inches',
                recline: '7-8 inches',
                features: ['Enhanced seat', 'Adjustable headrest & leg rest', 'Footrest'],
                entertainment: ['Larger touchscreen', 'Noise-canceling headphones', 'Premium content'],
                power: ['AC outlet', 'USB-A', 'USB-C'],
                food: ['Enhanced dining', 'Premium meals', 'Complimentary alcohol'],
                beverages: ['Premium beverages', 'Wine & beer selection', 'Specialty coffees'],
                extras: ['Priority boarding', 'Premium amenity kit', 'Pillow & duvet']
            },
            business: {
                seatType: 'Lie-Flat Business Suite',
                seatWidth: '20-23 inches',
                seatPitch: '78-80 inches',
                recline: 'Fully flat',
                features: ['Direct aisle access', 'Privacy doors (select)', 'Personal closet', 'Multiple storage'],
                entertainment: ['18-24 inch 4K screen', 'Bose headphones', 'Unlimited content'],
                power: ['110V AC', 'USB-A', 'USB-C', 'Wireless charging'],
                food: ['Multi-course gourmet dining', 'Dine on demand', 'Michelin-inspired menus'],
                beverages: ['Premium champagne', 'Wine cellar selection', 'Craft cocktails'],
                extras: ['Lounge access', 'Priority everything', 'Luxury amenity kit', 'Premium bedding']
            },
            first: {
                seatType: 'First Class Suite',
                seatWidth: '25-27 inches',
                seatPitch: '80-82 inches',
                recline: 'Bed mode (fully flat)',
                features: ['Private suite', 'Closing door', 'Personal wardrobe', 'Vanity', 'Full privacy'],
                entertainment: ['32-inch personal TV', 'Bose QuietComfort headphones', 'Unlimited premium content'],
                power: ['Multiple AC outlets', 'USB-A', 'USB-C', 'Wireless charging pad'],
                food: ['Gourmet chef-curated meals', 'Caviar service', 'Dine on demand', 'Premium appetizers'],
                beverages: ['Dom Pérignon champagne', 'Exclusive wine list', 'Premium spirits', 'Specialty cocktails'],
                extras: ['Chauffeur service', 'Private lounge', 'Luxury Tumi amenity kit', 'Luxury bedding', 'Pajamas']
            }
        }
    },

    '777-300ER': {
        model: '777-300ER',
        manufacturer: 'Boeing',
        variant: 'Extended Range',
        classes: {
            economy: {
                seatType: 'Standard Economy Seat',
                seatWidth: '17-18 inches',
                seatPitch: '31-32 inches',
                recline: '4 inches',
                features: ['Adjustable headrest', 'Tray table', 'Personal light'],
                entertainment: ['11-12 inch touchscreen', 'Movies', 'TV shows', 'Games', 'Audio'],
                power: ['USB port', 'AC power (most seats)'],
                food: ['Complimentary meals', 'Meal choices', 'Snacks'],
                beverages: ['Full beverage service', 'Soft drinks', 'Coffee/tea', 'Water'],
                extras: ['International amenity kit', 'Pillow & blanket']
            },
            premium_economy: {
                seatType: 'Premium Plus / Premium Economy',
                seatWidth: '18.5-19 inches',
                seatPitch: '38-39 inches',
                recline: '7-8 inches',
                features: ['Premium seat', 'Adjustable headrest', 'Leg rest', 'Footrest'],
                entertainment: ['13-inch touchscreen', 'Premium headphones', 'Premium selections'],
                power: ['AC outlet', 'USB-A', 'USB-C'],
                food: ['Enhanced meal service', 'Premium choices', 'Complimentary bar'],
                beverages: ['Premium wines', 'Craft beers', 'Specialty beverages'],
                extras: ['Priority boarding', 'Premium amenity kit', 'Extra baggage']
            },
            business: {
                seatType: 'Business Class Suite',
                seatWidth: '20-23 inches',
                seatPitch: '78-82 inches',
                recline: 'Fully flat bed',
                features: ['Direct aisle access (1-2-1 layout)', 'Privacy screens/door', 'Personal storage', 'Mood lighting'],
                entertainment: ['18-24 inch 4K touchscreen', 'Bose QuietComfort', 'Extensive library'],
                power: ['AC outlet', 'USB-A', 'USB-C', 'Wireless charging'],
                food: ['Multi-course dining', 'Dine on demand', 'Chef-designed menus', 'Fresh ingredients'],
                beverages: ['Champagne service', 'Premium wine list', 'Artisan cocktails', 'Specialty coffee'],
                extras: ['Lounge access', 'Priority check-in', 'Amenity kit', 'Premium bedding', 'Mattress pad']
            },
            first: {
                seatType: 'First Class Private Suite',
                seatWidth: '27 inches',
                seatPitch: '83 inches',
                recline: 'Full bed',
                features: ['Private enclosed suite', 'Closing doors', 'Personal wardrobe', 'Full-length mirror'],
                entertainment: ['32-inch 4K TV', 'Premium headphones', 'Unlimited entertainment'],
                power: ['Multiple AC outlets', 'USB-A/C', 'Wireless charging', 'Personal lighting control'],
                food: ['Michelin-star inspired', 'Caviar & champagne', 'Dine on demand', '7-course options'],
                beverages: ['Krug champagne', 'Exclusive wine cellar', 'Top-shelf spirits', 'Barista service'],
                extras: ['Chauffeur', 'First Class lounge', 'Luxury amenity kit', 'Luxury pajamas', 'Mattress pad']
            }
        }
    },

    // ========== BOEING 787 DREAMLINER ==========
    '787-8': {
        model: '787-8',
        manufacturer: 'Boeing',
        variant: 'Dreamliner',
        classes: {
            economy: {
                seatType: 'Dreamliner Economy Seat',
                seatWidth: '17.2-17.3 inches',
                seatPitch: '31-32 inches',
                recline: '4 inches',
                features: ['Larger windows', 'LED mood lighting', 'Higher humidity', 'Better cabin pressure'],
                entertainment: ['11-12 inch touchscreen', 'Hundreds of movies', 'Live TV', 'Games'],
                power: ['USB port', 'AC outlet (most seats)'],
                food: ['Complimentary meals (international)', 'Fresh ingredients', 'Meal choices'],
                beverages: ['Full service', 'Soft drinks', 'Coffee/tea', 'Juices'],
                extras: ['Premium amenity kit', 'Pillow & blanket', 'Quieter cabin']
            },
            premium_economy: {
                seatType: 'Premium Economy Seat',
                seatWidth: '18-18.5 inches',
                seatPitch: '38 inches',
                recline: '7-8 inches',
                features: ['Enhanced comfort', 'Adjustable headrest', 'Footrest', 'Leg rest'],
                entertainment: ['13-15 inch touchscreen', 'Premium headphones', 'Expanded library'],
                power: ['AC outlet', 'USB-A', 'USB-C'],
                food: ['Enhanced meal service', 'Complimentary alcohol', 'Premium snacks'],
                beverages: ['Premium beverage selection', 'Wine & beer', 'Specialty drinks'],
                extras: ['Priority boarding', 'Premium amenity kit', 'Extra bags', 'Dedicated overhead']
            },
            business: {
                seatType: 'Business Class Lie-Flat',
                seatWidth: '20-22 inches',
                seatPitch: '74-78 inches',
                recline: 'Fully flat',
                features: ['Direct aisle access', 'Enhanced privacy', 'Personal storage', 'Dreamliner windows'],
                entertainment: ['15-18 inch touchscreen', 'Bose headphones', 'Premium content'],
                power: ['AC outlet', 'USB-A/C', 'Personal lighting', 'Wireless charging (newer)'],
                food: ['Multi-course meals', 'Dine on demand', 'Fresh menus', 'Local flavors'],
                beverages: ['Champagne service', 'Premium wines', 'Full bar', 'Specialty coffee'],
                extras: ['Lounge access', 'Priority services', 'Amenity kit', 'Bedding set']
            }
        }
    },

    '787-9': {
        model: '787-9',
        manufacturer: 'Boeing',
        variant: 'Dreamliner',
        classes: {
            economy: {
                seatType: 'Dreamliner Economy Seat',
                seatWidth: '17.2-17.3 inches',
                seatPitch: '31-32 inches',
                recline: '4 inches',
                features: ['Larger windows with dimming', 'LED lighting', 'Higher humidity', 'Lower cabin altitude'],
                entertainment: ['11-13 inch touchscreen', 'On-demand movies & TV', 'Live programming'],
                power: ['USB-A port', 'AC power outlet'],
                food: ['Complimentary meal service', 'Meal options', 'Snacks available'],
                beverages: ['Full beverage service', 'Soft drinks', 'Coffee/tea', 'Water'],
                extras: ['Amenity kit', 'Pillow & blanket', 'Quieter engines']
            },
            premium_economy: {
                seatType: 'Premium Economy Seat',
                seatWidth: '18-19 inches',
                seatPitch: '38 inches',
                recline: '7-8 inches',
                features: ['Premium comfort', 'Adjustable headrest', 'Footrest', 'Dedicated service'],
                entertainment: ['13-15 inch HD touchscreen', 'Noise-canceling headphones', 'Premium content'],
                power: ['110V AC', 'USB-A', 'USB-C'],
                food: ['Enhanced dining experience', 'Premium meal options', 'Complimentary drinks'],
                beverages: ['Premium wine', 'Craft beer', 'Specialty cocktails'],
                extras: ['Priority boarding', 'Enhanced amenity kit', 'Extra baggage', 'Dedicated overhead']
            },
            business: {
                seatType: 'Business Class Suite',
                seatWidth: '21-23 inches',
                seatPitch: '78-80 inches',
                recline: 'Fully flat bed',
                features: ['Direct aisle access', 'Privacy panels', 'Personal closet', 'Dreamliner experience'],
                entertainment: ['16-18 inch touchscreen', 'Bose QuietComfort headphones', 'Extensive library'],
                power: ['AC outlets', 'USB-A/C', 'Personal reading lights', 'Wireless charging'],
                food: ['Gourmet multi-course meals', 'Dine whenever you want', 'Chef-curated menus'],
                beverages: ['Champagne', 'Premium wine selection', 'Full bar service', 'Barista coffee'],
                extras: ['Flagship lounge access', 'Priority everything', 'Luxury amenity kit', 'Premium bedding']
            }
        }
    },

    // ========== AIRBUS A320 FAMILY ==========
    'A320': {
        model: 'A320',
        manufacturer: 'Airbus',
        variant: 'Standard',
        classes: {
            economy: {
                seatType: 'Standard Economy Seat',
                seatWidth: '17.8 inches',
                seatPitch: '32-34 inches', // JetBlue has more legroom than most
                recline: '3-4 inches',
                features: ['Leather seats (JetBlue)', 'Adjustable headrest', 'Tray table', 'Seatback pocket'],
                entertainment: ['10-inch seatback screen', 'Live TV channels (JetBlue)', 'Movies on demand', '100+ channels'],
                power: ['USB port at every seat', 'Power outlet (select aircraft)'],
                food: ['Snacks for purchase', 'Free snacks & drinks (JetBlue)', 'Complimentary soft drinks'],
                beverages: ['Soft drinks', 'Coffee/tea', 'Water', 'Juice'],
                extras: ['Free Fly-Fi WiFi (JetBlue)', 'Blue Basic & Blue fares available']
            },
            first: {
                seatType: 'First Class Recliner',
                seatWidth: '20-21 inches',
                seatPitch: '37-38 inches',
                recline: '5-6 inches',
                features: ['Premium leather seat', 'Adjustable headrest', 'Cocktail table', 'Extra storage'],
                entertainment: ['Large seatback screen', 'Live TV', 'Premium content', 'Streaming'],
                power: ['AC outlet', 'USB-A port', 'USB-C port (newer)'],
                food: ['Complimentary fresh meals', 'Premium snacks', 'Fresh ingredients'],
                beverages: ['Full bar service', 'Premium wines', 'Craft cocktails', 'Specialty coffee'],
                extras: ['Priority boarding', 'Extra checked bags', 'Fast-track security', 'Dedicated overhead']
            }
        }
    },

    'A321': {
        model: 'A321',
        manufacturer: 'Airbus',
        variant: 'Standard / neo / LR',
        classes: {
            economy: {
                seatType: 'Economy Seat',
                seatWidth: '17.8-18 inches',
                seatPitch: '32-34 inches', // JetBlue's Even More Space: 37-41"
                recline: '3-4 inches',
                features: ['Leather seats (JetBlue)', 'Adjustable winged headrest', 'Tray table', 'Device holder'],
                entertainment: ['10.1-inch touchscreen', 'Live TV (100+ channels)', 'On-demand movies & shows', 'Free content'],
                power: ['USB-A port', 'USB-C port', 'Power outlet (newer aircraft)'],
                food: ['Snacks for purchase', 'Free snacks (JetBlue)', 'EatUp Cafe menu'],
                beverages: ['Soft drinks', 'Coffee/tea', 'Juices', 'Water', 'Free drinks (JetBlue)'],
                extras: ['Free high-speed WiFi (JetBlue)', 'Even More Space seats available', 'Most legroom in coach']
            },
            premium_economy: {
                seatType: 'Even More Space / Extra Comfort',
                seatWidth: '17.8-18 inches',
                seatPitch: '37-41 inches', // JetBlue Even More Space
                recline: '4-5 inches',
                features: ['Extra legroom', 'Preferred location', 'Earlier boarding', 'Leather seats'],
                entertainment: ['10.1-inch HD touchscreen', 'Live TV', 'Enhanced content library'],
                power: ['AC power outlet', 'USB-A', 'USB-C'],
                food: ['Complimentary snacks', 'EatUp Cafe discount', 'Premium buy-on-board'],
                beverages: ['Full beverage service', 'Beer & wine included (select airlines)', 'Premium water'],
                extras: ['Priority boarding', 'Extra legroom', 'Free checked bag (JetBlue)', 'Best seat selection']
            },
            business: {
                seatType: 'Mint Suite (JetBlue A321)', // JetBlue's premium product
                seatWidth: '20-23 inches',
                seatPitch: '76-82 inches (fully flat)',
                recline: 'Fully flat bed (180°)',
                features: ['Private suite with door', 'Lie-flat seat', 'Memory foam cushion', 'Massage', 'Personal storage'],
                entertainment: ['15-17 inch 4K touchscreen', 'Bose QuietComfort headphones', 'Premium content library', 'Live TV'],
                power: ['110V AC outlet', 'USB-A', 'USB-C', 'Wireless charging (select)'],
                food: ['Multi-course dining', 'Tapas-style service', 'Fresh seasonal menu', 'Chef-curated meals'],
                beverages: ['Premium champagne', 'Sommelier wine selection', 'Craft cocktails', 'Espresso martinis'],
                extras: ['Mint lounge access', 'Priority everything', 'Amenity kit', 'Luxury bedding', 'Pre-arrival meal']
            }
        }
    },

    // ========== REGIONAL JETS ==========
    'ERJ-175': {
        model: 'ERJ-175',
        manufacturer: 'Embraer',
        variant: 'Regional Jet',
        classes: {
            economy: {
                seatType: 'Regional Economy Seat',
                seatWidth: '17.3 inches',
                seatPitch: '30-31 inches',
                recline: '3 inches',
                features: ['Overhead bin', 'Tray table', '2-2 seating (no middle seats)'],
                entertainment: ['WiFi streaming (select)', 'Bring your own device'],
                power: ['USB port (newer aircraft)'],
                food: ['Snacks for purchase'],
                beverages: ['Soft drinks', 'Coffee/tea'],
                extras: ['Smaller aircraft feel', 'Quick boarding']
            },
            first: {
                seatType: 'First Class Seat',
                seatWidth: '19 inches',
                seatPitch: '37 inches',
                recline: '5 inches',
                features: ['Leather seat', 'Adjustable headrest', '1-2 seating'],
                entertainment: ['WiFi streaming', 'Device holder'],
                power: ['AC outlet', 'USB port'],
                food: ['Complimentary snacks', 'Fresh options'],
                beverages: ['Full bar', 'Premium drinks'],
                extras: ['Priority boarding', 'Extra bags']
            }
        }
    },

    'CRJ-900': {
        model: 'CRJ-900',
        manufacturer: 'Bombardier',
        variant: 'Regional Jet',
        classes: {
            economy: {
                seatType: 'Regional Economy Seat',
                seatWidth: '17 inches',
                seatPitch: '30-31 inches',
                recline: '2-3 inches',
                features: ['Overhead bin', 'Tray table', '2-2 seating'],
                entertainment: ['WiFi (select aircraft)', 'Personal device streaming'],
                power: ['USB port (select rows)'],
                food: ['Snacks for purchase'],
                beverages: ['Soft drinks', 'Coffee'],
                extras: ['No middle seats', 'Quick service']
            },
            first: {
                seatType: 'First Class Seat',
                seatWidth: '19-20 inches',
                seatPitch: '36-37 inches',
                recline: '4-5 inches',
                features: ['Premium seat', 'Headrest', '1-2 configuration'],
                entertainment: ['WiFi streaming', 'Seatback holder'],
                power: ['AC power', 'USB'],
                food: ['Complimentary refreshments'],
                beverages: ['Beer, wine, spirits'],
                extras: ['Priority boarding', 'Dedicated overhead']
            }
        }
    }
};

// Helper function to get aircraft data
export const getAircraftData = (aircraftModel: string): AircraftData | null => {
    return AIRCRAFT_DATABASE[aircraftModel] || null;
};

// Helper function to get amenities for specific class
export const getClassAmenities = (
    aircraftModel: string,
    cabinClass: 'economy' | 'premium_economy' | 'business' | 'first'
): ClassAmenities | null => {
    const aircraft = getAircraftData(aircraftModel);
    if (!aircraft) return null;
    return aircraft.classes[cabinClass] || null;
};

// Get list of all available aircraft models
export const getAvailableAircraft = (): string[] => {
    return Object.keys(AIRCRAFT_DATABASE);
};
