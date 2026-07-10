import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppLink } from '../components/routing/AppLink';
import { blogService, type BlogPostSummary } from '../services/blog';

export function Blog() {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void blogService
      .listPublished(i18n.language)
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [i18n.language]);

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h1>{t('blog.title')}</h1>
          <div className="gold-line" />
          <p>{t('blog.subtitle')}</p>
        </div>

        {loading ? (
          <div className="page-loading">{t('common.loading')}</div>
        ) : posts.length === 0 ? (
          <p className="text-center text-muted">{t('blog.noPosts')}</p>
        ) : (
          <div className="grid-3">
            {posts.map((post) => (
              <AppLink key={post.id} to={`/blog/${post.slug}`} className="card" style={{ padding: '2rem', textDecoration: 'none', color: 'inherit' }}>
                <h3>{post.title}</h3>
                <p className="text-muted">{post.summary}</p>
                <span className="text-gold" style={{ fontSize: '0.875rem' }}>{t('blog.readMore')} →</span>
              </AppLink>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
