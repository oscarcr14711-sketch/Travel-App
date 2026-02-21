// Real airport amenity data for major airports
// Category types for airport businesses

export interface AirportPOI {
    id: string;
    airportCode: string;
    name: string;
    category: POICategory;
    terminal?: string;
    gate?: string;
    floor?: string;
    hours?: string;
    phone?: string;
    website?: string;
    description?: string;
    rating?: number;
    priceLevel?: 1 | 2 | 3; // $ $$ $$$
    latitude: number;
    longitude: number;
}

export type POICategory =
    | 'coffee'
    | 'fast_food'
    | 'restaurant'
    | 'bar'
    | 'lounge'
    | 'shop'
    | 'duty_free'
    | 'news_gifts'
    | 'pharmacy'
    | 'currency_exchange'
    | 'information'
    | 'wifi_charging'
    | 'spa_wellness';

export const POI_CATEGORY_META: Record<POICategory, { emoji: string; label: string; color: string }> = {
    coffee: { emoji: '☕', label: 'Coffee', color: '#8B4513' },
    fast_food: { emoji: '🍔', label: 'Fast Food', color: '#FF6347' },
    restaurant: { emoji: '🍽️', label: 'Restaurant', color: '#E74C3C' },
    bar: { emoji: '🍺', label: 'Bar & Grill', color: '#F39C12' },
    lounge: { emoji: '🛋️', label: 'Lounge', color: '#6B5FCC' },
    shop: { emoji: '🛍️', label: 'Shop', color: '#3498DB' },
    duty_free: { emoji: '🛒', label: 'Duty Free', color: '#1ABC9C' },
    news_gifts: { emoji: '📰', label: 'News & Gifts', color: '#95A5A6' },
    pharmacy: { emoji: '💊', label: 'Pharmacy', color: '#27AE60' },
    currency_exchange: { emoji: '💱', label: 'Currency Exchange', color: '#2ECC71' },
    information: { emoji: 'ℹ️', label: 'Information', color: '#2980B9' },
    wifi_charging: { emoji: '🔌', label: 'WiFi & Charging', color: '#8E44AD' },
    spa_wellness: { emoji: '💆', label: 'Spa & Wellness', color: '#E91E63' },
};

// ─── POI Data by Airport ────────────────────────────────────────

