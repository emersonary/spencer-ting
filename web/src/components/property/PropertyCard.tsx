import { useTranslation } from 'react-i18next';
import { AppLink } from '../routing/AppLink';
import { formatPrice, type Property } from '../../services/property';

type PropertyCardProps = {
  property: Property;
};

export function PropertyCard({ property }: PropertyCardProps) {
  const { t } = useTranslation();
  const image = property.imageUrls[0] ?? 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800';

  return (
    <AppLink to={`/properties/${property.slug}`} className="card property-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="property-card-image">
        <img src={image} alt={property.title} loading="lazy" />
        {property.featured && <span className="property-badge">{t('properties.featured')}</span>}
      </div>
      <div className="property-card-body">
        <div className="property-price">{formatPrice(property.price)}</div>
        <div className="property-address">
          {property.address} · {property.neighborhood}
        </div>
        <div className="property-meta">
          <span>{property.bedrooms} {t('properties.beds')}</span>
          <span>{property.bathrooms} {t('properties.baths')}</span>
          <span>{property.sqft.toLocaleString()} {t('properties.sqft')}</span>
        </div>
      </div>
    </AppLink>
  );
}
