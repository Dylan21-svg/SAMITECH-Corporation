import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import type { CaseStudy } from '../data/samitechData';
import { SAMITECH_EASE, useMotionConfigValues } from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onDiscussProject: (serviceCategory: string) => void;
}

export function CaseStudyModal({
  caseStudy,
  onClose,
  onDiscussProject,
}: CaseStudyModalProps) {
  const { shouldReduceMotion } = useMotionConfigValues();

  useEffect(() => {
    if (!caseStudy) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [caseStudy, onClose]);

  return (
    <AnimatePresence>
      {caseStudy && (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: SAMITECH_EASE }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#060814]/75 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-modal-title"
          onClick={onClose}
        >
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: SAMITECH_EASE }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-[#0000FF]/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study preview"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/95 hover:bg-[#F4F7FF] text-[#07133B] border border-[#0000FF]/15 flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0000FF]"
            >
              <X className="w-5 h-5" strokeWidth={1.75} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Visual Column */}
              <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-[#060814]">
                <ResilientImage
                  src={caseStudy.image}
                  alt={caseStudy.imageAlt}
                  fallbackTitle={caseStudy.title}
                  width={caseStudy.imageWidth}
                  height={caseStudy.imageHeight}
                  darkSkeleton
                  wrapperClassName="absolute inset-0 w-full h-full"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060814]/90 via-[#060814]/30 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-center gap-2 text-xs text-[#DBEAFE] mb-1.5">
                    <span>{caseStudy.sector}</span>
                    <span aria-hidden="true">·</span>
                    <span>{caseStudy.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{caseStudy.year}</span>
                  </div>
                  <p className="text-sm font-medium text-white">
                    {caseStudy.serviceCategory}
                  </p>
                </div>
              </div>

              {/* Right Content Column */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
                <div>
                  <h3
                    id="case-study-modal-title"
                    className="text-2xl font-bold tracking-tight text-[#07133B] pr-8 text-balance"
                  >
                    {caseStudy.title}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {caseStudy.summary}
                  </p>
                </div>

                {/* Quantified Metrics Row on subtle tint-blue surface */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#F4F7FF] border border-[#0000FF]/10">
                  {caseStudy.metrics.map((metric) => (
                    <div key={metric.label} className="space-y-1">
                      <div className="font-mono tabular-nums text-lg sm:text-xl font-semibold bg-gradient-to-r from-[#0000FF] to-[#950606] bg-clip-text text-transparent">
                        {metric.value}
                      </div>
                      <div className="text-xs text-slate-700 leading-snug">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <h4 className="text-sm font-semibold text-[#DC0914] mb-1.5">
                      Operational Challenge
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {caseStudy.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#002BFF] mb-1.5">
                      Architecture Delivered
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {caseStudy.solution}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[#07133B] mb-2.5">
                    Core Deliverables
                  </h4>
                  <ul className="space-y-2">
                    {caseStudy.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#002BFF] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-[#07133B] hover:bg-[#F4F7FF] rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Close Preview
                  </button>
                  <button
                    type="button"
                    onClick={() => onDiscussProject(caseStudy.serviceCategory)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#001AFF] to-[#0044FF] hover:from-[#0000CC] hover:to-[#002BFF] transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FF]"
                  >
                    <span>Discuss a Similar Project</span>
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
