import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Minus,
  Plus,
} from 'lucide-react';
import { type CaseStudy } from '../../data/samitechData';
import { type ServiceDetail } from '../../data/servicesCatalog';
import { useSiteContent } from '../../context/SiteContentContext';
import { SAMITECH_EASE } from '../MotionPrimitives';
import { ResilientImage } from '../ResilientImage';

export interface ServiceLayoutProps {
  service: ServiceDetail;
  relatedStudy: CaseStudy;
  onOpenContact: (defaultCategory?: string) => void;
  onOpenCaseStudy: (study: CaseStudy) => void;
}

const TECH_ACCENT_MAP: Record<string, string> = {
  React: '#0284C7',
  TypeScript: '#2563EB',
  'Next.js': '#0F172A',
  Vue: '#059669',
  'Node.js': '#16A34A',
  PostgreSQL: '#1D4ED8',
  'Tailwind CSS': '#0EA5E9',
  Docker: '#2563EB',
  Python: '#2563EB',
  Flutter: '#0284C7',
  'React Native': '#0284C7',
  Figma: '#DB2777',
  'Adobe Illustrator': '#EA580C',
  Starlink: '#0284C7',
  'Ubiquiti UniFi': '#0038FF',
  MikroTik: '#0F172A',
  'Cat6 / Fiber LAN': '#0284C7',
  'PtP Wireless Bridges': '#0EA5E9',
  OpenVPN: '#EA580C',
  'VLAN Segmentation': '#1D4ED8',
  'Windows / Linux / macOS': '#0F766E',
  'NVMe SSD & RAM Upgrades': '#0284C7',
  'PXE / Lab OS Imaging': '#0F766E',
  'UPS Power Protection': '#D97706',
  'Cat6 Lab LAN': '#0038FF',
  'Preventative Diagnostics': '#0F766E',
  'PoE IP Cameras': '#DC0914',
  'NVR / DVR Storage': '#07133B',
  'Color Night Vision': '#0284C7',
  'Mobile Remote View': '#0038FF',
  'Firewall & Zero Trust': '#DC0914',
  'OWASP Pentesting': '#DC0914',
  'React / Node.js': '#0284C7',
  'Figma & Graphics': '#DB2777',
  'Starlink & LAN Ops': '#0284C7',
  'IT & CCTV Support': '#EA580C',
  'GitHub / Jira': '#1E293B',
  '24/7 Operations Desk': '#07133B',
  'MTN MoMo Intake': '#CA8A04',
  'IMEI Telemetry': '#0038FF',
  'GPS / IoT Tracing': '#DC0914',
};

export function getTechBadgeColor(tech: string, fallback = '#0038FF'): string {
  return TECH_ACCENT_MAP[tech] ?? fallback;
}

