interface IconProps {
  className?: string;
}

export function ProductsCubeIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`w-4 h-4 ${className}`} fill="none" aria-hidden="true">
      <path d="M12 2.5L20.5 7.2V16.8L12 21.5L3.5 16.8V7.2L12 2.5Z" fill="#0044FF" />
      <path
        d="M3.5 7.2L12 11.9L20.5 7.2M12 11.9V21.5"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrustShieldSolidIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 28 30" className={`w-6 h-7 ${className}`} fill="none" aria-hidden="true">
      <path
        d="M14 2L3 6.5V14.2C3 21.1 7.7 27 14 28.8C20.3 27 25 21.1 25 14.2V6.5L14 2Z"
        fill="#0044FF"
      />
      <path
        d="M9.6 15.2L12.7 18.3L18.8 11.8"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrustBoltSolidIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 28" className={`w-5 h-7 ${className}`} fill="none" aria-hidden="true">
      <path
        d="M13.5 2L4 15.2H11.2L9.8 26L20 12.2H12.5L13.5 2Z"
        fill="#0044FF"
      />
    </svg>
  );
}

export function TrustHeadsetBoldIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 30 28" className={`w-7 h-7 ${className}`} fill="none" aria-hidden="true">
      <path
        d="M6.5 15.5V13C6.5 8.3 10.3 4.5 15 4.5C19.7 4.5 23.5 8.3 23.5 13V15.5"
        stroke="#0044FF"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <rect x="4" y="13.5" width="4.8" height="7.5" rx="2.4" fill="#0044FF" />
      <rect x="21.2" y="13.5" width="4.8" height="7.5" rx="2.4" fill="#0044FF" />
      <path
        d="M23.6 20.5C23.6 22.8 21.4 24.4 18.2 24.4H15.5"
        stroke="#0044FF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <rect x="13" y="22.8" width="4.2" height="3" rx="1.5" fill="#0044FF" />
    </svg>
  );
}

