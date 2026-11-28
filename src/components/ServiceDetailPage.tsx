import type { CaseStudy } from '../data/samitechData';
import type { ServiceDetail } from '../data/servicesCatalog';
import { useSiteContent } from '../context/SiteContentContext';
import {
  ServiceBottomPager,
  ServiceTopSwitcher,
  type ServiceLayoutProps,
} from './service-layouts/ServiceSharedBlocks';
import {
  MobileAppLayout,
  WebDevelopmentLayout,
} from './service-layouts/WebAndMobileLayouts';
import {
  CloudNetworkingLayout,
  CybersecurityLayout,
  MaintenanceSupportLayout,
  TrackingSupportLayout,
} from './service-layouts/InfraAndSecurityLayouts';
import {
  DedicatedTeamsLayout,
} from './service-layouts/AiAndStudioLayouts';

interface ServiceDetailPageProps {
  service: ServiceDetail;
  onBackToServices: () => void;
  onSelectService: (slug: string) => void;
  onOpenContact: (defaultCategory?: string) => void;
  onOpenCaseStudy: (study: CaseStudy) => void;
}

const DARK_TOP_BAR_SLUGS = new Set(['network-services', 'networking-solutions', 'cybersecurity']);

function renderServiceLayout(slug: string, props: ServiceLayoutProps) {
  switch (slug) {
    case 'software-services':
    case 'custom-software':
    case 'ai-development':
    case 'product-scope':
    case 'mvp-builder':
    case 'ux-ui':
      return <WebDevelopmentLayout {...props} />;
    case 'mobile-app-development':
      return <MobileAppLayout {...props} />;
    case 'network-services':
    case 'networking-solutions':
      return <CloudNetworkingLayout {...props} />;
    case 'it-support-maintenance':
      return <MaintenanceSupportLayout {...props} />;
    case 'cybersecurity':
      return <CybersecurityLayout {...props} />;
    case 'tracking':
    case 'tracking-support':
      return <TrackingSupportLayout {...props} />;
    case 'dedicated-teams':
      return <DedicatedTeamsLayout {...props} />;
    default:
      return <WebDevelopmentLayout {...props} />;
  }
}

export function ServiceDetailPage({
  service,
  onBackToServices,
  onSelectService,
  onOpenContact,
  onOpenCaseStudy,
}: ServiceDetailPageProps) {
  const { services, projects } = useSiteContent();
  const currentIndex = services.findIndex((s) => s.slug === service.slug);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const prevService =
    services[(safeIndex - 1 + services.length) % services.length];
  const nextService =
    services[(safeIndex + 1) % services.length];

  const relatedStudy =
    projects.find((c) => c.id === service.relatedCaseStudyId) ?? projects[0];

  const isDarkHeroService = DARK_TOP_BAR_SLUGS.has(service.slug);

  return (
    <div className="bg-white text-[#07133B]">
      <ServiceTopSwitcher
        service={service}
        darkMode={isDarkHeroService}
        onBackToServices={onBackToServices}
        onSelectService={onSelectService}
      />

      {renderServiceLayout(service.slug, {
        service,
        relatedStudy,
        onOpenContact,
        onOpenCaseStudy,
      })}

      <ServiceBottomPager
        prevService={prevService}
        nextService={nextService}
        onSelectService={onSelectService}
      />
    </div>
  );
}
