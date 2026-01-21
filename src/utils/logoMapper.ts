/**
 * Utility to get airline and bus company logos
 * Uses Clearbit Logo API for dynamic fetching with failover
 */

// Map of common airline/bus company names to their domains/logo URLs
// This helps ensure better accuracy than just guessing the domain
const COMPANY_DOMAIN_MAP: Record<string, string> = {
    // Airlines
    'delta': 'delta.com',
    'united': 'united.com',
    'american': 'aa.com',
    'american airlines': 'aa.com',
    'southwest': 'southwest.com',
    'jetblue': 'jetblue.com',
    'alaska': 'alaskaair.com',
    'spirit': 'spirit.com',
    'frontier': 'flyfrontier.com',
    'british airways': 'britishairways.com',
    'lufthansa': 'lufthansa.com',
    'air france': 'airfrance.com',
    'emirates': 'emirates.com',
    'qatar': 'qatarairways.com',
    'singapore airlines': 'singaporeair.com',
    'aeromexico': 'aeromexico.com',
    'volaris': 'volaris.com',
    'viva aerobus': 'vivaaerobus.com',

    // Bus Companies
    'greyhound': 'greyhound.com',
    'megabus': 'megabus.com',
    'flixbus': 'flixbus.com',
    'boltbus': 'boltbus.com',
    'tornado bus': 'tornadobus.com',
    'el expreso': 'elexpreso.com',
    'omex vip': 'omexvip.com',
    'ado': 'ado.com.mx',
    'etn': 'etn.com.mx',
    'primera plus': 'primeraplus.com.mx',
    'futura': 'futura.com.mx',
};

/**
 * Get the logo URL for a given company name
 * @param companyName Name of the airline or bus company
 * @returns URL string for the logo
 */
export const getCompanyLogoUrl = (companyName: string): string | null => {
    if (!companyName) return null;

    const normalizedName = companyName.toLowerCase().trim();

    // Check if we have a direct mapping
    const domain = COMPANY_DOMAIN_MAP[normalizedName];

    if (domain) {
        return `https://logo.clearbit.com/${domain}`;
    }

    // If no mapping, try to guess the domain (basic)
    // This removes spaces and adds .com, which works for many simple names
    const guessedDomain = `${normalizedName.replace(/\s+/g, '')}.com`;
    return `https://logo.clearbit.com/${guessedDomain}`;
};
