import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface SpaceBackgroundProps {
    children: React.ReactNode;
}

export default function StarryBackground({ children }: SpaceBackgroundProps) {
    const { activeTheme } = useTheme();

    const backgroundSource = activeTheme === 'night'
        ? require('../assets/images/space-background.png')
        : require('../assets/images/day-background.jpg');

    const overlayColor = activeTheme === 'night'
        ? 'rgba(10, 10, 30, 0.3)'
        : 'rgba(255, 255, 255, 0.1)';

    return (
        <ImageBackground
            source={backgroundSource}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={[styles.overlay, { backgroundColor: overlayColor }]}>
                {children}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
    },
});
