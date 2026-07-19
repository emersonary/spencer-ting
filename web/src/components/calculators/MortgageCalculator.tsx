import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type MortgageCalculatorProps = {
  defaultPrice?: number;
  /** `panels` = fields and result as separate valuation boxes */
  layout?: 'default' | 'panels';
};

export function MortgageCalculator({
  defaultPrice = 2000000,
  layout = 'default',
}: MortgageCalculatorProps) {
  const { t } = useTranslation();
  const [homePrice, setHomePrice] = useState(defaultPrice);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [annualTax, setAnnualTax] = useState(36000);
  const [monthlyHoa, setMonthlyHoa] = useState(1500);
  const [annualInsurance, setAnnualInsurance] = useState(4800);

  const downPayment = homePrice * (downPaymentPct / 100);
  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;

  const principalInterest =
    monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : loanAmount / numPayments;

  const monthlyTax = annualTax / 12;
  const monthlyInsurance = annualInsurance / 12;
  const total = principalInterest + monthlyTax + monthlyHoa + monthlyInsurance;

  const fields = (
    <div className={layout === 'panels' ? 'mortgage-fields' : undefined}>
      <div className="form-group">
        <label>{t('mortgage.homePrice')}</label>
        <input type="number" value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} />
      </div>
      <div className="form-group">
        <label>{t('mortgage.downPaymentPercent')}</label>
        <input
          type="number"
          value={downPaymentPct}
          min={0}
          max={100}
          onChange={(e) => setDownPaymentPct(Number(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label>{t('mortgage.interestRate')} (%)</label>
        <input type="number" step={0.1} value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
      </div>
      <div className="form-group">
        <label>{t('mortgage.loanTerm')}</label>
        <select value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))}>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
      <div className="form-group">
        <label>{t('mortgage.propertyTax')}</label>
        <input type="number" value={annualTax} onChange={(e) => setAnnualTax(Number(e.target.value))} />
      </div>
      <div className="form-group">
        <label>{t('mortgage.hoa')}</label>
        <input type="number" value={monthlyHoa} onChange={(e) => setMonthlyHoa(Number(e.target.value))} />
      </div>
      <div className="form-group">
        <label>{t('mortgage.insurance')}</label>
        <input type="number" value={annualInsurance} onChange={(e) => setAnnualInsurance(Number(e.target.value))} />
      </div>
    </div>
  );

  const result = (
    <div className={`mortgage-result${layout === 'panels' ? ' mortgage-result--panel' : ''}`}>
      <div className="mortgage-total">${Math.round(total).toLocaleString()}</div>
      <div className="mortgage-breakdown">
        <div className="mortgage-breakdown-row">
          <span>{t('mortgage.principalInterest')}</span>
          <span>${Math.round(principalInterest).toLocaleString()}</span>
        </div>
        <div className="mortgage-breakdown-row">
          <span>{t('mortgage.taxes')}</span>
          <span>${Math.round(monthlyTax).toLocaleString()}</span>
        </div>
        <div className="mortgage-breakdown-row">
          <span>{t('mortgage.hoaFee')}</span>
          <span>${Math.round(monthlyHoa).toLocaleString()}</span>
        </div>
        <div className="mortgage-breakdown-row">
          <span>{t('mortgage.insuranceFee')}</span>
          <span>${Math.round(monthlyInsurance).toLocaleString()}</span>
        </div>
      </div>
      {layout !== 'panels' ? (
        <p style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '1.5rem' }}>{t('mortgage.disclaimer')}</p>
      ) : null}
    </div>
  );

  if (layout === 'panels') {
    return (
      <>
        <div className="valuation-panel">
          <h2 className="valuation-panel-title">{t('mortgage.calculatorHeading')}</h2>
          <div className="gold-line" />
          {fields}
          <p className="valuation-calculator-footer">{t('mortgage.calculatorFooter')}</p>
        </div>
        <div className="valuation-panel valuation-panel--result">
          <h2 className="valuation-panel-title">{t('mortgage.resultHeading')}</h2>
          <div className="gold-line" />
          {result}
        </div>
      </>
    );
  }

  return (
    <div className="mortgage-calc">
      {fields}
      {result}
    </div>
  );
}
