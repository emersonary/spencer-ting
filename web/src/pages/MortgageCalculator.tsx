import { useTranslation } from 'react-i18next';
import { MortgageCalculator } from '../components/calculators/MortgageCalculator';

export function MortgageCalculatorPage() {
  const { t } = useTranslation();

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h1>{t('mortgage.title')}</h1>
          <div className="gold-line" />
          <p>{t('mortgage.subtitle')}</p>
        </div>
        <MortgageCalculator />
      </div>
    </section>
  );
}
