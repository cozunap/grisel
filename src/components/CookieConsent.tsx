import { useState, useEffect } from 'react';

declare function gtag(...args: any[]): void;

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('grisel_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('grisel_cookie_consent', 'accepted');
    setIsVisible(false);
    // Enable Google Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', { analytics_storage: 'granted' });
      gtag('event', 'page_view');
    }
  };

  const handleDecline = () => {
    localStorage.setItem('grisel_cookie_consent', 'declined');
    setIsVisible(false);
    // Keep GA denied — do nothing
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent-overlay">
      <div className="cookie-consent-box">
        <div className="cookie-content">
          <h4>We value your privacy</h4>
          <p>
            We use Google Analytics to understand how visitors use our site and improve your experience. No data is collected without your consent.
          </p>
        </div>
        <div className="cookie-actions">
          <button onClick={handleDecline} className="btn btn-outline btn-sm">Decline</button>
          <button onClick={handleAccept} className="btn btn-primary btn-sm">Accept</button>
        </div>
      </div>
    </div>
  );
}
