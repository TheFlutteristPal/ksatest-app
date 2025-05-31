
import type { Language } from '@/types';

export interface TermDefinition {
  en: string;
  ar: string;
}

export const NETWORKING_TERM_DEFINITIONS: Record<string, TermDefinition> = {
  "RSRP": {
    en: "Reference Signal Received Power: The average power of downlink cell-specific reference signals. Indicates signal strength. Measured in dBm.",
    ar: "قوة إشارة المرجع المستلمة: متوسط طاقة إشارات المرجع الخاصة بالخلية في الوصلة الهابطة. يشير إلى قوة الإشارة. تقاس بالديسيبل ميلي واط."
  },
  "RSRQ": {
    en: "Reference Signal Received Quality: Indicates the quality of the received reference signals. Considers both strength (RSRP) and interference (RSSI). Measured in dB.",
    ar: "جودة إشارة المرجع المستلمة: تشير إلى جودة إشارات المرجع المستقبلة. تأخذ في الاعتبار القوة (RSRP) والتداخل (RSSI). تقاس بالديسيبل."
  },
  "5G SINR": {
    en: "Signal to Interference plus Noise Ratio (5G): Measures the quality of the 5G signal by comparing the strength of the desired signal to the sum of interference and noise. Higher is better.",
    ar: "نسبة الإشارة إلى التداخل والضوضاء (5G): تقيس جودة إشارة الجيل الخامس بمقارنة قوة الإشارة المطلوبة بمجموع التداخل والضوضاء. الأعلى أفضل."
  },
  "PCI": {
    en: "Physical Cell Identity: A unique physical layer identifier (0-503 for LTE, 0-1007 for 5G NR) for a cell within a mobile network, used to differentiate neighboring cells.",
    ar: "هوية الخلية الفيزيائية: معرّف فريد للطبقة الفيزيائية (0-503 لـ LTE، 0-1007 لـ 5G NR) للخلية داخل شبكة الهاتف المحمول، يستخدم للتمييز بين الخلايا المجاورة."
  },
  "LTE": {
    en: "Long-Term Evolution: A standard for wireless broadband communication for mobile devices and data terminals, based on GSM/EDGE and UMTS/HSPA technologies. Often marketed as 4G LTE.",
    ar: "التطور طويل الأمد: معيار للاتصالات اللاسلكية ذات النطاق العريض للأجهزة المحمولة ومحطات البيانات، يعتمد على تقنيات GSM/EDGE و UMTS/HSPA. غالبًا ما يتم تسويقه كـ 4G LTE."
  },
  "5G SIGNAL STRENGTH": {
    en: "Overall strength of the 5G signal received by the device. Key metrics include RSRP (Reference Signal Received Power) and SINR (Signal-to-Interference-plus-Noise Ratio).",
    ar: "القوة الإجمالية لإشارة الجيل الخامس التي يستقبلها الجهاز. تشمل المقاييس الرئيسية RSRP (قوة إشارة المرجع المستلمة) و SINR (نسبة الإشارة إلى التداخل والضوضاء)."
  },
  "4G SIGNAL STRENGTH": {
    en: "Overall strength of the 4G (LTE) signal received by the device. Key metrics include RSRP (Reference Signal Received Power) and RSRQ (Reference Signal Received Quality).",
    ar: "القوة الإجمالية لإشارة الجيل الرابع (LTE) التي يستقبلها الجهاز. تشمل المقاييس الرئيسية RSRP (قوة إشارة المرجع المستلمة) و RSRQ (جودة إشارة المرجع المستلمة)."
  },
  "5G SA": {
    en: "5G Standalone: A 5G network architecture where the 5G Radio Access Network (RAN) connects directly to a 5G core network (5GC), independent of the 4G LTE core.",
    ar: "الجيل الخامس المستقل: بنية شبكة جيل خامس حيث تتصل شبكة الوصول الراديوي (RAN) للجيل الخامس مباشرة بنواة شبكة جيل خامس (5GC)، مستقلة عن نواة الجيل الرابع LTE."
  },
  "5G NSA": {
    en: "5G Non-Standalone: An earlier deployment model for 5G where the 5G New Radio (NR) air interface is used along with the existing 4G LTE core network (EPC).",
    ar: "الجيل الخامس غير المستقل: نموذج نشر مبكر للجيل الخامس حيث يتم استخدام واجهة الهواء الراديوية الجديدة (NR) للجيل الخامس مع نواة شبكة الجيل الرابع LTE الحالية (EPC)."
  },
  "IMEI": {
    en: "International Mobile Equipment Identity: A unique 15-digit number to identify mobile phones and some satellite phones. Used for tracking and blocking stolen devices.",
    ar: "الهوية الدولية للأجهزة المتنقلة: رقم فريد مكون من 15 رقمًا لتعريف الهواتف المحمولة وبعض هواتف الأقمار الصناعية. يستخدم لتعقب وحظر الأجهزة المسروقة."
  },
  "4G/5G CONNECTED BAND": {
    en: "The specific frequency band (e.g., LTE Band 3, 5G NR Band n78) the device is currently using for its 4G or 5G connection. Different bands have different characteristics (coverage, capacity).",
    ar: "نطاق التردد المحدد (مثل نطاق LTE B3، نطاق 5G NR n78) الذي يستخدمه الجهاز حاليًا لاتصاله بالجيل الرابع أو الخامس. للنطاقات المختلفة خصائص مختلفة (تغطية، سعة)."
  },
  "4G SINR": {
    en: "Signal to Interference plus Noise Ratio (4G/LTE): Measures the quality of the 4G (LTE) signal by comparing the desired signal strength to the level of interference and noise. Higher is better.",
    ar: "نسبة الإشارة إلى التداخل والضوضاء (4G/LTE): تقيس جودة إشارة الجيل الرابع (LTE) بمقارنة قوة الإشارة المطلوبة بمستوى التداخل والضوضاء. الأعلى أفضل."
  },
  "CELL ID": {
    en: "Cell Identifier (CI or CID): A unique identifier for a cell (base station sector) within a Location Area (for GSM/UMTS) or Tracking Area (for LTE/5G).",
    ar: "معرف الخلية (CI أو CID): معرف فريد للخلية (قطاع المحطة الأساسية) داخل منطقة الموقع (لـ GSM/UMTS) أو منطقة التتبع (لـ LTE/5G)."
  },
  "ECIO": {
    en: "Energy per Chip to Interference Power Ratio (Ec/Io): A measure of signal quality in UMTS (3G) networks, indicating the ratio of received energy per chip of the desired signal to the total received power from other cells and noise. Lower (more negative) values are better.",
    ar: "نسبة الطاقة لكل رقاقة إلى قدرة التداخل (Ec/Io): مقياس لجودة الإشارة في شبكات UMTS (الجيل الثالث)، يشير إلى نسبة الطاقة المستقبلة لكل رقاقة من الإشارة المطلوبة إلى إجمالي القدرة المستقبلة من الخلايا الأخرى والضوضاء. القيم الأقل (أكثر سلبية) أفضل."
  },
  "LAC": {
    en: "Location Area Code: Part of the Location Area Identifier (LAI) used in GSM and UMTS networks. It identifies a group of base stations within which a mobile device can move without needing to update its location with the network.",
    ar: "رمز منطقة الموقع: جزء من معرّف منطقة الموقع (LAI) المستخدم في شبكات GSM و UMTS. يحدد مجموعة من المحطات الأساسية يمكن للجهاز المحمول التحرك ضمنها دون الحاجة لتحديث موقعه مع الشبكة."
  },
  "MCC": {
    en: "Mobile Country Code: A three-digit code that uniquely identifies a country in mobile networks (e.g., 420 for Saudi Arabia). Part of the IMSI and LAI/TAI.",
    ar: "رمز البلد المتنقل: رمز مكون من ثلاثة أرقام يحدد بشكل فريد بلدًا في شبكات الهاتف المحمول (مثل 420 للمملكة العربية السعودية). جزء من IMSI و LAI/TAI."
  },
  "MNC": {
    en: "Mobile Network Code: A two or three-digit code used in combination with the MCC to uniquely identify a mobile network operator (e.g., 01 for STC in Saudi Arabia). Part of IMSI and LAI/TAI.",
    ar: "رمز شبكة الهاتف المحمول: رمز مكون من رقمين أو ثلاثة أرقام يستخدم مع رمز البلد المتنقل (MCC) لتحديد مشغل شبكة للهاتف المحمول بشكل فريد (مثل 01 لـ STC في المملكة العربية السعودية). جزء من IMSI و LAI/TAI."
  },
  "GSM": {
    en: "Global System for Mobile Communications: A standard for second-generation (2G) digital cellular networks, widely used for voice calls and SMS.",
    ar: "النظام العالمي للاتصالات المتنقلة: معيار لشبكات الجيل الثاني (2G) الخلوية الرقمية، يستخدم على نطاق واسع للمكالمات الصوتية والرسائل القصيرة."
  },
  "HSDPA": {
    en: "High-Speed Downlink Packet Access: An enhanced 3G (UMTS) mobile communication protocol allowing higher data transfer speeds for downloads. Part of HSPA family.",
    ar: "الوصول عالي السرعة لحزم البيانات في الوصلة الهابطة: بروتوكول اتصالات متنقلة محسّن من الجيل الثالث (UMTS) يسمح بسرعات نقل بيانات أعلى للتنزيلات. جزء من عائلة HSPA."
  },
  "TAC": {
    en: "Tracking Area Code: A 16-bit number part of the Tracking Area Identity (TAI) used in LTE/4G and 5G networks. It identifies a tracking area, which is a group of cells where a device can move without performing frequent location updates.",
    ar: "رمز منطقة التتبع: رقم مكون من 16 بت وهو جزء من هوية منطقة التتبع (TAI) المستخدمة في شبكات LTE/4G و 5G. يحدد منطقة تتبع، وهي مجموعة من الخلايا يمكن للجهاز التحرك ضمنها دون إجراء تحديثات متكررة للموقع."
  },
  "H+": {
    en: "HSPA+ (Evolved High-Speed Packet Access): An evolution of HSPA 3G technology, offering faster data rates than basic HSPA. Often considered 3.5G or an early step towards 4G.",
    ar: "HSPA+ (الوصول عالي السرعة المحسّن لحزم البيانات): تطور لتقنية HSPA 3G، يوفر معدلات بيانات أسرع من HSPA الأساسي. غالبًا ما يعتبر 3.5G أو خطوة مبكرة نحو 4G."
  },
  "ASU": {
    en: "Arbitrary Strength Unit: An integer value proportional to the received signal strength (RSRP or RSSI) measured by the mobile phone. The formula to convert ASU to dBm varies depending on the radio access technology (GSM, UMTS, LTE, 5G NR).",
    ar: "وحدة القوة العشوائية: قيمة عدد صحيح تتناسب مع قوة الإشارة المستقبلة (RSRP أو RSSI) التي يقيسها الهاتف المحمول. تختلف صيغة تحويل ASU إلى ديسيبل ميلي واط اعتمادًا على تقنية الوصول الراديوي (GSM، UMTS، LTE، 5G NR)."
  },
  "IP": {
    en: "Internet Protocol: The principal communications protocol in the Internet protocol suite for addressing and routing datagrams (packets) across network boundaries.",
    ar: "بروتوكول الإنترنت: بروتوكول الاتصالات الرئيسي في مجموعة بروتوكولات الإنترنت لعنونة وتوجيه مخططات البيانات (الحزم) عبر حدود الشبكة."
  },
  "IPV4 AND IPV6": {
    en: "IPv4 (Internet Protocol version 4) uses 32-bit addresses. IPv6 (Internet Protocol version 6) uses 128-bit addresses and was developed to address IPv4 address exhaustion and provide other improvements.",
    ar: "IPv4 (بروتوكول الإنترنت الإصدار 4) يستخدم عناوين 32 بت. IPv6 (بروتوكول الإنترنت الإصدار 6) يستخدم عناوين 128 بت وتم تطويره لمعالجة نفاذ عناوين IPv4 وتوفير تحسينات أخرى."
  }
};

