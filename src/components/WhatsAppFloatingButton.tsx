import { useSiteContent } from '../context/SiteContentContext';

export function WhatsAppBrandIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0`} fill="none" aria-hidden="true">
      <path
        d="M12 2.2C6.6 2.2 2.2 6.5 2.2 11.9C2.2 13.7 2.7 15.5 3.6 17L2.3 21.7L7.1 20.4C8.6 21.2 10.3 21.6 12 21.6C17.4 21.6 21.8 17.3 21.8 11.9C21.8 6.5 17.4 2.2 12 2.2Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M9.4 8.4C9.2 8 9 8 8.8 8H8.3C8.1 8 7.8 8.1 7.6 8.4C7.3 8.7 6.8 9.3 6.8 10.4C6.8 11.5 7.6 12.6 7.7 12.8C7.8 13 9.3 15.4 11.7 16.4C13.7 17.2 14.1 17 14.5 17C14.9 17 15.8 16.4 16 15.9C16.2 15.4 16.2 14.9 16.1 14.8C16 14.7 15.8 14.6 15.5 14.4C15.2 14.2 13.8 13.6 13.5 13.5C13.3 13.4 13.1 13.3 12.9 13.6C12.7 13.9 12.2 14.5 12 14.7C11.8 14.9 11.6 14.9 11.3 14.8C11 14.6 10.1 14.3 9 13.3C8.2 12.5 7.6 11.6 7.5 11.3C7.4 11 7.5 10.8 7.7 10.7C7.8 10.5 8 10.3 8.2 10.1C8.3 9.9 8.4 9.8 8.5 9.6C8.6 9.4 8.5 9.2 8.4 9L9.4 8.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function WhatsAppFloatingButton() {
  const { settings, buildWhatsAppUrl } = useSiteContent();

  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with SAMITECH on WhatsApp (${settings.phone})`}
      title="Chat on WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[38] w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-[0_10px_26px_rgba(37,211,102,0.42)] border-2 border-white flex items-center justify-center transition-transform duration-150 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
    >
      <WhatsAppBrandIcon className="w-5 h-5 sm:w-6 sm:h-6" />
    </a>
  );
}
