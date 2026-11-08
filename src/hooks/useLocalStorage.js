import { useEffect, useState } from 'react';

function readValue(key, initialValue) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? initialValue : JSON.parse(raw);
  } catch {
    return initialValue; // missing or corrupted value
  }
}

// Same call shape as useState: const [value, setValue] = useLocalStorage(key, initial)
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readValue(key, initialValue));

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage can be full or blocked; the app still works without it
    }
  }, [key, value]);

  return [value, setValue];
}
