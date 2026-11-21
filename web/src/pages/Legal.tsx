import { useTranslation } from 'react-i18next';
import { AgentLicenseBlock } from '../components/layout/AgentLicenseBlock';
import { CorcoranLockup } from '../components/CorcoranLockup';
import { EqualHousingMark } from '../components/EqualHousingMark';
import {
  CORCORAN_SITE_LABEL,
  CORCORAN_SITE_URL,
  FAIR_HOUSING_NOTICE_URL,
} from '../compliance/corcoran';

export function Legal() {
  const { t } = useTranslation();

  return (
    <section className="section">
      <div className="container legal-page">
        <div className="section-header">
          <h1>{t('legal.title')}</h1>
          <div className="gold-line" />
          <p>{t('legal.subtitle')}</p>
        </div>

        <div className="legal-identity">
          <p className="legal-affiliation">{t('brand.affiliation')}</p>
          <CorcoranLockup />
          <a href={CORCORAN_SITE_URL} rel="noopener noreferrer">
            {CORCORAN_SITE_LABEL}
          </a>
        </div>

        <AgentLicenseBlock className="legal-license" />

        <article className="legal-article">
          <h2>{t('legal.equalHousing')}</h2>
          <div className="legal-equal-housing">
            <EqualHousingMark title={t('legal.equalHousing')} />
            <p>{t('legal.fairHousingCopy')}</p>
          </div>
          <p>
            <a href={FAIR_HOUSING_NOTICE_URL} target="_blank" rel="noopener noreferrer">
              {t('legal.fairHousingLink')}
            </a>
          </p>

          <h2>{t('legal.disclaimersHeading')}</h2>
          <p>{t('legal.notOfficialSite')}</p>
          <p>{t('legal.accuracy')}</p>
          <p>{t('legal.noOfferOutsideNy')}</p>

          <h2>{t('legal.sopHeading')}</h2>
          <p>{t('legal.sopIntro')}</p>
          <ul>
            <li>{t('legal.sopId')}</li>
            <li>{t('legal.sopBuyerAgreement')}</li>
            <li>{t('legal.sopPreApproval')}</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
