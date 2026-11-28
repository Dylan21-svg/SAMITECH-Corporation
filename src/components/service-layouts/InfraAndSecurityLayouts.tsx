import {
  Activity,
  ArrowRight,
  Car,
  CheckCircle2,
  Cloud,
  Cpu,
  Laptop,
  Lock,
  Network,
  PhoneCall,
  Server,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Terminal,
  Wrench,
} from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import { Reveal } from '../MotionPrimitives';
import { ResilientImage } from '../ResilientImage';
import { WhatsAppBrandIcon } from '../WhatsAppFloatingButton';
import {
  getTechBadgeColor,
  ServiceProofAndFaqBand,
  type ServiceLayoutProps,
} from './ServiceSharedBlocks';

/* ============================================================================
   03. CLOUD SOLUTIONS & DEPLOYMENT, Dark NOC & Fiber Topology Architecture
   ============================================================================ */
export function CloudNetworkingLayout({
  service,
  relatedStudy,
  onOpenContact,
  onOpenCaseStudy,
}: ServiceLayoutProps) {
  return (
    <div className="bg-white text-[#07133B] overflow-x-clip">
      {/* DARK ARCHITECTURAL CLOUD & FIBER TOPOLOGY HERO */}
      <section
        id="service-dark-hero"
        className="relative bg-[#040B29] text-white pt-7 pb-12 sm:pt-14 sm:pb-20 overflow-hidden"
      >
        {/* Subtle Architectural Fiber Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(56,189,248,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.18) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <Reveal immediate direction="left" wrapperClassName="lg:col-span-7" className="space-y-5">
              <div className="text-xs font-mono font-semibold text-[#38BDF8]">
                {service.number} · {service.groupLabel} · {service.timelineLabel}
              </div>

              <h1
                className="font-extrabold tracking-tight leading-[1.04] text-balance text-white"
                style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3.7rem)' }}
              >
                Starlink, Wi-Fi Zones &amp;{' '}
                <span className="text-[#38BDF8]">Network Services</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {service.heroDescription}
              </p>

              {/* Inline Dark Spec Bar */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-2 border-t border-white/12 max-w-xl">
                {service.metrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="font-mono text-lg sm:text-2xl font-extrabold text-[#38BDF8] tabular-nums">
                      {metric.value}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5 leading-tight">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onOpenContact(service.contactCategory)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-sm font-bold shadow-lg shadow-[#0EA5E9]/25 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Book Network Survey</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenCaseStudy(relatedStudy)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/8 hover:bg-white/15 border border-white/20 text-white text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>View Network Case Study</span>
                </button>
              </div>
            </Reveal>

            {/* Right Interactive Topology & Rack Showcase */}
            <Reveal immediate direction="right" delay={0.08} wrapperClassName="lg:col-span-5">
              <div className="rounded-2xl bg-[#081542] border border-[#38BDF8]/25 p-5 space-y-4 shadow-[0_24px_50px_rgba(0,0,0,0.45)]">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040B29]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#93C5FD] font-mono">
                    <span>Starlink &amp; Fiber Fabric</span>
                    <span>Wi-Fi Zone Ready</span>
                  </div>
                </div>

                {/* Topology Diagram Strip */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3 space-y-1">
                    <Cloud className="w-4 h-4 text-[#38BDF8] mx-auto" aria-hidden="true" />
                    <div className="text-[11px] font-bold text-white">Starlink</div>
                    <div className="text-[10px] text-slate-400">Install &amp; Extend</div>
                  </div>
                  <div className="rounded-xl bg-[#0EA5E9]/15 border border-[#38BDF8]/40 p-3 space-y-1">
                    <Network className="w-4 h-4 text-[#38BDF8] mx-auto" aria-hidden="true" />
                    <div className="text-[11px] font-bold text-white">Wi-Fi Zones</div>
                    <div className="text-[10px] text-[#93C5FD]">Hotspot Mesh</div>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3 space-y-1">
                    <Server className="w-4 h-4 text-[#38BDF8] mx-auto" aria-hidden="true" />
                    <div className="text-[11px] font-bold text-white">LAN Setup</div>
                    <div className="text-[10px] text-slate-400">Cameroon · Nationwide</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EDITORIAL NUMBERED SPECIFICATION TABLE */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-slate-200">
            <div className="space-y-1.5">
              <div className="text-xs font-mono font-bold text-[#0284C7]">Network Specifications</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#07133B]">
                Starlink, Wi-Fi Zones &amp; LAN Capabilities
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md">
              Built for uninterrupted high-speed connectivity across homes, campuses, hotels, and multi-branch offices.
            </p>
          </div>

          <div className="divide-y divide-slate-200">
            {service.capabilities.map((cap, index) => (
              <div
                key={cap.title}
                className="py-6 sm:py-7 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              >
                <div className="md:col-span-1 font-mono text-sm font-extrabold text-[#0284C7] tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-base sm:text-lg font-extrabold text-[#07133B]">
                    {cap.title}
                  </h3>
                </div>
                <div className="md:col-span-5 text-sm text-slate-600 leading-relaxed">
                  {cap.description}
                </div>
                <div className="md:col-span-2 md:text-right">
                  <button
                    type="button"
                    onClick={() => onOpenContact(service.contactCategory)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0284C7] hover:text-[#07133B] cursor-pointer"
                  >
                    <span>Scope Spec</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HORIZONTAL BLUEPRINT PIPELINE ON COOL SLATE-BLUE CANVAS */}
      <section className="py-14 sm:py-18 bg-[#F0F7FF] border-y border-[#CFE5FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-mono font-bold text-[#0284C7]">Deployment Pipeline</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07133B]">
              Zero Impact Cutover &amp; 24/7 Operations
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.processSteps.map((step, index) => (
              <div
                key={step.step}
                className="rounded-xl bg-white border border-[#CFE5FF] p-5 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="font-mono text-xs font-bold text-[#0284C7]">
                    STAGE 0{index + 1}
                  </span>
                  <Activity className="w-4 h-4 text-[#0284C7]" aria-hidden="true" />
                </div>
                <h3 className="text-base font-extrabold text-[#07133B]">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>

          {/* Stack Matrix */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2.5">
            {service.techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#CFE5FF] font-mono text-xs font-bold text-[#07133B]"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: getTechBadgeColor(tech, '#0284C7') }}
                  aria-hidden="true"
                />
                {tech}
              </span>
            ))}
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

      {/* ELECTRIC-BLUE COMMAND CTA */}
      <section
        id="service-dark-cta"
        className="bg-gradient-to-r from-[#040B29] via-[#07245E] to-[#0284C7] text-white py-12 sm:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Eliminate Dead Zones &amp; Downtime
            </h2>
            <p className="text-sm text-sky-100">
              Schedule Starlink installation, Wi-Fi zone deployment, or structured LAN setup with SAMITECH&apos;s field network engineers.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenContact(service.contactCategory)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white hover:bg-sky-50 text-[#040B29] text-sm font-extrabold shadow-lg transition-colors whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer"
          >
            <span>Deploy With SAMITECH</span>
            <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}

/* ============================================================================
   04. CYBERSECURITY, Crimson Shield & Tactical Defense Architecture
   ============================================================================ */
export function CybersecurityLayout({
  service,
  relatedStudy,
  onOpenContact,
  onOpenCaseStudy,
}: ServiceLayoutProps) {
  return (
    <div className="bg-white text-[#07133B] overflow-x-clip">
      {/* DARK CHARCOAL + CRIMSON TACTICAL HERO */}
      <section
        id="service-dark-hero"
        className="relative bg-gradient-to-br from-[#090B14] via-[#111526] to-[#1E0A12] text-white pt-7 pb-12 sm:pt-14 sm:pb-20 border-b border-[#DC0914]/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <Reveal immediate direction="left" wrapperClassName="lg:col-span-7" className="space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF5C66]">
                <ShieldAlert className="w-4 h-4" aria-hidden="true" />
                <span>{service.number} · {service.groupLabel} · {service.timelineLabel}</span>
              </div>

              <h1
                className="font-extrabold tracking-tight leading-[1.04] text-balance"
                style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3.7rem)' }}
              >
                CCTV Surveillance &amp;{' '}
                <span className="text-[#FF4754]">Cybersecurity Defense</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {service.heroDescription}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onOpenContact(service.contactCategory)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#DC0914] hover:bg-[#B80610] text-white text-sm font-bold shadow-lg shadow-[#DC0914]/30 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Schedule Security Audit</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenCaseStudy(relatedStudy)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/8 hover:bg-white/15 border border-white/20 text-white text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Read Audit Case Study</span>
                </button>
              </div>
            </Reveal>

            {/* Right Security Posture & Attack Surface Card */}
            <Reveal immediate direction="right" delay={0.08} wrapperClassName="lg:col-span-5">
              <div className="rounded-2xl bg-[#111524] border border-[#DC0914]/35 overflow-hidden shadow-2xl">
                <div className="relative aspect-[16/9] overflow-hidden">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111524] via-[#111524]/35 to-transparent" />
                </div>

                <div className="p-5 space-y-3.5">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                    <span>Attack Surface Scope</span>
                    <span className="text-[#FF5C66] font-bold">OWASP · Zero Trust</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
                    {service.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-lg bg-white/5 border border-white/10 p-2 sm:p-2.5 text-center"
                      >
                        <div className="font-mono text-sm sm:text-lg font-extrabold text-white tabular-nums">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-slate-300 leading-tight mt-0.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RED-TEAM / BLUE-TEAM 2x2 DEFENSE CARDS */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-2 mb-10">
            <div className="text-xs font-mono font-bold text-[#DC0914]">Physical &amp; Digital Security</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07133B]">
              CCTV Camera Systems &amp; Cyber Hardening
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.capabilities.map((cap, index) => (
              <div
                key={cap.title}
                className="rounded-2xl bg-[#FAFAFC] border border-slate-200 overflow-hidden hover:border-[#DC0914]/45 transition-colors"
              >
                <div className="h-1 w-full bg-gradient-to-r from-[#DC0914] to-[#07133B]" aria-hidden="true" />
                <div className="p-6 sm:p-7 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#DC0914]">
                      DEFENSE 0{index + 1}
                    </span>
                    <Lock className="w-4 h-4 text-slate-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-extrabold text-[#07133B]">{cap.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{cap.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DARK CHARCOAL 4-STAGE AUDIT TIMELINE + TOOLKIT */}
      <section className="py-14 sm:py-18 bg-[#0D101B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="text-xs font-mono font-bold text-[#FF5C66]">Audit Protocol</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                4 Stage Security Assessment &amp; 48 Hour Retest
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 rounded-md bg-white/8 border border-white/15 font-mono text-xs text-slate-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.processSteps.map((step, index) => (
              <div
                key={step.step}
                className="rounded-xl bg-white/[0.04] border border-white/12 p-5 space-y-3"
              >
                <div className="w-8 h-8 rounded-lg bg-[#DC0914] text-white font-mono text-xs font-extrabold flex items-center justify-center">
                  0{index + 1}
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
        accentColor="#DC0914"
        surfaceClass="bg-[#FAFAFC]"
        onOpenCaseStudy={onOpenCaseStudy}
      />

      {/* CRIMSON SHIELD BOTTOM CTA */}
      <section
        id="service-dark-cta"
        className="bg-gradient-to-r from-[#8E050C] via-[#C40812] to-[#0B1022] text-white py-12 sm:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Harden Your Attack Surface Today
            </h2>
            <p className="text-sm text-red-100">
              Request CCTV installation, ongoing camera maintenance, or a security audit for your facilities and networks.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenContact(service.contactCategory)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white hover:bg-red-50 text-[#99060E] text-sm font-extrabold shadow-lg transition-colors whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer"
          >
            <Terminal className="w-4 h-4" aria-hidden="true" />
            <span>Book Security Audit</span>
            <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}

/* ============================================================================
   03B. MAINTENANCE (IT SUPPORT), Computer Maintenance & Computer Lab Setup
   ============================================================================ */
export function MaintenanceSupportLayout({
  service,
  relatedStudy,
  onOpenContact,
  onOpenCaseStudy,
}: ServiceLayoutProps) {
  const { settings, buildWhatsAppUrl } = useSiteContent();

  return (
    <div className="bg-white text-[#07133B] overflow-x-clip">
      <section className="bg-gradient-to-br from-[#F0FDFB] via-white to-[#EEF5FF] pt-7 pb-11 sm:pt-14 sm:pb-18 border-b border-teal-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <Reveal immediate direction="left" wrapperClassName="lg:col-span-7" className="space-y-5">
              <div className="inline-flex flex-wrap items-center gap-2 text-xs font-bold text-[#0F766E]">
                <Wrench className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{service.number} · {service.groupLabel} · Hotline {settings.phone}</span>
              </div>

              <h1
                className="font-extrabold tracking-tight leading-[1.05] text-balance text-[#07133B]"
                style={{ fontSize: 'clamp(1.6rem, 4.3vw, 3.5rem)' }}
              >
                Computer Maintenance &amp;{' '}
                <span className="text-[#0F766E]">Computer Lab Setup</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                {service.heroDescription}
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onOpenContact(service.contactCategory)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F766E] hover:bg-[#115E59] text-white text-sm font-bold shadow-md transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Book Maintenance or Lab Setup</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </button>
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-teal-50 border border-teal-300 text-[#07133B] text-sm font-bold tabular-nums transition-colors whitespace-nowrap"
                >
                  <PhoneCall className="w-4 h-4 text-[#0F766E]" aria-hidden="true" />
                  <span>{settings.phone}</span>
                </a>
                <a
                  href={buildWhatsAppUrl('Hello SAMITECH, I need assistance with Computer Maintenance / Computer Lab Setup.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-bold shadow-sm transition-colors whitespace-nowrap"
                >
                  <WhatsAppBrandIcon className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </Reveal>

            <Reveal immediate direction="right" delay={0.06} wrapperClassName="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden bg-[#07133B] border border-teal-500/30 shadow-xl">
                <div className="relative aspect-[16/10]">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07133B]/95 via-[#07133B]/25 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs font-mono text-teal-300">Hardware &amp; Lab Engineering</div>
                    <div className="text-base font-extrabold">Workstation Care &amp; Turnkey Labs</div>
                  </div>
                </div>
                <div className="p-3 sm:p-4 grid grid-cols-3 gap-1.5 sm:gap-2 text-center bg-[#07133B] text-white">
                  {service.metrics.map((m) => (
                    <div key={m.label} className="rounded-lg bg-white/6 p-2 sm:p-2.5">
                      <div className="font-mono text-xs sm:text-base font-extrabold text-teal-300 tabular-nums">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-slate-300 mt-0.5 leading-tight">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl space-y-1.5">
            <div className="text-xs font-bold text-[#0F766E]">IT Support Scope</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07133B]">
              Maintenance &amp; Lab Deployment Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.capabilities.map((cap, index) => (
              <div
                key={cap.title}
                className="rounded-2xl bg-[#F8FAFF] border border-slate-200 hover:border-teal-500/45 p-6 sm:p-7 space-y-3 transition-colors"
              >
                <div className="font-mono text-xs font-bold text-[#0F766E]">0{index + 1}.</div>
                <h3 className="text-lg font-extrabold text-[#07133B]">{cap.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 bg-[#F0FDFB] border-y border-teal-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl space-y-1.5">
            <div className="text-xs font-bold text-[#0F766E]">Workflow</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07133B]">
              How We Service Fleets &amp; Build Computer Labs
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.processSteps.map((step, index) => (
              <div
                key={step.step}
                className="rounded-2xl bg-white border border-teal-200/80 p-5 space-y-2.5"
              >
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0F766E]">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  <span>Step 0{index + 1}</span>
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
        accentColor="#0F766E"
        surfaceClass="bg-white"
        onOpenCaseStudy={onOpenCaseStudy}
      />

      <section
        id="service-dark-cta"
        className="bg-gradient-to-r from-[#07133B] via-[#0B3B49] to-[#0F766E] text-white py-12 sm:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Need Workstation Maintenance or a New Computer Lab?
            </h2>
            <p className="text-sm text-teal-100">
              Schedule diagnostics, upgrades, or turnkey school and office lab installation with our support team.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenContact(service.contactCategory)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-teal-50 text-[#07133B] text-sm font-extrabold shadow-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            <Wrench className="w-4 h-4 text-[#0F766E]" aria-hidden="true" />
            <span>Request IT Support</span>
          </button>
        </div>
      </section>
    </div>
  );
}

/* ============================================================================
   06. TRACKING, Authorized Equipment & Vehicle Recovery Matrix
   ============================================================================ */
export function TrackingSupportLayout({
  service,
  relatedStudy,
  onOpenContact,
  onOpenCaseStudy,
}: ServiceLayoutProps) {
  const { settings, buildWhatsAppUrl } = useSiteContent();
  const tiers = [
    { icon: Cpu, name: 'IoT & Tracker Devices', note: 'Authorized telemetry recovery' },
    { icon: Smartphone, name: 'Smartphones & Tablets', note: 'Receipt or IMEI box verified' },
    { icon: Laptop, name: 'Laptops & Workstations', note: 'Corporate & personal devices' },
    { icon: Car, name: 'Vehicles & Fleet Assets', note: 'Includes law enforcement liaison' },
  ];

  return (
    <div className="bg-white text-[#07133B] overflow-x-clip">
      {/* 24/7 OPERATIONS DESK SPLIT HERO */}
      <section className="bg-gradient-to-br from-[#F0FDFB] via-white to-[#EEF5FF] pt-7 pb-11 sm:pt-14 sm:pb-18 border-b border-teal-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <Reveal immediate direction="left" wrapperClassName="lg:col-span-7" className="space-y-5">
              <div className="inline-flex flex-wrap items-center gap-2 text-xs font-bold text-[#0F766E]">
                <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{service.number} · {service.groupLabel} · Hotline {settings.phone}</span>
              </div>

              <h1
                className="font-extrabold tracking-tight leading-[1.05] text-balance text-[#07133B]"
                style={{ fontSize: 'clamp(1.6rem, 4.3vw, 3.5rem)' }}
              >
                Authorized Equipment{' '}
                <span className="text-[#0F766E]">Tracking</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                {service.heroDescription}
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onOpenContact(service.contactCategory)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F766E] hover:bg-[#115E59] text-white text-sm font-bold shadow-md transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Open Tracking Case</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </button>
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-teal-50 border border-teal-300 text-[#07133B] text-sm font-bold tabular-nums transition-colors whitespace-nowrap"
                >
                  <PhoneCall className="w-4 h-4 text-[#0F766E]" aria-hidden="true" />
                  <span>{settings.phone}</span>
                </a>
                <a
                  href={buildWhatsAppUrl('Hello SAMITECH, I would like to open an Authorized Equipment Tracking case.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-bold shadow-sm transition-colors whitespace-nowrap"
                >
                  <WhatsAppBrandIcon className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </Reveal>

            <Reveal immediate direction="right" delay={0.06} wrapperClassName="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden bg-[#07133B] border border-teal-500/30 shadow-xl">
                <div className="relative aspect-[16/10]">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07133B]/95 via-[#07133B]/25 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs font-mono text-teal-300">Cameroon Operations Center</div>
                    <div className="text-base font-extrabold">Round the Clock System Watch &amp; Recovery</div>
                  </div>
                </div>
                <div className="p-3 sm:p-4 grid grid-cols-3 gap-1.5 sm:gap-2 text-center bg-[#07133B] text-white">
                  {service.metrics.map((m) => (
                    <div key={m.label} className="rounded-lg bg-white/6 p-2 sm:p-2.5">
                      <div className="font-mono text-xs sm:text-base font-extrabold text-teal-300 tabular-nums">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-slate-300 mt-0.5 leading-tight">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TRANSPARENT 4-TIER TRACKING RATE MATRIX */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-[#0F766E]">Device &amp; Fleet Coverage</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07133B]">
                Authorized Equipment Tracking Categories
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md">
              Original purchase receipt or matching IMEI/serial packaging is mandatory. False reporting is strictly prohibited.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.name}
                  className="rounded-2xl bg-[#F8FAFF] border border-slate-200 hover:border-teal-500/50 p-6 flex flex-col justify-between space-y-5 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#0F766E] border border-teal-200/80 flex items-center justify-center">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-extrabold text-[#07133B]">{tier.name}</h3>
                    <p className="text-xs text-slate-600">{tier.note}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenContact(service.contactCategory)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#07133B] hover:text-[#0F766E] cursor-pointer"
                  >
                    <span>Initiate Intake</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PREVENTATIVE SLA + 4-STEP RESPONSE WORKFLOW */}
      <section className="py-14 sm:py-16 bg-[#F0FDFB] border-y border-teal-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl space-y-1.5">
            <div className="text-xs font-bold text-[#0F766E]">Response Protocol</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07133B]">
              How Our 24/7 Support &amp; Recovery Desk Operates
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.processSteps.map((step, index) => (
              <div
                key={step.step}
                className="rounded-2xl bg-white border border-teal-200/80 p-5 space-y-2.5"
              >
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0F766E]">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  <span>Step 0{index + 1}</span>
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
        accentColor="#0F766E"
        surfaceClass="bg-white"
        onOpenCaseStudy={onOpenCaseStudy}
      />

      {/* DEEP NAVY-TO-TEAL HOTLINE CTA */}
      <section
        id="service-dark-cta"
        className="bg-gradient-to-r from-[#07133B] via-[#0B3B49] to-[#0F766E] text-white py-12 sm:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Need Immediate Maintenance or Device Recovery?
            </h2>
            <p className="text-sm text-teal-100">
              Reach our Cameroon operations team 24/7 for server SLA support or authorized equipment tracking.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenContact(service.contactCategory)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-teal-50 text-[#07133B] text-sm font-extrabold shadow-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#0F766E]" aria-hidden="true" />
              <span>Contact Operations Desk</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
