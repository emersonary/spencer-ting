import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { propertyService } from '../services/property';

export function Contact() {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [intent, setIntent] = useState('general');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await propertyService.submitInquiry({
        name,
        email,
        phone,
        message,
        intent,
        locale: i18n.language,
      });
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '640px' }}>
        <div className="section-header">
          <h1>{t('contact.title')}</h1>
          <div className="gold-line" />
          <p>{t('contact.subtitle')}</p>
        </div>

        {sent ? (
          <div className="alert alert-success">{t('contact.success')}</div>
        ) : (
          <form onSubmit={(e) => void handleSubmit(e)} className="card" style={{ padding: '2.5rem' }}>
            <div className="form-group">
              <label>{t('contact.name')}</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t('contact.email')}</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t('contact.phone')}</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t('contact.intent')}</label>
              <select value={intent} onChange={(e) => setIntent(e.target.value)}>
                <option value="buy">{t('contact.intents.buy')}</option>
                <option value="sell">{t('contact.intents.sell')}</option>
                <option value="invest">{t('contact.intents.invest')}</option>
                <option value="general">{t('contact.intents.general')}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('contact.message')}</label>
              <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
              {t('contact.send')}
            </button>
          </form>
        )}

        <div className="social-links" style={{ marginTop: '3rem' }}>
          <a href="https://www.linkedin.com/in/spencer-ting-212036337/" target="_blank" rel="noopener noreferrer" className="social-link">
            {t('social.linkedin')}
          </a>
          <a href="https://www.instagram.com/artgroup.nyc" target="_blank" rel="noopener noreferrer" className="social-link">
            {t('social.instagram')} {t('social.instagramHandle')}
          </a>
        </div>
      </div>
    </section>
  );
}
