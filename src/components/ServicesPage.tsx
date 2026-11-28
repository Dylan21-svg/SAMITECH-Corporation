import { useState } from 'react';
import {
  ArrowRight,
  Check,
  Play,
} from 'lucide-react';
import {
  SERVICE_GROUPS,
  SERVICES_SHOWCASE_MEDIA,
  type ServiceGroup,
} from '../data/servicesCatalog';
import { useSiteContent } from '../context/SiteContentContext';
import { Reveal } from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';
import { ServiceGridIcon } from './ShowcaseIcons';

interface ServicesPageProps {
  onSelectService: (slug: string) => void;
  onOpenContact: (defaultCategory?: string) => void;
  onOpenStory: () => void;
}

export function ServicesPage({
  onSelectService,
  onOpenContact,
  onOpenStory,
}: ServicesPageProps) {
  const { services } = useSiteContent();
  const [activeGroup, setActiveGroup] = useState<'all' | ServiceGroup>('all');

  const filteredServices =
    activeGroup === 'all'
      ? services
      : services.filter((service) => service.group === activeGroup);

  const scrollToCoreGrid = () => {
    const el = document.getElementById('core-services-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white text-[#07133B]">
      {/* DARK ROYAL-BLUE HOLOGRAPHIC HERO WITH CURVED ARCHED WHITE BOTTOM TRANSITION */}
      <section className="relative overflow-hidden bg-[#020B2B] text-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <ResilientImage
            src={SERVICES_SHOWCASE_MEDIA.heroCloud.image}
            alt={SERVICES_SHOWCASE_MEDIA.heroCloud.alt}
            fallbackTitle="SAMITECH Digital Solutions"
            width={SERVICES_SHOWCASE_MEDIA.heroCloud.width}
            height={SERVICES_SHOWCASE_MEDIA.heroCloud.height}
            priority
            darkSkeleton
            className="w-full h-full object-cover object-[76%_center] sm:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020B2B]/92 via-[#031245]/60 to-transparent sm:w-[70%]" />
          <div
            className="hidden sm:block absolute bottom-10 right-0 w-24 h-28 bg-gradient-to-tl from-[#DC0914] to-transparent opacity-80"
            style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 lg:pt-36 pb-14 sm:pb-28 lg:pb-32">
          <div className="grid grid-cols-12 items-center">
            <Reveal
              immediate
              direction="left"
              wrapperClassName="col-span-12 sm:col-span-8 lg:col-span-7"
              className="space-y-3.5 sm:space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#09215E]/85 border border-[#38BDF8]/30 text-xs font-semibold text-white">
                <span className="w-2 h-2 rounded-full bg-[#0070FF]" aria-hidden="true" />
                <span>Our Services</span>
              </div>

              <h1
                className="font-extrabold tracking-tight leading-[1.06] text-balance"
                style={{ fontSize: 'clamp(1.6rem, 4.3vw, 3.6rem)' }}
              >
                <span className="text-white block">Innovative Solutions</span>
                <span className="text-white block">
                  for a{' '}
                  <span className="text-[#22D3EE]">Digital World</span>
                </span>
              </h1>

              <p className="max-w-lg text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed">
                From UI/UX, web and mobile app development, and graphics design to Starlink
                deployments, Wi-Fi zones, computer lab setups, CCTV security, dedicated teams, and
                equipment tracking.
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={scrollToCoreGrid}
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#002BFF] to-[#0055FF] hover:from-[#001ACC] hover:to-[#003CE6] shadow-lg shadow-[#002BFF]/35 transition-all duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onOpenStory}
                  className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-white rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/25 backdrop-blur-sm transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center">
                    <Play className="w-2.5 h-2.5 fill-current ml-0.5" aria-hidden="true" />
                  </span>
                  <span>Watch Overview</span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom Upward Curved Arch Into White Section */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 z-10 overflow-hidden leading-none" aria-hidden="true">
          <svg
            viewBox="0 0 1440 110"
            preserveAspectRatio="none"
            className="w-full h-12 sm:h-20 lg:h-24 block"
          >
            <path
              d="M0,108 Q720,-24 1440,108 L1440,110 L0,110 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </section>

      {/* SECTION 2: 6 MAIN SERVICES */}
      <section id="core-services-grid" className="relative pt-4 sm:pt-6 pb-12 sm:pb-16 lg:pb-20 bg-white overflow-x-clip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="top" className="max-w-2xl mx-auto text-center space-y-2.5 mb-8 sm:mb-10">
            <div className="inline-flex items-center justify-center gap-3 w-full">
              <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#0044FF]/50" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-bold text-[#0038FF] tracking-tight">
                What We Offer
              </span>
              <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#0044FF]/50" aria-hidden="true" />
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#07133B] text-balance">
              Our Main{' '}
              <span className="text-[#DC0914]">Services</span>
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-slate-600">
              Six specialized technology divisions built to design, connect, maintain, and protect your operations.
            </p>
          </Reveal>

          {/* Interactive Category Filter Controls */}
          <div className="flex items-center justify-center mb-8 sm:mb-10 overflow-x-auto pb-1">
            <div
              role="tablist"
              aria-label="Filter services by division"
              className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#F2F6FF] border border-[#DCE8FF]"
            >
              {SERVICE_GROUPS.map((group) => {
                const isSelected = activeGroup === group.id;
                return (
                  <button
                    key={group.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveGroup(group.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-white text-[#07133B] shadow-xs border border-[#DCE8FF]'
                        : 'text-slate-600 hover:text-[#002BFF]'
                    }`}
                  >
                    {group.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6-Card Main Services Grid (2-col Compact on Mobile, 3x2 on Desktop) */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5 lg:gap-6">
            {filteredServices.map((service, index) => (
              <Reveal
                key={service.slug}
                direction="bottom"
                delay={0.04 + (index % 3) * 0.05}
                wrapperClassName="h-full"
                className="h-full"
              >
                <article className="group h-full flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[#F4F8FF]/95 to-[#FFFFFF] border border-[#DCE8FF] hover:border-[#0044FF]/45 p-3 sm:p-6 lg:p-7 shadow-[0_8px_24px_rgba(4,11,41,0.04)] hover:shadow-[0_18px_36px_rgba(0,68,255,0.12)] hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.99] motion-reduce:hover:scale-100 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 transition-all duration-200 ease-out">
                  <div className="space-y-2 sm:space-y-4">
                    {/* Number & Icon Row */}
                    <div className="flex items-center justify-between gap-2 sm:gap-4">
                      <div className="h-9 sm:h-11 flex items-center origin-left scale-[0.82] sm:scale-100">
                        <ServiceGridIcon slug={service.slug} />
                      </div>
                      <span className="font-mono text-[10px] sm:text-xs font-bold text-slate-400 tabular-nums">
                        {service.number}
                      </span>
                    </div>

                    {/* Title & Summary */}
                    <div className="space-y-1 sm:space-y-2">
                      <div className="hidden sm:block text-xs font-medium text-[#002BFF]">
                        {service.groupLabel}
                      </div>
                      <h3 className="text-xs sm:text-xl font-extrabold text-[#07133B] group-hover:text-[#002BFF] transition-colors leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-[11px] sm:text-sm text-slate-600 leading-snug sm:leading-relaxed line-clamp-3 sm:line-clamp-none">
                        {service.shortDesc}
                      </p>
                    </div>

                    {/* Hairline-Separated Specific Offerings (Desktop & Tablet Detail View) */}
                    <div className="hidden sm:block pt-4 border-t border-slate-200/75 space-y-2">
                      <div className="text-xs font-semibold text-slate-500">
                        Key Capabilities
                      </div>
                      <ul className="space-y-1.5">
                        {service.offerings.slice(0, 4).map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-xs sm:text-[13px] font-medium text-[#07133B] leading-snug"
                          >
                            <Check
                              className="w-3.5 h-3.5 text-[#002BFF] shrink-0 mt-0.5"
                              strokeWidth={2.25}
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      {service.offerings.length > 4 && (
                        <button
                          type="button"
                          onClick={() => onSelectService(service.slug)}
                          className="pt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-[#002BFF] hover:text-[#DC0914] transition-colors cursor-pointer"
                        >
                          <span>+{service.offerings.length - 4} more in Explore Service</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Card Action Bar */}
                  <div className="pt-2.5 mt-2.5 sm:pt-6 sm:mt-6 border-t border-slate-200/75 flex items-center justify-between gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectService(service.slug)}
                      className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-sm font-bold text-[#002BFF] hover:text-[#DC0914] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#002BFF] rounded-sm"
                    >
                      <span className="sm:hidden">Learn More</span>
                      <span className="hidden sm:inline">Explore Service</span>
                      <ArrowRight
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenContact(service.contactCategory)}
                      className="hidden sm:inline-flex px-3.5 py-2 rounded-lg bg-[#EEF3FF] hover:bg-[#002BFF] text-[#07133B] hover:text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#002BFF]"
                    >
                      Request Quote
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: DARK NAVY "LET'S BUILD SOMETHING GREAT TOGETHER" CTA BANNER */}
      <section className="pb-12 sm:pb-16 lg:pb-20 bg-white overflow-x-clip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="bottom">
            <div className="relative overflow-hidden rounded-2xl bg-[#051033] text-white shadow-[0_20px_45px_rgba(4,11,41,0.22)] border border-[#1E3A8A]/40">
              <div className="grid grid-cols-12 items-stretch">
                <div
                  className="col-span-4 sm:col-span-4 lg:col-span-3 relative min-h-[120px] sm:min-h-[140px] lg:min-h-[155px]"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 82% 100%, 0 100%)' }}
                >
                  <ResilientImage
                    src={SERVICES_SHOWCASE_MEDIA.ctaHq.image}
                    alt={SERVICES_SHOWCASE_MEDIA.ctaHq.alt}
                    fallbackTitle="SAMITECH Corporation HQ"
                    width={SERVICES_SHOWCASE_MEDIA.ctaHq.width}
                    height={SERVICES_SHOWCASE_MEDIA.ctaHq.height}
                    darkSkeleton
                    wrapperClassName="absolute inset-0 w-full h-full"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#051033]/75" />
                </div>

                <div className="col-span-8 sm:col-span-8 lg:col-span-9 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:py-6 sm:px-5 lg:px-8">
                  <div className="space-y-1 sm:space-y-1.5 min-w-0">
                    <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-[#60A5FA]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" aria-hidden="true" />
                      <span>Ready to get started?</span>
                    </div>
                    <h2 className="text-sm sm:text-xl lg:text-2xl font-extrabold tracking-tight text-white leading-tight">
                      Let’s Build Something Great Together
                    </h2>
                    <p className="text-[11px] sm:text-xs lg:text-sm text-slate-300 leading-snug">
                      Partner with SAMITECH Corporation for innovative and reliable tech solutions.
                    </p>
                  </div>

                  <div className="shrink-0 self-start sm:self-center">
                    <button
                      type="button"
                      onClick={() => onOpenContact('Software Services')}
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold text-[#07133B] bg-white hover:bg-[#E3EEFF] rounded-full shadow-md transition-all duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <span>Contact Us</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
