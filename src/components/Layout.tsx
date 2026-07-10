import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useLocation, Link } from 'react-router';
import FloatingActions from './FloatingActions';
import CookieConsent from './CookieConsent';
import StickyBooking from './StickyBooking';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  // Close nav when route changes
  useEffect(() => {
    setIsNavOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (isNavOpen) {
      document.body.classList.add('nav-locked');
    } else {
      document.body.classList.remove('nav-locked');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('nav-locked');
    };
  }, [isNavOpen]);

  // Handle escape key to close nav
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isNavOpen) {
        setIsNavOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isNavOpen]);

  return (
    <>
      <header className={`site-header ${isNavOpen ? 'nav-open' : ''}`}>
        <div className="container">
          <Link to="/" className="brand">
            <img src="/assets/grisel-logo.svg" alt="Grisel Beauty Spa" style={{ height: "80px" }} />
          </Link>
          <nav className="nav">
            <ul className="nav-links">
              <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
              <li><Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>Services</Link></li>
              <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link></li>
              <li><Link to="/catalogue" className={location.pathname === '/catalogue' ? 'active' : ''}>Catalogue</Link></li>
              <li><Link to="/membership" className={location.pathname === '/membership' ? 'active' : ''}>Membership</Link></li>
              <li><Link to="/gift-cards" className={location.pathname === '/gift-cards' ? 'active' : ''}>Gift Cards</Link></li>
              <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
            </ul>
          </nav>
          <button 
            className="nav-toggle" 
            type="button" 
            aria-label="Toggle menu" 
            aria-expanded={isNavOpen}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
      
      <div 
        className={`nav-backdrop ${isNavOpen ? 'show' : ''}`} 
        aria-hidden="true"
        onClick={() => setIsNavOpen(false)}
      ></div>

      <main>
        {children}
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="brand">
                <img src="/assets/grisel-logo.svg" alt="Grisel Beauty Spa" style={{ height: "60px" }} />
              </div>
              <p>A beauty spa dedicated to inspiring life in balance, serving Silver Spring and the greater MD, DC, and VA area.</p>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/membership">Membership</Link></li>
                <li><Link to="/booking">Book an Appointment</Link></li>
                <li><Link to="/gift-cards">Gift Cards</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/catalogue">Catalogue</Link></li>
              </ul>
            </div>
            <div>
              <h4>Visit</h4>
              <ul>
                <li>1620 Elton Rd, Suite 205<br />Silver Spring, MD 20903</li>
                <li><a href="tel:2407010731">(240) 701-0731</a></li>
              </ul>
            </div>
            <div>
              <h4>Hours</h4>
              <ul>
                <li>Saturday: 10:00 am &#8211; 7:00 pm</li>
                <li>Mon &#8211; Fri: By appointment</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&#169; 2026 Grisel Beauty Spa. All rights reserved.</span>
            <span>Site by <a href="https://cozuna.com" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>cozuna.com</a></span>
          </div>
        </div>
      </footer>
      <FloatingActions />
      <CookieConsent />
      <StickyBooking />
    </>
  );
}
