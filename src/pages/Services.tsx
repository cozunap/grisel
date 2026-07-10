import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { FadeIn } from '../components/FadeIn';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { servicesData as localServices } from '../data/services';
import '../index.css';

export default function Services() {
  const { t } = useTranslation('services');
  const [servicesData] = useState<any[]>(localServices);
  const loading = false;

  // useEffect(() => {
  //   const fetchServices = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, 'services'));
  //       if (!querySnapshot.empty) {
  //         const services = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //         setServicesData(services);
  //       }
  //     } catch (err) {
  //       console.error('Error fetching services:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchServices();
  // }, []);

  const massageServices = servicesData.filter(s => s.category === 'massage');
  const facialServices = servicesData.filter(s => s.category === 'facials');
  const waxingServices = servicesData.filter(s => s.category === 'waxing');

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <p className="text-stone/50 uppercase tracking-widest">{t('loading')}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO 
        title="High-End Facial Treatments & Massages | Premium Spa MD" 
        description="Indulge in our signature aromatherapy massage, clinical anti-aging facials, and premium deep tissue massages. Book your luxury spa package today."
        canonical="/services"
        keywords="clinical anti-aging facial Maryland, microcurrent lifting facial near me, diamond glow facial Maryland, signature aromatherapy massage MD, premium deep tissue massage, hot stone wellness ritual, detoxifying body wrap luxury spa"
      />
      
      <section className="page-header">
        <div className="container">
          <FadeIn>
            <span className="eyebrow center-line">{t('eyebrow')}</span>
            <h1>{t('title')}</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="lede">{t('lede')}</p>
          </FadeIn>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "20px" }}>
        <div className="container container-narrow">

          <FadeIn direction="up">
            <div className="menu-category" id="massage">
              <h3>{t('massage')}</h3>
              {massageServices.map(service => (
                <div className="menu-item" key={service.id}>
                  <div>
                    <Link to={`/services/${service.id}`} className="menu-item-name" style={{ color: 'inherit', textDecoration: 'none' }}>
                      {service.name}
                    </Link>
                    <span className="menu-item-duration">{service.shortDescription}</span>
                  </div>
                  <Link to={`/booking?service=${service.id}`} className="menu-item-note" style={{ textDecoration: "underline", color: "inherit" }}>
                    {t('bookNowItem')}
                  </Link>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <div className="menu-category" id="facials">
              <h3>{t('facials')}</h3>
              {facialServices.map(service => (
                <div className="menu-item" key={service.id}>
                  <div>
                    <Link to={`/services/${service.id}`} className="menu-item-name" style={{ color: 'inherit', textDecoration: 'none' }}>
                      {service.name}
                    </Link>
                    <span className="menu-item-duration">{service.shortDescription}</span>
                  </div>
                  <Link to={`/booking?service=${service.id}`} className="menu-item-note" style={{ textDecoration: "underline", color: "inherit" }}>
                    {t('bookNowItem')}
                  </Link>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <div className="menu-category" id="waxing">
              <h3>{t('waxing')}</h3>
              {waxingServices.map(service => (
                <div className="menu-item" key={service.id}>
                  <div>
                    <Link to={`/services/${service.id}`} className="menu-item-name" style={{ color: 'inherit', textDecoration: 'none' }}>
                      {service.name}
                    </Link>
                    <span className="menu-item-duration">{service.shortDescription}</span>
                  </div>
                  <Link to={`/booking?service=${service.id}`} className="menu-item-note" style={{ textDecoration: "underline", color: "inherit" }}>
                    {t('bookNowItem')}
                  </Link>
                </div>
              ))}
            </div>
          </FadeIn>

        </div>
      </section>

      <section className="section--tight section--olive">
        <div className="container center">
          <FadeIn>
            <h2>{t('notSure')}</h2>
            <p className="lede">{t('notSureBody')}</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="btn-row">
              <a href="/booking" className="btn btn-primary">{t('bookNow')}</a>
              <a href="tel:2407010731" className="btn btn-outline">{t('call')}</a>
            </div>
          </FadeIn>
        </div>
      </section>

    </Layout>
  );
}
