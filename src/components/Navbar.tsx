import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { SERVICES } from '../data/samitechData';
import {
  createRevealVariants,
  SAMITECH_DURATION,
  useMotionConfigValues,
} from './MotionPrimitives';

interface NavbarProps {
  activePage: 'home' | 'about';
  onNavigate: (page: 'home' | 'about', sectionId?: string) => void;
  onOpenContact: (defaultCategory?: string) => void;
}

export function Navbar({ activePage, onNavigate, onOpenContact }: NavbarProps) {
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [overDarkSection, setOverDarkSection] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { distance, shouldReduceMotion } = useMotionConfigValues();
  const navVariants = createRevealVariants('right', distance, 0, SAMITECH_DURATION);

  useEffect(() => {
    const checkSectionUnderNav = () => {
      const darkIds = ['why-samitech-card', 'faq-card', 'about-values-card', 'contact-footer'];
      const isDark = darkIds.some((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 42 && rect.bottom >= 18;
      });
      setOverDarkSection(isDark);
    };

    checkSectionUnderNav();
    window.addEventListener('scroll', checkSectionUnderNav, { passive: true });
    window.addEventListener('resize', checkSectionUnderNav, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkSectionUnderNav);
      window.removeEventListener('resize', checkSectionUnderNav);
    };
  }, [activePage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleSelectServiceFromMenu = (category: string) => {
    setServicesDropdownOpen(false);
    onNavigate('home', 'services');
    onOpenContact(category);
  };

  const navLinkClass = overDarkSection
    ? 'text-[9px] sm:text-xs lg:text-sm font-medium text-white/95 hover:text-[#93C5FD] transition-colors whitespace-nowrap shrink-0 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white rounded-sm cursor-pointer'
    : 'text-[9px] sm:text-xs lg:text-sm font-medium text-[#07133B] hover:text-[#0000FF] transition-colors whitespace-nowrap shrink-0 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0000FF] rounded-sm cursor-pointer';

  const activeLinkClass = overDarkSection
    ? "text-[9px] sm:text-xs lg:text-sm font-semibold relative py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1.5px] sm:after:h-[2px] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm transition-colors text-white after:bg-white focus-visible:outline-white cursor-pointer"
    : "text-[9px] sm:text-xs lg:text-sm font-semibold relative py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1.5px] sm:after:h-[2px] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm transition-colors text-[#0000FF] after:bg-[#0000FF] focus-visible:outline-[#0000FF] cursor-pointer";

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-transparent overflow-x-clip">
      <motion.div
        initial={shouldReduceMotion ? false : 'hidden'}
        animate="visible"
        variants={navVariants}
        className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-12 sm:h-16 lg:h-20 flex items-center justify-between gap-1.5 sm:gap-4 lg:gap-6"
      >
        {/* Zone 1: Official SAMITECH Corporation Logo */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0000FF] rounded-sm cursor-pointer"
          aria-label="SAMITECH Corporation Home"
        >
          <img
            src="/assets/aistudio/Samitech_Corporation_Logo_7401e1c3.png"
            alt="SAMITECH Corporation"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            className={`h-5 sm:h-8 lg:h-11 w-auto object-contain shrink-0 transition-all duration-200 ${
              overDarkSection ? 'drop-shadow-[0_0_10px_rgba(255,255,255,0.92)]' : ''
            }`}
          />
        </button>

        {/* Zone 2: Single-line navigation links identical across all viewports */}
        <nav aria-label="Primary navigation" className="flex items-center gap-1.5 sm:gap-4 md:gap-5 lg:gap-7">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={activePage === 'home' ? activeLinkClass : navLinkClass}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => onNavigate('about')}
            className={activePage === 'about' ? activeLinkClass : navLinkClass}
          >
            About
          </button>

          {/* Services Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setServicesDropdownOpen((prev) => !prev)}
              aria-expanded={servicesDropdownOpen}
              className={`inline-flex items-center gap-0.5 sm:gap-1 ${navLinkClass}`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 transition-transform duration-150 ${
                  servicesDropdownOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {servicesDropdownOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 top-full mt-2 w-60 sm:w-72 rounded-xl bg-white border border-[#0044FF]/15 shadow-xl p-1.5 sm:p-2 z-50">
                <button
                  type="button"
                  onClick={() => {
                    setServicesDropdownOpen(false);
                    onNavigate('home', 'services');
                  }}
                  className="w-full text-left block px-2.5 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-xs font-semibold text-[#0000FF] hover:bg-[#F2F6FF] rounded-lg transition-colors cursor-pointer"
                >
                  View All Services
                </button>
                <div className="my-1 border-t border-slate-100" />
                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleSelectServiceFromMenu(service.serviceCategory)}
                    className="w-full text-left px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg hover:bg-[#F2F6FF] transition-colors cursor-pointer"
                  >
                    <div className="text-xs sm:text-sm font-semibold text-[#07133B]">{service.title}</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 line-clamp-1">{service.shortDesc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('home', 'projects')}
            className={navLinkClass}
          >
            Projects
          </button>

          <button
            type="button"
            onClick={() => onNavigate('home', 'careers')}
            className={navLinkClass}
          >
            Careers
          </button>

          <a href="#contact-footer" className={navLinkClass}>
            Contact
          </a>
        </nav>

        {/* Zone 3: Red Rounded-Full Primary CTA */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => onOpenContact()}
            className="inline-flex items-center justify-center gap-1 sm:gap-2 px-2 py-1 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 text-[8.5px] sm:text-xs lg:text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#DC0914] to-[#950606] hover:from-[#B90610] hover:to-[#7A0404] shadow-sm transition-all duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC0914]"
          >
            <span>Get In Touch</span>
            <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </header>
  );
}
