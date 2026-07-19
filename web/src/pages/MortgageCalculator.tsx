import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MortgageCalculator } from '../components/calculators/MortgageCalculator';
import { propertyService } from '../services/property';

export function MortgageCalculatorPage() {
  const { t, i18n } = useTranslation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await propertyService.submitInquiry({
        name: `${firstName.trim()} ${lastName.trim()}`.trim(),
        email,
        phone,
        intent: 'valuation',
        locale: i18n.language,
        message: `Property valuation request\nAddress: ${address.trim()}`,
      });
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="valuation-hero" aria-label={t('mortgage.title')}>
        <img
          src="/images/property-valuations-hero.png?v=2"
          alt={t('mortgage.heroAlt')}
          className="valuation-hero-image"
        />
        <div className="valuation-hero-overlay">
          <h1 className="valuation-hero-headline">{t('mortgage.heroHeadline')}</h1>
        </div>
      </section>

      <section className="section valuation-section">
        <div className="container valuation-page">
          <div className="section-header valuation-intro">
            <p>{t('mortgage.subtitle')}</p>
          </div>

          <div className="valuation-layout">
            <div className="valuation-panel">
              <h2 className="valuation-panel-title">{t('mortgage.formHeading')}</h2>
              <div className="gold-line" />
              {sent ? (
                <div className="alert alert-success">{t('mortgage.formSuccess')}</div>
              ) : (
                <form onSubmit={(e) => void handleSubmit(e)} className="valuation-form">
                  <div className="valuation-form-grid">
                    <div className="form-group">
                      <label htmlFor="valuation-first-name">{t('common.firstName')}</label>
                      <input
                        id="valuation-first-name"
                        type="text"
                        required
                        autoComplete="given-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="valuation-last-name">{t('common.lastName')}</label>
                      <input
                        id="valuation-last-name"
                        type="text"
                        required
                        autoComplete="family-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div className="form-group valuation-form-full">
                      <label htmlFor="valuation-email">{t('common.email')}</label>
                      <input
                        id="valuation-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group valuation-form-full">
                      <label htmlFor="valuation-phone">{t('contact.phone')}</label>
                      <input
                        id="valuation-phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="form-group valuation-form-full">
                      <label htmlFor="valuation-address">{t('mortgage.address')}</label>
                      <input
                        id="valuation-address"
                        type="text"
                        required
                        autoComplete="street-address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="valuation-form-actions">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? t('common.loading') : t('mortgage.requestValuation')}
                    </button>
                  </div>

                  <p className="valuation-disclaimer">{t('mortgage.formDisclaimer')}</p>
                </form>
              )}
            </div>

            <MortgageCalculator layout="panels" />
          </div>
        </div>
      </section>
    </>
  );
}
