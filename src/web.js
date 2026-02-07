// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//This imports Firebase tools - like importing libraries in C++

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjUGtNm0vE6Nba81in5B2XaQG0Ox7pR6g",
  authDomain: "esp-32-test-c2a8f.firebaseapp.com",
  databaseURL: "https://esp-32-test-c2a8f-default-rtdb.firebaseio.com",
  projectId: "esp-32-test-c2a8f",
  storageBucket: "esp-32-test-c2a8f.firebasestorage.app",
  messagingSenderId: "438553226611",
  appId: "1:438553226611:web:f06dc33f0bac2934f72906",
  measurementId: "G-LBW3NVNPET"
};
//This is your project's "address book"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const soilMoistureRef = ref(database, 'soilMoisture');
const rawADCRef = ref(database, 'rawADC');
//creates pointer to /soilMoisture and /rawADC in the database
//This initializes the connection to Firebase and allows you to use its tools

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