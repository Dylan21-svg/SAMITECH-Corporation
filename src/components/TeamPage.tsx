import { ArrowRight, MapPin } from 'lucide-react';
import {
  TEAM_HERO_MEDIA,
  TEAM_MEMBERS,
  TEAM_PROOF_STATS,
} from '../data/teamData';
import { Reveal } from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';

interface TeamPageProps {
  onSelectMember: (slug: string) => void;
  onOpenContact: (defaultCategory?: string) => void;
  onNavigateCareers: () => void;
  onNavigateAbout: () => void;
}

export function TeamPage({
  onSelectMember,
  onOpenContact,
  onNavigateCareers,
  onNavigateAbout,
}: TeamPageProps) {
  return (
    <div className="bg-white text-[#07133B]">
      {/* HERO SECTION, Editorial Split With Full-Bleed SAMITECH Team Backdrop */}
      <section className="relative overflow-hidden bg-[#EBF2FF] border-b border-[#0044FF]/10">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <ResilientImage
            src={TEAM_HERO_MEDIA.image}
            alt={TEAM_HERO_MEDIA.alt}
            fallbackTitle="SAMITECH Corporation Executive Leadership"
            width={TEAM_HERO_MEDIA.width}
            height={TEAM_HERO_MEDIA.height}
            priority
            className="w-full h-full object-cover object-[74%_20%] sm:object-right-top lg:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/30 lg:from-white/95 lg:via-white/75 lg:to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
            <Reveal
              immediate
              direction="left"
              wrapperClassName="lg:col-span-6"
              className="space-y-4 sm:space-y-5 max-w-xl"
            >
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#002BFF] tracking-tight">
                <span className="w-5 h-[2px] bg-[#0044FF] rounded-full" aria-hidden="true" />
                <span>SAMITECH Corporation · Executive Leadership</span>
              </div>

              <h1
                className="font-extrabold tracking-tight leading-[1.06] text-balance text-[#07133B]"
                style={{ fontSize: 'clamp(2rem, 4.2vw, 3.6rem)' }}
              >
                Meet the Leadership Behind{' '}
                <span className="text-[#002BFF]">SAMITECH</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed max-w-lg">
                Guided by hands on technologists across telecommunications, scalable Python &amp;
                SaaS operations, full stack architecture, data engineering, AI, and IoT systems.
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenContact()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#002BFF] to-[#0055FF] hover:from-[#001ACC] hover:to-[#003CE6] shadow-md shadow-[#002BFF]/20 transition-all duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FF]"
                >
                  <span>Work With Our Team</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onNavigateCareers}
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-[#07133B] bg-white border border-slate-300 hover:border-[#0044FF]/50 hover:bg-[#F2F6FF] rounded-full shadow-xs transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FF]"
                >
                  <span>Explore Open Roles</span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROOF BAR, Unboxed 4-Column Tabular Metrics */}
      <section className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 lg:divide-x lg:divide-slate-200/80">
            {TEAM_PROOF_STATS.map((stat) => (
              <div key={stat.label} className="lg:px-6 lg:first:pl-0 lg:last:pr-0 min-w-0">
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#07133B] tabular-nums leading-none">
                  {stat.value}
                </div>
                <div className="mt-1.5 text-xs sm:text-sm font-medium text-slate-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXECUTIVE LEADERSHIP SHOWCASE (CEO · COO · CTO) */}
      <section className="py-14 sm:py-18 lg:py-24 bg-[#F8FAFF] overflow-x-clip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="top" className="max-w-2xl mx-auto text-center space-y-2.5 mb-10 sm:mb-14">
            <div className="text-xs sm:text-sm font-semibold text-[#002BFF]">
              CEO · COO · CTO
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#07133B] text-balance">
              Our Executive{' '}
              <span className="text-[#002BFF]">Leadership</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every engagement at SAMITECH Corporation is anchored directly by our founding and
              executive leadership, combining telecommunications infrastructure, operational software
              engineering, and multidisciplinary systems architecture.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <Reveal
                key={member.id}
                direction="bottom"
                delay={0.05 + index * 0.08}
                wrapperClassName="h-full"
                className="h-full"
              >
                <article className="group h-full flex flex-col bg-white rounded-2xl border border-slate-200/90 hover:border-[#0044FF]/35 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(4,11,41,0.08)]">
                  <button
                    type="button"
                    onClick={() => onSelectMember(member.id)}
                    className="relative aspect-[4/4.4] w-full overflow-hidden bg-[#EEF3FF] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FF]"
                    aria-label={`Read full profile of ${member.name}, ${member.role}`}
                  >
                    <ResilientImage
                      src={member.image}
                      alt={member.imageAlt}
                      fallbackTitle={member.name}
                      width={member.width}
                      height={member.height}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </button>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2.5">
                      {/* Clean unboxed typographic metadata */}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs font-medium text-slate-500">
                        <span className="text-[#002BFF] font-bold">{member.executiveTitle}</span>
                        <span aria-hidden="true">·</span>
                        <span>{member.focusLabel}</span>
                      </div>

                      <div>
                        <h3 className="text-xl font-extrabold tracking-tight text-[#07133B] leading-snug">
                          {member.name}
                        </h3>
                        <p className="text-sm font-semibold text-slate-700 mt-0.5">
                          {member.role}
                        </p>
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed pt-1">
                        {member.bio}
                      </p>

                      <div className="pt-2 border-t border-slate-100">
                        <p className="text-xs font-medium text-slate-500 leading-relaxed">
                          {member.specialties.join(' · ')}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-[#002BFF]" strokeWidth={1.75} aria-hidden="true" />
                        <span>{member.location}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => onSelectMember(member.id)}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#002BFF] hover:text-[#DC0914] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0000FF] rounded-sm"
                      >
                        <span>Read Full Profile</span>
                        <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DARK CORPORATE CTA BAND, Partner or Join */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="bottom">
            <div
              id="team-cta-card"
              className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#070B19] via-[#0B1740] to-[#081F5C] text-white p-7 sm:p-10 lg:p-12 border border-white/10 shadow-[0_20px_44px_rgba(4,11,41,0.18)]"
            >
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2.5 max-w-2xl">
                  <div className="text-xs sm:text-sm font-semibold text-[#93C5FD]">
                    Collaborate or Build Your Career With Us
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white text-balance">
                    Ready to work directly with our leadership?
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Whether you are launching a resilient network, architecting a Python SaaS
                    platform, or building AI and IoT solutions across fintech, automation, or
                    digital agriculture, let’s talk.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => onOpenContact()}
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-[#07133B] bg-white hover:bg-[#EEF3FF] rounded-full shadow-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={onNavigateCareers}
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/18 border border-white/25 rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span>View Open Roles</span>
                  </button>

                  <button
                    type="button"
                    onClick={onNavigateAbout}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-[#93C5FD] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Read Our Story</span>
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
