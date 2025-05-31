
"use client";

import { HistoryDisplay } from '@/components/history/HistoryDisplay';
import type { SpeedTestResult } from '@/types';
import useLocalStorage from '@/hooks/use-local-storage';
import { useLanguage } from '@/contexts/LanguageProvider';

export default function HistoryPage() {
  const { t } = useLanguage();
  const [history, setHistory] = useLocalStorage<SpeedTestResult[]>('speedTestHistory', []);

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline text-center mb-8">{t('history')}</h1>
      <HistoryDisplay history={history} onClearHistory={handleClearHistory} />
    </div>
  );
}
