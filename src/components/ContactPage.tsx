import { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { Reveal } from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';
import {
  ABOUT_HERO_MEDIA,
  COMPANY_CONTACT,
  SERVICE_CATEGORY_OPTIONS,
} from '../data/samitechData';

interface ContactPageProps {
  initialCategory?: string;
}

interface ContactFormValues {
  fullName: string;
  workEmail: string;
  phone: string;
  company: string;
  serviceCategory: string;
  timeline: string;
  message: string;
}

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TIMELINE_OPTIONS = [
  'Urgent / 24/7 Support',
  'Within 2 Weeks',
  '1–3 Months',
  'Exploratory Consultation',
];

export function ContactPage({ initialCategory }: ContactPageProps) {
  const [values, setValues] = useState<ContactFormValues>({
    fullName: '',
    workEmail: '',
    phone: '',
    company: '',
    serviceCategory: initialCategory || SERVICE_CATEGORY_OPTIONS[0],
    timeline: TIMELINE_OPTIONS[1],
    message: '',
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleFieldChange = (field: keyof ContactFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): ContactFormErrors => {
    const next: ContactFormErrors = {};
    if (!values.fullName.trim()) {
      next.fullName = 'Please enter your full name.';
    }
    if (!values.workEmail.trim()) {
      next.workEmail = 'Please provide an email address.';
    } else if (!EMAIL_REGEX.test(values.workEmail.trim())) {
      next.workEmail = 'Please enter a valid email address (e.g. name@company.cm).';
    }
    if (!values.company.trim()) {
      next.company = 'Please enter your company, institution, or city.';
    }
    if (values.message.trim().length < 12) {
      next.message = 'Please share a brief description of your request (at least 12 characters).';
    }
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <div className="bg-white text-[#07133B]">
      {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-white border-b border-[#0044FF]/10">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <ResilientImage
            src={ABOUT_HERO_MEDIA.image}
            alt={ABOUT_HERO_MEDIA.alt}
            fallbackTitle="SAMITECH Corporation Support Desk"
            width={ABOUT_HERO_MEDIA.width}
            height={ABOUT_HERO_MEDIA.height}
            priority
            className="w-full h-full object-cover object-[76%_top] sm:object-[right_top] lg:object-center opacity-90"
          />
          <div className="absolute inset-y-0 left-0 w-[68%] sm:w-[60%] bg-gradient-to-r from-white via-white/95 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-28 pb-6 sm:pb-10 lg:pb-12">
          <div className="grid grid-cols-12 items-center gap-2 sm:gap-4 lg:gap-6">
            <Reveal
              direction="left"
              wrapperClassName="col-span-7 sm:col-span-6"
              className="space-y-2 sm:space-y-4 lg:space-y-5"
            >
              <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-xs font-semibold text-[#002BFF] tracking-tight">
                <span className="w-4 sm:w-5 h-[2px] bg-[#0044FF] rounded-full" aria-hidden="true" />
                <span>24/7 Engineering &amp; Support Desk</span>
              </div>

              <div className="space-y-1 sm:space-y-1.5">
                <h1
                  className="font-extrabold tracking-tight leading-[1.05] text-balance"
                  style={{ fontSize: 'clamp(1.2rem, 3.85vw, 3.45rem)' }}
                >
                  <span className="text-[#07133B] block">Contact</span>
                  <span className="bg-gradient-to-r from-[#0014CC] via-[#0033FF] to-[#0055FF] bg-clip-text text-transparent block">
                    SAMITECH Corporation
                  </span>
                </h1>
                <div className="pt-0.5 sm:pt-1 flex items-center w-20 sm:w-32 lg:w-40" aria-hidden="true">
                  <span className="w-1/2 h-[2px] sm:h-[3px] bg-[#0044FF] rounded-l-full" />
                  <span className="w-1/2 h-[2px] sm:h-[3px] bg-[#DC0914] rounded-r-full" />
                </div>
              </div>

              <p className="max-w-xl text-[9px] sm:text-[13px] lg:text-[15.5px] font-medium text-slate-800 leading-snug sm:leading-relaxed">
                Reach our software, networking, cybersecurity, and Authorized Equipment Tracking
                specialists directly from Buea — serving Douala, Yaoundé, and global remote clients
                around the clock.
              </p>
            </Reveal>

            <div className="col-span-5 sm:col-span-6 h-28 sm:h-64 lg:h-[320px]" aria-hidden="true" />
          </div>

          {/* 4-Column Dark Navy Direct Contact Strip */}
          <Reveal direction="bottom" delay={0.08} className="mt-4 sm:mt-8">
            <div className="bg-[#061233] text-white rounded-xl sm:rounded-2xl border border-white/15 shadow-[0_18px_40px_rgba(4,11,41,0.28)] px-3 py-3.5 sm:px-6 sm:py-5 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-0 lg:divide-x divide-[#3B82F6]/35">
                <a
                  href={`tel:${COMPANY_CONTACT.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 lg:px-4 first:lg:pl-0 hover:text-[#93C5FD] transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#60A5FA] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  <div className="min-w-0">
                    <div className="text-[11px] text-slate-300">24/7 Phone &amp; WhatsApp</div>
                    <div className="text-sm font-bold text-white tabular-nums">{COMPANY_CONTACT.phone}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${COMPANY_CONTACT.email}`}
                  className="flex items-center gap-3 lg:px-4 hover:text-[#93C5FD] transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#60A5FA] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  <div className="min-w-0">
                    <div className="text-[11px] text-slate-300">Direct Email</div>
                    <div className="text-sm font-bold text-white truncate">{COMPANY_CONTACT.email}</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 lg:px-4">
                  <MapPin className="w-5 h-5 text-[#EF4444] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  <div className="min-w-0">
                    <div className="text-[11px] text-slate-300">Primary Hubs</div>
                    <div className="text-sm font-bold text-white truncate">{COMPANY_CONTACT.regions}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 lg:px-4 last:lg:pr-0">
                  <Clock className="w-5 h-5 text-[#60A5FA] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  <div className="min-w-0">
                    <div className="text-[11px] text-slate-300">Office &amp; NOC Hours</div>
                    <div className="text-sm font-bold text-white">24/7 NOC · Mon–Sat Office</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MAIN SPLIT CONSULTATION FORM + SLA & QUICK TOPIC CONTAINERS */}
      <section className="py-10 sm:py-16 lg:py-24 bg-[#F2F6FF] overflow-x-clip">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            {/* Left (7 cols): Full Validated Consultation Form Container */}
            <Reveal direction="left" delay={0} wrapperClassName="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-[#0044FF]/15 shadow-lg overflow-hidden">
                <div className="h-1.5 w-full bg-gradient-to-r from-[#001AFF] via-[#0044FF] to-[#DC0914]" />

                {submitted ? (
                  <div className="p-8 sm:p-12 text-center space-y-5">
                    <div className="w-14 h-14 mx-auto rounded-full bg-[#EEF3FF] text-[#002BFF] flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#07133B]">
                      Consultation Request Received
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="font-semibold text-[#07133B]">{values.fullName}</span>.
                      Our specialist desk has logged your inquiry for{' '}
                      <span className="font-semibold text-[#002BFF]">{values.serviceCategory}</span> and
                      will reply to <span className="font-medium text-[#07133B]">{values.workEmail}</span>.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setValues({
                          fullName: '',
                          workEmail: '',
                          phone: '',
                          company: '',
                          serviceCategory: SERVICE_CATEGORY_OPTIONS[0],
                          timeline: TIMELINE_OPTIONS[1],
                          message: '',
                        });
                      }}
                      className="px-6 py-2.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#001AFF] to-[#0044FF] hover:from-[#0000CC] hover:to-[#002BFF] transition-all cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 lg:p-10 space-y-5">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#07133B]">
                        Project &amp; Support Consultation Form
                      </h2>
                      <p className="mt-1 text-xs sm:text-sm text-slate-600">
                        Tell us what you are building or protecting and an engineer will respond promptly.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="page-contact-name" className="block text-sm font-medium text-[#07133B] mb-1.5">
                          Full Name <span className="text-[#DC0914]">*</span>
                        </label>
                        <input
                          id="page-contact-name"
                          type="text"
                          value={values.fullName}
                          onChange={(e) => handleFieldChange('fullName', e.target.value)}
                          placeholder="e.g. Samuel Ndongo"
                          aria-invalid={Boolean(errors.fullName)}
                          className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-[#F4F7FF]/50 text-[#07133B] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002BFF]/20 ${
                            errors.fullName ? 'border-[#DC0914]' : 'border-slate-300 focus:border-[#002BFF]'
                          }`}
                        />
                        {errors.fullName && (
                          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#DC0914]">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                            <span>{errors.fullName}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="page-contact-email" className="block text-sm font-medium text-[#07133B] mb-1.5">
                          Work Email <span className="text-[#DC0914]">*</span>
                        </label>
                        <input
                          id="page-contact-email"
                          type="email"
                          value={values.workEmail}
                          onChange={(e) => handleFieldChange('workEmail', e.target.value)}
                          placeholder="e.g. name@company.cm"
                          aria-invalid={Boolean(errors.workEmail)}
                          className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-[#F4F7FF]/50 text-[#07133B] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002BFF]/20 ${
                            errors.workEmail ? 'border-[#DC0914]' : 'border-slate-300 focus:border-[#002BFF]'
                          }`}
                        />
                        {errors.workEmail && (
                          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#DC0914]">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                            <span>{errors.workEmail}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="page-contact-phone" className="block text-sm font-medium text-[#07133B] mb-1.5">
                          Phone / WhatsApp (Optional)
                        </label>
                        <input
                          id="page-contact-phone"
                          type="tel"
                          value={values.phone}
                          onChange={(e) => handleFieldChange('phone', e.target.value)}
                          placeholder="e.g. +237 6XX XXX XXX"
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-[#F4F7FF]/50 text-[#07133B] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#002BFF] focus:ring-2 focus:ring-[#002BFF]/20"
                        />
                      </div>

                      <div>
                        <label htmlFor="page-contact-company" className="block text-sm font-medium text-[#07133B] mb-1.5">
                          Company / Organization <span className="text-[#DC0914]">*</span>
                        </label>
                        <input
                          id="page-contact-company"
                          type="text"
                          value={values.company}
                          onChange={(e) => handleFieldChange('company', e.target.value)}
                          placeholder="e.g. Horizon Digital Sarl"
                          aria-invalid={Boolean(errors.company)}
                          className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-[#F4F7FF]/50 text-[#07133B] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002BFF]/20 ${
                            errors.company ? 'border-[#DC0914]' : 'border-slate-300 focus:border-[#002BFF]'
                          }`}
                        />
                        {errors.company && (
                          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#DC0914]">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                            <span>{errors.company}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="page-contact-service" className="block text-sm font-medium text-[#07133B] mb-1.5">
                          Service Area
                        </label>
                        <select
                          id="page-contact-service"
                          value={values.serviceCategory}
                          onChange={(e) => handleFieldChange('serviceCategory', e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-[#F4F7FF]/50 text-[#07133B] focus:outline-none focus:bg-white focus:border-[#002BFF] focus:ring-2 focus:ring-[#002BFF]/20"
                        >
                          {SERVICE_CATEGORY_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="page-contact-timeline" className="block text-sm font-medium text-[#07133B] mb-1.5">
                          Target Timeline
                        </label>
                        <select
                          id="page-contact-timeline"
                          value={values.timeline}
                          onChange={(e) => handleFieldChange('timeline', e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-[#F4F7FF]/50 text-[#07133B] focus:outline-none focus:bg-white focus:border-[#002BFF] focus:ring-2 focus:ring-[#002BFF]/20"
                        >
                          {TIMELINE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="page-contact-message" className="block text-sm font-medium text-[#07133B] mb-1.5">
                        Project Details &amp; Goals <span className="text-[#DC0914]">*</span>
                      </label>
                      <textarea
                        id="page-contact-message"
                        rows={4}
                        value={values.message}
                        onChange={(e) => handleFieldChange('message', e.target.value)}
                        placeholder="Describe your web/mobile platform, network infrastructure, security audit scope, or tracking request..."
                        aria-invalid={Boolean(errors.message)}
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-[#F4F7FF]/50 text-[#07133B] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002BFF]/20 ${
                          errors.message ? 'border-[#DC0914]' : 'border-slate-300 focus:border-[#002BFF]'
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#DC0914]">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                      <span className="text-xs text-slate-500">
                        Encrypted intake · Response within business hours (24/7 for urgent NOC)
                      </span>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#001AFF] to-[#0044FF] hover:from-[#0000CC] hover:to-[#002BFF] shadow-md shadow-[#002BFF]/20 transition-all cursor-pointer"
                      >
                        <span>Submit Inquiry</span>
                        <Send className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Right (5 cols): Quick Topic Selector & Authorized Equipment Notice Container */}
            <Reveal direction="right" delay={0.08} wrapperClassName="lg:col-span-5" className="space-y-6">
              <div className="bg-white rounded-2xl border border-[#0044FF]/12 shadow-sm p-6 space-y-4">
                <h3 className="text-lg font-bold text-[#07133B]">Quick Topic Routing</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Select a practice area below to pre-fill the consultation form immediately:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                  {SERVICE_CATEGORY_OPTIONS.map((option) => {
                    const isSelected = values.serviceCategory === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleFieldChange('serviceCategory', option)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#EEF3FF] border-[#002BFF]/40 text-[#002BFF]'
                            : 'bg-[#F8FAFF] border-slate-200 text-[#07133B] hover:border-[#0044FF]/35'
                        }`}
                      >
                        <span>{option}</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[#061233] text-white rounded-2xl border border-white/12 p-6 space-y-3 shadow-lg">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <ShieldCheck className="w-5 h-5 text-[#60A5FA]" strokeWidth={1.75} aria-hidden="true" />
                  <span>Authorized Equipment Tracking Intake</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  To initiate a device or vehicle recovery case (25,000–85,000 XAF via MTN Mobile Money),
                  prepare verified proof of ownership (original receipt or packaging box). False claims
                  are strictly declined.
                </p>
                <div className="pt-2 border-t border-white/10 text-xs text-[#93C5FD] font-medium">
                  Direct Hotline: {COMPANY_CONTACT.phone} · {COMPANY_CONTACT.location}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
