import { TextStyle } from 'react-native';

export const typography = {
    // Font Families (using system fonts, can be replaced with custom fonts)
    fontFamily: {
        regular: 'System',
        medium: 'System',
        semiBold: 'System',
        bold: 'System',
    },

    // Font Sizes
    fontSize: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 30,
        '4xl': 36,
        '5xl': 48,
    },

    // Line Heights
    lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
    },

    // Text Styles
    styles: {
        h1: {
            fontSize: 36,
            fontWeight: '700' as TextStyle['fontWeight'],
            lineHeight: 44,
            letterSpacing: -0.5,
        },
        h2: {
            fontSize: 30,
            fontWeight: '700' as TextStyle['fontWeight'],
            lineHeight: 38,
            letterSpacing: -0.5,
        },
        h3: {
            fontSize: 24,
            fontWeight: '600' as TextStyle['fontWeight'],
            lineHeight: 32,
        },
        h4: {
            fontSize: 20,
            fontWeight: '600' as TextStyle['fontWeight'],
            lineHeight: 28,
        },
        h5: {
            fontSize: 18,
            fontWeight: '600' as TextStyle['fontWeight'],
            lineHeight: 26,
        },
        h6: {
            fontSize: 16,
            fontWeight: '600' as TextStyle['fontWeight'],
            lineHeight: 24,
        },
        body: {
            fontSize: 16,
            fontWeight: '400' as TextStyle['fontWeight'],
            lineHeight: 24,
        },
        bodySmall: {
            fontSize: 14,
            fontWeight: '400' as TextStyle['fontWeight'],
            lineHeight: 20,
        },
        caption: {
            fontSize: 12,
            fontWeight: '400' as TextStyle['fontWeight'],
            lineHeight: 16,
        },
        button: {
            fontSize: 16,
            fontWeight: '600' as TextStyle['fontWeight'],
            lineHeight: 24,
            letterSpacing: 0.5,
        },
        buttonSmall: {
            fontSize: 14,
            fontWeight: '600' as TextStyle['fontWeight'],
            lineHeight: 20,
            letterSpacing: 0.5,
        },
    },
};
