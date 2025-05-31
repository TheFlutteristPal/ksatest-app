
"use client";

import Link from 'next/link';
import { Gauge, DownloadCloud } from 'lucide-react'; // Added DownloadCloud icon
import { NavLink } from './NavLink';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '@/contexts/LanguageProvider';
import { usePwaInstall } from '@/contexts/PwaInstallProvider'; // Import usePwaInstall hook
import { APP_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/button'; // Import Button component

export function Header() {
  const { t } = useLanguage();
  const { canInstall, triggerInstallPrompt } = usePwaInstall(); // Get PWA install state and function

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Gauge className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline sm:inline-block">{t('appName')}</span>
        </Link>
        <nav className="flex items-center space-x-1.5 sm:space-x-3 text-sm flex-1">
          <NavLink href="/">{t('speedTest')}</NavLink>
          <NavLink href="/networking-terms">{t('networkingTerms')}</NavLink>
          <NavLink href="/telecom-bands">{t('telecomBands')}</NavLink>
        </nav>
        <div className="flex items-center space-x-1">
          {canInstall && (
            <Button
              variant="ghost"
              size="icon"
              onClick={triggerInstallPrompt}
              aria-label={t('installApp')}
              title={t('installApp')}
              className="hidden sm:inline-flex" // Optionally hide on very small screens if space is tight
            >
              <DownloadCloud className="h-5 w-5" />
            </Button>
          )}
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
