import AnimatedSection from '@/components/AnimatedSection';
import SectionLabel from '@/components/SectionLabel';

const reviews = [
  {
    stars: 5,
    quote:
      'I really enjoyed my Swedish massage. This was a birthday gift, though it felt like a usual scheduled session, relaxing and professional from start to finish.',
    name: 'SHON',
  },
  {
    stars: 5,
    quote:
      'The prices are unbeatable, the location is convenient with plenty of free parking, and the service was excellent. Grisel was very professional and attentive.',
    name: 'LISA GREENE',
  },
  {
    stars: 5,
    quote:
      "Went as a first-time client and loved it. Easy to get to, plenty of parking, and so clean and professional. I got a Brazilian wax and there's not one hair left.",
    name: 'LENIQUA BALLOU',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center justify-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-warm-gold text-sm">
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="w-full py-24 md:py-[100px] bg-cream">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <AnimatedSection stagger={0.1}>
          <SectionLabel text="IN THEIR WORDS" />
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-text-primary leading-[1.15] tracking-tight">
            What our guests are saying
          </h2>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-12">
          {reviews.map((review, index) => (
            <div key={index} className="flex flex-col items-center">
              <StarRating count={review.stars} />
              <blockquote className="mt-4 font-serif italic text-lg text-text-primary leading-[1.7] max-w-[320px]">
                "{review.quote}"
              </blockquote>
              <p className="mt-5 text-xs font-semibold tracking-nav uppercase text-text-secondary">
                {review.name}
              </p>
            </div>
          ))}
        </div>

        <a
          href="https://www.yelp.com/biz/grisel-beauty-spa-silver-spring"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-12 px-9 py-3.5 border border-dark-brown/30 text-text-primary text-[13px] font-semibold tracking-button uppercase rounded-pill hover:bg-dark-brown/5 transition-colors duration-200"
        >
          READ MORE REVIEWS ON YELP
        </a>
      </div>
    </section>
  );
}
