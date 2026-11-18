import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Send, X } from 'lucide-react';
import { SERVICE_CATEGORY_OPTIONS } from '../data/samitechData';

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
  const [values, setValues] = useState<FormValues>({
    fullName: '',
    workEmail: '',
    company: '',
    serviceCategory: defaultCategory || SERVICE_CATEGORY_OPTIONS[0],
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (defaultCategory) {
      setValues((prev) => ({ ...prev, serviceCategory: defaultCategory }));
    }
  }, [defaultCategory]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!values.fullName.trim()) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    if (!values.workEmail.trim()) {
      nextErrors.workEmail = 'Please provide a work email address.';
    } else if (!EMAIL_REGEX.test(values.workEmail.trim())) {
      nextErrors.workEmail = 'Please enter a valid email address (e.g. name@company.com).';
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

  const handleResetAndClose = () => {
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#060814]/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onClick={handleResetAndClose}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl border border-[#0000FF]/15 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Brand Gradient Stripe (#0000FF -> #950606) */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#0000FF] via-[#0000B8] to-[#950606]" />

        <button
          type="button"
          onClick={handleResetAndClose}
          aria-label="Close contact dialog"
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#F4F7FF] hover:bg-[#E0E7FF] text-[#060814] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0000FF]"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="p-8 sm:p-10 text-center space-y-5">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#0000FF]/10 text-[#0000FF] flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <h3
                id="contact-modal-title"
                className="text-2xl font-bold tracking-tight text-[#060814]"
              >
                Inquiry Received
              </h3>
              <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-[#060814]">{values.fullName}</span>. Our engineering team in Buea has logged your inquiry regarding{' '}
                <span className="font-semibold text-[#0000FF]">{values.serviceCategory}</span> and will respond to{' '}
                <span className="font-medium text-[#060814]">{values.workEmail}</span> shortly. For urgent 24/7 assistance, call{' '}
                <span className="font-semibold text-[#950606]">+237 674 137 259</span>.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-6 py-2.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-[#0000FF] to-[#0000B8] hover:from-[#0000CC] hover:to-[#950606] transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 space-y-5">
            <div className="pr-10">
              <h3
                id="contact-modal-title"
                className="text-2xl font-bold tracking-tight text-[#060814]"
              >
                Connect with SamiTech
              </h3>
              <p className="mt-1.5 text-sm text-slate-600">
                Available 24/7 from Buea, Cameroon · +237 674 137 259 · samitech237@gmail.com
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-[#060814] mb-1.5">
                  Full Name <span className="text-[#950606]" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={values.fullName}
                  onChange={(e) => handleFieldChange('fullName', e.target.value)}
                  placeholder="Jordan Vance"
                  aria-invalid={Boolean(errors.fullName)}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-[#F4F7FF]/40 text-[#060814] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0000FF]/20 ${
                    errors.fullName ? 'border-[#950606]' : 'border-slate-300 focus:border-[#0000FF]'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#950606]">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-[#060814] mb-1.5">
                  Work Email <span className="text-[#950606]" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={values.workEmail}
                  onChange={(e) => handleFieldChange('workEmail', e.target.value)}
                  placeholder="jordan@enterprise.com"
                  aria-invalid={Boolean(errors.workEmail)}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-[#F4F7FF]/40 text-[#060814] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0000FF]/20 ${
                    errors.workEmail ? 'border-[#950606]' : 'border-slate-300 focus:border-[#0000FF]'
                  }`}
                />
                {errors.workEmail && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#950606]">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.workEmail}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-company" className="block text-sm font-medium text-[#060814] mb-1.5">
                  Company / Organization <span className="text-[#950606]" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-company"
                  type="text"
                  value={values.company}
                  onChange={(e) => handleFieldChange('company', e.target.value)}
                  placeholder="Meridian Systems Inc."
                  aria-invalid={Boolean(errors.company)}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-[#F4F7FF]/40 text-[#060814] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0000FF]/20 ${
                    errors.company ? 'border-[#950606]' : 'border-slate-300 focus:border-[#0000FF]'
                  }`}
                />
                {errors.company && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#950606]">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.company}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-service" className="block text-sm font-medium text-[#060814] mb-1.5">
                  Primary Focus
                </label>
                <select
                  id="contact-service"
                  value={values.serviceCategory}
                  onChange={(e) => handleFieldChange('serviceCategory', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-[#F4F7FF]/40 text-[#060814] focus:outline-none focus:border-[#0000FF] focus:ring-2 focus:ring-[#0000FF]/20"
                >
                  {SERVICE_CATEGORY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-[#060814] mb-1.5">
                Project Scope &amp; Timeline <span className="text-[#950606]" aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-message"
                rows={3}
                value={values.message}
                onChange={(e) => handleFieldChange('message', e.target.value)}
                placeholder="Outline your target regions, network capacity, or software platform requirements..."
                aria-invalid={Boolean(errors.message)}
                className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-[#F4F7FF]/40 text-[#060814] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0000FF]/20 ${
                  errors.message ? 'border-[#950606]' : 'border-slate-300 focus:border-[#0000FF]'
                }`}
              />
              {errors.message && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#950606]">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.message}</span>
                </p>
              )}
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-[#060814] hover:bg-[#F4F7FF] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-[#0000FF] to-[#0000B8] hover:from-[#0000CC] hover:to-[#950606] shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FF]"
              >
                <span>Submit Inquiry</span>
                <Send className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
