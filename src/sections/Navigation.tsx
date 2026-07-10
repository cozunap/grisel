import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import useScrollShadow from '@/hooks/useScrollShadow';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Membership', href: '#membership' },
  { label: 'Gift Cards', href: '#gift-cards' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const hasShadow = useScrollShadow(520);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full bg-cream transition-shadow duration-200 ${
          hasShadow ? 'shadow-[0_1px_0_rgba(42,35,32,0.08)]' : ''
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Brand */}
          <span className="font-serif text-2xl text-text-primary">
            Grisel Beauty Spa
          </span>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-[13px] font-semibold tracking-nav uppercase text-text-primary hover:opacity-70 transition-opacity duration-200 ${
                  link.label === 'Home'
                    ? 'border-b-2 border-terracotta pb-1'
                    : ''
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-cream pt-[72px] md:hidden">
          <div className="flex flex-col items-center gap-8 pt-12">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleNavClick}
                className={`text-lg font-semibold tracking-nav uppercase text-text-primary hover:opacity-70 transition-opacity duration-200 ${
                  link.label === 'Home'
                    ? 'border-b-2 border-terracotta pb-1'
                    : ''
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
