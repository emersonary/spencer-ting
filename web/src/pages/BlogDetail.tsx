import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppLink } from '../components/routing/AppLink';
import { blogService } from '../services/blog';

export function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const [bodyHtml, setBodyHtml] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    void blogService
      .getPublished(slug, i18n.language)
      .then((res) => {
        setTitle(res.post.title);
        setBodyHtml(res.bodyHtml);
      })
      .finally(() => setLoading(false));
  }, [slug, i18n.language]);

  if (loading) return <div className="page-loading">Loading...</div>;

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <AppLink to="/blog" style={{ fontSize: '0.875rem', marginBottom: '2rem', display: 'inline-block' }}>
          ← {t('blog.back')}
        </AppLink>
        <h1>{title}</h1>
        <div className="gold-line" style={{ margin: '1.5rem 0' }} />
        <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      </div>
    </section>
  );
}
