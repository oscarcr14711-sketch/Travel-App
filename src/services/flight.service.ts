/**
 * Flight Data Service
 * Uses AeroDataBox API via RapidAPI for real-time flight information
 */

const RAPIDAPI_KEY = '1ac2ba1aecmsh4f72a9a407cf71dp176733jsne9ac0ba3ad9c';
const RAPIDAPI_HOST = 'aerodatabox.p.rapidapi.com';

export interface FlightData {
    flightNumber: string;
    airline: string;
    status: 'Scheduled' | 'On Time' | 'Delayed' | 'Cancelled' | 'Landed' | 'In Flight' | 'Unknown';
    departure: {
        airport: string;
        airportCode: string;
        terminal?: string;
        gate?: string;
        scheduledTime: string;
        actualTime?: string;
    };
    arrival: {
        airport: string;
        airportCode: string;
        terminal?: string;
        gate?: string;
        scheduledTime: string;
        actualTime?: string;
    };
    aircraft?: {
        model: string;
        registration?: string;
        image?: string;
    };
}

export interface AircraftAmenities {
    model: string;
    manufacturer: string;
    registration?: string;
    seatConfiguration: string;
    totalSeats?: number;
    entertainment: {
        available: boolean;
        type: string;
        description: string;
    };
    food: {
        available: boolean;
        type: string;
        description: string;
    };
    power: {
        available: boolean;
        type: string;
    };
    wifi: {
        available: boolean;
        type: string;
    };
    seatFeatures: {
        legroom: string;
        recline: boolean;
        width: string;
    };
    images: string[]; // Placeholder for manual addition
}

// Cache to avoid repeated API calls
const flightCache: Record<string, { data: FlightData; timestamp: number }> = {};
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * Get flight data from AeroDataBox API
 */
export async function getFlightData(flightNumber: string, date: string): Promise<FlightData | null> {
    try {
        // Normalize flight number (remove spaces, uppercase)
        const normalizedFlight = flightNumber.replace(/\s+/g, '').toUpperCase();
        const cacheKey = `${normalizedFlight}_${date}`;

        // Check cache first
        if (flightCache[cacheKey] && Date.now() - flightCache[cacheKey].timestamp < CACHE_DURATION) {
            console.log('Returning cached flight data');
            return flightCache[cacheKey].data;
        }

        // Format date as YYYY-MM-DD if not already
        const formattedDate = formatDateForAPI(date);

        console.log(`Fetching flight data for ${normalizedFlight} on ${formattedDate}`);

        const response = await fetch(
            `https://aerodatabox.p.rapidapi.com/flights/number/${normalizedFlight}/${formattedDate}`,
            {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': RAPIDAPI_KEY,
                    'X-RapidAPI-Host': RAPIDAPI_HOST,
                },
            }
        );

        if (!response.ok) {
            console.log(`API returned status ${response.status}`);
            if (response.status === 404) {
                console.log('Flight not found');
                return null;
            }
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', JSON.stringify(data, null, 2));

        // Parse the response into our FlightData format
        const flightData = parseFlightResponse(data, normalizedFlight);

        if (flightData) {
            // Cache the result
            flightCache[cacheKey] = { data: flightData, timestamp: Date.now() };
        }

        return flightData;
    } catch (error) {
        console.error('Error fetching flight data:', error);
        return null;
    }
}

/**
 * Parse AeroDataBox API response into our FlightData format
 */
function parseFlightResponse(data: any, flightNumber: string): FlightData | null {
    try {
        // API returns an array of flights
        const flights = Array.isArray(data) ? data : [data];

        if (flights.length === 0) {
            return null;
        }

        const flight = flights[0];

        return {
            flightNumber: flight.number || flightNumber,
            airline: flight.airline?.name || extractAirlineFromFlightNumber(flightNumber),
            status: parseFlightStatus(flight.status),
            departure: {
                airport: flight.departure?.airport?.name || 'Unknown',
                airportCode: flight.departure?.airport?.iata || flight.departure?.airport?.icao || 'XXX',
                terminal: flight.departure?.terminal,
                gate: flight.departure?.gate,
                scheduledTime: flight.departure?.scheduledTimeLocal || flight.departure?.scheduledTimeUtc || '',
                actualTime: flight.departure?.actualTimeLocal || flight.departure?.actualTimeUtc,
            },
            arrival: {
                airport: flight.arrival?.airport?.name || 'Unknown',
                airportCode: flight.arrival?.airport?.iata || flight.arrival?.airport?.icao || 'XXX',
                terminal: flight.arrival?.terminal,
                gate: flight.arrival?.gate,
                scheduledTime: flight.arrival?.scheduledTimeLocal || flight.arrival?.scheduledTimeUtc || '',
                actualTime: flight.arrival?.actualTimeLocal || flight.arrival?.actualTimeUtc,
            },
            aircraft: flight.aircraft ? {
                model: flight.aircraft.model || 'Unknown Aircraft',
                registration: flight.aircraft.reg,
                image: flight.aircraft.image?.url,
            } : undefined,
        };
    } catch (error) {
        console.error('Error parsing flight response:', error);
        return null;
    }
}

