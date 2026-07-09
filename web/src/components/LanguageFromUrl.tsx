import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import i18n from '../i18n';
import { readLanguageFromSearch, setUrlLanguageSession } from '../i18n/urlLanguage';

export function LanguageFromUrl() {
  const location = useLocation();

  useEffect(() => {
    const lang = readLanguageFromSearch(location.search);
    if (lang) {
      setUrlLanguageSession(lang);
      if (i18n.language !== lang) {
        void i18n.changeLanguage(lang);
      }
    }
  }, [location.search]);

  return null;
}