const LAX_POIS: AirportPOI[] = [
    { id: 'lax-1', airportCode: 'LAX', name: 'Starbucks', category: 'coffee', terminal: 'Terminal 1', hours: '4:30 AM – 9:00 PM', phone: '+1 (310) 665-5510', website: 'https://starbucks.com', description: 'Handcrafted drinks and fresh food. Mobile order available.', rating: 4.1, priceLevel: 2, latitude: 33.9428, longitude: -118.4054 },
    { id: 'lax-2', airportCode: 'LAX', name: 'The Coffee Bean & Tea Leaf', category: 'coffee', terminal: 'Terminal 4', hours: '5:00 AM – 8:30 PM', phone: '+1 (310) 215-5100', website: 'https://coffeebean.com', description: 'Premium coffee and tea beverages.', rating: 4.0, priceLevel: 2, latitude: 33.9433, longitude: -118.4070 },
    { id: 'lax-3', airportCode: 'LAX', name: 'McDonald\'s', category: 'fast_food', terminal: 'Terminal 3', hours: '5:00 AM – 10:00 PM', phone: '+1 (310) 641-1600', website: 'https://mcdonalds.com', description: 'Classic burgers, fries, and breakfast favorites.', rating: 3.8, priceLevel: 1, latitude: 33.9425, longitude: -118.4062 },
    { id: 'lax-4', airportCode: 'LAX', name: 'Shake Shack', category: 'fast_food', terminal: 'Terminal 3', hours: '6:00 AM – 9:00 PM', website: 'https://shakeshack.com', description: 'Burgers, hot dogs, frozen custard, shakes, beer, and wine.', rating: 4.3, priceLevel: 2, latitude: 33.9427, longitude: -118.4065 },
    { id: 'lax-5', airportCode: 'LAX', name: 'Lemonade', category: 'restaurant', terminal: 'Terminal 6', hours: '6:00 AM – 8:00 PM', website: 'https://lemonade.com', description: 'Seasonal California comfort food.', rating: 4.2, priceLevel: 2, latitude: 33.9435, longitude: -118.4080 },
    { id: 'lax-6', airportCode: 'LAX', name: 'Rock & Brews', category: 'bar', terminal: 'Terminal 1', hours: '6:00 AM – 10:00 PM', phone: '+1 (424) 335-4255', website: 'https://rockandbrews.com', description: 'Rock-themed craft beer bar and grill.', rating: 4.0, priceLevel: 2, latitude: 33.9430, longitude: -118.4056 },
    { id: 'lax-7', airportCode: 'LAX', name: 'Star Alliance Lounge', category: 'lounge', terminal: 'TBIT', hours: '6:00 AM – 12:00 AM', website: 'https://staralliance.com', description: 'Premium lounge for Star Alliance business and first class passengers.', rating: 4.5, priceLevel: 3, latitude: 33.9440, longitude: -118.4085 },
    { id: 'lax-8', airportCode: 'LAX', name: 'DFS Duty Free', category: 'duty_free', terminal: 'TBIT', hours: '6:00 AM – 11:00 PM', website: 'https://dfs.com', description: 'Tax-free luxury goods: fragrances, cosmetics, spirits, and more.', rating: 4.1, priceLevel: 3, latitude: 33.9438, longitude: -118.4088 },
    { id: 'lax-9', airportCode: 'LAX', name: 'Hudson News', category: 'news_gifts', terminal: 'Terminal 2', hours: '5:00 AM – 10:00 PM', phone: '+1 (310) 646-2342', description: 'Books, magazines, snacks, beverages, and travel essentials.', rating: 3.9, priceLevel: 1, latitude: 33.9426, longitude: -118.4058 },
    { id: 'lax-10', airportCode: 'LAX', name: 'XpresSpa', category: 'spa_wellness', terminal: 'Terminal 5', hours: '7:00 AM – 7:00 PM', phone: '+1 (310) 337-0067', website: 'https://xpresspa.com', description: 'Quick massages, manicures, and wellness services between flights.', rating: 4.2, priceLevel: 2, latitude: 33.9432, longitude: -118.4074 },
    { id: 'lax-11', airportCode: 'LAX', name: 'Travelex', category: 'currency_exchange', terminal: 'TBIT', hours: '6:00 AM – 10:00 PM', phone: '+1 (310) 417-0056', website: 'https://travelex.com', description: 'Currency exchange services for international travelers.', rating: 3.5, priceLevel: 2, latitude: 33.9439, longitude: -118.4087 },
    { id: 'lax-12', airportCode: 'LAX', name: 'Be Relax Spa', category: 'spa_wellness', terminal: 'Terminal 7', hours: '6:00 AM – 9:00 PM', website: 'https://berelax.com', description: 'Massage chairs, facials, and relaxation services.', rating: 4.0, priceLevel: 2, latitude: 33.9437, longitude: -118.4082 },
];

