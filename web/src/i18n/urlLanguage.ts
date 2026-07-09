import type { To } from 'react-router-dom';
import { languageOrder, normalizeLanguage, type SupportedLanguage } from './languages';

export const URL_LANG_PARAM = 'lang';

function isSupportedLanguageCode(raw: string): boolean {
  const lower = raw.toLowerCase();
  if ((languageOrder as readonly string[]).includes(lower)) return true;
  const base = lower.split('-')[0];
  return (languageOrder as readonly string[]).includes(base);
}

function getLangParamValue(query: string): string | null {
  const params = new URLSearchParams(query);
  for (const [key, value] of params.entries()) {
    if (key.toLowerCase() === URL_LANG_PARAM) return value;
  }
  return null;
}

export function readLanguageFromSearch(search: string): SupportedLanguage | null {
  const query = search.startsWith('?') ? search.slice(1) : search;
  const raw = getLangParamValue(query);
  if (!raw || !isSupportedLanguageCode(raw)) return null;
  return normalizeLanguage(raw);
}

let urlLanguageSession: SupportedLanguage | null = null;

export function getUrlLanguageSession(): SupportedLanguage | null {
  return urlLanguageSession;
}

export function setUrlLanguageSession(lang: SupportedLanguage | null): void {
  urlLanguageSession = lang;
}

export function isUrlLanguageMode(): boolean {
  return urlLanguageSession !== null;
}

export function syncUrlLanguageSessionFromSearch(search: string): SupportedLanguage | null {
  const fromUrl = readLanguageFromSearch(search);
  if (fromUrl) {
    urlLanguageSession = fromUrl;
  }
  return fromUrl;
}

export function withLangQuery(to: To): To {
  const lang = getUrlLanguageSession();
  if (!lang) return to;

  if (typeof to === 'string') {
    if (/^https?:\/\//i.test(to)) return to;
    const hashIdx = to.indexOf('#');
    const hash = hashIdx >= 0 ? to.slice(hashIdx) : '';
    const pathQuery = hashIdx >= 0 ? to.slice(0, hashIdx) : to;
    const qIdx = pathQuery.indexOf('?');
    const pathname = qIdx >= 0 ? pathQuery.slice(0, qIdx) : pathQuery;
    const params = new URLSearchParams(qIdx >= 0 ? pathQuery.slice(qIdx + 1) : '');
    params.set(URL_LANG_PARAM, lang);
    return `${pathname}?${params.toString()}${hash}`;
  }

  const params = new URLSearchParams(
    typeof to.search === 'string' ? to.search.replace(/^\?/, '') : '',
  );
  params.set(URL_LANG_PARAM, lang);
  return { ...to, search: `?${params.toString()}` };
}
