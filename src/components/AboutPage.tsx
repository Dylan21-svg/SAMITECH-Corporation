import {
  ArrowRight,
  Play,
} from 'lucide-react';
import { Reveal } from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';
import {
  AboutDarkKpiIcon,
  AboutHighlightIcon,
  DarkPillarIcon,
  MissionBadgeIcon,
  VisionBadgeIcon,
} from './ShowcaseIcons';
import {
  ABOUT_HERO_MEDIA,
  ABOUT_MEDIA,
  ABOUT_PAGE_MILESTONES,
  ABOUT_PAGE_VALUES,
} from '../data/samitechData';
import { TEAM_MEMBERS } from '../data/teamData';

interface AboutPageProps {
  onNavigateServices: () => void;
  onNavigateProjects: () => void;
  onNavigateTeam: () => void;
  onSelectTeamMember: (slug: string) => void;
  onOpenContact: (defaultCategory?: string) => void;
}

const ABOUT_HERO_HIGHLIGHTS = [
  {
    id: 'innovative-solutions',
    line1: 'Innovative',
    line2: 'Solutions',
  },
  {
    id: 'trusted-partnership',
    line1: 'Trusted',
    line2: 'Partnership',
  },
  {
    id: 'youth-led-innovation',
    line1: 'Youth-Led',
    line2: 'Innovation',
  },
  {
    id: 'smarter-africa',
    line1: 'A Smarter',
    line2: 'Africa',
  },
];

const ABOUT_KPI_STRIP = [
  {
    id: 'founded',
    topLabel: 'Founded',
    bottomLabel: '2022',
    emphasizeBottom: true,
  },
  {
    id: 'empowered',
    topLabel: '10K+',
    bottomLabel: 'People Empowered',
    emphasizeBottom: false,
  },
  {
    id: 'global-vision',
    topLabel: 'Global Vision',
    bottomLabel: 'Africa & Beyond',
    emphasizeBottom: false,
  },
  {
    id: 'excellence',
    topLabel: 'Excellence',
    bottomLabel: 'in Everything We Do',
    emphasizeBottom: false,
  },
];

