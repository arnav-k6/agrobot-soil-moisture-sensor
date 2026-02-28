// config/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your Firebase config (what Firebase gave you)
const firebaseConfig = {
  apiKey: "AIzaSyAWyyrtlYPqRyccJCIUzaeStCAntryqQ5U",
  authDomain: "agrobot-ab7d4.firebaseapp.com",
  databaseURL: "https://agrobot-ab7d4-default-rtdb.firebaseio.com",
  projectId: "agrobot-ab7d4",
  storageBucket: "agrobot-ab7d4.firebasestorage.app",
  messagingSenderId: "258957735530",
  appId: "1:258957735530:web:29af3cac4e54f4da3dfc13",
};

// Initialize Firebase ONCE
const app = initializeApp(firebaseConfig);

// ✅ This is what your hook expects
export const database = getDatabase(app);