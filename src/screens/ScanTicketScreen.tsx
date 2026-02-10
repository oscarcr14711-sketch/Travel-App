import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, SafeAreaView, StatusBar, Modal } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { colors, spacing, typography } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';

export default function ScanTicketScreen() {
    const navigation = useNavigation<any>();
    const [permission, requestPermission] = useCameraPermissions();
    const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
    const [facing, setFacing] = useState<'back' | 'front'>('back');
    const [photo, setPhoto] = useState<string | null>(null);
    const cameraRef = useRef<CameraView>(null);
    const [isScanning, setIsScanning] = useState(false);

    if (!permission) {
        // Camera permissions are still loading.
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
        setIsScanning(true);
        // Simulate OCR parsing delay
        setTimeout(async () => {
            setIsScanning(false);

            // Save to gallery if permitted
            if (mediaPermission?.granted && photo) {
                await MediaLibrary.saveToLibraryAsync(photo);
            }

            Alert.alert(
                "Ticket Captured!",
                "We've scanned your ticket. Text recognition (OCR) is coming soon. For now, please enter trip details manually.",
                [
                    {
                        text: "Continue to Add Trip",
                        onPress: () => {
                            // Navigate to AddFlightTrip (default) passing the image URI?
                            // Or ask user if it's Flight or Bus?
                            // Default to Flight for now as it's most common for tickets.
                            navigation.navigate('AddFlightTrip', { ticketImage: photo });
                        }
                    }
                ]
            );
        }, 1500);
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
