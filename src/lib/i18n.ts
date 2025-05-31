
import type { Language, Translations } from '@/types';

export const translations: Translations = {
  appName: { en: 'ksatest', ar: 'ksatest' },
  speedTest: { en: 'Speed Test', ar: 'اختبار السرعة' },
  networkingTerms: { en: 'Networking Terms', ar: 'مصطلحات الشبكات' },
  telecomBands: { en: 'Telecom Bands', ar: 'نطاقات الاتصالات' },
  settings: { en: 'Settings', ar: 'الإعدادات' },
  download: { en: 'Download', ar: 'التحميل' },
  upload: { en: 'Upload', ar: 'الرفع' },
  idleLatency: { en: 'Idle Latency (Ping)', ar: 'زمن الاستجابة (الخمول - Ping)' },
  mbps: { en: 'Mbps', ar: ' ميجابت/ثانية' },
  ms: { en: 'ms', ar: 'مللي ثانية' },
  selectFileSize: { en: 'Select File Size (MB)', ar: 'اختر حجم الملف (ميجابايت)' },
  startTest: { en: 'Start Test', ar: 'ابدأ الاختبار' },
  isp: { en: 'ISP', ar: 'مزود الخدمة' },
  server: { en: 'Server', ar: 'الخادم' },
  ipv4AddressLabel: { en: 'IPv4 Address', ar: 'عنوان IPv4' },
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
  loadingIsp: { en: 'Loading ISP...', ar: 'جاري تحميل مزود الخدمة...' },
  loadingServer: { en: 'Loading server location...', ar: 'جاري تحميل موقع الخادم...' },
  loadingIpv4Address: { en: 'Loading IPv4...', ar: 'جاري تحميل IPv4...' },
  unavailableIsp: { en: 'ISP unavailable', ar: 'مزود الخدمة غير متوفر' },
  unavailableServer: { en: 'Server location unavailable', ar: 'موقع الخادم غير متوفر' },
  unavailableIpv4Address: { en: 'IPv4 unavailable', ar: 'IPv4 غير متوفر' },
  testComplete: { en: 'Test Complete', ar: 'اكتمل الاختبار' },
  uploadRemovedNotice: { en: 'Upload test is currently simulated client-side. A real measurement requires a server endpoint.', ar: 'اختبار الرفع حاليًا محاكاة من جانب العميل. القياس الحقيقي يتطلب نقطة نهاية على الخادم.'},
  offlineTitle: { en: 'You are offline', ar: 'أنت غير متصل بالإنترنت' },
  offlineMessage: { en: "It seems you've lost your internet connection. Please check your network and try again.", ar: 'يبدو أنك فقدت الاتصال بالإنترنت. يرجى التحقق من شبكتك والمحاولة مرة أخرى.'},
  tryAgain: { en: 'Try Again', ar: 'حاول مرة أخرى' },
  installApp: { en: 'Install App', ar: 'تثبيت التطبيق' },
  changeLanguage: { en: 'Change language', ar: 'تغيير اللغة'},
  switchToDarkTheme: { en: 'Switch to dark theme', ar: 'التحويل إلى المظهر الداكن'},
  switchToLightTheme: { en: 'Switch to light theme', ar: 'التحويل إلى المظهر الفاتح'},
};

export const translate = (key: string, lang: Language): string => {
  const translationSet = translations[key];
  if (translationSet && translationSet[lang]) {
    return translationSet[lang];
  }
  console.warn(`Translation missing for key: "${key}" in language: "${lang}"`);
  // Fallback to English if the specific language translation is missing for the key
  if (translations[key] && translations[key]['en']) {
    return translations[key]['en'];
  }
  return key; // Return the key itself if no English fallback either
};
