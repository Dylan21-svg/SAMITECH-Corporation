import { CASE_STUDIES, type CaseStudy } from '../data/samitechData';
import {
  ALL_SERVICES_CATALOG,
  type ServiceDetail,
} from '../data/servicesCatalog';
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
  TrackingSupportLayout,
} from './service-layouts/InfraAndSecurityLayouts';
import {
  AiMachineLearningLayout,
  DedicatedTeamsLayout,
  MvpBuilderLayout,
  ProductScopeLayout,
  UxUiDesignLayout,
} from './service-layouts/AiAndStudioLayouts';

interface ServiceDetailPageProps {
  service: ServiceDetail;
  onBackToServices: () => void;
  onSelectService: (slug: string) => void;
  onOpenContact: (defaultCategory?: string) => void;
  onOpenCaseStudy: (study: CaseStudy) => void;
}

const DARK_TOP_BAR_SLUGS = new Set(['networking-solutions', 'cybersecurity']);

function renderServiceLayout(slug: string, props: ServiceLayoutProps) {
  switch (slug) {
    case 'custom-software':
      return <WebDevelopmentLayout {...props} />;
    case 'mobile-app-development':
      return <MobileAppLayout {...props} />;
    case 'networking-solutions':
      return <CloudNetworkingLayout {...props} />;
    case 'cybersecurity':
      return <CybersecurityLayout {...props} />;
    case 'ai-development':
      return <AiMachineLearningLayout {...props} />;
    case 'product-scope':
      return <ProductScopeLayout {...props} />;
    case 'mvp-builder':
      return <MvpBuilderLayout {...props} />;
    case 'tracking-support':
      return <TrackingSupportLayout {...props} />;
    case 'ux-ui':
      return <UxUiDesignLayout {...props} />;
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
  const currentIndex = ALL_SERVICES_CATALOG.findIndex((s) => s.slug === service.slug);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const prevService =
    ALL_SERVICES_CATALOG[(safeIndex - 1 + ALL_SERVICES_CATALOG.length) % ALL_SERVICES_CATALOG.length];
  const nextService =
    ALL_SERVICES_CATALOG[(safeIndex + 1) % ALL_SERVICES_CATALOG.length];

  const relatedStudy =
    CASE_STUDIES.find((c) => c.id === service.relatedCaseStudyId) ?? CASE_STUDIES[0];

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
