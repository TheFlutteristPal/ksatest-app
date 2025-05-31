
export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark';

export interface SpeedTestResult {
  id: string;
  timestamp: number;
  downloadSpeed: number; // Mbps
  uploadSpeed: number; // Mbps
  ping: number; // ms
  fileSize: number; // MB
  isp?: string;
  serverLocation?: string;
  ipv4Address?: string;
}

export interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}
