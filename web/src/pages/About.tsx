import { useTranslation } from 'react-i18next';
import { AppLink } from '../components/routing/AppLink';

export function About() {
  const { t } = useTranslation();

  return (
    <section className="section">
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
          <div>
            <img
              src="/images/spencer-ting.png"
              alt={t('brand.name')}
              style={{ borderRadius: '4px', boxShadow: 'var(--shadow-md)' }}
            />
          </div>
          <div>
            <h1>{t('about.title')}</h1>
            <div className="gold-line" style={{ margin: '1rem 0' }} />
            <p>{t('about.bio1')}</p>
            <p>{t('about.bio2')}</p>
            <p>{t('about.bio3')}</p>
            <div style={{ marginTop: '2rem' }}>
              <AppLink to="/contact" className="btn btn-primary">{t('hero.ctaTalk')}</AppLink>
            </div>
          </div>
        </div>

        <div className="grid-3" style={{ marginTop: '5rem' }}>
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
