import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { FadeIn } from '../components/FadeIn';
import '../index.css';

export default function About() {
  const { t } = useTranslation('about');

  return (
    <Layout>
      <SEO 
        title="About Us | Elite Day Spa & Beauty Lounge MD" 
        description="Discover Grisel Beauty Spa, an elite day spa in Maryland. Revitalize your senses with our customized botanical facials, organic treatments, and advanced skincare."
        canonical="/about"
        keywords="luxury spa bethesda, premium wellness spa columbia md, boutique beauty spa annapolis md, luxury day spa maryland, exclusive wellness spa potomac, organic luxury facials MD"
      />
      
      <section className="hero-banner hero-banner--page" style={{ backgroundImage: "linear-gradient(180deg, rgba(33,29,25,0.42), rgba(33,29,25,0.6)), url('https://images.unsplash.com/photo-1745327883290-1e9c6447b938?auto=format&fit=crop&w=1800&q=80')" }}>
        <div className="container">
          <FadeIn>
            <span className="eyebrow">{t('eyebrow')}</span>
            <h1>{t('heroTitle')}</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="lede">{t('heroSubtitle')}</p>
          </FadeIn>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <div>
              <FadeIn>
                <h2>{t('philosophy')}</h2>
                <p>{t('philosophyText')}</p>
              </FadeIn>
            </div>
            <div>
              <FadeIn delay={0.4} direction="left">
                <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Relaxing hot stone massage therapy at Grisel Spa" loading="lazy" style={{ borderRadius: '12px', width: '100%', boxShadow: 'var(--shadow-large)' }} />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="section--olive">
        <div className="container">
          <div className="center-line center" style={{ marginBottom: '40px' }}>
            <FadeIn>
              <span className="eyebrow">{t('offeringsEyebrow')}</span>
              <h2>{t('offeringsTitle')}</h2>
            </FadeIn>
          </div>
          <div className="grid grid-3">
            <FadeIn delay={0.1}>
              <div className="plain-card">
                <div className="icon-ring">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 2C9 6 6 9 6 13a6 6 0 0 0 12 0c0-4-3-7-6-11z"/></svg>
                </div>
                <h3>{t('offer1Title')}</h3>
                <p>{t('offer1Desc')}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="plain-card">
                <div className="icon-ring">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.2"/></svg>
                </div>
                <h3>{t('offer2Title')}</h3>
                <p>{t('offer2Desc')}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="plain-card">
                <div className="icon-ring">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0z"/><path d="M12 8v4l3 2"/></svg>
                </div>
                <h3>{t('offer3Title')}</h3>
                <p>{t('offer3Desc')}</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="container center">
          <FadeIn>
            <h2>{t('ctaTitle')}</h2>
            <p className="lede">{t('ctaSubtitle')}</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="btn-row">
              <a href="/booking" className="btn btn-primary">{t('btnBook')}</a>
              <a href="/services" className="btn btn-outline">{t('btnServices')}</a>
            </div>
          </FadeIn>
        </div>
      </section>

    </Layout>
  );
}
