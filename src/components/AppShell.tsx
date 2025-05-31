
"use client"; // This needs to be a client component to use context providers

import type { ReactNode } from 'react';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import { LanguageProvider } from '@/contexts/LanguageProvider';
import { Header } from '@/components/layout/Header';
import { Toaster } from "@/components/ui/toaster";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto py-8">
            {children}
          </main>
           <Toaster />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
