import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.8,
  className = ''
}: FadeInProps) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directions[direction],
        filter: 'blur(8px)'
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)'
      }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 1, 0.5, 1] // Custom smooth bezier curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
