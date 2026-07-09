import { useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { languageLabels, languageContinents } from '../i18n/languages';
import { useAppLanguage } from '../hooks/useAppLanguage';
import { FlagIcon } from './FlagIcon';
import './LanguageSwitcher.css';

export function LanguageSwitcher() {
  const { t } = useTranslation();
  const { current, setLanguage } = useAppLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  function selectLanguage(code: typeof current) {
    setLanguage(code);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className="lang-switcher" ref={rootRef}>
      <span className="lang-switcher-label" id={`${listId}-label`}>
        {t('lang.label')}
      </span>
      <div className="lang-dropdown">
        <button
          type="button"
          className="lang-dropdown-trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={`${listId}-label`}
          onClick={() => setOpen((o) => !o)}
        >
          <FlagIcon code={current} />
          <span className="lang-dropdown-value">{languageLabels[current]}</span>
          <span className="lang-dropdown-chevron" aria-hidden="true">
            ▾
          </span>
        </button>
        {open && (
          <ul
            id={listId}
            className="lang-dropdown-menu"
            role="listbox"
            aria-label={t('lang.label')}
          >
            {languageContinents.map((group) => (
              <li key={group.id} className="lang-dropdown-group" role="presentation">
                <span className="lang-dropdown-group-label">{t(group.labelKey)}</span>
                <ul className="lang-dropdown-group-list" role="group" aria-label={t(group.labelKey)}>
                  {group.codes.map((code) => (
                    <li key={code} role="option" aria-selected={code === current}>
                      <button
                        type="button"
                        className={`lang-dropdown-option ${code === current ? 'selected' : ''}`}
                        onClick={() => selectLanguage(code)}
                      >
                        <FlagIcon code={code} />
                        <span>{languageLabels[code]}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
