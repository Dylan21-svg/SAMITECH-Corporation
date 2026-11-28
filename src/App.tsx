import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Globe,
  Mail,
  MessageCircle,
  Minus,
  Phone,
  PlayCircle,
  Plus,
  Radio,
} from 'lucide-react';
import { AboutPage } from './components/AboutPage';
import { CareersPage } from './components/CareersPage';
import { CommunitiesPage } from './components/CommunitiesPage';
import { ContactPage } from './components/ContactPage';
import { ProductsPage } from './components/ProductsPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ProjectsPage } from './components/ProjectsPage';
import { ServicesPage } from './components/ServicesPage';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { TeamPage } from './components/TeamPage';
import { TeamMemberProfilePage } from './components/TeamMemberProfilePage';
import { ControlPanelPage } from './components/control-panel/ControlPanelPage';
import { Navbar, type AppPage } from './components/Navbar';
import { Reveal, SAMITECH_EASE } from './components/MotionPrimitives';
import { ResilientImage } from './components/ResilientImage';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ContactModal } from './components/ContactModal';
import { StoryModal } from './components/StoryModal';
import { BackToTopButton } from './components/BackToTopButton';
import {
  WhatsAppBrandIcon,
  WhatsAppFloatingButton,
} from './components/WhatsAppFloatingButton';
import {
  CareersCapIcon,
  DarkPillarIcon,
  HomeKpiIcon,
  MissionBadgeIcon,
  VisionBadgeIcon,
} from './components/ShowcaseIcons';
import { useSiteContent } from './context/SiteContentContext';
import {
  ABOUT_MEDIA,
  WHY_PILLARS,
  type CaseStudy,
} from './data/samitechData';

