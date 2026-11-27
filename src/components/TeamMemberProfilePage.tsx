import {
  ArrowRight,
  Brain,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Dumbbell,
  Globe,
  GraduationCap,
  Heart,
  Home,
  Laptop,
  Layers,
  Mail,
  MapPin,
  Music,
  Phone,
  Radio,
  Rocket,
  Settings,
  Sprout,
  Trophy,
  User,
  Users,
} from 'lucide-react';
import {
  TEAM_MEMBERS,
  type InterestIconKey,
  type TeamMember,
} from '../data/teamData';
import { Reveal } from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';

interface TeamMemberProfilePageProps {
  member: TeamMember;
  onBackToTeam: () => void;
  onSelectMember: (slug: string) => void;
  onNavigateHome: () => void;
  onOpenContact: (defaultCategory?: string) => void;
}

function renderInterestIcon(icon: InterestIconKey) {
  const cls = 'w-5 h-5 text-[#0038FF]';
  switch (icon) {
    case 'connectivity':
      return <Radio className={cls} strokeWidth={2} aria-hidden="true" />;
    case 'leadership':
      return <Users className={cls} strokeWidth={2} aria-hidden="true" />;
    case 'architecture':
      return <Layers className={cls} strokeWidth={2} aria-hidden="true" />;
    case 'music':
      return <Music className={cls} strokeWidth={2} aria-hidden="true" />;
    case 'design':
      return <Rocket className={cls} strokeWidth={2} aria-hidden="true" />;
    case 'fitness':
      return <Dumbbell className={cls} strokeWidth={2} aria-hidden="true" />;
    case 'ai':
      return <Brain className={cls} strokeWidth={2} aria-hidden="true" />;
    case 'agritech':
      return <Sprout className={cls} strokeWidth={2} aria-hidden="true" />;
    case 'tech':
    default:
      return <Laptop className={cls} strokeWidth={2} aria-hidden="true" />;
  }
}

