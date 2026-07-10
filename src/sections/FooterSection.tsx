import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const exploreLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Membership', href: '#membership' },
  { label: 'Book an Appointment', href: '#booking' },
  { label: 'Gift Cards', href: '#gift-cards' },
  { label: 'About Us', href: '#about' },
];

export default function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!columnsRef.current) return;

    const columns = columnsRef.current.children;

    gsap.from(columns, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 85%',
        once: true,
      },
    });
  }, { scope: footerRef });

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="w-full bg-dark-brown pt-20 pb-10"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div
          ref={columnsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Brand Column */}
          <div>
            <span className="font-serif text-2xl text-white">
              Grisel Beauty Spa
            </span>
            <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-[240px]">
              A beauty spa dedicated to inspiring life in balance, serving Silver
              Spring and the greater MD, DC, and VA area.
            </p>
          </div>

          {/* Explore Column */}
          <div>
            <h4 className="text-[13px] font-semibold tracking-nav uppercase text-white mb-5">
              EXPLORE
            </h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit Column */}
          <div>
            <h4 className="text-[13px] font-semibold tracking-nav uppercase text-white mb-5">
              VISIT
            </h4>
            <div className="text-sm text-white/70 leading-[1.8]">
              <p>1620 Elton Rd, Suite 205</p>
              <p>Silver Spring, MD 20903</p>
              <p className="mt-2">
                <a
                  href="tel:+12407010731"
                  className="hover:underline transition-all duration-150"
                >
                  (240) 701-0731
                </a>
              </p>
            </div>
          </div>

          {/* Hours Column */}
          <div>
            <h4 className="text-[13px] font-semibold tracking-nav uppercase text-white mb-5">
              HOURS
            </h4>
            <div className="text-sm text-white/70 leading-[1.8]">
              <p>Saturday: 10:00 am – 7:00 pm</p>
              <p>Mon – Fri: By appointment</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © 2026 Grisel Beauty Spa. All rights reserved.
          </p>
          <p className="text-sm text-white/40">
            Site by <span className="text-white/60">Ariaria</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
