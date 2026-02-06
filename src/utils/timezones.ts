// Time zone database for major US and Mexican cities
export const cityTimeZones: { [key: string]: string } = {
    // Major US Cities
    'New York': 'America/New_York',
    'Los Angeles': 'America/Los_Angeles',
    'Chicago': 'America/Chicago',
    'Houston': 'America/Chicago',
    'Phoenix': 'America/Phoenix',
    'Philadelphia': 'America/New_York',
    'San Antonio': 'America/Chicago',
    'San Diego': 'America/Los_Angeles',
    'Dallas': 'America/Chicago',
    'San Jose': 'America/Los_Angeles',
    'Austin': 'America/Chicago',
    'Jacksonville': 'America/New_York',
    'Fort Worth': 'America/Chicago',
    'Columbus': 'America/New_York',
    'San Francisco': 'America/Los_Angeles',
    'Charlotte': 'America/New_York',
    'Indianapolis': 'America/New_York',
    'Seattle': 'America/Los_Angeles',
    'Denver': 'America/Denver',
    'Boston': 'America/New_York',
    'El Paso': 'America/Denver',
    'Nashville': 'America/Chicago',
    'Detroit': 'America/New_York',
    'Portland': 'America/Los_Angeles',
    'Las Vegas': 'America/Los_Angeles',
    'Miami': 'America/New_York',
    'Orlando': 'America/New_York',
    'Atlanta': 'America/New_York',
    'Washington': 'America/New_York',
    'Salt Lake City': 'America/Denver',

    // Major Mexican Cities
    'Mexico City': 'America/Mexico_City',
    'Guadalajara': 'America/Mexico_City',
    'Monterrey': 'America/Monterrey',
    'Puebla': 'America/Mexico_City',
    'Tijuana': 'America/Tijuana',
    'León': 'America/Mexico_City',
    'Juárez': 'America/Ojinaga',
    'Zapopan': 'America/Mexico_City',
    'Mérida': 'America/Merida',
    'San Luis Potosí': 'America/Mexico_City',
    'Aguascalientes': 'America/Mexico_City',
    'Hermosillo': 'America/Hermosillo',
    'Saltillo': 'America/Monterrey',
    'Mexicali': 'America/Tijuana',
    'Culiacán': 'America/Mazatlan',
    'Querétaro': 'America/Mexico_City',
    'Chihuahua': 'America/Chihuahua',
    'Morelia': 'America/Mexico_City',
    'Cancún': 'America/Cancun',
    'Veracruz': 'America/Mexico_City',
    'Acapulco': 'America/Mexico_City',
    'Toluca': 'America/Mexico_City',
    'Mazatlán': 'America/Mazatlan',
    'Oaxaca': 'America/Mexico_City',
    'Puerto Vallarta': 'America/Mexico_City',
    'Playa del Carmen': 'America/Cancun',
    'Cabo San Lucas': 'America/Mazatlan',
    'Tulum': 'America/Cancun',
    'Guanajuato': 'America/Mexico_City',
    'Cozumel': 'America/Cancun',
};

/**
 * Get time zone for a city
 */
export function getCityTimeZone(city: string): string {
    // Try exact match first
    if (cityTimeZones[city]) {
        return cityTimeZones[city];
    }

    // Try case-insensitive match
    const lowerCity = city.toLowerCase();
    for (const [key, value] of Object.entries(cityTimeZones)) {
        if (key.toLowerCase() === lowerCity) {
            return value;
        }
    }

    // Default fallback
    return 'America/Mexico_City';
}

/**
 * Calculate time difference between two time zones in hours
 */
export function getTimeDifference(fromTz: string, toTz: string, date: Date = new Date()): number {
    const fromOffset = new Date(date.toLocaleString('en-US', { timeZone: fromTz }));
    const toOffset = new Date(date.toLocaleString('en-US', { timeZone: toTz }));

    const diffMs = toOffset.getTime() - fromOffset.getTime();
    return Math.round(diffMs / (1000 * 60 * 60));
}

/**
 * Format time difference for display
 */
export function formatTimeDifference(hours: number): string {
    if (hours === 0) return 'Same time zone';
    const sign = hours > 0 ? '+' : '';
    return `${sign}${hours}h`;
}

/**
 * Convert date/time string to specific timezone
 */
export function convertToTimeZone(dateStr: string, timeStr: string, timezone: string): Date {
    const dateTime = new Date(`${dateStr}T${timeStr}`);
    return new Date(dateTime.toLocaleString('en-US', { timeZone: timezone }));
}

/**
 * Format time with timezone display
 */
export function formatTimeWithZone(dateStr: string, timeStr: string, timezone: string): string {
    try {
        const date = new Date(`${dateStr}T${timeStr}`);
        return date.toLocaleString('en-US', {
            timeZone: timezone,
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    } catch (error) {
        return timeStr;
    }
}

/**
 * Calculate trip duration in days
 */
export function calculateDurationDays(departureDate: string, arrivalDate: string): number {
    const start = new Date(departureDate);
    const end = new Date(arrivalDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

/**
 * Calculate total travel time including connections
 */
export function calculateTotalTravelTime(
    departureDate: string,
    departureTime: string,
    arrivalDate: string,
    arrivalTime: string
): number {
    const start = new Date(`${departureDate}T${departureTime}`);
    const end = new Date(`${arrivalDate}T${arrivalTime}`);
    const diffMs = end.getTime() - start.getTime();
    return Math.round(diffMs / (1000 * 60)); // Return in minutes
}

/**
 * Format duration in minutes to readable format
 */
export function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) {
        return `${mins}m`;
    } else if (mins === 0) {
        return `${hours}h`;
    } else {
        return `${hours}h ${mins}m`;
    }
}
