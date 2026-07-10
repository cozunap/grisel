import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import '../index.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending message...');

    try {
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzCA6T1C0Y0cYRG65KT5uaAJBFRXGzaarauSt9A7vLWL3olY6HYnq1AqLyD0ZWHyVLP/exec';
      
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          type: 'contact',
          ...formData
        }),
      });

      setStatus('Message sent successfully! Redirecting to services...');
      setTimeout(() => {
        navigate('/services');
      }, 2000);
    } catch (error) {
      console.error(error);
      setStatus('Failed to send message. Please try calling us instead.');
    }
  };

  return (
    <Layout>
      <SEO 
        title="Contact Us | Luxury Med Spa Rockville MD" 
        description="Get in touch with Grisel Beauty Spa. We offer private spa suites, luxury couples spa packages, and high-end facial treatments in Maryland."
        canonical="/contact"
        keywords="luxury spa bethesda, premium wellness spa columbia md, boutique beauty spa annapolis md, luxury day spa maryland, exclusive wellness spa potomac, top-rated beauty spa near me"
      />
      

      <section className="page-header">
        <div className="container">
          <span className="eyebrow center-line">Get In Touch</span>
          <h1>Contact Us</h1>
          <p className="lede">Questions about a treatment, a gift card, or your appointment? Send a message or call us directly.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "20px" }}>
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: "flex-start" }}>

            <div className="form-card">
              <h3>Send a Message</h3>
              
              {status && (
                <div style={{ padding: "16px", marginBottom: "24px", background: "var(--olive)", color: "var(--ink)", borderRadius: "var(--radius-md)", textAlign: "center", fontWeight: "bold" }}>
                  {status}
                </div>
              )}

              <form id="contact-form" onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="c-name">Full Name <span className="req">*</span></label>
                  <input type="text" id="c-name" name="name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ fontFamily: "inherit" }} />
                </div>
                <div className="field">
                  <label htmlFor="c-email">Email Address <span className="req">*</span></label>
                  <input type="email" id="c-email" name="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ fontFamily: "inherit" }} />
                </div>
                <div className="field">
                  <label htmlFor="c-phone">Phone Number</label>
                  <input type="tel" id="c-phone" name="phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ fontFamily: "inherit" }} />
                </div>
                <div className="field">
                  <label htmlFor="c-message">Message <span className="req">*</span></label>
                  <textarea id="c-message" name="message" rows={5} required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{ fontFamily: "inherit" }}></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: "16px", width: "100%", justifyContent: "center" }}>Send Message</button>
              </form>
            </div>

            <div>
              <ul className="info-list" style={{ marginBottom: "30px" }}>
                <li>
                  <div className="info-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 21s-7-6.5-7-11.5A7 7 0 0 1 19 9.5C19 14.5 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.3"/></svg>
                  </div>
                  <div>
                    <strong>Address</strong>
                    <span>1620 Elton Rd, Suite 205<br />Silver Spring, MD 20903</span>
                  </div>
                </li>
                <li>
                  <div className="info-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h2a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L7 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z"/></svg>
                  </div>
                  <div>
                    <strong>Phone</strong>
                    <a href="tel:2407010731">(240) 701-0731</a>
                  </div>
                </li>
                <li>
                  <div className="info-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
                  </div>
                  <div>
                    <strong>Hours</strong>
                    <span>Saturday: 10:00 am &#8211; 7:00 pm<br />Mon &#8211; Fri: By appointment</span>
                  </div>
                </li>
              </ul>

              <div className="map-frame">
                <iframe
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=1620+Elton+Rd+Suite+205+Silver+Spring+MD+20903&output=embed">
                </iframe>
              </div>
            </div>

          </div>
        </div>
      </section>

      
    </Layout>
  );
}
