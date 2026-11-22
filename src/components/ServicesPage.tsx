import { useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  Clock,
  Play,
} from 'lucide-react';
import {
  ALL_SERVICES_CATALOG,
  CORE_SERVICES_GRID_SLUGS,
  SERVICES_SHOWCASE_MEDIA,
  STUDIO_TRACK_SLUGS,
  type ServiceDetail,
} from '../data/servicesCatalog';
import { Reveal } from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';
import { ServiceWireframeIcon } from './ServiceWireframeIcon';
import { ServiceGridIcon } from './ShowcaseIcons';

interface ServicesPageProps {
  onSelectService: (slug: string) => void;
  onOpenContact: (defaultCategory?: string) => void;
  onOpenStory: () => void;
}

const CORE_CARD_COPY_OVERRIDES: Record<
  string,
  {
    title: string;
    description: string;
    iconType: 'pill' | 'plain';
  }
> = {
  'custom-software': {
    title: 'Web Development',
    description:
      'Modern, scalable and high-performance websites and web applications.',
    iconType: 'pill',
  },
  'mobile-app-development': {
    title: 'Mobile App Development',
    description:
      'Powerful and user-friendly mobile apps for Android & iOS.',
    iconType: 'pill',
  },
  'networking-solutions': {
    title: 'Cloud Solutions & Deployment',
    description:
      'Secure, scalable and reliable cloud & network infrastructure.',
    iconType: 'plain',
  },
  cybersecurity: {
    title: 'Cybersecurity',
    description:
      'Protect your data and business with advanced security solutions.',
    iconType: 'pill',
  },
  'ai-development': {
    title: 'AI & Machine Learning',
    description:
      'Intelligent solutions to automate and optimize your business.',
    iconType: 'plain',
  },
  'product-scope': {
    title: 'Software Consulting',
    description:
      '15-day Product Scope & expert guidance to turn your ideas into reality.',
    iconType: 'plain',
  },
  'mvp-builder': {
    title: 'Digital Transformation',
    description:
      'MVP Builder & workflow modernization to work smarter with technology.',
    iconType: 'plain',
  },
  'tracking-support': {
    title: 'IT Support & Maintenance',
    description:
      'Reliable 24/7 support and equipment tracking to keep systems running smoothly.',
    iconType: 'plain',
  },
};

