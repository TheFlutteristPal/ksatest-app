
"use client";

import type { ReactNode } from 'react';
import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import type { Language } from '@/types'; // Assuming Language might be needed for future i18n in this provider
import { useLanguage } from './LanguageProvider'; // For translations

// Define the shape of the BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PwaInstallContextType {
  canInstall: boolean;
  triggerInstallPrompt: () => void;
}

const PwaInstallContext = createContext<PwaInstallContextType | undefined>(undefined);

export const PwaInstallProvider = ({ children }: { children: ReactNode }) => {
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    setIsClientSide(true); // Ensure this runs only client-side
  }, []);

  useEffect(() => {
    if (!isClientSide) return;

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault(); // Prevent the mini-infobar from appearing
      setInstallPromptEvent(event as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      setInstallPromptEvent(null); // Clear the prompt once installed
    };
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isClientSide]);

  const triggerInstallPrompt = useCallback(async () => {
    if (!installPromptEvent) {
      return;
    }
    installPromptEvent.prompt(); // Show the browser's install prompt
    const { outcome } = await installPromptEvent.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the PWA installation');
    } else {
      console.log('User dismissed the PWA installation');
    }
    // The event can only be used once.
    setInstallPromptEvent(null);
  }, [installPromptEvent]);

  const contextValue = useMemo(() => ({
    canInstall: !!installPromptEvent,
    triggerInstallPrompt,
  }), [installPromptEvent, triggerInstallPrompt]);

  return (
    <PwaInstallContext.Provider value={contextValue}>
      {children}
    </PwaInstallContext.Provider>
  );
};

export const usePwaInstall = (): PwaInstallContextType => {
  const context = useContext(PwaInstallContext);
  if (context === undefined) {
    throw new Error('usePwaInstall must be used within a PwaInstallProvider');
  }
  return context;
};
