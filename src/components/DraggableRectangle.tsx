import React, { useRef, useState } from 'react';
import { View, StyleSheet, PanResponder, Animated, Text } from 'react-native';

interface Props {
    initialX: number;
    initialY: number;
    initialWidth: number;
    initialHeight: number;
    color: string;
    label: string;
    onChange: (width: number, height: number) => void;
}

export default function DraggableRectangle({ initialX, initialY, initialWidth, initialHeight, color, label, onChange }: Props) {
    const pan = useRef(new Animated.ValueXY({ x: initialX, y: initialY })).current;
    const size = useRef(new Animated.ValueXY({ x: initialWidth, y: initialHeight })).current;

    // We store initial values to be able to extract offsets correctly
    const panState = useRef({ x: initialX, y: initialY });
    const sizeState = useRef({ w: initialWidth, h: initialHeight });

    // Ensure we keep track of the Animated values since we don't have direct access in PanResponder without listeners
    pan.addListener((value) => { panState.current = value; });
    size.addListener((value) => { sizeState.current = { w: value.x, h: value.y }; });

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({ x: panState.current.x, y: panState.current.y });
                pan.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
            onPanResponderRelease: () => {
                pan.flattenOffset();
            },
        })
    ).current;

    const resizeResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                size.setOffset({ x: sizeState.current.w, y: sizeState.current.h });
                size.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event([null, { dx: size.x, dy: size.y }], { useNativeDriver: false }),
            onPanResponderRelease: () => {
                size.flattenOffset();
                onChange(sizeState.current.w, sizeState.current.h);
            },
        })
    ).current;

    return (
        <Animated.View
            style={[
                styles.box,
                { borderColor: color },
                {
                    transform: [{ translateX: pan.x }, { translateY: pan.y }],
                    width: size.x,
                    height: size.y,
                }
            ]}
        >
            <View {...panResponder.panHandlers} style={styles.dragArea}>
                <Text style={[styles.label, { color }]}>{label}</Text>
            </View>
            <Animated.View {...resizeResponder.panHandlers} style={[styles.resizeHandle, { backgroundColor: color }]} />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    box: {
        position: 'absolute',
        borderWidth: 2,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderStyle: 'dashed',
    },
    dragArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    resizeHandle: {
        position: 'absolute',
        bottom: -12,
        right: -12,
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#fff',
    }
});
