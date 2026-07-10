import { useState, useEffect } from 'react';
import { FadeIn } from './FadeIn';

export default function VIPPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the popup in this session
    const dismissed = sessionStorage.getItem('vip_popup_dismissed');
    if (dismissed) {
      setHasDismissed(true);
      return;
    }

    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setHasDismissed(true);
    sessionStorage.setItem('vip_popup_dismissed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate email capture
    alert('Thank you for joining our VIP list! Your 10% discount code is: SPAVIP10');
    handleClose();
  };

  if (!isOpen || hasDismissed) return null;

  return (
    <div className="vip-popup-overlay">
      <div className="vip-popup-content">
        <button onClick={handleClose} className="vip-popup-close" aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        
        <FadeIn direction="up">
          <span className="eyebrow center" style={{ color: 'var(--gold)', marginBottom: '8px' }}>Exclusive Offer</span>
          <h2 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--ink)' }}>Get 10% Off Your First Visit</h2>
          <p style={{ color: 'var(--ink-soft)', marginBottom: '24px' }}>
            Join our VIP list to receive luxury spa tips, exclusive access to new treatments, and 10% off your first appointment.
          </p>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required 
              style={{ padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--line)', width: '100%', fontFamily: 'inherit' }}
            />
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Claim My 10% Off
            </button>
          </form>
          <p style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', marginTop: '16px', textAlign: 'center' }}>
            We respect your privacy. No spam.
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
