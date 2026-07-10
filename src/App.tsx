import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Membership from './pages/Membership';
import GiftCards from './pages/GiftCards';
import About from './pages/About';
import Contact from './pages/Contact';
import Catalogue from './pages/Catalogue';
import Booking from './pages/Booking';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';

export default function App() {

  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:id" element={<ServiceDetail />} />
      <Route path="/membership" element={<Membership />} />
      <Route path="/gift-cards" element={<GiftCards />} />
      <Route path="/about" element={<About />} />
      <Route path="/catalogue" element={<Catalogue />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}
