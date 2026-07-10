import { useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { languageContinents, languageLabels } from '../i18n/languages';
import { useAppLanguage } from '../hooks/useAppLanguage';
import './LanguageSwitcher.css';

function GlobeIcon() {
  return (
    <svg className="lang-globe-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.18" />
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <ellipse cx="12" cy="12" rx="4.5" ry="10" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M2.5 9.5h19M2.5 14.5h19"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M8.2 5.2c1.1 1.4 1.8 3.5 1.8 6.8s-.7 5.4-1.8 6.8M15.8 5.2c-1.1 1.4-1.8 3.5-1.8 6.8s.7 5.4 1.8 6.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
      />
    </svg>
  );
}

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
    <div className={`lang-switcher ${open ? 'open' : ''}`} ref={rootRef}>
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
                      <span>{languageLabels[code]}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        className="lang-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={t('lang.label')}
        onClick={() => setOpen((o) => !o)}
      >
        <GlobeIcon />
        <span className="lang-trigger-label">{languageLabels[current]}</span>
      </button>
    </div>
  );
}
