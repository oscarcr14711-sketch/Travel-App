# FlyRide Optimization & Stability Plan (Final Version)

This document provides strict instructions for AI agents (Gemini/Claude) to enhance FlyRide (Expo v52) without causing crashes or data loss.

## 1. Photo Journal Persistence
**Goal:** Prevent photo loss by moving images from cache to permanent storage.
- Use `expo-file-system` to move captured images from the temporary URI to `FileSystem.documentDirectory + 'FlyRide_Photos/'`.
- Store the permanent local URI in `AsyncStorage` linked to the Trip ID.

## 2. Bus UI Refinement
**Goal:** Simplify the Bus Trip details.
- Remove stock/reference images of buses.
- Display amenities (Wi-Fi, AC, etc.) using only text and icons from `@expo/vector-icons`.

## 3. Offline Itinerary Mode (Hydration)
**Goal:** Enable flight/bus viewing without internet.
- Cache every successful API response from AeroDataBox/Vercel into `AsyncStorage`.
- Implement a logic check: If `NetInfo` detects no connection, pull the last saved flight data from local storage and show an "Offline Version" banner.

## 4. Luggage Measurement Protocol (STRICT & PROTECTIVE)
**Goal:** Measure luggage dimensions using a 2D reference method to avoid 3D-related crashes.
- **STRICT RULE:** DO NOT install `three.js`, `expo-three`, or any native AR modules.
- **UI LOGIC:** Implement a "Reference-Based Measurement". Overlay two draggable rectangles on the `expo-camera` view.
    1. Rectangle A: User aligns it with a standard ID card (8.56cm).
    2. Rectangle B: User aligns it with the suitcase.
- Calculate dimensions via pixel-to-cm ratio.
- **CRITICAL PROTECTION:** Do NOT modify the existing `PackingListScreen` or the weight calculation logic. The list of items and their assigned weights must remain untouched. Only update the visual dimensioning in `ARLuggageScreen`.

## 5. API Credit Optimization (Vercel)
- Implement a 10-minute cooldown for flight status refreshes in the UI.
- Add `Cache-Control: s-maxage=600` headers in the Vercel Edge Function to reuse results for the same flight.

## 6. Enhanced Airport Maps (Companion Screen)
**Goal:** Show shops, gates, and points of interest (POIs) inside airports.
- Set `provider={PROVIDER_GOOGLE}` in the `MapView` component.
- Enable `showsPointsOfInterest={true}` and `showsIndoorLevelPicker={true}`.
- Configure the initial `latitudeDelta` and `longitudeDelta` to a high-zoom level (approx. `0.005`) to ensure indoor details like shops and restaurants are rendered by the Google Maps engine.
