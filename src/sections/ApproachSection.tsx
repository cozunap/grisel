import AnimatedSection from '@/components/AnimatedSection';
import SectionLabel from '@/components/SectionLabel';

export default function ApproachSection() {
  return (
    <section className="w-full py-24 md:py-[100px] bg-cream">
      <div className="max-w-[680px] mx-auto px-6 text-center">
        <AnimatedSection stagger={0.1}>
          <SectionLabel text="OUR APPROACH" />
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-text-primary leading-[1.15] tracking-tight">
            Treatments built around <em className="text-warm-gold">you</em>, not a
            menu
          </h2>
          <p className="mt-6 text-base text-text-secondary leading-relaxed max-w-[600px] mx-auto">
            Every session starts with a conversation about your skin, your stress,
            and what you need from the hour. Grisel Beauty Spa has spent years
            earning a reputation across Maryland, DC, and Virginia for quality
            products, a clean and calm space, and treatments that are never rushed.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
