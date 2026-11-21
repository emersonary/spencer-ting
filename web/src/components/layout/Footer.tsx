import { useTranslation } from 'react-i18next';
import { AppLink } from '../routing/AppLink';
import { BrandWordmark } from '../BrandWordmark';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { SocialIcon } from '../SocialIcon';
import { CorcoranLockup } from '../CorcoranLockup';
import { EqualHousingMark } from '../EqualHousingMark';
import { AgentLicenseBlock } from './AgentLicenseBlock';
import {
  CORCORAN_SITE_LABEL,
  CORCORAN_SITE_URL,
  FAIR_HOUSING_NOTICE_URL,
} from '../../compliance/corcoran';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-identity">
            <div className="footer-brand">
              <BrandWordmark />
            </div>
            <CorcoranLockup className="footer-corcoran-lockup" />
            <a href={CORCORAN_SITE_URL} className="footer-corcoran-text-link" rel="noopener noreferrer">
              {CORCORAN_SITE_LABEL}
            </a>
          </div>
          <div className="footer-col">
            <h4>{t('footer.explore')}</h4>
            <AppLink to="/properties">{t('nav.properties')}</AppLink>
            <AppLink to="/neighborhoods">{t('nav.neighborhoods')}</AppLink>
            <AppLink to="/blog">{t('nav.blog')}</AppLink>
            <AppLink to="/mortgage-calculator">{t('nav.mortgage')}</AppLink>
          </div>
          <div className="footer-col">
            <h4>{t('footer.services')}</h4>
            <AppLink to="/buy">{t('nav.buy')}</AppLink>
            <AppLink to="/sell">{t('nav.sell')}</AppLink>
            <AppLink to="/contact">{t('nav.contact')}</AppLink>
            <AppLink to="/legal">{t('nav.legal')}</AppLink>
          </div>
          <div className="footer-col">
            <h4>{t('footer.connect')}</h4>
            <a href="https://www.linkedin.com/in/spencer-ting-212036337/" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <SocialIcon network="linkedin" />
              {t('social.linkedin')}
            </a>
            <a href="https://www.instagram.com/artgroup.nyc" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <SocialIcon network="instagram" />
              {t('social.instagram')}
            </a>
          </div>
        </div>

        <div className="footer-legal">
          <AgentLicenseBlock />
          <div className="footer-disclaimers">
            <div className="footer-equal-housing">
              <EqualHousingMark title={t('legal.equalHousing')} />
              <p>{t('legal.equalHousing')}</p>
            </div>
            <p>{t('legal.notOfficialSite')}</p>
            <p>{t('legal.accuracy')}</p>
            <p>{t('legal.noOfferOutsideNy')}</p>
            <p>
              {t('legal.sopSummary')}{' '}
              <AppLink to="/legal">{t('legal.readFull')}</AppLink>
            </p>
            <p>
              <a href={FAIR_HOUSING_NOTICE_URL} target="_blank" rel="noopener noreferrer">
                {t('legal.fairHousingLink')}
              </a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <LanguageSwitcher />
          <span>© {year} {t('brand.name')}. {t('footer.rights')}</span>
        </div>
      </div>
    </footer>
  );
}
