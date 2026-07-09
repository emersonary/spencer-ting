import { useTranslation } from 'react-i18next';
import { AppLink } from '../routing/AppLink';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              Spencer <span>Ting</span>
            </div>
            <p>{t('footer.tagline')}</p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <AppLink to="/properties">{t('nav.properties')}</AppLink>
            <AppLink to="/neighborhoods">{t('nav.neighborhoods')}</AppLink>
            <AppLink to="/blog">{t('nav.blog')}</AppLink>
            <AppLink to="/mortgage-calculator">{t('nav.mortgage')}</AppLink>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <AppLink to="/buy">{t('nav.buy')}</AppLink>
            <AppLink to="/sell">{t('nav.sell')}</AppLink>
            <AppLink to="/contact">{t('nav.contact')}</AppLink>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <a href="https://www.linkedin.com/in/spencer-ting-212036337/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://www.instagram.com/artgroup.nyc" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} Spencer Ting. {t('footer.rights')}</span>
        </div>
      </div>
    </footer>
  );
}
