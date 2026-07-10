import { useTranslation } from 'react-i18next';

const NEIGHBORHOOD_IDS = ['tribeca', 'ues', 'brooklynHeights', 'soho', 'westVillage', 'dumbo'] as const;
const NEIGHBORHOOD_IMAGES: Record<(typeof NEIGHBORHOOD_IDS)[number], string> = {
  tribeca: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600',
  ues: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600',
  brooklynHeights: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600',
  soho: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600',
  westVillage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600',
  dumbo: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600',
};

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
          {NEIGHBORHOOD_IDS.map((id) => (
            <div key={id} className="neighborhood-card">
              <img src={NEIGHBORHOOD_IMAGES[id]} alt={t(`neighborhoods.items.${id}.name`)} />
              <div className="neighborhood-overlay">
                <h3>{t(`neighborhoods.items.${id}.name`)}</h3>
                <p>{t('neighborhoods.avgPrice')}: {t(`neighborhoods.items.${id}.avgPrice`)}</p>
                <p>{t(`neighborhoods.items.${id}.vibe`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
