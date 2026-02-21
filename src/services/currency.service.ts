// Currency Converter Service
// For international travelers to Mexico and other destinations

import AsyncStorage from '@react-native-async-storage/async-storage';

const EXCHANGE_RATES_KEY = '@flyride_exchange_rates';
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

export interface ExchangeRate {
    baseCurrency: string;
    targetCurrency: string;
    rate: number;
    lastUpdated: string;
}

interface CachedRates {
    rates: Record<string, ExchangeRate>;
    timestamp: number;
}

// ─── Fetch Rates (Free API) ─────────────────────────

/**
 * Fetch exchange rate from free API (https://open.er-api.com)
 * No API key required, rate limit: 1500 requests/month
 */
async function fetchExchangeRate(
    baseCurrency: string,
    targetCurrency: string
): Promise<number> {
    try {
        const response = await fetch(
            `https://open.er-api.com/v6/latest/${baseCurrency}`
        );

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();

        if (data.result !== 'success') {
            throw new Error('API returned error');
        }

        const rate = data.rates[targetCurrency];
        if (!rate) {
            throw new Error(`Rate not found for ${targetCurrency}`);
        }

        return rate;
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        throw error;
    }
}

// ─── Caching ─────────────────────────────────────────

async function getCachedRates(): Promise<CachedRates | null> {
    try {
        const stored = await AsyncStorage.getItem(EXCHANGE_RATES_KEY);
        if (!stored) return null;

        const cached: CachedRates = JSON.parse(stored);
        const now = Date.now();

        // Check if cache is still valid
        if (now - cached.timestamp < CACHE_DURATION) {
            return cached;
        }

        return null;
    } catch (error) {
        console.error('Error loading cached rates:', error);
        return null;
    }
}

async function cacheRate(rate: ExchangeRate) {
    try {
        const cached = await getCachedRates();
        const rates = cached?.rates || {};
        const key = `${rate.baseCurrency}_${rate.targetCurrency}`;
        rates[key] = rate;

        const newCache: CachedRates = {
            rates,
            timestamp: Date.now(),
        };

        await AsyncStorage.setItem(EXCHANGE_RATES_KEY, JSON.stringify(newCache));
    } catch (error) {
        console.error('Error caching rate:', error);
    }
}

// ─── Public API ──────────────────────────────────────

/**
 * Convert amount from one currency to another
 */
export async function convert(
    amount: number,
    fromCurrency: string,
    toCurrency: string
): Promise<{ converted: number; rate: number; fromCache: boolean }> {
    try {
        // Normalize currency codes
        const from = fromCurrency.toUpperCase();
        const to = toCurrency.toUpperCase();

        if (from === to) {
            return { converted: amount, rate: 1, fromCache: false };
        }

        // Check cache first
        const cached = await getCachedRates();
        const cacheKey = `${from}_${to}`;

        if (cached && cached.rates[cacheKey]) {
            const cachedRate$ = cached.rates[cacheKey];
            return {
                converted: amount * cachedRate.rate,
                rate: cachedRate.rate,
                fromCache: true,
            };
        }

        // Fetch fresh rate
        const rate = await fetchExchangeRate(from, to);
        const converted = amount * rate;

        // Cache it
        const exchangeRate: ExchangeRate = {
            baseCurrency: from,
            targetCurrency: to,
            rate,
            lastUpdated: new Date().toISOString(),
        };
        await cacheRate(exchangeRate);

        return { converted, rate, fromCache: false };
    } catch (error) {
        console.error('Conversion error:', error);
        throw error;
    }
}

/**
 * Get current exchange rate (without converting)
 */
export async function getExchangeRate(
    fromCurrency: string,
    toCurrency: string
): Promise<{ rate: number; lastUpdated: string; fromCache: boolean }> {
    try {
        const from = fromCurrency.toUpperCase();
        const to = toCurrency.toUpperCase();

        if (from === to) {
            return {
                rate: 1,
                lastUpdated: new Date().toISOString(),
                fromCache: false,
            };
        }

        // Check cache
        const cached = await getCachedRates();
        const cacheKey = `${from}_${to}`;

        if (cached && cached.rates[cacheKey]) {
            const cachedRate = cached.rates[cacheKey];
            return {
                rate: cachedRate.rate,
                lastUpdated: cachedRate.lastUpdated,
                fromCache: true,
            };
        }

        // Fetch fresh
        const rate = await fetchExchangeRate(from, to);
        const exchangeRate: ExchangeRate = {
            baseCurrency: from,
            targetCurrency: to,
            rate,
            lastUpdated: new Date().toISOString(),
        };
        await cacheRate(exchangeRate);

        return {
            rate,
            lastUpdated: exchangeRate.lastUpdated,
            fromCache: false,
        };
    } catch (error) {
        console.error('Error getting exchange rate:', error);
        throw error;
    }
}

// ─── Popular Currency Pairs ──────────────────────────

export const POPULAR_CURRENCIES = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: '$', flag: '🇨🇦' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
];

export function getCurrencySymbol(code: string): string {
    const currency = POPULAR_CURRENCIES.find(c => c.code === code);
    return currency?.symbol || code;
}

export function getCurrencyFlag(code: string): string {
    const currency = POPULAR_CURRENCIES.find(c => c.code === code);
    return currency?.flag || '🌍';
}