export function ServiceTopSwitcher({
  service,
  darkMode = false,
  onBackToServices,
  onSelectService,
}: {
  service: ServiceDetail;
  darkMode?: boolean;
  onBackToServices: () => void;
  onSelectService: (slug: string) => void;
}) {
  const { services } = useSiteContent();

  return (
    <div
      id={darkMode ? 'service-dark-top' : undefined}
      className={`pt-16 sm:pt-20 lg:pt-24 border-b transition-colors ${
        darkMode
          ? 'bg-[#040B29] border-white/10 text-white'
          : 'bg-[#F3F7FF] border-[#D5E4FF]/80 text-[#07133B]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <button
          type="button"
          onClick={onBackToServices}
          className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0038FF] rounded-sm ${
            darkMode
              ? 'text-[#93C5FD] hover:text-white'
              : 'text-[#0038FF] hover:text-[#DC0914]'
          }`}
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
          <span>All Services</span>
        </button>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {services.map((item) => {
            const isCurrent = item.slug === service.slug;
            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => onSelectService(item.slug)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isCurrent
                    ? darkMode
                      ? 'bg-white text-[#07133B]'
                      : 'bg-[#07133B] text-white'
                    : darkMode
                      ? 'bg-white/8 text-slate-300 hover:bg-white/15 hover:text-white border border-white/10'
                      : 'bg-white/90 text-slate-600 hover:text-[#0038FF] border border-slate-200/80'
                }`}
              >
                {item.number}. {item.title}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ServiceProofAndFaqBand({
  service,
  relatedStudy,
  accentColor = '#0038FF',
  surfaceClass = 'bg-[#F8FAFF]',
  onOpenCaseStudy,
}: {
  service: ServiceDetail;
  relatedStudy: CaseStudy;
  accentColor?: string;
  surfaceClass?: string;
  onOpenCaseStudy: (study: CaseStudy) => void;
}) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    setOpenFaqIndex(0);
  }, [service.slug]);

  return (
    <section className={`py-12 sm:py-16 border-t border-slate-200/80 ${surfaceClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Case Study Proof */}
          <div className="lg:col-span-5 space-y-3">
            <div
              className="text-xs font-bold tracking-tight"
              style={{ color: accentColor }}
            >
              Verified Execution Proof
            </div>
            <button
              type="button"
              onClick={() => onOpenCaseStudy(relatedStudy)}
              className="group relative aspect-[16/11] w-full rounded-2xl overflow-hidden bg-[#040B29] text-left cursor-pointer shadow-[0_14px_34px_rgba(4,11,41,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0038FF]"
            >
              <ResilientImage
                src={relatedStudy.image}
                alt={relatedStudy.imageAlt}
                fallbackTitle={relatedStudy.title}
                width={relatedStudy.imageWidth}
                height={relatedStudy.imageHeight}
                darkSkeleton
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040B29]/95 via-[#040B29]/45 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#DBEAFE]">
                  <span>{relatedStudy.sector}</span>
                  <span aria-hidden="true">·</span>
                  <span>{relatedStudy.location}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {relatedStudy.title}
                </h3>
                <div className="pt-1.5 flex items-center justify-between border-t border-white/15">
                  <span className="font-mono tabular-nums text-xs font-semibold text-[#93C5FD]">
                    {relatedStudy.metrics[0].value} {relatedStudy.metrics[0].label}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-white">
                    <span>Inspect Study</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Service FAQs + Deliverables Checklist */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#07133B] tracking-tight">
                Frequently Asked About {service.title}
              </h2>
              <div className="space-y-2.5">
                {service.faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={faq.question}
                      className={`rounded-xl border bg-white transition-colors ${
                        isOpen ? 'border-[#0038FF]/35 shadow-xs' : 'border-slate-200'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        className="w-full px-4 py-3.5 flex items-center gap-3 text-left cursor-pointer"
                      >
                        <span
                          className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors"
                          style={{
                            backgroundColor: isOpen ? accentColor : '#F2F6FF',
                            color: isOpen ? '#FFFFFF' : '#07133B',
                          }}
                          aria-hidden="true"
                        >
                          {isOpen ? (
                            <Minus className="w-3.5 h-3.5" strokeWidth={2} />
                          ) : (
                            <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                          )}
                        </span>
                        <span className="text-sm font-bold text-[#07133B]">
                          {faq.question}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: SAMITECH_EASE }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 sm:pl-13 pr-4 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/80">
              <div className="text-xs font-bold text-slate-500 mb-2.5">
                Included Deliverables
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.deliverables.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2 text-xs sm:text-sm font-medium text-[#07133B]"
                  >
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: accentColor }}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceBottomPager({
  prevService,
  nextService,
  onSelectService,
}: {
  prevService: ServiceDetail;
  nextService: ServiceDetail;
  onSelectService: (slug: string) => void;
}) {
  return (
    <div className="bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onSelectService(prevService.slug)}
          className="inline-flex items-center gap-2 text-left text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#0038FF] transition-colors cursor-pointer min-w-0"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
          <span>Previous: {prevService.title}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectService(nextService.slug)}
          className="inline-flex items-center gap-2 text-right text-xs sm:text-sm font-semibold text-[#0038FF] hover:text-[#DC0914] transition-colors cursor-pointer min-w-0 ml-auto"
        >
          <span>Next: {nextService.title}</span>
          <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
