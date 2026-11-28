import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Mail,
  Phone,
} from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import {
  createRevealVariants,
  SAMITECH_EASE,
  useMotionConfigValues,
} from './MotionPrimitives';
import { WhatsAppBrandIcon } from './WhatsAppFloatingButton';

export type AppPage =
  | 'home'
  | 'about'
  | 'team'
  | 'team-member'
  | 'services'
  | 'service-detail'
  | 'products'
  | 'product-detail'
  | 'careers'
  | 'communities'
  | 'projects'
  | 'contact'
  | 'control-panel';

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
  const { settings, buildWhatsAppUrl } = useSiteContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [overDarkSection, setOverDarkSection] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const { distance, shouldReduceMotion } = useMotionConfigValues();
  const navVariants = createRevealVariants('right', distance, 0, 0.55);

  useEffect(() => {
    const checkScrollAndSection = () => {
      setIsScrolled(window.scrollY > 18);

      const darkIds = [
        'why-samitech-card',
        'service-process-card',
        'service-dark-top',
        'service-dark-hero',
        'service-dark-cta',
        'faq-card',
        'about-values-card',
        'team-cta-card',
        'communities-dark-hero',
        'contact-footer',
      ];
      const isDark = darkIds.some((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 48 && rect.bottom >= 18;
      });
      setOverDarkSection(isDark);
    };

    checkScrollAndSection();
    const settledTimer = window.setTimeout(checkScrollAndSection, 260);
    window.addEventListener('scroll', checkScrollAndSection, { passive: true });
    window.addEventListener('resize', checkScrollAndSection, { passive: true });
    return () => {
      window.clearTimeout(settledTimer);
      window.removeEventListener('scroll', checkScrollAndSection);
      window.removeEventListener('resize', checkScrollAndSection);
    };
  }, [activePage, selectedServiceSlug]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
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

  const handleMobileNav = (page: AppPage, target?: string) => {
    setMobileMenuOpen(false);
    onNavigate(page, target);
  };

  const headerSurfaceClass = mobileMenuOpen
    ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm'
    : overDarkSection
      ? 'bg-[#070B19]/85 backdrop-blur-md border-b border-white/10'
      : isScrolled || activePage === 'services' || activePage === 'projects'
        ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/75 shadow-xs'
        : 'bg-white/92 backdrop-blur-md border-b border-slate-200/60 shadow-xs';

  const useDarkText = overDarkSection && !mobileMenuOpen;

  const navLinkClass = useDarkText
    ? 'text-xs lg:text-sm font-medium text-white/90 hover:text-[#93C5FD] transition-colors whitespace-nowrap shrink-0 py-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white rounded-sm cursor-pointer'
    : 'text-xs lg:text-sm font-medium text-[#07133B] hover:text-[#002BFF] transition-colors whitespace-nowrap shrink-0 py-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0000FF] rounded-sm cursor-pointer';

  const activeLinkClass = useDarkText
    ? "text-xs lg:text-sm font-semibold relative py-1.5 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:rounded-full whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm transition-colors text-white after:bg-white focus-visible:outline-white cursor-pointer"
    : "text-xs lg:text-sm font-semibold relative py-1.5 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:rounded-full whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm transition-colors text-[#002BFF] after:bg-[#002BFF] focus-visible:outline-[#0000FF] cursor-pointer";

  const isAboutActive =
    activePage === 'about' || activePage === 'team' || activePage === 'team-member';
  const isServicesActive = activePage === 'services' || activePage === 'service-detail';
  const isProductsActive = activePage === 'products' || activePage === 'product-detail';

  if (activePage === 'control-panel') {
    return null;
  }

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
          className="hidden lg:flex items-center gap-4 xl:gap-5"
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
            className={isAboutActive ? activeLinkClass : navLinkClass}
          >
            About Us
          </button>

          <button
            type="button"
            onClick={() => handleMobileNav('services')}
            className={isServicesActive ? activeLinkClass : navLinkClass}
          >
            Services
          </button>

          <button
            type="button"
            onClick={() => handleMobileNav('products')}
            className={isProductsActive ? activeLinkClass : navLinkClass}
          >
            Products
          </button>

          <button
            type="button"
            onClick={() => handleMobileNav('projects')}
            className={activePage === 'projects' ? activeLinkClass : navLinkClass}
          >
            Projects
          </button>

          <button
            type="button"
            onClick={() => handleMobileNav('communities')}
            className={activePage === 'communities' ? activeLinkClass : navLinkClass}
          >
            Communities
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

          {/* Mobile & Tablet Menu Icon Button (44x44px touch target) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className={`lg:hidden relative w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 ${
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
            className="lg:hidden bg-white/98 backdrop-blur-md border-t border-slate-200/80 shadow-2xl max-h-[calc(100vh-3.5rem)] overflow-y-auto"
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

              <button
                type="button"
                onClick={() => handleMobileNav('team')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  activePage === 'team'
                    ? 'bg-[#EEF3FF] text-[#002BFF]'
                    : 'text-[#07133B] hover:bg-slate-50'
                }`}
              >
                <span>Meet the Team</span>
                {activePage === 'team' && (
                  <span className="text-[11px] font-medium text-[#002BFF]">Active</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleMobileNav('services')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  isServicesActive
                    ? 'bg-[#EEF3FF] text-[#002BFF]'
                    : 'text-[#07133B] hover:bg-slate-50'
                }`}
              >
                <span>Services</span>
                {isServicesActive && (
                  <span className="text-[11px] font-medium text-[#002BFF]">Active</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleMobileNav('products')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  isProductsActive
                    ? 'bg-[#EEF3FF] text-[#002BFF]'
                    : 'text-[#07133B] hover:bg-slate-50'
                }`}
              >
                <span>Products</span>
                {isProductsActive && (
                  <span className="text-[11px] font-medium text-[#002BFF]">Active</span>
                )}
              </button>

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
                onClick={() => handleMobileNav('communities')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  activePage === 'communities'
                    ? 'bg-[#EEF3FF] text-[#002BFF]'
                    : 'text-[#07133B] hover:bg-slate-50'
                }`}
              >
                <span>Communities</span>
                {activePage === 'communities' && (
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
              <div className="pt-3 mt-2 border-t border-slate-200/80 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#F2F6FF] border border-[#0044FF]/12 text-xs font-medium text-[#07133B]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#002BFF] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    <span className="truncate">{settings.phone}</span>
                  </a>
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#F2F6FF] border border-[#0044FF]/12 text-xs font-medium text-[#07133B]"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#002BFF] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    <span className="truncate">{settings.email}</span>
                  </a>
                </div>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#25D366]/12 border border-[#25D366]/35 hover:bg-[#25D366]/20 text-xs font-bold text-[#0F5132] transition-colors"
                >
                  <WhatsAppBrandIcon className="w-4 h-4 text-[#1EBE5D]" />
                  <span>Chat on WhatsApp ({settings.phone})</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
