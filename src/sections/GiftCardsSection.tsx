import AnimatedSection from '@/components/AnimatedSection';
import SectionLabel from '@/components/SectionLabel';

export default function GiftCardsSection() {
  return (
    <section id="gift-cards" className="w-full py-28 md:py-[120px] bg-dark-brown">
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <AnimatedSection stagger={0.1}>
          <SectionLabel text="THE GIFT OF REST" />
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-white leading-[1.15] tracking-tight">
            Give someone a day of <em className="text-warm-gold">calm</em>
          </h2>
          <p className="mt-5 text-base text-white/75 leading-relaxed">
            A Grisel Beauty Spa gift card is an open invitation to slow down.
            Perfect for birthdays, holidays, or simply saying thank you.
          </p>
          <a
            href="#gift-cards"
            className="inline-block mt-8 px-9 py-3.5 border border-white/40 text-white text-[13px] font-semibold tracking-button uppercase rounded-pill hover:bg-white/10 transition-colors duration-200"
          >
            LEARN ABOUT GIFT CARDS
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
