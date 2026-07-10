import AnimatedSection from '@/components/AnimatedSection';

export default function BookingCTASection() {
  return (
    <section
      id="booking"
      className="w-full py-24 md:py-[100px] bg-sage"
    >
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <AnimatedSection stagger={0.1}>
          <h2 className="font-serif text-4xl md:text-5xl text-text-primary leading-[1.15] tracking-tight">
            Ready to book your session?
          </h2>
          <p className="mt-4 text-base text-text-secondary leading-relaxed">
            Saturday appointments book up quickly. Reserve your spot online or
            call us directly.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#booking"
              className="inline-block px-9 py-3.5 bg-terracotta text-white text-[13px] font-semibold tracking-button uppercase rounded-pill hover:bg-terracotta-dark transition-colors duration-200"
            >
              BOOK APPOINTMENT
            </a>
            <a
              href="tel:+12407010731"
              className="inline-block px-9 py-3.5 border border-dark-brown/30 text-text-primary text-[13px] font-semibold tracking-button uppercase rounded-pill hover:bg-dark-brown/5 transition-colors duration-200"
            >
              CALL (240) 701-0731
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
