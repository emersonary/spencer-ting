import { useTranslation } from 'react-i18next';
import { EqualHousingMark } from '../components/EqualHousingMark';
import { FAIR_HOUSING_NOTICE_URL } from '../compliance/corcoran';

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
          <p>{t('legal.disclaimerOfficial')}</p>
          <p>{t('legal.disclaimerAffiliation')}</p>

          <h2>{t('legal.sopHeading')}</h2>
          <p>{t('legal.sopIntro')}</p>
          <p>{t('legal.sopForBuyers')}</p>
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
