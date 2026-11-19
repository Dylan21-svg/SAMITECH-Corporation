import projectsHeroLaptopImg from '../assets/images/projects_hero_laptop.webp';
import sylvesterAiImg from '../assets/images/projects_sylvester_ai.webp';
import campusProImg from '../assets/images/projects_campuspro.webp';
import veloraStoreImg from '../assets/images/projects_velora_store.webp';
import codeForgeImg from '../assets/images/projects_codeforge.webp';
import mailConsoleImg from '../assets/images/projects_mail_console.webp';
import netcomImg from '../assets/images/samitech_fiber_core_1794695612961.webp';
import contactHqHeroImg from '../assets/images/contact_hq_hero.webp';
import contactBueaMapImg from '../assets/images/contact_buea_map.webp';
import contactMountainImg from '../assets/images/careers_mountain_growth.webp';
import type { CaseStudy } from './samitechData';

export type ProjectFilterId =
  | 'all'
  | 'web-apps'
  | 'ai-automation'
  | 'business-tools'
  | 'e-commerce'
  | 'cloud-networking'
  | 'education-dev';

export interface ShowcaseProject extends CaseStudy {
  filterCategory: Exclude<ProjectFilterId, 'all'>;
  featured?: boolean;
}

export const PROJECTS_PAGE_MEDIA = {
  heroLaptop: {
    image: projectsHeroLaptopImg,
    alt: 'Glowing dark blue futuristic laptop displaying holographic software engineering code and analytics widgets',
    width: 1376,
    height: 768,
  },
};

export const CONTACT_PAGE_MEDIA = {
  hqHero: {
    image: contactHqHeroImg,
    alt: 'SAMITECH Corporation sleek blue-glass and white architectural corporate headquarters in bright daylight',
    width: 1376,
    height: 768,
  },
  bueaMap: {
    image: contactBueaMapImg,
    alt: 'Street map highlighting SAMITECH Corporation location in Buea, Cameroon',
    width: 1024,
    height: 572,
  },
  bueaScenic: {
    image: contactMountainImg,
    alt: 'Scenic golden view overlooking the mountains of Buea, Cameroon',
    width: 1080,
    height: 806,
  },
};

export const PRIMARY_PROJECT_FILTERS: { id: ProjectFilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'web-apps', label: 'Web Apps' },
  { id: 'ai-automation', label: 'AI & Automation' },
  { id: 'business-tools', label: 'Business Tools' },
  { id: 'e-commerce', label: 'E-commerce' },
];

export const EXTRA_PROJECT_FILTERS: { id: ProjectFilterId; label: string }[] = [
  { id: 'cloud-networking', label: 'Cloud & Networking' },
  { id: 'education-dev', label: 'Education & Dev Tools' },
];

