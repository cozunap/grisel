import { useState, useEffect } from 'react';

export default function StickyBooking() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky button after scrolling past the hero banner (approx 300px)
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="sticky-booking-container">
      <a href="/booking" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1.1rem', justifyContent: 'center' }}>
        Book Appointment
      </a>
    </div>
  );
}
