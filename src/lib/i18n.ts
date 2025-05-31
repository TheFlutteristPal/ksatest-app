
import type { Language, Translations } from '@/types';

export const translations: Translations = {
  appName: { en: 'NetGauge Pro', ar: 'نت جيج برو' },
  speedTest: { en: 'Speed Test', ar: 'اختبار السرعة' },
  history: { en: 'History', ar: 'السجل' },
  networkingTerms: { en: 'Networking Terms', ar: 'مصطلحات الشبكات' },
  telecomBands: { en: 'Telecom Bands', ar: 'نطاقات الاتصالات' },
  settings: { en: 'Settings', ar: 'الإعدادات' },
  download: { en: 'Download', ar: 'التحميل' },
  upload: { en: 'Upload', ar: 'الرفع' },
  ping: { en: 'Ping', ar: 'البنق' },
  mbps: { en: 'Mbps', ar: ' ميجابت/ثانية' },
  ms: { en: 'ms', ar: 'مللي ثانية' },
  selectFileSize: { en: 'Select File Size (MB)', ar: 'اختر حجم الملف (ميجابايت)' },
  startTest: { en: 'Start Test', ar: 'ابدأ الاختبار' },
  isp: { en: 'ISP', ar: 'مزود الخدمة' },
  server: { en: 'Server', ar: 'الخادم' },
  ipAddress: { en: 'IP Address', ar: 'عنوان IP' },
  selectTerm: { en: 'Select a term', ar: 'اختر مصطلحًا' },
  definition: { en: 'Definition', ar: 'التعريف' },
  loadingDefinition: { en: 'Loading definition...', ar: 'جاري تحميل التعريف...' },
  noDefinitionFound: { en: 'No definition found.', ar: 'لم يتم العثور على تعريف.' },
  testHistory: { en: 'Test History', ar: 'سجل الاختبارات' },
  noHistory: { en: 'No test history yet.', ar: 'لا يوجد سجل اختبارات حتى الآن.' },
  date: { en: 'Date', ar: 'التاريخ' },
  fileSize: { en: 'File Size', ar: 'حجم الملف' },
  clearHistory: { en: 'Clear History', ar: 'مسح السجل' },
  provider: { en: 'Provider', ar: 'المزود' },
  band: { en: 'Band', ar: 'النطاق' },
  frequency: { en: 'Frequency', ar: 'التردد' },
  type: { en: 'Type', ar: 'النوع' },
  saudiTelecomBands: { en: 'Saudi Telecom Bands', ar: 'نطاقات الاتصالات السعودية' },
  theme: { en: 'Theme', ar: 'المظهر' },
  language: { en: 'Language', ar: 'اللغة' },
  light: { en: 'Light', ar: 'فاتح' },
  dark: { en: 'Dark', ar: 'داكن' },
  testingInProgress: { en: 'Testing in progress...', ar: 'جاري الاختبار...' },
  simulatingSpeedTest: { en: 'Simulating speed test. This is not a real measurement.', ar: 'محاكاة اختبار السرعة. هذا ليس قياسًا حقيقيًا.'},
  loadingIsp: { en: 'Loading ISP...', ar: 'جاري تحميل مزود الخدمة...' },
  loadingServer: { en: 'Loading server location...', ar: 'جاري تحميل موقع الخادم...' },
  loadingIpAddress: { en: 'Loading IP address...', ar: 'جاري تحميل عنوان IP...' },
  unavailableIsp: { en: 'ISP unavailable', ar: 'مزود الخدمة غير متوفر' },
  unavailableServer: { en: 'Server location unavailable', ar: 'موقع الخادم غير متوفر' },
  unavailableIpAddress: { en: 'IP address unavailable', ar: 'عنوان IP غير متوفر' },
};

export const translate = (key: string, lang: Language): string => {
  const translationSet = translations[key];
  if (translationSet && translationSet[lang]) {
    return translationSet[lang];
  }
  // Fallback for missing keys or language versions to avoid crashes
  console.warn(`Translation missing for key: "${key}" in language: "${lang}"`);
  return key;
};
