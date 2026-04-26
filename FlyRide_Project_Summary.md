# FlyRide Travel App - Project Summary

## Overview
FlyRide is a comprehensive React Native (Expo) mobile application designed to streamline travel management for both flights and buses. It features a complete end-to-end trip creation flow, deep real-time API integrations, local and remote data syncing, AR-simulated baggage measurements, and automated push notification reminders.

---

## Key Features & Completed Modules

### 1. Trip Management
- **Transportation Selection:** Choose intelligently between Flights and Buses.
- **Flight Trips (Autofill):** Integrates with AeroDataBox (via a Firebase/Vercel proxy) to automatically populate flight details (airline, duration, gates, terminals, and times) simply by entering a flight number and date.
- **Bus Trips:** Comprehensive coverage of bus travel, including support for Luxury class, bus models, and specific fleet amenities.
- **Trips Dashboard:** Dedicated screens for Upcoming and Past trips (`TripsScreen`, `HomeScreen`).
- **Rich Trip Details:** Detailed itineraries containing status updates, weather summaries, checklists, and dynamic countdowns (`TripDetailScreen`).

### 2. Luggage & Packing
- **AR Luggage Scanner:** An interactive camera module (`ARLuggageScreen`) that dynamically simulates real-world dimensional and weight measurements to verify if luggage meets specific airline or bus carry-on restrictions.
- **Packing List Generator:** Weight-calculated checklists (`PackingListScreen`) to ensure travelers stay under limits.

### 3. Tickets & Documents
- **Document Vault:** Secure local storage for passports, IDs, and visas (`DocumentVaultScreen`).
- **Ticket Viewer:** Ability to scan, import, and view PDF tickets natively without crashing the dev client (`PdfViewerScreen` & `TicketsScreen`).
- **Boarding Pass Wallet:** Quick access to boarding QR codes (`BoardingPassScreen`, `ScanTicketScreen`).

### 4. Utilities & Amenities
- **Currency Converter:** Real-time exchange rate checks for international travel (`CurrencyConverterScreen`).
- **Maps:** Terminal layouts for fast navigation (`AirportMapsScreen` & `BusTerminalMapsScreen`).
- **Amenities Viewer:** Know what's on your craft regarding Wi-Fi, food, power outlets, etc. (`FlightAmenitiesScreen`, `BusAmenitiesScreen`).
- **TSA Search:** Quick check on what can or cannot be brought through security (`TSASearchScreen`).

### 5. Media & Social
- **Photo Journal:** Dedicated gallery to document the journey (`PhotoJournalScreen`).
- **Companions:** Add friends and fellow travelers to trips (`CompanionScreen`).
- **Travel Stats:** Visualized analytics (miles flown, trips taken) (`TravelStatsScreen`).

### 6. Background Processes & Notifications
- **Smart Reminders:** Up to 15 different automated, time-based triggers (e.g., 24h check-in, 1-week packing reminder, gate changes).
- **Background Status Polling:** `expo-background-fetch` periodically checks flight statuses behind the scenes and fires system notifications (`notifications.service.ts`).

---

## Architecture & Tech Stack
- **Framework:** React Native + Expo (v52)
- **Navigation:** `@react-navigation/native-stack` & Bottom Tabs (`TabNavigator.tsx`, `RootNavigator.tsx`)
- **Backend / APIs:** 
  - Firebase Cloud Functions & Vercel Edge proxies for secure internal calls.
  - AeroDataBox (RapidAPI) for real-time flight telemetry.
- **Storage:** React Native Async Storage (`@react-native-async-storage/async-storage`).
- **Hardware/Sensors:** `expo-camera` (Luggage AR scanner).
- **Styling:** Custom StyleSheet system emphasizing dark mode & deep purples (`ThemeContext`, `themes.ts`).

---

## Status
- **Core MVP:** ✅ 100% Complete. 
- **Major Blockers:** Resolved (Cleaned up native module PDF viewer crashes & fixed notification service syntax).
- **Current Focus / Next Steps:** 
  - Testing end-to-end on physical devices.
  - Setting up Apple App Store/Google Play Store assets for publication.
  - (Optional) Upgrading the RapidAPI plan if volume increases.
