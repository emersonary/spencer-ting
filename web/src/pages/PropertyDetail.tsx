import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { propertyService, formatPrice, type Property } from '../services/property';
import { AppLink } from '../components/routing/AppLink';

export function PropertyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    void propertyService
      .getBySlug(slug)
      .then(setProperty)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="page-loading">{t('common.loading')}</div>;
  if (!property) return <div className="page-loading">{t('common.propertyNotFound')}</div>;

  return (
    <section className="section">
      <div className="container">
        <AppLink to="/properties" style={{ fontSize: '0.875rem', marginBottom: '2rem', display: 'inline-block' }}>
          ← {t('properties.title')}
        </AppLink>

        <div className="property-detail-gallery">
          <img src={property.imageUrls[0]} alt={property.title} />
          {property.imageUrls[1] && <img src={property.imageUrls[1]} alt="" />}
        </div>

        <div className="grid-2" style={{ marginTop: '3rem', alignItems: 'start' }}>
          <div>
            <h1>{property.title}</h1>
            <p className="text-muted">{property.address} · {property.neighborhood}, {property.borough}</p>
            <div className="property-price" style={{ fontSize: '2.5rem', margin: '1.5rem 0' }}>
              {formatPrice(property.price, i18n.language)}
            </div>
            <div className="property-meta" style={{ fontSize: '1rem', marginBottom: '2rem' }}>
              <span>{property.bedrooms} {t('properties.beds')}</span>
              <span>{property.bathrooms} {t('properties.baths')}</span>
              <span>{property.sqft.toLocaleString()} {t('properties.sqft')}</span>
              <span>{t(`properties.types.${property.propertyType}` as 'properties.types.condo')}</span>
            </div>
            <h3>{t('properties.description')}</h3>
            <p>{property.description}</p>
            {property.features.length > 0 && (
              <>
                <h3 style={{ marginTop: '2rem' }}>{t('properties.features')}</h3>
                <ul>
                  {property.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="card" style={{ padding: '2rem' }}>
            <h3>{t('properties.inquire')}</h3>
            <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
              {property.monthlyHoa > 0 && <>{t('properties.monthlyHoa')}: ${property.monthlyHoa.toLocaleString()}<br /></>}
              {property.monthlyTaxes > 0 && <>{t('properties.monthlyTaxes')}: ${property.monthlyTaxes.toLocaleString()}<br /></>}
              {property.yearBuilt > 0 && <>{t('properties.yearBuilt')}: {property.yearBuilt}</>}
            </p>
            <AppLink to="/contact" className="btn btn-primary" style={{ width: '100%' }}>
              {t('hero.ctaTalk')}
            </AppLink>
            <AppLink to="/mortgage-calculator" className="btn btn-outline" style={{ width: '100%', marginTop: '1rem', color: 'var(--color-navy)', borderColor: 'var(--color-navy)' }}>
              {t('nav.mortgage')}
            </AppLink>
          </div>
        </div>
      </div>
    </section>
  );
}
