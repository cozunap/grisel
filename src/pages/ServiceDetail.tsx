import { useParams, Navigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { FadeIn } from '../components/FadeIn';
import '../index.css';

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<any>(null);
  const [relatedServices, setRelatedServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const docSnap = await getDoc(doc(db, 'services', id));
        if (docSnap.exists()) {
          const serviceData = docSnap.data();
          setService({ id: docSnap.id, ...serviceData });
          
          // Fetch related services
          const snapshot = await getDocs(collection(db, 'services'));
          const allServices = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          const related = allServices
            .filter((s: any) => s.category === serviceData.category && s.id !== id)
            .slice(0, 3);
          setRelatedServices(related);
        }
      } catch (err) {
        console.error('Error fetching service detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <p>Loading details...</p>
        </div>
      </Layout>
    );
  }

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  // Schema Markup for Service
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.category,
    "name": service.name,
    "description": service.premiumDescription.join(" "),
    "provider": {
      "@type": "HealthAndBeautyBusiness",
      "name": "Grisel Beauty Spa",
      "image": "https://griselbeautyspa.com/og-image.jpg",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "MD",
        "addressCountry": "US"
      }
    },
    "areaServed": {
      "@type": "State",
      "name": "Maryland"
    },
    "offers": {
      "@type": "Offer",
      "priceRange": service.priceRange,
      "availability": "https://schema.org/InStock",
      "url": `https://griselbeautyspa.com/services/${service.id}`
    }
  };

  return (
    <Layout>
      <SEO 
        title={`${service.name} in Maryland | Grisel Beauty Spa`}
        description={service.shortDescription}
        canonical={`/services/${service.id}`}
        keywords={`${service.name.toLowerCase()} Maryland, premium ${service.category} MD, ${service.id.replace(/-/g, ' ')} near me, luxury spa treatments`}
        schema={JSON.stringify(schema)}
      />

      {/* Hero Section */}
      <section 
        className="hero-banner" 
        style={{ 
          backgroundImage: `linear-gradient(180deg, rgba(18,16,13,0.4), rgba(18,16,13,0.8)), url("${service.image}")`,
          minHeight: '60vh'
        }}
      >
        <div className="container">
          <FadeIn>
            <span className="eyebrow center-line" style={{ color: 'var(--gold)' }}>
              {service.category === 'massage' ? 'Massage Therapy' : service.category === 'facials' ? 'Facial Services' : 'Waxing Services'}
            </span>
            <h1>{service.name}</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="lede" style={{ maxWidth: '800px', margin: '0 auto' }}>
              {service.shortDescription}
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="btn-row" style={{ marginTop: '32px' }}>
              <Link to={`/booking?service=${service.name}`} className="btn btn-primary">Book This Treatment</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Details Section */}
      <section className="section">
        <div className="container container-narrow">
          <FadeIn>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: '24px', marginBottom: '40px' }}>
              <div>
                <span className="eyebrow">Duration</span>
                <p style={{ fontSize: '1.2rem', color: 'var(--ink)' }}>{service.duration}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="eyebrow">Price Range</span>
                <p style={{ fontSize: '1.2rem', color: 'var(--ink)' }}>{service.priceRange}</p>
              </div>
            </div>
          </FadeIn>

          <div style={{ color: 'var(--ink-soft)', fontSize: '1.1rem', lineHeight: '1.8' }}>
            {(Array.isArray(service.premiumDescription) ? service.premiumDescription : service.premiumDescription?.split('\n') || []).filter((p: string) => p.trim() !== '').map((paragraph: string, index: number) => (
              <FadeIn key={index} delay={0.1 * (index + 1)}>
                <p style={{ marginBottom: '24px' }}>{paragraph}</p>
              </FadeIn>
            ))}
          </div>
          
          <FadeIn delay={0.4}>
            <div style={{ marginTop: '48px', padding: '32px', backgroundColor: 'var(--stone)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '16px', fontSize: '1.5rem' }}>Ready to Experience {service.name}?</h3>
              <p style={{ marginBottom: '24px', color: 'var(--ink-soft)' }}>Reserve your session online or call us for personalized assistance.</p>
              <Link to={`/booking?service=${service.name}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Secure Your Appointment
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="section section--olive">
          <div className="container">
            <FadeIn>
              <span className="eyebrow center-line">Explore More</span>
              <h2 className="center">Related Treatments</h2>
            </FadeIn>
            
            <div className="tile-grid tile-grid--3" style={{ marginTop: '48px' }}>
              {relatedServices.map((related, index) => (
                <FadeIn key={related.id} delay={0.1 * (index + 1)}>
                  <Link className="tile" to={`/services/${related.id}`}>
                    <span className="tile-bg" style={{ backgroundImage: `url('${related.image}')` }}></span>
                    <span className="tile-label">
                      <h3>{related.name}</h3>
                      <span>{related.shortDescription.substring(0, 50)}...</span>
                    </span>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

    </Layout>
  );
}
