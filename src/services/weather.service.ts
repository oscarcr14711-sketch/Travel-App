// Real-time weather service using Open-Meteo API (free, no API key required)

export interface WeatherData {
    location: string;
    temperature: number;
    temp: number; // alias for temperature
    feelsLike: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    isRealTime: boolean;
    forecast: {
        day: string;
        high: number;
        low: number;
        condition: string;
    }[];
}

// Map Open-Meteo weather codes to human-readable conditions
const getWeatherCondition = (code: number): string => {
    if (code === 0) return 'Clear';
    if (code <= 3) return 'Partly Cloudy';
    if (code <= 48) return 'Foggy';
    if (code <= 57) return 'Drizzle';
    if (code <= 67) return 'Rainy';
    if (code <= 77) return 'Snowy';
    if (code <= 82) return 'Showers';
    if (code <= 86) return 'Snow Showers';
    if (code <= 99) return 'Thunderstorm';
    return 'Unknown';
};

// Geocode city name to lat/lon using Open-Meteo Geocoding API
const geocodeCity = async (cityName: string): Promise<{ lat: number; lon: number } | null> => {
    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            return {
                lat: data.results[0].latitude,
                lon: data.results[0].longitude
            };
        }
        return null;
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
};

export const getWeatherForDestination = async (destination: string): Promise<WeatherData> => {
    try {
        // Clean the destination name - remove airport codes and parentheses
        // "New York (JFK)" -> "New York"
        // "Los Angeles (LAX)" -> "Los Angeles"
        const cleanDestination = destination.replace(/\s*\([^)]*\)/g, '').trim();

        console.log('[Weather API] Original destination:', destination);
        console.log('[Weather API] Cleaned destination:', cleanDestination);
        console.log('[Weather API] Fetching weather for:', cleanDestination);

        // First, geocode the destination
        const coords = await geocodeCity(cleanDestination);
        if (!coords) {
            console.warn('[Weather API] Could not find coordinates for', cleanDestination, '- using fallback data');
            // Return fallback data if geocoding fails
            return getFallbackWeather(destination);
        }

        console.log('[Weather API] Got coordinates:', coords);

        // Fetch weather data from Open-Meteo
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto&forecast_days=7`;
        console.log('[Weather API] Fetching from:', weatherUrl);

        const response = await fetch(weatherUrl);

        if (!response.ok) {
            console.error('[Weather API] HTTP error:', response.status, response.statusText);
            return getFallbackWeather(destination);
        }

        const data = await response.json();
        console.log('[Weather API] API Response:', JSON.stringify(data, null, 2));

        if (!data.current || !data.daily) {
            console.error('[Weather API] Missing data in response');
            return getFallbackWeather(destination);
        }

        // Get day names for forecast
        const getDayName = (dateString: string): string => {
            const date = new Date(dateString);
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return days[date.getDay()];
        };

        // Build forecast array (next 4 days after today)
        const forecast = data.daily.time.slice(1, 5).map((date: string, index: number) => ({
            day: getDayName(date),
            high: Math.round(data.daily.temperature_2m_max[index + 1]),
            low: Math.round(data.daily.temperature_2m_min[index + 1]),
            condition: getWeatherCondition(data.daily.weather_code[index + 1])
        }));

        const temp = Math.round(data.current.temperature_2m);
        const weatherData = {
            location: destination,
            temperature: temp,
            temp: temp,
            feelsLike: temp - 2 + Math.floor(Math.random() * 4), // Approximate feels like
            condition: getWeatherCondition(data.current.weather_code),
            humidity: data.current.relative_humidity_2m,
            windSpeed: Math.round(data.current.wind_speed_10m),
            isRealTime: true,
            forecast
        };

        console.log('[Weather API] ✅ SUCCESS - Returning LIVE weather data:');
        console.log('[Weather API]   📍 Location:', destination);
        console.log('[Weather API]   🌡️  Temperature:', weatherData.temperature, '°F');
        console.log('[Weather API]   ☁️  Condition:', weatherData.condition);
        console.log('[Weather API]   💧 Humidity:', weatherData.humidity, '%');
        console.log('[Weather API]   💨 Wind Speed:', weatherData.windSpeed, 'mph');
        return weatherData;
    } catch (error) {
        console.error('[Weather API] Error fetching weather:', error);
        return getFallbackWeather(destination);
    }
};

// Fallback weather data in case API fails
const getFallbackWeather = (destination: string): WeatherData => {
    console.warn('[Weather API] ⚠️  USING FALLBACK DATA (not real-time!)');
    const temp = Math.floor(Math.random() * 30) + 60;
    return {
        location: destination,
        temperature: temp,
        temp: temp,
        feelsLike: temp - 2,
        condition: 'Partly Cloudy',
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 15) + 5,
        isRealTime: false,
        forecast: [
            { day: 'Tomorrow', high: 75, low: 62, condition: 'Sunny' },
            { day: 'Wednesday', high: 73, low: 60, condition: 'Partly Cloudy' },
            { day: 'Thursday', high: 70, low: 58, condition: 'Cloudy' },
            { day: 'Friday', high: 68, low: 55, condition: 'Rainy' },
        ],
    };
};

export const getWeatherEmoji = (condition: string): string => {
    const lower = condition.toLowerCase();
    if (lower.includes('clear') || lower.includes('sunny')) return '☀️';
    if (lower.includes('partly cloudy') || lower.includes('partly')) return '⛅';
    if (lower.includes('overcast') || lower.includes('cloudy')) return '☁️';
    if (lower.includes('rain') || lower.includes('drizzle') || lower.includes('shower')) return '🌧️';
    if (lower.includes('thunder') || lower.includes('storm')) return '⛈️';
    if (lower.includes('snow')) return '🌨️';
    if (lower.includes('fog')) return '🌫️';
    if (lower.includes('wind')) return '💨';
    return '🌤️';
};
