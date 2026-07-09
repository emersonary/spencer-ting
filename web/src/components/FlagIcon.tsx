import { languageFlagCodes, normalizeLanguage, type SupportedLanguage } from '../i18n/languages';

type FlagIconProps = {
  code: SupportedLanguage | string;
};

export function FlagIcon({ code }: FlagIconProps) {
  const lang = normalizeLanguage(code);
  const country = languageFlagCodes[lang];
  return <span className={`fi fi-${country} lang-flag-icon`} aria-hidden="true" />;
}
