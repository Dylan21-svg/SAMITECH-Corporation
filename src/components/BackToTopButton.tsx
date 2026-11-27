import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { SAMITECH_EASE, useMotionConfigValues } from './MotionPrimitives';

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { shouldReduceMotion } = useMotionConfigValues();

  useEffect(() => {
    const updateScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setIsVisible(y > 320);
      setScrollProgress(docHeight > 0 ? Math.min(1, Math.max(0, y / docHeight)) : 0);
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  };

  const radius = 19;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - scrollProgress);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={handleScrollToTop}
          aria-label="Back to top"
          title="Back to top"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.18, ease: SAMITECH_EASE }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 w-11 h-11 rounded-full bg-[#07133B]/92 hover:bg-[#002BFF] text-white shadow-[0_10px_26px_rgba(4,11,41,0.3)] border border-white/20 backdrop-blur-md flex items-center justify-center transition-colors duration-150 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0044FF]"
        >
          <svg
            viewBox="0 0 44 44"
            className="pointer-events-none absolute inset-0 w-full h-full -rotate-90"
            aria-hidden="true"
          >
            <circle
              cx="22"
              cy="22"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.16)"
              strokeWidth="2"
            />
            <circle
              cx="22"
              cy="22"
              r={radius}
              fill="none"
              stroke="#60A5FA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
            />
          </svg>
          <ArrowUp className="relative z-10 w-4 h-4" strokeWidth={2.3} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
