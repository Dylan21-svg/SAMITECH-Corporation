import { useState } from 'react';
import {
  ArrowRight,
  Bot,
  Brain,
  CalendarDays,
  CheckCircle2,
  Compass,
  FileCode2,
  GitBranch,
  Layers,
  Palette,
  Rocket,
  ShieldCheck,
  Sliders,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';
import { Reveal } from '../MotionPrimitives';
import { ResilientImage } from '../ResilientImage';
import {
  getTechBadgeColor,
  ServiceProofAndFaqBand,
  type ServiceLayoutProps,
} from './ServiceSharedBlocks';

/* ============================================================================
   05. AI & MACHINE LEARNING — Centered Editorial Hero + Interactive Use-Case Lab
   ============================================================================ */
export function AiMachineLearningLayout({
  service,
  relatedStudy,
  onOpenContact,
  onOpenCaseStudy,
}: ServiceLayoutProps) {
  const aiTracks = [
    {
      id: 'rag',
      label: 'Private RAG Copilot',
      headline: 'Query internal contracts, policies & ERP tables with citations',
      outcome: '60%+ faster document lookup with zero-retention VPC data isolation.',
      stack: 'Gemini API · pgvector · FastAPI',
    },
    {
      id: 'ml',
      label: 'Predictive Analytics',
      headline: 'Demand forecasting, credit risk scoring & anomaly alerts',
      outcome: 'Turn historical transaction logs into daily operational forecasts.',
      stack: 'Python · PyTorch · PostgreSQL',
    },
    {
      id: 'ops',
      label: 'Bilingual Automation',
      headline: 'Automated English & French customer triage and PDF extraction',
      outcome: 'Route inquiries and summarize reports accurately around the clock.',
      stack: 'LangGraph · Structured Tools · Guardrails',
    },
  ];
  const [activeTrack, setActiveTrack] = useState(aiTracks[0]);

  return (
    <div className="bg-white text-[#07133B] overflow-x-clip">
      {/* MONUMENTAL CENTERED EDITORIAL HERO */}
      <section className="relative bg-gradient-to-b from-[#F4F2FF] via-white to-white pt-10 pb-14 sm:pt-14 sm:pb-18">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#6D28D9]">
            <Brain className="w-4 h-4" aria-hidden="true" />
            <span>{service.number} · {service.groupLabel} · {service.timelineLabel}</span>
          </div>

          <h1
            className="font-extrabold tracking-tight leading-[1.04] text-balance text-[#07133B]"
            style={{ fontSize: 'clamp(2.3rem, 4.8vw, 3.9rem)' }}
          >
            Practical{' '}
            <span className="bg-gradient-to-r from-[#0038FF] via-[#5B21B6] to-[#7C3AED] bg-clip-text text-transparent">
              AI &amp; Machine Learning
            </span>{' '}
            Built for Privacy
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {service.heroDescription}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => onOpenContact(service.contactCategory)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-[#4338CA] hover:to-[#6D28D9] text-white text-sm font-bold shadow-lg shadow-indigo-600/25 transition-all whitespace-nowrap cursor-pointer"
            >
              <span>Start 2-Week AI Proof of Value</span>
              <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onOpenCaseStudy(relatedStudy)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-indigo-50 border border-indigo-200 text-[#07133B] text-sm font-bold transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Inspect AI Case Study</span>
            </button>
          </div>
        </div>

        {/* WIDESCREEN INTERACTIVE AI USE-CASE PREVIEWER */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">
          <div className="rounded-3xl bg-[#0B0F29] text-white border border-indigo-400/25 overflow-hidden shadow-[0_24px_60px_rgba(30,27,75,0.22)]">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 relative min-h-[240px]">
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
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0B0F29]/30 to-[#0B0F29]" />
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="flex flex-wrap gap-2 p-1 rounded-xl bg-white/8 self-start">
                  {aiTracks.map((track) => (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => setActiveTrack(track)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                        activeTrack.id === track.id
                          ? 'bg-white text-[#07133B] shadow-xs'
                          : 'text-indigo-200 hover:text-white'
                      }`}
                    >
                      {track.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-2.5">
                  <div className="text-xs font-mono text-indigo-300">{activeTrack.stack}</div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                    {activeTrack.headline}
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed">{activeTrack.outcome}</p>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/12">
                  {service.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="text-base sm:text-xl font-extrabold text-indigo-300 tabular-nums">
                        {m.value}
                      </div>
                      <div className="text-[11px] text-slate-300">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1+3 FEATURED BENTO CAPABILITIES */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Large Primary Feature */}
            <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-[#EEF2FF] via-[#F5F3FF] to-white border border-indigo-200/80 p-7 sm:p-9 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#6D28D9] text-white flex items-center justify-center">
                  <Bot className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="text-xs font-bold text-[#6D28D9]">Flagship AI Practice</div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07133B] leading-tight">
                  {service.capabilities[0]?.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {service.capabilities[0]?.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenContact(service.contactCategory)}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#6D28D9] hover:text-[#0038FF] cursor-pointer self-start"
              >
                <span>Explore Private AI Architecture</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* 3 Stacked Right Capabilities */}
            <div className="lg:col-span-7 space-y-4">
              {service.capabilities.slice(1).map((cap, idx) => (
                <div
                  key={cap.title}
                  className="rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
                >
                  <div className="space-y-1.5">
                    <div className="font-mono text-xs font-bold text-[#6D28D9]">0{idx + 2}.</div>
                    <h3 className="text-lg font-extrabold text-[#07133B]">{cap.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{cap.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STAGGERED 2-WEEK POV STEPS + AI STACK */}
      <section className="py-14 sm:py-16 bg-[#F7F6FF] border-y border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-[#6D28D9]">Measured Rollout</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07133B]">
                From AI Readiness to Production Telemetry
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full bg-white border border-indigo-200 text-xs font-bold text-[#07133B]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.processSteps.map((step, index) => (
              <div
                key={step.step}
                className="rounded-2xl bg-white border border-indigo-200/80 p-6 space-y-2.5"
              >
                <div className="text-3xl font-extrabold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent font-mono tabular-nums">
                  0{index + 1}
                </div>
                <h3 className="text-base font-extrabold text-[#07133B]">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceProofAndFaqBand
        service={service}
        relatedStudy={relatedStudy}
        accentColor="#6D28D9"
        surfaceClass="bg-white"
        onOpenCaseStudy={onOpenCaseStudy}
      />

      {/* DEEP INDIGO-TO-COBALT AI CTA */}
      <section
        id="service-dark-cta"
        className="bg-gradient-to-r from-[#1E1B4B] via-[#4C1D95] to-[#0038FF] text-white py-12 sm:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Embed Dependable AI Inside Your Workflow
            </h2>
            <p className="text-sm text-indigo-100">
              Benchmark accuracy on your own data in 2 weeks with full enterprise data privacy.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenContact(service.contactCategory)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-indigo-50 text-[#4C1D95] text-sm font-extrabold shadow-lg transition-colors whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer"
          >
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>Schedule AI Discovery</span>
          </button>
        </div>
      </section>
    </div>
  );
}

/* ============================================================================
   06. SOFTWARE CONSULTING & PRODUCT SCOPE — 15-Day Editorial Blueprint Dossier
   ============================================================================ */
export function ProductScopeLayout({
  service,
  relatedStudy,
  onOpenContact,
  onOpenCaseStudy,
}: ServiceLayoutProps) {
  return (
    <div className="bg-[#FAFBFD] text-[#07133B] overflow-x-clip">
      {/* ARCHITECTURAL PAPER HERO + LIVE 15-DAY SPRINT CALENDAR */}
      <section
        className="relative pt-10 pb-16 sm:pt-14 sm:pb-20 border-b border-slate-200"
        style={{
          backgroundImage:
            'radial-gradient(rgba(2, 132, 199, 0.14) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <Reveal immediate direction="left" wrapperClassName="lg:col-span-7" className="space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0284C7]">
                <Compass className="w-4 h-4" aria-hidden="true" />
                <span>{service.number} · Fixed 15-Day Blueprint · {service.engagementModel}</span>
              </div>

              <h1
                className="font-extrabold tracking-tight leading-[1.05] text-balance text-[#07133B]"
                style={{ fontSize: 'clamp(2.2rem, 4.4vw, 3.6rem)' }}
              >
                Lock Architecture &amp; Budget in{' '}
                <span className="text-[#0284C7]">15 Days</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                {service.heroDescription}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onOpenContact(service.contactCategory)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#07133B] hover:bg-[#0284C7] text-white text-sm font-bold shadow-md transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Book 15-Day Product Scope</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenCaseStudy(relatedStudy)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white hover:bg-sky-50 border border-slate-300 text-[#07133B] text-sm font-bold transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Review Scoped Project</span>
                </button>
              </div>
            </Reveal>

            {/* Right 15-Day Sprint Calendar Card */}
            <Reveal immediate direction="right" delay={0.06} wrapperClassName="lg:col-span-5">
              <div className="rounded-2xl bg-white border border-sky-200 shadow-[0_18px_40px_rgba(4,11,41,0.08)] p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-[#07133B]">
                    <CalendarDays className="w-4 h-4 text-[#0284C7]" aria-hidden="true" />
                    <span>15-Day Blueprint Schedule</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#0284C7]">Fixed Scope</span>
                </div>

                <div className="space-y-3">
                  {service.processSteps.map((step, i) => (
                    <div
                      key={step.step}
                      className="flex items-start gap-3 p-3 rounded-xl bg-[#F8FBFF] border border-sky-100"
                    >
                      <div className="font-mono text-xs font-extrabold text-[#0284C7] bg-white border border-sky-200 rounded-md px-2 py-1 shrink-0 tabular-nums">
                        D{i * 4 + 1}–{Math.min(15, (i + 1) * 4)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-[#07133B]">{step.title}</div>
                        <p className="text-xs text-slate-600 mt-0.5 leading-snug">{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EDITORIAL HAIRLINE DOSSIER ROWS (Zero Repetitive Cards!) */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-4">
              <div className="text-xs font-mono font-bold text-[#0284C7]">Advisory Scope</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07133B]">
                Eliminate Rework Before Writing Code
              </h2>
              <div className="grid grid-cols-1 gap-3 pt-2">
                {service.metrics.map((m) => (
                  <div key={m.label} className="pb-3 border-b border-slate-200 flex items-baseline justify-between">
                    <span className="text-xs font-medium text-slate-600">{m.label}</span>
                    <span className="font-mono text-xl font-extrabold text-[#0284C7] tabular-nums">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 divide-y divide-slate-200 border-t border-slate-200">
              {service.capabilities.map((cap, index) => (
                <div key={cap.title} className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-2 font-mono text-xs font-bold text-[#0284C7] pt-1">
                    STEP 0{index + 1}
                  </div>
                  <div className="sm:col-span-10 space-y-1.5">
                    <h3 className="text-lg font-extrabold text-[#07133B]">{cap.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{cap.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLUEPRINT ARTIFACTS + TOOLKIT BAND */}
      <section className="py-12 sm:py-16 bg-[#F2F8FF] border-y border-sky-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-sky-200 shadow-sm">
            <ResilientImage
              src={service.image}
              alt={service.imageAlt}
              fallbackTitle={service.title}
              width={service.imageWidth}
              height={service.imageHeight}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07133B]">
              100% Portable Technical Deliverables
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every diagram, Figma wireframe, and architecture specification belongs to your organization outright—ready for SAMITECH or any engineering team to build from immediately.
            </p>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-2 rounded-lg bg-white border border-sky-200 font-mono text-xs font-bold text-[#07133B]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ServiceProofAndFaqBand
        service={service}
        relatedStudy={relatedStudy}
        accentColor="#0284C7"
        surfaceClass="bg-white"
        onOpenCaseStudy={onOpenCaseStudy}
      />

      {/* COBALT BLUEPRINT CTA */}
      <section
        id="service-dark-cta"
        className="bg-[#07133B] text-white py-12 sm:py-16 border-t border-sky-500/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Turn Your Concept Into an Unambiguous Blueprint
            </h2>
            <p className="text-sm text-sky-200">
              Reserve your 15-day Product Scope workshop and walk away with wireframes, BPMN flows, and a locked build quote.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenContact(service.contactCategory)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-sm font-extrabold shadow-lg transition-colors whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer"
          >
            <FileCode2 className="w-4 h-4" aria-hidden="true" />
            <span>Start 15-Day Scope</span>
          </button>
        </div>
      </section>
    </div>
  );
}

/* ============================================================================
   07. DIGITAL TRANSFORMATION & MVP BUILDER — Velocity Launchpad (Navy & Gold)
   ============================================================================ */
export function MvpBuilderLayout({
  service,
  relatedStudy,
  onOpenContact,
  onOpenCaseStudy,
}: ServiceLayoutProps) {
  return (
    <div className="bg-white text-[#07133B] overflow-x-clip">
      {/* HIGH-VELOCITY SPLIT HERO WITH 6-10 WEEK LAUNCH PROMISE */}
      <section className="bg-gradient-to-br from-[#FFFBEB] via-white to-[#F2F6FF] pt-10 pb-16 sm:pt-14 sm:pb-20 border-b border-amber-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <Reveal immediate direction="left" wrapperClassName="lg:col-span-6" className="space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#B45309]">
                <Zap className="w-4 h-4" aria-hidden="true" />
                <span>{service.number} · {service.groupLabel} · {service.timelineLabel}</span>
              </div>

              <h1
                className="font-extrabold tracking-tight leading-[1.04] text-balance text-[#07133B]"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.7rem)' }}
              >
                Ship V1 Fast.{' '}
                <span className="text-[#D97706]">Zero Throwaway Code.</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                {service.heroDescription}
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onOpenContact(service.contactCategory)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#07133B] hover:bg-[#B45309] text-white text-sm font-bold shadow-md transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Launch Your MVP</span>
                  <Rocket className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenCaseStudy(relatedStudy)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-amber-50 border border-amber-300 text-[#07133B] text-sm font-bold transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>See Launch Outcome</span>
                </button>
              </div>
            </Reveal>

            {/* Right Layered Launchpad Showcase */}
            <Reveal immediate direction="right" delay={0.06} wrapperClassName="lg:col-span-6">
              <div className="rounded-3xl bg-[#07133B] text-white p-5 sm:p-6 shadow-2xl space-y-4">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07133B]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300">Weekly Live Staging Builds</span>
                    <span className="font-mono text-xs text-white font-bold">6–10 Weeks</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {service.metrics.map((m) => (
                    <div key={m.label} className="rounded-xl bg-white/8 border border-white/10 p-3">
                      <div className="font-mono text-lg font-extrabold text-amber-400 tabular-nums">
                        {m.value}
                      </div>
                      <div className="text-[11px] text-slate-300 mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TWO-TRACK CONTRAST GRID (Startup MVPs vs Enterprise Modernization) */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-bold text-[#B45309]">Two Proven Tracks</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07133B]">
              Built for Startups &amp; Modernizing Enterprises
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-3xl bg-[#FFFBEB] border border-amber-200 p-7 sm:p-8 space-y-5">
              <div className="text-xs font-mono font-bold text-[#B45309]">TRACK A · FOUNDERS</div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#07133B]">
                Venture MVP Launchpad
              </h3>
              <div className="space-y-4">
                {service.capabilities.slice(0, 2).map((cap) => (
                  <div key={cap.title} className="rounded-2xl bg-white border border-amber-200/70 p-5 space-y-1.5">
                    <div className="text-base font-extrabold text-[#07133B]">{cap.title}</div>
                    <p className="text-sm text-slate-600 leading-relaxed">{cap.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[#F2F6FF] border border-[#C7DAFF] p-7 sm:p-8 space-y-5">
              <div className="text-xs font-mono font-bold text-[#0038FF]">TRACK B · OPERATIONS</div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#07133B]">
                Enterprise Digital Modernization
              </h3>
              <div className="space-y-4">
                {service.capabilities.slice(2, 4).map((cap) => (
                  <div key={cap.title} className="rounded-2xl bg-white border border-[#D5E4FF] p-5 space-y-1.5">
                    <div className="text-base font-extrabold text-[#07133B]">{cap.title}</div>
                    <p className="text-sm text-slate-600 leading-relaxed">{cap.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DARK NAVY WEEKLY VELOCITY RIBBON */}
      <section className="py-14 sm:py-16 bg-[#07133B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-bold text-amber-400">Sprint Cadence</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold">6–10 Week Go-Live Rhythm</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-amber-100"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.processSteps.map((step, index) => (
              <div
                key={step.step}
                className="rounded-2xl bg-white/[0.05] border border-white/12 p-5 space-y-2.5"
              >
                <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-amber-400 text-[#07133B] font-mono text-xs font-extrabold">
                  W{index * 2 + 1}
                </div>
                <h3 className="text-base font-bold text-white">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceProofAndFaqBand
        service={service}
        relatedStudy={relatedStudy}
        accentColor="#D97706"
        surfaceClass="bg-[#FFFDF7]"
        onOpenCaseStudy={onOpenCaseStudy}
      />

      {/* NAVY + AMBER GOLD LAUNCHPAD CTA */}
      <section
        id="service-dark-cta"
        className="bg-gradient-to-r from-[#07133B] via-[#0F1E54] to-[#92400E] text-white py-12 sm:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Launch Your V1 Without Technical Debt
            </h2>
            <p className="text-sm text-amber-100">
              Ship paying-ready web or mobile software in 6–10 weeks with clean TypeScript and PostgreSQL foundations.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenContact(service.contactCategory)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-[#07133B] text-sm font-extrabold shadow-lg transition-colors whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer"
          >
            <span>Start MVP Build</span>
            <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}

/* ============================================================================
   09. UX / UI DESIGN — Editorial Design Studio & Live Token Specimen
   ============================================================================ */
export function UxUiDesignLayout({
  service,
  relatedStudy,
  onOpenContact,
  onOpenCaseStudy,
}: ServiceLayoutProps) {
  return (
    <div className="bg-white text-[#07133B] overflow-x-clip">
      {/* MAGAZINE EDITORIAL HERO + LIVE DESIGN SYSTEM SPECIMEN */}
      <section className="bg-gradient-to-br from-[#FFF5FA] via-white to-[#F2F6FF] pt-10 pb-16 sm:pt-14 sm:pb-20 border-b border-pink-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <Reveal immediate direction="left" wrapperClassName="lg:col-span-6" className="space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#BE185D]">
                <Palette className="w-4 h-4" aria-hidden="true" />
                <span>{service.number} · {service.groupLabel} · {service.timelineLabel}</span>
              </div>

              <h1
                className="font-extrabold tracking-tight leading-[1.03] text-balance text-[#07133B]"
                style={{ fontSize: 'clamp(2.3rem, 4.6vw, 3.8rem)' }}
              >
                Interfaces Engineered for{' '}
                <span className="bg-gradient-to-r from-[#DB2777] to-[#0038FF] bg-clip-text text-transparent">
                  Clarity &amp; Craft
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                {service.heroDescription}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onOpenContact(service.contactCategory)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#DB2777] to-[#0038FF] hover:opacity-95 text-white text-sm font-bold shadow-md transition-opacity whitespace-nowrap cursor-pointer"
                >
                  <span>Start a Design Sprint</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenCaseStudy(relatedStudy)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-pink-50 border border-pink-200 text-[#07133B] text-sm font-bold transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>View Design Work</span>
                </button>
              </div>
            </Reveal>

            {/* Right Interactive Design System Specimen Card */}
            <Reveal immediate direction="right" delay={0.08} wrapperClassName="lg:col-span-6">
              <div className="rounded-3xl bg-white border border-pink-200/80 shadow-[0_22px_50px_rgba(219,39,119,0.09)] p-6 space-y-5">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>SAMITECH Design Tokens · WCAG AA</span>
                  <Sliders className="w-4 h-4 text-[#DB2777]" aria-hidden="true" />
                </div>

                {/* Live Swatch & Typography Specimen */}
                <div className="grid grid-cols-4 gap-2.5">
                  <div className="rounded-xl bg-[#07133B] text-white p-3 text-[10px] font-mono">
                    <div className="h-7" />
                    #07133B
                  </div>
                  <div className="rounded-xl bg-[#0038FF] text-white p-3 text-[10px] font-mono">
                    <div className="h-7" />
                    #0038FF
                  </div>
                  <div className="rounded-xl bg-[#DB2777] text-white p-3 text-[10px] font-mono">
                    <div className="h-7" />
                    #DB2777
                  </div>
                  <div className="rounded-xl bg-[#F2F6FF] text-[#07133B] border border-slate-200 p-3 text-[10px] font-mono">
                    <div className="h-7" />
                    #F2F6FF
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200">
                    <ResilientImage
                      src={service.image}
                      alt={service.imageAlt}
                      fallbackTitle={service.title}
                      width={service.imageWidth}
                      height={service.imageHeight}
                      priority
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="col-span-7 space-y-2.5">
                    {service.metrics.map((m) => (
                      <div key={m.label} className="flex items-center justify-between text-xs border-b border-slate-100 pb-2 last:border-b-0 last:pb-0">
                        <span className="text-slate-600">{m.label}</span>
                        <span className="font-mono font-extrabold text-[#DB2777]">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* GALLERY STAGGERED 2-COLUMN CAPABILITIES */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl space-y-2 mb-12">
            <div className="text-xs font-bold text-[#DB2777]">Product Design Studio</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#07133B]">
              Research, Prototyping &amp; Scalable Design Systems
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {service.capabilities.map((cap, index) => (
              <div
                key={cap.title}
                className={`rounded-3xl border border-slate-200 hover:border-pink-300 bg-[#FFFCFE] p-7 sm:p-8 space-y-3 transition-colors ${
                  index % 2 === 1 ? 'md:translate-y-6' : ''
                }`}
              >
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#DB2777]">
                  <Layers className="w-4 h-4" aria-hidden="true" />
                  <span>DISCIPLINE 0{index + 1}</span>
                </div>
                <h3 className="text-xl font-extrabold text-[#07133B]">{cap.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN TYPOGRAPHIC 4-PHASE CRAFT STRIP (Vertical Hairlines, No Heavy Boxes) */}
      <section className="py-14 sm:py-16 bg-[#FDF7FA] border-y border-pink-100 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07133B]">
              Design Craft Cadence
            </h2>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-white border border-pink-200 text-xs font-bold text-[#07133B]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-pink-200/80">
            {service.processSteps.map((step, index) => (
              <div key={step.step} className="lg:px-7 lg:first:pl-0 lg:last:pr-0 space-y-2">
                <div className="font-mono text-2xl font-extrabold text-[#DB2777] tabular-nums">
                  0{index + 1}
                </div>
                <h3 className="text-base font-extrabold text-[#07133B]">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceProofAndFaqBand
        service={service}
        relatedStudy={relatedStudy}
        accentColor="#DB2777"
        surfaceClass="bg-white"
        onOpenCaseStudy={onOpenCaseStudy}
      />

      {/* ROSE-TO-ROYAL-BLUE STUDIO CTA */}
      <section
        id="service-dark-cta"
        className="bg-gradient-to-r from-[#831843] via-[#BE185D] to-[#0038FF] text-white py-12 sm:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Design an Interface Users Remember
            </h2>
            <p className="text-sm text-pink-100">
              Ship clickable Figma prototypes and developer-ready Tailwind design tokens in 2–5 weeks.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenContact(service.contactCategory)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-pink-50 text-[#831843] text-sm font-extrabold shadow-lg transition-colors whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer"
          >
            <span>Book UX / UI Sprint</span>
            <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}

/* ============================================================================
   10. DEDICATED TEAMS — Embedded Engineering Pod & Retainer Studio
   ============================================================================ */
export function DedicatedTeamsLayout({
  service,
  relatedStudy,
  onOpenContact,
  onOpenCaseStudy,
}: ServiceLayoutProps) {
  const podRoles = [
    { role: 'Senior Full-Stack Engineer', focus: 'React · TypeScript · Node.js' },
    { role: 'Backend / AI Specialist', focus: 'Python · PostgreSQL · APIs' },
    { role: 'UI/UX & QA Partner', focus: 'Figma · Automated Testing' },
    { role: 'Security & DevOps Bench', focus: 'AWS · CI/CD · OWASP Audits' },
  ];

  return (
    <div className="bg-white text-[#07133B] overflow-x-clip">
      {/* WIDE SPLIT HERO WITH EMBEDDED POD ROSTER */}
      <section className="bg-gradient-to-br from-[#FFF7ED] via-white to-[#F2F6FF] pt-10 pb-16 sm:pt-14 sm:pb-20 border-b border-orange-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <Reveal immediate direction="left" wrapperClassName="lg:col-span-6" className="space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C2410C]">
                <Users className="w-4 h-4" aria-hidden="true" />
                <span>{service.number} · {service.groupLabel} · {service.timelineLabel}</span>
              </div>

              <h1
                className="font-extrabold tracking-tight leading-[1.04] text-balance text-[#07133B]"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.65rem)' }}
              >
                Embedded Engineering{' '}
                <span className="text-[#EA580C]">Pods on Demand</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                {service.heroDescription}
              </p>

              <div className="grid grid-cols-3 gap-3 pt-1">
                {service.metrics.map((m) => (
                  <div key={m.label} className="rounded-xl bg-white border border-orange-200/80 p-3.5">
                    <div className="font-mono text-lg sm:text-xl font-extrabold text-[#EA580C] tabular-nums">
                      {m.value}
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onOpenContact(service.contactCategory)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-sm font-bold shadow-md transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Assemble Your Pod</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenCaseStudy(relatedStudy)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-orange-50 border border-orange-200 text-[#07133B] text-sm font-bold transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Inspect Pod Delivery</span>
                </button>
              </div>
            </Reveal>

            {/* Right Embedded Squad Roster Card */}
            <Reveal immediate direction="right" delay={0.08} wrapperClassName="lg:col-span-6">
              <div className="rounded-3xl bg-white border border-orange-200/80 shadow-[0_20px_48px_rgba(4,11,41,0.09)] overflow-hidden">
                <div className="relative aspect-[16/8]">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07133B]/90 via-[#07133B]/20 to-transparent" />
                  <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between text-xs text-white font-semibold">
                    <span>Sample Dedicated Pod Composition</span>
                    <span className="text-orange-300 font-mono">WAT Timezone</span>
                  </div>
                </div>

                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {podRoles.map((item) => (
                    <div
                      key={item.role}
                      className="rounded-xl bg-[#FFFBF7] border border-orange-100 p-3.5 space-y-1"
                    >
                      <div className="text-xs font-extrabold text-[#07133B]">{item.role}</div>
                      <div className="text-[11px] font-mono text-[#C2410C]">{item.focus}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 1+3 FEATURED SQUAD CAPABILITIES */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Top Wide Feature Banner */}
          <div className="rounded-3xl bg-[#07133B] text-white p-7 sm:p-9 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-300 font-bold">
                <GitBranch className="w-4 h-4" aria-hidden="true" />
                <span>ZERO HANDOFF FRICTION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                {service.capabilities[0]?.title}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {service.capabilities[0]?.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
              {service.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-xs font-semibold text-white"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getTechBadgeColor(tech, '#FB923C') }}
                    aria-hidden="true"
                  />
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 3 Clean Columns Underneath */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {service.capabilities.slice(1).map((cap, index) => (
              <div
                key={cap.title}
                className="rounded-2xl bg-[#FFFBF7] border border-orange-200/70 p-6 space-y-2.5"
              >
                <div className="font-mono text-xs font-bold text-[#EA580C]">0{index + 2}.</div>
                <h3 className="text-lg font-extrabold text-[#07133B]">{cap.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2x2 SPRINT INTEGRATION GRID */}
      <section className="py-14 sm:py-16 bg-[#F8FAFF] border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl space-y-1.5">
            <div className="text-xs font-bold text-[#EA580C]">10–14 Day Ramp-Up</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07133B]">
              How Your Dedicated Pod Integrates Into Daily Sprints
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {service.processSteps.map((step, index) => (
              <div
                key={step.step}
                className="rounded-2xl bg-white border border-slate-200 p-6 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 text-[#EA580C] font-mono text-sm font-extrabold flex items-center justify-center shrink-0">
                  0{index + 1}
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-[#07133B]">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm font-semibold text-[#07133B]">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#EA580C]" aria-hidden="true" />
              100% Source Code &amp; IP Ownership
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#EA580C]" aria-hidden="true" />
              Direct Access in Your Slack, Jira &amp; GitHub
            </span>
          </div>
        </div>
      </section>

      <ServiceProofAndFaqBand
        service={service}
        relatedStudy={relatedStudy}
        accentColor="#EA580C"
        surfaceClass="bg-white"
        onOpenCaseStudy={onOpenCaseStudy}
      />

      {/* NAVY-TO-TERRACOTTA COLLABORATIVE CTA */}
      <section
        id="service-dark-cta"
        className="bg-gradient-to-r from-[#07133B] via-[#1C1B3A] to-[#C2410C] text-white py-12 sm:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Double Your Engineering Velocity in 14 Days
            </h2>
            <p className="text-sm text-orange-100">
              Meet vetted SAMITECH full-stack, AI, and design engineers ready to join your daily standups.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenContact(service.contactCategory)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-orange-50 text-[#9A3412] text-sm font-extrabold shadow-lg transition-colors whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer"
          >
            <span>Request Pod Roster</span>
            <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
