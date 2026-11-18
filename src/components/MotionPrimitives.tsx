import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'motion/react';

export type RevealDirection = 'left' | 'right' | 'top' | 'bottom' | 'none';

export const SAMITECH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const SAMITECH_DURATION = 1.25;
export const SAMITECH_STAGGER = 0.16;
export const SAMITECH_VIEWPORT = { once: false, amount: 0.08 } as const;

export function useMotionConfigValues() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [isCompactScreen, setIsCompactScreen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 767px)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const handleChange = (event: MediaQueryListEvent) => {
      setIsCompactScreen(event.matches);
    };

    setIsCompactScreen(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const distance = shouldReduceMotion ? 0 : isCompactScreen ? 30 : 60;

  return { distance, shouldReduceMotion, isCompactScreen };
}

export function createRevealVariants(
  direction: RevealDirection,
  distance: number,
  delay = 0,
  duration = SAMITECH_DURATION
): Variants {
  if (distance === 0) {
    return {
      hidden: { opacity: 1, x: 0, y: 0 },
      visible: { opacity: 1, x: 0, y: 0 },
    };
  }

  let initialX = 0;
  let initialY = 0;

  if (direction === 'left') initialX = -distance;
  if (direction === 'right') initialX = distance;
  if (direction === 'top') initialY = -distance;
  if (direction === 'bottom') initialY = distance;

  return {
    hidden: {
      opacity: 0,
      x: initialX,
      y: initialY,
      transition: {
        duration: 0.35,
        delay: 0,
        ease: SAMITECH_EASE,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: SAMITECH_EASE,
      },
    },
  };
}

interface RevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  immediate?: boolean;
  className?: string;
  wrapperClassName?: string;
}

export function Reveal({
  children,
  direction = 'bottom',
  delay = 0,
  duration = SAMITECH_DURATION,
  immediate = false,
  className,
  wrapperClassName,
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, SAMITECH_VIEWPORT);
  const { distance, shouldReduceMotion } = useMotionConfigValues();
  const variants = createRevealVariants(direction, distance, delay, duration);

  if (shouldReduceMotion) {
    if (wrapperClassName) {
      return (
        <div className={wrapperClassName}>
          <div className={className}>{children}</div>
        </div>
      );
    }
    return <div className={className}>{children}</div>;
  }

  if (immediate) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={containerRef} className={wrapperClassName}>
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
