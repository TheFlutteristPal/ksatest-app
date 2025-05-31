
"use client";

import type { Theme } from '@/types';
import { DEFAULT_THEME } from '@/lib/constants';
import React, { createContext, useState, useContext, useEffect, type ReactNode, useMemo } from 'react';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with default theme to match server render
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  // State to track if we are on the client and effects have run
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after initial mount
    setIsClientSide(true);
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setThemeState(storedTheme);
    }
  }, []); // Empty dependency array ensures it runs once on mount

  useEffect(() => {
    // This effect updates localStorage and document attributes whenever theme changes
    // and we are confirmed to be on the client side.
    if (isClientSide) {
      const root = window.document.documentElement;
      if (theme === 'light') {
        root.classList.remove('dark');
        root.classList.add('light');
      } else {
        root.classList.remove('light');
        root.classList.add('dark');
      }
      localStorage.setItem('theme', theme);
    }
  }, [theme, isClientSide]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Memoize context value for performance
  const contextValue = useMemo(() => ({
    theme,
    setTheme,
  }), [theme]); // setTheme is stable from useState, not needed in deps

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