export function ServicesPage({
  onSelectService,
  onOpenContact,
  onOpenStory,
}: ServicesPageProps) {
  const [showStudioTracks, setShowStudioTracks] = useState(false);

  const primaryEightServices = CORE_SERVICES_GRID_SLUGS.flatMap((slug) => {
    const found = ALL_SERVICES_CATALOG.find((s) => s.slug === slug);
    return found ? [found] : [];
  });
  const studioServices: ServiceDetail[] = STUDIO_TRACK_SLUGS.flatMap((slug) => {
    const found = ALL_SERVICES_CATALOG.find((s) => s.slug === slug);
    return found ? [found] : [];
  });

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
        {/* Background Glowing Cloud & Digital Hand Artwork */}
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
          {/* Scrim ensuring crisp >= 4.5:1 white text contrast on left side while keeping the cloud artwork vivid on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#020B2B]/90 via-[#031245]/55 to-transparent sm:w-[70%]" />
          {/* Subtle Crimson Corner Diagonal Flare */}
          <div
            className="hidden sm:block absolute bottom-10 right-0 w-24 h-28 bg-gradient-to-tl from-[#DC0914] to-transparent opacity-80"
            style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
          />
        </div>

        {/* Hero Foreground Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 lg:pt-36 pb-20 sm:pb-28 lg:pb-32">
          <div className="grid grid-cols-12 items-center">
            <Reveal
              immediate
              direction="left"
              wrapperClassName="col-span-12 sm:col-span-8 lg:col-span-7"
              className="space-y-4 sm:space-y-5"
            >
              {/* Crisp Dark-Mode Badge ("Our Services") */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B235B]/85 border border-[#38BDF8]/35 text-xs font-semibold text-white">
                <span className="w-3.5 h-3.5 rounded-full bg-[#22D3EE]/25 border border-[#22D3EE] inline-flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" aria-hidden="true" />
                </span>
                <span>Our Services</span>
              </div>

              <h1
                className="font-extrabold tracking-tight leading-[1.06] text-balance"
                style={{ fontSize: 'clamp(1.75rem, 4.3vw, 3.6rem)' }}
              >
                <span className="text-white block">Innovative Solutions</span>
                <span className="text-white block">
                  for a{' '}
                  <span className="text-[#22D3EE]">Digital World</span>
                </span>
              </h1>

              <p className="max-w-lg text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed">
                From idea to impact, SAMITECH Corporation delivers cutting-edge technology
                services to help you build, grow and scale in the digital era.
              </p>

              {/* Rounded-Full Action Pair */}
              <div className="pt-1 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={scrollToCoreGrid}
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#002BFF] to-[#0055FF] hover:from-[#001ACC] hover:to-[#003CE6] shadow-lg shadow-[#002BFF]/35 transition-all duration-150 active:scale-[0.98] whitespace-nowrap cursor-pointer"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onOpenStory}
                  className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-white rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/25 backdrop-blur-sm transition-all duration-150 whitespace-nowrap cursor-pointer"
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

        {/* Bottom Upward Curved Arch Into White "What We Offer" Section */}
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

      {/* SECTION 2: "WHAT WE OFFER — OUR CORE SERVICES" (4x2 CARD GRID) */}
      <section id="core-services-grid" className="relative pt-4 sm:pt-6 pb-12 sm:pb-16 lg:pb-20 bg-white overflow-x-clip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered Header With Flanking Hairline Lines */}
          <Reveal direction="top" className="max-w-2xl mx-auto text-center space-y-2 mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center gap-3 w-full">
              <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#0044FF]/50" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-bold text-[#0038FF] tracking-tight">
                What We Offer
              </span>
              <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#0044FF]/50" aria-hidden="true" />
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#07133B] text-balance">
              Our Core{' '}
              <span className="text-[#DC0914]">Services</span>
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-slate-600">
              Comprehensive technology solutions designed to meet your needs.
            </p>
          </Reveal>

          {/* 4x2 Core Services Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
            {primaryEightServices.map((service, index) => {
              const cardInfo = CORE_CARD_COPY_OVERRIDES[service.slug];
              return (
                <Reveal
                  key={service.slug}
                  direction="bottom"
                  delay={0.04 + (index % 4) * 0.05}
                  wrapperClassName="h-full"
                  className="h-full"
                >
                  <button
                    type="button"
                    onClick={() => onSelectService(service.slug)}
                    className="group w-full h-full flex flex-col items-center justify-between text-center rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#F4F8FF]/90 to-[#FFFFFF] border border-[#DCE8FF] hover:border-[#0044FF]/45 p-4 sm:p-6 shadow-[0_8px_24px_rgba(4,11,41,0.05)] hover:shadow-[0_16px_32px_rgba(0,68,255,0.12)] hover:-translate-y-1 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#002BFF]"
                  >
                    <div className="flex flex-col items-center space-y-2.5 sm:space-y-3">
                      <div className="h-10 flex items-center justify-center">
                        <ServiceGridIcon slug={service.slug} />
                      </div>
                      <h3 className="text-xs sm:text-base lg:text-[17px] font-bold text-[#07133B] group-hover:text-[#002BFF] transition-colors leading-snug">
                        {cardInfo ? cardInfo.title : service.title}
                      </h3>
                      <p className="text-[10.5px] sm:text-xs lg:text-[13px] text-slate-600 leading-snug sm:leading-relaxed">
                        {cardInfo ? cardInfo.description : service.shortDesc}
                      </p>
                    </div>

                    <div className="pt-3 sm:pt-4 inline-flex items-center gap-1 text-[11px] sm:text-xs lg:text-sm font-bold text-[#002BFF] group-hover:text-[#DC0914] transition-colors">
                      <span>Learn More</span>
                      <ArrowRight
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>

          {/* Expandable Dedicated Product Studio Tracks (Altar Methodologies: Product Scope, MVP Builder, UX/UI, Dedicated Teams) */}
          <div className="mt-8 sm:mt-10 pt-6 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#07133B]">
                  Dedicated Product Studio &amp; Engineering Teams
                </h3>
                <p className="text-xs text-slate-600">
                  Deep specialization tracks covering 15-Day Product Scope, Lean MVP Builder, UX/UI Design, and Embedded Pods.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowStudioTracks((prev) => !prev)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#002BFF] hover:text-[#DC0914] transition-colors cursor-pointer self-start sm:self-auto"
              >
                <span>{showStudioTracks ? 'Hide Specialized Tracks' : 'View Product Studio Tracks (4)'}</span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform duration-200 ${showStudioTracks ? 'rotate-90' : ''}`}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </button>
            </div>

            {showStudioTracks && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                {studioServices.map((track) => (
                  <button
                    key={track.slug}
                    type="button"
                    onClick={() => onSelectService(track.slug)}
                    className="group text-left rounded-xl bg-[#F8FAFF] border border-[#DCE8FF] hover:border-[#0044FF]/45 p-4 space-y-2.5 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <ServiceWireframeIcon slug={track.slug} className="w-7 h-7" />
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500">
                        <Clock className="w-3 h-3 text-[#002BFF]" aria-hidden="true" />
                        <span>{track.timelineLabel}</span>
                      </span>
                    </div>
                    <div className="text-sm font-bold text-[#07133B] group-hover:text-[#002BFF] transition-colors">
                      {track.title}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {track.shortDesc}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: DARK NAVY "LET'S BUILD SOMETHING GREAT TOGETHER" CTA BANNER */}
      <section className="pb-12 sm:pb-16 lg:pb-20 bg-white overflow-x-clip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="bottom">
            <div className="relative overflow-hidden rounded-2xl bg-[#051033] text-white shadow-[0_20px_45px_rgba(4,11,41,0.22)] border border-[#1E3A8A]/40">
              <div className="grid grid-cols-12 items-center">
                {/* Angled SAMITECH Glass HQ Image on Left */}
                <div
                  className="hidden sm:block sm:col-span-4 lg:col-span-3 relative h-full min-h-[140px] lg:min-h-[155px]"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 82% 100%, 0 100%)' }}
                >
                  <ResilientImage
                    src={SERVICES_SHOWCASE_MEDIA.ctaHq.image}
                    alt={SERVICES_SHOWCASE_MEDIA.ctaHq.alt}
                    fallbackTitle="SAMITECH Corporation HQ"
                    width={SERVICES_SHOWCASE_MEDIA.ctaHq.width}
                    height={SERVICES_SHOWCASE_MEDIA.ctaHq.height}
                    darkSkeleton
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#051033]/75" />
                </div>

                {/* Middle Copy Column */}
                <div className="col-span-8 sm:col-span-5 lg:col-span-6 p-5 sm:py-6 sm:px-4 lg:px-6 space-y-1.5">
                  <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold text-[#60A5FA]">
                    <span className="w-2 h-2 rounded-full bg-[#38BDF8]" aria-hidden="true" />
                    <span>Ready to get started?</span>
                  </div>
                  <h2 className="text-base sm:text-xl lg:text-2xl font-extrabold tracking-tight text-white leading-tight">
                    Let’s Build Something Great Together
                  </h2>
                  <p className="text-[11px] sm:text-xs lg:text-sm text-slate-300 leading-snug">
                    Partner with SAMITECH Corporation for innovative and reliable tech solutions.
                  </p>
                </div>

                {/* Right White Pill CTA */}
                <div className="col-span-4 sm:col-span-3 flex items-center justify-end p-4 sm:pr-7 lg:pr-10">
                  <button
                    type="button"
                    onClick={() => onOpenContact('Software Development')}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold text-[#07133B] bg-white hover:bg-[#E3EEFF] rounded-full shadow-md transition-all duration-150 active:scale-[0.98] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span>Contact Us</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
