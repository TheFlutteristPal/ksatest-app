
"use client";

import { TelecomBandsTable } from '@/components/networking/TelecomBandsTable';
import { useLanguage } from '@/contexts/LanguageProvider';

export default function TelecomBandsPage() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline text-center mb-8">{t('telecomBands')}</h1>
      <TelecomBandsTable />
    </div>
  );
}
