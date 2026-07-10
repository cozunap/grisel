import { useRef } from 'react';
import { FadeIn } from './FadeIn';

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    date: "2 weeks ago",
    text: "Absolutely the best hot stone massage I've ever had. The atmosphere is so calming and the staff makes you feel like royalty.",
    rating: 5
  },
  {
    id: 2,
    name: "Jessica T.",
    date: "1 month ago",
    text: "I got the Detox Mud Facial and my skin has never looked better. Grisel is incredibly knowledgeable and gentle.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily R.",
    date: "3 months ago",
    text: "The most painless Brazilian wax I've experienced. Highly professional and spotless environment. I won't go anywhere else in Maryland.",
    rating: 5
  },
  {
    id: 4,
    name: "Amanda H.",
    date: "3 weeks ago",
    text: "From the moment you walk in, you feel relaxed. The aromatherapy massage completely relieved my tension.",
    rating: 5
  },
  {
    id: 5,
    name: "Rachel B.",
    date: "2 months ago",
    text: "Incredible attention to detail. The deep tissue massage worked out knots I've had for years. Will be coming back regularly.",
    rating: 5
  },
  {
    id: 6,
    name: "Vanessa C.",
    date: "4 weeks ago",
    text: "The best spa experience in Silver Spring! Grisel makes you feel so welcome and the Anti-Aging Facial was incredibly relaxing.",
    rating: 5
  },
  {
    id: 7,
    name: "Maria L.",
    date: "2 months ago",
    text: "I booked a spa day for my mother and me. They treated us wonderfully. The massage beds are heated and the environment is pure luxury.",
    rating: 5
  },
  {
    id: 8,
    name: "Karen P.",
    date: "1 week ago",
    text: "Found this hidden gem last week. Impeccably clean, tranquil atmosphere, and the most thorough facial I've ever received.",
    rating: 5
  }
];

export default function ReviewCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="section bg-cream">
      <div className="container center" style={{ marginBottom: "40px" }}>
        <FadeIn>
          <span className="eyebrow center-line">Client Experiences</span>
          <h2>What Our Guests Say</h2>
        </FadeIn>
      </div>

      <div className="container relative">
        {/* Navigation Arrows */}
        <button className="carousel-nav prev" onClick={() => scroll('left')} aria-label="Previous reviews">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="review-track" ref={scrollRef}>
          {reviews.map((review) => (
            <div className="review-box" key={review.id}>
              <div className="review-stars">
                {'★'.repeat(review.rating)}
              </div>
              <p className="review-text">"{review.text}"</p>
              <div className="review-author">
                — {review.name}
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-nav next" onClick={() => scroll('right')} aria-label="Next reviews">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
