import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GrouponPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Open after a small delay for better UX
    const openTimer = setTimeout(() => {
      setIsOpen(true);
      
      // Auto close after 7 seconds of being open
      const closeTimer = setTimeout(() => {
        setIsOpen(false);
      }, 7000);
      
      // Cleanup the close timer if the component unmounts before it fires
      return () => clearTimeout(closeTimer);
    }, 500);

    return () => clearTimeout(openTimer);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '20px'
          }}
        >
          <motion.div 
            initial={{ x: '100vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100vw', opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              padding: '30px 40px 40px 40px',
              maxWidth: '450px',
              width: '100%',
              position: 'relative',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                fontSize: '28px',
                cursor: 'pointer',
                color: '#999',
                lineHeight: '1',
                padding: '5px'
              }}
              aria-label="Close popup"
            >
              &times;
            </button>

            {/* Logo */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <img src="/assets/grisel-logo.svg" alt="Grisel Beauty Spa" style={{ height: '180px', margin: '0 auto' }} />
            </div>

            <h2 style={{ 
              color: '#1c2a38', 
              marginBottom: '20px', 
              fontFamily: 'var(--font-serif)', 
              fontSize: '32px',
              fontWeight: 'normal',
              letterSpacing: '0.5px'
            }}>
              Special Groupon Offers!
            </h2>
            
            <p style={{ 
              color: '#666', 
              marginBottom: '35px', 
              lineHeight: '1.6',
              fontSize: '18px'
            }}>
              Check out our latest deals on Groupon for incredible savings on your next spa day.
            </p>

            <a 
              href="https://www.groupon.com/biz/adelphi-md/grisel-beauty-spa?srsltid=AfmBOopXKPlvt-wTT6dsxkGh-Z29yn4iqAiY42PbWHMw3EaN4Mrge5pU"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ 
                display: 'inline-block', 
                width: 'auto', 
                boxSizing: 'border-box',
                fontSize: '12px',
                color: '#fff',
                padding: '10px 30px',
                backgroundColor: '#2e8b57', // Match the groupon green from the image closely
                borderColor: '#2e8b57'
              }}
              onClick={() => setIsOpen(false)}
            >
              View Groupon Deals
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
