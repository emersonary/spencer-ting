import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppLink } from '../components/routing/AppLink';
import { PropertyCard } from '../components/property/PropertyCard';
import { propertyService, type Property } from '../services/property';
import '../styles/pages.css';

const TESTIMONIAL_IDS = ['james', 'david', 'chen'] as const;
const VIDEO_IDS = ['tribecaMarket', 'coopCondo', 'brooklynTour'] as const;
const VIDEO_THUMBS: Record<(typeof VIDEO_IDS)[number], string> = {
  tribecaMarket: 'https://images.unsplash.com/photo-1480714378404-ce67fde3e916?w=600',
  coopCondo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
  brooklynTour: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600',
};

export function Home() {
  const { t } = useTranslation();
  const [featured, setFeatured] = useState<Property[]>([]);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    void propertyService.list({ featuredOnly: true, limit: 3 }).then((res) => setFeatured(res.properties));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          <video
            className={`hero-video${videoReady ? ' is-ready' : ''}`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onPlaying={() => setVideoReady(true)}
            onLoadedData={(e) => {
              // First frame is available — fade in even if autoplay is delayed
              if (e.currentTarget.readyState >= 2) setVideoReady(true);
            }}
          >
            <source src="/videos/hero-central-park.mp4?v=3" type="video/mp4" />
          </video>
          <div className="hero-overlay" />
        </div>
        <div className="container hero-content">
          <div className="hero-panel">
            <h1>{t('hero.headline')}</h1>
            <p>{t('hero.subtitle')}</p>
            <div className="hero-actions">
              <AppLink to="/properties" className="btn btn-primary">{t('hero.ctaBuy')}</AppLink>
              <AppLink to="/sell" className="btn btn-outline">{t('hero.ctaSell')}</AppLink>
              <AppLink to="/contact" className="btn btn-outline">{t('hero.ctaTalk')}</AppLink>
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
            {TESTIMONIAL_IDS.map((id) => (
              <div key={id} className="card testimonial-card">
                <p className="testimonial-quote">"{t(`home.testimonials.${id}.quote`)}"</p>
                <div className="testimonial-author">{t(`home.testimonials.${id}.author`)}</div>
                <div className="testimonial-role">{t(`home.testimonials.${id}.role`)}</div>
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
            {VIDEO_IDS.map((id) => (
              <a key={id} href="#" className="video-card">
                <img src={VIDEO_THUMBS[id]} alt={t(`home.videos.${id}`)} />
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
