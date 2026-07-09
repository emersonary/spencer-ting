import { useNavigate, type NavigateOptions, type To } from 'react-router-dom';
import { withLangQuery } from '../i18n/urlLanguage';

export function useAppNavigate() {
  const navigate = useNavigate();
  return (to: To, options?: NavigateOptions) => navigate(withLangQuery(to), options);
}
