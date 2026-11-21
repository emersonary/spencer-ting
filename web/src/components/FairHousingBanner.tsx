import { useTranslation } from 'react-i18next';
import { FAIR_HOUSING_NOTICE_URL } from '../compliance/corcoran';

export function FairHousingBanner() {
  const { t } = useTranslation();

  return (
    <p className="fair-housing-banner">
      {t('legal.fairHousingCopy')}{' '}
      <a href={FAIR_HOUSING_NOTICE_URL} target="_blank" rel="noopener noreferrer">
        {t('legal.fairHousingLink')}
      </a>
    </p>
  );
}
