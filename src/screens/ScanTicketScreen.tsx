import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, SafeAreaView, StatusBar, Modal, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { colors, spacing, typography } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import TextRecognition from '@react-native-ml-kit/text-recognition';

// ─── OCR Parsing Helpers ─────────────────────────────────────────────

function extractFlightNumber(text: string): string | null {
    // Common patterns: AA1234, UA 567, DL123
    const match = text.match(/\b([A-Z]{2,3})\s?(\d{1,4})\b/);
    return match ? `${match[1]}${match[2]}` : null;
}

function extractDate(text: string): string | null {
    // Patterns: 15 JAN 2025, Jan 15, 2025, 01/15/2025, 2025-01-15
    const patterns = [
        /(\d{1,2})\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+(\d{4})/i,
        /(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+(\d{1,2}),?\s+(\d{4})/i,
        /(\d{1,2})\/(\d{1,2})\/(\d{2,4})/,
        /(\d{4})-(\d{2})-(\d{2})/,
    ];
    for (const p of patterns) {
        const m = text.match(p);
        if (m) return m[0];
    }
    return null;
}

function extractTime(text: string): string | null {
    const match = text.match(/\b(\d{1,2}:\d{2})\s*(AM|PM|HRS|H)?\b/i);
    return match ? match[0] : null;
}

function extractGate(text: string): string | null {
    const match = text.match(/GATE\s*:?\s*([A-Z]?\d{1,3}[A-Z]?)/i);
    return match ? match[1] : null;
}

function extractSeat(text: string): string | null {
    const match = text.match(/SEAT\s*:?\s*(\d{1,3}[A-F])/i);
    return match ? match[1] : null;
}

function extractAirport(text: string): string | null {
    const match = text.match(/\b([A-Z]{3})\b/g);
    // Filter to known airport-like codes — 3 uppercase
    return match && match.length > 0 ? match[0] : null;
}

function extractConfirmation(text: string): string | null {
    const match = text.match(/(?:CONF|PNR|BOOKING|REF)\s*:?\s*([A-Z0-9]{5,8})/i);
    return match ? match[1] : null;
}

export default function ScanTicketScreen() {
    const navigation = useNavigation<any>();
    const [permission, requestPermission] = useCameraPermissions();
    const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
    const [facing, setFacing] = useState<'back' | 'front'>('back');
    const [photo, setPhoto] = useState<string | null>(null);
    const cameraRef = useRef<CameraView>(null);
    const [isScanning, setIsScanning] = useState(false);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.button}>
                    <Text style={styles.buttonText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photoData = await cameraRef.current.takePictureAsync({
                    quality: 0.8,
                    base64: true,
                    skipProcessing: true,
                });
                setPhoto(photoData?.uri || null);
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Failed to take picture');
            }
        }
    };

    const handleRetake = () => {
        setPhoto(null);
    };

    const handleUsePhoto = async () => {
        if (!photo) return;
        setIsScanning(true);

        try {
            // Save to gallery if permitted
            if (mediaPermission?.granted) {
                await MediaLibrary.saveToLibraryAsync(photo);
            }

            // Real OCR using ML Kit
            const result = await TextRecognition.recognize(photo);
            const fullText = result.text || '';

            // Parse ticket details
            const flightNumber = extractFlightNumber(fullText);
            const date = extractDate(fullText);
            const time = extractTime(fullText);
            const gate = extractGate(fullText);
            const seat = extractSeat(fullText);
            const confirmation = extractConfirmation(fullText);

            setIsScanning(false);

            if (flightNumber || date || confirmation) {
                // Found useful info — navigate with pre-filled data
                Alert.alert(
                    "✅ Ticket Scanned!",
                    `Found: ${[
                        flightNumber && `Flight ${flightNumber}`,
                        date && `Date: ${date}`,
                        time && `Time: ${time}`,
                        gate && `Gate: ${gate}`,
                        seat && `Seat: ${seat}`,
                        confirmation && `Ref: ${confirmation}`,
                    ].filter(Boolean).join('\n')}`,
                    [{
                        text: "Continue",
                        onPress: () => navigation.navigate('AddFlightTrip', {
                            ticketImage: photo,
                            ocrData: { flightNumber, date, time, gate, seat, confirmation },
                        }),
                    }]
                );
            } else {
                // No useful data found
                Alert.alert(
                    "📷 Photo Captured",
                    "We couldn't auto-detect flight info from this image. You can still enter details manually.",
                    [{
                        text: "Continue",
                        onPress: () => navigation.navigate('AddFlightTrip', { ticketImage: photo }),
                    }]
                );
            }
        } catch (error) {
            console.error('OCR Error:', error);
            setIsScanning(false);
            Alert.alert(
                "Ticket Captured!",
                "OCR scanning encountered an error. Please enter trip details manually.",
                [{
                    text: "Continue to Add Trip",
                    onPress: () => navigation.navigate('AddFlightTrip', { ticketImage: photo }),
                }]
            );
        }
    };

    if (photo) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.previewContainer}>
                    <Image source={{ uri: photo }} style={styles.previewImage} resizeMode="contain" />

                    {isScanning && (
                        <View style={styles.scanningOverlay}>
                            <ActivityIndicator size="large" color={colors.primary.main} />
                            <Text style={styles.scanningText}>Analyzing Ticket...</Text>
                        </View>
                    )}

                    <View style={styles.previewControls}>
                        <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
                            <Text style={styles.retakeText}>Retake</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.usePhotoButton} onPress={handleUsePhoto}>
                            <Text style={styles.usePhotoText}>Use Photo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                <SafeAreaView style={styles.cameraOverlay}>

                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                            <Text style={styles.closetext}>✕</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>Scan Ticket</Text>
                        <View style={{ width: 40 }} />
                    </View>

                    {/* Guide Box */}
                    <View style={styles.guideContainer}>
                        <View style={styles.guideBox}>
                            <View style={[styles.corner, styles.topLeft]} />
                            <View style={[styles.corner, styles.topRight]} />
                            <View style={[styles.corner, styles.bottomLeft]} />
                            <View style={[styles.corner, styles.bottomRight]} />
                        </View>
                        <Text style={styles.guideText}>Align ticket within frame</Text>
                    </View>

                    {/* Controls */}
                    <View style={styles.controlsContainer}>
                        <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
                            <Text style={styles.flipIcon}>🔄</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                            <View style={styles.captureInner} />
                        </TouchableOpacity>

                        <View style={{ width: 40 }} />
                    </View>

                </SafeAreaView>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
        color: '#fff',
    },
    button: {
        backgroundColor: colors.primary.main,
        padding: spacing.md,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    camera: {
        flex: 1,
    },
    cameraOverlay: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingTop: spacing.md,
    },
    closeButton: {
        padding: spacing.sm,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closetext: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    guideContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    guideBox: {
        width: '80%',
        aspectRatio: 0.7, // Ticket shape (tall)
        borderWidth: 0,
        borderColor: 'transparent',
        position: 'relative',
    },
    corner: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderColor: '#fff',
        borderWidth: 4,
    },
    topLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
    topRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
    bottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
    bottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
    guideText: {
        color: '#fff',
        marginTop: spacing.lg,
        fontSize: 16,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: 4,
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 40,
    },
    flipButton: {
        padding: spacing.md,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 30,
    },
    flipIcon: {
        fontSize: 24,
        color: '#fff',
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureInner: {
        width: 65,
        height: 65,
        borderRadius: 32.5,
        backgroundColor: '#fff',
    },
    previewContainer: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewImage: {
        width: '100%',
        height: '80%',
    },
    previewControls: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 40,
        width: '100%',
        justifyContent: 'space-around',
    },
    retakeButton: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        backgroundColor: '#444',
        borderRadius: 8,
    },
    retakeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    usePhotoButton: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        backgroundColor: colors.primary.main,
        borderRadius: 8,
    },
    usePhotoText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    scanningOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    scanningText: {
        color: '#fff',
        marginTop: spacing.md,
        fontSize: 18,
        fontWeight: 'bold',
    },
});
