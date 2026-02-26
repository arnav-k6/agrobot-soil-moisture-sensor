import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Use same Realtime Database as ESP32 (main.cpp)
const firebaseConfig = {
  databaseURL: 'https://esp-32-test-c2a8f-default-rtdb.firebaseio.com',
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
