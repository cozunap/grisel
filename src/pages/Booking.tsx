import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { FadeIn } from '../components/FadeIn';

export default function Booking() {
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
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');
    if (service) {
      setFormData(prev => ({ ...prev, services: [service] }));
    }
  }, []);

  const servicesList = [
    "Aromatherapy",
    "Thai Herbal Balls Massage",
    "Hot Stone Massage",
    "Detox Mud Facial",
    "Hydrating Paraffin Facial",
    "Detox Seaweed Facial",
    "Brazilian Wax",
    "Half Leg Waxing",
    "Eyelashes Tinting"
  ];

  const handleServiceChange = (service: string) => {
    setFormData(prev => {
      if (prev.services.includes(service)) {
        return { ...prev, services: prev.services.filter(s => s !== service) };
      } else {
        return { ...prev, services: [...prev.services, service] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    
    try {
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzCA6T1C0Y0cYRG65KT5uaAJBFRXGzaarauSt9A7vLWL3olY6HYnq1AqLyD0ZWHyVLP/exec';
      
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(formData),
      });

      // Google Apps Script redirect returns an opaque response in no-cors mode
      // If it didn't throw an error, we assume it successfully reached Google
      setStatus('Booking request sent successfully! Redirecting to services...');
      setTimeout(() => {
        navigate('/services');
      }, 2000);
    } catch (error) {
      console.error(error);
      setStatus('Failed to connect to the booking server. Please try calling us instead.');
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
            <h1>Book an Appointment</h1>
            <p className="lede">Schedule your next relaxing experience with us.</p>
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
                  <label htmlFor="firstName" style={{ fontWeight: 500 }}>First Name</label>
                  <input type="text" id="firstName" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} style={{ padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--line)", fontFamily: "inherit" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label htmlFor="lastName" style={{ fontWeight: 500 }}>Last Name</label>
                  <input type="text" id="lastName" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} style={{ padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--line)", fontFamily: "inherit" }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label htmlFor="email" style={{ fontWeight: 500 }}>Email Address</label>
                  <input type="email" id="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--line)", fontFamily: "inherit" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label htmlFor="phone" style={{ fontWeight: 500 }}>Phone Number</label>
                  <input type="tel" id="phone" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--line)", fontFamily: "inherit" }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label htmlFor="date" style={{ fontWeight: 500 }}>Desired Date</label>
                  <input type="date" id="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} style={{ padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--line)", fontFamily: "inherit" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label htmlFor="time" style={{ fontWeight: 500 }}>Desired Time</label>
                  <input type="time" id="time" required value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} style={{ padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--line)", fontFamily: "inherit" }} />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <label style={{ fontWeight: 500 }}>Select Services</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {servicesList.map(service => (
                    <label key={service} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                      <input 
                        type="checkbox" 
                        checked={formData.services.includes(service)}
                        onChange={() => handleServiceChange(service)}
                        style={{ width: "18px", height: "18px", accentColor: "var(--gold)" }}
                      />
                      {service}
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: "16px", padding: "16px", fontSize: "1.1rem", justifyContent: "center" }}>
                Request Appointment
              </button>
              <p style={{ fontSize: "0.9rem", color: "var(--ink-soft)", textAlign: "center", margin: 0 }}>
                This is an appointment request. We will contact you to confirm the exact time and details.
              </p>
            </form>
          </FadeIn>
        </div>
      </section>

    </Layout>
  );
}