const JFK_POIS: AirportPOI[] = [
    { id: 'jfk-1', airportCode: 'JFK', name: 'Starbucks', category: 'coffee', terminal: 'Terminal 4', hours: '4:00 AM – 9:00 PM', phone: '+1 (718) 751-2606', website: 'https://starbucks.com', description: 'Handcrafted coffee and espresso beverages. Mobile order available.', rating: 4.0, priceLevel: 2, latitude: 40.6425, longitude: -73.7789 },
    { id: 'jfk-2', airportCode: 'JFK', name: 'Dunkin\'', category: 'coffee', terminal: 'Terminal 5', hours: '4:30 AM – 8:00 PM', phone: '+1 (718) 656-0055', website: 'https://dunkindonuts.com', description: 'Coffee, donuts, and breakfast sandwiches.', rating: 3.9, priceLevel: 1, latitude: 40.6452, longitude: -73.7762 },
    { id: 'jfk-3', airportCode: 'JFK', name: 'Shake Shack', category: 'fast_food', terminal: 'Terminal 4', hours: '5:00 AM – 10:00 PM', website: 'https://shakeshack.com', description: 'Burgers, fries, shakes, and frozen custard.', rating: 4.4, priceLevel: 2, latitude: 40.6428, longitude: -73.7785 },
    { id: 'jfk-4', airportCode: 'JFK', name: 'Blue Ribbon Sushi Bar', category: 'restaurant', terminal: 'Terminal 5', hours: '11:00 AM – 9:00 PM', website: 'https://blueribbonrestaurants.com', description: 'Fresh sushi and Japanese cuisine by award-winning chefs.', rating: 4.3, priceLevel: 3, latitude: 40.6450, longitude: -73.7758 },
    { id: 'jfk-5', airportCode: 'JFK', name: 'Deep Blue Sushi', category: 'restaurant', terminal: 'Terminal 1', hours: '6:00 AM – 9:00 PM', description: 'Japanese-inspired sushi and Asian fusion.', rating: 4.1, priceLevel: 2, latitude: 40.6437, longitude: -73.7838 },
    { id: 'jfk-6', airportCode: 'JFK', name: 'TWA Hotel & Bar', category: 'bar', terminal: 'TWA Hotel', hours: '11:00 AM – 1:00 AM', phone: '+1 (212) 806-9000', website: 'https://twahotel.com', description: 'Retro-chic bar in the iconic TWA Flight Center.', rating: 4.5, priceLevel: 3, latitude: 40.6443, longitude: -73.7820 },
    { id: 'jfk-7', airportCode: 'JFK', name: 'Centurion Lounge', category: 'lounge', terminal: 'Terminal 4', hours: '6:00 AM – 10:00 PM', website: 'https://americanexpress.com', description: 'Amex Centurion Lounge with complimentary food, drinks, spa, and showers.', rating: 4.6, priceLevel: 3, latitude: 40.6430, longitude: -73.7790 },
    { id: 'jfk-8', airportCode: 'JFK', name: 'DFS Duty Free', category: 'duty_free', terminal: 'Terminal 1', hours: '6:00 AM – 10:00 PM', website: 'https://dfs.com', description: 'Luxury duty-free shopping: perfume, cosmetics, alcohol, chocolate.', rating: 4.0, priceLevel: 3, latitude: 40.6435, longitude: -73.7835 },
    { id: 'jfk-9', airportCode: 'JFK', name: 'Hudson News & Books', category: 'news_gifts', terminal: 'Terminal 4', hours: '5:00 AM – 10:00 PM', description: 'Bestselling books, magazines, snacks, and travel accessories.', rating: 3.8, priceLevel: 1, latitude: 40.6427, longitude: -73.7787 },
    { id: 'jfk-10', airportCode: 'JFK', name: 'XpresSpa', category: 'spa_wellness', terminal: 'Terminal 4', hours: '7:00 AM – 7:00 PM', phone: '+1 (718) 751-2629', website: 'https://xpresspa.com', description: 'Massage, nails, waxing, and wellness services.', rating: 4.3, priceLevel: 2, latitude: 40.6426, longitude: -73.7786 },
    { id: 'jfk-11', airportCode: 'JFK', name: 'Travelex', category: 'currency_exchange', terminal: 'Terminal 1', hours: '6:00 AM – 10:00 PM', phone: '+1 (718) 553-6281', website: 'https://travelex.com', description: 'Foreign currency exchange and prepaid travel cards.', rating: 3.4, priceLevel: 2, latitude: 40.6436, longitude: -73.7837 },
];

