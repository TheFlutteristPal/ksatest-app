
"use client";

import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Step 1: Initialize state with initialValue.
  // This ensures the server and the client's first render are consistent.
  const [value, setValue] = useState<T>(initialValue);

  // Step 2: Effect to read from localStorage and update state.
  // Runs only on the client, after the component has mounted.
  useEffect(() => {
    // Checking typeof window is a good practice, though useEffect only runs on client.
    if (typeof window === 'undefined') {
      return;
    }
    try {
      const item = window.localStorage.getItem(key);
      // If item exists in localStorage, parse it and update state.
      // Otherwise, 'value' remains 'initialValue'.
      if (item !== null) {
        setValue(JSON.parse(item));
      }
    } catch (error) {
      // Log error and proceed with initialValue or current value.
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]); // Only re-run if the key changes. initialValue is not needed here as it's for initial state.

  // Step 3: Effect to write to localStorage when 'value' changes.
  // Runs only on the client.
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, value]); // Re-run if key or value changes.

  return [value, setValue];
}

export default useLocalStorage;
