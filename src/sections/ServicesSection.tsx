import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceCard from '@/components/ServiceCard';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    image: '/asset_2.webp',
    title: 'Massage Therapy',
    subtitle: 'HOT STONE, AROMATHERAPY',
    href: '#services',
  },
  {
    image: '/asset_3.webp',
    title: 'Facial Services',
    subtitle: 'DETOX, HYDRATE, RENEW',
    href: '#services',
  },
  {
    image: '/asset_4.webp',
    title: 'Waxing Services',
    subtitle: 'QUICK, CLEAN, COMFORTABLE',
    href: '#services',
  },
];

export default function ServicesSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.children;

    gsap.from(cards, {
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 80%',
        once: true,
      },
    });
  }, { scope: gridRef });

  return (
    <section id="services" className="w-full pb-24 md:pb-[100px] bg-cream">
      <div className="max-w-[1200px] mx-auto px-6">
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              image={service.image}
              title={service.title}
              subtitle={service.subtitle}
              href={service.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
