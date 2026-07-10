import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('grisel_cookie_consent');
    if (!consent) {
      // Delay showing it slightly for a smoother entry
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('grisel_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('grisel_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent-overlay">
      <div className="cookie-consent-box">
        <div className="cookie-content">
          <h4>We value your privacy</h4>
          <p>
            We use essential cookies to make our site work. With your consent, we may also use non-essential cookies to improve user experience and analyze website traffic.
          </p>
        </div>
        <div className="cookie-actions">
          <button onClick={handleDecline} className="btn btn-outline btn-sm">Decline</button>
          <button onClick={handleAccept} className="btn btn-primary btn-sm">Accept All</button>
        </div>
      </div>
    </div>
  );
}
