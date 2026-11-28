import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  X,
} from 'lucide-react';
import { SERVICE_CATEGORY_OPTIONS } from '../data/samitechData';
import { useSiteContent } from '../context/SiteContentContext';
import { SAMITECH_EASE, useMotionConfigValues } from './MotionPrimitives';
import { WhatsAppBrandIcon } from './WhatsAppFloatingButton';

interface ContactModalProps {
  isOpen: boolean;
  defaultCategory?: string;
  onClose: () => void;
}

interface FormValues {
  fullName: string;
  workEmail: string;
  company: string;
  serviceCategory: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactModal({
  isOpen,
  defaultCategory,
  onClose,
}: ContactModalProps) {
  const { settings, services, buildWhatsAppUrl } = useSiteContent();
  const categoryOptions = Array.from(
    new Set([
      ...SERVICE_CATEGORY_OPTIONS,
      ...services.map((s) => s.contactCategory),
    ])
  );
  const resolveCategoryAndMessage = (rawCategory?: string) => {
    if (!rawCategory) {
      return { category: categoryOptions[0], prefillMessage: '' };
    }
    if (rawCategory.startsWith('Careers:')) {
      const roleTitle = rawCategory.replace('Careers:', '').trim();
      return {
        category: 'Careers & Job Applications',
        prefillMessage: roleTitle
          ? `Applying for ${roleTitle}, portfolio/GitHub link & relevant experience: `
          : '',
      };
    }
    const legacyCategoryMap: Record<string, string> = {
      'Software Development': 'Software Services',
      'Mobile App Development': 'Software Services',
      'UI/UX Design': 'Software Services',
      'AI Development & Enablement': 'Software Services',
      'Product Scope': 'Software Services',
      'MVP Builder': 'Software Services',
      'Networking Solutions': 'Network Services',
      'Cybersecurity Services': 'Cybersecurity',
      'Authorized Equipment Tracking': 'Tracking',
    };
    const normalizedCategory = legacyCategoryMap[rawCategory] ?? rawCategory;
    const matched = categoryOptions.includes(normalizedCategory)
      ? normalizedCategory
      : categoryOptions[0];
    return { category: matched, prefillMessage: '' };
  };

  const initial = resolveCategoryAndMessage(defaultCategory);
  const [values, setValues] = useState<FormValues>({
    fullName: '',
    workEmail: '',
    company: '',
    serviceCategory: initial.category,
    message: initial.prefillMessage,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const { shouldReduceMotion } = useMotionConfigValues();

  useEffect(() => {
    if (isOpen && defaultCategory) {
      const resolved = resolveCategoryAndMessage(defaultCategory);
      setValues((prev) => ({
        ...prev,
        serviceCategory: resolved.category,
        message: resolved.prefillMessage || prev.message,
      }));
    }
  }, [defaultCategory, isOpen]);

  const handleResetAndClose = useCallback(() => {
    setSubmitted(false);
    setErrors({});
    setValues({
      fullName: '',
      workEmail: '',
      company: '',
      serviceCategory: SERVICE_CATEGORY_OPTIONS[0],
      message: '',
    });
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleResetAndClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleResetAndClose]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!values.fullName.trim()) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    if (!values.workEmail.trim()) {
      nextErrors.workEmail = 'Please provide a work email address.';
    } else if (!EMAIL_REGEX.test(values.workEmail.trim())) {
      nextErrors.workEmail = 'Please enter a valid email address (e.g. name@company.cm).';
    }
    if (!values.company.trim()) {
      nextErrors.company = 'Please enter your company or organization name.';
    }
    if (values.message.trim().length < 12) {
      nextErrors.message = 'Please share a brief summary of your project scope (at least 12 characters).';
    }
    return nextErrors;
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

  const handleFieldChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: SAMITECH_EASE }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#060814]/75 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          onClick={handleResetAndClose}
        >
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: SAMITECH_EASE }}
            className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl border border-[#0000FF]/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Brand Gradient Stripe (#0000FF -> #950606) */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#0000FF] via-[#0044FF] to-[#DC0914]" />

            <button
              type="button"
              onClick={handleResetAndClose}
              aria-label="Close contact dialog"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-[#F4F7FF] hover:bg-[#E0E7FF] text-[#060814] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0000FF]"
            >
              <X className="w-5 h-5" strokeWidth={1.75} />
            </button>

            {submitted ? (
              <div className="p-6 sm:p-10 text-center space-y-5">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#0000FF]/10 text-[#002BFF] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div className="space-y-2">
                  <h3
                    id="contact-modal-title"
                    className="text-2xl font-bold tracking-tight text-[#07133B]"
                  >
                    Inquiry Received
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-[#07133B]">{values.fullName}</span>. Our engineering team in Cameroon has logged your inquiry regarding{' '}
                    <span className="font-semibold text-[#002BFF]">{values.serviceCategory}</span> and will respond to{' '}
                    <span className="font-medium text-[#07133B]">{values.workEmail}</span> shortly. For urgent 24/7 assistance, call{' '}
                    <span className="font-semibold text-[#DC0914]">{settings.phone}</span>.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="px-6 py-2.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#001AFF] to-[#0044FF] hover:from-[#0000CC] hover:to-[#002BFF] transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="p-5 sm:p-8 space-y-5">
                <div className="pr-10 space-y-1.5">
                  <h3
                    id="contact-modal-title"
                    className="text-xl sm:text-2xl font-bold tracking-tight text-[#07133B]"
                  >
                    Connect with SAMITECH Corporation
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Share your software, networking, cybersecurity, or equipment tracking needs below.
                  </p>
                </div>

                {/* Structured Direct Contact Container Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-2 px-2.5 py-2.5 rounded-xl bg-[#F4F7FF] border border-[#0044FF]/12 hover:border-[#002BFF]/35 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#0044FF]/10 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-[#002BFF]" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-medium text-slate-500">Call Desk</div>
                      <div className="text-[11px] font-semibold text-[#07133B] truncate">
                        {settings.phone}
                      </div>
                    </div>
                  </a>

                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-2.5 py-2.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:border-[#1EBE5D] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0">
                      <WhatsAppBrandIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-medium text-[#146C43]">WhatsApp</div>
                      <div className="text-[11px] font-bold text-[#07133B] truncate">
                        Chat Now
                      </div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-2 px-2.5 py-2.5 rounded-xl bg-[#F4F7FF] border border-[#0044FF]/12 hover:border-[#002BFF]/35 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#0044FF]/10 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-[#002BFF]" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-medium text-slate-500">Direct Email</div>
                      <div className="text-[11px] font-semibold text-[#07133B] truncate">
                        {settings.email}
                      </div>
                    </div>
                  </a>

                  <div className="flex items-center gap-2 px-2.5 py-2.5 rounded-xl bg-[#F4F7FF] border border-[#0044FF]/12">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#0044FF]/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-[#DC0914]" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-medium text-slate-500">Headquarters</div>
                      <div className="text-[11px] font-semibold text-[#07133B] truncate flex items-center gap-1">
                        <span>{settings.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-[#07133B] mb-1.5">
                      Full Name <span className="text-[#DC0914]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={values.fullName}
                      onChange={(e) => handleFieldChange('fullName', e.target.value)}
                      placeholder="e.g. Samuel Ndongo"
                      aria-invalid={Boolean(errors.fullName)}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-[#F4F7FF]/50 text-[#07133B] placeholder:text-slate-400 transition-colors focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002BFF]/20 ${
                        errors.fullName
                          ? 'border-[#DC0914]'
                          : 'border-slate-300 hover:border-[#0044FF]/40 focus:border-[#002BFF]'
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
                    <label htmlFor="contact-email" className="block text-sm font-medium text-[#07133B] mb-1.5">
                      Work Email <span className="text-[#DC0914]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={values.workEmail}
                      onChange={(e) => handleFieldChange('workEmail', e.target.value)}
                      placeholder="e.g. name@company.cm"
                      aria-invalid={Boolean(errors.workEmail)}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-[#F4F7FF]/50 text-[#07133B] placeholder:text-slate-400 transition-colors focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002BFF]/20 ${
                        errors.workEmail
                          ? 'border-[#DC0914]'
                          : 'border-slate-300 hover:border-[#0044FF]/40 focus:border-[#002BFF]'
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
                    <label htmlFor="contact-company" className="block text-sm font-medium text-[#07133B] mb-1.5">
                      Company / Organization <span className="text-[#DC0914]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={values.company}
                      onChange={(e) => handleFieldChange('company', e.target.value)}
                      placeholder="e.g. Horizon Digital Sarl"
                      aria-invalid={Boolean(errors.company)}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-[#F4F7FF]/50 text-[#07133B] placeholder:text-slate-400 transition-colors focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002BFF]/20 ${
                        errors.company
                          ? 'border-[#DC0914]'
                          : 'border-slate-300 hover:border-[#0044FF]/40 focus:border-[#002BFF]'
                      }`}
                    />
                    {errors.company && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#DC0914]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                        <span>{errors.company}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-service" className="block text-sm font-medium text-[#07133B] mb-1.5">
                      Service Area
                    </label>
                    <select
                      id="contact-service"
                      value={values.serviceCategory}
                      onChange={(e) => handleFieldChange('serviceCategory', e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 hover:border-[#0044FF]/40 bg-[#F4F7FF]/50 text-[#07133B] transition-colors focus:outline-none focus:bg-white focus:border-[#002BFF] focus:ring-2 focus:ring-[#002BFF]/20"
                    >
                      {categoryOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-[#07133B] mb-1.5">
                    Project Scope &amp; Timeline <span className="text-[#DC0914]" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    value={values.message}
                    onChange={(e) => handleFieldChange('message', e.target.value)}
                    placeholder="Briefly describe your software, networking, cybersecurity, or tracking requirements..."
                    aria-invalid={Boolean(errors.message)}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-[#F4F7FF]/50 text-[#07133B] placeholder:text-slate-400 transition-colors focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002BFF]/20 ${
                      errors.message
                        ? 'border-[#DC0914]'
                        : 'border-slate-300 hover:border-[#0044FF]/40 focus:border-[#002BFF]'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#DC0914]">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200">
                  <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-[#002BFF]" strokeWidth={1.75} aria-hidden="true" />
                    <span>{settings.availability} · {settings.location}</span>
                  </div>
                  <div className="flex items-center gap-2.5 ml-auto">
                    <button
                      type="button"
                      onClick={handleResetAndClose}
                      className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-[#07133B] hover:bg-[#F4F7FF] rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#001AFF] to-[#0044FF] hover:from-[#0000CC] hover:to-[#002BFF] shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FF]"
                    >
                      <span>Submit Inquiry</span>
                      <Send className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
