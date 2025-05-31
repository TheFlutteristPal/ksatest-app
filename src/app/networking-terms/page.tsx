
"use client";

import { TermDefinitionForm } from '@/components/networking/TermDefinitionForm';
import { useLanguage } from '@/contexts/LanguageProvider';

export default function NetworkingTermsPage() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline text-center mb-8">{t('networkingTerms')}</h1>
      <TermDefinitionForm />
    </div>
  );
}
