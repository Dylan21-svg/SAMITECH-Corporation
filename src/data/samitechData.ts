import aboutHqImg from '../assets/images/about_samitech_hq_1794695612230.webp';
import fiberCoreImg from '../assets/images/samitech_fiber_core_1794695612961.webp';
import softwareFloorImg from '../assets/images/samitech_software_floor_1794695612730.webp';
import hardwareBenchImg from '../assets/images/samitech_hardware_bench_1794695613315.webp';
import nocCenterImg from '../assets/images/samitech_noc_center_1794695614349.webp';
import campusArchImg from '../assets/images/samitech_campus_architecture_1794695614655.webp';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  serviceCategory: string;
  detailSlug: string;
}

export interface WhyPillar {
  id: string;
  title: string;
  description: string;
  accent: 'blue' | 'navy' | 'red';
}

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  sector: string;
  location: string;
  year: string;
  serviceCategory: string;
  summary: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  metrics: CaseStudyMetric[];
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const COMPANY_CONTACT = {
  brandName: 'SamiTech',
  legalName: 'SAMITECH Corporation',
  domain: 'samitech237.com',
  email: 'samitech237@gmail.com',
  phone: '+237 674 137 259',
  location: 'Buea, Cameroon',
  regions: 'Buea · Douala · Yaoundé',
  founded: '2019',
  availability: '24/7 Support',
};

export const ABOUT_MEDIA = {
  image: aboutHqImg,
  alt: 'Multi-story SAMITECH engineering atrium with glass network laboratories and structural steel framing',
  width: 720,
  height: 964,
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'software-development',
    number: '01',
    title: 'Software Development',
    shortDesc: 'Custom web (React, Vue, Angular), mobile apps, and scalable ERP/CRM platforms.',
    image: softwareFloorImg,
    imageAlt: 'Software engineers collaborating at dual-monitor workstations in a modern glass engineering office',
    imageWidth: 720,
    imageHeight: 964,
    serviceCategory: 'Software Development',
    detailSlug: 'custom-software',
  },
  {
    id: 'networking-solutions',
    number: '02',
    title: 'Networking Solutions',
    shortDesc: 'LAN/WAN architecture, OpenVPN setup, cloud management, load balancing, and monitoring.',
    image: fiberCoreImg,
    imageAlt: 'High-density enterprise fiber-optic core switches with structured blue patch cabling',
    imageWidth: 720,
    imageHeight: 964,
    serviceCategory: 'Networking Solutions',
    detailSlug: 'networking-solutions',
  },
  {
    id: 'cybersecurity',
    number: '03',
    title: 'Cybersecurity Services',
    shortDesc: 'Security audits, vulnerability assessments, penetration testing, and incident response.',
    image: hardwareBenchImg,
    imageAlt: 'Network systems engineer inspecting modular enterprise routing hardware and optical transceivers',
    imageWidth: 720,
    imageHeight: 964,
    serviceCategory: 'Cybersecurity Services',
    detailSlug: 'cybersecurity',
  },
  {
    id: 'data-ai-ux',
    number: '04',
    title: 'AI & UX/UI Systems',
    shortDesc: 'Machine learning, Generative AI enablement, and user-centric digital product design.',
    image: campusArchImg,
    imageAlt: 'Contemporary glass and dark steel technology corporate facility illuminated with blue architectural light',
    imageWidth: 720,
    imageHeight: 964,
    serviceCategory: 'AI Development & Enablement',
    detailSlug: 'ai-development',
  },
  {
    id: 'tracking-support',
    number: '05',
    title: 'Tracking & 24/7 Support',
    shortDesc: 'Authorized equipment tracking, recovery coordination, and 24/7 managed IT operations.',
    image: nocCenterImg,
    imageAlt: 'Enterprise Network Operations Center with engineers monitoring topology and system health',
    imageWidth: 720,
    imageHeight: 964,
    serviceCategory: 'Authorized Equipment Tracking',
    detailSlug: 'tracking-support',
  },
];

