
"use client";

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { NETWORKING_TERMS } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageProvider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NETWORKING_TERM_DEFINITIONS } from '@/data/networking-term-definitions';
import type { Language } from '@/types';

export function TermDefinitionForm() {
  const { t, language } = useLanguage();
  const [selectedTerm, setSelectedTerm] = useState<string>('');
  const [definition, setDefinition] = useState<string | null>(null);

  const handleTermChange = (term: string) => {
    setSelectedTerm(term);
    if (term) {
      const termDefinition = NETWORKING_TERM_DEFINITIONS[term];
      if (termDefinition) {
        setDefinition(termDefinition[language as Language]);
      } else {
        setDefinition(t('noDefinitionFound'));
      }
    } else {
      setDefinition(null);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">{t('networkingTerms')}</CardTitle>
        <CardDescription>{t('selectTerm')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="term-select">{t('selectTerm')}</Label>
          <Select value={selectedTerm} onValueChange={handleTermChange}>
            <SelectTrigger id="term-select" className="w-full">
              <SelectValue placeholder={t('selectTerm')} />
            </SelectTrigger>
            <SelectContent>
              {NETWORKING_TERMS.map((term) => (
                <SelectItem key={term} value={term}>
                  {term}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {definition && (
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle className="text-lg font-medium">{selectedTerm}</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-40">
                <p className="text-sm leading-relaxed whitespace-pre-wrap rtl:text-right">{definition}</p>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        {!definition && selectedTerm && (
           <p className="text-muted-foreground text-center p-4">{t('noDefinitionFound')}</p>
        )}
      </CardContent>
    </Card>
  );
}

