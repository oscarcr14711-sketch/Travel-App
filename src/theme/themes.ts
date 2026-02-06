// Theme type definitions
export type ThemeMode = 'day' | 'night' | 'auto';
export type ActiveTheme = 'day' | 'night';

// Theme color configurations
export interface ThemeColors {
    // Backgrounds
    background: string;
    cardBackground: string;

    // Text colors
    primaryText: string;
    secondaryText: string;
    headerText: string;

    // Tab bar
    tabBarBackground: string;
    tabBarActive: string;
    tabBarInactive: string;

    // Trip cards
    flightCardColors: [string, string, string];
    busCardColors: [string, string, string];
    flightCardShadow: string;
    busCardShadow: string;

    // Buttons
    buttonGradient: [string, string, string];

    // Card styles
    cardOpacity: number;
    cardBorderColor: string;
}

export const nightTheme: ThemeColors = {
    background: 'space', // Special flag for StarryBackground
    cardBackground: 'rgba(30, 42, 74, 0.9)',

    primaryText: '#ffffff',
    secondaryText: 'rgba(255, 255, 255, 0.7)',
    headerText: '#ffffff',

    tabBarBackground: '#1a1f3a',
    tabBarActive: '#ffffff',
    tabBarInactive: 'rgba(255, 255, 255, 0.4)',

    flightCardColors: ['#4a3a7a', '#5d4a92', '#3d2d60'],
    busCardColors: ['#2a7a7a', '#3a9a8a', '#2d8a6a'],
    flightCardShadow: '#5d4a92',
    busCardShadow: '#3a9a8a',

    buttonGradient: ['#6b5fcc', '#7c6fdd', '#6b5fcc'],

    cardOpacity: 1,
    cardBorderColor: 'rgba(255, 255, 255, 0.1)',
};

export const dayTheme: ThemeColors = {
    background: 'day', // Special flag for day mountain background
    cardBackground: 'rgba(255, 255, 255, 0.85)',

    primaryText: '#1a1a2e',
    secondaryText: '#4a4a5e',
    headerText: '#1a1a2e',

    tabBarBackground: 'rgba(220, 240, 255, 0.95)',
    tabBarActive: '#1a1a2e',
    tabBarInactive: 'rgba(26, 26, 46, 0.5)',

    flightCardColors: ['rgba(120, 150, 220, 0.98)', 'rgba(140, 170, 235, 0.98)', 'rgba(120, 150, 220, 0.98)'],
    busCardColors: ['rgba(100, 200, 180, 0.98)', 'rgba(120, 220, 200, 0.98)', 'rgba(100, 200, 180, 0.98)'],
    flightCardShadow: 'rgba(100, 120, 200, 0.5)',
    busCardShadow: 'rgba(100, 200, 180, 0.5)',

    buttonGradient: ['#6b5fcc', '#7c6fdd', '#6b5fcc'],

    cardOpacity: 0.85,
    cardBorderColor: 'rgba(255, 255, 255, 0.4)',
};

export const getTheme = (activeTheme: ActiveTheme): ThemeColors => {
    return activeTheme === 'day' ? dayTheme : nightTheme;
};

// Determine theme based on time (7 AM - 7 PM = day, otherwise night)
export const getAutoTheme = (): ActiveTheme => {
    const hour = new Date().getHours();
    return hour >= 7 && hour < 19 ? 'day' : 'night';
};
