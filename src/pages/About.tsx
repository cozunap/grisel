import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { FadeIn } from '../components/FadeIn';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../index.css';

export default function About() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, 'content', 'about'));
      if (snap.exists()) setData(snap.data());
    };
    fetchData();
  }, []);

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
            <span className="eyebrow">About Grisel Beauty Spa</span>
            <h1>{data?.heroTitle || "Revitalise your senses and refresh your mind!"}</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="lede">{data?.heroSubtitle || "GRISEL BEAUTY SPA is the ideal solution for those looking to relax and find balance of health in all physical, psychological, mental, and spiritual levels."}</p>
          </FadeIn>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <div>
              <FadeIn>
                <h2>Our Philosophy</h2>
                {data?.philosophyText ? (
                  data.philosophyText.split('\\n').map((para: string, idx: number) => (
                    <p key={idx}>{para}</p>
                  ))
                ) : (
                  <p>We provide noninvasive novel treatments with the latest trends in spa and alternative therapies to restore and maintain health.</p>
                )}
              </FadeIn>
            </div>
            <div>
              <FadeIn delay={0.4} direction="left">
                <img src={data?.philosophyImage || "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"} alt="Relaxing hot stone massage therapy at Grisel Spa" loading="lazy" style={{ borderRadius: '12px', width: '100%', boxShadow: 'var(--shadow-large)' }} />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="section--olive">
        <div className="container">
          <div className="center-line center" style={{ marginBottom: '40px' }}>
            <FadeIn>
              <span className="eyebrow">{data?.offeringsSubtitle || "Find Your True Self"}</span>
              <h2>{data?.offeringsTitle || "Our Core Offerings"}</h2>
            </FadeIn>
          </div>
          <div className="grid grid-3">
            <FadeIn delay={0.1}>
              <div className="plain-card">
                <div className="icon-ring">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 2C9 6 6 9 6 13a6 6 0 0 0 12 0c0-4-3-7-6-11z"/></svg>
                </div>
                <h3>{data?.offer1Title || "Aromatherapy"}</h3>
                <p>{data?.offer1Desc || "A therapeutic discipline that exploits the properties of essential oils extracted from aromatic plants to restore balance and harmony of body and mind."}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="plain-card">
                <div className="icon-ring">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.2"/></svg>
                </div>
                <h3>{data?.offer2Title || "Meditation"}</h3>
                <p>{data?.offer2Desc || "Practiced for thousands of years, meditation is a tool for rediscovering the body’s own inner intelligence. It increases energy levels and lowers anxiety, helping you disconnect from the frantic activity of daily life."}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="plain-card">
                <div className="icon-ring">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0z"/><path d="M12 8v4l3 2"/></svg>
                </div>
                <h3>{data?.offer3Title || "Body & Facial Treatments"}</h3>
                <p>{data?.offer3Desc || "We help you identify what your body and mind need. Find options to stimulate harmony with tailored relaxation programs. We have therapeutic and cosmetic packages for every occasion and need."}</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="container center">
          <FadeIn>
            <h2>{data?.ctaTitle || "Come experience it for yourself"}</h2>
            <p className="lede">{data?.ctaSubtitle || "Do not hesitate to contact us to find options to stimulate the harmony of your body and mind."}</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="btn-row">
              <a href="/booking" className="btn btn-primary">Book Appointment</a>
              <a href="/services" className="btn btn-outline">View Services</a>
            </div>
          </FadeIn>
        </div>
      </section>

    </Layout>
  );
}
