import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  ChevronDown,
  Mail,
  Phone,
} from 'lucide-react';
import { COMPANY_CONTACT } from '../data/samitechData';
import { ALL_SERVICES_CATALOG } from '../data/servicesCatalog';
import {
  createRevealVariants,
  SAMITECH_EASE,
  useMotionConfigValues,
} from './MotionPrimitives';
import { ServiceWireframeIcon } from './ServiceWireframeIcon';

export type AppPage =
  | 'home'
  | 'about'
  | 'services'
  | 'service-detail'
  | 'careers'
  | 'projects'
  | 'contact';

interface NavbarProps {
  activePage: AppPage;
  selectedServiceSlug?: string | null;
  onNavigate: (page: AppPage, target?: string) => void;
  onOpenContact: (defaultCategory?: string) => void;
}

export function Navbar({
  activePage,
  selectedServiceSlug,
  onNavigate,
  onOpenContact,
}: NavbarProps) {
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [overDarkSection, setOverDarkSection] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { distance, shouldReduceMotion } = useMotionConfigValues();
  const navVariants = createRevealVariants('right', distance, 0, 0.55);

  useEffect(() => {
    const checkScrollAndSection = () => {
      setIsScrolled(window.scrollY > 18);

      const darkIds = ['why-samitech-card', 'faq-card', 'about-values-card', 'contact-footer'];
      const isDark = darkIds.some((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 48 && rect.bottom >= 18;
      });
      setOverDarkSection(isDark);
    };

    checkScrollAndSection();
    window.addEventListener('scroll', checkScrollAndSection, { passive: true });
    window.addEventListener('resize', checkScrollAndSection, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkScrollAndSection);
      window.removeEventListener('resize', checkScrollAndSection);
    };
  }, [activePage, selectedServiceSlug]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setServicesDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleOpenServicesOverview = () => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    onNavigate('services');
  };

  const handleOpenServiceDetail = (slug: string) => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    onNavigate('service-detail', slug);
  };

  const handleMobileNav = (page: AppPage, target?: string) => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setServicesDropdownOpen(false);
    onNavigate(page, target);
  };

  const headerSurfaceClass = mobileMenuOpen
    ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm'
    : overDarkSection
      ? 'bg-[#070B19]/85 backdrop-blur-md border-b border-white/10'
      : isScrolled || activePage === 'services' || activePage === 'projects'
        ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/75 shadow-xs'
        : 'bg-white/95 backdrop-blur-md border-b border-slate-200/75 shadow-xs md:bg-transparent md:backdrop-blur-none md:border-b-transparent md:shadow-none';

  const useDarkText = overDarkSection && !mobileMenuOpen;

  const navLinkClass = useDarkText
    ? 'text-xs lg:text-sm font-medium text-white/90 hover:text-[#93C5FD] transition-colors whitespace-nowrap shrink-0 py-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white rounded-sm cursor-pointer'
    : 'text-xs lg:text-sm font-medium text-[#07133B] hover:text-[#002BFF] transition-colors whitespace-nowrap shrink-0 py-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0000FF] rounded-sm cursor-pointer';

  const activeLinkClass = useDarkText
    ? "text-xs lg:text-sm font-semibold relative py-1.5 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:rounded-full whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm transition-colors text-white after:bg-white focus-visible:outline-white cursor-pointer"
    : "text-xs lg:text-sm font-semibold relative py-1.5 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:rounded-full whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm transition-colors text-[#002BFF] after:bg-[#002BFF] focus-visible:outline-[#0000FF] cursor-pointer";

  const isServicesActive = activePage === 'services' || activePage === 'service-detail';

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-200 ${headerSurfaceClass}`}
    >
      <motion.div
        initial={shouldReduceMotion ? false : 'hidden'}
        animate="visible"
        variants={navVariants}
        className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 lg:h-20 flex items-center justify-between gap-3 lg:gap-8"
      >
        {/* Zone 1: Official SAMITECH Corporation Brand Logo */}
        <button
          type="button"
          onClick={() => handleMobileNav('home')}
          className="inline-flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0000FF] rounded-sm cursor-pointer"
          aria-label="SAMITECH Corporation Home"
        >
          <img
            src="/assets/aistudio/Samitech_Corporation_Logo_7401e1c3.png"
            alt="SAMITECH Corporation"
            width={2172}
            height={724}
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            className={`h-7 sm:h-8 lg:h-11 w-auto object-contain shrink-0 transition-all duration-200 ${
              useDarkText ? 'footer-logo-glow' : ''
            }`}
          />
        </button>

        {/* Zone 2: Desktop Single-Line Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-4 lg:gap-7"
        >
          <button
            type="button"
            onClick={() => handleMobileNav('home')}
            className={activePage === 'home' ? activeLinkClass : navLinkClass}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => handleMobileNav('about')}
            className={activePage === 'about' ? activeLinkClass : navLinkClass}
          >
            About
          </button>

          {/* Desktop Services Mega-Dropdown (9 Deep Service Pages + General Overview) */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setServicesDropdownOpen((prev) => !prev)}
              aria-expanded={servicesDropdownOpen}
              aria-haspopup="true"
              className={`inline-flex items-center gap-1 ${
                isServicesActive ? activeLinkClass : navLinkClass
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform duration-200 ${
                  servicesDropdownOpen ? 'rotate-180' : ''
                }`}
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {servicesDropdownOpen && (
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: SAMITECH_EASE }}
                  className="absolute left-1/2 -translate-x-1/3 top-full mt-3 w-[560px] max-w-[92vw] rounded-2xl bg-white border border-[#0044FF]/15 shadow-2xl p-3 z-50 origin-top"
                >
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#F2F6FF] border border-[#0044FF]/10 mb-2">
                    <div>
                      <div className="text-xs font-bold text-[#07133B]">
                        All SAMITECH Services
                      </div>
                      <div className="text-[11px] text-slate-600">
                        From 15-day Product Scope to AI, Custom Software &amp; Cybersecurity
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleOpenServicesOverview}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#002BFF] hover:bg-[#001ACC] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>View Services Page</span>
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-1">
                    {ALL_SERVICES_CATALOG.map((service) => {
                      const isCurrent =
                        activePage === 'service-detail' && selectedServiceSlug === service.slug;
                      return (
                        <button
                          key={service.slug}
                          type="button"
                          onClick={() => handleOpenServiceDetail(service.slug)}
                          className={`w-full text-left px-2.5 py-2 rounded-xl transition-colors flex items-start gap-2.5 cursor-pointer group ${
                            isCurrent
                              ? 'bg-[#EEF3FF] border border-[#0044FF]/20'
                              : 'hover:bg-[#F2F6FF]'
                          }`}
                        >
                          <div className="mt-0.5 w-8 h-8 rounded-lg bg-[#F8FAFF] border border-slate-200/80 group-hover:border-[#0044FF]/30 flex items-center justify-center shrink-0 transition-colors">
                            <ServiceWireframeIcon slug={service.slug} className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[#07133B] group-hover:text-[#002BFF] transition-colors truncate">
                              {service.title}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1">
                              {service.shortDesc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => handleMobileNav('projects')}
            className={activePage === 'projects' ? activeLinkClass : navLinkClass}
          >
            Projects
          </button>

          <button
            type="button"
            onClick={() => handleMobileNav('careers')}
            className={activePage === 'careers' ? activeLinkClass : navLinkClass}
          >
            Careers
          </button>

          <button
            type="button"
            onClick={() => handleMobileNav('contact')}
            className={activePage === 'contact' ? activeLinkClass : navLinkClass}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Desktop CTA + Mobile Compact Action & Animated Menu Icon */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 text-xs lg:text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#DC0914] to-[#950606] hover:from-[#B90610] hover:to-[#7A0404] shadow-sm transition-all duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC0914]"
          >
            <span>Get In Touch</span>
            <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4" strokeWidth={1.75} aria-hidden="true" />
          </button>

          {/* Mobile Menu Icon Button (44x44px touch target) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className={`md:hidden relative w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 ${
              useDarkText
                ? 'bg-white/10 border-white/20 text-white hover:bg-white/15 focus-visible:outline-white'
                : 'bg-white/95 border-[#0044FF]/20 text-[#07133B] hover:border-[#0044FF]/45 hover:bg-[#F2F6FF] shadow-xs focus-visible:outline-[#0000FF]'
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line
                x1="4"
                y1="7"
                x2="20"
                y2="7"
                className={`origin-center transition-transform duration-200 ease-out ${
                  mobileMenuOpen ? 'translate-y-[5px] rotate-45' : ''
                }`}
              />
              <line
                x1="4"
                y1="12"
                x2="20"
                y2="12"
                className={`transition-opacity duration-150 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <line
                x1="4"
                y1="17"
                x2="20"
                y2="17"
                className={`origin-center transition-transform duration-200 ease-out ${
                  mobileMenuOpen ? '-translate-y-[5px] -rotate-45' : ''
                }`}
              />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Mobile Animated Dropdown Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: SAMITECH_EASE }}
            className="md:hidden bg-white/98 backdrop-blur-md border-t border-slate-200/80 shadow-2xl max-h-[calc(100vh-3.5rem)] overflow-y-auto"
          >
            <nav aria-label="Mobile navigation" className="px-4 py-4 space-y-1">
              <button
                type="button"
                onClick={() => handleMobileNav('home')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  activePage === 'home'
                    ? 'bg-[#EEF3FF] text-[#002BFF]'
                    : 'text-[#07133B] hover:bg-slate-50'
                }`}
              >
                <span>Home</span>
                {activePage === 'home' && (
                  <span className="text-[11px] font-medium text-[#002BFF]">Active</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleMobileNav('about')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  activePage === 'about'
                    ? 'bg-[#EEF3FF] text-[#002BFF]'
                    : 'text-[#07133B] hover:bg-slate-50'
                }`}
              >
                <span>About Us</span>
                {activePage === 'about' && (
                  <span className="text-[11px] font-medium text-[#002BFF]">Active</span>
                )}
              </button>

              {/* Expandable Services Accordion Inside Mobile Drawer */}
              <div className="rounded-xl border border-slate-200/80 bg-[#F8FAFF] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((prev) => !prev)}
                  aria-expanded={mobileServicesOpen}
                  className={`w-full flex items-center justify-between px-3.5 py-3 text-sm font-semibold transition-colors cursor-pointer ${
                    isServicesActive ? 'text-[#002BFF]' : 'text-[#07133B] hover:text-[#002BFF]'
                  }`}
                >
                  <span>Services (10 Capabilities)</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#002BFF] transition-transform duration-200 ${
                      mobileServicesOpen ? 'rotate-180' : ''
                    }`}
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: SAMITECH_EASE }}
                      className="overflow-hidden border-t border-slate-200/70 bg-white"
                    >
                      <div className="p-2 space-y-1">
                        <button
                          type="button"
                          onClick={handleOpenServicesOverview}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold text-[#002BFF] bg-[#F2F6FF] hover:bg-[#E3EEFF] transition-colors cursor-pointer"
                        >
                          <span>View General Services Page</span>
                          <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                        </button>
                        <div className="border-t border-slate-100 my-1" />
                        {ALL_SERVICES_CATALOG.map((service) => (
                          <button
                            key={service.slug}
                            type="button"
                            onClick={() => handleOpenServiceDetail(service.slug)}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F2F6FF] transition-colors flex items-center gap-2.5 cursor-pointer"
                          >
                            <div className="w-7 h-7 rounded-lg bg-[#F8FAFF] border border-slate-200/80 flex items-center justify-center shrink-0">
                              <ServiceWireframeIcon slug={service.slug} className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-[#07133B]">
                                {service.title}
                              </div>
                              <div className="text-[11px] text-slate-500 truncate">
                                {service.shortDesc}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={() => handleMobileNav('projects')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  activePage === 'projects'
                    ? 'bg-[#EEF3FF] text-[#002BFF]'
                    : 'text-[#07133B] hover:bg-slate-50'
                }`}
              >
                <span>Projects Portfolio</span>
                {activePage === 'projects' && (
                  <span className="text-[11px] font-medium text-[#002BFF]">Active</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleMobileNav('careers')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  activePage === 'careers'
                    ? 'bg-[#EEF3FF] text-[#002BFF]'
                    : 'text-[#07133B] hover:bg-slate-50'
                }`}
              >
                <span>Careers &amp; Open Roles</span>
                {activePage === 'careers' && (
                  <span className="text-[11px] font-medium text-[#002BFF]">Active</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleMobileNav('contact')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  activePage === 'contact'
                    ? 'bg-[#EEF3FF] text-[#002BFF]'
                    : 'text-[#07133B] hover:bg-slate-50'
                }`}
              >
                <span>Contact Us</span>
                {activePage === 'contact' && (
                  <span className="text-[11px] font-medium text-[#002BFF]">Active</span>
                )}
              </button>

              {/* Mobile Direct Contact Summary Container */}
              <div className="pt-3 mt-2 border-t border-slate-200/80 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${COMPANY_CONTACT.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#F2F6FF] border border-[#0044FF]/12 text-xs font-medium text-[#07133B]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#002BFF] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    <span className="truncate">{COMPANY_CONTACT.phone}</span>
                  </a>
                  <a
                    href={`mailto:${COMPANY_CONTACT.email}`}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#F2F6FF] border border-[#0044FF]/12 text-xs font-medium text-[#07133B]"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#002BFF] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    <span className="truncate">{COMPANY_CONTACT.email}</span>
                  </a>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
