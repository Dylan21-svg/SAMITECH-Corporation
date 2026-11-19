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
    /* 1. Web Development — Blue capsule pill with sharp white </> code brackets */
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

    /* 2. Mobile App Development — Cobalt blue capsule pill with white smartphone cutout */
    case 'mobile-app-development':
      return (
        <svg
          viewBox="0 0 60 36"
          className={`w-14 h-9 ${className}`}
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="svcMobPill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0055FF" />
              <stop offset="100%" stopColor="#001ACC" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="56" height="32" rx="16" fill="url(#svcMobPill)" />
          <rect x="23" y="6.5" width="14" height="23" rx="2.6" fill="#FFFFFF" />
          <rect x="27.2" y="8.4" width="5.6" height="1.4" rx="0.7" fill="#0038FF" />
          <circle cx="30" cy="26.8" r="1.2" fill="#0038FF" />
        </svg>
      );

    /* 3. Cloud Solutions & Deployment — Clean thick-stroke royal-blue cloud outline */
    case 'networking-solutions':
      return (
        <svg
          viewBox="0 0 48 36"
          className={`w-11 h-9 ${className}`}
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M14.5 29.5H34.5C39.2 29.5 42.5 26.2 42.5 21.8C42.5 17.8 39.6 14.7 35.8 14.1C34.7 8.8 30.1 5 24.5 5C18.3 5 13.4 9.6 12.8 15.6C9 16.3 6 19.6 6 23.6C6 27.1 9.6 29.5 14.5 29.5Z"
            stroke="#0044FF"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    /* 4. Cybersecurity — Solid royal-blue Shield with crisp white padlock inside */
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
          {/* White padlock body & shackle */}
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

    /* 5. AI & Machine Learning — Solid royal-blue neural brain + chip nodes */
    case 'ai-development':
      return (
        <svg
          viewBox="0 0 44 44"
          className={`w-10 h-10 ${className}`}
          fill="none"
          aria-hidden="true"
        >
          {/* Top / Bottom / Side neural pins */}
          <path
            d="M17 4.5V8.5M22 3.5V8.5M27 4.5V8.5M17 35.5V39.5M22 35.5V40.5M27 35.5V39.5M4.5 17H8.5M3.5 22H8.5M4.5 27H8.5M35.5 17H39.5M35.5 22H40.5M35.5 27H39.5"
            stroke="#0044FF"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* Left & Right symmetric neural hemispheres */}
          <path
            d="M21 9.5C16.2 9.5 12.5 11.8 11.4 15.2C9.5 16.3 8.5 18.6 8.8 21.1C8.3 23.4 9.1 26 11 27.6C11.9 31.6 15.9 34.5 21 34.5V9.5Z"
            fill="#0044FF"
          />
          <path
            d="M23 9.5C27.8 9.5 31.5 11.8 32.6 15.2C34.5 16.3 35.5 18.6 35.2 21.1C35.7 23.4 34.9 26 33 27.6C32.1 31.6 28.1 34.5 23 34.5V9.5Z"
            fill="#0044FF"
          />
          {/* Crisp white neural circuit lines inside hemispheres */}
          <circle cx="15.5" cy="18" r="1.4" fill="#FFFFFF" />
          <circle cx="15.5" cy="25.5" r="1.4" fill="#FFFFFF" />
          <path d="M15.5 19.4V24.1M18 15.5V28.5" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="28.5" cy="18" r="1.4" fill="#FFFFFF" />
          <circle cx="28.5" cy="25.5" r="1.4" fill="#FFFFFF" />
          <path d="M28.5 19.4V24.1M26 15.5V28.5" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );

    /* 6. Software Consulting — Solid royal-blue 8-tooth precision gear */
    case 'product-scope':
      return (
        <svg
          viewBox="0 0 44 44"
          className={`w-10 h-10 ${className}`}
          fill="none"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.2 4H24.8L25.7 8.1C26.9 8.4 28 8.9 29 9.5L32.6 7.1L36.6 11.1L34.2 14.7C34.9 15.7 35.4 16.8 35.7 18L39.8 18.9V24.5L35.7 25.4C35.4 26.6 34.9 27.7 34.2 28.7L36.6 32.3L32.6 36.3L29 33.9C28 34.6 26.9 35.1 25.7 35.4L24.8 39.5H19.2L18.3 35.4C17.1 35.1 16 34.6 15 33.9L11.4 36.3L7.4 32.3L9.8 28.7C9.1 27.7 8.6 26.6 8.3 25.4L4.2 24.5V18.9L8.3 18C8.6 16.8 9.1 15.7 9.8 14.7L7.4 11.1L11.4 7.1L15 9.5C16 8.9 17.1 8.4 18.3 8.1L19.2 4ZM22 27.2C25 27.2 27.4 24.8 27.4 21.8C27.4 18.8 25 16.4 22 16.4C19 16.4 16.6 18.8 16.6 21.8C16.6 24.8 19 27.2 22 27.2Z"
            fill="#0044FF"
          />
        </svg>
      );

    /* 7. Digital Transformation — Solid royal-blue Cloud with sharp white upward arrow */
    case 'mvp-builder':
      return (
        <svg
          viewBox="0 0 48 40"
          className={`w-11 h-10 ${className}`}
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M13 33H35.5C40.2 33 43.5 29.6 43.5 25C43.5 21 40.6 17.8 36.7 17.2C35.6 11.4 30.6 7 24.5 7C17.9 7 12.6 12 12 18.4C7.9 19.1 4.8 22.6 4.8 26.8C4.8 30.4 8.2 33 13 33Z"
            fill="#0044FF"
          />
          <path
            d="M24 27.5V15.5M24 15.5L19 20.5M24 15.5L29 20.5"
            stroke="#FFFFFF"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    /* 8. IT Support & Maintenance — Royal-blue Crossed Wrench & Screwdriver */
    default:
      return (
        <svg
          viewBox="0 0 44 44"
          className={`w-10 h-10 ${className}`}
          fill="none"
          aria-hidden="true"
        >
          {/* Wrench (top-right to bottom-left) */}
          <path
            d="M34.8 9.2C33.4 7.8 31.4 7.4 29.6 8.1L32.2 10.7C32.7 11.2 32.7 12 32.2 12.5L30.5 14.2C30 14.7 29.2 14.7 28.7 14.2L26.1 11.6C25.4 13.4 25.8 15.4 27.2 16.8C28.4 18 30.1 18.5 31.7 18.2L15.1 34.8C14.1 35.8 12.5 35.8 11.5 34.8L9.2 32.5C8.2 31.5 8.2 29.9 9.2 28.9L25.8 12.3C25.5 10.7 26 9 27.2 7.8C29.4 5.6 32.8 5.6 34.8 9.2Z"
            fill="#0044FF"
          />
          {/* Crossed Screwdriver (top-left shaft to bottom-right handle) */}
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
