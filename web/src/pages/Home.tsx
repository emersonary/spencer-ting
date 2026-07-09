import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppLink } from '../components/routing/AppLink';
import { PropertyCard } from '../components/property/PropertyCard';
import { propertyService, type Property } from '../services/property';
import '../styles/pages.css';

const TESTIMONIALS = [
  { quote: "Spencer made our Tribeca purchase seamless. His market knowledge saved us months of searching.", author: 'James & Sarah M.', role: 'Tribeca Buyers' },
  { quote: "We sold our townhouse above asking in two weeks. Spencer's marketing strategy was exceptional.", author: 'David L.', role: 'UES Seller' },
  { quote: "As international buyers, we needed someone who understood our needs. Spencer delivered beyond expectations.", author: 'Chen Family', role: 'Brooklyn Heights Buyers' },
];

const VIDEOS = [
  { title: 'Tribeca Market Update', thumb: 'https://images.unsplash.com/photo-1480714378404-ce67fde3e916?w=600', url: '#' },
  { title: 'Co-op vs Condo in NYC', thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600', url: '#' },
  { title: 'Brooklyn Heights Tour', thumb: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600', url: '#' },
];

export function Home() {
  const { t } = useTranslation();
  const [featured, setFeatured] = useState<Property[]>([]);

  useEffect(() => {
    void propertyService.list({ featuredOnly: true, limit: 3 }).then((res) => setFeatured(res.properties));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-content">
          <div className="hero-panel">
            <h1>{t('hero.headline')}</h1>
            <p>{t('hero.subtitle')}</p>
            <div className="hero-actions">
              <AppLink to="/properties" className="btn btn-primary">{t('hero.ctaBuy')}</AppLink>
              <AppLink to="/sell" className="btn btn-outline">{t('hero.ctaSell')}</AppLink>
              <AppLink to="/contact" className="btn btn-outline">{t('hero.ctaTalk')}</AppLink>
            </div>
            <div className="hero-portrait">
              <img
                src="/images/spencer-ting.png"
                alt="Spencer Ting"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container grid-4">
          <div className="stat-item">
            <div className="stat-value">10+</div>
            <div className="stat-label">{t('stats.experience')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">200+</div>
            <div className="stat-label">{t('stats.transactions')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">$500M+</div>
            <div className="stat-label">{t('stats.volume')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">50+</div>
            <div className="stat-label">{t('stats.neighborhoods')}</div>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <h2>{t('properties.title')}</h2>
            <div className="gold-line" />
            <p>{t('properties.subtitle')}</p>
          </div>
          <div className="grid-3">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <AppLink to="/properties" className="btn btn-dark">{t('properties.viewDetails')}</AppLink>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <h2>{t('about.title')}</h2>
            <div className="gold-line" />
            <p>{t('about.subtitle')}</p>
          </div>
          <div className="grid-3">
            <div className="card" style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)' }}>
              <h3 className="text-gold">{t('about.values.knowledge')}</h3>
              <p style={{ opacity: 0.8 }}>{t('about.values.knowledgeDesc')}</p>
            </div>
            <div className="card" style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)' }}>
              <h3 className="text-gold">{t('about.values.network')}</h3>
              <p style={{ opacity: 0.8 }}>{t('about.values.networkDesc')}</p>
            </div>
            <div className="card" style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)' }}>
              <h3 className="text-gold">{t('about.values.advocacy')}</h3>
              <p style={{ opacity: 0.8 }}>{t('about.values.advocacyDesc')}</p>
            </div>
          </div>
          <div className="text-center" style={{ marginTop: '2.5rem' }}>
            <AppLink to="/about" className="btn btn-primary">{t('nav.about')}</AppLink>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <h2>{t('testimonials.title')}</h2>
            <div className="gold-line" />
            <p>{t('testimonials.subtitle')}</p>
          </div>
          <div className="grid-3">
            {TESTIMONIALS.map((item) => (
              <div key={item.author} className="card testimonial-card">
                <p className="testimonial-quote">"{item.quote}"</p>
                <div className="testimonial-author">{item.author}</div>
                <div className="testimonial-role">{item.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>{t('videos.title')}</h2>
            <div className="gold-line" />
            <p>{t('videos.subtitle')}</p>
          </div>
          <div className="video-grid">
            {VIDEOS.map((video) => (
              <a key={video.title} href={video.url} className="video-card">
                <img src={video.thumb} alt={video.title} />
                <div className="video-card-overlay">
                  <div className="video-play-btn">▶</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container text-center">
          <h2>{t('social.title')}</h2>
          <div className="gold-line" />
          <div className="social-links" style={{ marginTop: '2rem' }}>
            <a href="https://www.instagram.com/artgroup.nyc" target="_blank" rel="noopener noreferrer" className="social-link">
              {t('social.instagram')} · {t('social.instagramHandle')}
            </a>
            <a href="https://www.linkedin.com/in/spencer-ting-212036337/" target="_blank" rel="noopener noreferrer" className="social-link">
              {t('social.linkedin')}
            </a>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <h2>{t('cta.readyTitle')}</h2>
        <p>{t('cta.readySubtitle')}</p>
        <AppLink to="/contact" className="btn btn-primary">{t('cta.schedule')}</AppLink>
      </section>
    </>
  );
}
