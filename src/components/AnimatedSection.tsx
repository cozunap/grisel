import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  delay?: number;
}

export default function AnimatedSection({
  children,
  className = '',
  stagger = 0.1,
  y = 30,
  delay = 0,
}: AnimatedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.children;
    if (elements.length === 0) return;

    gsap.from(elements, {
      opacity: 0,
      y,
      duration: 0.7,
      stagger,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
