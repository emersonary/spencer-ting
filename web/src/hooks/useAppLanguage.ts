import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  URL_LANG_PARAM,
  getUrlLanguageSession,
  isUrlLanguageMode,
  readLanguageFromSearch,
} from '../i18n/urlLanguage';
import { normalizeLanguage, type SupportedLanguage } from '../i18n/languages';

export function useAppLanguage() {
  const { i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const current = normalizeLanguage(i18n.language);
  const urlLang = readLanguageFromSearch(`?${searchParams.toString()}`);

  const setLanguage = useCallback(
    (code: SupportedLanguage) => {
      if (isUrlLanguageMode() || urlLang) {
        const next = new URLSearchParams(searchParams);
        for (const key of [...next.keys()]) {
          if (key.toLowerCase() === URL_LANG_PARAM) next.delete(key);
        }
        next.set(URL_LANG_PARAM, code);
        setSearchParams(next, { replace: true });
      }
      void i18n.changeLanguage(code);
    },
    [i18n, searchParams, setSearchParams, urlLang],
  );

  return {
    current,
    setLanguage,
    urlLang: urlLang ?? getUrlLanguageSession(),
    isUrlLanguageMode: isUrlLanguageMode(),
  };
}
