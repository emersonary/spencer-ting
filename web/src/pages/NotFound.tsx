import { useTranslation } from 'react-i18next';
import { AppLink } from '../components/routing/AppLink';

export function NotFound() {
  const { t } = useTranslation();

  return (
    <section className="section text-center">
      <div className="container">
        <h1>{t('pages.notFound.title')}</h1>
        <AppLink to="/" className="btn btn-primary" style={{ marginTop: '2rem' }}>
          {t('pages.notFound.back')}
        </AppLink>
      </div>
    </section>
  );
}
