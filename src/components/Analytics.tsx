import { useEffect } from 'react';
import { useLocation } from 'react-router';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-8HW3K0Y8P8', {
        page_path: location.pathname + location.search
      });
    }
  }, [location]);

  return null;
}
