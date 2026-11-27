import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Globe,
  MessageCircle,
  Radio,
  Users,
} from 'lucide-react';
import {
  COMMUNITY_FILTERS,
  SAMITECH_COMMUNITIES,
  type CommunityPlatform,
} from '../data/communitiesData';
import { Reveal } from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';

interface CommunitiesPageProps {
  onOpenContact: (defaultCategory?: string) => void;
  onNavigateCareers: () => void;
}

function renderPlatformIcon(platform: CommunityPlatform) {
  if (platform === 'website') {
    return <Globe className="w-5 h-5" strokeWidth={1.85} aria-hidden="true" />;
  }
  if (platform === 'whatsapp-channel') {
    return <Radio className="w-5 h-5" strokeWidth={1.85} aria-hidden="true" />;
  }
  return <MessageCircle className="w-5 h-5" strokeWidth={1.85} aria-hidden="true" />;
}

export function CommunitiesPage({
  onOpenContact,
  onNavigateCareers,
}: CommunitiesPageProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'websites' | 'whatsapp'>('all');

  const filteredCommunities = SAMITECH_COMMUNITIES.filter((item) => {
    if (activeFilter === 'websites') return item.platform === 'website';
    if (activeFilter === 'whatsapp') {
      return item.platform === 'whatsapp-group' || item.platform === 'whatsapp-channel';
    }
    return true;
  });

  return (
    <div className="bg-white text-[#07133B] overflow-x-clip">
      {/* DARK ARCHITECTURAL COMMUNITIES HERO */}
      <section
        id="communities-dark-hero"
        className="relative overflow-hidden bg-gradient-to-br from-[#040B29] via-[#07194E] to-[#0A256E] text-white pt-24 sm:pt-32 lg:pt-36 pb-16 sm:pb-24"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(96,165,250,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(96,165,250,0.18) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <Reveal
              immediate
              direction="left"
              wrapperClassName="lg:col-span-7"
              className="space-y-5"
            >
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#7DD3FC]">
                <Users className="w-4 h-4" strokeWidth={1.85} aria-hidden="true" />
                <span>SAMITECH Communities</span>
              </div>

              <h1
                className="font-extrabold tracking-tight leading-[1.06] text-balance text-white"
                style={{ fontSize: 'clamp(2rem, 4.3vw, 3.6rem)' }}
              >
                Where Builders, Learners &amp;{' '}
                <span className="text-[#60A5FA]">Innovators Connect</span>
              </h1>

              <p className="max-w-2xl text-sm sm:text-base text-slate-200 leading-relaxed">
                Explore every ecosystem, independent platform, and WhatsApp community powered by
                SAMITECH Corporation—designed to help engineers, students, and technology teams
                learn, collaborate, and stay updated.
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3.5">
                <a
                  href="#communities-directory"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#002BFF] hover:bg-[#001ACC] text-white text-sm font-semibold shadow-lg shadow-[#002BFF]/30 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Browse Communities</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={onNavigateCareers}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/16 border border-white/20 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Explore Internships</span>
                </button>
              </div>
            </Reveal>

            {/* Right Quick Ecosystem Summary Card */}
            <Reveal immediate direction="right" delay={0.08} wrapperClassName="lg:col-span-5">
              <div className="rounded-2xl bg-[#07133B]/90 border border-white/15 p-6 space-y-4 shadow-2xl">
                <div className="text-xs font-mono font-semibold text-[#93C5FD]">
                  Active Hubs &amp; Channels
                </div>
                <div className="divide-y divide-white/10">
                  {SAMITECH_COMMUNITIES.map((community) => (
                    <a
                      key={community.id}
                      href={community.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3 group"
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-white group-hover:text-[#93C5FD] transition-colors truncate">
                          {community.name}
                        </div>
                        <div className="text-xs text-slate-300 truncate">
                          {community.platformLabel} · {community.domainOrHandle}
                        </div>
                      </div>
                      <ArrowUpRight
                        className="w-4 h-4 text-[#60A5FA] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        aria-hidden="true"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DIRECTORY SECTION */}
      <section id="communities-directory" className="py-14 sm:py-18 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs sm:text-sm font-bold text-[#0038FF]">
                Ecosystem Directory
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#07133B] text-balance">
                Official SAMITECH{' '}
                <span className="text-[#DC0914]">Communities</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Join our standalone tech platforms and direct WhatsApp channels across engineering,
                networking, and youth mentorship.
              </p>
            </div>

            {/* Interactive Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter communities by platform"
              className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#F2F6FF] border border-[#DCE8FF] self-start md:self-auto overflow-x-auto max-w-full"
            >
              {COMMUNITY_FILTERS.map((filter) => {
                const isSelected = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-white text-[#07133B] shadow-xs border border-[#DCE8FF]'
                        : 'text-slate-600 hover:text-[#002BFF]'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredCommunities.map((community, index) => (
              <Reveal
                key={community.id}
                direction="bottom"
                delay={0.05 + index * 0.06}
                wrapperClassName="h-full"
                className="h-full"
              >
                <article className="group h-full flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[#F4F8FF]/85 to-white border border-[#DCE8FF] hover:border-[#0044FF]/45 p-6 sm:p-7 shadow-[0_8px_24px_rgba(4,11,41,0.04)] hover:shadow-[0_18px_36px_rgba(0,68,255,0.10)] transition-all duration-200">
                  <div className="space-y-4">
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
                            community.imageFit === 'contain' ? 'object-contain p-3' : 'object-cover'
                          } group-hover:scale-[1.03] transition-transform duration-300`}
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center border border-[#DCE8FF] bg-white"
                        style={{ color: community.accentColor }}
                      >
                        {renderPlatformIcon(community.platform)}
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400 tabular-nums">
                        {community.number}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 min-w-0">
                        <span style={{ color: community.accentColor }} className="font-semibold shrink-0">
                          {community.platformLabel}
                        </span>
                        <span aria-hidden="true" className="shrink-0">·</span>
                        <span className="font-mono truncate min-w-0">{community.domainOrHandle}</span>
                      </div>

                      <h3 className="text-xl font-extrabold text-[#07133B] group-hover:text-[#002BFF] transition-colors">
                        {community.name}
                      </h3>

                      <div className="text-xs sm:text-sm font-semibold text-[#07133B]/80">
                        {community.subtitle}
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed pt-1">
                        {community.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200/75 space-y-2">
                      <div className="text-xs font-semibold text-slate-500">
                        What You Get
                      </div>
                      <ul className="space-y-1.5">
                        {community.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-start gap-2 text-xs sm:text-[13px] font-medium text-[#07133B] leading-snug"
                          >
                            <Check
                              className="w-3.5 h-3.5 shrink-0 mt-0.5"
                              style={{ color: community.accentColor }}
                              strokeWidth={2.25}
                              aria-hidden="true"
                            />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-200/75 flex items-center justify-between gap-3">
                    <a
                      href={community.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white shadow-sm transition-all duration-150 whitespace-nowrap shrink-0"
                      style={{ backgroundColor: community.accentColor }}
                    >
                      <span>{community.ctaLabel}</span>
                      <ArrowUpRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY PARTNERSHIP CTA */}
      <section className="pb-14 sm:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#051033] text-white p-7 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#1E3A8A]/40 shadow-[0_20px_45px_rgba(4,11,41,0.2)]">
            <div className="space-y-1.5 max-w-xl">
              <div className="text-xs font-semibold text-[#60A5FA]">
                Collaborate &amp; Partner
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Want to Partner With a SAMITECH Community?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Reach out to collaborate on technical workshops, student mentorship cohorts, or
                developer ecosystem initiatives.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenContact('Internships & Training')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#E3EEFF] text-[#07133B] text-sm font-bold shadow-md transition-colors whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