export function TeamMemberProfilePage({
  member,
  onBackToTeam,
  onSelectMember,
  onNavigateHome,
  onOpenContact,
}: TeamMemberProfilePageProps) {
  const otherLeaders = TEAM_MEMBERS.filter((item) => item.id !== member.id);

  return (
    <div className="bg-white text-[#07133B] overflow-x-clip">
      {/* HERO BANNER, Light Blue-White Surface, Layered Portrait Frames, Faded Right Silhouette & Curved Ribbon */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F2F7FF] via-[#F7FAFF] to-[#E3EEFF] border-b border-[#D5E4FF]">
        {/* Top-Left Signature Subtle Blue/Crimson Architectural Ribbon Accent */}
        <svg
          viewBox="0 0 220 110"
          className="pointer-events-none hidden lg:block absolute top-0 left-0 w-44 h-auto opacity-85"
          aria-hidden="true"
        >
          <path d="M0,0 L165,0 C105,36 48,74 0,104 Z" fill="#0038FF" fillOpacity="0.10" />
        </svg>

        {/* Faded Large Portrait Backdrop on the Right Side (Matches Reference Mockup) */}
        <div
          className="pointer-events-none hidden md:block absolute inset-y-0 right-0 w-[44%] lg:w-[40%] overflow-hidden"
          aria-hidden="true"
        >
          <img
            src={member.image}
            alt=""
            width={member.width}
            height={member.height}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-top opacity-[0.16] grayscale-[18%] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F4F8FF] via-[#EDF4FF]/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#E6F0FF]/80 via-transparent to-[#F2F7FF]/55" />
        </div>

        {/* Bottom-Right Sweeping Royal-Blue Corner Curve */}
        <svg
          viewBox="0 0 360 120"
          preserveAspectRatio="none"
          className="pointer-events-none absolute right-0 bottom-0 w-44 sm:w-64 lg:w-80 h-14 sm:h-20 lg:h-24"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="profileHeroBlueCurve" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0038FF" />
              <stop offset="100%" stopColor="#071B5E" />
            </linearGradient>
          </defs>
          <path
            d="M 40,120 C 175,112 275,68 360,0 L 360,120 Z"
            fill="url(#profileHeroBlueCurve)"
          />
        </svg>

        {/* Foreground Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pt-28 sm:pb-14 lg:pt-32 lg:pb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 lg:gap-12">
            {/* Left Portrait Stack With Tilted Blue-Cyan Backing Cards */}
            <Reveal
              immediate
              direction="left"
              wrapperClassName="md:col-span-5 lg:col-span-4 flex justify-center md:justify-start"
              className="relative w-[240px] sm:w-[270px] lg:w-[295px]"
            >
              {/* Back-most glowing cyan/blue tilted plate */}
              <div
                aria-hidden="true"
                className="absolute -inset-2.5 -translate-x-2.5 -translate-y-1.5 -rotate-6 rounded-[26px] bg-gradient-to-br from-[#00C6FF] via-[#0066FF] to-[#002BFF] opacity-90 shadow-lg"
              />
              {/* Second angled royal-blue depth layer */}
              <div
                aria-hidden="true"
                className="absolute -inset-1 -translate-x-1 rotate-[-2.5deg] rounded-[24px] bg-gradient-to-tr from-[#0038FF]/90 to-[#38BDF8]/80"
              />
              {/* Main Crisp Portrait Frame */}
              <div className="relative aspect-[4/4.65] rounded-[22px] overflow-hidden bg-white border-[3px] border-white shadow-[0_22px_45px_rgba(4,11,41,0.22)]">
                <ResilientImage
                  src={member.image}
                  alt={member.imageAlt}
                  fallbackTitle={member.name}
                  width={member.width}
                  height={member.height}
                  priority
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </Reveal>

            {/* Right Identity, Breadcrumb, Crimson Title & Social Row */}
            <Reveal
              immediate
              direction="right"
              delay={0.05}
              wrapperClassName="md:col-span-7 lg:col-span-8"
              className="space-y-3.5 sm:space-y-4 text-center md:text-left"
            >
              {/* Breadcrumb Pill */}
              <nav
                aria-label="Profile breadcrumb"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E3EEFF]/90 border border-[#C6DAFF] text-xs font-semibold text-[#07133B]"
              >
                <button
                  type="button"
                  onClick={onNavigateHome}
                  aria-label="Go to homepage"
                  className="inline-flex items-center text-[#0038FF] hover:text-[#DC0914] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0038FF] rounded-sm"
                >
                  <Home className="w-3.5 h-3.5" strokeWidth={2.2} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={onBackToTeam}
                  className="text-[#0038FF] hover:text-[#DC0914] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0038FF] rounded-sm"
                >
                  Team
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} aria-hidden="true" />
                <span className="text-[#07133B]">{member.name}</span>
              </nav>

              {/* Two-Tone Display Name + Crimson Role */}
              <div className="space-y-1">
                <h1
                  className="font-extrabold tracking-tight leading-[1.06] text-balance"
                  style={{ fontSize: 'clamp(2.1rem, 4.4vw, 3.65rem)' }}
                >
                  <span className="text-[#07133B]">{member.firstNamePart} </span>
                  <span className="text-[#0038FF]">{member.accentNamePart}</span>
                </h1>
                <div className="text-xl sm:text-2xl lg:text-[28px] font-extrabold text-[#DC0914] tracking-tight">
                  {member.role}
                </div>
              </div>

              {/* Executive Tagline */}
              <p className="max-w-lg mx-auto md:mx-0 text-sm sm:text-base lg:text-lg font-medium text-[#1E293B] leading-snug">
                {member.heroTagline}
              </p>

              {/* Circular Dark-Navy Social & Direct Contact Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                {member.socials.github && (
                  <a
                    href={member.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on GitHub`}
                    className="w-10 h-10 rounded-full bg-[#0A1E5E] hover:bg-[#0038FF] text-white flex items-center justify-center shadow-md shadow-[#0A1E5E]/20 transition-all duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0038FF]"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                      <path d="M12 2C6.477 2 2 6.592 2 12.253c0 4.53 2.865 8.372 6.839 9.728.5.095.683-.222.683-.493 0-.243-.009-.888-.014-1.742-2.782.619-3.369-1.374-3.369-1.374-.455-1.183-1.11-1.498-1.11-1.498-.908-.636.069-.623.069-.623 1.003.072 1.531 1.055 1.531 1.055.892 1.566 2.341 1.114 2.91.852.091-.662.349-1.114.635-1.37-2.221-.259-4.555-1.138-4.555-5.063 0-1.118.39-2.032 1.029-2.748-.103-.259-.446-1.301.098-2.712 0 0 .84-.275 2.75 1.05A9.38 9.38 0 0 1 12 6.844a9.4 9.4 0 0 1 2.504.345c1.909-1.325 2.748-1.05 2.748-1.05.546 1.411.202 2.453.1 2.712.64.716 1.028 1.63 1.028 2.748 0 3.935-2.338 4.801-4.566 5.055.359.317.679.942.679 1.898 0 1.37-.012 2.475-.012 2.811 0 .274.18.593.688.492C19.138 20.62 22 16.78 22 12.253 22 6.592 17.523 2 12 2z" />
                    </svg>
                  </a>
                )}

                {member.socials.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="w-10 h-10 rounded-full bg-[#0A1E5E] hover:bg-[#0038FF] text-white flex items-center justify-center shadow-md shadow-[#0A1E5E]/20 transition-all duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0038FF]"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                      <path d="M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3.5C4.14 3.5 3.25 4.39 3.25 5.5C3.25 6.6 4.14 7.5 5.25 7.5C6.35 7.5 7.25 6.6 7.25 5.5C7.25 4.39 6.35 3.5 5.25 3.5ZM20.44 13.02C20.44 9.88 18.76 8.22 16.16 8.22C14.37 8.22 13.48 9.21 13.02 9.95V8.5H9.65C9.7 9.48 9.65 19.5 9.65 19.5H13.02V13.36C13.02 13.02 13.05 12.69 13.15 12.45C13.42 11.78 14.03 11.09 15.07 11.09C16.41 11.09 17.06 12.11 17.06 13.6V19.5H20.44V13.02Z" />
                    </svg>
                  </a>
                )}

                {member.socials.x && (
                  <a
                    href={member.socials.x}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on X`}
                    className="w-10 h-10 rounded-full bg-[#0A1E5E] hover:bg-[#0038FF] text-white flex items-center justify-center shadow-md shadow-[#0A1E5E]/20 transition-all duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0038FF]"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}

                {member.socials.whatsapp && (
                  <a
                    href={member.socials.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Message ${member.name} on WhatsApp`}
                    className="w-10 h-10 rounded-full bg-[#0A1E5E] hover:bg-[#0038FF] text-white flex items-center justify-center shadow-md shadow-[#0A1E5E]/20 transition-all duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0038FF]"
                  >
                    <Phone className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                  </a>
                )}

                <a
                  href={member.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${member.name}'s portfolio website`}
                  className="w-10 h-10 rounded-full bg-[#0A1E5E] hover:bg-[#0038FF] text-white flex items-center justify-center shadow-md shadow-[#0A1E5E]/20 transition-all duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0038FF]"
                >
                  <Globe className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={() => onOpenContact(member.contactTopic)}
                  aria-label={`Message ${member.name}`}
                  className="w-10 h-10 rounded-full bg-[#0A1E5E] hover:bg-[#DC0914] text-white flex items-center justify-center shadow-md shadow-[#0A1E5E]/20 transition-all duration-150 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0038FF]"
                >
                  <Mail className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MAIN TWO-COLUMN PROFILE CONTENT BODY */}
      <section className="py-10 sm:py-12 lg:py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT SIDEBAR COLUMN (Contact Information · Skills · Languages · Interests) */}
            <aside className="lg:col-span-4 space-y-5">
              {/* 1. Contact Information Card */}
              <Reveal direction="left" delay={0}>
                <div className="rounded-2xl bg-white border border-[#D5E4FF] shadow-[0_10px_28px_rgba(4,11,41,0.05)] p-3.5 sm:p-4 space-y-4">
                  <div className="rounded-xl bg-gradient-to-r from-[#071A52] via-[#0033CC] to-[#0055FF] text-white px-4 py-2.5 flex items-center gap-2.5 shadow-sm">
                    <User className="w-5 h-5 fill-white/95 text-white shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    <h2 className="text-sm sm:text-base font-bold tracking-tight">
                      Contact Information
                    </h2>
                  </div>

                  <div className="px-1.5 pb-1 space-y-3 text-sm text-[#07133B]">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-3 hover:text-[#0038FF] transition-colors group"
                    >
                      <Mail className="w-4 h-4 text-[#0A2A88] group-hover:text-[#0038FF] shrink-0" strokeWidth={2} aria-hidden="true" />
                      <span className="truncate font-medium">{member.email}</span>
                    </a>

                    <a
                      href={`tel:${member.phone.replace(/\s+/g, '')}`}
                      className="flex items-center gap-3 hover:text-[#0038FF] transition-colors group tabular-nums"
                    >
                      <Phone className="w-4 h-4 text-[#0A2A88] group-hover:text-[#0038FF] shrink-0" strokeWidth={2} aria-hidden="true" />
                      <span className="font-medium">{member.phone}</span>
                    </a>

                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-[#0A2A88] shrink-0" strokeWidth={2} aria-hidden="true" />
                      <span className="font-medium">{member.location}</span>
                    </div>

                    <a
                      href={member.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 text-[#0038FF] hover:text-[#DC0914] transition-colors"
                    >
                      <Globe className="w-4 h-4 shrink-0" strokeWidth={2} aria-hidden="true" />
                      <span className="truncate font-semibold">{member.website}</span>
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* 2. Skills Card */}
              <Reveal direction="left" delay={0.06}>
                <div className="rounded-2xl bg-white border border-[#D5E4FF] shadow-[0_10px_28px_rgba(4,11,41,0.05)] p-5 space-y-4">
                  <div className="flex items-center gap-2.5">
                    <Settings className="w-5 h-5 text-[#0038FF] shrink-0" strokeWidth={2.2} aria-hidden="true" />
                    <h2 className="text-base sm:text-lg font-extrabold text-[#0038FF] tracking-tight">
                      Skills
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full bg-[#EBF2FF] border border-[#D4E4FF] text-xs font-bold text-[#0038FF]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* 3. Languages Card */}
              <Reveal direction="left" delay={0.12}>
                <div className="rounded-2xl bg-white border border-[#D5E4FF] shadow-[0_10px_28px_rgba(4,11,41,0.05)] p-5 space-y-3.5">
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-5 h-5 text-[#0038FF] shrink-0" strokeWidth={2.2} aria-hidden="true" />
                    <h2 className="text-base sm:text-lg font-extrabold text-[#0038FF] tracking-tight">
                      Languages
                    </h2>
                  </div>

                  <ul className="space-y-1.5 text-sm font-medium text-[#1E293B] pl-1">
                    {member.languages.map((lang) => (
                      <li key={lang}>{lang}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* 4. Interests Card */}
              <Reveal direction="left" delay={0.18}>
                <div className="rounded-2xl bg-white border border-[#D5E4FF] shadow-[0_10px_28px_rgba(4,11,41,0.05)] p-5 space-y-4">
                  <div className="flex items-center gap-2.5">
                    <Heart className="w-5 h-5 text-[#0038FF] fill-[#0038FF] shrink-0" strokeWidth={2} aria-hidden="true" />
                    <h2 className="text-base sm:text-lg font-extrabold text-[#0038FF] tracking-tight">
                      Interests
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-2 text-center">
                    {member.interests.map((interest) => (
                      <div key={interest.label} className="flex flex-col items-center gap-1.5">
                        <div className="w-11 h-11 rounded-full bg-[#EBF2FF] border border-[#D4E4FF] flex items-center justify-center">
                          {renderInterestIcon(interest.icon)}
                        </div>
                        <span className="text-[11px] font-bold text-[#07133B] leading-tight">
                          {interest.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </aside>

            {/* RIGHT MAIN CONTENT COLUMN (About Me · Experience · Education · Achievements) */}
            <div className="lg:col-span-8 space-y-5">
              {/* 1. About Me Card */}
              <Reveal direction="right" delay={0}>
                <div className="rounded-2xl bg-white border border-[#D5E4FF] shadow-[0_10px_28px_rgba(4,11,41,0.05)] p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <User className="w-5 h-5 text-[#0038FF] fill-[#0038FF] shrink-0" strokeWidth={2} aria-hidden="true" />
                    <h2 className="text-base sm:text-lg font-extrabold text-[#0038FF] tracking-tight">
                      About Me
                    </h2>
                  </div>

                  <p className="text-sm sm:text-[15px] text-[#1E293B] leading-relaxed">
                    {member.aboutMe}
                  </p>
                </div>
              </Reveal>

              {/* 2. Experience Card With Blue Vertical Timeline */}
              <Reveal direction="right" delay={0.06}>
                <div className="rounded-2xl bg-white border border-[#D5E4FF] shadow-[0_10px_28px_rgba(4,11,41,0.05)] p-5 sm:p-6 space-y-5">
                  <div className="flex items-center gap-2.5">
                    <Briefcase className="w-5 h-5 text-[#0038FF] fill-[#0038FF]/15 shrink-0" strokeWidth={2.2} aria-hidden="true" />
                    <h2 className="text-base sm:text-lg font-extrabold text-[#0038FF] tracking-tight">
                      Experience
                    </h2>
                  </div>

                  <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#BFD6FF]">
                    {member.experience.map((item) => (
                      <div key={`${item.role}-${item.period}`} className="relative space-y-1.5">
                        <span
                          aria-hidden="true"
                          className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-[#0038FF] ring-4 ring-white"
                        />
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-sm sm:text-base font-extrabold text-[#07133B]">
                            {item.role}{' '}
                            <span className="font-normal text-slate-400">·</span>{' '}
                            <span className={item.highlightOrg ? 'text-[#0038FF]' : 'font-semibold text-slate-700'}>
                              {item.organization}
                            </span>
                          </h3>
                          <span className="px-3 py-1 rounded-full bg-[#EBF2FF] text-xs font-bold text-[#0038FF] tabular-nums whitespace-nowrap shrink-0">
                            {item.period}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* 3. Education / Credentials / Core Domains Card */}
              <Reveal direction="right" delay={0.12}>
                <div className="rounded-2xl bg-white border border-[#D5E4FF] shadow-[0_10px_28px_rgba(4,11,41,0.05)] p-5 sm:p-6 space-y-4">
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-5 h-5 text-[#0038FF] shrink-0" strokeWidth={2.2} aria-hidden="true" />
                    <h2 className="text-base sm:text-lg font-extrabold text-[#0038FF] tracking-tight">
                      {member.educationSectionTitle ?? 'Education'}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {member.education.map((edu) => (
                      <div key={edu.qualification} className="space-y-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-sm sm:text-base font-extrabold text-[#07133B]">
                            {edu.qualification}
                          </h3>
                          <span className="px-3 py-1 rounded-full bg-[#EBF2FF] text-xs font-bold text-[#0038FF] tabular-nums whitespace-nowrap shrink-0">
                            {edu.period}
                          </span>
                        </div>
                        <div className="text-sm font-medium text-slate-700">
                          {edu.institution}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-500">
                          {edu.specialization}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* 4. Achievements / Featured Projects Card */}
              <Reveal direction="right" delay={0.18}>
                <div className="rounded-2xl bg-white border border-[#D5E4FF] shadow-[0_10px_28px_rgba(4,11,41,0.05)] p-5 sm:p-6 space-y-4">
                  <div className="flex items-center gap-2.5">
                    <Trophy className="w-5 h-5 text-[#0038FF] shrink-0" strokeWidth={2.2} aria-hidden="true" />
                    <h2 className="text-base sm:text-lg font-extrabold text-[#0038FF] tracking-tight">
                      {member.achievementsSectionTitle ?? 'Achievements'}
                    </h2>
                  </div>

                  <ul className="space-y-2.5">
                    {member.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="flex items-start gap-2.5 text-sm sm:text-[15px] text-[#1E293B] leading-snug"
                      >
                        <CheckCircle2
                          className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-[#0038FF] shrink-0 mt-0.5"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>

          {/* EXECUTIVE SWITCHER, Quickly Jump to the Other 2 Leaders */}
          <Reveal direction="bottom" delay={0.1} className="mt-10 pt-8 border-t border-slate-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-[#07133B]">
                  Other SAMITECH Leadership Profiles
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Explore the rest of our founding and executive leadership team.
                </p>
              </div>
              <button
                type="button"
                onClick={onBackToTeam}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0038FF] hover:text-[#DC0914] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>View All Leadership</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherLeaders.map((other) => (
                <button
                  key={other.id}
                  type="button"
                  onClick={() => onSelectMember(other.id)}
                  className="group flex items-center gap-4 p-3.5 rounded-2xl bg-[#F8FAFF] hover:bg-[#EEF4FF] border border-[#D5E4FF] hover:border-[#0038FF]/45 text-left transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0038FF]"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-white shadow-xs shrink-0">
                    <ResilientImage
                      src={other.image}
                      alt={other.imageAlt}
                      fallbackTitle={other.name}
                      width={other.width}
                      height={other.height}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-bold text-[#0038FF]">
                      {other.executiveTitle} · {other.focusLabel}
                    </div>
                    <div className="text-sm sm:text-base font-extrabold text-[#07133B] group-hover:text-[#0038FF] transition-colors truncate">
                      {other.name}
                    </div>
                    <div className="text-xs font-medium text-slate-600 truncate">
                      {other.role}
                    </div>
                  </div>
                  <ArrowRight
                    className="w-4 h-4 text-[#0038FF] shrink-0 group-hover:translate-x-0.5 transition-transform"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* BOTTOM SWEEPING ROYAL-BLUE & CRIMSON RIBBON ACCENT ("Let's Build Together") */}
      <div className="relative h-24 sm:h-28 lg:h-32 overflow-hidden bg-white">
        <svg
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full block"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="profileBottomBlue" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#061233" />
              <stop offset="55%" stopColor="#0038FF" />
              <stop offset="100%" stopColor="#061646" />
            </linearGradient>
          </defs>
          {/* Crimson sweeping underside highlight */}
          <path
            d="M 0,40 Q 240,128 720,104 T 1440,18 L 1440,140 L 0,140 Z"
            fill="#DC0914"
          />
          {/* Deep Royal-Blue sweeping ribbon */}
          <path
            d="M 0,68 Q 260,136 740,108 T 1440,26 L 1440,140 L 0,140 Z"
            fill="url(#profileBottomBlue)"
          />
        </svg>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end justify-between gap-2 pb-4 sm:pb-5">
          <button
            type="button"
            onClick={() => onOpenContact(member.contactTopic)}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white text-[#07133B] hover:bg-[#EBF2FF] text-xs sm:text-sm font-bold shadow-md transition-colors whitespace-nowrap cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5 text-[#0038FF] shrink-0" strokeWidth={2} aria-hidden="true" />
            <span>Work With {member.firstNamePart.split(' ')[0]}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0038FF] shrink-0" strokeWidth={2} aria-hidden="true" />
          </button>

          <div className="-rotate-6 text-right pr-1 sm:pr-3 shrink-0">
            <div className="text-sm sm:text-xl font-extrabold italic tracking-tight text-white drop-shadow-xs leading-none">
              Let&apos;s Build
              <span className="block">Together</span>
            </div>
            <div className="h-[2.5px] w-20 sm:w-28 ml-auto bg-[#DC0914] rounded-full mt-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
