import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  MapPin,
  X,
} from 'lucide-react';
import { CAREERS_SHOWCASE_MEDIA } from '../data/servicesCatalog';
import { Reveal, SAMITECH_EASE } from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';
import { CareerFeatureIcon, SolidBriefcaseIcon } from './ShowcaseIcons';

interface CareersPageProps {
  onOpenContact: (defaultCategory?: string) => void;
}

interface CareerOpening {
  id: string;
  title: string;
  location: string;
  department: string;
  type: string;
  summary: string;
  requirements: string[];
}

const WHY_WORK_ITEMS = [
  {
    id: 'innovative-projects',
    title: 'Innovative Projects',
    description: 'Ship impactful software, AI, and security systems across Africa & beyond.',
  },
  {
    id: 'supportive-team',
    title: 'Supportive Team',
    description: 'Collaborate with curious, approachable senior engineers in Buea and remotely.',
  },
  {
    id: 'career-growth',
    title: 'Career Growth',
    description: 'Structured mentorship, certifications, and real architectural ownership.',
  },
  {
    id: 'competitive-benefits',
    title: 'Competitive Benefits',
    description: 'Performance stipends, flexible hybrid schedules, and continuous learning perks.',
  },
];

const CAREER_OPENINGS: CareerOpening[] = [
  {
    id: 'fullstack-developer',
    title: 'Fullstack Developer',
    location: 'Remote / Buea',
    department: 'Product Engineering',
    type: 'Full-Time',
    summary:
      'Build scalable React, TypeScript, Node.js, and PostgreSQL web applications and client API integrations.',
    requirements: [
      '2+ years shipping production TypeScript, React, and Node.js applications',
      'Strong relational database design (PostgreSQL) & REST/GraphQL API skills',
      'Experience deploying Dockerized services and CI/CD pipelines',
    ],
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    location: 'Remote',
    department: 'Data & Applied AI',
    type: 'Full-Time',
    summary:
      'Design private RAG knowledge pipelines, predictive analytics models, and intelligent workflow agents.',
    requirements: [
      'Hands-on Python, vector indexing (pgvector), and modern LLM orchestration experience',
      'Track record evaluating model accuracy, latency, and safety guardrails',
      'Familiarity wrapping AI workflows behind clean FastAPI or TypeScript endpoints',
    ],
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    location: 'Remote / Buea',
    department: 'Web & UX Engineering',
    type: 'Full-Time',
    summary:
      'Craft accessible, smooth, pixel-precise React and Tailwind interfaces with clean motion design.',
    requirements: [
      'Strong command of React, TypeScript, Tailwind CSS, and responsive design systems',
      'Eye for WCAG AA contrast, SVG craft, and fast Core Web Vitals performance',
      'Ability to translate Figma designs cleanly without visual drift',
    ],
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    location: 'Infrastructure',
    department: 'Cloud & Network Ops',
    type: 'Full-Time',
    summary:
      'Architect high-availability AWS/Azure deployments, OpenVPN networks, failover routing, and 24/7 telemetry.',
    requirements: [
      'Solid Linux administration, Docker, Nginx, and cloud VPC configuration',
      'Experience setting up automated backups, CI/CD, and multi-ISP VPN stability',
      'Security-first mindset around IAM least privilege and firewall hardening',
    ],
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    location: 'Buea / Remote',
    department: 'Security & Auditing',
    type: 'Full-Time',
    summary:
      'Conduct web, mobile, and network penetration tests alongside OWASP security audits and incident response.',
    requirements: [
      'Practical vulnerability assessment & ethical hacking methodology (OWASP Top 10)',
      'Clear technical reporting and developer remediation collaboration',
      'Network protocol analysis and defense-in-depth hardening experience',
    ],
  },
  {
    id: 'engineering-internships',
    title: 'Engineering & Security Internships',
    location: 'Buea, Cameroon',
    department: 'Mentorship Cohort',
    type: 'Internship (3–6 Mo)',
    summary:
      'Structured hands-on cohorts across Software Engineering, Networking Solutions, and Cybersecurity.',
    requirements: [
      'Strong foundational coding or networking passion and eagerness to ship real projects',
      'Collaborative communication and commitment to weekly mentor code reviews',
      'Available in Buea Silicon Mountain ecosystem or structured hybrid schedule',
    ],
  },
];

