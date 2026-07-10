import { useState, useEffect } from 'react';

import { useLocation, Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import FloatingActions from './FloatingActions';
import CookieConsent from './CookieConsent';
import StickyBooking from './StickyBooking';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation('layout');

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
              <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>{t('navHome')}</Link></li>
              <li><Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>{t('navServices')}</Link></li>
              <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>{t('navAbout')}</Link></li>
              <li><Link to="/catalogue" className={location.pathname === '/catalogue' ? 'active' : ''}>{t('navCatalogue')}</Link></li>
              <li><Link to="/membership" className={location.pathname === '/membership' ? 'active' : ''}>{t('navMembership')}</Link></li>
              <li><Link to="/gift-cards" className={location.pathname === '/gift-cards' ? 'active' : ''}>{t('navGiftCards')}</Link></li>
              <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>{t('navContact')}</Link></li>
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
              <p>{t('footerDesc')}</p>
            </div>
            <div>
              <h4>{t('footerExplore')}</h4>
              <ul>
                <li><Link to="/services">{t('navServices')}</Link></li>
                <li><Link to="/membership">{t('navMembership')}</Link></li>
                <li><Link to="/booking">{t('footerBook')}</Link></li>
                <li><Link to="/gift-cards">{t('navGiftCards')}</Link></li>
                <li><Link to="/about">{t('footerAbout')}</Link></li>
                <li><Link to="/catalogue">{t('navCatalogue')}</Link></li>
              </ul>
            </div>
            <div>
              <h4>{t('footerVisit')}</h4>
              <ul>
                <li>1620 Elton Rd, Suite 205<br />Silver Spring, MD 20903</li>
                <li><a href="tel:2407010731">(240) 701-0731</a></li>
              </ul>
            </div>
            <div>
              <h4>{t('footerHours')}</h4>
              <ul>
                <li>{t('footerHoursSat')}</li>
                <li>{t('footerHoursWeek')}</li>
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