const ATL_POIS: AirportPOI[] = [
    { id: 'atl-1', airportCode: 'ATL', name: 'Starbucks', category: 'coffee', terminal: 'Concourse B', hours: '5:00 AM – 8:30 PM', website: 'https://starbucks.com', description: 'Handcrafted beverages and snacks.', rating: 4.0, priceLevel: 2, latitude: 33.6380, longitude: -84.4283 },
    { id: 'atl-2', airportCode: 'ATL', name: 'Chick-fil-A', category: 'fast_food', terminal: 'Concourse A', hours: '5:00 AM – 9:00 PM', website: 'https://chick-fil-a.com', description: 'Chicken sandwiches, nuggets, and waffle fries. Closed Sundays.', rating: 4.5, priceLevel: 1, latitude: 33.6375, longitude: -84.4280 },
    { id: 'atl-3', airportCode: 'ATL', name: 'One Flew South', category: 'restaurant', terminal: 'Concourse E', hours: '11:00 AM – 9:00 PM', phone: '+1 (404) 209-2009', website: 'https://oneflewsouth.com', description: 'Upscale Southern-Asian fusion cuisine. Award-winning airport restaurant.', rating: 4.5, priceLevel: 3, latitude: 33.6395, longitude: -84.4310 },
    { id: 'atl-4', airportCode: 'ATL', name: 'Grindhouse Killer Burgers', category: 'fast_food', terminal: 'Concourse B', hours: '6:00 AM – 9:00 PM', website: 'https://grindhouseburgers.com', description: 'Locally famous smashed burgers and loaded fries.', rating: 4.3, priceLevel: 2, latitude: 33.6382, longitude: -84.4285 },
    { id: 'atl-5', airportCode: 'ATL', name: 'The Club at ATL', category: 'lounge', terminal: 'Concourse F', hours: '5:30 AM – 10:00 PM', website: 'https://theclubairportlounges.com', description: 'Day-use lounge with food, drinks, WiFi, and showers.', rating: 4.0, priceLevel: 3, latitude: 33.6400, longitude: -84.4320 },
    { id: 'atl-6', airportCode: 'ATL', name: 'Hudson News', category: 'news_gifts', terminal: 'Domestic Terminal', hours: '5:00 AM – 10:00 PM', description: 'Books, magazines, snacks, and travel essentials.', rating: 3.8, priceLevel: 1, latitude: 33.6370, longitude: -84.4275 },
];

const ORD_POIS: AirportPOI[] = [
    { id: 'ord-1', airportCode: 'ORD', name: 'Starbucks', category: 'coffee', terminal: 'Terminal 1', hours: '4:30 AM – 8:30 PM', website: 'https://starbucks.com', description: 'Coffee, espresso, and frappuccinos.', rating: 4.0, priceLevel: 2, latitude: 41.9786, longitude: -87.9048 },
    { id: 'ord-2', airportCode: 'ORD', name: 'Tortas Frontera', category: 'restaurant', terminal: 'Terminal 1', hours: '5:30 AM – 8:30 PM', website: 'https://rickbayless.com', description: 'Rick Bayless Mexican fare — tortas, guac, and flights of tequila.', rating: 4.6, priceLevel: 2, latitude: 41.9790, longitude: -87.9050 },
    { id: 'ord-3', airportCode: 'ORD', name: 'Garrett Popcorn Shops', category: 'shop', terminal: 'Terminal 3', hours: '6:00 AM – 9:00 PM', phone: '+1 (773) 462-1127', website: 'https://garrettpopcorn.com', description: 'Chicago\'s famous caramel and cheese popcorn mix.', rating: 4.5, priceLevel: 2, latitude: 41.9778, longitude: -87.9060 },
    { id: 'ord-4', airportCode: 'ORD', name: 'Goose Island Pub', category: 'bar', terminal: 'Terminal 2', hours: '6:00 AM – 9:30 PM', website: 'https://gooseisland.com', description: 'Chicago-brewed craft beers on tap with pub fare.', rating: 4.2, priceLevel: 2, latitude: 41.9782, longitude: -87.9055 },
    { id: 'ord-5', airportCode: 'ORD', name: 'United Polaris Lounge', category: 'lounge', terminal: 'Terminal 1', hours: '5:30 AM – 11:00 PM', website: 'https://united.com', description: 'Premium United lounge with full dining, bar, showers, and sleep pods.', rating: 4.7, priceLevel: 3, latitude: 41.9792, longitude: -87.9052 },
    { id: 'ord-6', airportCode: 'ORD', name: 'Hudson Chicago', category: 'news_gifts', terminal: 'Terminal 3', hours: '5:00 AM – 10:00 PM', description: 'Travel essentials, snacks, Chicago souvenirs.', rating: 3.7, priceLevel: 1, latitude: 41.9776, longitude: -87.9062 },
];

