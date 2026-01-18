# MyApp - React Native Project

A cross-platform mobile application built with React Native for iOS and Android.

## 🚀 Features

- ✅ iOS and Android support
- ✅ TypeScript configured
- ✅ Modern React Native architecture
- ✅ Hot reload for fast development
- ✅ Beautiful, responsive UI

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **React Native CLI**: `npm install -g react-native-cli`

### For iOS Development:
- **macOS** (required for iOS development)
- **Xcode** (latest version from App Store)
- **CocoaPods**: `sudo gem install cocoapods`

### For Android Development:
- **Android Studio** with Android SDK
- **Java Development Kit (JDK)** 17 or higher
- Configure `ANDROID_HOME` environment variable

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **For iOS, install CocoaPods dependencies:**
   ```bash
   cd ios && pod install && cd ..
   ```

## 🏃 Running the App

### Start Metro Bundler:
```bash
npm start
```

### Run on iOS:
```bash
npm run ios
```

Or open `ios/MyApp.xcworkspace` in Xcode and run from there.

### Run on Android:
```bash
npm run android
```

Make sure you have an Android emulator running or a device connected.

## 📁 Project Structure

```
my-react-native-app/
├── android/              # Android native code
├── ios/                  # iOS native code
├── App.tsx               # Main application component
├── index.js              # Entry point
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── babel.config.js       # Babel configuration
└── metro.config.js       # Metro bundler configuration
```

## 🎨 Customization

- **App Name**: Update in `app.json`, `android/app/src/main/res/values/strings.xml`, and `ios/MyApp/Info.plist`
- **Bundle ID**: Update in `android/app/build.gradle` and iOS project settings
- **App Icon**: Replace icons in `android/app/src/main/res/mipmap-*` and `ios/MyApp/Images.xcassets`

## 🧪 Testing

```bash
npm test
```

## 📝 Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## 🐛 Troubleshooting

### Metro Bundler Issues:
```bash
npm start -- --reset-cache
```

### Android Build Issues:
```bash
cd android && ./gradlew clean && cd ..
```

### iOS Build Issues:
```bash
cd ios && pod install && cd ..
```

## 📚 Learn More

- [React Native Documentation](https://reactnative.dev/)
- [React Native Tutorial](https://reactnative.dev/docs/tutorial)
- [Troubleshooting](https://reactnative.dev/docs/troubleshooting)

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Coding! 🎉**
