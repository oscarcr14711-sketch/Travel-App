export interface CountryData {
    flag: string;
    name: string;
    currency: { code: string; symbol: string; name: string };
    language: string;
    emergency: {
        police: string;
        medical: string;
        fire: string;
    };
    plugType: string[];
}

export const COUNTRIES: CountryData[] = [
    { flag: '🇺🇸', name: 'United States', currency: { code: 'USD', symbol: '$', name: 'US Dollar' }, language: 'English', emergency: { police: '911', medical: '911', fire: '911' }, plugType: ['A', 'B'] },
    { flag: '🇲🇽', name: 'Mexico', currency: { code: 'MXN', symbol: '$', name: 'Mexican Peso' }, language: 'Spanish', emergency: { police: '911', medical: '065', fire: '119' }, plugType: ['A', 'B'] },
    { flag: '🇨🇦', name: 'Canada', currency: { code: 'CAD', symbol: '$', name: 'Canadian Dollar' }, language: 'English, French', emergency: { police: '911', medical: '911', fire: '911' }, plugType: ['A', 'B'] },
    { flag: '🇬🇧', name: 'United Kingdom', currency: { code: 'GBP', symbol: '£', name: 'British Pound' }, language: 'English', emergency: { police: '999', medical: '999', fire: '999' }, plugType: ['G'] },
    { flag: '🇫🇷', name: 'France', currency: { code: 'EUR', symbol: '€', name: 'Euro' }, language: 'French', emergency: { police: '17', medical: '15', fire: '18' }, plugType: ['C', 'E'] },
    { flag: '🇩🇪', name: 'Germany', currency: { code: 'EUR', symbol: '€', name: 'Euro' }, language: 'German', emergency: { police: '110', medical: '112', fire: '112' }, plugType: ['C', 'F'] },
    { flag: '🇮🇹', name: 'Italy', currency: { code: 'EUR', symbol: '€', name: 'Euro' }, language: 'Italian', emergency: { police: '112', medical: '118', fire: '115' }, plugType: ['C', 'F', 'L'] },
    { flag: '🇪🇸', name: 'Spain', currency: { code: 'EUR', symbol: '€', name: 'Euro' }, language: 'Spanish', emergency: { police: '112', medical: '112', fire: '112' }, plugType: ['C', 'F'] },
    { flag: '🇵🇹', name: 'Portugal', currency: { code: 'EUR', symbol: '€', name: 'Euro' }, language: 'Portuguese', emergency: { police: '112', medical: '112', fire: '112' }, plugType: ['C', 'F'] },
    { flag: '🇳🇱', name: 'Netherlands', currency: { code: 'EUR', symbol: '€', name: 'Euro' }, language: 'Dutch', emergency: { police: '112', medical: '112', fire: '112' }, plugType: ['C', 'F'] },
    { flag: '🇧🇪', name: 'Belgium', currency: { code: 'EUR', symbol: '€', name: 'Euro' }, language: 'Dutch, French, German', emergency: { police: '101', medical: '100', fire: '100' }, plugType: ['C', 'E'] },
    { flag: '🇨🇭', name: 'Switzerland', currency: { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' }, language: 'German, French, Italian', emergency: { police: '117', medical: '144', fire: '118' }, plugType: ['C', 'J'] },
    { flag: '🇸🇪', name: 'Sweden', currency: { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' }, language: 'Swedish', emergency: { police: '112', medical: '112', fire: '112' }, plugType: ['C', 'F'] },
    { flag: '🇳🇴', name: 'Norway', currency: { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' }, language: 'Norwegian', emergency: { police: '112', medical: '113', fire: '110' }, plugType: ['C', 'F'] },
    { flag: '🇩🇰', name: 'Denmark', currency: { code: 'DKK', symbol: 'kr', name: 'Danish Krone' }, language: 'Danish', emergency: { police: '112', medical: '112', fire: '112' }, plugType: ['C', 'E', 'F', 'K'] },
    { flag: '🇦🇺', name: 'Australia', currency: { code: 'AUD', symbol: '$', name: 'Australian Dollar' }, language: 'English', emergency: { police: '000', medical: '000', fire: '000' }, plugType: ['I'] },
    { flag: '🇳🇿', name: 'New Zealand', currency: { code: 'NZD', symbol: '$', name: 'New Zealand Dollar' }, language: 'English, Māori', emergency: { police: '111', medical: '111', fire: '111' }, plugType: ['I'] },
    { flag: '🇯🇵', name: 'Japan', currency: { code: 'JPY', symbol: '¥', name: 'Japanese Yen' }, language: 'Japanese', emergency: { police: '110', medical: '119', fire: '119' }, plugType: ['A', 'B'] },
    { flag: '🇰🇷', name: 'South Korea', currency: { code: 'KRW', symbol: '₩', name: 'South Korean Won' }, language: 'Korean', emergency: { police: '112', medical: '119', fire: '119' }, plugType: ['C', 'F'] },
    { flag: '🇨🇳', name: 'China', currency: { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' }, language: 'Mandarin', emergency: { police: '110', medical: '120', fire: '119' }, plugType: ['A', 'C', 'I'] },
    { flag: '🇮🇳', name: 'India', currency: { code: 'INR', symbol: '₹', name: 'Indian Rupee' }, language: 'Hindi, English', emergency: { police: '100', medical: '102', fire: '101' }, plugType: ['C', 'D', 'M'] },
    { flag: '🇸🇬', name: 'Singapore', currency: { code: 'SGD', symbol: '$', name: 'Singapore Dollar' }, language: 'English, Malay, Mandarin', emergency: { police: '999', medical: '995', fire: '995' }, plugType: ['G'] },
    { flag: '🇹🇭', name: 'Thailand', currency: { code: 'THB', symbol: '฿', name: 'Thai Baht' }, language: 'Thai', emergency: { police: '191', medical: '1669', fire: '199' }, plugType: ['A', 'B', 'C', 'O'] },
    { flag: '🇦🇪', name: 'UAE', currency: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' }, language: 'Arabic', emergency: { police: '999', medical: '998', fire: '997' }, plugType: ['C', 'D', 'G'] },
    { flag: '🇧🇷', name: 'Brazil', currency: { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' }, language: 'Portuguese', emergency: { police: '190', medical: '192', fire: '193' }, plugType: ['C', 'N'] },
    { flag: '🇦🇷', name: 'Argentina', currency: { code: 'ARS', symbol: '$', name: 'Argentine Peso' }, language: 'Spanish', emergency: { police: '911', medical: '107', fire: '100' }, plugType: ['C', 'I'] },
    { flag: '🇨🇴', name: 'Colombia', currency: { code: 'COP', symbol: '$', name: 'Colombian Peso' }, language: 'Spanish', emergency: { police: '123', medical: '123', fire: '119' }, plugType: ['A', 'B'] },
    { flag: '🇨🇱', name: 'Chile', currency: { code: 'CLP', symbol: '$', name: 'Chilean Peso' }, language: 'Spanish', emergency: { police: '133', medical: '131', fire: '132' }, plugType: ['C', 'L'] },
    { flag: '🇵🇪', name: 'Peru', currency: { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol' }, language: 'Spanish', emergency: { police: '105', medical: '106', fire: '116' }, plugType: ['A', 'B', 'C'] },
    { flag: '🇬🇹', name: 'Guatemala', currency: { code: 'GTQ', symbol: 'Q', name: 'Guatemalan Quetzal' }, language: 'Spanish', emergency: { police: '110', medical: '122', fire: '122' }, plugType: ['A', 'B'] },
    { flag: '🇨🇷', name: 'Costa Rica', currency: { code: 'CRC', symbol: '₡', name: 'Costa Rican Colón' }, language: 'Spanish', emergency: { police: '911', medical: '911', fire: '118' }, plugType: ['A', 'B'] },
    { flag: '🇵🇦', name: 'Panama', currency: { code: 'PAB', symbol: 'B/.', name: 'Panamanian Balboa' }, language: 'Spanish', emergency: { police: '104', medical: '911', fire: '103' }, plugType: ['A', 'B'] },
    { flag: '🇿🇦', name: 'South Africa', currency: { code: 'ZAR', symbol: 'R', name: 'South African Rand' }, language: 'English, Zulu, Xhosa', emergency: { police: '10111', medical: '10177', fire: '10177' }, plugType: ['C', 'D', 'M', 'N'] },
    { flag: '🇳🇬', name: 'Nigeria', currency: { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' }, language: 'English', emergency: { police: '112', medical: '112', fire: '112' }, plugType: ['D', 'G'] },
    { flag: '🇰🇪', name: 'Kenya', currency: { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' }, language: 'English, Swahili', emergency: { police: '999', medical: '999', fire: '999' }, plugType: ['G'] },
    { flag: '🇲🇦', name: 'Morocco', currency: { code: 'MAD', symbol: 'MAD', name: 'Moroccan Dirham' }, language: 'Arabic, Berber', emergency: { police: '19', medical: '15', fire: '15' }, plugType: ['C', 'E'] },
    { flag: '🇪🇬', name: 'Egypt', currency: { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound' }, language: 'Arabic', emergency: { police: '122', medical: '123', fire: '180' }, plugType: ['C', 'F'] },
    { flag: '🇹🇷', name: 'Turkey', currency: { code: 'TRY', symbol: '₺', name: 'Turkish Lira' }, language: 'Turkish', emergency: { police: '112', medical: '112', fire: '112' }, plugType: ['C', 'F'] },
    { flag: '🇷🇺', name: 'Russia', currency: { code: 'RUB', symbol: '₽', name: 'Russian Ruble' }, language: 'Russian', emergency: { police: '102', medical: '103', fire: '101' }, plugType: ['C', 'F'] },
    { flag: '🇵🇱', name: 'Poland', currency: { code: 'PLN', symbol: 'zł', name: 'Polish Złoty' }, language: 'Polish', emergency: { police: '112', medical: '999', fire: '998' }, plugType: ['C', 'E'] },
    { flag: '🇨🇿', name: 'Czech Republic', currency: { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' }, language: 'Czech', emergency: { police: '158', medical: '155', fire: '150' }, plugType: ['C', 'E'] },
    { flag: '🇦🇹', name: 'Austria', currency: { code: 'EUR', symbol: '€', name: 'Euro' }, language: 'German', emergency: { police: '133', medical: '144', fire: '122' }, plugType: ['C', 'F'] },
    { flag: '🇬🇷', name: 'Greece', currency: { code: 'EUR', symbol: '€', name: 'Euro' }, language: 'Greek', emergency: { police: '100', medical: '166', fire: '199' }, plugType: ['C', 'F'] },
    { flag: '🇭🇺', name: 'Hungary', currency: { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' }, language: 'Hungarian', emergency: { police: '112', medical: '104', fire: '105' }, plugType: ['C', 'F'] },
    { flag: '🇵🇭', name: 'Philippines', currency: { code: 'PHP', symbol: '₱', name: 'Philippine Peso' }, language: 'Filipino, English', emergency: { police: '117', medical: '117', fire: '117' }, plugType: ['A', 'B', 'C'] },
    { flag: '🇮🇩', name: 'Indonesia', currency: { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' }, language: 'Indonesian', emergency: { police: '110', medical: '118', fire: '113' }, plugType: ['C', 'F'] },
    { flag: '🇻🇳', name: 'Vietnam', currency: { code: 'VND', symbol: '₫', name: 'Vietnamese Đồng' }, language: 'Vietnamese', emergency: { police: '113', medical: '115', fire: '114' }, plugType: ['A', 'C', 'G'] },
    { flag: '🇲🇾', name: 'Malaysia', currency: { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' }, language: 'Malay', emergency: { police: '999', medical: '999', fire: '999' }, plugType: ['G'] },
    { flag: '🇵🇰', name: 'Pakistan', currency: { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' }, language: 'Urdu, English', emergency: { police: '15', medical: '115', fire: '16' }, plugType: ['C', 'D'] },
    { flag: '🇸🇦', name: 'Saudi Arabia', currency: { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' }, language: 'Arabic', emergency: { police: '999', medical: '997', fire: '998' }, plugType: ['G'] },
];
