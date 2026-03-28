# AgRobot — Soil Moisture Sensor & Farmer App

A **precision agriculture** stack: an **ESP32** reads soil moisture, sends data to **Firebase**, and farmers monitor it in real time on **iOS and Android** via a React Native (Expo) app.

---

## Overview

| Part | Role |
|------|------|
| **ESP32 firmware** | Reads a soil moisture sensor (GPIO 34), converts to volumetric water content (VWC %), and pushes values to Firebase every ~5 seconds. |
| **Firebase Realtime Database** | Stores the latest `/soilMoisture` (and `/rawADC`) so the app can show live and recent data. |
| **Mobile app (gui)** | Expo app for phones: live moisture value, 5‑minute graph, settings, and placeholders for crop health and robot location. |

---

## Prerequisites

- **ESP32** board (e.g. ESP32-DevKitC)
- **Soil moisture sensor** (analog, 0–3.3 V compatible) wired to **GPIO 34**
- **Wi‑Fi** network the ESP32 can join
- **Firebase** project with Realtime Database enabled
- For the app: **Node.js** 20+, **npm**, and (optional) **Expo Go** on a phone or a simulator/emulator

---

## Quick Start

### 1. Firebase

1. Create a project at [Firebase Console](https://console.firebase.google.com).
2. Enable **Realtime Database** and set rules (e.g. test mode or your own read/write rules).
3. Copy your database URL (e.g. `https://YOUR-PROJECT-default-rtdb.firebaseio.com`).

### 2. ESP32 firmware

1. Open this repo in **PlatformIO** (or Arduino IDE with ESP32 support).
2. In `secrets.h`, set:
   - `WIFI_SSID` and `WIFI_PASSWORD` — your Wi‑Fi
   - `FIREBASE_URL` — your Realtime Database URL
   - Ensure your .env files have specific values follow .env example(There are two .env files at the moment oen for the app one for firebase)
   - Ensure secrets.h and .env is in gitignore
3. Soil sensor: connect signal to **GPIO 34**, power and GND as per your sensor datasheet.
4. Build and upload to the ESP32. Open Serial Monitor (115200 baud) to see readings and confirm Firebase connection.

The firmware writes:

- **`/soilMoisture`** — float, VWC % (volumetric water content)
- **`/rawADC`** — int, raw ADC (0–4095)

Updates are sent about every 5 seconds.

### 3. Mobile app (farmer GUI)

1. **Install dependencies**
   ```bash
   cd gui
   npm install
   ```

2. **Point the app at your Firebase**  
   Edit `gui/src/config/firebase.js` and set `databaseURL` to your Realtime Database URL (same as in the ESP32).

3. **Run the app**
   ```bash
   npx expo start
   ```
   - **Phone:** Install **Expo Go**, then enter the `exp://...` URL shown in the terminal (or scan QR if your client supports it).
   - **Web (desktop):** Press **`w`** in the terminal to open in the browser.
   - **Android emulator:** Press **`a`** (emulator must be running).
   - **iOS Simulator (Mac only):** Press **`i`** (Xcode + iOS Simulator required).

---

## Project structure

```
agrobot-soil-moisture-sensor/
├── src/
│   └── main.cpp              # ESP32: sensor read, VWC conversion, WiFi, Firebase
├── include/                  # C/C++ headers (e.g. for shared code)
├── lib/                      # Arduino/PlatformIO libraries
├── gui/                      # Farmer mobile app (Expo / React Native)
│   ├── App.js
│   ├── src/
│   │   ├── config/
│   │   │   └── firebase.js    # Firebase Realtime Database URL
│   │   ├── context/
│   │   │   └── ThemeContext.js
│   │   ├── hooks/
│   │   │   └── useMoisture.js # Live moisture + 5‑min history from Firebase
│   │   └── screens/          # Home, Moisture Meter, Crop Health, Map, Settings, About
│   └── package.json
└── README.md                 # This file
```

---

## ESP32 firmware details

- **Sensor pin:** GPIO 34 (ADC1, 12‑bit, 0–3.3 V).
- **Conversion:** Raw ADC → voltage → piecewise linear mapping to VWC % (see `convertReading()` in `main.cpp`). Values are clamped to 0+.
- **WiFi:** Connects once at startup; reconnection logic can be added if needed.
- **Firebase:** Uses **Firebase_ESP_Client**; anonymous sign‑in; writes to `/soilMoisture` and `/rawADC` every ~5 s when `Firebase.ready()`.

Change Wi‑Fi and Firebase in `src/main.cpp`:

```c
#define WIFI_SSID      "YourNetwork"
#define WIFI_PASSWORD  "YourPassword"
#define FIREBASE_URL   "https://YOUR-PROJECT-default-rtdb.firebaseio.com"
```

---

## Mobile app (gui) details

- **Expo SDK:** 54 (iOS & Android; compatible with current Expo Go).
- **Screens:**  
  **Home** → Moisture Meter, Crop Health (placeholder), Location Map (placeholder), Settings, About.
- **Moisture Meter:** Shows current VWC % from `/soilMoisture` and a 5‑minute rolling graph built from live updates.
- **Settings:** Color scheme (Forest / Earth / Sage), font size, background; stored with AsyncStorage.
- **Firebase:** Read‑only from the app; same database URL as the ESP32. Configure in `gui/src/config/firebase.js`.

---

## Security note

The example uses an open/anonymous Firebase setup suitable for development. For production:

- Set Realtime Database **rules** to restrict read/write (e.g. by auth or device).
- Do **not** commit Wi‑Fi passwords or Firebase secrets; use environment/config that stays out of the repo.

---

## License

Use and adapt as needed for your project. Replace this section with your chosen license if you publish the repo.
