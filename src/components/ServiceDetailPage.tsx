import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Layers,
  Minus,
  Plus,
} from 'lucide-react';
import { CASE_STUDIES, type CaseStudy } from '../data/samitechData';
import {
  ALL_SERVICES_CATALOG,
  type ServiceDetail,
} from '../data/servicesCatalog';
import { Reveal, SAMITECH_EASE } from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';
import { ServiceWireframeIcon } from './ServiceWireframeIcon';

interface ServiceDetailPageProps {
  service: ServiceDetail;
  onBackToServices: () => void;
  onSelectService: (slug: string) => void;
  onOpenContact: (defaultCategory?: string) => void;
  onOpenCaseStudy: (study: CaseStudy) => void;
}

export function ServiceDetailPage({
  service,
  onBackToServices,
  onSelectService,
  onOpenContact,
  onOpenCaseStudy,
}: ServiceDetailPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    setOpenFaqIndex(0);
  }, [service.slug]);

  const currentIndex = ALL_SERVICES_CATALOG.findIndex((s) => s.slug === service.slug);
  const prevService =
    ALL_SERVICES_CATALOG[(currentIndex - 1 + ALL_SERVICES_CATALOG.length) % ALL_SERVICES_CATALOG.length];
  const nextService =
    ALL_SERVICES_CATALOG[(currentIndex + 1) % ALL_SERVICES_CATALOG.length];

  const relatedStudy =
    CASE_STUDIES.find((c) => c.id === service.relatedCaseStudyId) ?? CASE_STUDIES[0];

  return (
    <div className="bg-white text-[#07133B]">
      {/* TOP SERVICE NAVIGATION BAR & SWITCHER */}
      <div className="bg-[#F2F6FF] border-b border-[#0044FF]/12 pt-16 sm:pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackToServices}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#002BFF] hover:text-[#DC0914] transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
            <span>All SAMITECH Services</span>
          </button>

          {/* Horizontal Quick Switcher Across All 9 Deep Service Pages */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {ALL_SERVICES_CATALOG.map((item) => {
              const isCurrent = item.slug === service.slug;
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => onSelectService(item.slug)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-[#07133B] text-white'
                      : 'bg-white/90 text-slate-600 hover:text-[#002BFF] border border-slate-200/80'
                  }`}
                >
                  {item.number}. {item.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* HERO SPLIT SECTION */}
      <section className="py-10 sm:py-16 lg:py-20 bg-gradient-to-b from-[#F2F6FF] to-white border-b border-[#0044FF]/10 overflow-x-clip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Strategy & Outcome Column */}
            <Reveal direction="left" wrapperClassName="lg:col-span-7" className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#0044FF]/15 shadow-xs flex items-center justify-center shrink-0">
                  <ServiceWireframeIcon slug={service.slug} className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-xs font-mono font-semibold text-[#002BFF]">
                    {service.number} · {service.groupLabel}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {service.timelineLabel} · {service.engagementModel}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h1
                  className="font-extrabold tracking-tight leading-[1.06] text-balance text-[#07133B]"
                  style={{ fontSize: 'clamp(1.75rem, 3.8vw, 3.25rem)' }}
                >
                  <span className="block">{service.heroTitle}</span>
                  <span className="bg-gradient-to-r from-[#0014CC] via-[#0033FF] to-[#0055FF] bg-clip-text text-transparent block">
                    {service.heroAccent}
                  </span>
                </h1>
                <p className="text-sm sm:text-base font-semibold text-[#002BFF]">
                  {service.tagline}
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl">
                {service.heroDescription}
              </p>

              {/* Quantitative Proof Strip */}
              <div className="grid grid-cols-3 divide-x divide-slate-200 bg-white rounded-2xl border border-[#0044FF]/12 p-4 sm:p-5 shadow-xs">
                {service.metrics.map((metric) => (
                  <div key={metric.label} className="px-2 sm:px-4 first:pl-0 last:pr-0 min-w-0">
                    <div className="font-display font-extrabold text-base sm:text-xl lg:text-2xl text-[#07133B] tabular-nums">
                      {metric.value}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-snug">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Dual CTA Row */}
              <div className="pt-1 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => onOpenContact(service.contactCategory)}
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#DC0914] to-[#950606] hover:from-[#B90610] hover:to-[#7A0404] shadow-md transition-all duration-150 active:scale-[0.98] whitespace-nowrap cursor-pointer"
                >
                  <span>Request {service.title}</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenCaseStudy(relatedStudy)}
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-[#07133B] bg-white border border-slate-300 hover:border-[#0044FF]/50 hover:bg-[#F2F6FF] rounded-full shadow-xs transition-all duration-150 whitespace-nowrap cursor-pointer"
                >
                  <span>Inspect Related Case Study</span>
                </button>
              </div>
            </Reveal>

            {/* Right Visual Showcase Card */}
            <Reveal direction="right" delay={0.08} wrapperClassName="lg:col-span-5" className="floating-frame-hero">
              <div className="relative aspect-[3/4] max-h-[480px] w-full rounded-2xl overflow-hidden bg-[#040B29] border border-[#0044FF]/20">
                <ResilientImage
                  src={service.image}
                  alt={service.imageAlt}
                  fallbackTitle={service.title}
                  width={service.imageWidth}
                  height={service.imageHeight}
                  priority
                  darkSkeleton
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040B29]/90 via-[#040B29]/25 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-[#93C5FD]">
                    <span>{service.groupLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{service.timelineLabel}</span>
                  </div>
                  <div className="text-lg font-bold leading-snug">
                    {service.title} by SAMITECH
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES (WHAT'S INCLUDED) */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-2 mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#07133B] text-balance">
              Core <span className="text-[#002BFF]">{service.title}</span> Capabilities
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every engagement combines product clarity, clean architecture, and verified security standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-7">
            {service.capabilities.map((cap, index) => (
              <Reveal key={cap.title} direction="bottom" delay={0.04 + index * 0.06}>
                <div className="h-full rounded-2xl bg-[#F8FAFF] border border-slate-200/90 hover:border-[#0044FF]/35 p-6 sm:p-7 space-y-2.5 transition-colors">
                  <div className="font-mono tabular-nums text-xs font-bold text-[#002BFF]">
                    0{index + 1}.
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#07133B]">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DARK CHAMFERED 4-STEP EXECUTION WORKFLOW */}
      <section className="py-10 sm:py-16 lg:py-20 bg-[#F8FAFF] overflow-x-clip">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <Reveal direction="none">
            <div id="why-samitech-card" className="relative">
              <svg
                viewBox="0 0 1200 500"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full drop-shadow-[0_22px_45px_rgba(4,11,41,0.22)] pointer-events-none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="detailProcessBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#070B19" />
                    <stop offset="55%" stopColor="#0B1126" />
                    <stop offset="100%" stopColor="#060D28" />
                  </linearGradient>
                  <linearGradient id="detailProcessStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0044FF" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#DC0914" stopOpacity="0.45" />
                  </linearGradient>
                </defs>
                <path
                  d="M 4,88 Q 4,64 28,64 L 265,64 Q 285,64 298,48 L 326,18 Q 339,4 358,4 L 842,4 Q 861,4 874,18 L 902,48 Q 915,64 935,64 L 1172,64 Q 1196,64 1196,88 L 1196,472 Q 1196,496 1172,496 L 476,496 Q 456,496 442,481 L 414,449 Q 400,434 380,434 L 28,434 Q 4,434 4,410 Z"
                  fill="url(#detailProcessBg)"
                  stroke="url(#detailProcessStroke)"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <div className="relative z-10 px-4 sm:px-8 lg:px-14 pt-6 sm:pt-8 lg:pt-10 pb-14 sm:pb-20 lg:pb-24 text-white">
                <div className="max-w-2xl mx-auto text-center space-y-2 mb-8 sm:mb-12">
                  <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-white text-balance">
                    How We Deliver{' '}
                    <span className="text-[#60A5FA]">{service.title}</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Structured sprint transparency from kickoff to verified production release.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7">
                  {service.processSteps.map((step) => (
                    <div
                      key={step.step}
                      className="rounded-xl bg-white/[0.04] border border-white/10 p-5 space-y-2"
                    >
                      <div className="font-mono tabular-nums text-sm font-bold text-[#60A5FA]">
                        {step.step}
                      </div>
                      <h3 className="text-base font-bold text-white leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal
            direction="left"
            delay={0.1}
            wrapperClassName="relative z-10 -mt-5 sm:-mt-8 lg:-mt-9"
            className="flex items-center gap-3 sm:gap-5 pr-2"
          >
            <button
              type="button"
              onClick={() => onOpenContact(service.contactCategory)}
              className="inline-flex items-center gap-2 px-5 py-2.5 lg:px-6 lg:py-3 text-xs sm:text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-[#DC0914] to-[#950606] hover:from-[#B90610] hover:to-[#7A0404] shadow-md transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Start {service.title}</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
            </button>
            <div
              className="h-px flex-1 bg-gradient-to-r from-[#0044FF]/35 via-slate-300/80 to-transparent"
              aria-hidden="true"
            />
          </Reveal>
        </div>
      </section>

      {/* DELIVERABLES, TECH STACK & IDEAL TEAMS MATRIX */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Deliverables List */}
            <Reveal direction="left" wrapperClassName="lg:col-span-6">
              <div className="h-full rounded-2xl bg-[#F2F6FF] border border-[#0044FF]/15 p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-2.5">
                  <Layers className="w-5 h-5 text-[#002BFF]" strokeWidth={1.75} aria-hidden="true" />
                  <h2 className="text-xl sm:text-2xl font-bold text-[#07133B]">
                    What You Walk Away With
                  </h2>
                </div>
                <ul className="space-y-3">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#0044FF]/10 text-sm text-[#07133B] font-medium"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-[#002BFF] shrink-0 mt-0.5"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Right Column: Ideal Use Cases + Technology Stack */}
            <Reveal direction="right" delay={0.08} wrapperClassName="lg:col-span-6">
              <div className="h-full flex flex-col justify-between gap-6">
                <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#07133B]">
                    Who This Is Built For
                  </h2>
                  <div className="space-y-3">
                    {service.idealFor.map((useCase) => (
                      <div
                        key={useCase.audience}
                        className="pb-3 last:pb-0 border-b last:border-b-0 border-slate-100"
                      >
                        <div className="text-sm font-bold text-[#07133B]">
                          {useCase.audience}
                        </div>
                        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                          {useCase.outcome}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-[#F8FAFF] border border-slate-200/90 p-6 sm:p-7 space-y-3">
                  <div className="text-sm font-bold text-[#07133B]">
                    Core Stack &amp; Standards Applied
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {service.techStack.map((tech) => (
                      <div
                        key={tech}
                        className="px-3 py-2 rounded-lg bg-white border border-slate-200/80 text-xs font-mono font-medium text-[#07133B] text-center"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CASE STUDY PROOF & SERVICE-SPECIFIC FAQS */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Related Case Study Card */}
            <div className="lg:col-span-5">
              <div className="text-xs font-semibold text-[#002BFF] mb-3">
                Verified Execution Proof
              </div>
              <button
                type="button"
                onClick={() => onOpenCaseStudy(relatedStudy)}
                className="floating-frame-card group relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#040B29] text-left cursor-pointer"
              >
                <ResilientImage
                  src={relatedStudy.image}
                  alt={relatedStudy.imageAlt}
                  fallbackTitle={relatedStudy.title}
                  width={relatedStudy.imageWidth}
                  height={relatedStudy.imageHeight}
                  darkSkeleton
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040B29]/95 via-[#040B29]/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#DBEAFE]">
                    <span>{relatedStudy.sector}</span>
                    <span aria-hidden="true">·</span>
                    <span>{relatedStudy.location}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {relatedStudy.title}
                  </h3>
                  <div className="pt-1 flex items-center justify-between border-t border-white/15">
                    <span className="font-mono tabular-nums text-xs font-semibold text-[#93C5FD]">
                      {relatedStudy.metrics[0].value} {relatedStudy.metrics[0].label}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-white">
                      <span>Inspect Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* Service-Specific Animated FAQs */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#07133B]">
                Frequently Asked About {service.title}
              </h2>
              <div className="space-y-3">
                {service.faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={faq.question}
                      className={`rounded-xl border bg-white transition-colors ${
                        isOpen ? 'border-[#0044FF]/40 shadow-xs' : 'border-slate-200'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        className="w-full px-4 py-3.5 flex items-center gap-3 text-left cursor-pointer"
                      >
                        <span
                          className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                            isOpen
                              ? 'bg-[#002BFF] border-[#002BFF] text-white'
                              : 'bg-[#F2F6FF] border-[#0044FF]/15 text-[#07133B]'
                          }`}
                          aria-hidden="true"
                        >
                          {isOpen ? (
                            <Minus className="w-3.5 h-3.5" strokeWidth={2} />
                          ) : (
                            <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                          )}
                        </span>
                        <span className="text-sm font-bold text-[#07133B]">
                          {faq.question}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: SAMITECH_EASE }}
                            className="overflow-hidden"
                          >
                            <div className="pl-13 pr-4 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Next / Previous Service Pager */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80">
                <button
                  type="button"
                  onClick={() => onSelectService(prevService.slug)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#002BFF] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                  <span>Previous: {prevService.title}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectService(nextService.slug)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#002BFF] hover:text-[#DC0914] transition-colors cursor-pointer"
                >
                  <span>Next: {nextService.title}</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
