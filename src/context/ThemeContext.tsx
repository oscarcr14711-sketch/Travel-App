import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode, ActiveTheme, ThemeColors, getTheme, getAutoTheme } from '../theme/themes';

interface ThemeContextType {
    themeMode: ThemeMode;
    activeTheme: ActiveTheme;
    theme: ThemeColors;
    setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@flyride_theme_mode';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [themeMode, setThemeModeState] = useState<ThemeMode>('auto');
    const [activeTheme, setActiveTheme] = useState<ActiveTheme>('night');

    // Load saved theme preference on mount
    useEffect(() => {
        loadThemePreference();
    }, []);

    // Update active theme when mode changes or time passes (for auto mode)
    useEffect(() => {
        updateActiveTheme();

        // Set up interval to check time every minute for auto mode
        const interval = setInterval(() => {
            if (themeMode === 'auto') {
                updateActiveTheme();
            }
        }, 60000); // Check every minute

        return () => clearInterval(interval);
    }, [themeMode]);

    const loadThemePreference = async () => {
        try {
            const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            if (savedMode && (savedMode === 'day' || savedMode === 'night' || savedMode === 'auto')) {
                setThemeModeState(savedMode as ThemeMode);
            }
        } catch (error) {
            console.error('Failed to load theme preference:', error);
        }
    };

    const updateActiveTheme = () => {
        let newActiveTheme: ActiveTheme;

        if (themeMode === 'auto') {
            newActiveTheme = getAutoTheme();
        } else {
            newActiveTheme = themeMode;
        }

        setActiveTheme(newActiveTheme);
    };

    const setThemeMode = async (mode: ThemeMode) => {
        setThemeModeState(mode);
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
        } catch (error) {
            console.error('Failed to save theme preference:', error);
        }
    };

    const theme = getTheme(activeTheme);

    return (
        <ThemeContext.Provider value={{ themeMode, activeTheme, theme, setThemeMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
