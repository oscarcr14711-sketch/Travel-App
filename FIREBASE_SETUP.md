# Firebase Configuration Setup

## Overview
Firebase has been set up with placeholder configuration. You'll need to create a Firebase project and add your credentials.

## Steps to Configure Firebase

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

### 2. Add Android App
1. Click the Android icon in your Firebase project
2. Register app with package name: `com.myapp` (or your actual package name from `android/app/build.gradle`)
3. Download `google-services.json`
4. Place it in: `android/app/google-services.json`

### 3. Add iOS App
1. Click the iOS icon in your Firebase project
2. Register app with bundle ID: `org.reactjs.native.example.MyApp` (or your actual bundle ID from Xcode)
3. Download `GoogleService-Info.plist`
4. Place it in: `ios/MyApp/GoogleService-Info.plist`

### 4. Update Firebase Config
Edit `src/config/firebase.config.ts` with your project credentials:
- `apiKey`
- `authDomain`
- `projectId`
- `storageBucket`
- `messagingSenderId`
- `appId`

### 5. Enable Firebase Services
In Firebase Console, enable these services:
- **Authentication** → Enable Email/Password and Google Sign-In
- **Firestore Database** → Create database in production mode
- **Storage** → Set up Cloud Storage

### 6. Configure Android
Add to `android/build.gradle`:
```gradle
buildscript {
  dependencies {
    // Add this line
    classpath 'com.google.gms:google-services:4.4.0'
  }
}
```

Add to `android/app/build.gradle`:
```gradle
apply plugin: 'com.google.gms.google-services'
```

### 7. Configure iOS
Run:
```bash
cd ios && pod install && cd ..
```

## Security Rules
Set up Firestore security rules in Firebase Console to protect your data.

## Next Steps
After configuration:
1. Rebuild the app
2. Test authentication
3. Test Firestore operations
4. Test Storage uploads
