
"use client";

import { WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageProvider';
import Link from 'next/link';

export default function OfflinePage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-4">
      <WifiOff className="w-24 h-24 text-destructive mb-6" />
      <h1 className="text-4xl font-bold font-headline mb-4">
        {t('offlineTitle') || 'You are offline'}
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        {t('offlineMessage') || 'It seems you\'ve lost your internet connection. Please check your network and try again.'}
      </p>
      <Button asChild size="lg">
        <Link href="/">{t('tryAgain') || 'Try Again'}</Link>
      </Button>
    </div>
  );
}
