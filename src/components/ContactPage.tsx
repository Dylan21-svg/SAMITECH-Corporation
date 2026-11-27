import { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
} from 'lucide-react';
import { CONTACT_PAGE_MEDIA } from '../data/projectsData';
import { COMPANY_CONTACT, SERVICE_CATEGORY_OPTIONS } from '../data/samitechData';
import { Reveal } from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';
import { MapMarkerPinIcon } from './ShowcaseIcons';

interface ContactPageProps {
  onNavigateHome: () => void;
}

interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type ContactFormErrors = Partial<Record<keyof ContactFormState, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SUBJECT_OPTIONS = ['General Inquiry', ...SERVICE_CATEGORY_OPTIONS];

export function ContactPage({ onNavigateHome }: ContactPageProps) {
  const [form, setForm] = useState<ContactFormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const scrollToForm = () => {
    const el = document.getElementById('contact-message-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const input = document.getElementById('page-contact-name');
      window.setTimeout(() => input?.focus(), 380);
    }
  };

  const scrollToMap = () => {
    const el = document.getElementById('buea-office-map');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const validate = (): ContactFormErrors => {
    const next: ContactFormErrors = {};
    if (!form.name.trim()) {
      next.name = 'Please enter your name.';
    }
    if (!form.email.trim()) {
      next.email = 'Please enter your email address.';
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (form.message.trim().length < 10) {
      next.message = 'Please write a short message (at least 10 characters).';
    }
    return next;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleFieldChange = (field: keyof ContactFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  return (
    <div className="bg-white text-[#07133B]">
      {/* CURVED BRIGHT HQ ARCHITECTURE HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#F4F8FF] to-[#E6F0FF]">
        {/* Full-Bleed Architectural Headquarters Backdrop */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <ResilientImage
            src={CONTACT_PAGE_MEDIA.hqHero.image}
            alt={CONTACT_PAGE_MEDIA.hqHero.alt}
            fallbackTitle="SAMITECH Corporation Headquarters"
            width={CONTACT_PAGE_MEDIA.hqHero.width}
            height={CONTACT_PAGE_MEDIA.hqHero.height}
            priority
            className="w-full h-full object-cover object-[76%_center] lg:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/82 to-transparent lg:from-white/55 lg:via-white/25 lg:to-transparent" />
          {/* Crimson & Sky-Blue Corner Swoosh Matching Mockup */}
          <svg
            viewBox="0 0 260 120"
            className="hidden sm:block absolute right-0 bottom-5 w-44 lg:w-64 h-auto"
          >
            <path d="M 30,120 Q 170,96 260,18 L 260,120 Z" fill="#0EA5E9" fillOpacity="0.55" />
            <path d="M 85,120 Q 190,104 260,36 L 260,120 Z" fill="#DC0914" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <Reveal
              immediate
              direction="left"
              wrapperClassName="lg:col-span-6"
              className="space-y-4 sm:space-y-5 max-w-xl"
            >
              {/* Pale Blue Pill Tag ("Get in Touch") */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0FF]/95 border border-[#0044FF]/15 text-xs font-semibold text-[#002BFF]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0044FF]" aria-hidden="true" />
                <span>Get in Touch</span>
              </div>

              <h1
                className="font-extrabold tracking-tight leading-[1.05] text-balance text-[#07133B]"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.85rem)' }}
              >
                <span>Contact </span>
                <span className="text-[#002BFF]">Us</span>
              </h1>

              <p className="max-w-md text-xs sm:text-sm lg:text-base text-slate-700 font-medium leading-relaxed">
                We’d love to hear from you! Whether you have a question, a business inquiry, or
                need technical support, our team is here to help.
              </p>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#002BFF] to-[#0055FF] hover:from-[#001ACC] hover:to-[#003CE6] shadow-md shadow-[#002BFF]/25 transition-all duration-150 active:scale-[0.98] whitespace-nowrap cursor-pointer"
                >
                  <span>Send Us a Message</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                </button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom Smooth White Curve Transition */}
        <div className="pointer-events-none relative z-10 w-full overflow-hidden leading-none" aria-hidden="true">
          <svg viewBox="0 0 1440 52" preserveAspectRatio="none" className="w-full h-6 sm:h-11 block">
            <path d="M0,44 Q720,-16 1440,44 L1440,52 L0,52 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </section>

      {/* SECTION 2: 2-COLUMN CONTACT INFORMATION CARDS + "SEND US A MESSAGE" FORM */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white overflow-x-clip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-start">
            {/* Left Column: 2x2 Contact Info Grid */}
            <div className="lg:col-span-6 space-y-5">
              <Reveal direction="left" className="space-y-1.5">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#07133B]">
                  Our Contact Information
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Reach out to us through any of the following channels:
                </p>
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Card 1: Phone */}
                <Reveal direction="bottom" delay={0.04}>
                  <a
                    href={`tel:${COMPANY_CONTACT.phone.replace(/\s+/g, '')}`}
                    className="group flex flex-col items-center text-center rounded-2xl bg-gradient-to-b from-[#EDF4FF] to-[#F8FAFF] border border-[#DCE8FF] hover:border-[#0044FF]/45 p-5 sm:p-6 space-y-2.5 shadow-[0_6px_18px_rgba(0,68,255,0.05)] hover:-translate-y-0.5 transition-all"
                  >
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0055FF] to-[#0022CC] text-white flex items-center justify-center shadow-sm">
                      <Phone className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#07133B]">Phone</h3>
                    <div className="text-xs sm:text-sm font-semibold text-[#002BFF] group-hover:text-[#DC0914] transition-colors tabular-nums">
                      {COMPANY_CONTACT.phone}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-500">
                      Mon to Fri: 8AM to 6PM (WAT)
                    </div>
                  </a>
                </Reveal>

                {/* Card 2: Email */}
                <Reveal direction="bottom" delay={0.08}>
                  <a
                    href={`mailto:${COMPANY_CONTACT.email}`}
                    className="group flex flex-col items-center text-center rounded-2xl bg-gradient-to-b from-[#EDF4FF] to-[#F8FAFF] border border-[#DCE8FF] hover:border-[#0044FF]/45 p-5 sm:p-6 space-y-2.5 shadow-[0_6px_18px_rgba(0,68,255,0.05)] hover:-translate-y-0.5 transition-all"
                  >
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0055FF] to-[#0022CC] text-white flex items-center justify-center shadow-sm">
                      <Mail className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#07133B]">Email</h3>
                    <div className="text-xs sm:text-sm font-semibold text-[#002BFF] group-hover:text-[#DC0914] transition-colors break-all">
                      {COMPANY_CONTACT.email}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-500">
                      We reply within 24h
                    </div>
                  </a>
                </Reveal>

                {/* Card 3: Our Office */}
                <Reveal direction="bottom" delay={0.12}>
                  <button
                    type="button"
                    onClick={scrollToMap}
                    className="group w-full flex flex-col items-center text-center rounded-2xl bg-gradient-to-b from-[#EDF4FF] to-[#F8FAFF] border border-[#DCE8FF] hover:border-[#0044FF]/45 p-5 sm:p-6 space-y-2.5 shadow-[0_6px_18px_rgba(0,68,255,0.05)] hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0055FF] to-[#0022CC] text-white flex items-center justify-center shadow-sm">
                      <MapPin className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#07133B]">Our Office</h3>
                    <div className="text-xs sm:text-sm font-semibold text-[#07133B] group-hover:text-[#002BFF] transition-colors">
                      {COMPANY_CONTACT.location}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-500">
                      Nationwide Technology Hub
                    </div>
                  </button>
                </Reveal>

                {/* Card 4: Website */}
                <Reveal direction="bottom" delay={0.16}>
                  <button
                    type="button"
                    onClick={onNavigateHome}
                    className="group w-full flex flex-col items-center text-center rounded-2xl bg-gradient-to-b from-[#EDF4FF] to-[#F8FAFF] border border-[#DCE8FF] hover:border-[#0044FF]/45 p-5 sm:p-6 space-y-2.5 shadow-[0_6px_18px_rgba(0,68,255,0.05)] hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0055FF] to-[#0022CC] text-white flex items-center justify-center shadow-sm">
                      <Globe className="w-5 h-5" strokeWidth={1.85} aria-hidden="true" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#07133B]">Website</h3>
                    <div className="text-xs sm:text-sm font-semibold text-[#002BFF] group-hover:text-[#DC0914] transition-colors">
                      www.{COMPANY_CONTACT.domain}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-500">
                      Visit our official site
                    </div>
                  </button>
                </Reveal>
              </div>
            </div>

            {/* Right Column: Elevated "Send Us a Message" Card */}
            <div id="contact-message-card" className="lg:col-span-6 scroll-mt-24">
              <Reveal direction="right" delay={0.08}>
                <div className="rounded-2xl bg-white border border-[#DCE8FF] shadow-[0_14px_38px_rgba(4,11,41,0.08)] p-5 sm:p-7">
                  {submitted ? (
                    <div className="py-10 text-center space-y-4">
                      <div className="w-14 h-14 mx-auto rounded-full bg-[#002BFF]/10 text-[#002BFF] flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8" strokeWidth={1.75} aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-extrabold text-[#07133B]">
                        Message Sent Successfully
                      </h3>
                      <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                        Thank you, <span className="font-semibold text-[#07133B]">{form.name}</span>.
                        Our team will reply to{' '}
                        <span className="font-medium text-[#002BFF]">{form.email}</span> within 24 hours.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setForm({ name: '', email: '', subject: '', message: '' });
                        }}
                        className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#002BFF] to-[#0055FF] hover:from-[#001ACC] hover:to-[#003CE6] transition-all cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Send className="w-5 h-5 text-[#0038FF]" strokeWidth={2} aria-hidden="true" />
                          <h2 className="text-lg sm:text-xl font-extrabold text-[#07133B]">
                            Send Us a Message
                          </h2>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600">
                          Fill out the form below and we’ll get back to you soon.
                        </p>
                      </div>

                      {/* Input 1: Your Name * */}
                      <div>
                        <div className="relative">
                          <User
                            className="w-4 h-4 text-[#0038FF] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                            strokeWidth={1.85}
                            aria-hidden="true"
                          />
                          <input
                            id="page-contact-name"
                            type="text"
                            value={form.name}
                            onChange={(e) => handleFieldChange('name', e.target.value)}
                            placeholder="Your Name *"
                            aria-label="Your Name"
                            aria-invalid={Boolean(errors.name)}
                            className={`w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border bg-[#F8FAFF] text-[#07133B] placeholder:text-slate-500 transition-colors focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002BFF]/20 ${
                              errors.name
                                ? 'border-[#DC0914]'
                                : 'border-[#DCE8FF] hover:border-[#0044FF]/45 focus:border-[#002BFF]'
                            }`}
                          />
                        </div>
                        {errors.name && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-[#DC0914]">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            <span>{errors.name}</span>
                          </p>
                        )}
                      </div>

                      {/* Input 2: Your Email * */}
                      <div>
                        <div className="relative">
                          <Mail
                            className="w-4 h-4 text-[#0038FF] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                            strokeWidth={1.85}
                            aria-hidden="true"
                          />
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => handleFieldChange('email', e.target.value)}
                            placeholder="Your Email *"
                            aria-label="Your Email"
                            aria-invalid={Boolean(errors.email)}
                            className={`w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border bg-[#F8FAFF] text-[#07133B] placeholder:text-slate-500 transition-colors focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002BFF]/20 ${
                              errors.email
                                ? 'border-[#DC0914]'
                                : 'border-[#DCE8FF] hover:border-[#0044FF]/45 focus:border-[#002BFF]'
                            }`}
                          />
                        </div>
                        {errors.email && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-[#DC0914]">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>

                      {/* Select: Select a Subject */}
                      <div className="relative">
                        <FileText
                          className="w-4 h-4 text-[#0038FF] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                          strokeWidth={1.85}
                          aria-hidden="true"
                        />
                        <select
                          aria-label="Select a Subject"
                          value={form.subject}
                          onChange={(e) => handleFieldChange('subject', e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DCE8FF] hover:border-[#0044FF]/45 bg-[#F8FAFF] text-[#07133B] transition-colors focus:outline-none focus:bg-white focus:border-[#002BFF] focus:ring-2 focus:ring-[#002BFF]/20"
                        >
                          <option value="">Select a Subject</option>
                          {SUBJECT_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Textarea: Your Message * */}
                      <div>
                        <div className="relative">
                          <MessageSquare
                            className="w-4 h-4 text-[#0038FF] absolute left-3.5 top-3 pointer-events-none"
                            strokeWidth={1.85}
                            aria-hidden="true"
                          />
                          <textarea
                            rows={4}
                            value={form.message}
                            onChange={(e) => handleFieldChange('message', e.target.value)}
                            placeholder="Your Message *"
                            aria-label="Your Message"
                            aria-invalid={Boolean(errors.message)}
                            className={`w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border bg-[#F8FAFF] text-[#07133B] placeholder:text-slate-500 transition-colors focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002BFF]/20 ${
                              errors.message
                                ? 'border-[#DC0914]'
                                : 'border-[#DCE8FF] hover:border-[#0044FF]/45 focus:border-[#002BFF]'
                            }`}
                          />
                        </div>
                        {errors.message && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-[#DC0914]">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            <span>{errors.message}</span>
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white rounded-full bg-gradient-to-r from-[#002BFF] to-[#0055FF] hover:from-[#001ACC] hover:to-[#003CE6] shadow-md shadow-[#002BFF]/25 transition-all duration-150 active:scale-[0.99] cursor-pointer"
                      >
                        <Send className="w-4 h-4" strokeWidth={1.85} aria-hidden="true" />
                        <span>Send Message</span>
                        <ArrowRight className="w-4 h-4" strokeWidth={1.85} aria-hidden="true" />
                      </button>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
          </div>

          {/* SECTION 3: BUEA MAP + DARK "OUR LOCATION" CURVED SPLIT BANNER */}
          <Reveal direction="bottom" delay={0.1}>
            <div
              id="buea-office-map"
              className="scroll-mt-24 relative rounded-2xl overflow-hidden bg-[#06133D] border border-[#DCE8FF] shadow-[0_14px_36px_rgba(4,11,41,0.12)] grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Left Buea Street Map With Floating Pin & Floating Direction Card */}
              <div className="lg:col-span-7 relative min-h-[210px] sm:min-h-[240px] overflow-hidden bg-[#EAF4EE]">
                <ResilientImage
                  src={CONTACT_PAGE_MEDIA.bueaMap.image}
                  alt={CONTACT_PAGE_MEDIA.bueaMap.alt}
                  fallbackTitle="SAMITECH Cameroon Map"
                  width={CONTACT_PAGE_MEDIA.bueaMap.width}
                  height={CONTACT_PAGE_MEDIA.bueaMap.height}
                  wrapperClassName="absolute inset-0 w-full h-full"
                  className="w-full h-full object-cover"
                />

                {/* Map Pin + Label + Floating White Address Card */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="flex flex-col items-center">
                      <MapMarkerPinIcon />
                      <span className="mt-0.5 px-2 py-0.5 rounded bg-white/90 text-[10px] font-bold text-[#07133B] shadow-xs">
                        Cameroon
                      </span>
                    </div>

                    <div className="rounded-xl bg-white/95 backdrop-blur-sm border border-[#DCE8FF] shadow-lg px-3.5 py-2.5 sm:px-4 sm:py-3 space-y-0.5">
                      <div className="text-xs sm:text-sm font-extrabold text-[#07133B]">
                        {COMPANY_CONTACT.legalName}
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-600">
                        {COMPANY_CONTACT.location}
                      </div>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Cameroon"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 pt-0.5 text-[11px] sm:text-xs font-bold text-[#0038FF] hover:text-[#DC0914] transition-colors"
                      >
                        <span>Get Directions</span>
                        <ArrowRight className="w-3 h-3" strokeWidth={2} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Dark Navy "Our Location" Panel With Mountain Horizon Backdrop */}
              <div className="lg:col-span-5 relative min-h-[190px] sm:min-h-[240px] bg-[#06133D] text-white flex items-center overflow-hidden">
                <ResilientImage
                  src={CONTACT_PAGE_MEDIA.bueaScenic.image}
                  alt={CONTACT_PAGE_MEDIA.bueaScenic.alt}
                  fallbackTitle="Cameroon Innovation Hub"
                  width={CONTACT_PAGE_MEDIA.bueaScenic.width}
                  height={CONTACT_PAGE_MEDIA.bueaScenic.height}
                  darkSkeleton
                  wrapperClassName="absolute right-0 inset-y-0 w-3/4 h-full"
                  className="w-full h-full object-cover opacity-55"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#06133D] via-[#071952]/90 to-[#06133D]/55" />

                <div className="relative z-10 p-6 sm:p-8 space-y-2.5">
                  <div className="flex items-center gap-2 text-base sm:text-xl font-extrabold text-white">
                    <MapPin className="w-5 h-5 text-[#60A5FA] shrink-0" strokeWidth={2} aria-hidden="true" />
                    <span>Our Location</span>
                  </div>
                  <div className="text-sm sm:text-base font-bold text-[#93C5FD]">
                    {COMPANY_CONTACT.location}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xs">
                    A hub of innovation in the heart of Cameroon.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
