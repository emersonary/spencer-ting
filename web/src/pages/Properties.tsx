import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PropertyCard } from '../components/property/PropertyCard';
import { propertyService, type Property } from '../services/property';

export function Properties() {
  const { t } = useTranslation();
  const [properties, setProperties] = useState<Property[]>([]);
  const [query, setQuery] = useState('');
  const [borough, setBorough] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [luxuryOnly, setLuxuryOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    void propertyService
      .search({ query, borough, propertyType, luxuryOnly })
      .then((res) => setProperties(res.properties))
      .finally(() => setLoading(false));
  }, [query, borough, propertyType, luxuryOnly]);

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h1>{t('properties.title')}</h1>
          <div className="gold-line" />
          <p>{t('properties.subtitle')}</p>
        </div>

        <div className="property-search-bar">
          <input
            type="text"
            placeholder={t('properties.searchPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select value={borough} onChange={(e) => setBorough(e.target.value)}>
            <option value="">{t('properties.borough')}</option>
            <option value="Manhattan">{t('boroughs.manhattan')}</option>
            <option value="Brooklyn">{t('boroughs.brooklyn')}</option>
          </select>
          <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
            <option value="">{t('properties.type')}</option>
            <option value="condo">{t('properties.types.condo')}</option>
            <option value="co-op">{t('properties.types.co-op')}</option>
            <option value="townhouse">{t('properties.types.townhouse')}</option>
          </select>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
            <input type="checkbox" checked={luxuryOnly} onChange={(e) => setLuxuryOnly(e.target.checked)} />
            {t('properties.luxuryOnly')}
          </label>
        </div>

        {loading ? (
          <div className="page-loading">{t('common.loading')}</div>
        ) : properties.length === 0 ? (
          <p className="text-center text-muted">{t('properties.noResults')}</p>
        ) : (
          <div className="grid-3">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
