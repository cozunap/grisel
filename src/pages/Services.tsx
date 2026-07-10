import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { FadeIn } from '../components/FadeIn';
import { Link } from 'react-router';
import { servicesData } from '../data/services';
import { useEffect } from 'react';
import '../index.css';

export default function Services() {
  useEffect(() => {
    // JS logic to initialize components can go here
  }, []);

  const massageServices = servicesData.filter(s => s.category === 'massage');
  const facialServices = servicesData.filter(s => s.category === 'facials');
  const waxingServices = servicesData.filter(s => s.category === 'waxing');

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
            <span className="eyebrow center-line">Treatment Menu</span>
            <h1>Services</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="lede">Every treatment is customized in the room. Durations below are a guide, and any facial or massage can be adjusted for sensitive skin, pregnancy, or a specific concern. Ask when you book.</p>
          </FadeIn>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "20px" }}>
        <div className="container container-narrow">

          <FadeIn direction="up">
            <div className="menu-category" id="massage">
              <h3>Massage Therapy</h3>
              {massageServices.map(service => (
                <div className="menu-item" key={service.id}>
                  <div>
                    <Link to={`/services/${service.id}`} className="menu-item-name" style={{ color: 'inherit', textDecoration: 'none' }}>
                      {service.name}
                    </Link>
                    <span className="menu-item-duration">{service.shortDescription}</span>
                  </div>
                  <Link to={`/services/${service.id}`} className="menu-item-note" style={{ textDecoration: "underline", color: "inherit" }}>
                    View details
                  </Link>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <div className="menu-category" id="facials">
              <h3>Facial Services</h3>
              {facialServices.map(service => (
                <div className="menu-item" key={service.id}>
                  <div>
                    <Link to={`/services/${service.id}`} className="menu-item-name" style={{ color: 'inherit', textDecoration: 'none' }}>
                      {service.name}
                    </Link>
                    <span className="menu-item-duration">{service.shortDescription}</span>
                  </div>
                  <Link to={`/services/${service.id}`} className="menu-item-note" style={{ textDecoration: "underline", color: "inherit" }}>
                    View details
                  </Link>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <div className="menu-category" id="waxing">
              <h3>Waxing Services</h3>
              {waxingServices.map(service => (
                <div className="menu-item" key={service.id}>
                  <div>
                    <Link to={`/services/${service.id}`} className="menu-item-name" style={{ color: 'inherit', textDecoration: 'none' }}>
                      {service.name}
                    </Link>
                    <span className="menu-item-duration">{service.shortDescription}</span>
                  </div>
                  <Link to={`/services/${service.id}`} className="menu-item-note" style={{ textDecoration: "underline", color: "inherit" }}>
                    View details
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
            <h2>Not sure where to start?</h2>
            <p className="lede">Call or send a message and we'll help you pick the right treatment for your skin, your schedule, and your budget.</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="btn-row">
              <a href="/booking" className="btn btn-primary">Book Appointment</a>
              <a href="tel:2407010731" className="btn btn-outline">Call (240) 701-0731</a>
            </div>
          </FadeIn>
        </div>
      </section>

    </Layout>
  );
}