export const WHY_PILLARS: WhyPillar[] = [
  {
    id: 'proven-experience',
    title: 'Proven Track Record Since 2019',
    description:
      'Over 5 years delivering custom web, mobile, ERP, and enterprise network infrastructure from Buea across Douala, Yaoundé, and global remote clients.',
    accent: 'blue',
  },
  {
    id: 'certified-team',
    title: '15+ Certified Engineers & Specialists',
    description:
      'A multidisciplinary team of software developers, network architects, cybersecurity analysts, and Data & AI engineers backed by industry certifications.',
    accent: 'navy',
  },
  {
    id: 'always-on-support',
    title: '24/7 Support & Security First',
    description:
      'Round-the-clock operational support (+237 674 137 259), defense-in-depth penetration testing, and hands-on engineering mentorship programs.',
    accent: 'red',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'erp-inventory-cloud',
    title: 'Cloud-Backed Inventory & ERP Workflow Platform',
    sector: 'Software Development',
    location: 'Buea & Douala',
    year: '2025',
    serviceCategory: 'Software Development',
    summary:
      'Engineered a scalable React and Node.js enterprise inventory and CRM platform with automated third-party payment and warehouse integrations.',
    challenge:
      'Distributed retail and wholesale branches relied on disconnected spreadsheets, causing stock discrepancies and slow order reconciliation.',
    solution:
      'Built a cloud-native web and mobile application suite with real-time stock synchronization, role-based permissions, and automated reporting.',
    deliverables: [
      'React & Node.js Web Platform',
      'Cross-Platform Mobile Sync App',
      'Third-Party API & ERP Integration',
    ],
    metrics: [
      { value: '99.9%', label: 'Platform Availability' },
      { value: '3x', label: 'Faster Order Processing' },
      { value: '24/7', label: 'Live Stock Sync' },
    ],
    image: softwareFloorImg,
    imageAlt: 'SAMITECH software engineering team collaborating on enterprise application workflows',
    imageWidth: 720,
    imageHeight: 964,
  },
  {
    id: 'lan-wan-vpn-fabric',
    title: 'Multi-Site LAN/WAN & OpenVPN Enterprise Network',
    sector: 'Networking Solutions',
    location: 'Douala & Yaoundé',
    year: '2025',
    serviceCategory: 'Networking Solutions',
    summary:
      'Designed and deployed structured LAN/WAN switching, redundant OpenVPN tunnels, and automated load balancing across regional corporate offices.',
    challenge:
      'Frequent link drops and unsegmented office traffic disrupted access to cloud-hosted applications across AWS and Azure environments.',
    solution:
      'Configured dual-WAN failover, hardened OpenVPN site-to-site configurations, and continuous traffic monitoring for predictable throughput.',
    deliverables: [
      'Structured LAN/WAN Topology',
      'Hardened OpenVPN Configs & Routing',
      'Cloud Load Balancing & Monitoring',
    ],
    metrics: [
      { value: '-58%', label: 'Packet Latency Drop' },
      { value: '99.95%', label: 'WAN Link Uptime' },
      { value: '24/7', label: 'Managed NOC Watch' },
    ],
    image: fiberCoreImg,
    imageAlt: 'High-density core switching and structured blue cabling installed for enterprise networking',
    imageWidth: 720,
    imageHeight: 964,
  },
  {
    id: 'pentest-security-audit',
    title: 'Enterprise Penetration Testing & Defense Hardening',
    sector: 'Cybersecurity Services',
    location: 'Yaoundé, Cameroon',
    year: '2026',
    serviceCategory: 'Cybersecurity Services',
    summary:
      'Executed comprehensive vulnerability assessments, ethical hacking simulations, and incident-response playbooks for a financial services portal.',
    challenge:
      'Rapid digital product expansion exposed unpatched API endpoints and weak internal network segmentation.',
    solution:
      'Conducted full-scope black-box and white-box penetration testing, remediated critical CVEs, and trained internal staff on security awareness.',
    deliverables: [
      'Full Vulnerability & API Audit',
      'Penetration Testing & Remediation',
      'Incident Response Playbooks',
    ],
    metrics: [
      { value: '100%', label: 'Critical CVEs Resolved' },
      { value: '0', label: 'Post-Audit Breaches' },
      { value: '48 hrs', label: 'Remediation Verification' },
    ],
    image: hardwareBenchImg,
    imageAlt: 'Security and hardware specialist validating enterprise routing and network security appliances',
    imageWidth: 720,
    imageHeight: 964,
  },
  {
    id: 'authorized-tracking-system',
    title: 'Authorized Device Recovery & Telemetry Portal',
    sector: 'Tracking & Data Systems',
    location: 'Buea, Cameroon',
    year: '2026',
    serviceCategory: 'Authorized Equipment Tracking',
    summary:
      'Built a verified asset-tracing intake and recovery workflow supporting smartphones, laptops, vehicles, and IoT devices with MTN Mobile Money billing.',
    challenge:
      'Clients needed a compliant, documented channel to trace lost or stolen equipment alongside local carriers and law enforcement.',
    solution:
      'Implemented strict proof-of-ownership verification, automated MTN Mobile Money intake across device tiers, and structured case coordination.',
    deliverables: [
      'Ownership Verification Portal',
      'MTN Mobile Money Checkout Flow',
      'Law Enforcement Case Documentation',
    ],
    metrics: [
      { value: '4 Tiers', label: 'Device Coverage Categories' },
      { value: '25k–85k', label: 'XAF Transparent Pricing' },
      { value: '24/7', label: 'Intake & Case Tracking' },
    ],
    image: nocCenterImg,
    imageAlt: 'SAMITECH operations desk monitoring telemetry and authorized recovery workflows',
    imageWidth: 720,
    imageHeight: 964,
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Where is SAMITECH based and who do you serve?',
    answer:
      'Headquartered in Buea, Cameroon, SAMITECH serves clients in Douala, Yaoundé, and worldwide remotely since 2019.',
  },
  {
    id: 'faq-2',
    question: 'What core technology services does SAMITECH provide?',
    answer:
      'We specialize in Software Development (React, Vue, Angular, iOS, Android, Flutter, ERP/CRM), Networking Solutions (LAN/WAN, VPNs, AWS/Azure/GCP cloud infrastructure), Cybersecurity (audits, penetration testing, incident response), Data & AI, UI/UX Design, and Authorized Equipment Tracking.',
  },
  {
    id: 'faq-3',
    question: 'How does SAMITECH’s Authorized Equipment Tracking service work?',
    answer:
      'Clients submit verified proof of ownership (receipt or original box) along with MTN Mobile Money payment: 35,000 XAF for smartphones/tablets, 45,000 XAF for laptops/desktops, 85,000 XAF for motor vehicles (including law enforcement coordination), and 25,000 XAF for IoT devices. False reporting is strictly prohibited.',
  },
  {
    id: 'faq-4',
    question: 'Do you offer internships or public developer resources?',
    answer:
      'Yes. SAMITECH runs hands-on internship programs in Software Engineering, Networking, and Cybersecurity mentored by our senior engineers, and publishes public configuration guides and tools including OpenVPN setups, Node.js installers, and API documentation.',
  },
  {
    id: 'faq-5',
    question: 'How quickly can we reach SAMITECH for project quotes or 24/7 support?',
    answer:
      'Our engineering and support desk is available 24/7. Reach us directly by phone or WhatsApp at +237 674 137 259, by email at samitech237@gmail.com, or through the consultation form on this page.',
  },
];

