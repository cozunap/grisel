import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { FadeIn } from '../components/FadeIn';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useTranslation } from 'react-i18next';
import { servicesData } from '../data/services';

export default function Booking() {
  const { t } = useTranslation('booking');
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    services: [] as string[]
  });
  
  const [status, setStatus] = useState('');

  // Extract service ID from URL and pre-select it
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceId = params.get('service');
    if (serviceId) {
      setFormData(prev => ({ ...prev, services: [serviceId] }));
    }
  }, [location]);

  const handleServiceChange = (serviceId: string) => {
    setFormData(prev => {
      if (prev.services.includes(serviceId)) {
        return { ...prev, services: prev.services.filter(s => s !== serviceId) };
      } else {
        return { ...prev, services: [...prev.services, serviceId] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(t('sending'));
    
    try {
      await addDoc(collection(db, 'bookings'), {
        ...formData,
        createdAt: new Date()
      });

      setStatus(t('success'));
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error(error);
      setStatus(t('error'));
    }
  };

  return (
    <Layout>
      <SEO 
        title="Book Appointment | Luxury Spa Package Maryland" 
        description="Book your luxury spa package in Maryland. Schedule exclusive spa day packages, private spa events, or premium wellness retreats."
        canonical="/booking"
        keywords="book luxury spa package Maryland, premium spa gift certificates MD, exclusive spa day packages for couples, top-rated beauty spa near me, private spa event booking MD"
      />
      
      <section className="hero-banner" style={{ minHeight: "300px", padding: "80px 0 40px", backgroundImage: "linear-gradient(180deg, rgba(33,29,25,0.38), rgba(33,29,25,0.58)), url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1800&q=80')" }}>
        <div className="container center">
          <FadeIn>
            <h1>{t('heroTitle')}</h1>
            <p className="lede">{t('heroSubtitle')}</p>
          </FadeIn>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: "800px" }}>
          {status && (
            <div style={{ padding: "16px", marginBottom: "24px", background: "var(--olive)", color: "var(--ink)", borderRadius: "var(--radius-md)", textAlign: "center", fontWeight: "bold" }}>
              {status}
            </div>
          )}
          
          <FadeIn delay={0.2} direction="up">
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px", background: "var(--white)", padding: "40px", borderRadius: "var(--radius-md)", border: "1px solid var(--line)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label htmlFor="firstName" style={{ fontWeight: 500 }}>{t('firstName')}</label>
                  <input type="text" id="firstName" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} style={{ padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--line)", fontFamily: "inherit" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label htmlFor="lastName" style={{ fontWeight: 500 }}>{t('lastName')}</label>
                  <input type="text" id="lastName" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} style={{ padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--line)", fontFamily: "inherit" }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label htmlFor="email" style={{ fontWeight: 500 }}>{t('email')}</label>
                  <input type="email" id="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--line)", fontFamily: "inherit" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label htmlFor="phone" style={{ fontWeight: 500 }}>{t('phone')}</label>
                  <input type="tel" id="phone" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--line)", fontFamily: "inherit" }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label htmlFor="date" style={{ fontWeight: 500 }}>{t('date')}</label>
                  <input type="date" id="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} style={{ padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--line)", fontFamily: "inherit" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label htmlFor="time" style={{ fontWeight: 500 }}>{t('time')}</label>
                  <input type="time" id="time" required value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} style={{ padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--line)", fontFamily: "inherit" }} />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <label style={{ fontWeight: 500 }}>{t('selectServices')}</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {servicesData.map(service => (
                    <label key={service.id} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                      <input 
                        type="checkbox" 
                        checked={formData.services.includes(service.id)}
                        onChange={() => handleServiceChange(service.id)}
                        style={{ width: "18px", height: "18px", accentColor: "var(--gold)" }}
                      />
                      {service.name}
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: "16px", padding: "16px", fontSize: "1.1rem", justifyContent: "center" }}>
                {t('requestAppointment')}
              </button>
              <p style={{ fontSize: "0.9rem", color: "var(--ink-soft)", textAlign: "center", margin: 0 }}>
                {t('disclaimer')}
              </p>
            </form>
          </FadeIn>
        </div>
      </section>

    </Layout>
  );
}
