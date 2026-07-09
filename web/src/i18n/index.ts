import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';
import zh from './locales/zh.json';
import pt from './locales/pt.json';
import it from './locales/it.json';
import de from './locales/de.json';
import ru from './locales/ru.json';
import ar from './locales/ar.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import he from './locales/he.json';
import tr from './locales/tr.json';
import {
  detectBrowserLanguage,
  languageOrder,
  normalizeLanguage,
  type SupportedLanguage,
} from './languages';
import {
  syncUrlLanguageSessionFromSearch,
} from './urlLanguage';

export {
  languageOrder,
  languageLabels,
  languageFlagCodes,
  languageContinents,
  normalizeLanguage,
  detectBrowserLanguage,
  type SupportedLanguage,
  type LanguageContinent,
} from './languages';
export { URL_LANG_PARAM, readLanguageFromSearch, isUrlLanguageMode, withLangQuery } from './urlLanguage';
export const supportedLanguages = languageOrder;

const rtlLanguages: SupportedLanguage[] = ['he', 'ar'];
const STORAGE_KEY = 'spencer_ting_language';

function documentLangTag(lang: SupportedLanguage): string {
  if (lang === 'pt') return 'pt-BR';
  if (lang === 'zh') return 'zh-CN';
  return lang;
}

function applyDocumentLanguage(lng: string) {
  const lang = normalizeLanguage(lng);
  const dir = rtlLanguages.includes(lang) ? 'rtl' : 'ltr';
  document.documentElement.lang = documentLangTag(lang);
  document.documentElement.dir = dir;
  document.body.dir = dir;
}

const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
const urlLang =
  typeof window !== 'undefined' ? syncUrlLanguageSessionFromSearch(window.location.search) : null;
const initialLng = urlLang ?? (saved ? normalizeLanguage(saved) : detectBrowserLanguage());

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    zh: { translation: zh },
    pt: { translation: pt },
    it: { translation: it },
    de: { translation: de },
    ru: { translation: ru },
    ar: { translation: ar },
    ja: { translation: ja },
    ko: { translation: ko },
    he: { translation: he },
    tr: { translation: tr },
  },
  lng: initialLng,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

applyDocumentLanguage(i18n.language);

i18n.on('languageChanged', (lng) => {
  const lang = normalizeLanguage(lng);
  localStorage.setItem(STORAGE_KEY, lang);
  applyDocumentLanguage(lang);
});

export default i18n;
