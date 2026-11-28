import {
  ArrowRight,
  ChevronRight,
  Code2,
  CreditCard,
  Globe,
  Headphones,
  Layers,
  Palette,
  Play,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Users,
  WifiOff,
} from 'lucide-react';
import { Reveal } from '../MotionPrimitives';
import { ResilientImage } from '../ResilientImage';
import {
  getTechBadgeColor,
  ServiceProofAndFaqBand,
  type ServiceLayoutProps,
} from './ServiceSharedBlocks';

/* ============================================================================
   01. WEB DEVELOPMENT, Signature Wave Studio (Matches Reference Mockup)
   ============================================================================ */
export function WebDevelopmentLayout({
  service,
  relatedStudy,
  onOpenContact,
  onOpenCaseStudy,
}: ServiceLayoutProps) {
  const capabilityIcons = [Globe, ShoppingCart, Code2, Server];
  const stepIcons = [Search, Palette, Code2, Rocket];
  const trustItems = [
    { icon: ShieldCheck, title: 'Trusted by', subtitle: 'Businesses in Africa' },
    { icon: Users, title: service.metrics[0]?.value ?? '100+', subtitle: service.metrics[0]?.label ?? 'Platforms Delivered' },
    { icon: Rocket, title: service.metrics[1]?.value ?? '99.9%', subtitle: service.metrics[1]?.label ?? 'Uptime Guarantee' },
    { icon: Headphones, title: '24/7', subtitle: 'Engineering Support' },
  ];

  return (
    <div className="bg-white text-[#07133B] overflow-x-clip">
      {/* HERO, Bright Blue-White Surface With Sweeping Royal-Blue Top-Right Wave */}
      <section className="relative bg-gradient-to-br from-[#F7FAFF] via-white to-[#EAF2FF] pt-7 pb-14 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28 overflow-hidden">
        {/* Top-Right Sweeping Royal-Blue Curve */}
        <svg
          viewBox="0 0 640 420"
          preserveAspectRatio="none"
          className="pointer-events-none hidden md:block absolute top-0 right-0 w-[46%] h-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="webHeroWave" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0055FF" stopOpacity="0.16" />
              <stop offset="55%" stopColor="#0038FF" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#06164D" stopOpacity="0.88" />
            </linearGradient>
          </defs>
          <path d="M180,0 L640,0 L640,420 L40,420 C120,270 110,120 180,0 Z" fill="url(#webHeroWave)" />
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Typography & CTAs */}
            <Reveal immediate direction="left" wrapperClassName="lg:col-span-6" className="space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0038FF]">
                <span className="w-2 h-2 rounded-full bg-[#0038FF]" aria-hidden="true" />
                <span>Our Services · {service.groupLabel}</span>
              </div>

              <h1
                className="font-extrabold tracking-tight leading-[1.03] text-balance"
                style={{ fontSize: 'clamp(1.65rem, 4.8vw, 4rem)' }}
              >
                <span className="block text-[#07133B]">Software</span>
                <span className="block text-[#0038FF]">Services</span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-700 font-medium leading-relaxed max-w-lg">
                {service.heroDescription}
              </p>

              {/* Signature Blue + Crimson Split Underline Bar */}
              <div className="flex items-center gap-1 pt-0.5" aria-hidden="true">
                <span className="h-[3.5px] w-16 rounded-full bg-[#0038FF]" />
                <span className="h-[3.5px] w-14 rounded-full bg-[#DC0914]" />
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onOpenContact(service.contactCategory)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#0038FF] to-[#0058FF] hover:from-[#0028CC] hover:to-[#0044DD] text-white text-sm font-bold shadow-[0_12px_26px_rgba(0,56,255,0.28)] transition-all duration-150 active:scale-[0.98] whitespace-nowrap cursor-pointer"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenCaseStudy(relatedStudy)}
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-white hover:bg-[#F2F6FF] border border-[#C7DAFF] text-[#07133B] text-sm font-bold shadow-xs transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span className="w-5 h-5 rounded-full bg-[#0038FF] text-white flex items-center justify-center">
                    <Play className="w-2.5 h-2.5 fill-white ml-0.5" aria-hidden="true" />
                  </span>
                  <span>View Our Work</span>
                </button>
              </div>
            </Reveal>

            {/* Right Framed Desktop Monitor & Laptop Composition */}
            <Reveal immediate direction="right" delay={0.06} wrapperClassName="lg:col-span-6">
              <div className="relative mx-auto max-w-xl">
                {/* Main Desktop Display Frame */}
                <div className="rounded-2xl bg-[#07133B] p-2.5 sm:p-3 shadow-[0_26px_55px_rgba(4,11,41,0.24)] border border-white/25">
                  <div className="flex items-center justify-between px-2 pb-2 text-[11px] text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#DC0914]/85" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/85" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/85" />
                    </div>
                    <span className="font-mono text-[10px] text-[#93C5FD]">
                      samitech237.com
                    </span>
                  </div>
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#0A1845]">
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
                    <div className="absolute inset-0 bg-gradient-to-r from-[#07133B]/85 via-[#07133B]/45 to-transparent" />
                    <div className="absolute inset-y-0 left-0 p-5 sm:p-7 flex flex-col justify-center max-w-[260px] text-white space-y-2.5">
                      <div className="text-[11px] font-bold text-[#93C5FD]">
                        SAMITECH Software Studio
                      </div>
                      <div className="text-lg sm:text-2xl font-extrabold leading-tight">
                        UI/UX, Web, Apps &amp; Graphics
                      </div>
                      <div className="text-xs text-slate-200">
                        Design-first digital products engineered for speed and scale.
                      </div>
                    </div>
                  </div>
                </div>
                {/* Monitor Stand */}
                <div className="mx-auto w-24 h-4 bg-gradient-to-b from-slate-300 to-slate-200 rounded-b-lg shadow-inner" aria-hidden="true" />
                <div className="mx-auto w-40 h-1.5 bg-slate-300/90 rounded-full" aria-hidden="true" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FLOATING 4-COLUMN TRUST & METRICS BAR */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12">
        <div className="rounded-2xl bg-white border border-[#D8E5FF] shadow-[0_14px_34px_rgba(4,11,41,0.08)] px-4 py-5 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 lg:divide-x lg:divide-slate-200">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.subtitle} className="flex items-center gap-3 lg:px-5 lg:first:pl-1 lg:last:pr-1">
                  <div className="w-10 h-10 rounded-xl bg-[#EDF3FF] text-[#0038FF] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm sm:text-base font-extrabold text-[#07133B] tabular-nums leading-tight">
                      {item.title}
                    </div>
                    <div className="text-xs font-medium text-[#0038FF] truncate">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* WHAT WE BUILD, 4-Card Grid With Alternating Blue / Crimson Corner Waves */}
      <section className="py-14 sm:py-18 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="top" className="text-center max-w-2xl mx-auto space-y-2 mb-10 sm:mb-12">
            <div className="text-xs font-bold text-[#0038FF]">Our Services</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#07133B]">
              What We <span className="text-[#0038FF]">Build</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              From business websites to complex enterprise portals, we turn ideas into fast digital products.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.capabilities.map((cap, index) => {
              const Icon = capabilityIcons[index % capabilityIcons.length];
              const isCrimsonWave = index % 2 === 1;
              return (
                <Reveal key={cap.title} direction="bottom" delay={0.04 + index * 0.06} className="h-full">
                  <div className="relative h-full overflow-hidden rounded-2xl bg-white border border-[#D8E5FF] shadow-[0_10px_28px_rgba(4,11,41,0.05)] p-6 flex flex-col justify-between space-y-5 hover:-translate-y-1 transition-transform duration-200">
                    <div className="relative z-10 space-y-3.5">
                      <div className="w-12 h-11 rounded-xl bg-[#E8F0FF] text-[#0038FF] flex items-center justify-center">
                        <Icon className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-[#07133B] leading-snug">
                        {cap.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {cap.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenContact(service.contactCategory)}
                      className="relative z-10 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0038FF] hover:text-[#DC0914] transition-colors self-start cursor-pointer"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                    </button>

                    {/* Alternating Soft Blue / Soft Crimson Corner Wave Accent */}
                    <svg
                      viewBox="0 0 180 72"
                      preserveAspectRatio="none"
                      className="pointer-events-none absolute right-0 bottom-0 w-36 h-14"
                      aria-hidden="true"
                    >
                      <path
                        d="M0,72 C55,66 105,30 180,0 L180,72 Z"
                        fill={isCrimsonWave ? '#DC0914' : '#0038FF'}
                        fillOpacity="0.16"
                      />
                    </svg>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUR APPROACH, Light Ice-Blue Rounded Panel With 4 Numbered Cards + Chevron Arrows */}
      <section className="py-4 sm:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#F0F6FF] via-[#F7FAFF] to-[#E6F0FF] border border-[#D5E4FF] px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
            <div className="text-center max-w-xl mx-auto space-y-2 mb-9">
              <div className="text-xs font-bold text-[#0038FF]">Our Process</div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#07133B]">
                Our <span className="text-[#0038FF]">Approach</span>
              </h2>
              <p className="text-sm text-slate-600">
                A structured engineering cadence to deliver reliable production software.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 items-stretch">
              {service.processSteps.map((step, index) => {
                const StepIcon = stepIcons[index % stepIcons.length];
                return (
                  <div key={step.step} className="relative flex items-center">
                    <div className="h-full w-full rounded-2xl bg-white border border-[#DCE8FF] shadow-xs p-5 text-center space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="w-6 h-6 rounded-full bg-[#0038FF] text-white text-xs font-extrabold tabular-nums flex items-center justify-center">
                          {index + 1}
                        </span>
                        <StepIcon className="w-5 h-5 text-[#0038FF]" strokeWidth={2} aria-hidden="true" />
                        <span className="w-6" aria-hidden="true" />
                      </div>
                      <h3 className="text-sm sm:text-base font-extrabold text-[#07133B]">
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>

                    {index < service.processSteps.length - 1 && (
                      <ChevronRight
                        className="hidden lg:block w-5 h-5 text-[#0038FF] -mr-2.5 ml-1 shrink-0"
                        strokeWidth={2.2}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES WE USE, Crisp Bordered Tech Stack Row */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
          <div className="space-y-1.5">
            <div className="text-xs font-bold text-[#0038FF]">Our Tech Stack</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#07133B]">
              Technologies <span className="text-[#0038FF]">We Use</span>
            </h2>
            <p className="text-sm text-slate-600">
              Modern tools. Better performance. Greater possibilities.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {service.techStack.map((tech) => (
              <div
                key={tech}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-[#D8E5FF] shadow-xs text-xs sm:text-sm font-bold text-[#07133B]"
              >
                <span
                  className="w-2.5 h-2.5 rounded-sm shrink-0"
                  style={{ backgroundColor: getTechBadgeColor(tech) }}
                  aria-hidden="true"
                />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY & FAQS */}
      <ServiceProofAndFaqBand
        service={service}
        relatedStudy={relatedStudy}
        accentColor="#0038FF"
        onOpenCaseStudy={onOpenCaseStudy}
      />

      {/* BOTTOM DEEP ROYAL-BLUE CONSTELLATION WAVE CTA BANNER */}
      <section
        id="service-dark-cta"
        className="relative overflow-hidden bg-gradient-to-r from-[#041145] via-[#0032CC] to-[#0055FF] text-white"
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="pointer-events-none absolute top-0 inset-x-0 w-full h-10 sm:h-14"
          aria-hidden="true"
        >
          <path d="M0,0 L1440,0 L1440,28 Q1080,108 640,42 T0,48 Z" fill="#F8FAFF" />
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-20 sm:pb-14 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Ready to Build Something Great?
            </h2>
            <p className="text-sm sm:text-base text-blue-100">
              Let&apos;s bring your ideas to life with UI/UX design, web &amp; app development, and brand graphics.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenContact(service.contactCategory)}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-[#EAF2FF] text-[#0038FF] text-sm font-extrabold shadow-lg transition-colors whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}

/* ============================================================================
   02. MOBILE APP DEVELOPMENT, Dual Device Showcase & Asymmetric Bento
   ============================================================================ */
export function MobileAppLayout({
  service,
  relatedStudy,
  onOpenContact,
  onOpenCaseStudy,
}: ServiceLayoutProps) {
  return (
    <div className="bg-white text-[#07133B] overflow-x-clip">
      {/* HERO, Centered-Top Statement + Dual Tilted Android & iOS Device Frames */}
      <section className="relative bg-gradient-to-b from-[#EFF5FF] via-[#F7FAFF] to-white pt-7 pb-12 sm:pt-14 sm:pb-20 border-b border-[#D8E5FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Dual Phone Mockup Showcase (Visual First on Desktop!) */}
            <Reveal immediate direction="left" wrapperClassName="lg:col-span-6 order-2 lg:order-1">
              <div className="relative flex items-center justify-center py-4">
                <div
                  className="pointer-events-none absolute w-72 h-72 rounded-full bg-[#0038FF]/12 blur-3xl"
                  aria-hidden="true"
                />

                {/* Back Phone (Android Offline Field View) */}
                <div className="relative -mr-6 sm:-mr-8 -rotate-6 w-36 sm:w-56 rounded-[26px] sm:rounded-[30px] bg-[#07133B] p-2 sm:p-2.5 shadow-2xl border border-white/20">
                  <div className="rounded-[20px] sm:rounded-[22px] bg-[#0F215E] p-3 sm:p-4 text-white space-y-2.5 sm:space-y-3 min-h-[250px] sm:min-h-[300px] flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] text-[#93C5FD] font-semibold">
                        <span>Android · Flutter</span>
                        <WifiOff className="w-3.5 h-3.5" aria-hidden="true" />
                      </div>
                      <div className="text-xs sm:text-sm font-extrabold leading-snug">
                        Offline First Sync Queue
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-slate-300 leading-relaxed">
                        Orders and field telemetry sync automatically when 4G returns.
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <div className="rounded-lg bg-white/10 p-1.5 sm:p-2 text-[10px] sm:text-[11px] flex justify-between gap-1">
                        <span>Cached</span>
                        <span className="font-mono font-bold text-[#93C5FD]">100%</span>
                      </div>
                      <div className="rounded-lg bg-white/10 p-1.5 sm:p-2 text-[10px] sm:text-[11px] flex justify-between gap-1">
                        <span>Rate</span>
                        <span className="font-mono font-bold text-emerald-300">60 fps</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Front Phone (iOS Checkout & Live App View) */}
                <div className="relative z-10 rotate-3 translate-y-4 w-40 sm:w-60 rounded-[28px] sm:rounded-[32px] bg-white p-2 sm:p-2.5 shadow-[0_24px_50px_rgba(4,11,41,0.22)] border border-[#D0E0FF]">
                  <div className="rounded-[22px] sm:rounded-[24px] bg-gradient-to-b from-[#0038FF] to-[#061854] p-3 sm:p-4 text-white space-y-2.5 sm:space-y-3.5 min-h-[270px] sm:min-h-[320px] flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="mx-auto w-14 h-1.5 rounded-full bg-white/30" aria-hidden="true" />
                      <div className="pt-1 flex items-center justify-between text-[10px] text-blue-100 font-semibold">
                        <span>iOS &amp; Android</span>
                        <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
                      </div>
                      <div className="text-base font-extrabold leading-tight">
                        Mobile Money &amp; Push Ready
                      </div>
                    </div>

                    <div className="rounded-xl overflow-hidden aspect-[4/3] border border-white/20">
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
                    </div>

                    <div className="rounded-xl bg-white text-[#07133B] p-2.5 flex items-center justify-between text-[11px] font-bold">
                      <span className="inline-flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-[#0038FF]" aria-hidden="true" />
                        <span>MTN / Orange MoMo</span>
                      </span>
                      <span className="text-[#DC0914]">Instant</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right Identity & Launch Value Prop */}
            <Reveal immediate direction="right" delay={0.05} wrapperClassName="lg:col-span-6 order-1 lg:order-2" className="space-y-5">
              <div className="text-xs font-bold text-[#DC0914]">
                {service.number} · {service.groupLabel} · {service.timelineLabel}
              </div>

              <h1
                className="font-extrabold tracking-tight leading-[1.05] text-balance text-[#07133B]"
                style={{ fontSize: 'clamp(1.6rem, 4.4vw, 3.6rem)' }}
              >
                Native Speed{' '}
                <span className="text-[#0038FF]">Android &amp; iOS</span>{' '}
                Applications
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                {service.heroDescription}
              </p>

              {/* Inline 3-Metric Strip */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
                {service.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-xl bg-white border border-[#D8E5FF] p-2.5 sm:p-3.5"
                  >
                    <div className="text-base sm:text-xl font-extrabold text-[#0038FF] tabular-nums">
                      {metric.value}
                    </div>
                    <div className="text-[10px] sm:text-xs font-medium text-slate-600 mt-0.5 leading-tight">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenContact(service.contactCategory)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#DC0914] hover:bg-[#B40710] text-white text-sm font-bold shadow-md transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Build Your Mobile App</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenCaseStudy(relatedStudy)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-[#F2F6FF] border border-slate-300 text-[#07133B] text-sm font-bold transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Inspect Mobile Case Study</span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ASYMMETRIC BENTO CAPABILITIES (7/5 & 5/7 Alternating Spans) */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-2 mb-10">
            <div className="text-xs font-bold text-[#0038FF]">Engineered for Real Devices</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#07133B]">
              Mobile Architecture Built for <span className="text-[#0038FF]">Retention</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {service.capabilities.map((cap, index) => {
              const spanClass =
                index === 0 || index === 3 ? 'lg:col-span-7' : 'lg:col-span-5';
              const isHighlighted = index === 0;
              return (
                <Reveal key={cap.title} direction="bottom" delay={0.04 + index * 0.05} wrapperClassName={spanClass}>
                  <div
                    className={`h-full rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-4 border ${
                      isHighlighted
                        ? 'bg-gradient-to-br from-[#07133B] to-[#0E2672] text-white border-[#0038FF]/30'
                        : 'bg-[#F7FAFF] text-[#07133B] border-[#D8E5FF]'
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div
                        className={`font-mono text-xs font-bold ${
                          isHighlighted ? 'text-[#93C5FD]' : 'text-[#0038FF]'
                        }`}
                      >
                        0{index + 1}. Mobile Capability
                      </div>
                      <h3 className="text-lg sm:text-2xl font-extrabold tracking-tight">
                        {cap.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed ${
                          isHighlighted ? 'text-slate-200' : 'text-slate-600'
                        }`}
                      >
                        {cap.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenContact(service.contactCategory)}
                      className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold self-start cursor-pointer ${
                        isHighlighted
                          ? 'text-white hover:text-[#93C5FD]'
                          : 'text-[#0038FF] hover:text-[#DC0914]'
                      }`}
                    >
                      <span>Discuss Scope</span>
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                    </button>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* VERTICAL SPRINT RAIL, Sticky Summary Left + Milestone Timeline Right */}
      <section className="py-14 sm:py-18 bg-[#F8FAFF] border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 space-y-4">
              <div className="text-xs font-bold text-[#DC0914]">Store-Ready Delivery</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#07133B]">
                From Prototype to Google Play &amp; App Store
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every mobile release is tested across real Android and iOS screen sizes, battery profiles, and spotty network zones before submission.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                {service.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#D8E5FF] text-xs font-bold text-[#07133B]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 relative pl-7 space-y-5 before:content-[''] before:absolute before:left-[9px] before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-[#0038FF] before:to-[#DC0914]">
              {service.processSteps.map((step, index) => (
                <div
                  key={step.step}
                  className="relative rounded-2xl bg-white border border-[#D8E5FF] p-5 sm:p-6 shadow-xs"
                >
                  <span
                    className="absolute -left-7 top-6 w-5 h-5 rounded-full bg-[#0038FF] text-white text-[10px] font-bold flex items-center justify-center ring-4 ring-[#F8FAFF]"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-extrabold text-[#07133B]">
                      {step.title}
                    </h3>
                    <span className="font-mono text-xs font-bold text-[#0038FF]">
                      Phase {step.step}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ServiceProofAndFaqBand
        service={service}
        relatedStudy={relatedStudy}
        accentColor="#0038FF"
        surfaceClass="bg-white"
        onOpenCaseStudy={onOpenCaseStudy}
      />

      {/* BOTTOM MIDNIGHT SPLIT MOBILE CTA */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="service-dark-cta"
            className="rounded-3xl bg-[#07133B] text-white p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border border-[#0038FF]/30 shadow-[0_22px_50px_rgba(4,11,41,0.2)]"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#93C5FD]">
                <Layers className="w-4 h-4" aria-hidden="true" />
                <span>Single Codebase · Google Play &amp; Apple App Store</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Put Your Product in Every Customer&apos;s Pocket
              </h2>
              <p className="text-sm text-slate-300">
                Launch a reliable Flutter or native mobile experience built for speed and offline resilience.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenContact(service.contactCategory)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#DC0914] hover:bg-[#B40710] text-white text-sm font-bold shadow-lg transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto cursor-pointer"
            >
              <span>Launch Mobile Project</span>
              <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
