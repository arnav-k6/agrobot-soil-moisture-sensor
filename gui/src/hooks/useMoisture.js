import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../config/firebase';

const FIVE_MINS_MS = 5 * 60 * 1000;
const MAX_POINTS = 60; // ~1 point every 5s for 5 mins if ESP32 sends every 5s

export function useMoisture() {
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const moistureRef = ref(database, '/soilMoisture');
    const unsub = onValue(
      moistureRef,
      (snapshot) => {
        setLoading(false);
        const val = snapshot.val();
        if (val != null) {
          const num = typeof val === 'number' ? val : parseFloat(val);
          setCurrent(num);
          setHistory((prev) => {
            const next = [...prev, { time: Date.now(), value: num }];
            const cutoff = Date.now() - FIVE_MINS_MS;
            const trimmed = next.filter((p) => p.time >= cutoff);
            if (trimmed.length > MAX_POINTS) return trimmed.slice(-MAX_POINTS);
            return trimmed;
          });
        }
        setError(null);
      },
      (err) => {
        setLoading(false);
        setError(err?.message || 'Failed to read moisture');
      }
    );
    return () => unsub();
  }, []);

  return { current, history, loading, error };
}
