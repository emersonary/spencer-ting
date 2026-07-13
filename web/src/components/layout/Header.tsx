import { useState } from 'react';
import { AppLink, AppNavLink } from '../routing/AppLink';
import { useTranslation } from 'react-i18next';
import { useAccount, HeaderAccountMenu } from '../../accounts';
import { BrandWordmark } from '../BrandWordmark';
import { apiHttpUrl } from '../../services/api/transport';
import { readSession } from '../../accounts/services/storage';
import './Header.css';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAdmin } = useAccount();
  const { t } = useTranslation();

  const navItems = [
    { to: '/about', label: t('nav.about') },
    { to: '/properties', label: t('nav.properties') },
    { to: '/neighborhoods', label: t('nav.neighborhoods') },
    { to: '/buy', label: t('nav.buy') },
    { to: '/sell', label: t('nav.sell') },
    { to: '/blog', label: t('nav.blog') },
    { to: '/mortgage-calculator', label: t('nav.mortgage') },
    { to: '/contact', label: t('nav.contact') },
  ];

  async function openPostsAdmin() {
    const session = readSession();
    if (!session?.accessToken) return;
    try {
      const res = await fetch(apiHttpUrl('/account/posts-admin-launch'), {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      });
      if (!res.ok) return;
      const payload = (await res.json()) as { url?: string };
      if (payload.url) {
        window.open(payload.url, '_blank', 'noopener,noreferrer');
      }
    } catch {
      /* ignore */
    }
  }

  return (
    <header className="site-header">
      <div className="header-top">
        <div className="container header-top-inner">
          <div className="header-contact">
            <AppLink to="/contact" className="header-cta">
              {t('hero.ctaTalk')}
            </AppLink>
          </div>
          <div className="header-top-actions">
            <HeaderAccountMenu />
          </div>
        </div>
      </div>

      <div className="container header-main">
        <AppLink to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-mark">ST</span>
          <span>
            <strong>
              <BrandWordmark />
            </strong>
            <small>{t('brand.tagline')}</small>
          </span>
        </AppLink>

        <button
          type="button"
          className="menu-toggle"
          aria-label={t('common.toggleMenu')}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          <ul>
            {navItems.map((item) => (
              <li key={item.to}>
                <AppNavLink
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                >
                  {item.label}
                </AppNavLink>
              </li>
            ))}
            {isAdmin && (
              <li>
                <button
                  type="button"
                  className="nav-parent nav-admin"
                  onClick={() => {
                    setMenuOpen(false);
                    void openPostsAdmin();
                  }}
                >
                  {t('nav.blogAdmin')}
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
