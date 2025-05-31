
"use client";

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { NETWORKING_TERMS } from '@/lib/constants';
import { defineNetworkingTerm, type DefineNetworkingTermOutput, type DefineNetworkingTermInput } from '@/ai/flows/define-networking-term';
import { useLanguage } from '@/contexts/LanguageProvider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';

export function TermDefinitionForm() {
  const { t, language } = useLanguage();
  const [selectedTerm, setSelectedTerm] = useState<string>('');
  const [definition, setDefinition] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTermChange = async (term: string) => {
    setSelectedTerm(term);
    if (term) {
      setIsLoading(true);
      setDefinition(null);
      setError(null);
      try {
        const input: DefineNetworkingTermInput = { term, language };
        const result: DefineNetworkingTermOutput = await defineNetworkingTerm(input);
        setDefinition(result.definition);
      } catch (err) {
        console.error("Error fetching definition:", err);
        setError(t('noDefinitionFound'));
      } finally {
        setIsLoading(false);
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

        {isLoading && (
          <div className="flex items-center justify-center p-6 text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin text-primary" />
            {t('loadingDefinition')}
          </div>
        )}

        {error && !isLoading && (
          <p className="text-destructive text-center p-4">{error}</p>
        )}
        
        {definition && !isLoading && (
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
      </CardContent>
    </Card>
  );
}
