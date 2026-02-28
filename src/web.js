import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue } from "firebase/database";

// Configuration pulling from .env file
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// References to your data paths
const soilMoistureRef = ref(database, 'soilMoisture');
const rawADCRef = ref(database, 'rawADC');

// Listen for soil moisture changes
onValue(soilMoistureRef, (snapshot) => {
  const vwc = snapshot.val();
  console.log("Soil Moisture (VWC %):", vwc);
});

// Listen for raw ADC changes
onValue(rawADCRef, (snapshot) => {
  const adc = snapshot.val();
  console.log("Raw ADC:", adc);
});