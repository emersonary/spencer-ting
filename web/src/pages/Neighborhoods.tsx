import { useTranslation } from 'react-i18next';

const NEIGHBORHOODS = [
  { name: 'Tribeca', avgPrice: '$3.2M', vibe: 'Industrial chic, celebrity haven', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600' },
  { name: 'Upper East Side', avgPrice: '$2.8M', vibe: 'Classic elegance, museum mile', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600' },
  { name: 'Brooklyn Heights', avgPrice: '$1.9M', vibe: 'Historic charm, skyline views', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600' },
  { name: 'SoHo', avgPrice: '$4.1M', vibe: 'Cast-iron lofts, art galleries', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600' },
  { name: 'West Village', avgPrice: '$2.5M', vibe: 'Tree-lined streets, bohemian soul', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600' },
  { name: 'DUMBO', avgPrice: '$2.1M', vibe: 'Waterfront lofts, tech hub', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600' },
];

export function Neighborhoods() {
  const { t } = useTranslation();

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h1>{t('neighborhoods.title')}</h1>
          <div className="gold-line" />
          <p>{t('neighborhoods.subtitle')}</p>
        </div>
        <div className="grid-3">
          {NEIGHBORHOODS.map((n) => (
            <div key={n.name} className="neighborhood-card">
              <img src={n.image} alt={n.name} />
              <div className="neighborhood-overlay">
                <h3>{n.name}</h3>
                <p>{t('neighborhoods.avgPrice')}: {n.avgPrice}</p>
                <p>{n.vibe}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
