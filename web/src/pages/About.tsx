import { useTranslation } from 'react-i18next';
import { AppLink } from '../components/routing/AppLink';

const BIO_KEYS = ['bio1', 'bio2', 'bio3', 'bio4', 'bio5', 'bio6', 'bio7'] as const;

export function About() {
  const { t } = useTranslation();

  return (
    <section className="section">
      <div className="container">
        <article className="about-article">
          <h1>{t('about.title')}</h1>
          <div className="gold-line" />
          <img
            className="about-portrait"
            src="/images/spencer-ting.jpg"
            alt={t('brand.name')}
          />
          {BIO_KEYS.map((key) => (
            <p key={key}>{t(`about.${key}`)}</p>
          ))}
          <div className="about-cta">
            <AppLink to="/contact" className="btn btn-primary">{t('hero.ctaTalk')}</AppLink>
          </div>
        </article>

        <div className="grid-3 about-values">
          <div className="card" style={{ padding: '2rem' }}>
            <h3 className="text-gold">{t('about.values.knowledge')}</h3>
            <p className="text-muted">{t('about.values.knowledgeDesc')}</p>
          </div>
          <div className="card" style={{ padding: '2rem' }}>
            <h3 className="text-gold">{t('about.values.network')}</h3>
            <p className="text-muted">{t('about.values.networkDesc')}</p>
          </div>
          <div className="card" style={{ padding: '2rem' }}>
            <h3 className="text-gold">{t('about.values.advocacy')}</h3>
            <p className="text-muted">{t('about.values.advocacyDesc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