const MEX_POIS: AirportPOI[] = [
    { id: 'mex-1', airportCode: 'MEX', name: 'Starbucks', category: 'coffee', terminal: 'Terminal 1', hours: '5:00 AM – 10:00 PM', website: 'https://starbucks.com.mx', description: 'Tu café favorito antes de tu vuelo.', rating: 4.0, priceLevel: 2, latitude: 19.4363, longitude: -99.0721 },
    { id: 'mex-2', airportCode: 'MEX', name: 'Grab & Fly', category: 'fast_food', terminal: 'Terminal 2', hours: '5:30 AM – 9:30 PM', description: 'Quick bites and Mexican snacks for the road.', rating: 3.8, priceLevel: 1, latitude: 19.4374, longitude: -99.0732 },
    { id: 'mex-3', airportCode: 'MEX', name: 'Toks', category: 'restaurant', terminal: 'Terminal 1', hours: '6:00 AM – 10:00 PM', phone: '+52 55 5133 0505', description: 'Mexican restaurant chain with breakfast, lunch and dinner.', rating: 4.1, priceLevel: 2, latitude: 19.4360, longitude: -99.0718 },
    { id: 'mex-4', airportCode: 'MEX', name: 'Salon Premier', category: 'lounge', terminal: 'Terminal 2', hours: '24 Hours', phone: '+52 55 5786 7960', website: 'https://salonpremier.com.mx', description: 'VIP lounge with food, drinks, WiFi, showers, and resting areas.', rating: 4.3, priceLevel: 3, latitude: 19.4370, longitude: -99.0735 },
    { id: 'mex-5', airportCode: 'MEX', name: 'Duty Free México', category: 'duty_free', terminal: 'Terminal 1', hours: '6:00 AM – 10:00 PM', description: 'Tax-free shopping: tequila, mezcal, handicrafts, and cosmetics.', rating: 4.0, priceLevel: 2, latitude: 19.4362, longitude: -99.0720 },
    { id: 'mex-6', airportCode: 'MEX', name: 'Casa de Cambio Global', category: 'currency_exchange', terminal: 'Terminal 2', hours: '6:00 AM – 9:00 PM', phone: '+52 55 5571 4015', description: 'Foreign currency exchange and money transfer services.', rating: 3.5, priceLevel: 2, latitude: 19.4372, longitude: -99.0730 },
];

const CUN_POIS: AirportPOI[] = [
    { id: 'cun-1', airportCode: 'CUN', name: 'Starbucks', category: 'coffee', terminal: 'Terminal 3', hours: '5:00 AM – 10:00 PM', website: 'https://starbucks.com.mx', description: 'Coffee and frappuccinos at Cancún International.', rating: 4.0, priceLevel: 2, latitude: 21.0365, longitude: -86.8770 },
    { id: 'cun-2', airportCode: 'CUN', name: 'Margaritaville', category: 'bar', terminal: 'Terminal 3', hours: '8:00 AM – 10:00 PM', website: 'https://margaritaville.com', description: 'Tropical drinks, margaritas, and American-Mexican fusion food.', rating: 4.2, priceLevel: 2, latitude: 21.0368, longitude: -86.8772 },
    { id: 'cun-3', airportCode: 'CUN', name: 'Duty Free Cancún', category: 'duty_free', terminal: 'Terminal 3', hours: '5:00 AM – 11:00 PM', description: 'Tequila, silver jewelry, vanilla, and luxury goods at duty-free prices.', rating: 4.1, priceLevel: 2, latitude: 21.0363, longitude: -86.8768 },
    { id: 'cun-4', airportCode: 'CUN', name: 'VIP Lounge Cancún', category: 'lounge', terminal: 'Terminal 2', hours: '24 Hours', description: 'All-inclusive lounge with Mexican food, open bar, WiFi, and showers.', rating: 4.4, priceLevel: 3, latitude: 21.0380, longitude: -86.8745 },
];