/**
 * Parse flight status from API response
 */
function parseFlightStatus(status: string | undefined): FlightData['status'] {
    if (!status) return 'Scheduled';

    const statusLower = status.toLowerCase();
    if (statusLower.includes('delay')) return 'Delayed';
    if (statusLower.includes('cancel')) return 'Cancelled';
    if (statusLower.includes('land')) return 'Landed';
    if (statusLower.includes('flight') || statusLower.includes('air')) return 'In Flight';
    if (statusLower.includes('time')) return 'On Time';
    if (statusLower.includes('schedul')) return 'Scheduled';
    return 'Unknown';
}

/**
 * Format date for API (YYYY-MM-DD)
 */
function formatDateForAPI(date: string): string {
    // If already in YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return date;
    }

    // Try to parse common formats
    const parsed = new Date(date);
    if (!isNaN(parsed.getTime())) {
        return parsed.toISOString().split('T')[0];
    }

    // Return as-is if we can't parse
    return date;
}

/**
 * Extract airline name from flight number
 */
function extractAirlineFromFlightNumber(flightNumber: string): string {
    const airlineCodeMap: Record<string, string> = {
        'B6': 'JetBlue Airways',
        'AA': 'American Airlines',
        'DL': 'Delta Air Lines',
        'UA': 'United Airlines',
        'WN': 'Southwest Airlines',
        'AS': 'Alaska Airlines',
        'NK': 'Spirit Airlines',
        'F9': 'Frontier Airlines',
        'AM': 'Aeromexico',
        'Y4': 'Volaris',
        'VB': 'VivaAerobus',
    };

    // Extract 2-letter code from flight number
    const match = flightNumber.match(/^([A-Z]{2}|\d[A-Z]|[A-Z]\d)/);
    if (match) {
        return airlineCodeMap[match[1]] || match[1];
    }
    return 'Unknown Airline';
}

/**
 * Get aircraft amenities based on aircraft model
 * This uses a local database since AeroDataBox doesn't provide detailed amenities
 */
export function getAircraftAmenities(aircraftModel: string, airline: string): AircraftAmenities {
    const model = aircraftModel.toLowerCase();

    // JetBlue specific configurations
    if (airline.toLowerCase().includes('jetblue')) {
        if (model.includes('a320') || model.includes('airbus 320')) {
            return {
                model: 'Airbus A320',
                manufacturer: 'Airbus',
                seatConfiguration: '3-3',
                totalSeats: 162,
                entertainment: {
                    available: true,
                    type: 'Seatback Screens',
                    description: 'Free DirecTV with 100+ channels, movies & games on every seatback screen',
                },
                food: {
                    available: true,
                    type: 'Complimentary Snacks',
                    description: 'Free unlimited snacks and soft drinks. Alcohol available for purchase.',
                },
                power: {
                    available: true,
                    type: 'USB & AC Power',
                },
                wifi: {
                    available: true,
                    type: 'Free Fly-Fi',
                },
                seatFeatures: {
                    legroom: '32-34 inches (Most Legroom in Coach)',
                    recline: true,
                    width: '17.8 inches',
                },
                images: [], // User will add manually
            };
        }
        if (model.includes('a321') || model.includes('airbus 321')) {
            return {
                model: 'Airbus A321',
                manufacturer: 'Airbus',
                seatConfiguration: '3-3',
                totalSeats: 200,
                entertainment: {
                    available: true,
                    type: 'Seatback Screens',
                    description: 'Free DirecTV with 100+ channels, movies & games on every seatback screen',
                },
                food: {
                    available: true,
                    type: 'Complimentary Snacks',
                    description: 'Free unlimited snacks and soft drinks. Mint class has full meal service.',
                },
                power: {
                    available: true,
                    type: 'USB & AC Power',
                },
                wifi: {
                    available: true,
                    type: 'Free Fly-Fi',
                },
                seatFeatures: {
                    legroom: '32-34 inches (Most Legroom in Coach)',
                    recline: true,
                    width: '17.8 inches',
                },
                images: [],
            };
        }
        if (model.includes('e190') || model.includes('embraer 190')) {
            return {
                model: 'Embraer E190',
                manufacturer: 'Embraer',
                seatConfiguration: '2-2',
                totalSeats: 100,
                entertainment: {
                    available: true,
                    type: 'Seatback Screens',
                    description: 'Free DirecTV with 100+ channels on every seatback screen',
                },
                food: {
                    available: true,
                    type: 'Complimentary Snacks',
                    description: 'Free unlimited snacks and soft drinks.',
                },
                power: {
                    available: true,
                    type: 'USB Power',
                },
                wifi: {
                    available: true,
                    type: 'Free Fly-Fi',
                },
                seatFeatures: {
                    legroom: '32 inches',
                    recline: true,
                    width: '18.25 inches',
                },
                images: [],
            };
        }
    }

    // Default/Generic aircraft data
    return getGenericAircraftAmenities(aircraftModel);
}