const HERO_KPI_ITEMS: {
  type: 'community' | 'projects' | 'uptime' | 'excellence';
  value: string;
  label: string;
}[] = [
  {
    type: 'community',
    value: '10K+',
    label: 'Growing Community',
  },
  {
    type: 'projects',
    value: '100+',
    label: 'Projects Delivered',
  },
  {
    type: 'uptime',
    value: '99.9%',
    label: 'Uptime Guarantee',
  },
  {
    type: 'excellence',
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
  memberSlug: string | null;
  productId: string | null;
}

function resolveRouteFromLocation(): RouteResolution {
  if (typeof window === 'undefined') {
    return { page: 'home', serviceSlug: null, memberSlug: null, productId: null };
  }
  const hash = window.location.hash.toLowerCase();
  const path = window.location.pathname.toLowerCase();
  const combined = hash.startsWith('#/') ? hash.slice(1) : path;

  if (combined === '/control-panel' || hash === '#/control-panel') {
    return { page: 'control-panel', serviceSlug: null, memberSlug: null, productId: null };
  }

  if (combined === '/about' || hash === '#/about') {
    return { page: 'about', serviceSlug: null, memberSlug: null, productId: null };
  }

  if (combined.startsWith('/team/')) {
    const slug = combined.replace('/team/', '').replace(/\/+$/, '');
    if (slug) {
      return { page: 'team-member', serviceSlug: null, memberSlug: slug, productId: null };
    }
    return { page: 'team', serviceSlug: null, memberSlug: null, productId: null };
  }

  if (combined === '/team' || hash === '#/team') {
    return { page: 'team', serviceSlug: null, memberSlug: null, productId: null };
  }

  if (combined === '/projects' || hash === '#/projects') {
    return { page: 'projects', serviceSlug: null, memberSlug: null, productId: null };
  }

  if (combined === '/contact' || hash === '#/contact') {
    return { page: 'contact', serviceSlug: null, memberSlug: null, productId: null };
  }

  if (combined === '/careers' || hash === '#/careers') {
    return { page: 'careers', serviceSlug: null, memberSlug: null, productId: null };
  }

  if (combined === '/communities' || hash === '#/communities') {
    return { page: 'communities', serviceSlug: null, memberSlug: null, productId: null };
  }

  if (combined.startsWith('/products/')) {
    const productSlug = combined.replace('/products/', '').replace(/\/+$/, '');
    if (productSlug) {
      return { page: 'product-detail', serviceSlug: null, memberSlug: null, productId: productSlug };
    }
    return { page: 'products', serviceSlug: null, memberSlug: null, productId: null };
  }

  if (combined === '/products' || hash === '#/products') {
    return { page: 'products', serviceSlug: null, memberSlug: null, productId: null };
  }

  if (combined.startsWith('/services/')) {
    const slug = combined.replace('/services/', '').replace(/\/+$/, '');
    if (slug) {
      return { page: 'service-detail', serviceSlug: slug, memberSlug: null, productId: null };
    }
    return { page: 'services', serviceSlug: null, memberSlug: null, productId: null };
  }

  if (combined === '/services' || hash === '#/services') {
    return { page: 'services', serviceSlug: null, memberSlug: null, productId: null };
  }

  return { page: 'home', serviceSlug: null, memberSlug: null, productId: null };
}

export default function App() {
  const {
    settings,
    products,
    services,
    homeServices,
    homeCaseStudies,
    teamMembers,
    communities,
    faqs,
    getProductById,
    getServiceBySlug,
    getTeamMemberBySlug,
    buildWhatsAppUrl,
  } = useSiteContent();

  const [routeState, setRouteState] = useState<RouteResolution>(resolveRouteFromLocation);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [legalDoc, setLegalDoc] = useState<'privacy' | 'terms' | null>(null);
  const [contactCategory, setContactCategory] = useState<string | undefined>(undefined);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const activePage = routeState.page;
  const selectedServiceSlug = routeState.serviceSlug;
  const selectedMemberSlug = routeState.memberSlug;
  const selectedProductId = routeState.productId;

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
    if (page === 'control-panel') {
      setRouteState({ page: 'control-panel', serviceSlug: null, memberSlug: null, productId: null });
      if (window.location.hash !== '#/control-panel') {
        window.history.pushState(null, '', '#/control-panel');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'about') {
      setRouteState({ page: 'about', serviceSlug: null, memberSlug: null, productId: null });
      if (window.location.hash !== '#/about') {
        window.history.pushState(null, '', '#/about');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'team-member') {
      const validMember = target ? getTeamMemberBySlug(target) : teamMembers[0];
      const slug = validMember ? validMember.id : teamMembers[0]?.id ?? '';
      setRouteState({ page: 'team-member', serviceSlug: null, memberSlug: slug, productId: null });
      const nextHash = `#/team/${slug}`;
      if (window.location.hash !== nextHash) {
        window.history.pushState(null, '', nextHash);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'team') {
      setRouteState({ page: 'team', serviceSlug: null, memberSlug: null, productId: null });
      if (window.location.hash !== '#/team') {
        window.history.pushState(null, '', '#/team');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'projects') {
      setRouteState({ page: 'projects', serviceSlug: null, memberSlug: null, productId: null });
      if (window.location.hash !== '#/projects') {
        window.history.pushState(null, '', '#/projects');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'contact') {
      setRouteState({ page: 'contact', serviceSlug: null, memberSlug: null, productId: null });
      if (window.location.hash !== '#/contact') {
        window.history.pushState(null, '', '#/contact');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'careers') {
      setRouteState({ page: 'careers', serviceSlug: null, memberSlug: null, productId: null });
      if (window.location.hash !== '#/careers') {
        window.history.pushState(null, '', '#/careers');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'communities') {
      setRouteState({ page: 'communities', serviceSlug: null, memberSlug: null, productId: null });
      if (window.location.hash !== '#/communities') {
        window.history.pushState(null, '', '#/communities');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'product-detail') {
      const validProduct = target ? getProductById(target) : products[0];
      const pid = validProduct ? validProduct.id : products[0]?.id ?? '';
      setRouteState({ page: 'product-detail', serviceSlug: null, memberSlug: null, productId: pid });
      const nextHash = `#/products/${pid}`;
      if (window.location.hash !== nextHash) {
        window.history.pushState(null, '', nextHash);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'products') {
      setRouteState({ page: 'products', serviceSlug: null, memberSlug: null, productId: null });
      if (window.location.hash !== '#/products') {
        window.history.pushState(null, '', '#/products');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'services') {
      setRouteState({ page: 'services', serviceSlug: null, memberSlug: null, productId: null });
      if (window.location.hash !== '#/services') {
        window.history.pushState(null, '', '#/services');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'service-detail') {
      const validService = target ? getServiceBySlug(target) : services[0];
      const slug = validService ? validService.slug : services[0]?.slug ?? '';
      setRouteState({ page: 'service-detail', serviceSlug: slug, memberSlug: null, productId: null });
      const nextHash = `#/services/${slug}`;
      if (window.location.hash !== nextHash) {
        window.history.pushState(null, '', nextHash);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setRouteState({ page: 'home', serviceSlug: null, memberSlug: null, productId: null });
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
    if (id === 'proven-experience') {
      return <DarkPillarIcon variant="tech" />;
    }
    if (id === 'certified-team') {
      return <DarkPillarIcon variant="architecture" />;
    }
    return <DarkPillarIcon variant="shield" />;
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
            {activePage === 'control-panel' ? (
              <motion.div
                key="control-panel-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.16, ease: SAMITECH_EASE }}
              >
                <ControlPanelPage onExitToSite={() => handleNavigate('home')} />
              </motion.div>
            ) : activePage === 'about' ? (
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
                  onNavigateTeam={() => handleNavigate('team')}
                  onSelectTeamMember={(slug) => handleNavigate('team-member', slug)}
                  onOpenContact={handleOpenContact}
                />
              </motion.div>
            ) : activePage === 'team' ? (
              <motion.div
                key="team-page"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: SAMITECH_EASE }}
              >
                <TeamPage
                  onSelectMember={(slug) => handleNavigate('team-member', slug)}
                  onOpenContact={handleOpenContact}
                  onNavigateCareers={() => handleNavigate('careers')}
                  onNavigateAbout={() => handleNavigate('about')}
                />
              </motion.div>
            ) : activePage === 'team-member' ? (
              <motion.div
                key={`team-member-${selectedMemberSlug || teamMembers[0]?.id}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: SAMITECH_EASE }}
              >
                <TeamMemberProfilePage
                  member={getTeamMemberBySlug(selectedMemberSlug || '') ?? teamMembers[0]}
                  onBackToTeam={() => handleNavigate('team')}
                  onSelectMember={(slug) => handleNavigate('team-member', slug)}
                  onNavigateHome={() => handleNavigate('home')}
                  onOpenContact={handleOpenContact}
                />
              </motion.div>
            ) : activePage === 'projects' ? (
              <motion.div
                key="projects-page"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: SAMITECH_EASE }}
              >
                <ProjectsPage
                  onSelectProject={(study) => setSelectedCaseStudy(study)}
                  onOpenContact={handleOpenContact}
                />
              </motion.div>
            ) : activePage === 'contact' ? (
              <motion.div
                key="contact-page"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: SAMITECH_EASE }}
              >
                <ContactPage onNavigateHome={() => handleNavigate('home')} />
              </motion.div>
            ) : activePage === 'careers' ? (
              <motion.div
                key="careers-page"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: SAMITECH_EASE }}
              >
                <CareersPage
                  onOpenContact={handleOpenContact}
                  onNavigateTeam={() => handleNavigate('team')}
                />
              </motion.div>
            ) : activePage === 'communities' ? (
              <motion.div
                key="communities-page"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: SAMITECH_EASE }}
              >
                <CommunitiesPage
                  onOpenContact={handleOpenContact}
                  onNavigateCareers={() => handleNavigate('careers')}
                />
              </motion.div>
            ) : activePage === 'products' ? (
              <motion.div
                key="products-page"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: SAMITECH_EASE }}
              >
                <ProductsPage
                  onSelectProduct={(product) => handleNavigate('product-detail', product.id)}
                  onNavigateServices={() => handleNavigate('services')}
                  onOpenContact={handleOpenContact}
                />
              </motion.div>
            ) : activePage === 'product-detail' ? (
              <motion.div
                key={`product-detail-${selectedProductId || products[0]?.id}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: SAMITECH_EASE }}
              >
                <ProductDetailPage
                  product={getProductById(selectedProductId || '') ?? products[0]}
                  onBackToProducts={() => handleNavigate('products')}
                  onSelectProduct={(pid) => handleNavigate('product-detail', pid)}
                  onNavigateHome={() => handleNavigate('home')}
                  onOpenContact={handleOpenContact}
                />
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
                key={`service-detail-${selectedServiceSlug || services[0]?.slug}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: SAMITECH_EASE }}
              >
                <ServiceDetailPage
                  service={getServiceBySlug(selectedServiceSlug || '') ?? services[0]}
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
                {/* HERO SECTION, Crystal-Clear Full-Bleed Video Stage Across Mobile, Tablet, and Desktop */}
                <section id="home" className="relative min-h-[60svh] sm:min-h-[70svh] md:min-h-0 flex flex-col justify-between overflow-x-clip bg-white">
                  <div className="relative flex-1 flex items-center overflow-hidden bg-[#040B29] md:bg-white md:min-h-[480px] lg:h-[calc(100svh-88px)] lg:min-h-[560px] lg:max-h-[760px]">
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
                        className="absolute inset-0 w-full h-full object-cover object-[72%_center] md:object-center contrast-[1.04] saturate-[1.06]"
                      />
                      <video
                        src="/assets/hero-bg-optimized.mp4"
                        poster="/assets/hero-bg-poster.webp"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="relative w-full h-full object-cover object-[72%_center] md:object-center contrast-[1.04] saturate-[1.06]"
                      />

                      {/* Mobile/Small Tablet (<768px): Deep midnight scrim with zero white cast so holographic video stays crisp & text pops */}
                      <div className="md:hidden absolute inset-0 bg-gradient-to-t from-[#030A24]/90 via-[#040E33]/50 to-[#040B29]/30" />

                      {/* Tablet & Desktop (768px+): Crisp white readability zone covering the entire left text column while leaving the ST globe unobstructed */}
                      <div className="hidden md:block absolute inset-y-0 left-0 w-[56%] lg:w-[51%] bg-gradient-to-r from-white via-white/95 via-75% to-transparent" />
                    </div>

                    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 sm:pt-24 sm:pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-24 xl:pt-24 xl:pb-28">
                      <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 lg:gap-8">
                        {/* Left Content Column (positioned inside the natural upper-left white pocket on desktop) */}
                        <Reveal
                          immediate
                          direction="left"
                          wrapperClassName="md:col-span-6 lg:col-span-6"
                          className="max-w-xl md:max-w-[380px] lg:max-w-[490px] xl:max-w-[530px] space-y-4 lg:space-y-5"
                        >
                          {/* Eyebrow Kicker */}
                          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#040B29]/60 backdrop-blur-sm border border-white/20 text-xs font-semibold text-[#93C5FD] tracking-tight md:px-0 md:py-0 md:rounded-none md:bg-transparent md:backdrop-blur-none md:border-0 md:text-[#002BFF] lg:text-sm md:font-bold">
                            <span className="w-4 md:w-6 h-[2px] bg-[#60A5FA] md:bg-[#0044FF] rounded-full" aria-hidden="true" />
                            <span>Innovative Tech Solutions for Africa</span>
                          </div>

                          {/* Hero Headline */}
                          <h1
                            className="font-extrabold tracking-[-0.025em] leading-[1.06]"
                            style={{ fontSize: 'clamp(1.65rem, 3.65vw, 3.65rem)' }}
                          >
                            <span className="text-white md:text-[#07133B] drop-shadow-[0_2px_10px_rgba(2,6,23,0.6)] md:drop-shadow-none block md:whitespace-nowrap">
                              Building a Smarter
                            </span>
                            <span className="bg-gradient-to-r from-[#7DD3FC] via-[#BAE6FD] to-white md:from-[#0014CC] md:via-[#0033FF] md:to-[#0055FF] bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(2,6,23,0.45)] md:drop-shadow-none block md:whitespace-nowrap">
                              Digital Future
                            </span>
                          </h1>

                          {/* Concise Corporate Thesis */}
                          <p className="max-w-md lg:max-w-[470px] xl:max-w-[490px] text-[15px] sm:text-base md:text-sm lg:text-base xl:text-[17px] font-medium md:font-normal text-slate-100 md:text-[#1E293B] leading-[1.65] drop-shadow-[0_1px_6px_rgba(2,6,23,0.65)] md:drop-shadow-none">
                            At <span className="font-bold text-white md:text-[#07133B]">SAMITECH Corporation</span>, we
                            deliver cutting edge solutions in AI, software, networking, cybersecurity, and
                            more, helping businesses and individuals achieve more.
                          </p>

                          {/* Rounded-Full Dual Action Row */}
                          <div className="pt-1.5 flex flex-wrap items-center gap-3 sm:gap-3.5">
                            <button
                              type="button"
                              onClick={() => handleNavigate('services')}
                              className="inline-flex items-center gap-2 px-5 py-2.5 md:px-4 md:py-2.5 lg:px-6 lg:py-3 text-xs sm:text-sm md:text-xs lg:text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#0022FF] to-[#0055FF] hover:from-[#0000CC] hover:to-[#002BFF] ring-1 ring-white/25 md:ring-0 shadow-lg shadow-[#002BFF]/30 md:shadow-md transition-all duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FF]"
                            >
                              <span>Explore Our Services</span>
                              <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                            </button>

                            <button
                              type="button"
                              onClick={() => setIsStoryOpen(true)}
                              className="inline-flex items-center gap-2 px-4 py-2.5 md:px-4 md:py-2.5 lg:px-5 lg:py-3 text-xs sm:text-sm md:text-xs lg:text-sm font-semibold text-[#07133B] bg-white border border-white md:border-slate-300 hover:border-[#0044FF]/50 hover:bg-[#F2F6FF] rounded-full shadow-md md:shadow-sm transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FF]"
                            >
                              <PlayCircle className="w-4 h-4 text-[#002BFF]" strokeWidth={1.75} aria-hidden="true" />
                              <span>Watch Our Story</span>
                            </button>
                          </div>
                        </Reveal>

                        {/* Right Column Spacer, Keeps animated holographic ST globe unobstructed on tablet & desktop */}
                        <div className="hidden md:block md:col-span-6 lg:col-span-6 h-72 lg:h-[320px] xl:h-[360px]" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom-of-Hero 4-Column KPI Proof Bar (2x2 on Mobile & Tablet, 4-Col Split on Desktop) */}
                  <div className="relative bg-white border-t border-b border-slate-200/80 overflow-hidden">
                    <svg
                      viewBox="0 0 240 96"
                      className="block pointer-events-none absolute right-0 bottom-0 w-24 sm:w-28 lg:w-44 xl:w-52 h-auto"
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
                      immediate
                      direction="left"
                      delay={0.08}
                      className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-24 xl:pr-28 py-4 sm:py-5 lg:py-5"
                    >
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-0 lg:divide-x lg:divide-slate-200/80">
                        {HERO_KPI_ITEMS.map((item) => (
                          <div
                            key={item.label}
                            className="flex items-center gap-3 lg:px-5 xl:px-6 lg:first:pl-0 lg:last:pr-0 min-w-0"
                          >
                            <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl bg-[#EEF3FF] border border-[#0044FF]/15 flex items-center justify-center shrink-0 shadow-xs">
                              <HomeKpiIcon type={item.type} />
                            </div>
                            <div className="min-w-0">
                              <div className="font-display font-extrabold text-lg lg:text-xl text-[#07133B] tabular-nums leading-none">
                                {item.value}
                              </div>
                              <div className="mt-1 text-xs xl:text-sm font-medium text-[#002BFF] leading-tight">
                                {item.label}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Reveal>
                  </div>
                </section>

                {/* ABOUT SECTION, Vertical Mobile Flow Reveals As You Scroll; 3-Column Split on Desktop */}
                <section id="about" className="py-9 sm:py-14 lg:py-24 bg-[#F2F6FF] border-b border-[#0044FF]/10 overflow-x-clip">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-12 items-center">
                      {/* Narrative Column */}
                      <Reveal direction="left" delay={0} wrapperClassName="md:col-span-4" className="space-y-4 lg:space-y-5">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#07133B] text-balance">
                          About{' '}
                          <span className="text-[#002BFF]">SAMITECH</span>
                        </h2>
                        <p className="text-sm lg:text-base text-slate-700 leading-relaxed">
                          Founded in 2019 in Cameroon, SAMITECH Corporation is a remote first
                          technology partner serving enterprises nationwide and across global markets.
                        </p>
                        <p className="text-sm lg:text-base text-slate-700 leading-relaxed">
                          Our certified engineering team delivers custom web and mobile software, enterprise
                          networking, cybersecurity audits, Data &amp; AI systems, and 24/7 operational
                          support.
                        </p>
                        <div className="pt-1 flex flex-wrap items-center gap-x-5 gap-y-2">
                          <button
                            type="button"
                            onClick={() => handleNavigate('about')}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#002BFF] hover:text-[#DC0914] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0000FF] rounded-sm"
                          >
                            <span>Explore About Page</span>
                            <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleNavigate('team')}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#07133B] hover:text-[#002BFF] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0000FF] rounded-sm"
                          >
                            <span>Meet the Team</span>
                            <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenContact()}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-[#07133B] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0000FF] rounded-sm"
                          >
                            <span>Speak with Us</span>
                          </button>
                        </div>
                      </Reveal>

                      {/* Architectural Image */}
                      <Reveal direction="bottom" delay={0.08} wrapperClassName="md:col-span-4 w-full" className="floating-frame-hero w-full max-w-sm mx-auto md:max-w-none">
                        <div className="aspect-[4/3] md:aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-[#0044FF]/15">
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

                      {/* Mission & Vision Stack */}
                      <div className="md:col-span-4 space-y-6 lg:space-y-8">
                        <Reveal direction="right" delay={0.12} className="space-y-2.5 lg:space-y-3">
                          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white border border-[#DCE8FF] shadow-xs">
                            <MissionBadgeIcon />
                          </div>
                          <h3 className="text-lg lg:text-xl font-bold tracking-tight text-[#07133B]">
                            Our Mission
                          </h3>
                          <p className="text-sm lg:text-base text-slate-700 leading-relaxed">
                            To equip businesses of all sizes with innovative software solutions, robust
                            networking infrastructure, and comprehensive cybersecurity services that drive
                            growth, efficiency, and security.
                          </p>
                        </Reveal>

                        <Reveal direction="right" delay={0.2} className="pt-6 border-t border-[#0044FF]/15 space-y-2.5 lg:space-y-3">
                          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white border border-[#FBCFE8]/70 shadow-xs">
                            <VisionBadgeIcon />
                          </div>
                          <h3 className="text-lg lg:text-xl font-bold tracking-tight text-[#07133B]">
                            Our Vision
                          </h3>
                          <p className="text-sm lg:text-base text-slate-700 leading-relaxed">
                            To become a leading global technology partner recognized for transformative
                            solutions that help organizations thrive while maintaining the highest standards
                            of security and reliability.
                          </p>
                        </Reveal>
                      </div>
                    </div>
                  </div>
                </section>

                {/* SERVICES SECTION, Staggered 5-Column Cards on Desktop, Compact 2-Column Grid on Mobile */}
                <section id="services" className="py-9 sm:py-14 lg:py-24 bg-white overflow-x-clip">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal direction="top" delay={0} className="max-w-2xl mx-auto text-center space-y-2 sm:space-y-3 mb-6 sm:mb-12 lg:mb-14">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#07133B] text-balance">
                        Our Core{' '}
                        <span className="text-[#002BFF]">Services</span>
                      </h2>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">
                        End to end delivery across Software Development, Networking Solutions, Cybersecurity,
                        Data &amp; AI, and 24/7 Infrastructure Support.
                      </p>
                    </Reveal>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-4 lg:gap-5 items-start pb-2 sm:pb-6 lg:pb-8">
                      {homeServices.map((service, index) => {
                        const isOffsetLower = index % 2 === 1;
                        const isFifthOnMobile = index === homeServices.length - 1;
                        const serviceDirection =
                          service.id === 'networking-solutions' || service.id === 'data-ai-ux'
                            ? 'bottom'
                            : 'top';
                        return (
                          <div
                            key={service.id}
                            className={`${isOffsetLower ? 'lg:translate-y-8' : ''} ${
                              isFifthOnMobile ? 'col-span-2 lg:col-span-1' : ''
                            }`}
                          >
                            <Reveal direction={serviceDirection} delay={0.05 + index * 0.06}>
                              <button
                                type="button"
                                onClick={() => handleNavigate('service-detail', service.detailSlug)}
                                className={`floating-frame-card group relative w-full rounded-2xl overflow-hidden bg-[#040B29] text-center cursor-pointer hover:scale-[1.03] active:scale-[0.98] motion-reduce:hover:scale-100 motion-reduce:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FF] ${
                                  isFifthOnMobile ? 'aspect-[16/7] sm:aspect-[16/8] lg:aspect-[3/4]' : 'aspect-[4/3.6] sm:aspect-[3/4]'
                                }`}
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
                                <div className="absolute inset-0 bg-gradient-to-t from-[#040B29]/40 via-transparent to-transparent" />

                                <div className="absolute inset-x-2 sm:inset-x-3 bottom-2 sm:bottom-3">
                                  <div className="bg-white/95 backdrop-blur-sm rounded-xl px-2 py-2 sm:px-3 sm:py-2.5 lg:py-3 shadow-lg border border-[#0044FF]/10 group-hover:border-[#002BFF]/35 transition-colors">
                                    <h3 className="text-xs sm:text-sm font-bold text-[#07133B] group-hover:text-[#002BFF] transition-colors leading-tight">
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

                    <Reveal direction="bottom" delay={0.16} className="mt-8 sm:mt-10 lg:mt-14 text-center">
                      <button
                        type="button"
                        onClick={() => handleNavigate('services')}
                        className="inline-flex items-center gap-2 px-5 py-3 sm:px-6 text-xs sm:text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#001AFF] to-[#0044FF] hover:from-[#0000CC] hover:to-[#002BFF] shadow-md shadow-[#002BFF]/20 transition-all duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FF]"
                      >
                        <span>Explore All Services</span>
                        <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                      </button>
                    </Reveal>
                  </div>
                </section>

                {/* WHY CHOOSE SAMITECH, Clean Dark Card on Mobile, Chamfered Folder-Tab Cutout on Desktop */}
                <section id="why-samitech" className="py-9 sm:py-14 lg:py-24 bg-[#F8FAFF] overflow-x-clip">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal direction="none" delay={0}>
                      <div
                        id="why-samitech-card"
                        className="relative rounded-2xl md:rounded-none bg-gradient-to-br from-[#070B19] via-[#0B1126] to-[#060D28] md:bg-none border border-[#3B82F6]/30 md:border-none shadow-2xl md:shadow-none"
                      >
                        <svg
                          viewBox="0 0 1200 500"
                          preserveAspectRatio="none"
                          className="hidden md:block absolute inset-0 w-full h-full drop-shadow-[0_22px_45px_rgba(4,11,41,0.22)] pointer-events-none"
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

                        <div className="relative z-10 px-6 py-9 md:px-8 lg:px-14 md:pt-7 lg:pt-8 md:pb-20 lg:pb-24 text-white">
                          <Reveal direction="left" delay={0} className="max-w-2xl mx-auto text-center space-y-2.5 lg:space-y-3 mb-8 md:mb-10 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white text-balance">
                              Why choose{' '}
                              <span className="text-[#60A5FA]">SAMITECH</span>
                              <span className="text-[#EF4444]">?</span>
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
                              Over 5 years of engineering excellence across Software Development, Networking,
                              Cybersecurity, and 24/7 operational support from Cameroon.
                            </p>
                          </Reveal>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 lg:gap-12">
                            {WHY_PILLARS.map((pillar, index) => (
                              <Reveal
                                key={pillar.id}
                                direction="left"
                                delay={0.08 + index * 0.08}
                                wrapperClassName="min-w-0"
                                className="space-y-2.5 lg:space-y-3 min-w-0"
                              >
                                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/[0.08] border border-white/15 shadow-inner">
                                  {renderPillarIcon(pillar.id)}
                                </div>
                                <h3 className="text-base lg:text-lg font-bold text-white tracking-tight leading-snug">
                                  {pillar.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                  {pillar.description}
                                </p>
                                {pillar.id === 'certified-team' && (
                                  <button
                                    type="button"
                                    onClick={() => handleNavigate('team')}
                                    className="pt-1 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#93C5FD] hover:text-white transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white rounded-sm"
                                  >
                                    <span>Meet the engineers</span>
                                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                                  </button>
                                )}
                              </Reveal>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Reveal>

                    <Reveal
                      direction="left"
                      delay={0.14}
                      wrapperClassName="relative z-10 mt-4 md:-mt-8 lg:-mt-9"
                      className="flex items-center gap-4 sm:gap-5 pr-2"
                    >
                      <button
                        type="button"
                        onClick={() => handleOpenContact()}
                        className="inline-flex items-center gap-2 px-5 py-2.5 lg:px-6 lg:py-3 text-xs sm:text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-[#DC0914] to-[#950606] hover:from-[#B90610] hover:to-[#7A0404] shadow-md transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC0914]"
                      >
                        <span>Get In Touch</span>
                        <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                      </button>
                      <div
                        className="h-px flex-1 bg-gradient-to-r from-[#0044FF]/35 via-slate-300/80 to-transparent"
                        aria-hidden="true"
                      />
                    </Reveal>
                  </div>
                </section>

                {/* PROJECTS / CASE STUDIES SECTION, Compact 2-Column Mobile, 4-Column Desktop */}
                <section id="projects" className="py-9 sm:py-14 lg:py-24 bg-white overflow-x-clip">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal direction="right" delay={0} className="max-w-2xl mx-auto text-center space-y-2 sm:space-y-3 mb-6 sm:mb-10 lg:mb-12">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#07133B] text-balance">
                        Featured{' '}
                        <span className="text-[#002BFF]">Projects</span>
                      </h2>
                      <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">
                        Select any deployment below to inspect architecture scope, deliverables, and
                        verified production outcomes.
                      </p>
                    </Reveal>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
                      {homeCaseStudies.map((study, index) => (
                        <Reveal key={study.id} direction="right" delay={0.05 + index * 0.06}>
                          <button
                            type="button"
                            onClick={() => setSelectedCaseStudy(study)}
                            className="floating-frame-card group relative aspect-[4/4.3] sm:aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#040B29] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FF]"
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
                            <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4 lg:p-5 space-y-1 sm:space-y-2">
                              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[#DBEAFE]">
                                <span className="truncate">{study.sector}</span>
                                <span aria-hidden="true">·</span>
                                <span>{study.year}</span>
                              </div>
                              <h3 className="text-xs sm:text-base lg:text-lg font-bold text-white leading-snug line-clamp-2">
                                {study.title}
                              </h3>
                              <div className="pt-1 flex items-center justify-between gap-1.5 border-t border-white/15">
                                <span className="font-mono tabular-nums text-[10px] sm:text-xs font-semibold text-[#93C5FD] truncate">
                                  {study.metrics[0].value} {study.metrics[0].label}
                                </span>
                                <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-white group-hover:text-[#93C5FD] transition-colors whitespace-nowrap shrink-0">
                                  <span>Preview</span>
                                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.75} aria-hidden="true" />
                                </span>
                              </div>
                            </div>
                          </button>
                        </Reveal>
                      ))}
                    </div>

                    <Reveal direction="right" delay={0.16} className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                      <button
                        type="button"
                        onClick={() => handleNavigate('projects')}
                        className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#001AFF] to-[#0044FF] hover:from-[#0000CC] hover:to-[#002BFF] shadow-md shadow-[#002BFF]/20 transition-all duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FF]"
                      >
                        <span>Explore All Projects</span>
                        <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenContact()}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-[#07133B] hover:text-[#002BFF] border border-slate-300 hover:border-[#0044FF]/45 rounded-full transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>Start a Project With Us</span>
                      </button>
                    </Reveal>
                  </div>
                </section>

                {/* CAREERS & INTERNSHIPS SECTION */}
                <section id="careers" className="py-9 sm:py-14 lg:py-20 bg-[#F2F6FF] border-y border-[#0044FF]/10 overflow-x-clip">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                      <div className="lg:col-span-5 space-y-4 lg:space-y-5">
                        <Reveal direction="left" delay={0} className="space-y-3 lg:space-y-4">
                          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#002BFF]">
                            <CareersCapIcon />
                            <span>Careers &amp; Mentorship</span>
                          </div>
                          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#07133B] text-balance">
                            Launch Your Career at{' '}
                            <span className="text-[#002BFF]">SAMITECH</span>
                          </h2>
                        </Reveal>
                        <Reveal direction="left" delay={0.08}>
                          <p className="text-sm lg:text-base text-slate-700 leading-relaxed">
                            Our structured internship and engineering mentorship programs in Cameroon give
                            emerging technologists hands on experience shipping real production systems alongside
                            senior specialists.
                          </p>
                        </Reveal>
                        <Reveal direction="left" delay={0.14} className="pt-1 flex flex-wrap items-center gap-3 sm:gap-4">
                          <button
                            type="button"
                            onClick={() => handleNavigate('careers')}
                            className="inline-flex items-center gap-2 px-5 py-2.5 lg:px-6 lg:py-3 text-xs sm:text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#001AFF] to-[#0044FF] hover:from-[#0000CC] hover:to-[#002BFF] shadow-sm transition-all duration-150 cursor-pointer"
                          >
                            <span>Explore Careers Page</span>
                            <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenContact('Internships & Training')}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#DC0914] hover:text-[#950606] transition-colors cursor-pointer"
                          >
                            <span>Apply for Internship</span>
                            <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                          </button>
                        </Reveal>
                      </div>

                      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {INTERNSHIP_TRACKS.map((track, index) => (
                          <Reveal
                            key={track.title}
                            direction="bottom"
                            delay={0.06 + index * 0.08}
                            wrapperClassName="h-full"
                            className="h-full"
                          >
                            <div className="h-full bg-white rounded-2xl p-5 lg:p-6 border border-[#0044FF]/12 shadow-sm space-y-2.5 transition-colors hover:border-[#0044FF]/35">
                              <h3 className="text-sm lg:text-base font-bold text-[#07133B] leading-tight">
                                {track.title}
                              </h3>
                              <p className="text-xs lg:text-sm text-slate-600 leading-relaxed">
                                {track.scope}
                              </p>
                            </div>
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* OUR COMMUNITIES SECTION */}
                <section id="communities" className="py-9 sm:py-14 lg:py-20 bg-white border-b border-slate-200/70 overflow-x-clip">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
                      <Reveal direction="left" className="space-y-2 max-w-2xl">
                        <div className="text-xs sm:text-sm font-semibold text-[#002BFF]">
                          Our Communities
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#07133B] text-balance">
                          Connect With SAMITECH{' '}
                          <span className="text-[#002BFF]">Ecosystems</span>
                        </h2>
                        <p className="text-sm lg:text-base text-slate-600 leading-relaxed">
                          Join our independent tech portals, WhatsApp engineering groups, and official
                          announcement channels.
                        </p>
                      </Reveal>

                      <Reveal direction="right" delay={0.08}>
                        <button
                          type="button"
                          onClick={() => handleNavigate('communities')}
                          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#07133B] hover:text-[#002BFF] bg-[#F2F6FF] hover:bg-[#E4EEFF] border border-[#DCE8FF] rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>Explore Communities</span>
                          <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                        </button>
                      </Reveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
                      {communities.map((community, index) => (
                        <Reveal
                          key={community.id}
                          direction="bottom"
                          delay={0.05 + index * 0.06}
                          wrapperClassName="h-full"
                          className="h-full"
                        >
                          <article className="group h-full flex flex-col justify-between rounded-2xl bg-[#F8FAFF] border border-[#DCE8FF] hover:border-[#0044FF]/45 p-6 shadow-[0_6px_20px_rgba(4,11,41,0.04)] hover:shadow-[0_14px_30px_rgba(0,68,255,0.10)] hover:scale-[1.02] transition-all duration-200 ease-out">
                            <div className="space-y-3.5">
                              {community.image && (
                                <div
                                  className="aspect-[16/9] rounded-xl overflow-hidden border border-[#DCE8FF]"
                                  style={{ backgroundColor: community.imageBg ?? '#040B29' }}
                                >
                                  <ResilientImage
                                    src={community.image}
                                    alt={community.imageAlt || community.name}
                                    fallbackTitle={community.name}
                                    width={community.imageWidth}
                                    height={community.imageHeight}
                                    darkSkeleton={community.imageBg !== '#FFFFFF'}
                                    className={`w-full h-full ${
                                      community.imageFit === 'contain' ? 'object-contain p-2.5' : 'object-cover'
                                    } group-hover:scale-[1.03] transition-transform duration-300`}
                                  />
                                </div>
                              )}

                              <div className="flex items-center justify-between gap-3">
                                <div
                                  className="w-10 h-10 rounded-xl bg-white border border-[#DCE8FF] flex items-center justify-center shrink-0"
                                  style={{ color: community.accentColor }}
                                >
                                  {community.platform === 'website' ? (
                                    <Globe className="w-5 h-5" strokeWidth={1.85} aria-hidden="true" />
                                  ) : community.platform === 'whatsapp-channel' ? (
                                    <Radio className="w-5 h-5" strokeWidth={1.85} aria-hidden="true" />
                                  ) : (
                                    <MessageCircle className="w-5 h-5" strokeWidth={1.85} aria-hidden="true" />
                                  )}
                                </div>
                                <span className="font-mono text-xs font-bold text-slate-400 tabular-nums">
                                  {community.number}
                                </span>
                              </div>

                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                  <span style={{ color: community.accentColor }} className="font-semibold">
                                    {community.platformLabel}
                                  </span>
                                  <span aria-hidden="true">·</span>
                                  <span className="font-mono truncate">{community.domainOrHandle}</span>
                                </div>
                                <h3 className="text-lg font-extrabold text-[#07133B] group-hover:text-[#002BFF] transition-colors">
                                  {community.name}
                                </h3>
                                <p className="text-xs font-semibold text-[#07133B]/80">
                                  {community.subtitle}
                                </p>
                              </div>

                              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                {community.description}
                              </p>
                            </div>

                            <div className="pt-5 mt-5 border-t border-slate-200/75">
                              <a
                                href={community.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap"
                                style={{ color: community.accentColor }}
                              >
                                <span>{community.ctaLabel}</span>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2} aria-hidden="true" />
                              </a>
                            </div>
                          </article>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                </section>

                {/* FAQ SECTION, Responsive Dark Card on Mobile, Chamfered Asymmetric Folder-Tab on Desktop */}
                <section id="faq" className="py-9 sm:py-14 lg:py-24 bg-white overflow-x-clip">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal direction="none" delay={0}>
                      <div
                        id="faq-card"
                        className="relative rounded-2xl md:rounded-none bg-gradient-to-br from-[#070B19] via-[#0B1126] to-[#060D28] md:bg-none border border-[#3B82F6]/30 md:border-none shadow-2xl md:shadow-none"
                      >
                        {/* Asymmetric Folder-Tab Dark Backdrop (md+) */}
                        <svg
                          viewBox="0 0 1200 540"
                          preserveAspectRatio="none"
                          className="hidden md:block absolute inset-0 w-full h-full drop-shadow-[0_22px_45px_rgba(4,11,41,0.22)] pointer-events-none"
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

                        <div className="relative z-10 px-5 py-8 md:px-8 lg:px-14 md:pt-8 md:pb-12 lg:pt-10 lg:pb-14 text-white">
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-7 lg:gap-12 items-start">
                            {/* Left Column */}
                            <div className="md:col-span-5 space-y-4 lg:space-y-5 pt-1">
                              <Reveal direction="left" delay={0} className="space-y-3 lg:space-y-4">
                                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#60A5FA]">
                                  <span className="w-4 h-[2px] bg-[#EF4444] rounded-full" aria-hidden="true" />
                                  <span>FAQ</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.08] text-balance">
                                  <span className="text-white block">Frequently Asked</span>
                                  <span className="text-[#60A5FA] block">Questions</span>
                                </h2>
                              </Reveal>
                              <Reveal direction="left" delay={0.08}>
                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
                                  Answers on SAMITECH Corporation services, Authorized Equipment Tracking (MTN
                                  Mobile Money), internships, and 24/7 support.
                                </p>
                              </Reveal>
                              <Reveal direction="left" delay={0.14} className="pt-1">
                                <button
                                  type="button"
                                  onClick={() => handleOpenContact()}
                                  className="inline-flex items-center gap-2 px-5 py-2.5 lg:px-6 lg:py-3 text-xs sm:text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-[#DC0914] to-[#950606] hover:from-[#B90610] hover:to-[#7A0404] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                  <span>Get In Touch</span>
                                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                                </button>
                              </Reveal>
                            </div>

                            {/* Right Column: Sequential Animated FAQ Accordion Boxes */}
                            <div className="md:col-span-7 space-y-3 md:pt-10 lg:pt-14">
                              {faqs.map((item, index) => {
                                const isOpen = openFaqId === item.id;
                                return (
                                  <Reveal key={item.id} direction="right" delay={0.05 + index * 0.05}>
                                    <div
                                      className={`rounded-xl border transition-colors duration-200 ${
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
                                        className="w-full px-4 py-3.5 flex items-center gap-3.5 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-white rounded-xl"
                                      >
                                        <span
                                          className={`w-7 h-7 rounded-md border flex items-center justify-center shrink-0 transition-all duration-200 ${
                                            isOpen
                                              ? 'bg-[#0044FF] border-[#60A5FA] text-white'
                                              : 'bg-white/[0.06] border-white/15 text-slate-200'
                                          }`}
                                          aria-hidden="true"
                                        >
                                          {isOpen ? (
                                            <Minus className="w-3.5 h-3.5" strokeWidth={2} />
                                          ) : (
                                            <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                                          )}
                                        </span>
                                        <span className="text-xs sm:text-sm font-semibold text-white leading-snug">
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
                                            <div className="pl-11 sm:pl-[58px] pr-4 sm:pr-5 pb-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/10 pt-2.5">
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

        {/* ULTRA-COMPACT CORPORATE FOOTER, Slim & Proportional Across Every Device */}
        {activePage !== 'control-panel' && (
          <footer id="contact-footer" className="relative bg-[#071235] text-white border-t border-white/10 overflow-hidden">
            <svg
              viewBox="0 0 260 110"
              className="pointer-events-none absolute right-0 bottom-0 w-14 sm:w-24 lg:w-28 h-auto opacity-85"
              aria-hidden="true"
            >
              <path d="M 110,110 L 260,30 L 260,110 Z" fill="#0038FF" fillOpacity="0.65" />
              <path d="M 145,110 L 260,46 L 260,110 Z" fill="#DC0914" />
            </svg>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3.5 lg:gap-6">
                {/* Brand & Direct Contact */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 min-w-0">
                  <button
                    type="button"
                    onClick={() => handleNavigate('home')}
                    aria-label={`${settings.legalName} Home`}
                    className="inline-flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white cursor-pointer"
                  >
                    <img
                      src="/assets/aistudio/Samitech_Corporation_Logo2_7401e1c3.png"
                      alt={settings.legalName}
                      width={2172}
                      height={724}
                      loading="lazy"
                      decoding="async"
                      className="h-6 sm:h-7 w-auto object-contain footer-logo-glow"
                    />
                  </button>

                  <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[11px] sm:text-xs text-slate-200/90">
                    <a
                      href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                      className="inline-flex items-center gap-1 hover:text-[#60A5FA] transition-colors whitespace-nowrap tabular-nums"
                    >
                      <Phone className="w-3 h-3 text-[#60A5FA] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                      <span>{settings.phone}</span>
                    </a>
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Chat on WhatsApp"
                      className="inline-flex items-center gap-1 text-[#4ADE80] hover:text-[#86EFAC] font-semibold transition-colors whitespace-nowrap"
                    >
                      <WhatsAppBrandIcon className="w-3.5 h-3.5 shrink-0" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={`mailto:${settings.email}`}
                      className="inline-flex items-center gap-1 hover:text-[#60A5FA] transition-colors whitespace-nowrap"
                    >
                      <Mail className="w-3 h-3 text-[#60A5FA] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                      <span>{settings.email}</span>
                    </a>
                  </div>
                </div>

                {/* Inline Compact Site Links */}
                <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-[11px] sm:text-xs text-slate-200/90">
                  <button type="button" onClick={() => handleNavigate('home')} className="hover:text-[#60A5FA] transition-colors whitespace-nowrap cursor-pointer">
                    Home
                  </button>
                  <button type="button" onClick={() => handleNavigate('about')} className="hover:text-[#60A5FA] transition-colors whitespace-nowrap cursor-pointer">
                    About
                  </button>
                  <button type="button" onClick={() => handleNavigate('team')} className="hover:text-[#60A5FA] transition-colors whitespace-nowrap cursor-pointer">
                    Team
                  </button>
                  <button type="button" onClick={() => handleNavigate('services')} className="hover:text-[#60A5FA] transition-colors whitespace-nowrap cursor-pointer">
                    Services
                  </button>
                  <button type="button" onClick={() => handleNavigate('products')} className="hover:text-[#60A5FA] transition-colors whitespace-nowrap cursor-pointer">
                    Products
                  </button>
                  <button type="button" onClick={() => handleNavigate('projects')} className="hover:text-[#60A5FA] transition-colors whitespace-nowrap cursor-pointer">
                    Projects
                  </button>
                  <button type="button" onClick={() => handleNavigate('communities')} className="hover:text-[#60A5FA] transition-colors whitespace-nowrap cursor-pointer">
                    Communities
                  </button>
                  <button type="button" onClick={() => handleNavigate('careers')} className="hover:text-[#60A5FA] transition-colors whitespace-nowrap cursor-pointer">
                    Careers
                  </button>
                  <button type="button" onClick={() => handleNavigate('contact')} className="hover:text-[#60A5FA] transition-colors whitespace-nowrap cursor-pointer">
                    Contact
                  </button>
                </nav>
              </div>

              {/* Slim Legal Bar */}
              <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300/75 pr-12 sm:pr-20">
                <div>© 2026 {settings.legalName} · {settings.location} · {settings.availability}</div>
                <div className="flex items-center gap-4 shrink-0">
                  <button
                    type="button"
                    onClick={() => setLegalDoc('privacy')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                  <button
                    type="button"
                    onClick={() => setLegalDoc('terms')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Terms of Service
                  </button>
                </div>
              </div>
            </div>
          </footer>
        )}

        {activePage !== 'control-panel' && <BackToTopButton />}
        {activePage !== 'control-panel' && <WhatsAppFloatingButton />}

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
