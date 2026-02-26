# app name — Farmer GUI

React Native (Expo) app for monitoring soil moisture from your precision agriculture robot. Data is read from the same Firebase Realtime Database your ESP32 writes to.

## Setup

1. Install dependencies:
   ```bash
   cd gui
   npm install
   ```

2. Start the app:
   ```bash
   npx expo start
   ```
   Then scan the QR code with Expo Go (iOS/Android) or press `i` / `a` for simulator.

## Firebase

The app uses the Firebase Realtime Database URL from your ESP32 project:

- **URL:** `https://esp-32-test-c2a8f-default-rtdb.firebaseio.com`
- **Paths:** `/soilMoisture` (current VWC %), `/rawADC` (optional)

Configure Firebase (and optionally Auth) in `src/config/firebase.js` if you use a different project or need security rules.

## Screens

- **Home** — App name and navigation to all sections.
- **Moisture Meter** — Live moisture value (VWC %) and a graph of the last 5 minutes of readings from Firebase.
- **Crop Health** — Placeholder for future use.
- **Location Map** — Placeholder for robot location (to be added later).
- **Settings** — Color scheme (Forest / Earth / Sage), font size, and background (default / light / dark).
- **About** — Placeholder text; replace with your own copy.

## Tech

- **Expo** ~50 — iOS & Android
- **React Navigation** — Stack navigator
- **Firebase JS SDK** — Realtime Database (no native modules)
- **react-native-gifted-charts** — 5‑minute moisture line chart
- **AsyncStorage** — Persist theme/settings

Theme colors are tuned for an agriculture/sustainability look (greens, earth tones, clear typography).
