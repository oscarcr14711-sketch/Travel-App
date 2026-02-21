module.exports = {
    name: 'FlyRide',
    slug: 'flyride',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
        image: './assets/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff'
    },
    ios: {
        supportsTablet: true,
        bundleIdentifier: 'com.oscarcr714.flyride',
        buildNumber: '1',
        newArchEnabled: false,
        infoPlist: {
            NSCameraUsageDescription: 'FlyRide needs access to your camera to scan luggage and documents.',
            NSPhotoLibraryUsageDescription: 'FlyRide needs access to your photo library to import travel documents.',
            NSMicrophoneUsageDescription: 'FlyRide may use your microphone for video features.',
            NSLocationWhenInUseUsageDescription: 'FlyRide uses your location to provide airport recommendations.',
            ITSAppUsesNonExemptEncryption: false
        }
    },
    android: {
        adaptiveIcon: {
            foregroundImage: './assets/adaptive-icon.png',
            backgroundColor: '#ffffff'
        },
        package: 'com.oscarcr714.flyride',
        versionCode: 1,
        permissions: [
            'CAMERA',
            'READ_EXTERNAL_STORAGE',
            'WRITE_EXTERNAL_STORAGE',
            'ACCESS_FINE_LOCATION',
            'NOTIFICATIONS'
        ]
    },
    web: {
        favicon: './assets/favicon.png'
    },
    plugins: [
        'expo-document-picker',
        'expo-file-system',
        'expo-image-picker',
        'expo-notifications',
        [
            'expo-av',
            {
                microphonePermission: 'Allow FlyRide to access your microphone for video features.'
            }
        ],
        [
            'expo-camera',
            {
                cameraPermission: 'Allow FlyRide to access your camera for AR luggage scanning.'
            }
        ],
        [
            'expo-media-library',
            {
                photosPermission: 'Allow FlyRide to save trip photos.',
                savePhotosPermission: 'Allow FlyRide to save photos.'
            }
        ],
        [
            'expo-build-properties',
            {
                ios: {
                    deploymentTarget: '16.0'
                }
            }
        ]
    ],
    extra: {
        eas: {
            projectId: 'b2b41890-2d3c-405d-bb1e-9d0a40f6d2c5'
        }
    }
};
