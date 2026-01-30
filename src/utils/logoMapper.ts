/**
 * Airline and bus company emoji and color mappings
 * Safe for App Store - no trademark issues with emojis!
 */

// Airline emoji mapping
const AIRLINE_EMOJI_MAP: Record<string, string> = {
    // USA AIRLINES
    'delta': '🔺',
    'delta airlines': '🔺',
    'delta air lines': '🔺',

    'united': '🌐',
    'united airlines': '🌐',

    'american': '🦅',
    'american airlines': '🦅',
    'aa': '🦅',

    'southwest': '❤️',
    'southwest airlines': '❤️',

    'jetblue': '💙',
    'jet blue': '💙',
    'jetblue airways': '💙',

    'alaska': '🏔️',
    'alaska airlines': '🏔️',

    'spirit': '💛',
    'spirit airlines': '💛',

    'frontier': '🦌',
    'frontier airlines': '🦌',

    'hawaiian': '🌺',
    'hawaiian airlines': '🌺',

    'allegiant': '☀️',
    'allegiant air': '☀️',

    'sun country': '🌞',
    'breeze': '🌊',
    'avelo': '🎯',

    // MEXICO AIRLINES
    'aeromexico': '🇲🇽',
    'aeroméxico': '🇲🇽',

    'volaris': '💜',

    'viva aerobus': '🟢',
    'vivaaerobus': '🟢',
    'viva': '🟢',

    'tar': '⭐',
    'magnicharters': '🔶',
    'mexicana': '🇲🇽',

    // INTERNATIONAL
    'air canada': '🍁',
    'british airways': '🇬🇧',
    'lufthansa': '🇩🇪',
    'air france': '🇫🇷',
    'klm': '🇳🇱',
    'emirates': '🇦🇪',
    'qatar': '🇶🇦',
};

// Bus company emoji mapping
const BUS_EMOJI_MAP: Record<string, string> = {
    'greyhound': '🐕',
    'megabus': '🔵',
    'flixbus': '💚',
    'tornado': '🌪️',
    'ado': '🔴',
    'etn': '⭐',
    'primera plus': '🔷',
    'futura': '🚀',
    'boltbus': '⚡',
};

/**
 * Get airline emoji
 */
export const getAirlineEmoji = (airlineName: string): string => {
    if (!airlineName) return '✈️';
    const normalized = airlineName.toLowerCase().trim();
    return AIRLINE_EMOJI_MAP[normalized] || '✈️';
};

/**
 * Get bus company emoji
 */
export const getBusEmoji = (companyName: string): string => {
    if (!companyName) return '🚌';
    const normalized = companyName.toLowerCase().trim();
    return BUS_EMOJI_MAP[normalized] || '🚌';
};

/**
 * Get airline-specific gradient colors
 */
export const getAirlineColors = (airlineName: string): string[] => {
    const name = airlineName?.toLowerCase() || '';

    if (name.includes('delta')) return ['#C8102E', '#E31837', '#FF4458'];
    if (name.includes('united')) return ['#001E62', '#002244', '#003D82'];
    if (name.includes('american')) return ['#0078D2', '#1890D5', '#3AA7E8'];
    if (name.includes('southwest')) return ['#304CB2', '#3D5DC7', '#4A6FDB'];
    if (name.includes('jetblue')) return ['#002F5F', '#003F7F', '#005498'];
    if (name.includes('alaska')) return ['#006272', '#007287', '#00829B'];
    if (name.includes('spirit')) return ['#FFD100', '#FFDB33', '#FFE566'];
    if (name.includes('aeromexico')) return ['#C8102E', '#E31837', '#FF4458'];
    if (name.includes('volaris')) return ['#4A0E4E', '#6B1E6F', '#8B2E8F'];
    if (name.includes('viva')) return ['#00A550', '#00B85C', '#00CB68'];

    return ['#1e3c72', '#2a5298', '#3b6cb7'];
};

/**
 * Get bus company gradient colors
 */
export const getBusColors = (companyName: string): string[] => {
    const name = companyName?.toLowerCase() || '';

    if (name.includes('greyhound')) return ['#003C71', '#004D8F', '#005EAD'];
    if (name.includes('flixbus')) return ['#73D700', '#86E214', '#99ED28'];
    if (name.includes('megabus')) return ['#0066CC', '#1A7ADB', '#338EEA'];
    if (name.includes('ado')) return ['#C8102E', '#E31837', '#FF4458'];

    return ['#059669', '#10B981', '#34D399'];
};
