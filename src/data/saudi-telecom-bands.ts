
export interface TelecomBand {
  provider: string;
  band: string;
  frequency: string;
  type: string; // e.g., 4G LTE, 5G NR
}

export const saudiTelecomBands: TelecomBand[] = [
  { provider: "STC", band: "n78", frequency: "3500 MHz", type: "5G NR" },
  { provider: "STC", band: "n41", frequency: "2500 MHz", type: "5G NR" },
  { provider: "STC", band: "1", frequency: "2100 MHz", type: "4G LTE" },
  { provider: "STC", band: "3", frequency: "1800 MHz", type: "4G LTE" },
  { provider: "STC", band: "28", frequency: "700 MHz", type: "4G LTE" },
  { provider: "Mobily", band: "n78", frequency: "3500 MHz", type: "5G NR" },
  { provider: "Mobily", band: "n1", frequency: "2100 MHz", type: "5G NR" },
  { provider: "Mobily", band: "1", frequency: "2100 MHz", type: "4G LTE" },
  { provider: "Mobily", band: "3", frequency: "1800 MHz", type: "4G LTE" },
  { provider: "Mobily", band: "8", frequency: "900 MHz", type: "4G LTE" },
  { provider: "Zain", band: "n78", frequency: "3500 MHz", type: "5G NR" },
  { provider: "Zain", band: "n40", frequency: "2300 MHz", type: "5G NR (TDD)" },
  { provider: "Zain", band: "1", frequency: "2100 MHz", type: "4G LTE" },
  { provider: "Zain", band: "3", frequency: "1800 MHz", type: "4G LTE" },
  { provider: "Zain", band: "40", frequency: "2300 MHz", type: "4G LTE (TDD)" },
  { provider: "Virgin Mobile", band: "Uses STC network", frequency: "-", type: "MVNO" },
  { provider: "Lebara", band: "Uses Mobily network", frequency: "-", type: "MVNO" },
];