export const SERVICE_CATEGORY_OPTIONS = [
  'Product Scope',
  'MVP Builder',
  'AI Development & Enablement',
  'Software Development',
  'UI/UX Design',
  'Dedicated Teams',
  'Networking Solutions',
  'Cybersecurity Services',
  'Authorized Equipment Tracking',
  'Internships & Training',
  'Careers & Job Applications',
];

export const ABOUT_HERO_MEDIA = {
  image: '/assets/about-hero-bg.webp',
  alt: 'SAMITECH Corporation engineer wearing a navy SAMITECH polo and headset beside a laptop in our modern office',
  width: 1600,
  height: 893,
};

export const ABOUT_PAGE_VALUES = [
  {
    id: 'youth-driven-engineering',
    title: 'Youth-Driven Engineering',
    description:
      'Founded by young Cameroonian engineers in Buea, SAMITECH channels fresh technical energy into production-ready software, hardware, and AI platforms built for African realities.',
  },
  {
    id: 'security-reliability',
    title: 'Security & Uptime Rigor',
    description:
      'From hardened enterprise networks and penetration testing to verified device recovery workflows, every engagement is built around 99.9% reliability and client trust.',
  },
  {
    id: 'bridging-digital-divide',
    title: 'Bridging the Digital Divide',
    description:
      'We combine enterprise project delivery with hands-on digital skills mentorship and community programs that have already reached over 10,000 learners and professionals.',
  },
];

export const ABOUT_PAGE_MILESTONES = [
  {
    year: '2022',
    title: 'Founded in Buea',
    detail: 'Launched in Cameroon’s Silicon Mountain hub to unite youth engineering talent around real-world software and hardware challenges.',
  },
  {
    year: '2023',
    title: 'Regional Enterprise Growth',
    detail: 'Expanded software, cloud, and enterprise LAN/WAN networking deployments across Buea, Douala, Yaoundé, and international remote teams.',
  },
  {
    year: '2024',
    title: 'Security & Tracking Division',
    detail: 'Introduced full-scope cybersecurity penetration testing alongside Authorized Equipment Tracking integrated with MTN Mobile Money.',
  },
  {
    year: '2025–2026',
    title: '10K+ Empowered & AI Systems',
    detail: 'Crossed 100+ delivered solutions and 10,000+ empowered community members while scaling modern AI, software, and mentorship tracks.',
  },
];
