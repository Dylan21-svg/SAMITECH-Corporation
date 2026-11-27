interface ServiceWireframeIconProps {
  slug: string;
  className?: string;
}

/**
 * Faceted geometric wireframe SVG icons matching the clean architectural line style
 * from SAMITECH's expanded services catalog.
 */
export function ServiceWireframeIcon({
  slug,
  className = 'w-8 h-8',
}: ServiceWireframeIconProps) {
  switch (slug) {
    case 'product-scope':
      // Faceted diamond wireframe (blue)
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
          <polygon
            points="9,7 27,7 33,15 18,31 3,15"
            stroke="#0284C7"
            strokeWidth="1.65"
            strokeLinejoin="round"
          />
          <line x1="3" y1="15" x2="33" y2="15" stroke="#0284C7" strokeWidth="1.5" />
          <polyline
            points="9,7 13,15 18,31 23,15 27,7"
            stroke="#0284C7"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <polyline
            points="13,15 18,7 23,15"
            stroke="#0284C7"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'ai-development':
      // Multi-faceted wireframe pyramid / neural lattice (violet)
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
          <polygon
            points="18,4 32,25 18,32 4,25"
            stroke="#7C3AED"
            strokeWidth="1.65"
            strokeLinejoin="round"
          />
          <line x1="18" y1="4" x2="18" y2="32" stroke="#7C3AED" strokeWidth="1.45" />
          <line x1="4" y1="25" x2="32" y2="25" stroke="#7C3AED" strokeWidth="1.35" />
          <polyline
            points="11,15 18,19 25,15"
            stroke="#7C3AED"
            strokeWidth="1.35"
            strokeLinejoin="round"
          />
          <polyline
            points="11,15 18,25 25,15"
            stroke="#7C3AED"
            strokeWidth="1.2"
            strokeOpacity="0.85"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'mvp-builder':
      // Faceted triangular prism / tetrahedron (amber-gold)
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
          <polygon
            points="18,4 32,26 18,31 4,26"
            stroke="#EAB308"
            strokeWidth="1.65"
            strokeLinejoin="round"
          />
          <line x1="18" y1="4" x2="18" y2="31" stroke="#EAB308" strokeWidth="1.5" />
          <polyline
            points="4,26 18,19 32,26"
            stroke="#EAB308"
            strokeWidth="1.45"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'software-services':
    case 'custom-software':
      // Faceted crystal octahedron wireframe (teal/blue)
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
          <polygon
            points="18,3 31,18 18,33 5,18"
            stroke="#002BFF"
            strokeWidth="1.65"
            strokeLinejoin="round"
          />
          <line x1="5" y1="18" x2="31" y2="18" stroke="#002BFF" strokeWidth="1.45" />
          <line x1="18" y1="3" x2="18" y2="33" stroke="#002BFF" strokeWidth="1.45" />
          <polyline
            points="12,11 18,18 24,11"
            stroke="#002BFF"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'ux-ui':
      // Isometric wireframe cube (magenta-pink)
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
          <polygon
            points="18,4 31,11.5 31,24.5 18,32 5,24.5 5,11.5"
            stroke="#DB2777"
            strokeWidth="1.65"
            strokeLinejoin="round"
          />
          <polyline
            points="5,11.5 18,18.5 31,11.5"
            stroke="#DB2777"
            strokeWidth="1.55"
            strokeLinejoin="round"
          />
          <line x1="18" y1="18.5" x2="18" y2="32" stroke="#DB2777" strokeWidth="1.55" />
        </svg>
      );

    case 'dedicated-teams':
      // Geometric person & interlocking chevron frame (coral-orange)
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
          <circle cx="18" cy="9.5" r="4.5" stroke="#EA580C" strokeWidth="1.65" />
          <polygon
            points="18,16 30,30 22.5,30 18,24.5 13.5,30 6,30"
            stroke="#EA580C"
            strokeWidth="1.65"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'network-services':
    case 'networking-solutions':
      // Interconnected routing mesh hexagon (electric blue)
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
          <polygon
            points="18,4 30,11 30,25 18,32 6,25 6,11"
            stroke="#0284C7"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <line x1="18" y1="4" x2="18" y2="32" stroke="#0284C7" strokeWidth="1.35" />
          <line x1="6" y1="11" x2="30" y2="25" stroke="#0284C7" strokeWidth="1.35" />
          <line x1="30" y1="11" x2="6" y2="25" stroke="#0284C7" strokeWidth="1.35" />
          <circle cx="18" cy="18" r="3" fill="#EEF3FF" stroke="#0284C7" strokeWidth="1.5" />
        </svg>
      );

    case 'it-support-maintenance':
      // Precision maintenance gear & calibration core (teal)
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
          <polygon
            points="18,4 28,8 32,18 28,28 18,32 8,28 4,18 8,8"
            stroke="#0F766E"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="18" cy="18" r="5" stroke="#0F766E" strokeWidth="1.6" />
          <line x1="18" y1="4" x2="18" y2="13" stroke="#0F766E" strokeWidth="1.35" />
          <line x1="18" y1="23" x2="18" y2="32" stroke="#0F766E" strokeWidth="1.35" />
        </svg>
      );

    case 'cybersecurity':
      // Faceted security shield lattice (crimson-red)
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
          <path
            d="M18 4L30 9.5V18C30 25.2 24.9 30.8 18 33C11.1 30.8 6 25.2 6 18V9.5L18 4Z"
            stroke="#DC0914"
            strokeWidth="1.65"
            strokeLinejoin="round"
          />
          <line x1="18" y1="4" x2="18" y2="33" stroke="#DC0914" strokeWidth="1.35" />
          <polyline
            points="10,16 18,21 26,16"
            stroke="#DC0914"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'tracking':
    case 'tracking-support':
    default:
      // Authorized Equipment Tracking geometric radar node (navy/blue)
      return (
        <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
          <circle cx="18" cy="18" r="13" stroke="#07133B" strokeWidth="1.6" />
          <circle cx="18" cy="18" r="7.5" stroke="#002BFF" strokeWidth="1.45" />
          <circle cx="18" cy="18" r="2.5" fill="#DC0914" />
          <line x1="18" y1="2" x2="18" y2="8" stroke="#07133B" strokeWidth="1.5" />
          <line x1="18" y1="28" x2="18" y2="34" stroke="#07133B" strokeWidth="1.5" />
          <line x1="2" y1="18" x2="8" y2="18" stroke="#07133B" strokeWidth="1.5" />
          <line x1="28" y1="18" x2="34" y2="18" stroke="#07133B" strokeWidth="1.5" />
        </svg>
      );
  }
}
