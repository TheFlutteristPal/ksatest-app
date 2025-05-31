
"use client";

import Link from 'next/link';
import { Zap } from 'lucide-react';
import { NavLink } from './NavLink';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '@/contexts/LanguageProvider';
import { APP_NAME } from '@/lib/constants';

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline sm:inline-block">{t('appName')}</span>
        </Link>
        <nav className="flex items-center space-x-1.5 sm:space-x-3 text-sm flex-1">
          <NavLink href="/">{t('speedTest')}</NavLink>
          <NavLink href="/history">{t('history')}</NavLink>
          <NavLink href="/networking-terms">{t('networkingTerms')}</NavLink>
          <NavLink href="/telecom-bands">{t('telecomBands')}</NavLink>
        </nav>
        <div className="flex items-center space-x-1">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