/**
 * Get generic aircraft amenities for unknown airlines/aircraft
 */
function getGenericAircraftAmenities(aircraftModel: string): AircraftAmenities {
    const model = aircraftModel.toLowerCase();

    // Airbus A320 family
    if (model.includes('a320') || model.includes('a319') || model.includes('a321')) {
        return {
            model: model.includes('a321') ? 'Airbus A321' : model.includes('a319') ? 'Airbus A319' : 'Airbus A320',
            manufacturer: 'Airbus',
            seatConfiguration: '3-3',
            totalSeats: model.includes('a321') ? 190 : model.includes('a319') ? 140 : 160,
            entertainment: {
                available: false,
                type: 'Personal Device',
                description: 'Stream to your personal device via airline app',
            },
            food: {
                available: true,
                type: 'For Purchase',
                description: 'Snacks and beverages available for purchase',
            },
            power: {
                available: false,
                type: 'None',
            },
            wifi: {
                available: false,
                type: 'None',
            },
            seatFeatures: {
                legroom: '30-32 inches',
                recline: true,
                width: '17.5 inches',
            },
            images: [],
        };
    }

    // Boeing 737 family
    if (model.includes('737') || model.includes('boeing 737')) {
        return {
            model: 'Boeing 737',
            manufacturer: 'Boeing',
            seatConfiguration: '3-3',
            totalSeats: 160,
            entertainment: {
                available: false,
                type: 'Personal Device',
                description: 'Stream to your personal device via airline app',
            },
            food: {
                available: true,
                type: 'For Purchase',
                description: 'Snacks and beverages available for purchase',
            },
            power: {
                available: false,
                type: 'None',
            },
            wifi: {
                available: false,
                type: 'Paid WiFi',
            },
            seatFeatures: {
                legroom: '30-31 inches',
                recline: true,
                width: '17.2 inches',
            },
            images: [],
        };
    }

    // Boeing 777/787 (widebody)
    if (model.includes('777') || model.includes('787') || model.includes('dreamliner')) {
        return {
            model: model.includes('787') ? 'Boeing 787 Dreamliner' : 'Boeing 777',
            manufacturer: 'Boeing',
            seatConfiguration: '3-3-3',
            totalSeats: 300,
            entertainment: {
                available: true,
                type: 'Seatback Screens',
                description: 'Personal seatback entertainment system with movies, TV, and games',
            },
            food: {
                available: true,
                type: 'Meal Service',
                description: 'Complimentary meals on long-haul flights',
            },
            power: {
                available: true,
                type: 'USB & AC Power',
            },
            wifi: {
                available: true,
                type: 'Paid WiFi',
            },
            seatFeatures: {
                legroom: '31-34 inches',
                recline: true,
                width: '17.5 inches',
            },
            images: [],
        };
    }

    // Default unknown aircraft
    return {
        model: aircraftModel || 'Unknown Aircraft',
        manufacturer: 'Unknown',
        seatConfiguration: 'Standard',
        entertainment: {
            available: false,
            type: 'Unknown',
            description: 'Entertainment options vary by flight',
        },
        food: {
            available: true,
            type: 'Varies',
            description: 'Food and beverage service varies by flight',
        },
        power: {
            available: false,
            type: 'Unknown',
        },
        wifi: {
            available: false,
            type: 'Unknown',
        },
        seatFeatures: {
            legroom: 'Standard',
            recline: true,
            width: 'Standard',
        },
        images: [],
    };
}

/**
 * Get flight status color for UI
 */
export function getFlightStatusColor(status: FlightData['status']): string {
    switch (status) {
        case 'On Time':
        case 'Landed':
            return '#4CAF50'; // Green
        case 'Delayed':
            return '#FF9800'; // Orange
        case 'Cancelled':
            return '#F44336'; // Red
        case 'In Flight':
            return '#2196F3'; // Blue
        case 'Scheduled':
        default:
            return '#9E9E9E'; // Gray
    }
}
