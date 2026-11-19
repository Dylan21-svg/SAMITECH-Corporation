import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  MapPin,
  Network,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { Reveal } from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';
import {
  ABOUT_HERO_MEDIA,
  CASE_STUDIES,
  type CaseStudy,
} from '../data/samitechData';

interface ProjectsPageProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
  onOpenContact: (defaultCategory?: string) => void;
  onNavigateServices: () => void;
}

const SECTOR_FILTERS = [
  'All Sectors',
  'Software Development',
  'Networking Solutions',
  'Cybersecurity Services',
  'Tracking & Data Systems',
];

const PROJECTS_KPI_BAR = [
  { label: 'Delivered Projects', value: '100+', icon: Code2 },
  { label: 'Packet Latency Drop', value: '-58%', icon: TrendingUp },
  { label: 'Critical CVEs Fixed', value: '100%', icon: ShieldCheck },
  { label: 'WAN Uptime SLA', value: '99.95%', icon: Network },
];

export function ProjectsPage({
  onSelectCaseStudy,
  onOpenContact,
  onNavigateServices,
}: ProjectsPageProps) {
  const [selectedSector, setSelectedSector] = useState('All Sectors');

  const filteredProjects =
    selectedSector === 'All Sectors'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((study) => study.sector === selectedSector);

  const scrollToGrid = () => {
    const el = document.getElementById('projects-catalogue');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white text-[#07133B]">
      {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-white border-b border-[#0044FF]/10">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <ResilientImage
            src={ABOUT_HERO_MEDIA.image}
            alt={ABOUT_HERO_MEDIA.alt}
            fallbackTitle="SAMITECH Corporation Projects"
            width={ABOUT_HERO_MEDIA.width}
            height={ABOUT_HERO_MEDIA.height}
            priority
            className="w-full h-full object-cover object-[76%_top] sm:object-[right_top] lg:object-center opacity-90"
          />
          <div className="absolute inset-y-0 left-0 w-[68%] sm:w-[60%] bg-gradient-to-r from-white via-white/95 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-28 pb-4 sm:pb-8 lg:pb-10">
          <div className="grid grid-cols-12 items-center gap-2 sm:gap-4 lg:gap-6">
            <Reveal
              direction="left"
              wrapperClassName="col-span-7 sm:col-span-6"
              className="space-y-2 sm:space-y-4 lg:space-y-5"
            >
              <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-xs font-semibold text-[#002BFF] tracking-tight">
                <span className="w-4 sm:w-5 h-[2px] bg-[#0044FF] rounded-full" aria-hidden="true" />
                <span>Featured Deployments</span>
              </div>

              <div className="space-y-1 sm:space-y-1.5">
                <h1
                  className="font-extrabold tracking-tight leading-[1.05] text-balance"
                  style={{ fontSize: 'clamp(1.2rem, 3.85vw, 3.45rem)' }}
                >
                  <span className="text-[#07133B] block">Verified Impact</span>
                  <span className="bg-gradient-to-r from-[#0014CC] via-[#0033FF] to-[#0055FF] bg-clip-text text-transparent block">
                    In Production
                  </span>
                </h1>
                <div className="pt-0.5 sm:pt-1 flex items-center w-20 sm:w-32 lg:w-40" aria-hidden="true">
                  <span className="w-1/2 h-[2px] sm:h-[3px] bg-[#0044FF] rounded-l-full" />
                  <span className="w-1/2 h-[2px] sm:h-[3px] bg-[#DC0914] rounded-r-full" />
                </div>
              </div>

              <p className="max-w-xl text-[9px] sm:text-[13px] lg:text-[15.5px] font-medium text-slate-800 leading-snug sm:leading-relaxed">
                Explore real-world enterprise software platforms, multi-site OpenVPN networks,
                penetration testing audits, and verified device tracking portals engineered across
                Buea, Douala, Yaoundé, and international partners.
              </p>

              <div className="pt-0.5 sm:pt-1 flex flex-nowrap items-center gap-1.5 sm:gap-4">
                <button
                  type="button"
                  onClick={() => onOpenContact()}
                  className="inline-flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 text-[8.5px] sm:text-xs lg:text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#002BFF] to-[#0055FF] hover:from-[#001ACC] hover:to-[#003CE6] shadow-md shadow-[#002BFF]/25 transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.75} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={scrollToGrid}
                  className="inline-flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 text-[8.5px] sm:text-xs lg:text-sm font-semibold text-[#07133B] bg-white border border-slate-300 hover:border-[#0044FF]/50 hover:bg-[#F2F6FF] rounded-full shadow-sm transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Browse Case Studies</span>
                </button>
              </div>
            </Reveal>

            <div className="col-span-5 sm:col-span-6 h-32 sm:h-72 lg:h-[390px]" aria-hidden="true" />
          </div>

          <Reveal direction="bottom" delay={0.08} className="mt-4 sm:mt-8 lg:mt-10">
            <div className="bg-[#061233] text-white rounded-xl sm:rounded-2xl border border-white/15 shadow-[0_18px_40px_rgba(4,11,41,0.28)] px-2 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-0 sm:divide-x divide-[#3B82F6]/35">
                {PROJECTS_KPI_BAR.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-center sm:justify-center gap-2.5 sm:gap-3 lg:gap-4 px-2 sm:px-3 lg:px-5 min-w-0"
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#60A5FA] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                      <div className="min-w-0">
                        <div className="font-display text-xs sm:text-base lg:text-lg font-extrabold text-white tabular-nums truncate">
                          {item.value}
                        </div>
                        <div className="text-[10px] sm:text-xs text-slate-300 font-medium truncate">
                          {item.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FILTERABLE CASE STUDIES CATALOGUE */}
      <section id="projects-catalogue" className="py-10 sm:py-16 lg:py-24 bg-[#F2F6FF] border-b border-[#0044FF]/10 overflow-x-clip">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
            <Reveal direction="left" delay={0} className="space-y-2 max-w-2xl">
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#07133B] text-balance">
                Case Study{' '}
                <span className="text-[#002BFF]">Portfolio</span>
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">
                Select a sector below or open any deployment card to inspect full challenge,
                architecture, and deliverable metrics.
              </p>
            </Reveal>

            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white rounded-xl border border-[#0044FF]/12 shadow-xs">
              {SECTOR_FILTERS.map((sector) => {
                const isActive = selectedSector === sector;
                return (
                  <button
                    key={sector}
                    type="button"
                    onClick={() => setSelectedSector(sector)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#07133B] text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#07133B] hover:bg-[#F2F6FF]'
                    }`}
                  >
                    {sector}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {filteredProjects.map((study, index) => (
              <Reveal key={study.id} direction={index % 2 === 0 ? 'left' : 'right'} delay={0.05 * index}>
                <article className="h-full bg-white rounded-2xl border border-[#0044FF]/12 shadow-sm overflow-hidden flex flex-col sm:flex-row">
                  <div className="sm:w-44 md:w-48 lg:w-52 shrink-0 relative min-h-[210px] bg-[#040B29]">
                    <ResilientImage
                      src={study.image}
                      alt={study.imageAlt}
                      fallbackTitle={study.title}
                      width={study.imageWidth}
                      height={study.imageHeight}
                      darkSkeleton
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040B29]/85 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                      <span className="truncate">{study.location}</span>
                    </div>
                  </div>

                  <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <span className="text-[#002BFF] font-semibold">{study.sector}</span>
                        <span aria-hidden="true">·</span>
                        <span>{study.year}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#07133B] leading-snug">
                        {study.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {study.summary}
                      </p>

                      {/* Quantified Metrics Row */}
                      <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#F4F7FF] border border-[#0044FF]/10">
                        {study.metrics.map((metric) => (
                          <div key={metric.label} className="min-w-0">
                            <div className="font-mono tabular-nums text-sm sm:text-base font-bold text-[#002BFF]">
                              {metric.value}
                            </div>
                            <div className="text-[10px] sm:text-[11px] text-slate-600 leading-tight truncate">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <ul className="space-y-1.5">
                        {study.deliverables.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-xs text-[#07133B]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#002BFF] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectCaseStudy(study)}
                        className="text-xs sm:text-sm font-semibold text-[#002BFF] hover:text-[#DC0914] transition-colors cursor-pointer"
                      >
                        Inspect Full Case Study
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenContact(study.serviceCategory)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white rounded-full bg-[#07133B] hover:bg-[#002BFF] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>Discuss Scope</span>
                        <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DARK CHAMFERED DEPLOYMENT CTA CARD */}
      <section className="py-10 sm:py-16 lg:py-24 bg-white overflow-x-clip">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <Reveal direction="none" delay={0}>
            <div id="projects-impact-card" className="relative">
              <svg
                viewBox="0 0 1200 420"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full drop-shadow-[0_22px_45px_rgba(4,11,41,0.22)] pointer-events-none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="projectsDarkBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#070B19" />
                    <stop offset="55%" stopColor="#0B1126" />
                    <stop offset="100%" stopColor="#060D28" />
                  </linearGradient>
                  <linearGradient id="projectsStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0044FF" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#DC0914" stopOpacity="0.45" />
                  </linearGradient>
                </defs>
                <path
                  d="M 4,78 Q 4,54 28,54 L 270,54 Q 290,54 303,38 L 328,14 Q 341,4 360,4 L 840,4 Q 859,4 872,14 L 897,38 Q 910,54 930,54 L 1172,54 Q 1196,54 1196,78 L 1196,392 Q 1196,416 1172,416 L 476,416 Q 456,416 442,401 L 414,369 Q 400,354 380,354 L 28,354 Q 4,354 4,330 Z"
                  fill="url(#projectsDarkBg)"
                  stroke="url(#projectsStroke)"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <div className="relative z-10 px-5 sm:px-10 lg:px-14 pt-8 pb-20 sm:pb-24 text-white text-center space-y-4">
                <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold tracking-tight text-white text-balance">
                  Ready to Build Your Next{' '}
                  <span className="text-[#60A5FA]">Production System</span>
                  <span className="text-[#EF4444]">?</span>
                </h2>
                <p className="text-xs sm:text-sm lg:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                  Whether modernizing multi-branch ERP operations, hardening enterprise networks, or
                  launching secure mobile platforms, our Buea engineering team ships on schedule.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onNavigateServices}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white border border-white/25 hover:border-[#60A5FA] hover:bg-white/[0.06] rounded-full transition-colors cursor-pointer"
                  >
                    <span>Explore All Service Capabilities</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal
            direction="left"
            delay={0.1}
            wrapperClassName="relative z-10 -mt-7 sm:-mt-9"
            className="flex items-center gap-3 sm:gap-5 pr-1 sm:pr-2"
          >
            <button
              type="button"
              onClick={() => onOpenContact()}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-[#DC0914] to-[#950606] hover:from-[#B90610] hover:to-[#7A0404] shadow-md transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Schedule Architecture Review</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.75} aria-hidden="true" />
            </button>
            <div className="h-px flex-1 bg-gradient-to-r from-[#0044FF]/35 via-slate-300/80 to-transparent" aria-hidden="true" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
