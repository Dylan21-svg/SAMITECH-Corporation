interface IconProps {
  className?: string;
}

export function ServiceGridIcon({
  slug,
  className = '',
}: {
  slug: string;
  className?: string;
}) {
  switch (slug) {
    /* 1. Software Services (UI/UX, Web & App Dev, Graphics Design) */
    case 'software-services':
    case 'custom-software':
      return (
        <svg
          viewBox="0 0 60 36"
          className={`w-14 h-9 ${className}`}
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="svcWebPill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#0044FF" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="56" height="32" rx="16" fill="url(#svcWebPill)" />
          <path
            d="M23.5 12.5L17.5 18L23.5 23.5M36.5 12.5L42.5 18L36.5 23.5M32.2 11.5L27.8 24.5"
            stroke="#FFFFFF"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    /* 2. Network Services (Starlink, Wi-Fi Zones & LAN Setup) */
    case 'network-services':
    case 'networking-solutions':
      return (
        <svg
          viewBox="0 0 48 40"
          className={`w-11 h-10 ${className}`}
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M8 16.5C12.5 11.8 18 9.5 24 9.5C30 9.5 35.5 11.8 40 16.5"
            stroke="#0044FF"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M13.5 22C16.4 18.8 20 17.2 24 17.2C28 17.2 31.6 18.8 34.5 22"
            stroke="#0EA5E9"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M19 27.5C20.4 25.9 22.1 25.1 24 25.1C25.9 25.1 27.6 25.9 29 27.5"
            stroke="#0044FF"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <circle cx="24" cy="32.5" r="2.6" fill="#0044FF" />
        </svg>
      );

    /* 3. Maintenance (IT Support) — Computer Maintenance & Lab Setup */
    case 'it-support-maintenance':
      return (
        <svg
          viewBox="0 0 44 44"
          className={`w-10 h-10 ${className}`}
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M34.8 9.2C33.4 7.8 31.4 7.4 29.6 8.1L32.2 10.7C32.7 11.2 32.7 12 32.2 12.5L30.5 14.2C30 14.7 29.2 14.7 28.7 14.2L26.1 11.6C25.4 13.4 25.8 15.4 27.2 16.8C28.4 18 30.1 18.5 31.7 18.2L15.1 34.8C14.1 35.8 12.5 35.8 11.5 34.8L9.2 32.5C8.2 31.5 8.2 29.9 9.2 28.9L25.8 12.3C25.5 10.7 26 9 27.2 7.8C29.4 5.6 32.8 5.6 34.8 9.2Z"
            fill="#0044FF"
          />
          <path
            d="M8.5 8.5L12.5 6.8L15.5 11.5L13.8 13.2L23.2 22.6L21.1 24.7L11.7 15.3L10 17L6.8 12.5L8.5 8.5Z"
            fill="#0044FF"
          />
          <rect
            x="23.5"
            y="24.2"
            width="13.5"
            height="6.4"
            rx="3.2"
            transform="rotate(45 23.5 24.2)"
            fill="#0038FF"
            stroke="#FFFFFF"
            strokeWidth="1.2"
          />
        </svg>
      );

    /* 4. Cybersecurity (CCTV & Digital Defense) */
    case 'cybersecurity':
      return (
        <svg
          viewBox="0 0 44 44"
          className={`w-10 h-10 ${className}`}
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="svcSecShield" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0055FF" />
              <stop offset="100%" stopColor="#0022B8" />
            </linearGradient>
          </defs>
          <path
            d="M22 4L7 10.2V20.5C7 29.8 13.4 38.2 22 40.5C30.6 38.2 37 29.8 37 20.5V10.2L22 4Z"
            fill="url(#svcSecShield)"
          />
          <path
            d="M18.2 19.5V16.8C18.2 14.7 19.9 13 22 13C24.1 13 25.8 14.7 25.8 16.8V19.5"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <rect x="15.8" y="19.2" width="12.4" height="9.8" rx="2" fill="#FFFFFF" />
          <circle cx="22" cy="23.6" r="1.4" fill="#0038FF" />
          <path d="M22 24.6V26.4" stroke="#0038FF" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );

    /* 5. Dedicated Teams */
    case 'dedicated-teams':
      return (
        <svg
          viewBox="0 0 48 44"
          className={`w-11 h-10 ${className}`}
          fill="none"
          aria-hidden="true"
        >
          <circle cx="24" cy="13" r="5" fill="#0040FF" />
          <path
            d="M14.5 34.5C14.5 28.4 18.8 24 24 24C29.2 24 33.5 28.4 33.5 34.5V36H14.5V34.5Z"
            fill="#0040FF"
          />
          <circle cx="11.5" cy="17" r="3.8" fill="#0EA5E9" />
          <path
            d="M4.5 34.5C4.5 29.8 7.6 26.2 11.5 26.2C12.8 26.2 14 26.6 15 27.3C13.3 29.2 12.4 31.8 12.4 34.5V36H4.5V34.5Z"
            fill="#0EA5E9"
          />
          <circle cx="36.5" cy="17" r="3.8" fill="#0EA5E9" />
          <path
            d="M43.5 34.5V36H35.6V34.5C35.6 31.8 34.7 29.2 33 27.3C34 26.6 35.2 26.2 36.5 26.2C40.4 26.2 43.5 29.8 43.5 34.5Z"
            fill="#0EA5E9"
          />
        </svg>
      );

    /* 6. Tracking (Equipment, Vehicle & IoT Recovery) */
    case 'tracking':
    case 'tracking-support':
    default:
      return (
        <svg
          viewBox="0 0 44 44"
          className={`w-10 h-10 ${className}`}
          fill="none"
          aria-hidden="true"
        >
          <circle cx="22" cy="22" r="16" stroke="#0044FF" strokeWidth="2.4" strokeOpacity="0.3" />
          <circle cx="22" cy="22" r="10.5" stroke="#0044FF" strokeWidth="2.4" />
          <circle cx="22" cy="22" r="4" fill="#DC0914" />
          <path
            d="M22 3V9M22 35V41M3 22H9M35 22H41"
            stroke="#0044FF"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export function CareerFeatureIcon({
  id,
  className = '',
}: {
  id: string;
  className?: string;
}) {
  switch (id) {
    /* 1. Innovative Projects — Bold Solid Royal-Blue Tilted Rocket */
    case 'innovative-projects':
      return (
        <svg
          viewBox="0 0 44 44"
          className={`w-10 h-10 ${className}`}
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M35.5 8.5C30 8.8 24.3 11 19.6 15.7L17.4 17.9L11.2 17.4L7.8 20.8L13.4 23.5L20.5 30.6L23.2 36.2L26.6 32.8L26.1 26.6L28.3 24.4C33 19.7 35.2 14 35.5 8.5Z"
            fill="#0040FF"
          />
          <circle cx="26.5" cy="17.5" r="2.7" fill="#FFFFFF" />
          <path
            d="M11 29C9 31 8.5 34.5 9.5 35.5C10.5 36.5 14 36 16 34"
            fill="#0040FF"
          />
        </svg>
      );

    /* 2. Supportive Team — Bold Solid Royal-Blue 3-Person Team Silhouette */
    case 'supportive-team':
      return (
        <svg
          viewBox="0 0 48 44"
          className={`w-11 h-10 ${className}`}
          fill="none"
          aria-hidden="true"
        >
          {/* Center Team Lead */}
          <circle cx="24" cy="13" r="5" fill="#0040FF" />
          <path
            d="M14.5 34.5C14.5 28.4 18.8 24 24 24C29.2 24 33.5 28.4 33.5 34.5V36H14.5V34.5Z"
            fill="#0040FF"
          />
          {/* Left Team Member */}
          <circle cx="11.5" cy="17" r="3.8" fill="#0040FF" />
          <path
            d="M4.5 34.5C4.5 29.8 7.6 26.2 11.5 26.2C12.8 26.2 14 26.6 15 27.3C13.3 29.2 12.4 31.8 12.4 34.5V36H4.5V34.5Z"
            fill="#0040FF"
          />
          {/* Right Team Member */}
          <circle cx="36.5" cy="17" r="3.8" fill="#0040FF" />
          <path
            d="M43.5 34.5V36H35.6V34.5C35.6 31.8 34.7 29.2 33 27.3C34 26.6 35.2 26.2 36.5 26.2C40.4 26.2 43.5 29.8 43.5 34.5Z"
            fill="#0040FF"
          />
        </svg>
      );

    /* 3. Career Growth — Royal-Blue Bar Chart + Ascending Trend Arrow */
    case 'career-growth':
      return (
        <svg
          viewBox="0 0 44 44"
          className={`w-10 h-10 ${className}`}
          fill="none"
          aria-hidden="true"
        >
          <rect x="7" y="26" width="6" height="12" rx="1.2" fill="#0040FF" />
          <rect x="16" y="21" width="6" height="17" rx="1.2" fill="#0040FF" />
          <rect x="25" y="16" width="6" height="22" rx="1.2" fill="#0040FF" />
          <rect x="34" y="11" width="6" height="27" rx="1.2" fill="#0040FF" />
          <path
            d="M8 20L17.5 13L23.5 16L34.5 6.5M34.5 6.5H28.5M34.5 6.5V12.5"
            stroke="#0040FF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    /* 4. Competitive Benefits — Solid Royal-Blue Trophy Cup */
    default:
      return (
        <svg
          viewBox="0 0 44 44"
          className={`w-10 h-10 ${className}`}
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M14 7H30V18.5C30 23 26.4 26.5 22 26.5C17.6 26.5 14 23 14 18.5V7Z"
            fill="#0040FF"
          />
          <path
            d="M14 10H9.2C7.8 10 6.8 11.1 6.8 12.5V15.2C6.8 17.8 8.9 19.8 11.5 19.8H14M30 10H34.8C36.2 10 37.2 11.1 37.2 12.5V15.2C37.2 17.8 35.1 19.8 32.5 19.8H30"
            stroke="#0040FF"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="19.5" y="26" width="5" height="6.5" fill="#0040FF" />
          <rect x="13" y="32.5" width="18" height="4.5" rx="1.5" fill="#0040FF" />
        </svg>
      );
  }
}

/* Solid Royal-Blue Briefcase Icon matching Current Openings rows */
export function SolidBriefcaseIcon({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-5 h-5 ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 5.5C9 4.4 9.9 3.5 11 3.5H13C14.1 3.5 15 4.4 15 5.5V7H9V5.5Z"
        stroke="#0032B8"
        strokeWidth="2"
      />
      <rect x="2.5" y="7" width="19" height="13.5" rx="2.5" fill="#0032B8" />
      <path d="M2.5 12.5H21.5" stroke="#FFFFFF" strokeWidth="1.4" strokeOpacity="0.4" />
      <rect x="10.2" y="11" width="3.6" height="3" rx="0.8" fill="#FFFFFF" />
    </svg>
  );
}

/* 3D Metallic Gold Trophy Icon matching Projects "Have a Project in Mind?" banner */
export function ProjectGoldTrophyIcon({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={`w-10 h-10 sm:w-11 sm:h-11 ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="projGoldBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="45%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="projGoldBase" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#92400E" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
      </defs>
      {/* Left & Right Handles */}
      <path
        d="M14 11H8.5C6.6 11 5.5 12.4 5.5 14.2V17.5C5.5 21 8.4 23.6 12.2 23.6H15"
        stroke="url(#projGoldBody)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M34 11H39.5C41.4 11 42.5 12.4 42.5 14.2V17.5C42.5 21 39.6 23.6 35.8 23.6H33"
        stroke="url(#projGoldBody)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Cup Chalice */}
      <path
        d="M13.5 7.5H34.5V20.5C34.5 26.2 29.8 30.8 24 30.8C18.2 30.8 13.5 26.2 13.5 20.5V7.5Z"
        fill="url(#projGoldBody)"
      />
      {/* Rim Highlight */}
      <rect x="12.5" y="6.5" width="23" height="3" rx="1.5" fill="#FEF3C7" />
      {/* Stem & Pedestal */}
      <rect x="21" y="30" width="6" height="7" fill="url(#projGoldBody)" />
      <path d="M16 37H32L34 42H14L16 37Z" fill="url(#projGoldBase)" />
      <rect x="13" y="40.5" width="22" height="3" rx="1.2" fill="#D97706" />
    </svg>
  );
}

/* Crisp Red Location Marker Pin for Buea Map Card */
export function MapMarkerPinIcon({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 36 44"
      className={`w-8 h-10 drop-shadow-md ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 2C9.7 2 3 8.7 3 17C3 27.8 18 42 18 42C18 42 33 27.8 33 17C33 8.7 26.3 2 18 2Z"
        fill="#EF1D28"
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      <circle cx="18" cy="17" r="5.5" fill="#FFFFFF" />
    </svg>
  );
}

/* Home Hero KPI Strip — Dimensional Gradient Icons */
export function HomeKpiIcon({
  type,
  className = '',
}: {
  type: 'community' | 'projects' | 'uptime' | 'excellence';
  className?: string;
}) {
  switch (type) {
    case 'community':
      return (
        <svg viewBox="0 0 40 40" className={`w-6 h-6 sm:w-7 sm:h-7 ${className}`} fill="none" aria-hidden="true">
          <circle cx="20" cy="13" r="4.5" fill="#0038FF" />
          <path d="M12 30.5C12 25.5 15.6 22 20 22C24.4 22 28 25.5 28 30.5V32H12V30.5Z" fill="#0038FF" />
          <circle cx="9.5" cy="16.5" r="3.2" fill="#3B82F6" />
          <path d="M4 30.5C4 26.7 6.5 23.8 9.8 23.8C11 23.8 12.1 24.1 13 24.7C11.4 26.4 10.6 28.4 10.6 30.5V32H4V30.5Z" fill="#3B82F6" />
          <circle cx="30.5" cy="16.5" r="3.2" fill="#3B82F6" />
          <path d="M36 30.5V32H29.4V30.5C29.4 28.4 28.6 26.4 27 24.7C27.9 24.1 29 23.8 30.2 23.8C33.5 23.8 36 26.7 36 30.5Z" fill="#3B82F6" />
        </svg>
      );

    case 'projects':
      return (
        <svg viewBox="0 0 44 40" className={`w-6 h-6 sm:w-7 sm:h-7 ${className}`} fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="homeProjGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#0038FF" />
            </linearGradient>
          </defs>
          <rect x="3" y="6" width="38" height="28" rx="9" fill="url(#homeProjGrad)" />
          <path
            d="M17 15.2L12.2 20L17 24.8M27 15.2L31.8 20L27 24.8M23.6 14.2L20.4 25.8"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'uptime':
      return (
        <svg viewBox="0 0 40 40" className={`w-6 h-6 sm:w-7 sm:h-7 ${className}`} fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="homeUptimeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0055FF" />
              <stop offset="100%" stopColor="#001ACC" />
            </linearGradient>
          </defs>
          <path
            d="M20 4L7 9.6V19C7 27.6 12.6 35 20 37C27.4 35 33 27.6 33 19V9.6L20 4Z"
            fill="url(#homeUptimeGrad)"
          />
          <path
            d="M14.5 20.5L18.2 24.2L26 16.4"
            stroke="#FFFFFF"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 40 40" className={`w-6 h-6 sm:w-7 sm:h-7 ${className}`} fill="none" aria-hidden="true">
          <path
            d="M13 7H27V17C27 20.9 23.9 24 20 24C16.1 24 13 20.9 13 17V7Z"
            fill="#0038FF"
          />
          <path
            d="M13 10H8.8C7.5 10 6.5 11 6.5 12.2V14.5C6.5 16.8 8.4 18.6 10.8 18.6H13M27 10H31.2C32.5 10 33.5 11 33.5 12.2V14.5C33.5 16.8 31.6 18.6 29.2 18.6H27"
            stroke="#0038FF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <rect x="17.8" y="23.5" width="4.4" height="5.5" fill="#0038FF" />
          <rect x="12" y="29" width="16" height="4" rx="1.5" fill="#DC0914" />
        </svg>
      );
  }
}

/* Home & About Precision Bullseye Mission Icon */
export function MissionBadgeIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 44 44" className={`w-7 h-7 sm:w-9 sm:h-9 ${className}`} fill="none" aria-hidden="true">
      <circle cx="22" cy="22" r="18" fill="#0038FF" fillOpacity="0.12" />
      <circle cx="22" cy="22" r="13" fill="#0038FF" />
      <circle cx="22" cy="22" r="8" fill="#FFFFFF" />
      <circle cx="22" cy="22" r="3.8" fill="#DC0914" />
      <path d="M24 20L35 9M35 9H29.5M35 9V14.5" stroke="#001ACC" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Home & About Horizon Compass Vision Icon */
export function VisionBadgeIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 44 44" className={`w-7 h-7 sm:w-9 sm:h-9 ${className}`} fill="none" aria-hidden="true">
      <circle cx="22" cy="22" r="18" fill="#DC0914" fillOpacity="0.1" />
      <circle cx="22" cy="22" r="13.5" fill="#07133B" stroke="#0038FF" strokeWidth="2" />
      <polygon points="27.5,16.5 23.5,24.5 16.5,27.5 19.5,19.5" fill="#FFFFFF" />
      <polygon points="27.5,16.5 23.5,24.5 20.5,21.5" fill="#EF4444" />
      <circle cx="22" cy="22" r="2" fill="#0EA5E9" />
    </svg>
  );
}

/* Dark-Surface Glowing Icons for "Why Choose SAMITECH" & "What Drives SAMITECH" */
export function DarkPillarIcon({
  variant,
  className = '',
}: {
  variant: 'tech' | 'architecture' | 'shield';
  className?: string;
}) {
  if (variant === 'tech') {
    return (
      <svg viewBox="0 0 40 40" className={`w-7 h-7 sm:w-8 sm:h-8 ${className}`} fill="none" aria-hidden="true">
        <path
          d="M15 4V8M20 4V8M25 4V8M15 32V36M20 32V36M25 32V36M4 15H8M4 20H8M4 25H8M32 15H36M32 20H36M32 25H36"
          stroke="#38BDF8"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <rect x="8.5" y="8.5" width="23" height="23" rx="5.5" fill="#0038FF" stroke="#38BDF8" strokeWidth="1.8" />
        <rect x="14" y="14" width="12" height="12" rx="2.5" fill="#22D3EE" />
      </svg>
    );
  }
  if (variant === 'architecture') {
    return (
      <svg viewBox="0 0 40 40" className={`w-7 h-7 sm:w-8 sm:h-8 ${className}`} fill="none" aria-hidden="true">
        <path d="M20 6L35 13.5L20 21L5 13.5L20 6Z" fill="#38BDF8" />
        <path d="M7.5 20.5L20 26.8L32.5 20.5" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.5 27.5L20 33.8L32.5 27.5" stroke="#0044FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 40" className={`w-7 h-7 sm:w-8 sm:h-8 ${className}`} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="darkShieldRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
      </defs>
      <path d="M20 4L7.5 9.2V19C7.5 27.5 12.8 34.8 20 37C27.2 34.8 32.5 27.5 32.5 19V9.2L20 4Z" fill="url(#darkShieldRed)" stroke="#FCA5A5" strokeWidth="1.4" />
      <path d="M15 20.2L18.4 23.6L25.5 16.5" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Home Careers Bold Graduation Cap Badge */
export function CareersCapIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 36 32" className={`w-5 h-5 sm:w-6 sm:h-6 ${className}`} fill="none" aria-hidden="true">
      <path d="M18 3L2 10.5L18 18L34 10.5L18 3Z" fill="#0038FF" />
      <path d="M8 15.2V22.5C8 25.5 12.5 28 18 28C23.5 28 28 25.5 28 22.5V15.2L18 20L8 15.2Z" fill="#0022B8" />
      <path d="M32 12V22" stroke="#DC0914" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="32" cy="23.5" r="2" fill="#DC0914" />
    </svg>
  );
}

/* About Hero 4 Mini-Card Bold Dimensional Icons */
export function AboutHighlightIcon({
  id,
  className = '',
}: {
  id: string;
  className?: string;
}) {
  switch (id) {
    case 'innovative-solutions':
      return (
        <svg viewBox="0 0 40 36" className={`w-6 h-5 sm:w-7 sm:h-6 lg:w-8 lg:h-7 ${className}`} fill="none" aria-hidden="true">
          <rect x="6" y="5" width="28" height="19" rx="3" fill="#0038FF" />
          <path d="M15.5 11.5L12 14.5L15.5 17.5M24.5 11.5L28 14.5L24.5 17.5M21.2 10.8L18.8 18.2" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 27.5H38L35 31H5L2 27.5Z" fill="#0022B8" />
        </svg>
      );

    case 'trusted-partnership':
      return (
        <svg viewBox="0 0 40 40" className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 ${className}`} fill="none" aria-hidden="true">
          <path d="M20 4L7 9.5V19C7 27.5 12.6 34.8 20 37C27.4 34.8 33 27.5 33 19V9.5L20 4Z" fill="#0038FF" />
          <path d="M14.5 20.5L18.2 24.2L26 16.4" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'youth-led-innovation':
      return (
        <svg viewBox="0 0 44 40" className={`w-6 h-5 sm:w-7 sm:h-6 lg:w-8 lg:h-7 ${className}`} fill="none" aria-hidden="true">
          <circle cx="22" cy="13" r="4.5" fill="#0038FF" />
          <path d="M13.5 32C13.5 26.8 17.2 23 22 23C26.8 23 30.5 26.8 30.5 32V33.5H13.5V32Z" fill="#0038FF" />
          <circle cx="10.5" cy="17" r="3.4" fill="#0038FF" />
          <path d="M4.5 32C4.5 28 7.2 25 10.5 25C11.7 25 12.8 25.3 13.7 25.9C12.2 27.6 11.4 29.7 11.4 32V33.5H4.5V32Z" fill="#0038FF" />
          <circle cx="33.5" cy="17" r="3.4" fill="#0038FF" />
          <path d="M39.5 32V33.5H32.6V32C32.6 29.7 31.8 27.6 30.3 25.9C31.2 25.3 32.3 25 33.5 25C36.8 25 39.5 28 39.5 32Z" fill="#0038FF" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 40 40" className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 ${className}`} fill="none" aria-hidden="true">
          <path
            d="M16.4 4.5C19 3.8 22 4.2 24.1 5.7C25.5 6.7 26.1 8.1 27.6 9.1C29.1 9.9 31.4 10.1 32.4 11.6C33.2 12.8 32 14.6 31 15.8C30.2 16.8 29.8 17.9 30.2 19.2C30.7 20.7 31.3 22.2 30.5 24C29.7 25.8 27.8 26.8 26.8 28.6C25.8 30.2 25.5 32.4 24.2 34C23.2 35.3 21.2 36 20 34.7C18.8 33.2 19 30.7 18.2 28.9C17.3 27.1 16.2 25.4 16.2 23.4C16.2 21.6 16.7 20.1 15.5 18.6C14.3 17.3 12.3 17.1 11 16C9.5 14.7 8.7 12.7 9.5 10.9C10.3 9.2 12.2 8.2 13.8 7.4C14.7 6.9 15.7 5.5 16.4 4.5Z"
            fill="#0038FF"
          />
          <circle cx="20.5" cy="16" r="2.2" fill="#FFFFFF" />
          <circle cx="24" cy="23.5" r="1.6" fill="#22D3EE" />
          <path d="M31.8 26.8C32.3 26.5 33 27 33 27.8C33.1 29 32.6 30.3 32 30.6C31.3 31 30.7 30.3 30.8 29.3C31 28.5 31.1 27.2 31.8 26.8Z" fill="#0038FF" />
        </svg>
      );
  }
}

/* About Dark KPI Strip Glowing Cyan Icons (Consistent with Projects Hero Bar) */
export function AboutDarkKpiIcon({
  id,
  className = '',
}: {
  id: string;
  className?: string;
}) {
  const cls = `w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 shrink-0 ${className}`;
  switch (id) {
    case 'founded':
      return (
        <svg viewBox="0 0 36 36" className={cls} fill="none" aria-hidden="true">
          <rect x="4" y="7" width="28" height="24" rx="4.5" fill="#0EA5E9" fillOpacity="0.16" stroke="#38BDF8" strokeWidth="2" />
          <path d="M4 14H32M12 4V9M24 4V9" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="18" cy="22.5" r="2.5" fill="#22D3EE" />
        </svg>
      );
    case 'empowered':
      return (
        <svg viewBox="0 0 36 36" className={cls} fill="none" aria-hidden="true">
          <circle cx="18" cy="12" r="4" fill="#38BDF8" />
          <path d="M10.5 28C10.5 23.6 13.8 20.5 18 20.5C22.2 20.5 25.5 23.6 25.5 28V29.5H10.5V28Z" fill="#38BDF8" />
          <circle cx="8" cy="15.5" r="2.8" fill="#22D3EE" fillOpacity="0.8" />
          <path d="M3 28C3 24.8 5.2 22.3 8 22.3C9.1 22.3 10.1 22.6 11 23.2" stroke="#22D3EE" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="28" cy="15.5" r="2.8" fill="#22D3EE" fillOpacity="0.8" />
          <path d="M33 28C33 24.8 30.8 22.3 28 22.3C26.9 22.3 25.9 22.6 25 23.2" stroke="#22D3EE" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'global-vision':
      return (
        <svg viewBox="0 0 36 36" className={cls} fill="none" aria-hidden="true">
          <circle cx="18" cy="18" r="13" fill="#0EA5E9" fillOpacity="0.16" stroke="#38BDF8" strokeWidth="2.1" />
          <ellipse cx="18" cy="18" rx="6" ry="13" stroke="#22D3EE" strokeWidth="1.8" />
          <path d="M5.5 18H30.5M7.5 12H28.5M7.5 24H28.5" stroke="#38BDF8" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 36 36" className={cls} fill="none" aria-hidden="true">
          <path d="M11.5 6H24.5V15.5C24.5 19.2 21.6 22 18 22C14.4 22 11.5 19.2 11.5 15.5V6Z" fill="#38BDF8" />
          <path d="M11.5 9H7.5C6.4 9 5.5 9.9 5.5 11V13.2C5.5 15.3 7.2 17 9.4 17H11.5M24.5 9H28.5C29.6 9 30.5 9.9 30.5 11V13.2C30.5 15.3 28.8 17 26.6 17H24.5" stroke="#22D3EE" strokeWidth="2.2" strokeLinecap="round" />
          <rect x="16" y="21.5" width="4" height="5" fill="#38BDF8" />
          <rect x="11" y="26.5" width="14" height="3.5" rx="1.2" fill="#22D3EE" />
        </svg>
      );
  }
}
