import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Globe2, GraduationCap, Shield, X } from 'lucide-react';
import { ABOUT_MEDIA, COMPANY_CONTACT } from '../data/samitechData';
import { SAMITECH_EASE, useMotionConfigValues } from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGetInTouch: () => void;
}

export function StoryModal({ isOpen, onClose, onGetInTouch }: StoryModalProps) {
  const { shouldReduceMotion } = useMotionConfigValues();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: SAMITECH_EASE }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#040B29]/75 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="story-modal-title"
          onClick={onClose}
        >
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: SAMITECH_EASE }}
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl border border-[#0044FF]/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-[#0000FF] via-[#0044FF] to-[#DC0914]" />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close company story"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 w-10 h-10 rounded-full bg-white/95 hover:bg-[#F2F6FF] text-[#07133B] border border-slate-200 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" strokeWidth={1.75} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-5 relative min-h-[240px] bg-[#040B29]">
                <ResilientImage
                  src={ABOUT_MEDIA.image}
                  alt={ABOUT_MEDIA.alt}
                  fallbackTitle="SAMITECH Corporation"
                  width={ABOUT_MEDIA.width}
                  height={ABOUT_MEDIA.height}
                  darkSkeleton
                  wrapperClassName="absolute inset-0 w-full h-full"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040B29]/90 via-[#040B29]/25 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-xs font-medium text-[#93C5FD]">Founded 2019 · Cameroon</div>
                  <div className="text-lg font-bold leading-snug mt-1">
                    Where Technology Meets Excellence
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 p-6 sm:p-8 space-y-5">
                <div>
                  <h3 id="story-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-[#07133B] pr-8">
                    The SAMITECH Corporation Story
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                    Since 2019, SAMITECH Corporation has grown in Cameroon into a trusted
                    software engineering, networking, cybersecurity, and Data &amp; AI partner serving
                    clients nationwide and international remote teams.
                  </p>
                </div>

                <div className="space-y-3 bg-[#F2F6FF] p-4 rounded-xl border border-[#0044FF]/10">
                  <div className="flex items-start gap-3">
                    <Globe2 className="w-5 h-5 text-[#002BFF] shrink-0 mt-0.5" strokeWidth={1.75} aria-hidden="true" />
                    <p className="text-sm text-[#07133B]">
                      <span className="font-semibold">Africa Rooted, Global Standards:</span> Delivering scalable web, mobile, and ERP software built for real business workflows.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#DC0914] shrink-0 mt-0.5" strokeWidth={1.75} aria-hidden="true" />
                    <p className="text-sm text-[#07133B]">
                      <span className="font-semibold">Security &amp; 24/7 Reliability:</span> Penetration testing, LAN/WAN resilience, and 24/7 engineering support.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-[#002BFF] shrink-0 mt-0.5" strokeWidth={1.75} aria-hidden="true" />
                    <p className="text-sm text-[#07133B]">
                      <span className="font-semibold">Growing Tech Talent:</span> Training next generation engineers through structured internships in software, networking, and cybersecurity.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-[#002BFF]" strokeWidth={1.75} aria-hidden="true" />
                    <span>{COMPANY_CONTACT.phone} · 24/7</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onGetInTouch();
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#DC0914] to-[#950606] hover:from-[#B90610] hover:to-[#7A0404] transition-all cursor-pointer"
                  >
                    <span>Work With Us</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