export function CategoryTabIcon({
  category,
  active = false,
  className = '',
}: {
  category: 'all' | 'networking-starlink' | 'cctv-security' | 'computers-labs';
  active?: boolean;
  className?: string;
}) {
  const color = active ? '#FFFFFF' : '#0044FF';
  switch (category) {
    case 'networking-starlink':
      return (
        <svg viewBox="0 0 24 24" className={`w-5 h-5 shrink-0 ${className}`} fill="none" aria-hidden="true">
          <circle cx="12" cy="11" r="2.1" fill={color} />
          <path d="M9.6 19.5L12 13L14.4 19.5M10.4 17H13.6" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M7.6 14.8C6.3 13.7 5.5 12.1 5.5 10.4C5.5 7.5 8.4 5 12 5C15.6 5 18.5 7.5 18.5 10.4C18.5 12.1 17.7 13.7 16.4 14.8"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M4.8 16.8C3.3 15.1 2.5 12.9 2.5 10.5C2.5 6 6.8 2.5 12 2.5C17.2 2.5 21.5 6 21.5 10.5C21.5 12.9 20.7 15.1 19.2 16.8"
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeOpacity="0.8"
          />
        </svg>
      );

    case 'cctv-security':
      return (
        <svg viewBox="0 0 24 24" className={`w-5 h-5 shrink-0 ${className}`} fill="none" aria-hidden="true">
          <path
            d="M5 7.5L18.5 11.2L16.5 16.4L4.2 13L5 7.5Z"
            fill={color}
          />
          <path d="M18.2 12.2L20.5 12.9L19.4 16L17 15.2" fill={color} />
          <path
            d="M7 13.8V18.5H3.5M7 18.5H10.5"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'computers-labs':
      return (
        <svg viewBox="0 0 24 24" className={`w-5 h-5 shrink-0 ${className}`} fill="none" aria-hidden="true">
          <rect x="3" y="4.5" width="18" height="12" rx="1.8" stroke={color} strokeWidth="2" />
          <rect x="5.2" y="6.7" width="13.6" height="7.6" rx="0.6" fill={color} fillOpacity={active ? '0.25' : '0.14'} />
          <path d="M12 16.5V19.5M8 19.5H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 22 22" className={`w-4 h-4 shrink-0 ${className}`} fill="none" aria-hidden="true">
          <rect x="2.5" y="2.5" width="7.2" height="7.2" rx="1.6" fill={color} />
          <rect x="12.3" y="2.5" width="7.2" height="7.2" rx="1.6" fill={color} />
          <rect x="2.5" y="12.3" width="7.2" height="7.2" rx="1.6" fill={color} />
          <rect x="12.3" y="12.3" width="7.2" height="7.2" rx="1.6" fill={color} />
        </svg>
      );
  }
}

export function FeaturedSpecIcon({
  type,
  className = '',
}: {
  type: 'globe' | 'latency' | 'plug';
  className?: string;
}) {
  if (type === 'globe') {
    return (
      <svg viewBox="0 0 28 28" className={`w-6 h-6 shrink-0 ${className}`} fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="6" stroke="#0044FF" strokeWidth="1.8" />
        <ellipse cx="14" cy="14" rx="2.7" ry="6" stroke="#0044FF" strokeWidth="1.4" />
        <path d="M8.5 14H19.5" stroke="#0044FF" strokeWidth="1.4" />
        <circle cx="14" cy="3.5" r="1.6" fill="#0044FF" />
        <circle cx="22.8" cy="8.5" r="1.6" fill="#0044FF" />
        <circle cx="22.8" cy="19.5" r="1.6" fill="#0044FF" />
        <circle cx="14" cy="24.5" r="1.6" fill="#0044FF" />
        <circle cx="5.2" cy="19.5" r="1.6" fill="#0044FF" />
        <circle cx="5.2" cy="8.5" r="1.6" fill="#0044FF" />
      </svg>
    );
  }
  if (type === 'latency') {
    return (
      <svg viewBox="0 0 28 28" className={`w-6 h-6 shrink-0 ${className}`} fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="4.2" fill="#0044FF" />
        <path
          d="M14 4V7.5M14 20.5V24M4 14H7.5M20.5 14H24M7 7L9.5 9.5M18.5 18.5L21 21M21 7L18.5 9.5M9.5 18.5L7 21"
          stroke="#0044FF"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 28 28" className={`w-6 h-6 shrink-0 ${className}`} fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="10.5" fill="#0044FF" />
      <path d="M12.2 8.2V11.2M15.8 8.2V11.2" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10.5 11.2H17.5V14.2C17.5 16.1 15.9 17.6 14 17.6C12.1 17.6 10.5 16.1 10.5 14.2V11.2Z" fill="#FFFFFF" />
      <path d="M14 17.5V21" stroke="#FFFFFF" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export function WhatsAppCircleIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`w-4 h-4 shrink-0 ${className}`} fill="none" aria-hidden="true">
      <path
        d="M12 2.5C6.8 2.5 2.5 6.7 2.5 11.9C2.5 13.7 3 15.5 3.9 17L2.6 21.5L7.3 20.2C8.7 21 10.3 21.4 12 21.4C17.2 21.4 21.5 17.2 21.5 12C21.5 6.8 17.2 2.5 12 2.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.4 8.5C9.2 8.1 9 8.1 8.8 8.1H8.3C8.1 8.1 7.8 8.2 7.6 8.5C7.3 8.8 6.8 9.4 6.8 10.5C6.8 11.6 7.6 12.7 7.7 12.9C7.8 13.1 9.3 15.5 11.7 16.4C13.7 17.2 14.1 17 14.5 17C14.9 17 15.8 16.4 16 15.9C16.2 15.4 16.2 14.9 16.1 14.8C16 14.7 15.8 14.6 15.5 14.4C15.2 14.2 13.8 13.6 13.5 13.5C13.3 13.4 13.1 13.3 12.9 13.6C12.7 13.9 12.2 14.5 12 14.7C11.8 14.9 11.6 14.9 11.3 14.8C11 14.6 10.1 14.3 9 13.3C8.2 12.5 7.6 11.6 7.5 11.3C7.4 11 7.5 10.8 7.7 10.7C7.8 10.5 8 10.3 8.2 10.1C8.3 9.9 8.4 9.8 8.5 9.6C8.6 9.4 8.5 9.2 8.4 9L9.4 8.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LargeInstallHeadsetIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`w-14 h-14 sm:w-16 sm:h-16 shrink-0 ${className}`} fill="none" aria-hidden="true">
      <path
        d="M14 34V29C14 19.1 22.1 11 32 11C41.9 11 50 19.1 50 29V34"
        stroke="#FFFFFF"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      <rect x="9.5" y="30" width="9" height="16" rx="4.5" stroke="#FFFFFF" strokeWidth="3.2" />
      <rect x="45.5" y="30" width="9" height="16" rx="4.5" stroke="#FFFFFF" strokeWidth="3.2" />
      <path
        d="M50 46V48.5C50 52.6 46.6 55.5 41.5 55.5H35"
        stroke="#FFFFFF"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <rect x="27" y="52.5" width="9" height="5.5" rx="2.75" fill="#FFFFFF" />
    </svg>
  );
}
