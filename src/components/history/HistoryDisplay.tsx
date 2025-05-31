
"use client";

import type { SpeedTestResult } from '@/types';
import { useLanguage } from '@/contexts/LanguageProvider';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Trash2, Download, Upload, Zap as PingIcon, FileBox, CalendarDays, Server, Wifi } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface HistoryDisplayProps {
  history: SpeedTestResult[];
  onClearHistory: () => void;
}

export function HistoryDisplay({ history, onClearHistory }: HistoryDisplayProps) {
  const { t, language } = useLanguage();

  if (history.length === 0) {
    return <p className="text-center text-muted-foreground">{t('noHistory')}</p>;
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-headline">{t('testHistory')}</CardTitle>
        <Button variant="destructive" size="sm" onClick={onClearHistory} aria-label={t('clearHistory')}>
          <Trash2 className="mr-2 h-4 w-4" /> {t('clearHistory')}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><CalendarDays className="inline-block mr-1 h-4 w-4" />{t('date')}</TableHead>
                <TableHead className="text-center"><Download className="inline-block mr-1 h-4 w-4" />{t('download')} ({t('mbps')})</TableHead>
                <TableHead className="text-center"><Upload className="inline-block mr-1 h-4 w-4" />{t('upload')} ({t('mbps')})</TableHead>
                <TableHead className="text-center"><PingIcon className="inline-block mr-1 h-4 w-4" />{t('ping')} ({t('ms')})</TableHead>
                <TableHead className="text-center"><FileBox className="inline-block mr-1 h-4 w-4" />{t('fileSize')} (MB)</TableHead>
                <TableHead><Wifi className="inline-block mr-1 h-4 w-4" />{t('isp')}</TableHead>
                <TableHead><Server className="inline-block mr-1 h-4 w-4" />{t('server')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((result) => (
                <TableRow key={result.id}>
                  <TableCell>{formatDate(result.timestamp)}</TableCell>
                  <TableCell className="text-center font-medium text-primary">{result.downloadSpeed}</TableCell>
                  <TableCell className="text-center font-medium text-primary">{result.uploadSpeed}</TableCell>
                  <TableCell className="text-center font-medium text-primary">{result.ping}</TableCell>
                  <TableCell className="text-center">{result.fileSize}</TableCell>
                  <TableCell>{result.isp || "N/A"}</TableCell>
                  <TableCell>{result.serverLocation || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
