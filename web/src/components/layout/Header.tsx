import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppLink, AppNavLink } from '../routing/AppLink';
import { useTranslation } from 'react-i18next';
import { HeaderAccountMenu } from '../../accounts';
import { BrandWordmark } from '../BrandWordmark';
import { blogService, type BlogPostSummary } from '../../services/blog';
import './Header.css';

const INSIGHTS_MENU_LIMIT = 8;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [insightPosts, setInsightPosts] = useState<BlogPostSummary[]>([]);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const insightsActive = location.pathname.startsWith('/blog');

  const leadingNav = [
    { to: '/about', label: t('nav.about') },
    { to: '/properties', label: t('nav.properties') },
    { to: '/neighborhoods', label: t('nav.neighborhoods') },
    { to: '/buy', label: t('nav.buy') },
    { to: '/sell', label: t('nav.sell') },
  ];
  const trailingNav = [
    { to: '/mortgage-calculator', label: t('nav.mortgage') },
    { to: '/contact', label: t('nav.contact') },
  ];

  useEffect(() => {
    let cancelled = false;
    void blogService
      .listPublished(i18n.language)
      .then((posts) => {
        if (!cancelled) setInsightPosts(posts.slice(0, INSIGHTS_MENU_LIMIT));
      })
      .catch(() => {
        if (!cancelled) setInsightPosts([]);
      });
    return () => {
      cancelled = true;
    };
  }, [i18n.language]);

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
            {leadingNav.map((item) => (
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
            <li
              className="has-dropdown"
              onMouseEnter={() => setOpenDropdown('insights')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                className={`nav-parent${insightsActive ? ' active' : ''}`}
                aria-expanded={openDropdown === 'insights'}
                onClick={() => setOpenDropdown((d) => (d === 'insights' ? null : 'insights'))}
              >
                {t('nav.blog')}
              </button>
              <ul className={`dropdown ${openDropdown === 'insights' ? 'show' : ''}`}>
                <li>
                  <AppNavLink to="/blog" onClick={() => setMenuOpen(false)}>
                    {t('nav.blogAll')}
                  </AppNavLink>
                </li>
                {insightPosts.length === 0 ? (
                  <li>
                    <span className="nav-dropdown-empty">{t('blog.noPosts')}</span>
                  </li>
                ) : (
                  insightPosts.map((post) => (
                    <li key={post.id}>
                      <AppNavLink to={`/blog/${post.slug}`} onClick={() => setMenuOpen(false)}>
                        {post.title}
                      </AppNavLink>
                    </li>
                  ))
                )}
              </ul>
            </li>
            {trailingNav.map((item) => (
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
          </ul>
        </nav>
      </div>
    </header>
  );
}
