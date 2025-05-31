
"use client";

import { saudiTelecomBands, type TelecomBand } from '@/data/saudi-telecom-bands';
import { useLanguage } from '@/contexts/LanguageProvider';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wifi, Signal, Gauge, Zap } from 'lucide-react';


export function TelecomBandsTable() {
  const { t } = useLanguage();

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">{t('saudiTelecomBands')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><Wifi className="inline-block ltr:mr-1 rtl:ml-1 h-4 w-4" />{t('provider')}</TableHead>
                <TableHead><Signal className="inline-block ltr:mr-1 rtl:ml-1 h-4 w-4" />{t('band')}</TableHead>
                <TableHead><Gauge className="inline-block ltr:mr-1 rtl:ml-1 h-4 w-4" />{t('frequency')}</TableHead>
                <TableHead><Zap className="inline-block ltr:mr-1 rtl:ml-1 h-4 w-4" />{t('type')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {saudiTelecomBands.map((bandInfo, index) => (
                <TableRow key={`${bandInfo.provider}-${bandInfo.band}-${index}`}>
                  <TableCell className="font-medium">{bandInfo.provider}</TableCell>
                  <TableCell>{bandInfo.band}</TableCell>
                  <TableCell>{bandInfo.frequency}</TableCell>
                  <TableCell>{bandInfo.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
