
"use client";
import type { Metadata } from 'next';
import { useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import './globals.css';
import { APP_NAME, DEFAULT_LANGUAGE, DEFAULT_THEME } from '@/lib/constants';

// Metadata should be defined outside the component for static export
const metadataConfig: Metadata = {
  title: APP_NAME,
  description: 'Test your internet speed and learn about networking.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => console.log('Service Worker registered with scope:', registration.scope))
        .catch((error) => console.error('Service Worker registration failed:', error));
    }
  }, []);

  return (
    <html
      lang={DEFAULT_LANGUAGE}
      dir={DEFAULT_LANGUAGE === 'ar' ? 'rtl' : 'ltr'}
      className={DEFAULT_THEME}
    >
      <head>
        <meta name="application-name" content={APP_NAME} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={APP_NAME} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#F0F4FA" />
        <meta name="theme-color" content="#F0F4FA" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/196.png" data-ai-hint="app logo apple" />
        <link rel="shortcut icon" href="/32.png" data-ai-hint="favicon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <title>{String(metadataConfig.title)}</title>
        {metadataConfig.description && <meta name="description" content={metadataConfig.description} />}
      </head>
      <body className="font-body antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
