
"use client";

import type { Language } from '@/types';
import { DEFAULT_LANGUAGE } from '@/lib/constants';
import { translate } from '@/lib/i18n';
import React, { createContext, useState, useContext, useEffect, type ReactNode, useMemo } from 'react';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with default language to match server render
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  // State to track if we are on the client and effects have run
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after initial mount
    setIsClientSide(true);
    const storedLang = localStorage.getItem('language') as Language | null;
    if (storedLang) {
      // No need to check if storedLang !== language, setState handles no-op for same value
      setLanguageState(storedLang);
    }
  }, []); // Empty dependency array ensures it runs once on mount

  useEffect(() => {
    // This effect updates localStorage and document attributes whenever language changes 
    // and we are confirmed to be on the client side.
    if (isClientSide) {
      localStorage.setItem('language', language);
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }
  }, [language, isClientSide]);
  
  const t = useMemo(() => {
    // The `language` state will be `DEFAULT_LANGUAGE` on server and initial client render,
    // then potentially update to localStorage value after mount.
    // This ensures `t` function uses the correct language context for rendering.
    return (key: string) => translate(key, language);
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  // Memoize context value for performance
  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t,
  }), [language, t]); // setLanguage is stable from useState, not needed in deps

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
