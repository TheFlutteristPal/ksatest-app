
import type { Language, Theme } from '@/types';

export const NETWORKING_TERMS: string[] = [
  "RSRP", "RSRQ", "5G SINR", "PCI", "LTE", "5G SIGNAL STRENGTH",
  "4G SIGNAL STRENGTH", "5G SA", "5G NSA", "IMEI",
  "4G/5G CONNECTED BAND", "4G SINR", "CELL ID", "ECIO", "LAC",
  "MCC", "MNC", "GSM", "HSDPA", "TAC", "H+", "ASU", "IP",
  "IPV4 AND IPV6"
];

export const FILE_SIZES: number[] = [1, 5, 10, 50, 100]; // MB

export const LANGUAGES: { code: Language; name: string }[] = [
  { code: 'ar', name: 'العربية' },
  { code: 'en', name: 'English' },
];

export const DEFAULT_LANGUAGE: Language = 'ar';
export const DEFAULT_THEME: Theme = 'light';

export const APP_NAME = "ksatest";
