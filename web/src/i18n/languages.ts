export const languageOrder = [
  'en',
  'es',
  'zh',
  'pt',
  'it',
  'de',
  'ru',
  'ar',
  'ja',
  'ko',
  'he',
  'tr',
] as const;

export type SupportedLanguage = (typeof languageOrder)[number];

export const languageLabels: Record<SupportedLanguage, string> = {
  en: 'English',
  es: 'Español',
  zh: '中文（简体）',
  pt: 'Português',
  it: 'Italiano',
  de: 'Deutsch',
  ru: 'Русский',
  ar: 'العربية',
  ja: '日本語',
  ko: '한국어',
  he: 'עברית',
  tr: 'Türkçe',
};

export type LanguageContinent = 'americas' | 'europe' | 'asia' | 'middleEast';

export const languageContinents: {
  id: LanguageContinent;
  labelKey: string;
  codes: readonly SupportedLanguage[];
}[] = [
  { id: 'americas', labelKey: 'lang.continents.americas', codes: ['en', 'es', 'pt'] },
  { id: 'europe', labelKey: 'lang.continents.europe', codes: ['de', 'it', 'ru', 'tr'] },
  { id: 'asia', labelKey: 'lang.continents.asia', codes: ['zh', 'ja', 'ko'] },
  { id: 'middleEast', labelKey: 'lang.continents.middleEast', codes: ['ar', 'he'] },
];

export const languageFlagCodes: Record<SupportedLanguage, string> = {
  en: 'us',
  es: 'es',
  zh: 'cn',
  pt: 'br',
  it: 'it',
  de: 'de',
  ru: 'ru',
  ar: 'sa',
  ja: 'jp',
  ko: 'kr',
  he: 'il',
  tr: 'tr',
};

export function isSupportedLanguage(code: string): code is SupportedLanguage {
  return (languageOrder as readonly string[]).includes(code.toLowerCase());
}

export function normalizeLanguage(lng: string): SupportedLanguage {
  const lower = lng.toLowerCase();
  if ((languageOrder as readonly string[]).includes(lower)) {
    return lower as SupportedLanguage;
  }
  const base = lower.split('-')[0];
  if ((languageOrder as readonly string[]).includes(base)) {
    return base as SupportedLanguage;
  }
  return 'en';
}

export function detectBrowserLanguage(): SupportedLanguage {
  if (typeof navigator === 'undefined') return 'en';
  const candidates = navigator.languages?.length ? [...navigator.languages] : [navigator.language];
  for (const lng of candidates) {
    if (!lng) continue;
    const match = normalizeLanguage(lng);
    if (match !== 'en' || lng.toLowerCase().startsWith('en')) return match;
  }
  return candidates[0] ? normalizeLanguage(candidates[0]) : 'en';
}
