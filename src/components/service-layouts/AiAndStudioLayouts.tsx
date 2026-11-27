import {
  ArrowRight,
  CheckCircle2,
  GitBranch,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { Reveal } from '../MotionPrimitives';
import { ResilientImage } from '../ResilientImage';
import {
  getTechBadgeColor,
  ServiceProofAndFaqBand,
  type ServiceLayoutProps,
} from './ServiceSharedBlocks';

/* ============================================================================
   05. DEDICATED TEAMS, Embedded Engineering & Technical Pod Studio
   ============================================================================ */
export function DedicatedTeamsLayout({
  service,
  relatedStudy,
  onOpenContact,
  onOpenCaseStudy,
}: ServiceLayoutProps) {
  const podRoles = [
    { role: 'Full Stack & Mobile Developer', focus: 'React · TypeScript · Flutter · Node.js' },
    { role: 'UI/UX & Graphics Designer', focus: 'Figma · Illustrator · Brand Kits' },
    { role: 'Starlink & Network Engineer', focus: 'Starlink · WiFi Zones · MikroTik · LAN' },
    { role: 'IT Support & CCTV Specialist', focus: 'PC Labs · Maintenance · IP CCTV' },
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
                Embedded Tech{' '}
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
                  <span>Assemble Your Team</span>
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
                    className="w-2 h-2 rounded-[2px] shrink-0"
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
            <div className="text-xs font-bold text-[#EA580C]">7 to 14 Day Onboarding</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07133B]">
              How Your Dedicated Team Integrates Into Daily Workflows
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
              100% Source Code, Design &amp; Asset Ownership
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#EA580C]" aria-hidden="true" />
              Direct Collaboration in Slack, WhatsApp, Jira &amp; GitHub
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
              Scale Your Technical Capacity in 14 Days
            </h2>
            <p className="text-sm text-orange-100">
              Meet vetted SAMITECH software engineers, UI/UX &amp; graphics designers, network techs, and IT specialists.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenContact(service.contactCategory)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-orange-50 text-[#9A3412] text-sm font-extrabold shadow-lg transition-colors whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer"
          >
            <span>Request Team Roster</span>
            <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