const SFO_POIS: AirportPOI[] = [
    { id: 'sfo-1', airportCode: 'SFO', name: 'Peet\'s Coffee', category: 'coffee', terminal: 'Terminal 1', hours: '4:30 AM – 8:00 PM', website: 'https://peets.com', description: 'Bay Area craft coffee and specialty tea.', rating: 4.2, priceLevel: 2, latitude: 37.6150, longitude: -122.3890 },
    { id: 'sfo-2', airportCode: 'SFO', name: 'Cat Cora\'s Kitchen', category: 'restaurant', terminal: 'Terminal 2', hours: '7:00 AM – 9:00 PM', website: 'https://catcora.com', description: 'Iron Chef Cat Cora\'s Mediterranean restaurant.', rating: 4.3, priceLevel: 3, latitude: 37.6148, longitude: -122.3895 },
    { id: 'sfo-3', airportCode: 'SFO', name: 'Napa Farms Market', category: 'shop', terminal: 'Terminal 2', hours: '6:00 AM – 9:00 PM', description: 'Artisan foods, local wines, gourmet cheeses from Napa Valley.', rating: 4.5, priceLevel: 2, latitude: 37.6147, longitude: -122.3893 },
    { id: 'sfo-4', airportCode: 'SFO', name: 'United Polaris Lounge', category: 'lounge', terminal: 'International Terminal', hours: '6:00 AM – 11:30 PM', website: 'https://united.com', description: 'Premium lounge with à la carte dining, bar, showers, and sleep pods.', rating: 4.7, priceLevel: 3, latitude: 37.6160, longitude: -122.3920 },
    { id: 'sfo-5', airportCode: 'SFO', name: 'Anchor Brewing', category: 'bar', terminal: 'Terminal 2', hours: '7:00 AM – 9:00 PM', website: 'https://anchorbrewing.com', description: 'San Francisco\'s historic craft brewery — fresh on tap.', rating: 4.4, priceLevel: 2, latitude: 37.6149, longitude: -122.3892 },
];

const MIA_POIS: AirportPOI[] = [
    { id: 'mia-1', airportCode: 'MIA', name: 'Starbucks', category: 'coffee', terminal: 'Concourse D', hours: '5:00 AM – 8:30 PM', website: 'https://starbucks.com', description: 'Your favorite coffee to start the journey.', rating: 4.0, priceLevel: 2, latitude: 25.7961, longitude: -80.2780 },
    { id: 'mia-2', airportCode: 'MIA', name: 'Versailles Cuban Cuisine', category: 'restaurant', terminal: 'Concourse D', hours: '6:00 AM – 10:00 PM', website: 'https://versaillesrestaurant.com', description: 'Iconic Miami Cuban restaurant — ropa vieja, Cuban sandwiches, and cafecito.', rating: 4.4, priceLevel: 2, latitude: 25.7963, longitude: -80.2782 },
    { id: 'mia-3', airportCode: 'MIA', name: 'Corona Beach House', category: 'bar', terminal: 'Concourse D', hours: '7:00 AM – 10:00 PM', description: 'Beach-themed bar with craft cocktails and Mexican bites.', rating: 4.1, priceLevel: 2, latitude: 25.7965, longitude: -80.2785 },
    { id: 'mia-4', airportCode: 'MIA', name: 'Centurion Lounge', category: 'lounge', terminal: 'Concourse D', hours: '6:00 AM – 9:00 PM', website: 'https://americanexpress.com', description: 'American Express premium lounge with local cuisine by Michelle Bernstein.', rating: 4.6, priceLevel: 3, latitude: 25.7960, longitude: -80.2778 },
    { id: 'mia-5', airportCode: 'MIA', name: 'DFS Duty Free', category: 'duty_free', terminal: 'Concourse J', hours: '5:30 AM – 10:00 PM', description: 'International duty-free shopping in the South Terminal.', rating: 4.0, priceLevel: 3, latitude: 25.7950, longitude: -80.2795 },
];

