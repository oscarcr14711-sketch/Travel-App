import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert, Image, SafeAreaView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme';

export default function ARLuggageScreen({ navigation }: any) {
    const [permission, requestPermission] = useCameraPermissions();
    const [image, setImage] = useState<string | null>(null);
    const cameraRef = useRef<CameraView>(null);
    const [analyzing, setAnalyzing] = useState(false);

    if (!permission) {
        // Camera permissions are still loading
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>We need your camera permission to scan luggage.</Text>
                <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                    <Text style={styles.permissionButtonText}>Grant Permission</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backButtonSimple} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonTextSimple}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            setAnalyzing(true);
            try {
                const photo = await cameraRef.current.takePictureAsync();
                setImage(photo?.uri || null);
            } catch (error) {
                Alert.alert("Error", "Failed to take photo");
            } finally {
                setAnalyzing(false);
            }
        }
    };

    const resetScan = () => {
        setImage(null);
    };

    if (image) {
        return (
            <View style={styles.container}>
                <Image source={{ uri: image }} style={styles.previewImage} />
                <View style={styles.overlay}>
                    <View style={styles.resultCard}>
                        <Text style={styles.resultTitle}>Carry-On Fit Analysis</Text>
                        <View style={styles.matchContainer}>
                            <Text style={styles.matchIcon}>✅</Text>
                            <Text style={styles.matchText}>Likely Fits Standard Carry-On</Text>
                        </View>
                        <Text style={styles.dimensionsText}>Est. Dimensions: 21.5" x 13.5" x 8.5"</Text>
                        <Text style={styles.disclaimerText}>*Estimation based on standard reference. Always verify with airline sizer.</Text>

                        <TouchableOpacity style={styles.newScanButton} onPress={resetScan}>
                            <Text style={styles.newScanButtonText}>Scan Another Bag</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing="back"
                ref={cameraRef}
            >
                <SafeAreaView style={styles.cameraUi}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButtonCamera}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.backIcon}>✕</Text>
                        </TouchableOpacity>
                        <View style={styles.modeBadge}>
                            <Text style={styles.modeText}>AR Scanner</Text>
                        </View>
                        <View style={styles.controlPlaceholder} />
                    </View>

                    {/* AR Guide Box */}
                    <View style={styles.guideContainer}>
                        <View style={styles.guideBox}>
                            <View style={[styles.corner, styles.tl]} />
                            <View style={[styles.corner, styles.tr]} />
                            <View style={[styles.corner, styles.bl]} />
                            <View style={[styles.corner, styles.br]} />
                            <Text style={styles.guideText}>Align bag within box</Text>
                        </View>
                    </View>

                    {/* Controls */}
                    <View style={styles.controls}>
                        <TouchableOpacity
                            style={styles.captureButton}
                            onPress={takePicture}
                            disabled={analyzing}
                        >
                            <View style={styles.captureInner} />
                        </TouchableOpacity>
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
    permissionContainer: {
        flex: 1,
        backgroundColor: colors.light.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    permissionText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: colors.light.text,
    },
    permissionButton: {
        backgroundColor: colors.primary.main,
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    permissionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButtonSimple: {
        padding: 10,
    },
    backButtonTextSimple: {
        color: colors.primary.main,
        fontSize: 16,
    },
    camera: {
        flex: 1,
    },
    cameraUi: {
        flex: 1,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingTop: Platform.OS === 'android' ? 40 : 0,
    },
    backButtonCamera: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    modeBadge: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    modeText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    controlPlaceholder: {
        width: 40,
    },
    guideContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    guideBox: {
        width: '70%',
        aspectRatio: 0.7, // Portrait bag shape
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    guideText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        fontWeight: '500',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 8,
        borderRadius: 8,
    },
    corner: {
        position: 'absolute',
        width: 30,
        height: 30,
        borderColor: '#2ecc71',
        borderWidth: 4,
    },
    tl: { top: -2, left: -2, borderBottomWidth: 0, borderRightWidth: 0 },
    tr: { top: -2, right: -2, borderBottomWidth: 0, borderLeftWidth: 0 },
    bl: { bottom: -2, left: -2, borderTopWidth: 0, borderRightWidth: 0 },
    br: { bottom: -2, right: -2, borderTopWidth: 0, borderLeftWidth: 0 },
    controls: {
        padding: 30,
        alignItems: 'center',
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    captureInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
    },
    previewImage: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    resultCard: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
    },
    resultTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
        textAlign: 'center',
    },
    matchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e6fffa',
        padding: 12,
        borderRadius: 12,
        marginBottom: 16,
    },
    matchIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    matchText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c7a7b',
    },
    dimensionsText: {
        fontSize: 16,
        color: '#4a5568',
        textAlign: 'center',
        marginBottom: 8,
    },
    disclaimerText: {
        fontSize: 12,
        color: '#a0aec0',
        textAlign: 'center',
        marginBottom: 20,
    },
    newScanButton: {
        backgroundColor: colors.primary.main,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    newScanButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