export function AboutPage({
  onNavigateServices,
  onNavigateProjects,
  onNavigateTeam,
  onSelectTeamMember,
  onOpenContact,
}: AboutPageProps) {
  const scrollToStoryDetails = () => {
    const el = document.getElementById('about-story-details');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderHighlightIcon = (id: string) => <AboutHighlightIcon id={id} />;

  const renderKpiIcon = (id: string) => <AboutDarkKpiIcon id={id} />;

  const renderValueIcon = (id: string) => {
    if (id === 'youth-driven-engineering') {
      return <DarkPillarIcon variant="tech" />;
    }
    if (id === 'security-reliability') {
      return <DarkPillarIcon variant="architecture" />;
    }
    return <DarkPillarIcon variant="shield" />;
  };

  return (
    <div className="bg-white text-[#07133B]">
      {/* HERO BANNER — Identical Desktop Split Scaled Across All Devices */}
      <section className="relative overflow-hidden bg-white border-b border-[#0044FF]/10">
        {/* Full-Bleed Hero Background Image */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <ResilientImage
            src={ABOUT_HERO_MEDIA.image}
            alt={ABOUT_HERO_MEDIA.alt}
            fallbackTitle="SAMITECH Corporation About Hero"
            width={ABOUT_HERO_MEDIA.width}
            height={ABOUT_HERO_MEDIA.height}
            priority
            className="w-full h-full object-cover object-[76%_top] sm:object-[right_top] lg:object-center"
          />
          {/* Crisp white contrast backdrop behind left column */}
          <div className="absolute inset-y-0 left-0 w-[62%] sm:w-[56%] bg-gradient-to-r from-white via-white/95 to-transparent" />
        </div>

        {/* Foreground Hero Content + Floating Dark Stats Bar */}
        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-28 pb-4 sm:pb-8 lg:pb-10">
          <div className="grid grid-cols-12 items-center gap-1.5 sm:gap-4 lg:gap-6">
            {/* Left Narrative & Highlight Cards Column */}
            <Reveal
              direction="left"
              wrapperClassName="col-span-6"
              className="space-y-1.5 sm:space-y-3.5 lg:space-y-4"
            >
              {/* Clean Eyebrow Kicker with Accent Hairline */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[7.5px] sm:text-xs font-semibold text-[#002BFF] tracking-tight">
                <span className="w-3 sm:w-5 h-[2px] bg-[#0044FF] rounded-full" aria-hidden="true" />
                <span>About SAMITECH Corporation</span>
              </div>

              {/* Bold Headline + Italic Tagline */}
              <div className="space-y-0.5 sm:space-y-1.5">
                <h1
                  className="font-extrabold tracking-tight leading-[1.04] text-balance"
                  style={{ fontSize: 'clamp(0.95rem, 3.85vw, 3.45rem)' }}
                >
                  <span className="text-[#07133B] block">About</span>
                  <span className="block whitespace-nowrap">
                    <span className="text-[#0038FF]">SAMITECH</span>{' '}
                    <span className="text-[#07133B]">Corporation</span>
                  </span>
                </h1>
                <p className="text-[7.5px] sm:text-sm md:text-base lg:text-xl font-bold italic text-[#0038FF] tracking-tight">
                  Where Technology Meets Excellence
                </p>
                {/* Crisp Dual-Color Blue + Crimson Hairline Accent */}
                <div
                  className="pt-0.5 sm:pt-1 flex items-center w-16 sm:w-32 lg:w-40"
                  aria-hidden="true"
                >
                  <span className="w-1/2 h-[2px] sm:h-[3px] bg-[#0044FF] rounded-l-full" />
                  <span className="w-1/2 h-[2px] sm:h-[3px] bg-[#DC0914] rounded-r-full" />
                </div>
              </div>

              {/* Corporate Narrative Paragraphs */}
              <div className="space-y-1 sm:space-y-2.5 lg:space-y-3 max-w-xl">
                <p className="text-[7.5px] sm:text-[13px] lg:text-[15.5px] font-medium text-slate-800 leading-snug sm:leading-relaxed">
                  SAMITECH Corporation is a youth-driven technology company based in Buea, Cameroon,
                  committed to building innovative digital solutions, empowering individuals and
                  businesses through technology, and shaping a smarter, more connected Africa.
                </p>
                <p className="text-[7.5px] sm:text-[13px] lg:text-[15.5px] font-medium text-slate-800 leading-snug sm:leading-relaxed">
                  Since our founding in 2022, we have been at the forefront of hardware, web &amp;
                  mobile development, cybersecurity, AI systems, and digital skills, with a vision to
                  bridge the digital divide in Africa.
                </p>
              </div>

              {/* 4 Highlight Mini-Cards Row */}
              <div className="grid grid-cols-4 gap-1 sm:gap-2.5 lg:gap-3 pt-0.5 sm:pt-1">
                {ABOUT_HERO_HIGHLIGHTS.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/95 backdrop-blur-sm border border-[#B3CCFF] rounded-md sm:rounded-xl px-0.5 py-1.5 sm:px-2 sm:py-2.5 lg:px-2.5 lg:py-3 text-center shadow-[0_6px_18px_rgba(0,68,255,0.08)] flex flex-col items-center justify-center gap-0.5 sm:gap-1.5 min-w-0 transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    {renderHighlightIcon(item.id)}
                    <div className="text-[6px] sm:text-[10.5px] lg:text-xs font-bold text-[#07133B] leading-tight">
                      <span className="block">{item.line1}</span>
                      <span className="block">{item.line2}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rounded-Full Action Row */}
              <div className="pt-0.5 sm:pt-1.5 flex flex-wrap items-center gap-1.5 sm:gap-3.5">
                <button
                  type="button"
                  onClick={onNavigateServices}
                  className="inline-flex items-center gap-1 sm:gap-2 px-2.5 py-1 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 text-[7px] sm:text-xs lg:text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#002BFF] to-[#0055FF] hover:from-[#001ACC] hover:to-[#003CE6] shadow-md shadow-[#002BFF]/25 transition-all duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FF]"
                >
                  <span>Our Services</span>
                  <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" strokeWidth={1.75} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onNavigateTeam}
                  className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3 text-[7px] sm:text-xs lg:text-sm font-semibold text-[#07133B] bg-white border border-slate-300 hover:border-[#0044FF]/50 hover:bg-[#F2F6FF] rounded-full shadow-xs transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FF]"
                >
                  <span>Meet the Team</span>
                </button>

                <button
                  type="button"
                  onClick={scrollToStoryDetails}
                  className="inline-flex items-center gap-1 sm:gap-2 text-[7px] sm:text-xs lg:text-sm font-semibold text-[#07133B] hover:text-[#0044FF] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FF] rounded-full pr-0.5 sm:pr-1"
                >
                  <span className="w-4 h-4 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full bg-white border border-[#99BDFF] shadow-sm flex items-center justify-center text-[#0038FF] shrink-0">
                    <Play className="w-2 h-2 sm:w-3.5 sm:h-3.5 fill-current ml-0.5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span>Learn More</span>
                </button>
              </div>
            </Reveal>

            {/* Right Column Spacer */}
            <div className="col-span-6 h-32 sm:h-72 lg:h-[420px]" aria-hidden="true" />
          </div>

          {/* Floating Dark Navy KPI Strip at Bottom of Hero with Crisp Hairline Separators */}
          <Reveal
            direction="bottom"
            delay={0.1}
            className="mt-3 sm:mt-8 lg:mt-10"
          >
            <div className="bg-[#061233] text-white rounded-lg sm:rounded-2xl border border-white/15 shadow-[0_18px_40px_rgba(4,11,41,0.28)] px-1.5 py-2.5 sm:px-6 sm:py-4 lg:px-8 lg:py-5">
              <div className="grid grid-cols-4 items-center divide-x divide-[#3B82F6]/35">
                {ABOUT_KPI_STRIP.map((stat) => (
                  <div
                    key={stat.id}
                    className="flex items-center justify-center gap-1 sm:gap-3 lg:gap-4 px-1 sm:px-3 lg:px-5 min-w-0"
                  >
                    {renderKpiIcon(stat.id)}
                    <div className="min-w-0 leading-tight">
                      <div
                        className={
                          stat.emphasizeBottom
                            ? 'text-[6.5px] sm:text-xs text-slate-300 font-medium'
                            : 'text-[8px] sm:text-sm lg:text-lg font-extrabold text-white tabular-nums truncate'
                        }
                      >
                        {stat.topLabel}
                      </div>
                      <div
                        className={
                          stat.emphasizeBottom
                            ? 'text-[8.5px] sm:text-base lg:text-xl font-extrabold text-white tabular-nums mt-0.5'
                            : 'text-[6.5px] sm:text-xs text-slate-300 font-medium mt-0.5 truncate'
                        }
                      >
                        {stat.bottomLabel}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 2: DEEP MISSION, VISION & ARCHITECTURAL BUEA HQ */}
      <section
        id="about-story-details"
        className="py-10 sm:py-16 lg:py-24 bg-[#F2F6FF] border-b border-[#0044FF]/10 overflow-x-clip"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-2.5 sm:gap-6 lg:gap-12 items-center">
            <Reveal
              direction="left"
              delay={0}
              wrapperClassName="col-span-4"
              className="space-y-2 sm:space-y-4 lg:space-y-5"
            >
              <h2 className="text-sm sm:text-2xl lg:text-4xl font-bold tracking-tight text-[#07133B] text-balance">
                Engineering Impact from{' '}
                <span className="text-[#002BFF]">Buea</span>
              </h2>
              <p className="text-[8.5px] sm:text-xs lg:text-base text-slate-700 leading-snug sm:leading-relaxed">
                Operating from Buea’s Silicon Mountain ecosystem, our remote-first engineers build
                resilient digital platforms for enterprises across Douala, Yaoundé, and international
                partners.
              </p>
              <p className="text-[8.5px] sm:text-xs lg:text-base text-slate-700 leading-snug sm:leading-relaxed">
                Every software suite, enterprise network topology, and security audit is crafted
                to eliminate downtime, protect critical operations, and cultivate Africa’s next
                wave of technology leaders.
              </p>
              <div className="pt-0.5 sm:pt-1 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                <button
                  type="button"
                  onClick={onNavigateTeam}
                  className="inline-flex items-center gap-1 sm:gap-2 text-[8.5px] sm:text-xs lg:text-sm font-semibold text-[#002BFF] hover:text-[#DC0914] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0000FF] rounded-sm"
                >
                  <span>Meet Our Leadership Team</span>
                  <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" strokeWidth={1.75} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenContact()}
                  className="inline-flex items-center gap-1 text-[8.5px] sm:text-xs lg:text-sm font-medium text-slate-600 hover:text-[#07133B] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0000FF] rounded-sm"
                >
                  <span>Contact Us</span>
                </button>
              </div>
            </Reveal>

            <Reveal
              direction="bottom"
              delay={0.08}
              wrapperClassName="col-span-4 w-full"
              className="floating-frame-hero w-full"
            >
              <div className="aspect-[3/4] rounded-lg sm:rounded-2xl overflow-hidden bg-white border border-[#0044FF]/15">
                <ResilientImage
                  src={ABOUT_MEDIA.image}
                  alt={ABOUT_MEDIA.alt}
                  fallbackTitle="SAMITECH Corporation Engineering Atrium"
                  width={ABOUT_MEDIA.width}
                  height={ABOUT_MEDIA.height}
                  className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </Reveal>

            <div className="col-span-4 space-y-2.5 sm:space-y-5 lg:space-y-8">
              <Reveal direction="right" delay={0.14} className="space-y-1.5 sm:space-y-2.5 lg:space-y-3">
                <div className="inline-flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white border border-[#DCE8FF] shadow-xs">
                  <MissionBadgeIcon />
                </div>
                <h3 className="text-xs sm:text-base lg:text-xl font-bold tracking-tight text-[#07133B]">
                  Our Mission
                </h3>
                <p className="text-[9px] sm:text-xs lg:text-base text-slate-700 leading-snug sm:leading-relaxed">
                  To equip organizations and ambitious individuals with reliable custom software,
                  hardened networking, AI systems, and practical digital skills that accelerate
                  growth across Africa.
                </p>
              </Reveal>

              <Reveal
                direction="right"
                delay={0.22}
                className="pt-2.5 sm:pt-5 lg:pt-8 border-t border-[#0044FF]/15 space-y-1.5 sm:space-y-2.5 lg:space-y-3"
              >
                <div className="inline-flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white border border-[#FBCFE8]/70 shadow-xs">
                  <VisionBadgeIcon />
                </div>
                <h3 className="text-xs sm:text-base lg:text-xl font-bold tracking-tight text-[#07133B]">
                  Our Vision
                </h3>
                <p className="text-[8px] sm:text-xs lg:text-base text-slate-700 leading-snug sm:leading-relaxed">
                  To bridge Africa’s digital divide as a globally trusted technology partner known
                  for engineering rigor, youth empowerment, and mission-critical excellence.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: DARK CHAMFERED CORE VALUES CARD */}
      <section className="py-10 sm:py-16 lg:py-24 bg-[#F8FAFF] overflow-x-clip">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <Reveal direction="none" delay={0}>
            <div id="about-values-card" className="relative">
              <svg
                viewBox="0 0 1200 500"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full drop-shadow-[0_22px_45px_rgba(4,11,41,0.22)] pointer-events-none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="aboutValuesDarkBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#070B19" />
                    <stop offset="55%" stopColor="#0B1126" />
                    <stop offset="100%" stopColor="#060D28" />
                  </linearGradient>
                  <linearGradient id="aboutValuesStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0044FF" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#DC0914" stopOpacity="0.45" />
                  </linearGradient>
                </defs>
                <path
                  d="M 4,88 Q 4,64 28,64 L 265,64 Q 285,64 298,48 L 326,18 Q 339,4 358,4 L 842,4 Q 861,4 874,18 L 902,48 Q 915,64 935,64 L 1172,64 Q 1196,64 1196,88 L 1196,472 Q 1196,496 1172,496 L 476,496 Q 456,496 442,481 L 414,449 Q 400,434 380,434 L 28,434 Q 4,434 4,410 Z"
                  fill="url(#aboutValuesDarkBg)"
                  stroke="url(#aboutValuesStroke)"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <div className="relative z-10 px-2.5 sm:px-8 lg:px-14 pt-2 sm:pt-6 lg:pt-8 pb-8 sm:pb-20 lg:pb-24 text-white">
                <Reveal
                  direction="left"
                  delay={0}
                  className="max-w-2xl mx-auto text-center space-y-1 sm:space-y-2.5 lg:space-y-3 mb-3 sm:mb-9 lg:mb-12"
                >
                  <h2 className="text-[11px] sm:text-2xl lg:text-4xl font-bold tracking-tight text-white text-balance">
                    What Drives{' '}
                    <span className="text-[#60A5FA]">SAMITECH</span>
                    <span className="text-[#EF4444]">.</span>
                  </h2>
                  <p className="text-[6.5px] sm:text-xs lg:text-sm text-slate-300 leading-tight sm:leading-relaxed max-w-xl mx-auto">
                    Three foundational commitments guide every architecture review, hardware
                    deployment, and mentorship cohort we lead.
                  </p>
                </Reveal>

                <div className="grid grid-cols-3 gap-2 sm:gap-7 lg:gap-12">
                  {ABOUT_PAGE_VALUES.map((pillar, index) => (
                    <Reveal
                      key={pillar.id}
                      direction="left"
                      delay={0.08 + index * 0.08}
                      wrapperClassName="min-w-0"
                      className="space-y-1 sm:space-y-2.5 lg:space-y-3 min-w-0"
                    >
                      <div className="inline-flex items-center justify-center w-7 h-7 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white/[0.08] border border-white/15 shadow-inner">
                        {renderValueIcon(pillar.id)}
                      </div>
                      <h3 className="text-[7.5px] sm:text-sm lg:text-lg font-bold text-white tracking-tight leading-tight sm:leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="text-[6px] sm:text-xs lg:text-sm text-slate-300 leading-tight sm:leading-relaxed">
                        {pillar.description}
                      </p>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal
            direction="left"
            delay={0.14}
            wrapperClassName="relative z-10 -mt-3.5 sm:-mt-8 lg:-mt-9"
            className="flex items-center gap-2 sm:gap-5 pr-1 sm:pr-2"
          >
            <button
              type="button"
              onClick={() => onOpenContact()}
              className="inline-flex items-center gap-1 sm:gap-2 px-2.5 py-1 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 text-[6.5px] sm:text-xs lg:text-sm font-semibold text-white rounded sm:rounded-lg bg-gradient-to-r from-[#DC0914] to-[#950606] hover:from-[#B90610] hover:to-[#7A0404] shadow-md transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC0914]"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-2 h-2 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" strokeWidth={1.75} aria-hidden="true" />
            </button>
            <div
              className="h-px flex-1 bg-gradient-to-r from-[#0044FF]/35 via-slate-300/80 to-transparent"
              aria-hidden="true"
            />
          </Reveal>
        </div>
      </section>

      {/* SECTION 3.5: LEADERSHIP & ENGINEERING TEAM PREVIEW */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-200/75 overflow-x-clip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <Reveal direction="left" className="space-y-2 max-w-xl">
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#07133B] text-balance">
                The People Behind{' '}
                <span className="text-[#002BFF]">SAMITECH</span>
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">
                Meet the architects, AI engineers, network leads, and security specialists driving
                our delivery from Buea and across Africa.
              </p>
            </Reveal>

            <Reveal direction="right" delay={0.08}>
              <button
                type="button"
                onClick={onNavigateTeam}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#002BFF] to-[#0055FF] hover:from-[#001ACC] hover:to-[#003CE6] shadow-md shadow-[#002BFF]/20 transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FF]"
              >
                <span>Meet the Full Team</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {TEAM_MEMBERS.map((member, index) => (
              <Reveal
                key={member.id}
                direction="bottom"
                delay={0.05 + index * 0.06}
                wrapperClassName="h-full"
                className="h-full"
              >
                <button
                  type="button"
                  onClick={() => onSelectTeamMember(member.id)}
                  className="group w-full h-full text-left rounded-2xl bg-[#F8FAFF] border border-[#0044FF]/12 hover:border-[#0044FF]/35 overflow-hidden transition-all duration-200 hover:-translate-y-1 flex flex-col cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FF]"
                >
                  <div className="aspect-[4/4.3] w-full overflow-hidden bg-[#EEF3FF]">
                    <ResilientImage
                      src={member.image}
                      alt={member.imageAlt}
                      fallbackTitle={member.name}
                      width={member.width}
                      height={member.height}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 sm:p-5 space-y-1">
                    <div className="text-[11px] font-bold text-[#002BFF]">
                      {member.executiveTitle} · {member.focusLabel}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#07133B] group-hover:text-[#002BFF] transition-colors leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-snug line-clamp-2">
                      {member.role}
                    </p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: MILESTONES & GROWTH JOURNEY */}
      <section className="py-8 sm:py-16 lg:py-24 bg-white overflow-x-clip">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <Reveal
            direction="top"
            delay={0}
            className="max-w-2xl mx-auto text-center space-y-1 sm:space-y-3 mb-4 sm:mb-10 lg:mb-12"
          >
            <h2 className="text-base sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#07133B] text-balance">
              Our Journey Since{' '}
              <span className="text-[#002BFF]">2022</span>
            </h2>
            <p className="text-[8px] sm:text-sm lg:text-base text-slate-600 leading-snug sm:leading-relaxed">
              From a focused engineering collective in Buea to powering 100+ digital deliveries
              and empowering over 10,000 community members across Africa and beyond.
            </p>
          </Reveal>

          <div className="grid grid-cols-4 gap-1.5 sm:gap-4 lg:gap-6">
            {ABOUT_PAGE_MILESTONES.map((milestone, index) => (
              <Reveal
                key={milestone.year}
                direction="bottom"
                delay={0.08 + index * 0.08}
                wrapperClassName="h-full"
                className="h-full"
              >
                <div className="h-full rounded-md sm:rounded-2xl bg-[#F2F6FF] border border-[#0044FF]/15 p-1.5 sm:p-5 lg:p-6 space-y-0.5 sm:space-y-2.5 flex flex-col justify-between transition-colors hover:border-[#0044FF]/35">
                  <div className="space-y-0.5 sm:space-y-2">
                    <div className="font-mono tabular-nums text-[7.5px] sm:text-sm lg:text-base font-bold text-[#002BFF]">
                      {milestone.year}
                    </div>
                    <h3 className="text-[7px] sm:text-sm lg:text-lg font-bold text-[#07133B] leading-tight">
                      {milestone.title}
                    </h3>
                    <p className="text-[6px] sm:text-xs lg:text-sm text-slate-600 leading-tight sm:leading-relaxed">
                      {milestone.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal
            direction="right"
            delay={0.18}
            className="mt-5 sm:mt-10 lg:mt-12 flex flex-nowrap items-center justify-center gap-2 sm:gap-4"
          >
            <button
              type="button"
              onClick={onNavigateServices}
              className="inline-flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-6 sm:py-3 text-[8px] sm:text-xs lg:text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#001AFF] to-[#0044FF] hover:from-[#0000CC] hover:to-[#002BFF] shadow-md shadow-[#002BFF]/20 transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-2.5 h-2.5 sm:w-4 sm:h-4" strokeWidth={1.75} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onNavigateProjects}
              className="inline-flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-6 sm:py-3 text-[8px] sm:text-xs lg:text-sm font-semibold text-[#07133B] bg-white border border-slate-200 hover:border-[#0044FF]/40 hover:bg-[#F2F6FF] rounded-full shadow-sm transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>View Featured Projects</span>
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
