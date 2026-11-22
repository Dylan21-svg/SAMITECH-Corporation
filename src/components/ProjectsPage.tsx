import { useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Globe,
  Rocket,
  Star,
  Users,
} from 'lucide-react';
import {
  EXTRA_PROJECT_FILTERS,
  PORTFOLIO_PROJECTS,
  PRIMARY_PROJECT_FILTERS,
  PROJECTS_PAGE_MEDIA,
  type ProjectFilterId,
  type ShowcaseProject,
} from '../data/projectsData';
import type { CaseStudy } from '../data/samitechData';
import { Reveal } from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';
import { ProjectGoldTrophyIcon } from './ShowcaseIcons';

interface ProjectsPageProps {
  onSelectProject: (study: CaseStudy) => void;
  onOpenContact: (defaultCategory?: string) => void;
}

const PORTFOLIO_STATS = [
  {
    icon: Rocket,
    value: '10+',
    label: 'Completed Projects',
  },
  {
    icon: Users,
    value: '1K+',
    label: 'Active Users',
  },
  {
    icon: Globe,
    value: '3+',
    label: 'Countries Impacted',
  },
];

export function ProjectsPage({
  onSelectProject,
  onOpenContact,
}: ProjectsPageProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterId>('all');
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const visibleProjects: ShowcaseProject[] =
    activeFilter === 'all'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((project) => project.filterCategory === activeFilter);

  const isExtraFilterSelected = EXTRA_PROJECT_FILTERS.some(
    (item) => item.id === activeFilter
  );

  return (
    <div className="bg-white text-[#07133B]">
      {/* DARK ROYAL-BLUE HOLOGRAPHIC LAPTOP HERO + KPI BAR */}
      <section className="relative overflow-hidden bg-[#020B2B] text-white">
        {/* Background Glowing Code Laptop Artwork */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <ResilientImage
            src={PROJECTS_PAGE_MEDIA.heroLaptop.image}
            alt={PROJECTS_PAGE_MEDIA.heroLaptop.alt}
            fallbackTitle="SAMITECH Projects Portfolio"
            width={PROJECTS_PAGE_MEDIA.heroLaptop.width}
            height={PROJECTS_PAGE_MEDIA.heroLaptop.height}
            priority
            darkSkeleton
            className="w-full h-full object-cover object-[78%_center] sm:object-center"
          />
          {/* Scrim preserving high-contrast white headline & cyan sub-accent on left while keeping glowing laptop crisp on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#020B2B]/92 via-[#031245]/60 to-transparent sm:w-[70%]" />
          {/* Crimson & Cyan Corner Swoosh Accent matching mockup */}
          <svg
            viewBox="0 0 260 120"
            className="hidden sm:block absolute right-0 bottom-6 w-44 lg:w-64 h-auto opacity-95"
          >
            <path d="M 35,120 Q 170,95 260,18 L 260,120 Z" fill="#0EA5E9" fillOpacity="0.65" />
            <path d="M 85,120 Q 190,102 260,36 L 260,120 Z" fill="#DC0914" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 lg:pt-36 pb-16 sm:pb-24 lg:pb-28">
          <div className="grid grid-cols-12 items-center">
            <Reveal
              immediate
              direction="left"
              wrapperClassName="col-span-12 lg:col-span-7"
              className="space-y-4 sm:space-y-5"
            >
              {/* Dark-Mode Pill Tag ("Our Portfolio") */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B235B]/85 border border-[#38BDF8]/35 text-xs font-semibold text-white">
                <span className="w-3.5 h-3.5 rounded-full bg-[#22D3EE]/25 border border-[#22D3EE] inline-flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" aria-hidden="true" />
                </span>
                <span>Our Portfolio</span>
              </div>

              <h1
                className="font-extrabold tracking-tight leading-[1.06] text-balance"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.85rem)' }}
              >
                <span className="text-white">Our </span>
                <span className="text-[#22D3EE]">Projects</span>
              </h1>

              <p className="max-w-lg text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed">
                A showcase of our innovative solutions, built to solve real problems and drive
                digital growth across Africa and beyond.
              </p>

              {/* Dark Frosted Glass 3-Stat Strip ("10+ Completed Projects · 1K+ Active Users · 3+ Countries Impacted") */}
              <div className="pt-1">
                <div className="inline-grid grid-cols-3 divide-x divide-white/15 rounded-2xl bg-[#091A4A]/78 border border-[#38BDF8]/25 backdrop-blur-md px-3 py-3 sm:px-5 sm:py-3.5 shadow-xl max-w-full">
                  {PORTFOLIO_STATS.map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={stat.label}
                        className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 first:pl-0.5 last:pr-0.5 min-w-0"
                      >
                        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-[#22D3EE]/12 border border-[#22D3EE]/30 text-[#22D3EE] flex items-center justify-center shrink-0">
                          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.85} aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-display font-extrabold text-sm sm:text-lg lg:text-xl text-white tabular-nums leading-none">
                            {stat.value}
                          </div>
                          <div className="mt-0.5 text-[9px] sm:text-[11px] font-medium text-slate-300 leading-tight truncate">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom Smooth White Curve Transition */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 z-10 overflow-hidden leading-none" aria-hidden="true">
          <svg
            viewBox="0 0 1440 84"
            preserveAspectRatio="none"
            className="w-full h-9 sm:h-16 lg:h-20 block"
          >
            <path d="M0,78 Q720,-16 1440,78 L1440,84 L0,84 Z" fill="#F8FAFF" />
          </svg>
        </div>
      </section>

      {/* FILTER BAR & 6-CARD SHOWCASE GRID */}
      <section className="pt-4 sm:pt-6 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-b from-[#F8FAFF] via-white to-white overflow-x-clip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7 sm:space-y-9">
          {/* Interactive Category Filter Row */}
          <Reveal direction="top" className="space-y-3">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {PRIMARY_PROJECT_FILTERS.map((filter) => {
                const active = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                      active
                        ? 'bg-gradient-to-r from-[#002BFF] to-[#0055FF] text-white shadow-sm shadow-[#002BFF]/25'
                        : 'bg-white border border-[#DCE8FF] text-[#07133B] hover:border-[#0044FF]/45 hover:bg-[#F2F6FF]'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setShowMoreFilters((prev) => !prev)}
                aria-expanded={showMoreFilters}
                className={`inline-flex items-center gap-1 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-150 cursor-pointer ${
                  showMoreFilters || isExtraFilterSelected
                    ? 'bg-[#EEF3FF] border-[#0044FF]/35 text-[#002BFF]'
                    : 'bg-white border-[#DCE8FF] text-[#07133B] hover:border-[#0044FF]/45 hover:bg-[#F2F6FF]'
                }`}
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    showMoreFilters ? 'rotate-180' : ''
                  }`}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </button>
            </div>

            {showMoreFilters && (
              <div className="flex flex-wrap items-center justify-center gap-2">
                {EXTRA_PROJECT_FILTERS.map((filter) => {
                  const active = activeFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                        active
                          ? 'bg-[#002BFF] text-white shadow-xs'
                          : 'bg-[#EEF3FF] border border-[#DCE8FF] text-[#07133B] hover:border-[#0044FF]/45'
                      }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            )}
          </Reveal>

          {/* 3x2 Showcase Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {visibleProjects.map((project, index) => (
              <Reveal
                key={project.id}
                direction="bottom"
                delay={0.04 + (index % 3) * 0.05}
                wrapperClassName="h-full"
                className="h-full"
              >
                <article className="group h-full flex flex-col rounded-2xl bg-white border border-[#DCE8FF] hover:border-[#0044FF]/45 shadow-[0_8px_24px_rgba(4,11,41,0.06)] hover:shadow-[0_18px_36px_rgba(0,68,255,0.12)] hover:-translate-y-1 transition-all duration-200 overflow-hidden">
                  {/* Top Project Thumbnail */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#040B29]">
                    <ResilientImage
                      src={project.image}
                      alt={project.imageAlt}
                      fallbackTitle={project.title}
                      width={project.imageWidth}
                      height={project.imageHeight}
                      darkSkeleton
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {project.featured && (
                      <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white text-[11px] font-bold shadow-md">
                        <Star className="w-3 h-3 fill-white" aria-hidden="true" />
                        <span>Featured</span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="flex-1 flex flex-col justify-between p-5 space-y-3">
                    <div className="space-y-1.5">
                      <h2 className="text-base sm:text-lg font-extrabold text-[#07133B] group-hover:text-[#002BFF] transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {project.summary}
                      </p>
                    </div>

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0038FF] hover:text-[#DC0914] transition-colors cursor-pointer"
                      >
                        <span>View Project</span>
                        <ArrowRight
                          className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Bottom Dark Navy "Have a Project in Mind?" Trophy CTA Banner */}
          <Reveal direction="bottom" delay={0.1}>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#040F34] via-[#061853] to-[#082275] text-white px-5 py-5 sm:px-8 sm:py-6 shadow-[0_18px_40px_rgba(4,11,41,0.2)] border border-[#1E3A8A]/45">
              {/* Subtle Ambient Blue Glow */}
              <div
                className="pointer-events-none absolute -left-10 -top-10 w-40 h-40 rounded-full bg-[#22D3EE]/12 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="shrink-0 flex items-center justify-center">
                    <ProjectGoldTrophyIcon />
                  </div>
                  <div className="space-y-0.5">
                    <h2 className="text-base sm:text-xl font-extrabold tracking-tight text-white">
                      Have a Project in Mind?
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-200">
                      Let’s turn your ideas into powerful digital solutions.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenContact('Software Development')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold text-[#07133B] bg-white hover:bg-[#E3EEFF] rounded-full shadow-md transition-all duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
