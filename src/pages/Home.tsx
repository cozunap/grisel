import Layout from '../components/Layout';
import SEO from '../components/SEO';
import GrouponPopup from '../components/GrouponPopup';
import { FadeIn } from '../components/FadeIn';
import ReviewCarousel from '../components/ReviewCarousel';
import { useTranslation } from 'react-i18next';
import '../index.css';

export default function Home() {
  const { t } = useTranslation('home');

  return (
    <Layout>
      <SEO 
        title="Luxury Spa Maryland | Premium Beauty & Wellness Retreat" 
        description="Experience a boutique day spa in Maryland. We offer five-star spa treatments, high-end facials, and premium body sculpting in an exclusive beauty lounge." 
        canonical="/"
        keywords="luxury spa Maryland, premium beauty spa MD, elite wellness retreat Maryland, boutique day spa Maryland, five-star spa treatments MD, exclusive beauty lounge Maryland, high-end facial treatments Maryland, private spa suites MD"
        schema={JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["HealthAndBeautyBusiness", "Corporation"],
          "name": "Grisel Beauty Spa",
          "image": "https://griselbeautyspa.com/og-image.jpg",
          "url": "https://griselbeautyspa.com",
          "telephone": "+12407010731",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "11120 New Hampshire Ave Suite 406",
            "addressLocality": "Silver Spring",
            "addressRegion": "MD",
            "postalCode": "20904",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "39.0416",
            "longitude": "-76.9934"
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "09:00",
              "closes": "19:00"
            }
          ],
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
      >
        <div className="container">
          <FadeIn>
            <h1 dangerouslySetInnerHTML={{ __html: t('heroTitle').replace('wellness', '<em>wellness</em>').replace('bienestar', '<em>bienestar</em>').replace('bien-être', '<em>bien-être</em>') }} />
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
            <span className="eyebrow center-line">{t('ourApproach')}</span>
            <h2 dangerouslySetInnerHTML={{ __html: t('approachTitle').replace('you', '<em>you</em>').replace('ti', '<em>ti</em>').replace('vous', '<em>vous</em>') }} />
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="lede" style={{ margin: "0 auto" }}>{t('approachBody')}</p>
          </FadeIn>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <div className="tile-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", maxWidth: "900px", margin: "0 auto" }}>
            <FadeIn delay={0.1}>
              <a className="tile" href="/services#massage">
                <span className="tile-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1745327883508-b6cd32e5dde5?auto=format&fit=crop&w=900&q=80')" }}></span>
                <span className="tile-label">
                  <h3>{t('massageTherapy')}</h3>
                  <span>{t('massageSubtitle')}</span>
                </span>
              </a>
            </FadeIn>
            <FadeIn delay={0.2}>
              <a className="tile" href="/services#waxing">
                <span className="tile-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1700760934166-4c766d708139?auto=format&fit=crop&w=900&q=80')" }}></span>
                <span className="tile-label">
                  <h3>{t('waxingServices')}</h3>
                  <span>{t('waxingSubtitle')}</span>
                </span>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <span className="eyebrow center-line" style={{ color: "var(--gold)" }}>{t('giftOfRest')}</span>
          <h2 dangerouslySetInnerHTML={{ __html: t('giftTitle') }} />
          <p className="lede">{t('giftBody')}</p>
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <a href="/gift-cards" className="btn btn-outline">{t('learnGiftCards')}</a>
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
              <a href="tel:2407010731" className="btn btn-outline">{t('callUs')}</a>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
