import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.from(headingRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.2,
    })
      .from(
        descRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
        },
        '-=0.4'
      )
      .from(
        buttonsRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
        },
        '-=0.4'
      );
  }, { scope: heroRef });

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full min-h-[520px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <img
        src="/asset_1.webp"
        alt="Premium hot stone massage therapy at Grisel Spa Maryland"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-brown/35 to-dark-brown/45" />

      {/* Content */}
      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center py-20">
        <div ref={headingRef}>
          <h1 className="font-serif text-5xl md:text-6xl text-white leading-[1.1] tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
            Give yourself a moment of
            <br />
            <em className="text-warm-gold">wellness</em>
          </h1>
        </div>

        <p
          ref={descRef}
          className="mt-6 text-base text-white/90 max-w-[560px] mx-auto leading-relaxed"
        >
          A quiet, personal-attention spa built around one idea: rest is not a
          luxury, it is maintenance. Facials, massage therapy, and waxing,
          delivered with care and unhurried attention.
        </p>

        <div
          ref={buttonsRef}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#booking"
            className="inline-block px-9 py-3.5 bg-terracotta text-white text-[13px] font-semibold tracking-button uppercase rounded-pill hover:bg-terracotta-dark transition-colors duration-200"
          >
            BOOK YOUR APPOINTMENT
          </a>
          <a
            href="#services"
            className="inline-block px-9 py-3.5 border border-white/40 text-white text-[13px] font-semibold tracking-button uppercase rounded-pill hover:bg-white/10 transition-colors duration-200"
          >
            VIEW SERVICES
          </a>
        </div>
      </div>
    </section>
  );
}
