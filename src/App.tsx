import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import {
  ArrowRight,
  Clock,
  Code2,
  Compass,
  Cpu,
  GraduationCap,
  Handshake,
  Layers,
  Mail,
  MapPin,
  Minus,
  Phone,
  PlayCircle,
  Plus,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react';
import { AboutPage } from './components/AboutPage';
import { CareersPage } from './components/CareersPage';
import { ServicesPage } from './components/ServicesPage';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { Navbar, type AppPage } from './components/Navbar';
import { Reveal, SAMITECH_EASE } from './components/MotionPrimitives';
import { ResilientImage } from './components/ResilientImage';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ContactModal } from './components/ContactModal';
import { StoryModal } from './components/StoryModal';
import { getServiceBySlug, ALL_SERVICES_CATALOG } from './data/servicesCatalog';
import {
  ABOUT_MEDIA,
  CASE_STUDIES,
  COMPANY_CONTACT,
  FAQ_ITEMS,
  SERVICES,
  WHY_PILLARS,
  type CaseStudy,
} from './data/samitechData';

const HERO_KPI_ITEMS = [
  {
    icon: Users,
    value: '10K+',
    label: 'Growing Community',
  },
  {
    icon: Code2,
    value: '100+',
    label: 'Projects Delivered',
  },
  {
    icon: ShieldCheck,
    value: '99.9%',
    label: 'Uptime Guarantee',
  },
  {
    icon: Handshake,
    value: '5+',
    label: 'Years of Excellence',
  },
];

const INTERNSHIP_TRACKS = [
  {
    title: 'Software Engineering Track',
    scope: 'React, TypeScript, Node.js, mobile workflows, and production APIs.',
  },
  {
    title: 'Networking Infrastructure Track',
    scope: 'LAN/WAN topologies, OpenVPN, cloud routing, and live monitoring.',
  },
  {
    title: 'Cybersecurity Track',
    scope: 'Vulnerability auditing, ethical hacking labs, and incident defense.',
  },
];

interface RouteResolution {
  page: AppPage;
  serviceSlug: string | null;
}

function resolveRouteFromLocation(): RouteResolution {
  if (typeof window === 'undefined') {
    return { page: 'home', serviceSlug: null };
  }
  const hash = window.location.hash.toLowerCase();
  const path = window.location.pathname.toLowerCase();
  const combined = hash.startsWith('#/') ? hash.slice(1) : path;

  if (combined === '/about' || hash === '#/about') {
    return { page: 'about', serviceSlug: null };
  }

  if (combined === '/careers' || hash === '#/careers') {
    return { page: 'careers', serviceSlug: null };
  }

  if (combined.startsWith('/services/')) {
    const slug = combined.replace('/services/', '').replace(/\/+$/, '');
    if (getServiceBySlug(slug)) {
      return { page: 'service-detail', serviceSlug: slug };
    }
    return { page: 'services', serviceSlug: null };
  }

  if (combined === '/services' || hash === '#/services') {
    return { page: 'services', serviceSlug: null };
  }

  return { page: 'home', serviceSlug: null };
}