const DFW_POIS: AirportPOI[] = [
    { id: 'dfw-1', airportCode: 'DFW', name: 'Starbucks', category: 'coffee', terminal: 'Terminal A', hours: '4:30 AM – 9:00 PM', website: 'https://starbucks.com', description: 'Handcrafted beverages and snacks.', rating: 4.0, priceLevel: 2, latitude: 32.8990, longitude: -97.0400 },
    { id: 'dfw-2', airportCode: 'DFW', name: 'Whataburger', category: 'fast_food', terminal: 'Terminal B', hours: '5:00 AM – 10:00 PM', website: 'https://whataburger.com', description: 'Texas-famous burgers and breakfast taquitos.', rating: 4.3, priceLevel: 1, latitude: 32.8985, longitude: -97.0395 },
    { id: 'dfw-3', airportCode: 'DFW', name: 'Pappadeaux Seafood', category: 'restaurant', terminal: 'Terminal A', hours: '10:00 AM – 9:00 PM', website: 'https://pappadeaux.com', description: 'Cajun-style seafood — gumbo, shrimp, and crawfish.', rating: 4.4, priceLevel: 3, latitude: 32.8992, longitude: -97.0402 },
    { id: 'dfw-4', airportCode: 'DFW', name: 'Centurion Lounge', category: 'lounge', terminal: 'Terminal D', hours: '5:30 AM – 10:00 PM', website: 'https://americanexpress.com', description: 'Premium Amex lounge with Texas BBQ, cocktails, and showers.', rating: 4.5, priceLevel: 3, latitude: 32.9005, longitude: -97.0410 },
    { id: 'dfw-5', airportCode: 'DFW', name: 'DFW Duty Free', category: 'duty_free', terminal: 'Terminal D', hours: '6:00 AM – 9:00 PM', description: 'Tax-free spirits, perfume, tobacco, and luxury goods.', rating: 3.9, priceLevel: 2, latitude: 32.9003, longitude: -97.0412 },
];

const DEN_POIS: AirportPOI[] = [
    { id: 'den-1', airportCode: 'DEN', name: 'Starbucks', category: 'coffee', terminal: 'Concourse B', hours: '4:30 AM – 8:30 PM', website: 'https://starbucks.com', description: 'Coffee, espresso, and handcrafted beverages.', rating: 4.0, priceLevel: 2, latitude: 39.8560, longitude: -104.6740 },
    { id: 'den-2', airportCode: 'DEN', name: 'Root Down DIA', category: 'restaurant', terminal: 'Concourse C', hours: '7:00 AM – 9:00 PM', website: 'https://rootdowndia.com', description: 'Locally sourced, globally inspired cuisine by chef Justin Cucci.', rating: 4.5, priceLevel: 3, latitude: 39.8565, longitude: -104.6750 },
    { id: 'den-3', airportCode: 'DEN', name: 'New Belgium Hub', category: 'bar', terminal: 'Concourse B', hours: '7:00 AM – 9:00 PM', website: 'https://newbelgium.com', description: 'Colorado craft beers including Fat Tire on tap.', rating: 4.3, priceLevel: 2, latitude: 39.8562, longitude: -104.6742 },
    { id: 'den-4', airportCode: 'DEN', name: 'United Club', category: 'lounge', terminal: 'Concourse B', hours: '5:00 AM – 10:00 PM', website: 'https://united.com', description: 'United Airlines members lounge with snacks, drinks, and WiFi.', rating: 4.2, priceLevel: 3, latitude: 39.8558, longitude: -104.6738 },
];

// ─── Master Index ─────────────────────────────────────────────

const ALL_POIS: AirportPOI[] = [
    ...LAX_POIS,
    ...JFK_POIS,
    ...ATL_POIS,
    ...ORD_POIS,
    ...MEX_POIS,
    ...CUN_POIS,
    ...SFO_POIS,
    ...MIA_POIS,
    ...DFW_POIS,
    ...DEN_POIS,
];

export function getAirportPOIs(airportCode: string): AirportPOI[] {
    return ALL_POIS.filter(p => p.airportCode === airportCode.toUpperCase());
}

export function getAirportPOIsByCategory(airportCode: string, category: POICategory): AirportPOI[] {
    return ALL_POIS.filter(p => p.airportCode === airportCode.toUpperCase() && p.category === category);
}

export function getAvailableCategories(airportCode: string): POICategory[] {
    const pois = getAirportPOIs(airportCode);
    const cats = new Set(pois.map(p => p.category));
    return Array.from(cats);
}
