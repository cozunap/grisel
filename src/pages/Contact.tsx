import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { useTranslation } from 'react-i18next';
import '../index.css';

export default function Contact() {
  const { t } = useTranslation('contact');

  return (
    <Layout>
      <SEO title={t('heroTitle')} description={t('heroSubtitle')} />

      <section className="page-header">
        <div className="container">
          <span className="eyebrow center-line">{t('eyebrow')}</span>
          <h1>{t('heroTitle')}</h1>
          <p className="lede">{t('heroSubtitle')}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid-2">
            <div>
              <div className="contact-info-block" style={{ marginBottom: "32px" }}>
                <span className="eyebrow">{t('location')}</span>
                <address style={{ fontStyle: "normal", fontSize: "1.1rem", lineHeight: 1.6, color: "var(--ink-soft)" }}>
                  {t('address1')}<br />
                  {t('address2')}
                </address>
              </div>

              <div className="contact-info-block" style={{ marginBottom: "32px" }}>
                <span className="eyebrow">{t('phoneLabel')}</span>
                <p style={{ fontSize: "1.1rem", margin: 0 }}>
                  <a href="tel:2407010731" style={{ color: "var(--ink)" }}>(240) 701-0731</a>
                </p>
              </div>

              <div className="contact-info-block">
                <span className="eyebrow">{t('hoursLabel')}</span>
                <p style={{ fontSize: "1.1rem", margin: 0, color: "var(--ink-soft)", lineHeight: 1.6 }}>
                  {t('hours1')}<br />
                  {t('hours2')}
                </p>
              </div>
            </div>

            <div>
              <div style={{ background: "#f1f3f0", borderRadius: "12px", overflow: "hidden", height: "100%", minHeight: "400px" }}>
                <iframe
                  src="https://www.google.com/maps?q=1620+Elton+Rd+Suite+205+Silver+Spring+MD+20903&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