export default function App() {
  const [routeState, setRouteState] = useState<RouteResolution>(resolveRouteFromLocation);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [legalDoc, setLegalDoc] = useState<'privacy' | 'terms' | null>(null);
  const [contactCategory, setContactCategory] = useState<string | undefined>(undefined);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const activePage = routeState.page;
  const selectedServiceSlug = routeState.serviceSlug;

  useEffect(() => {
    const syncRouteFromLocation = () => {
      setRouteState(resolveRouteFromLocation());
    };

    window.addEventListener('hashchange', syncRouteFromLocation);
    window.addEventListener('popstate', syncRouteFromLocation);
    return () => {
      window.removeEventListener('hashchange', syncRouteFromLocation);
      window.removeEventListener('popstate', syncRouteFromLocation);
    };
  }, []);

  const handleNavigate = (page: AppPage, target?: string) => {
    if (page === 'about') {
      setRouteState({ page: 'about', serviceSlug: null });
      if (window.location.hash !== '#/about') {
        window.history.pushState(null, '', '#/about');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'careers') {
      setRouteState({ page: 'careers', serviceSlug: null });
      if (window.location.hash !== '#/careers') {
        window.history.pushState(null, '', '#/careers');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'services') {
      setRouteState({ page: 'services', serviceSlug: null });
      if (window.location.hash !== '#/services') {
        window.history.pushState(null, '', '#/services');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'service-detail') {
      const validService = target ? getServiceBySlug(target) : ALL_SERVICES_CATALOG[0];
      const slug = validService ? validService.slug : ALL_SERVICES_CATALOG[0].slug;
      setRouteState({ page: 'service-detail', serviceSlug: slug });
      const nextHash = `#/services/${slug}`;
      if (window.location.hash !== nextHash) {
        window.history.pushState(null, '', nextHash);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setRouteState({ page: 'home', serviceSlug: null });
    const targetHash = target ? `#${target}` : '#home';
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }

    if (target) {
      window.setTimeout(() => {
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 90);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenContact = (category?: string) => {
    setContactCategory(category);
    setIsContactOpen(true);
  };

  const handleDiscussFromCaseStudy = (serviceCategory: string) => {
    setSelectedCaseStudy(null);
    handleOpenContact(serviceCategory);
  };

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const renderPillarIcon = (id: string) => {
    const cls = 'w-3 h-3 sm:w-6 sm:h-6 lg:w-7 lg:h-7';
    if (id === 'proven-experience') {
      return <Cpu className={`${cls} text-[#60A5FA]`} strokeWidth={1.75} aria-hidden="true" />;
    }
    if (id === 'certified-team') {
      return <Layers className={`${cls} text-[#3B82F6]`} strokeWidth={1.75} aria-hidden="true" />;
    }
    return <ShieldCheck className={`${cls} text-[#EF4444]`} strokeWidth={1.75} aria-hidden="true" />;
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white text-[#07133B] flex flex-col overflow-x-clip">
        <Navbar
          activePage={activePage}
          selectedServiceSlug={selectedServiceSlug}
          onNavigate={handleNavigate}
          onOpenContact={handleOpenContact}
        />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            {activePage === 'about' ? (
              <motion.div
                key="about-page"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: SAMITECH_EASE }}
              >
                <AboutPage
                  onNavigateServices={() => handleNavigate('services')}
                  onNavigateProjects={() => handleNavigate('home', 'projects')}
                  onOpenContact={handleOpenContact}
                />
              </motion.div>
            ) : activePage === 'careers' ? (
              <motion.div
                key="careers-page"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: SAMITECH_EASE }}
              >
                <CareersPage onOpenContact={handleOpenContact} />
              </motion.div>
            ) : activePage === 'services' ? (
              <motion.div
                key="services-page"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: SAMITECH_EASE }}
              >
                <ServicesPage
                  onSelectService={(slug) => handleNavigate('service-detail', slug)}
                  onOpenContact={handleOpenContact}
                  onOpenStory={() => setIsStoryOpen(true)}
                />
              </motion.div>
            ) : activePage === 'service-detail' ? (
              <motion.div
                key={`service-detail-${selectedServiceSlug || ALL_SERVICES_CATALOG[0].slug}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: SAMITECH_EASE }}
              >
                <ServiceDetailPage
                  service={getServiceBySlug(selectedServiceSlug || '') ?? ALL_SERVICES_CATALOG[0]}
                  onBackToServices={() => handleNavigate('services')}
                  onSelectService={(slug) => handleNavigate('service-detail', slug)}
                  onOpenContact={handleOpenContact}
                  onOpenCaseStudy={(study) => setSelectedCaseStudy(study)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="home-page"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: SAMITECH_EASE }}
              >
                {/* HERO SECTION — Looping Video Background With Desktop Split Scaled Across All Devices */}
                <section id="home" className="relative overflow-x-clip bg-white">
                  <div className="relative overflow-hidden bg-[#F2F6FF]">
                    {/* Full-Bleed Looping Hero Video Background With Instant Poster First Frame */}
                    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                      <img
                        src="/assets/hero-bg-poster.webp"
                        alt=""
                        width={1280}
                        height={720}
                        loading="eager"
                        decoding="sync"
                        fetchPriority="high"
                        className="absolute inset-0 w-full h-full object-cover object-[74%_center] sm:object-center"
                      />
                      <video
                        src="/assets/hero-bg-optimized.mp4"
                        poster="/assets/hero-bg-poster.webp"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="relative w-full h-full object-cover object-[74%_center] sm:object-center"
                      />
                      {/* Crisp white safety backdrop across left column so headline and copy stay high-contrast */}
                      <div className="absolute inset-y-0 left-0 w-[62%] sm:w-[56%] bg-gradient-to-r from-white via-white/95 to-transparent" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                      <div className="grid grid-cols-12 items-center gap-1.5 sm:gap-4 lg:gap-6">
                        {/* Left Content Column */}
                        <Reveal
                          direction="left"
                          wrapperClassName="col-span-6"
                          className="pt-16 pb-5 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-20 space-y-1.5 sm:space-y-4 lg:space-y-6"
                        >
                          {/* Hairline Eyebrow Kicker (No Decorative Dots) */}
                          <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[7.5px] sm:text-xs lg:text-sm font-semibold text-[#002BFF] tracking-tight">
                            <span className="w-3 sm:w-5 h-[2px] bg-[#0044FF] rounded-full" aria-hidden="true" />
                            <span>Innovative Tech Solutions for Africa</span>
                          </div>

                          {/* Hero Headline */}
                          <h1
                            className="font-extrabold tracking-tight leading-[1.06] text-balance"
                            style={{ fontSize: 'clamp(1rem, 4.2vw, 3.85rem)' }}
                          >
                            <span className="text-[#07133B] block">Building a Smarter</span>
                            <span className="bg-gradient-to-r from-[#0014CC] via-[#0033FF] to-[#0055FF] bg-clip-text text-transparent block">
                              Digital Future
                            </span>
                          </h1>

                          {/* Concise Corporate Thesis */}
                          <p className="max-w-lg text-[8px] sm:text-[13px] md:text-sm lg:text-base font-medium text-slate-800 leading-snug sm:leading-relaxed">
                            At <span className="font-bold text-[#07133B]">SAMITECH Corporation</span>, we
                            deliver cutting-edge solutions in AI, software, networking, cybersecurity, and
                            more — helping businesses and individuals achieve more.
                          </p>

                          {/* Rounded-Full Dual Action Row */}
                          <div className="pt-0.5 sm:pt-1 flex flex-nowrap items-center gap-1 sm:gap-3.5">
                            <button
                              type="button"
                              onClick={() => handleNavigate('services')}
                              className="inline-flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 text-[7px] sm:text-xs lg:text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#001AFF] to-[#0044FF] hover:from-[#0000CC] hover:to-[#002BFF] shadow-md shadow-[#002BFF]/25 transition-all duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FF]"
                            >
                              <span>Explore Our Services</span>
                              <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" strokeWidth={1.75} aria-hidden="true" />
                            </button>

                            <button
                              type="button"
                              onClick={() => setIsStoryOpen(true)}
                              className="inline-flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3 text-[7px] sm:text-xs lg:text-sm font-semibold text-[#07133B] bg-white border border-slate-300 hover:border-[#0044FF]/50 hover:bg-[#F2F6FF] rounded-full shadow-sm transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FF]"
                            >
                              <PlayCircle className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-[#002BFF]" strokeWidth={1.75} aria-hidden="true" />
                              <span>Watch Our Story</span>
                            </button>
                          </div>
                        </Reveal>

                        {/* Right Column Spacer — Keeps animated holographic ST globe background unobstructed */}
                        <div className="col-span-6 h-36 sm:h-72 lg:h-[430px]" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom-of-Hero 4-Column KPI Proof Bar with Crisp Hairline Dividers & Red Corner Ribbon */}
                  <div className="relative bg-white border-b border-slate-200/80 overflow-hidden">
                    {/* Crisp SVG Corner Ribbon */}
                    <svg
                      viewBox="0 0 240 96"
                      className="block pointer-events-none absolute right-0 bottom-0 w-16 sm:w-32 lg:w-52 h-auto"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient id="heroRedRibbon" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#950606" />
                          <stop offset="100%" stopColor="#DC0914" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 38,96 C 118,86 178,48 240,0 L 240,96 Z"
                        fill="url(#heroRedRibbon)"
                      />
                    </svg>

                    <Reveal
                      direction="left"
                      delay={0.08}
                      className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3.5 sm:py-5 lg:py-7"
                    >
                      <div className="grid grid-cols-4 divide-x divide-slate-200/80">
                        {HERO_KPI_ITEMS.map((item) => {
                          const Icon = item.icon;
                          return (
                            <div
                              key={item.label}
                              className="flex items-center gap-1.5 sm:gap-3 lg:gap-3.5 px-1.5 sm:px-4 lg:px-6 first:pl-0 last:pr-0 min-w-0"
                            >
                              <div className="w-6 h-6 sm:w-9 sm:h-9 lg:w-11 lg:h-11 rounded-md sm:rounded-xl bg-[#EEF3FF] border border-[#0044FF]/10 text-[#002BFF] flex items-center justify-center shrink-0">
                                <Icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" strokeWidth={1.75} aria-hidden="true" />
                              </div>
                              <div className="min-w-0">
                                <div className="font-display font-extrabold text-xs sm:text-lg lg:text-2xl text-[#07133B] tabular-nums leading-none">
                                  {item.value}
                                </div>
                                <div className="mt-0.5 sm:mt-1 text-[7.5px] sm:text-xs lg:text-sm font-medium text-[#002BFF] leading-tight">
                                  {item.label}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </Reveal>
                  </div>
                </section>

                {/* ABOUT SECTION — White & Tint-Blue Split (3-Column Desktop Layout Across All Devices) */}
                <section id="about" className="py-10 sm:py-16 lg:py-24 bg-[#F2F6FF] border-b border-[#0044FF]/10 overflow-x-clip">
                  <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-12 gap-2.5 sm:gap-6 lg:gap-12 items-center">
                      {/* Left Narrative Column */}
                      <Reveal direction="left" delay={0} wrapperClassName="col-span-4" className="space-y-2 sm:space-y-4 lg:space-y-5">
                        <h2 className="text-sm sm:text-2xl lg:text-4xl font-bold tracking-tight text-[#07133B] text-balance">
                          About{' '}
                          <span className="text-[#002BFF]">SAMITECH</span>
                        </h2>
                        <p className="text-[8.5px] sm:text-xs lg:text-base text-slate-700 leading-snug sm:leading-relaxed">
                          Founded in 2019 in Buea, Cameroon, SAMITECH Corporation is a remote-first
                          technology partner serving enterprises across Douala, Yaoundé, and global markets.
                        </p>
                        <p className="text-[8.5px] sm:text-xs lg:text-base text-slate-700 leading-snug sm:leading-relaxed">
                          Our certified engineering team delivers custom web and mobile software, enterprise
                          networking, cybersecurity audits, Data &amp; AI systems, and 24/7 operational
                          support.
                        </p>
                        <div className="pt-0.5 sm:pt-1 flex flex-nowrap items-center gap-2 sm:gap-4">
                          <button
                            type="button"
                            onClick={() => handleNavigate('about')}
                            className="inline-flex items-center gap-1 sm:gap-2 text-[7px] sm:text-xs lg:text-sm font-semibold text-[#002BFF] hover:text-[#DC0914] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0000FF] rounded-sm"
                          >
                            <span>Explore About Page</span>
                            <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" strokeWidth={1.75} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenContact()}
                            className="inline-flex items-center gap-1 sm:gap-1.5 text-[7px] sm:text-xs lg:text-sm font-medium text-slate-600 hover:text-[#07133B] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0000FF] rounded-sm"
                          >
                            <span>Speak with Our Team</span>
                          </button>
                        </div>
                      </Reveal>

                      {/* Center Architectural Image */}
                      <Reveal direction="bottom" delay={0.08} wrapperClassName="col-span-4 w-full" className="floating-frame-hero w-full">
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

                      {/* Right Mission & Vision Stack */}
                      <div className="col-span-4 space-y-2.5 sm:space-y-5 lg:space-y-8">
                        <Reveal direction="right" delay={0.14} className="space-y-1 sm:space-y-2.5 lg:space-y-3">
                          <div className="inline-flex items-center justify-center w-6 h-6 sm:w-9 sm:h-9 lg:w-11 lg:h-11 rounded-md sm:rounded-xl bg-[#002BFF]/10 text-[#002BFF]">
                            <Target className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" strokeWidth={1.75} aria-hidden="true" />
                          </div>
                          <h3 className="text-[10px] sm:text-base lg:text-xl font-bold tracking-tight text-[#07133B]">
                            Our Mission
                          </h3>
                          <p className="text-[8px] sm:text-xs lg:text-base text-slate-700 leading-snug sm:leading-relaxed">
                            To equip businesses of all sizes with innovative software solutions, robust
                            networking infrastructure, and comprehensive cybersecurity services that drive
                            growth, efficiency, and security.
                          </p>
                        </Reveal>

                        <Reveal direction="right" delay={0.22} className="pt-2.5 sm:pt-5 lg:pt-8 border-t border-[#0044FF]/15 space-y-1 sm:space-y-2.5 lg:space-y-3">
                          <div className="inline-flex items-center justify-center w-6 h-6 sm:w-9 sm:h-9 lg:w-11 lg:h-11 rounded-md sm:rounded-xl bg-[#DC0914]/10 text-[#DC0914]">
                            <Compass className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" strokeWidth={1.75} aria-hidden="true" />
                          </div>
                          <h3 className="text-[10px] sm:text-base lg:text-xl font-bold tracking-tight text-[#07133B]">
                            Our Vision
                          </h3>
                          <p className="text-[8px] sm:text-xs lg:text-base text-slate-700 leading-snug sm:leading-relaxed">
                            To become a leading global technology partner recognized for transformative
                            solutions that help organizations thrive while maintaining the highest standards
                            of security and reliability.
                          </p>
                        </Reveal>
                      </div>
                    </div>
                  </div>
                </section>

                {/* SERVICES SECTION (5 Staggered Vertical Floating Image Frames Across All Devices) */}
                <section id="services" className="pt-10 sm:pt-16 lg:pt-24 pb-12 sm:pb-20 lg:pb-28 bg-white overflow-x-clip">
                  <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <Reveal direction="top" delay={0} className="max-w-2xl mx-auto text-center space-y-1.5 sm:space-y-3 mb-6 sm:mb-10 lg:mb-14">
                      <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#07133B] text-balance">
                        Our Core{' '}
                        <span className="text-[#002BFF]">Services</span>
                      </h2>
                      <p className="text-[10px] sm:text-sm lg:text-base text-slate-600 leading-relaxed">
                        End-to-end delivery across Software Development, Networking Solutions, Cybersecurity,
                        Data &amp; AI, and 24/7 Infrastructure Support.
                      </p>
                    </Reveal>

                    <div className="grid grid-cols-5 gap-1.5 sm:gap-3.5 lg:gap-5 items-start pb-4 sm:pb-6 lg:pb-8">
                      {SERVICES.map((service, index) => {
                        const isOffsetLower = index % 2 === 1;
                        const serviceDirection =
                          service.id === 'networking-solutions' || service.id === 'data-ai-ux'
                            ? 'bottom'
                            : 'top';
                        return (
                          <div
                            key={service.id}
                            className={isOffsetLower ? 'translate-y-2.5 sm:translate-y-5 lg:translate-y-8' : ''}
                          >
                            <Reveal direction={serviceDirection} delay={0.06 + index * 0.08}>
                              <button
                                type="button"
                                onClick={() => handleNavigate('service-detail', service.detailSlug)}
                                className="floating-frame-card group relative aspect-[3/4] w-full rounded-lg sm:rounded-2xl overflow-hidden bg-[#040B29] text-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FF]"
                              >
                                <ResilientImage
                                  src={service.image}
                                  alt={service.imageAlt}
                                  fallbackTitle={service.title}
                                  width={service.imageWidth}
                                  height={service.imageHeight}
                                  darkSkeleton
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {/* Subtle bottom vignette so the floating white label plaque pops cleanly */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#040B29]/35 via-transparent to-transparent" />

                                {/* Floating White Label Card inside bottom of image frame */}
                                <div className="absolute inset-x-1 bottom-1 sm:inset-x-2 sm:bottom-2 lg:inset-x-3 lg:bottom-3">
                                  <div className="bg-white/95 backdrop-blur-sm rounded-md sm:rounded-xl px-1 py-1 sm:px-2 sm:py-2 lg:px-3 lg:py-3 shadow-lg border border-[#0044FF]/10 group-hover:border-[#002BFF]/35 transition-colors">
                                    <h3 className="text-[7px] sm:text-[10px] md:text-xs lg:text-sm font-bold text-[#07133B] group-hover:text-[#002BFF] transition-colors leading-tight">
                                      {service.title}
                                    </h3>
                                  </div>
                                </div>
                              </button>
                            </Reveal>
                          </div>
                        );
                      })}
                    </div>

                    <Reveal direction="bottom" delay={0.18} className="mt-6 sm:mt-10 lg:mt-14 text-center">
                      <button
                        type="button"
                        onClick={() => handleNavigate('services')}
                        className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 text-[10px] sm:text-xs lg:text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#001AFF] to-[#0044FF] hover:from-[#0000CC] hover:to-[#002BFF] shadow-md shadow-[#002BFF]/20 transition-all duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FF]"
                      >
                        <span>Explore All 10 Services (Product Scope, AI, MVP &amp; More)</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.75} aria-hidden="true" />
                      </button>
                    </Reveal>
                  </div>
                </section>

                {/* WHY CHOOSE SAMITECH — Dark Chamfered Top-Tab & Bottom-Left Cutout Card */}
                <section id="why-samitech" className="py-10 sm:py-16 lg:py-24 bg-[#F8FAFF] overflow-x-clip">
                  <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <Reveal direction="none" delay={0}>
                      <div id="why-samitech-card" className="relative">
                        {/* Chamfered Dark Folder-Tab & Cutout SVG Backdrop with Crisp Non-Scaling Stroke */}
                        <svg
                          viewBox="0 0 1200 500"
                          preserveAspectRatio="none"
                          className="absolute inset-0 w-full h-full drop-shadow-[0_22px_45px_rgba(4,11,41,0.22)] pointer-events-none"
                          aria-hidden="true"
                        >
                          <defs>
                            <linearGradient id="whyDarkBg" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#070B19" />
                              <stop offset="55%" stopColor="#0B1126" />
                              <stop offset="100%" stopColor="#060D28" />
                            </linearGradient>
                            <linearGradient id="whyStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#0044FF" stopOpacity="0.45" />
                              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.55" />
                              <stop offset="100%" stopColor="#DC0914" stopOpacity="0.45" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 4,88 Q 4,64 28,64 L 265,64 Q 285,64 298,48 L 326,18 Q 339,4 358,4 L 842,4 Q 861,4 874,18 L 902,48 Q 915,64 935,64 L 1172,64 Q 1196,64 1196,88 L 1196,472 Q 1196,496 1172,496 L 476,496 Q 456,496 442,481 L 414,449 Q 400,434 380,434 L 28,434 Q 4,434 4,410 Z"
                            fill="url(#whyDarkBg)"
                            stroke="url(#whyStroke)"
                            strokeWidth="1.5"
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>

                        {/* Foreground Content inside Dark Chamfered Card */}
                        <div className="relative z-10 px-2.5 sm:px-8 lg:px-14 pt-2 sm:pt-6 lg:pt-8 pb-8 sm:pb-20 lg:pb-24 text-white">
                          <Reveal direction="left" delay={0} className="max-w-2xl mx-auto text-center space-y-1 sm:space-y-2.5 lg:space-y-3 mb-3 sm:mb-9 lg:mb-12">
                            <h2 className="text-[11px] sm:text-2xl lg:text-4xl font-bold tracking-tight text-white text-balance">
                              Why choose{' '}
                              <span className="text-[#60A5FA]">SAMITECH</span>
                              <span className="text-[#EF4444]">?</span>
                            </h2>
                            <p className="text-[6.5px] sm:text-xs lg:text-sm text-slate-300 leading-tight sm:leading-relaxed max-w-xl mx-auto">
                              Over 5 years of engineering excellence across Software Development, Networking,
                              Cybersecurity, and 24/7 operational support from Buea, Cameroon.
                            </p>
                          </Reveal>

                          <div className="grid grid-cols-3 gap-2 sm:gap-7 lg:gap-12">
                            {WHY_PILLARS.map((pillar, index) => (
                              <Reveal
                                key={pillar.id}
                                direction="left"
                                delay={0.08 + index * 0.08}
                                wrapperClassName="min-w-0"
                                className="space-y-1 sm:space-y-2.5 lg:space-y-3 min-w-0"
                              >
                                <div className="inline-flex items-center justify-center w-5 h-5 sm:w-9 sm:h-9 lg:w-11 lg:h-11 rounded-md sm:rounded-lg bg-white/[0.06] border border-white/15">
                                  {renderPillarIcon(pillar.id)}
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

                    {/* Bottom-Left Cutout Pocket Action Row */}
                    <Reveal
                      direction="left"
                      delay={0.14}
                      wrapperClassName="relative z-10 -mt-3.5 sm:-mt-8 lg:-mt-9"
                      className="flex items-center gap-2 sm:gap-5 pr-1 sm:pr-2"
                    >
                      <button
                        type="button"
                        onClick={() => handleOpenContact()}
                        className="inline-flex items-center gap-1 sm:gap-2 px-2.5 py-1 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 text-[6.5px] sm:text-xs lg:text-sm font-semibold text-white rounded sm:rounded-lg bg-gradient-to-r from-[#DC0914] to-[#950606] hover:from-[#B90610] hover:to-[#7A0404] shadow-md transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC0914]"
                      >
                        <span>Get In Touch</span>
                        <ArrowRight className="w-2 h-2 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" strokeWidth={1.75} aria-hidden="true" />
                      </button>
                      <div
                        className="h-px flex-1 bg-gradient-to-r from-[#0044FF]/35 via-slate-300/80 to-transparent"
                        aria-hidden="true"
                      />
                    </Reveal>
                  </div>
                </section>

                {/* PROJECTS / CASE STUDIES SECTION — 4 Columns */}
                <section id="projects" className="py-10 sm:py-16 lg:py-24 bg-white overflow-x-clip">
                  <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <Reveal direction="right" delay={0} className="max-w-2xl mx-auto text-center space-y-1.5 sm:space-y-3 mb-6 sm:mb-10 lg:mb-12">
                      <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#07133B] text-balance">
                        Featured{' '}
                        <span className="text-[#002BFF]">Projects</span>
                      </h2>
                      <p className="text-[10px] sm:text-sm lg:text-base text-slate-600 leading-relaxed">
                        Select any deployment below to inspect architecture scope, deliverables, and
                        verified production outcomes.
                      </p>
                    </Reveal>

                    <div className="grid grid-cols-4 gap-1.5 sm:gap-3.5 lg:gap-5">
                      {CASE_STUDIES.map((study, index) => (
                        <Reveal key={study.id} direction="right" delay={0.06 + index * 0.08}>
                          <button
                            type="button"
                            onClick={() => setSelectedCaseStudy(study)}
                            className="floating-frame-card group relative aspect-[3/4] w-full rounded-lg sm:rounded-2xl overflow-hidden bg-[#040B29] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FF]"
                          >
                            <ResilientImage
                              src={study.image}
                              alt={study.imageAlt}
                              fallbackTitle={study.title}
                              width={study.imageWidth}
                              height={study.imageHeight}
                              darkSkeleton
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#040B29]/95 via-[#040B29]/45 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-1.5 sm:p-3.5 lg:p-5 space-y-1 sm:space-y-2 lg:space-y-2.5">
                              <div className="flex items-center gap-1 sm:gap-2 text-[6.5px] sm:text-[10px] lg:text-xs text-[#DBEAFE]">
                                <span className="truncate">{study.sector}</span>
                                <span aria-hidden="true">·</span>
                                <span>{study.year}</span>
                              </div>
                              <h3 className="text-[8px] sm:text-xs md:text-sm lg:text-lg font-bold text-white leading-tight sm:leading-snug line-clamp-2">
                                {study.title}
                              </h3>
                              <div className="pt-0.5 sm:pt-1 flex items-center justify-between gap-1 border-t border-white/15">
                                <span className="font-mono tabular-nums text-[6.5px] sm:text-[10px] lg:text-xs font-semibold text-[#93C5FD] truncate">
                                  {study.metrics[0].value} {study.metrics[0].label}
                                </span>
                                <span className="inline-flex items-center gap-0.5 sm:gap-1 text-[6.5px] sm:text-[10px] lg:text-xs font-semibold text-white group-hover:text-[#93C5FD] transition-colors whitespace-nowrap shrink-0">
                                  <span>Preview</span>
                                  <ArrowRight className="w-2 h-2 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.75} aria-hidden="true" />
                                </span>
                              </div>
                            </div>
                          </button>
                        </Reveal>
                      ))}
                    </div>

                    <Reveal direction="right" delay={0.18} className="mt-6 sm:mt-8 lg:mt-10 text-center">
                      <button
                        type="button"
                        onClick={() => handleOpenContact()}
                        className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 text-[10px] sm:text-xs lg:text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#001AFF] to-[#0044FF] hover:from-[#0000CC] hover:to-[#002BFF] shadow-md shadow-[#002BFF]/20 transition-all duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FF]"
                      >
                        <span>Start a Project With Us</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.75} aria-hidden="true" />
                      </button>
                    </Reveal>
                  </div>
                </section>

                {/* CAREERS & INTERNSHIPS SECTION */}
                <section id="careers" className="py-10 sm:py-16 lg:py-20 bg-[#F2F6FF] border-y border-[#0044FF]/10 overflow-x-clip">
                  <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-12 gap-2.5 sm:gap-6 lg:gap-10 items-center">
                      <div className="col-span-5 space-y-2 sm:space-y-4 lg:space-y-5">
                        <Reveal direction="left" delay={0} className="space-y-2 sm:space-y-4 lg:space-y-5">
                          <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[7.5px] sm:text-xs font-semibold text-[#002BFF]">
                            <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.75} aria-hidden="true" />
                            <span>Careers &amp; Mentorship</span>
                          </div>
                          <h2 className="text-sm sm:text-2xl lg:text-4xl font-bold tracking-tight text-[#07133B] text-balance">
                            Launch Your Career at{' '}
                            <span className="text-[#002BFF]">SAMITECH</span>
                          </h2>
                        </Reveal>
                        <Reveal direction="left" delay={0.08}>
                          <p className="text-[8.5px] sm:text-xs lg:text-base text-slate-700 leading-snug sm:leading-relaxed">
                            Our structured internship and engineering mentorship programs in Buea give
                            emerging technologists hands-on experience shipping real production systems alongside
                            senior specialists.
                          </p>
                        </Reveal>
                        <Reveal direction="left" delay={0.14} className="pt-0.5 sm:pt-1 flex flex-wrap items-center gap-2 sm:gap-4">
                          <button
                            type="button"
                            onClick={() => handleNavigate('careers')}
                            className="inline-flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 text-[8.5px] sm:text-xs lg:text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#001AFF] to-[#0044FF] hover:from-[#0000CC] hover:to-[#002BFF] shadow-sm transition-all duration-150 cursor-pointer"
                          >
                            <span>Explore Careers Page</span>
                            <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" strokeWidth={1.75} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenContact('Internships & Training')}
                            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2.5 text-[8.5px] sm:text-xs lg:text-sm font-semibold text-[#DC0914] hover:text-[#950606] transition-colors cursor-pointer"
                          >
                            <span>Apply for Internship</span>
                            <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" strokeWidth={1.75} aria-hidden="true" />
                          </button>
                        </Reveal>
                      </div>

                      <div className="col-span-7 grid grid-cols-3 gap-1.5 sm:gap-3 lg:gap-4">
                        {INTERNSHIP_TRACKS.map((track, index) => (
                          <Reveal
                            key={track.title}
                            direction="bottom"
                            delay={0.06 + index * 0.08}
                            wrapperClassName="h-full"
                            className="h-full"
                          >
                            <div className="h-full bg-white rounded-lg sm:rounded-2xl p-2 sm:p-4 lg:p-6 border border-[#0044FF]/12 shadow-sm space-y-1 sm:space-y-2 lg:space-y-3 transition-colors hover:border-[#0044FF]/35">
                              <h3 className="text-[8.5px] sm:text-xs lg:text-base font-bold text-[#07133B] leading-tight">
                                {track.title}
                              </h3>
                              <p className="text-[7.5px] sm:text-[10px] lg:text-sm text-slate-600 leading-snug sm:leading-relaxed">
                                {track.scope}
                              </p>
                            </div>
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* FAQ SECTION — Dark Asymmetric Folder-Tab Container With Smooth Expandable Transitions */}
                <section id="faq" className="py-10 sm:py-16 lg:py-24 bg-white overflow-x-clip">
                  <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <Reveal direction="none" delay={0}>
                      <div id="faq-card" className="relative">
                        {/* Asymmetric Folder-Tab Dark Backdrop */}
                        <svg
                          viewBox="0 0 1200 540"
                          preserveAspectRatio="none"
                          className="absolute inset-0 w-full h-full drop-shadow-[0_22px_45px_rgba(4,11,41,0.22)] pointer-events-none"
                          aria-hidden="true"
                        >
                          <defs>
                            <linearGradient id="faqDarkBg" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#070B19" />
                              <stop offset="55%" stopColor="#0B1126" />
                              <stop offset="100%" stopColor="#060D28" />
                            </linearGradient>
                            <linearGradient id="faqStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
                              <stop offset="100%" stopColor="#DC0914" stopOpacity="0.4" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 4,26 Q 4,4 26,4 L 380,4 Q 398,4 410,16 L 438,38 Q 450,48 468,48 L 1174,48 Q 1196,48 1196,70 L 1196,514 Q 1196,536 1174,536 L 26,536 Q 4,536 4,514 Z"
                            fill="url(#faqDarkBg)"
                            stroke="url(#faqStroke)"
                            strokeWidth="1.5"
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>

                        <div className="relative z-10 px-2.5 sm:px-8 lg:px-14 pt-3 sm:pt-8 lg:pt-10 pb-4 sm:pb-12 lg:pb-14 text-white">
                          <div className="grid grid-cols-12 gap-2 sm:gap-7 lg:gap-12 items-start">
                            {/* Left Column */}
                            <div className="col-span-5 space-y-1 sm:space-y-4 lg:space-y-5 pt-0.5 sm:pt-2">
                              <Reveal direction="left" delay={0} className="space-y-1 sm:space-y-4 lg:space-y-5">
                                <div className="inline-flex items-center gap-1.5 text-[7px] sm:text-xs font-bold tracking-wider uppercase text-[#60A5FA]">
                                  <span className="w-3 sm:w-4 h-[2px] bg-[#EF4444] rounded-full" aria-hidden="true" />
                                  <span>FAQ</span>
                                </div>
                                <h2 className="text-[11px] sm:text-2xl lg:text-4xl font-bold tracking-tight leading-[1.08] text-balance">
                                  <span className="text-white block">Frequently Asked</span>
                                  <span className="text-[#60A5FA] block">Questions</span>
                                </h2>
                              </Reveal>
                              <Reveal direction="left" delay={0.08}>
                                <p className="text-[6px] sm:text-xs lg:text-sm text-slate-300 leading-tight sm:leading-relaxed max-w-sm">
                                  Answers on SAMITECH Corporation services, Authorized Equipment Tracking (MTN
                                  Mobile Money), internships, and 24/7 support.
                                </p>
                              </Reveal>
                              <Reveal direction="left" delay={0.14} className="pt-0.5 sm:pt-2">
                                <button
                                  type="button"
                                  onClick={() => handleOpenContact()}
                                  className="inline-flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 text-[6.5px] sm:text-xs lg:text-sm font-semibold text-white rounded sm:rounded-lg bg-gradient-to-r from-[#DC0914] to-[#950606] hover:from-[#B90610] hover:to-[#7A0404] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                  <span>Get In Touch</span>
                                  <ArrowRight className="w-2 h-2 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" strokeWidth={1.75} aria-hidden="true" />
                                </button>
                              </Reveal>
                            </div>

                            {/* Right Column: Sequential Animated FAQ Accordion Boxes */}
                            <div className="col-span-7 space-y-1 sm:space-y-2.5 lg:space-y-3 pt-6 sm:pt-12 lg:pt-16">
                              {FAQ_ITEMS.map((item, index) => {
                                const isOpen = openFaqId === item.id;
                                return (
                                  <Reveal key={item.id} direction="right" delay={0.06 + index * 0.06}>
                                    <div
                                      className={`rounded-md sm:rounded-xl border transition-colors duration-200 ${
                                        isOpen
                                          ? 'bg-[#161F3B] border-[#60A5FA]/50'
                                          : 'bg-[#12182E] border-white/10 hover:bg-[#171F3A] hover:border-white/20'
                                      }`}
                                    >
                                      <button
                                        type="button"
                                        onClick={() => toggleFaq(item.id)}
                                        aria-expanded={isOpen}
                                        aria-controls={`${item.id}-panel`}
                                        className="w-full px-1.5 py-1.5 sm:px-3.5 sm:py-2.5 lg:px-4 lg:py-3.5 flex items-center gap-1.5 sm:gap-3.5 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-white rounded-md sm:rounded-xl"
                                      >
                                        <span
                                          className={`w-3.5 h-3.5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-[4px] sm:rounded-md border flex items-center justify-center shrink-0 transition-all duration-200 ${
                                            isOpen
                                              ? 'bg-[#0044FF] border-[#60A5FA] text-white'
                                              : 'bg-white/[0.06] border-white/15 text-slate-200'
                                          }`}
                                          aria-hidden="true"
                                        >
                                          {isOpen ? (
                                            <Minus className="w-2 h-2 sm:w-3.5 sm:h-3.5" strokeWidth={2} />
                                          ) : (
                                            <Plus className="w-2 h-2 sm:w-3.5 sm:h-3.5" strokeWidth={2} />
                                          )}
                                        </span>
                                        <span className="text-[6.5px] sm:text-xs lg:text-sm font-semibold text-white leading-tight sm:leading-snug">
                                          {item.question}
                                        </span>
                                      </button>

                                      <AnimatePresence initial={false}>
                                        {isOpen && (
                                          <motion.div
                                            id={`${item.id}-panel`}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.22, ease: SAMITECH_EASE }}
                                            className="overflow-hidden"
                                          >
                                            <div className="pl-6 pr-2 pb-2 sm:pl-[52px] sm:pr-4 sm:pb-3.5 lg:pl-[60px] lg:pr-5 lg:pb-4 text-[6px] sm:text-xs lg:text-sm text-slate-300 leading-snug sm:leading-relaxed border-t border-white/10 pt-1.5 sm:pt-2.5">
                                              {item.answer}
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  </Reveal>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* CORPORATE FOOTER — Deep Navy Obsidian Surface, Transparent Brand Lockup (No White Box), Showcase Links & Corner Ribbon */}
        <footer id="contact-footer" className="relative bg-[#071235] text-white border-t border-white/10 overflow-hidden">
          {/* Bottom-Right Signature Crimson & Royal-Blue Corner Ribbon Accent */}
          <svg
            viewBox="0 0 260 110"
            className="pointer-events-none absolute right-0 bottom-0 w-36 sm:w-52 lg:w-64 h-auto opacity-95"
            aria-hidden="true"
          >
            <path d="M 110,110 L 260,30 L 260,110 Z" fill="#0038FF" fillOpacity="0.65" />
            <path d="M 145,110 L 260,46 L 260,110 Z" fill="#DC0914" />
          </svg>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14">
            {/* Row 1: Brand Lockup (Left) + Direct Support Contact Cards (Right) */}
            <Reveal direction="right" delay={0}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-white/12">
                <div className="space-y-1.5 min-w-0">
                  <button
                    type="button"
                    onClick={() => handleNavigate('home')}
                    aria-label="SAMITECH Corporation Home"
                    className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white cursor-pointer"
                  >
                    <img
                      src="/assets/aistudio/Samitech_Corporation_Logo2_7401e1c3.png"
                      alt="SAMITECH Corporation"
                      width={2172}
                      height={724}
                      loading="lazy"
                      decoding="async"
                      className="h-9 sm:h-11 lg:h-12 w-auto object-contain footer-logo-glow"
                    />
                  </button>
                  <p className="text-xs text-slate-300 font-medium leading-snug">
                    Software, Networking, Cybersecurity &amp; Data/AI Solutions · Buea, Cameroon
                  </p>
                </div>

                {/* Structured Direct Contact Container */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0">
                  <a
                    href={`tel:${COMPANY_CONTACT.phone.replace(/\s+/g, '')}`}
                    className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.11] border border-white/12 hover:border-[#60A5FA]/45 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#60A5FA] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    <div className="text-left">
                      <div className="text-[10px] text-slate-300/80 leading-none mb-0.5">24/7 Support</div>
                      <div className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap tabular-nums">
                        {COMPANY_CONTACT.phone}
                      </div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${COMPANY_CONTACT.email}`}
                    className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.11] border border-white/12 hover:border-[#60A5FA]/45 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#60A5FA] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    <div className="text-left">
                      <div className="text-[10px] text-slate-300/80 leading-none mb-0.5">Email Desk</div>
                      <div className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap">
                        {COMPANY_CONTACT.email}
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Row 2: Quick Links · Our Services · Operations & Coverage · Follow & Connect */}
            <Reveal direction="left" delay={0.08}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 py-7 sm:py-9 border-b border-white/12">
                <div className="min-w-0 space-y-2.5">
                  <h3 className="text-xs sm:text-sm font-semibold text-white">
                    Quick Links
                  </h3>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300/90">
                    <li>
                      <button
                        type="button"
                        onClick={() => handleNavigate('home')}
                        className="hover:text-[#60A5FA] transition-colors cursor-pointer"
                      >
                        Home
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleNavigate('about')}
                        className="hover:text-[#60A5FA] transition-colors cursor-pointer"
                      >
                        About
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleNavigate('services')}
                        className="hover:text-[#60A5FA] transition-colors cursor-pointer"
                      >
                        Services
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleNavigate('home', 'projects')}
                        className="hover:text-[#60A5FA] transition-colors cursor-pointer"
                      >
                        Projects
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleNavigate('careers')}
                        className="hover:text-[#60A5FA] transition-colors cursor-pointer"
                      >
                        Careers
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleOpenContact()}
                        className="hover:text-[#60A5FA] transition-colors cursor-pointer"
                      >
                        Contact
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="min-w-0 space-y-2.5">
                  <h3 className="text-xs sm:text-sm font-semibold text-white">
                    Our Services
                  </h3>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300/90">
                    <li>
                      <button
                        type="button"
                        onClick={() => handleNavigate('service-detail', 'custom-software')}
                        className="hover:text-[#60A5FA] transition-colors cursor-pointer"
                      >
                        Web Development
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleNavigate('service-detail', 'mobile-app-development')}
                        className="hover:text-[#60A5FA] transition-colors cursor-pointer"
                      >
                        Mobile App Development
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleNavigate('service-detail', 'networking-solutions')}
                        className="hover:text-[#60A5FA] transition-colors cursor-pointer"
                      >
                        Cloud Solutions &amp; Networking
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleNavigate('service-detail', 'ai-development')}
                        className="hover:text-[#60A5FA] transition-colors cursor-pointer"
                      >
                        AI &amp; ML
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleNavigate('service-detail', 'cybersecurity')}
                        className="hover:text-[#60A5FA] transition-colors cursor-pointer"
                      >
                        Cybersecurity
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="min-w-0 space-y-2.5">
                  <h3 className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#60A5FA]" strokeWidth={1.75} aria-hidden="true" />
                    <span>Operations &amp; Coverage</span>
                  </h3>
                  <div className="text-xs sm:text-sm text-slate-300/90 leading-relaxed space-y-1">
                    <p>Emergency &amp; NOC: 24/7</p>
                    <p>Mon–Fri: 8:00 AM – 6:00 PM</p>
                    <p className="inline-flex items-center gap-1 pt-0.5 text-white font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#EF4444] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                      <span>Buea · Douala · Yaoundé</span>
                    </p>
                  </div>
                </div>

                <div className="min-w-0 flex flex-col justify-between space-y-3">
                  <div className="space-y-2.5">
                    <h3 className="text-xs sm:text-sm font-semibold text-white">
                      Connect With Us
                    </h3>
                    <div className="flex flex-col items-start space-y-1.5 text-xs sm:text-sm text-slate-300/90">
                      <button
                        type="button"
                        onClick={() => handleOpenContact()}
                        className="inline-flex items-center gap-1.5 text-white font-medium hover:text-[#60A5FA] transition-colors cursor-pointer"
                      >
                        <span>Request Project Quote</span>
                        <ArrowRight className="w-3 h-3" strokeWidth={1.75} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigate('careers')}
                        className="hover:text-[#60A5FA] transition-colors cursor-pointer"
                      >
                        Join Our Engineering Team
                      </button>
                      <a
                        href={`tel:${COMPANY_CONTACT.phone.replace(/\s+/g, '')}`}
                        className="hover:text-[#60A5FA] transition-colors"
                      >
                        WhatsApp / Direct Call
                      </a>
                    </div>
                  </div>

                  {/* Signature Tagline Accent Over Crimson Underline */}
                  <div className="pt-1 hidden sm:block">
                    <div className="inline-block -rotate-2">
                      <div className="text-base lg:text-lg font-bold tracking-tight text-white">
                        Let&apos;s Build Together
                      </div>
                      <div className="h-[2.5px] w-full bg-gradient-to-r from-[#DC0914] to-[#60A5FA] rounded-full mt-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Row 3: Bottom Copyright & Legal Links */}
            <Reveal direction="bottom" delay={0.14}>
              <div className="pt-5 sm:pt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300/80 pr-16 sm:pr-28">
                <div>© 2026 SAMITECH Corporation ({COMPANY_CONTACT.domain}). All rights reserved.</div>
                <div className="flex items-center gap-5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setLegalDoc('privacy')}
                    className="py-1 hover:text-white transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                  <button
                    type="button"
                    onClick={() => setLegalDoc('terms')}
                    className="py-1 hover:text-white transition-colors cursor-pointer"
                  >
                    Terms of Service
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </footer>

        {/* INTERACTIVE MODALS */}
        <CaseStudyModal
          caseStudy={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
          onDiscussProject={handleDiscussFromCaseStudy}
        />

        <ContactModal
          isOpen={isContactOpen}
          defaultCategory={contactCategory}
          onClose={() => setIsContactOpen(false)}
        />

        <StoryModal
          isOpen={isStoryOpen}
          onClose={() => setIsStoryOpen(false)}
          onGetInTouch={() => handleOpenContact()}
        />

        <AnimatePresence>
          {legalDoc && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: SAMITECH_EASE }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
              aria-labelledby="legal-modal-title"
              onClick={() => setLegalDoc(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: SAMITECH_EASE }}
                className="w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 border border-slate-200"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 id="legal-modal-title" className="text-xl font-bold text-[#07133B]">
                  {legalDoc === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {legalDoc === 'privacy'
                    ? 'SAMITECH Corporation (samitech237.com) collects contact inquiry details solely to respond to software, networking, cybersecurity, and internship requests. We never sell or share client information with third parties.'
                    : 'All software engineering, network infrastructure, and cybersecurity engagements follow written project scope agreements. Authorized Equipment Tracking strictly requires verified proof of ownership (receipt or box); false reporting is prohibited.'}
                </p>
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setLegalDoc(null)}
                    className="px-5 py-2 text-sm font-semibold text-white rounded-full bg-[#07133B] hover:bg-[#002BFF] transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
