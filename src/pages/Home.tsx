import Layout from '../components/Layout';
import SEO from '../components/SEO';

import { useEffect } from 'react';
import '../index.css';
import GrouponPopup from '../components/GrouponPopup';
import { FadeIn } from '../components/FadeIn';
import ReviewCarousel from '../components/ReviewCarousel';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  useEffect(() => {
    // JS logic to initialize components can go here
  }, []);

  return (
    <Layout>
      <SEO 
        title="Luxury Spa Maryland | Premium Beauty & Wellness Retreat" 
        description="Experience a boutique day spa in Maryland. We offer five-star spa treatments, high-end facials, and premium body sculpting in an exclusive beauty lounge." 
        canonical="/"
        keywords="luxury spa Maryland, premium beauty spa MD, elite wellness retreat Maryland, boutique day spa Maryland, five-star spa treatments MD, exclusive beauty lounge Maryland, high-end facial treatments Maryland, private spa suites MD"
        schema={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HealthAndBeautyBusiness",
          "name": "Grisel Beauty Spa",
          "image": "https://griselbeautyspa.com/og-image.jpg",
          "url": "https://griselbeautyspa.com",
          "telephone": "+12407010731",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "MD",
            "addressCountry": "US"
          },
          "priceRange": "$$$",
          "description": "Elite wellness retreat in Maryland offering luxury facials, medical aesthetics, and premium massage therapies."
        })}
      />
      <GrouponPopup />

      <section 
        className="hero-banner" 
        style={{ 
          backgroundImage: 'linear-gradient(180deg, rgba(18,16,13,0.3), rgba(18,16,13,0.7)), url("/assets/Girl_Slider.webp")' 
        }}
      ><div className="container">
    <FadeIn>
      <h1 dangerouslySetInnerHTML={{ __html: t('heroTitle').replace('wellness', '<em>wellness</em>').replace('bienestar', '<em>bienestar</em>') }} />
    </FadeIn>
    <FadeIn delay={0.2}>
      <p className="lede">{t('heroSubtitle')}</p>
    </FadeIn>
    <FadeIn delay={0.4}>
      <div className="btn-row">
        <a href="/booking" className="btn btn-primary">{t('bookNow')}</a>
        <a href="/services" className="btn btn-outline">{t('exploreMenu')}</a>
      </div>
    </FadeIn>
  </div>
</section>

<section className="intro-band">
  <div className="container center" style={{ display: "block", maxWidth: "760px" }}>
    <FadeIn>
      <span className="eyebrow center-line">Our Approach</span>
      <h2 dangerouslySetInnerHTML={{ __html: t('approachTitle').replace('you', '<em>you</em>').replace('ti', '<em>ti</em>') }} />
    </FadeIn>
    <FadeIn delay={0.2}>
      <p className="lede" style={{ margin: "0 auto" }}>{t('approachBody')}</p>
    </FadeIn>
  </div>
</section>

<section className="section--tight">
  <div className="container">
    <div className="tile-grid tile-grid--3">
      <FadeIn delay={0.1}>
        <a className="tile" href="services.html#massage">
          <span className="tile-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1745327883508-b6cd32e5dde5?auto=format&fit=crop&w=900&q=80')" }}></span>
          <span className="tile-label">
            <h3>Massage Therapy</h3>
            <span>Hot stone, aromatherapy</span>
          </span>
        </a>
      </FadeIn>
      <FadeIn delay={0.2}>
        <a className="tile" href="services.html#facials">
          <span className="tile-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1731514771613-991a02407132?auto=format&fit=crop&w=900&q=80')" }}></span>
          <span className="tile-label">
            <h3>Facial Services</h3>
            <span>Detox, hydrate, renew</span>
          </span>
        </a>
      </FadeIn>
      <FadeIn delay={0.3}>
        <a className="tile" href="services.html#waxing">
          <span className="tile-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1700760934166-4c766d708139?auto=format&fit=crop&w=900&q=80')" }}></span>
          <span className="tile-label">
            <h3>Waxing Services</h3>
            <span>Quick, clean, comfortable</span>
          </span>
        </a>
      </FadeIn>
    </div>
  </div>
</section>

<section className="cta-banner">
  <div className="container">
    <span className="eyebrow center-line" style={{ color: "var(--gold)" }}>The Gift of Rest</span>
    <h2>Give someone a day of <em>calm</em></h2>
    <p className="lede">A Grisel Beauty Spa gift card is an open invitation to slow down. Perfect for birthdays, holidays, or simply saying thank you.</p>
    <div className="btn-row" style={{ justifyContent: "center" }}>
      <a href="/gift-cards" className="btn btn-outline">Learn About Gift Cards</a>
    </div>
  </div>
</section>

<ReviewCarousel />

<section className="section--tight section--olive">
  <div className="container center">
    <FadeIn>
      <h2>{t('readyTitle')}</h2>
      <p className="lede">{t('readyBody')}</p>
    </FadeIn>
    <FadeIn delay={0.2}>
      <div className="btn-row">
        <a href="/booking" className="btn btn-primary">{t('bookNow')}</a>
        <a href="tel:2407010731" className="btn btn-outline">Call (240) 701-0731</a>
      </div>
    </FadeIn>
  </div>
</section>




    </Layout>
  );
}
