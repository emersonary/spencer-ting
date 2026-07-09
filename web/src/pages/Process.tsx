import { useTranslation } from 'react-i18next';

const BUY_STEPS = ['consult', 'finance', 'search', 'offer', 'inspection', 'closing', 'moveIn'] as const;
const SELL_STEPS = ['consult', 'valuation', 'prepare', 'market', 'showings', 'negotiate', 'close'] as const;

function ProcessPage({ type }: { type: 'buy' | 'sell' }) {
  const { t } = useTranslation();
  const steps = type === 'buy' ? BUY_STEPS : SELL_STEPS;

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h1>{t(type === 'buy' ? 'process.buyTitle' : 'process.sellTitle')}</h1>
          <div className="gold-line" />
          <p>{t(type === 'buy' ? 'process.buySubtitle' : 'process.sellSubtitle')}</p>
        </div>
        <div className="process-timeline">
          {steps.map((step, i) => (
            <div key={step} className="card process-step">
              <div className="process-step-num">{i + 1}</div>
              <h4>{t(`process.steps.${step}`)}</h4>
              <p>{t(`process.steps.${step}Desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BuyProcess() {
  return <ProcessPage type="buy" />;
}

export function SellProcess() {
  return <ProcessPage type="sell" />;
}