export function CareersPage({ onOpenContact }: CareersPageProps) {
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [selectedOpening, setSelectedOpening] = useState<CareerOpening | null>(null);

  const visibleJobs = showAllJobs ? CAREER_OPENINGS : CAREER_OPENINGS.slice(0, 4);

  const scrollToOpenings = () => {
    const el = document.getElementById('current-openings');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white text-[#07133B]">
      {/* HERO SECTION WITH FULL-BLEED SAMITECH TEAM COLLABORATION BACKGROUND */}
      <section className="relative overflow-hidden bg-[#E9F1FF]">
        {/* Full-Bleed Hero Background Artwork */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <ResilientImage
            src={CAREERS_SHOWCASE_MEDIA.teamHero.image}
            alt={CAREERS_SHOWCASE_MEDIA.teamHero.alt}
            fallbackTitle="SAMITECH Corporation Team"
            width={CAREERS_SHOWCASE_MEDIA.teamHero.width}
            height={CAREERS_SHOWCASE_MEDIA.teamHero.height}
            priority
            className="w-full h-full object-cover object-[74%_20%] sm:object-right-top lg:object-center"
          />
          {/* Subtle readability scrim on mobile/tablet where text sits closer to photography; clean left field on lg+ */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/88 via-white/70 to-transparent lg:from-white/30 lg:via-transparent lg:to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <Reveal
              direction="left"
              wrapperClassName="lg:col-span-6"
              className="space-y-4 sm:space-y-5 max-w-xl"
            >
              {/* Join Our Team Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#0044FF]/15 shadow-xs text-xs font-semibold text-[#002BFF]">
                <span className="w-2 h-2 rounded-full bg-[#002BFF]" aria-hidden="true" />
                <span>Join Our Team</span>
              </div>

              <h1
                className="font-extrabold tracking-tight leading-[1.06] text-balance text-[#07133B]"
                style={{ fontSize: 'clamp(1.85rem, 4.2vw, 3.6rem)' }}
              >
                <span className="block">Build Your Career</span>
                <span className="block">
                  at <span className="text-[#002BFF]">SAMITECH</span>
                </span>
              </h1>

              <p className="max-w-md text-xs sm:text-sm lg:text-base text-slate-800 font-medium leading-relaxed">
                Be part of a forward-thinking company where innovation thrives, talent grows,
                and ideas matter.
              </p>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={scrollToOpenings}
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#002BFF] to-[#0055FF] hover:from-[#001ACC] hover:to-[#003CE6] shadow-md shadow-[#002BFF]/25 transition-all duration-150 active:scale-[0.98] whitespace-nowrap cursor-pointer"
                >
                  <span>Browse Open Positions</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                </button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom Subtle Geometric Wave Arch Transition Into White Section Below */}
        <div className="pointer-events-none relative z-10 w-full overflow-hidden leading-none" aria-hidden="true">
          <svg viewBox="0 0 1440 52" preserveAspectRatio="none" className="w-full h-6 sm:h-11 block">
            <path d="M0,44 Q720,-16 1440,44 L1440,52 L0,52 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </section>

      {/* SECTION 2: WHY WORK WITH US? (4 TINT-BLUE CARDS) */}
      <section className="py-10 sm:py-14 lg:py-16 bg-white overflow-x-clip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="top" className="max-w-2xl mx-auto text-center space-y-2 mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center gap-3 w-full">
              <span className="h-px w-10 sm:w-16 bg-slate-300" aria-hidden="true" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#07133B]">
                Why Work With Us?
              </h2>
              <span className="h-px w-10 sm:w-16 bg-slate-300" aria-hidden="true" />
            </div>
            <p className="text-xs sm:text-sm lg:text-base text-slate-600">
              At SAMITECH, we empower our people to innovate, grow and make an impact.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
            {WHY_WORK_ITEMS.map((item, index) => (
              <Reveal
                key={item.id}
                direction="bottom"
                delay={0.04 + index * 0.06}
                wrapperClassName="h-full"
                className="h-full"
              >
                <div className="h-full flex flex-col items-center text-center rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#EDF4FF] to-[#F8FAFF] border border-[#DCE8FF] p-4 sm:p-6 space-y-2.5 shadow-[0_6px_18px_rgba(0,68,255,0.05)]">
                  <div className="h-11 flex items-center justify-center">
                    <CareerFeatureIcon id={item.id} />
                  </div>
                  <h3 className="text-xs sm:text-base font-bold text-[#07133B] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: "MORE THAN A JOB — A PLACE TO GROW" + "CURRENT OPENINGS" */}
      <section id="current-openings" className="pb-14 sm:pb-20 lg:pb-24 bg-white overflow-x-clip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">
            {/* Left Rounded Sunset Mountain Feature Card */}
            <Reveal direction="left" wrapperClassName="lg:col-span-6 h-full" className="h-full">
              <div className="relative h-full min-h-[280px] sm:min-h-[340px] rounded-2xl overflow-hidden bg-[#07133B] shadow-[0_18px_40px_rgba(4,11,41,0.16)] flex items-center">
                <ResilientImage
                  src={CAREERS_SHOWCASE_MEDIA.mountainGrowth.image}
                  alt={CAREERS_SHOWCASE_MEDIA.mountainGrowth.alt}
                  fallbackTitle="Careers at SAMITECH"
                  width={CAREERS_SHOWCASE_MEDIA.mountainGrowth.width}
                  height={CAREERS_SHOWCASE_MEDIA.mountainGrowth.height}
                  darkSkeleton
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Scrim on right side ensuring crisp white copy contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-[#07133B]/65 to-[#07133B]/92" />

                <div className="relative z-10 ml-auto w-full sm:w-[58%] p-6 sm:p-8 text-white space-y-3 sm:space-y-4">
                  <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold tracking-tight leading-tight text-balance">
                    More Than a Job —
                    <span className="block">A Place to Grow</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    At SAMITECH, you’ll work on exciting projects, learn from industry experts,
                    and be part of a dynamic team.
                  </p>
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => onOpenContact('Internships & Training')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-[#07133B] bg-white hover:bg-[#E3EEFF] rounded-full shadow-md transition-all duration-150 cursor-pointer"
                    >
                      <span>Join Our Team</span>
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right Elevated White Current Openings Card */}
            <Reveal direction="right" delay={0.08} wrapperClassName="lg:col-span-6 h-full" className="h-full">
              <div className="h-full rounded-2xl bg-white border border-[#DCE8FF] shadow-[0_14px_34px_rgba(4,11,41,0.08)] p-5 sm:p-7 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#002BFF]" aria-hidden="true" />
                      <h2 className="text-lg sm:text-xl font-extrabold text-[#07133B]">
                        Current Openings
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Find your next opportunity at SAMITECH.
                    </p>
                  </div>

                  {/* Clean Bordered Job Rows */}
                  <div className="space-y-2.5">
                    {visibleJobs.map((job) => (
                      <button
                        key={job.id}
                        type="button"
                        onClick={() => setSelectedOpening(job)}
                        className="group w-full px-3.5 py-3 rounded-xl bg-white hover:bg-[#F2F6FF] border border-slate-200/90 hover:border-[#0044FF]/40 flex items-center justify-between gap-3 text-left transition-all duration-150 cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex items-center justify-center shrink-0">
                            <SolidBriefcaseIcon />
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-[#07133B] group-hover:text-[#002BFF] transition-colors truncate">
                            {job.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                          <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-slate-500">
                            <MapPin className="w-3.5 h-3.5 text-[#3B82F6]" strokeWidth={1.85} aria-hidden="true" />
                            <span>{job.location}</span>
                          </span>
                          <ChevronRight
                            className="w-4 h-4 text-[#002BFF] group-hover:translate-x-0.5 transition-transform"
                            strokeWidth={1.85}
                            aria-hidden="true"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-center">
                  <button
                    type="button"
                    onClick={() => setShowAllJobs((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#002BFF] hover:text-[#DC0914] transition-colors cursor-pointer"
                  >
                    <span>
                      {showAllJobs
                        ? 'Show Featured Roles Only'
                        : `View All Jobs (${CAREER_OPENINGS.length})`}
                    </span>
                    <ArrowRight className="w-4 h-4" strokeWidth={1.85} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* JOB ROLE DETAIL & QUICK APPLY MODAL */}
      <AnimatePresence>
        {selectedOpening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: SAMITECH_EASE }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060814]/75 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="career-modal-title"
            onClick={() => setSelectedOpening(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: SAMITECH_EASE }}
              className="relative w-full max-w-lg bg-white rounded-2xl border border-[#0044FF]/15 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-[#002BFF] via-[#0044FF] to-[#DC0914]" />
              <button
                type="button"
                onClick={() => setSelectedOpening(null)}
                aria-label="Close role overview"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F4F7FF] hover:bg-[#E3EEFF] text-[#07133B] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </button>

              <div className="p-6 sm:p-7 space-y-5">
                <div className="space-y-1.5 pr-8">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#002BFF]">
                    <span>{selectedOpening.department}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedOpening.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedOpening.type}</span>
                  </div>
                  <h3 id="career-modal-title" className="text-xl sm:text-2xl font-bold text-[#07133B]">
                    {selectedOpening.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed pt-1">
                    {selectedOpening.summary}
                  </p>
                </div>

                <div className="rounded-xl bg-[#F2F6FF] border border-[#0044FF]/10 p-4 space-y-2.5">
                  <div className="text-xs font-bold text-[#07133B] uppercase tracking-wider">
                    What We Look For
                  </div>
                  <ul className="space-y-2">
                    {selectedOpening.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#002BFF] shrink-0 mt-0.5" strokeWidth={1.75} aria-hidden="true" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedOpening(null)}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-[#07133B] hover:bg-[#F2F6FF] rounded-full transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const title = selectedOpening.title;
                      setSelectedOpening(null);
                      onOpenContact(`Careers: ${title}`);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#001AFF] to-[#0044FF] hover:from-[#0000CC] hover:to-[#002BFF] transition-all cursor-pointer"
                  >
                    <span>Apply for This Role</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