export const PORTFOLIO_PROJECTS: ShowcaseProject[] = [
  {
    id: 'sylvester-ai',
    title: 'Sylvester AI',
    sector: 'AI & Business Intelligence',
    location: 'Buea & Remote',
    year: '2026',
    serviceCategory: 'AI Development & Enablement',
    filterCategory: 'ai-automation',
    featured: true,
    summary: 'AI CRO & Business Intelligence SaaS for e-commerce brands.',
    challenge:
      'High-growth e-commerce storefronts lacked automated funnel diagnostics to pinpoint checkout drop-offs and personalize product recommendations in real time.',
    solution:
      'Engineered an AI conversion rate optimization & BI analytics suite with predictive cohort insights, automated experimentation alerts, and live revenue attribution dashboards.',
    deliverables: [
      'Real-Time Funnel & BI Telemetry Engine',
      'AI Conversion Audit & Anomaly Alerts',
      'React & TypeScript SaaS Executive Console',
    ],
    metrics: [
      { value: '+28%', label: 'Average Checkout Lift' },
      { value: '1.2M+', label: 'Events Processed / Day' },
      { value: '99.9%', label: 'SaaS Platform Uptime' },
    ],
    image: sylvesterAiImg,
    imageAlt: 'Sylvester AI conversion optimization and business intelligence analytics dashboard',
    imageWidth: 960,
    imageHeight: 536,
  },
  {
    id: 'campuspro',
    title: 'CampusPro',
    sector: 'EdTech Web Platform',
    location: 'Buea & Yaoundé',
    year: '2025',
    serviceCategory: 'Software Development',
    filterCategory: 'web-apps',
    summary: 'Student management system for modern campuses.',
    challenge:
      'Universities and polytechnics struggled with fragmented paper transcripts, manual fee reconciliation, and delayed semester GPA publication.',
    solution:
      'Built an end-to-end academic ERP portal supporting course registration, Mobile Money tuition verification, attendance tracking, and instant automated transcript generation.',
    deliverables: [
      'Student & Faculty Self-Service Portal',
      'MTN / Orange Mobile Money Tuition Sync',
      'Automated GPA & Transcript Engine',
    ],
    metrics: [
      { value: '15,000+', label: 'Active Student Records' },
      { value: '85%', label: 'Faster Result Publication' },
      { value: '24/7', label: 'Cloud Portal Access' },
    ],
    image: campusProImg,
    imageAlt: 'African university students collaborating on laptops in a modern CampusPro classroom',
    imageWidth: 960,
    imageHeight: 536,
  },
  {
    id: 'velora-store',
    title: 'VELORA Store',
    sector: 'E-commerce Platform',
    location: 'Douala & Online',
    year: '2025',
    serviceCategory: 'Software Development',
    filterCategory: 'e-commerce',
    summary: 'Modern e-commerce platform with seamless shopping.',
    challenge:
      'Growing retail brands needed an ultra-fast mobile storefront integrated directly with local Mobile Money wallets and real-time courier dispatch.',
    solution:
      'Designed and shipped a conversion-focused progressive storefront with instant catalog filtering, unified MTN MoMo & card checkout, and live warehouse stock synchronization.',
    deliverables: [
      'High-Speed React Retail Storefront',
      'Mobile Money & Card Payment Gateway',
      'Merchant Inventory & Dispatch Console',
    ],
    metrics: [
      { value: '0.8s', label: 'Median Page Load' },
      { value: '3.2x', label: 'Mobile Conversion Gain' },
      { value: '99.95%', label: 'Checkout Reliability' },
    ],
    image: veloraStoreImg,
    imageAlt: 'VELORA Store retail showcase with shopping cart and colorful shopping bags',
    imageWidth: 960,
    imageHeight: 536,
  },
  {
    id: 'codeforge',
    title: 'CodeForge',
    sector: 'Developer Tools',
    location: 'Silicon Mountain, Buea',
    year: '2025',
    serviceCategory: 'Software Development',
    filterCategory: 'education-dev',
    summary: 'Offline coding platform for LeetCode-style practice.',
    challenge:
      'Computer science students and bootcamp cohorts in bandwidth-constrained areas needed a reliable local platform to practice algorithmic interviews without constant internet.',
    solution:
      'Created an offline-first containerized code runner and problem judge supporting Python, JavaScript, C++, and Go with automated test-case grading and cohort leaderboards.',
    deliverables: [
      'Sandboxed Multi-Language Code Judge',
      'Offline-First Desktop & LAN Mode',
      'Curated Data Structures Problem Bank',
    ],
    metrics: [
      { value: '100%', label: 'Offline Functional Mode' },
      { value: '500+', label: 'Algorithm Challenges' },
      { value: '<120ms', label: 'Sandboxed Execution' },
    ],
    image: codeForgeImg,
    imageAlt: 'CodeForge offline coding platform IDE running automated test suites',
    imageWidth: 960,
    imageHeight: 536,
  },
  {
    id: 'mail-console',
    title: 'Mail Console',
    sector: 'Business Automation',
    location: 'Cameroon & Global',
    year: '2026',
    serviceCategory: 'Software Development',
    filterCategory: 'business-tools',
    summary: 'Smart email management and analytics tool.',
    challenge:
      'Sales and customer operations teams had zero visibility into SLA response times, transactional email deliverability, and shared support inbox bottlenecks.',
    solution:
      'Built an intelligent email routing & deliverability analytics workspace featuring DKIM/DMARC health telemetry, AI thread triage, and automated SLA escalation tracking.',
    deliverables: [
      'Unified Multi-Inbox Triage Console',
      'DMARC / SPF / DKIM Reputation Monitor',
      'Real-Time SLA & Engagement Analytics',
    ],
    metrics: [
      { value: '99.4%', label: 'Inbox Deliverability Rate' },
      { value: '-48%', label: 'First-Response Time' },
      { value: '1K+', label: 'Daily Team Threads' },
    ],
    image: mailConsoleImg,
    imageAlt: 'Mail Console glowing blue wireframe envelope over smart analytics circuits',
    imageWidth: 960,
    imageHeight: 536,
  },
  {
    id: 'netcom',
    title: 'NETCOM',
    sector: 'Enterprise Networking',
    location: 'Buea · Douala · Yaoundé',
    year: '2025',
    serviceCategory: 'Networking Solutions',
    filterCategory: 'cloud-networking',
    summary: 'Network solutions for a connected Africa.',
    challenge:
      'Multi-site regional enterprises suffered frequent ISP outages, unsegmented branch traffic, and vulnerable remote VPN tunnels.',
    solution:
      'Architected redundant dual-WAN fiber failover, hardened OpenVPN site-to-site mesh routing, automated cloud load balancing, and 24/7 NOC telemetry.',
    deliverables: [
      'Multi-Site Fiber & LAN/WAN Architecture',
      'Zero-Trust OpenVPN & Firewall Hardening',
      '24/7 Proactive Network Monitoring',
    ],
    metrics: [
      { value: '99.95%', label: 'Multi-Site WAN Uptime' },
      { value: '-58%', label: 'Cross-Branch Latency' },
      { value: '24/7', label: 'NOC Security Watch' },
    ],
    image: netcomImg,
    imageAlt: 'NETCOM high-density blue illuminated enterprise fiber network server racks',
    imageWidth: 720,
    imageHeight: 964,
  },
];
