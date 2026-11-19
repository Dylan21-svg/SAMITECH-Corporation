import aboutHqImg from '../assets/images/about_samitech_hq_1794695612230.webp';
import fiberCoreImg from '../assets/images/samitech_fiber_core_1794695612961.webp';
import softwareFloorImg from '../assets/images/samitech_software_floor_1794695612730.webp';
import hardwareBenchImg from '../assets/images/samitech_hardware_bench_1794695613315.webp';
import nocCenterImg from '../assets/images/samitech_noc_center_1794695614349.webp';
import campusArchImg from '../assets/images/samitech_campus_architecture_1794695614655.webp';
import servicesCtaHqImg from '../assets/images/services_cta_hq.webp';
import careersMountainGrowthImg from '../assets/images/careers_mountain_growth.webp';

export const SERVICES_SHOWCASE_MEDIA = {
  heroCloud: {
    image: '/assets/aistudio/Neon_Cloud_Computing_in_Hand_694526ce.png',
    alt: 'Futuristic neon glowing cloud computing hologram with code, security shield, and database icons hovering above a hand on a deep cobalt blue background',
    width: 1672,
    height: 941,
  },
  ctaHq: {
    image: servicesCtaHqImg,
    alt: 'SAMITECH Corporation modern blue-glass technology headquarters at twilight',
    width: 1200,
    height: 670,
  },
};

export const CAREERS_SHOWCASE_MEDIA = {
  teamHero: {
    image: '/assets/aistudio/SAMITECH_Team_Collaboration_in_Modern_Office_a64eb672.png',
    alt: 'Three smiling SAMITECH Corporation engineers in branded polos collaborating around a laptop in a bright blue glass office',
    width: 1944,
    height: 809,
  },
  mountainGrowth: {
    image: careersMountainGrowthImg,
    alt: 'Hiker standing on a rocky mountain summit overlooking layered valleys at golden sunset',
    width: 1080,
    height: 806,
  },
};

export type ServiceGroup = 'product-software' | 'ai-design' | 'infrastructure-security';

export interface ServiceMetric {
  value: string;
  label: string;
}

export interface ServiceCapability {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  detail: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  slug: string;
  number: string;
  group: ServiceGroup;
  groupLabel: string;
  title: string;
  shortDesc: string;
  tagline: string;
  heroTitle: string;
  heroAccent: string;
  heroDescription: string;
  timelineLabel: string;
  engagementModel: string;
  contactCategory: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  accentColor: string;
  metrics: ServiceMetric[];
  capabilities: ServiceCapability[];
  processSteps: ServiceProcessStep[];
  deliverables: string[];
  techStack: string[];
  idealFor: {
    audience: string;
    outcome: string;
  }[];
  faqs: ServiceFaq[];
  relatedCaseStudyId: string;
}

export const CORE_SERVICES_GRID_SLUGS = [
  'custom-software',
  'mobile-app-development',
  'networking-solutions',
  'cybersecurity',
  'ai-development',
  'product-scope',
  'mvp-builder',
  'tracking-support',
] as const;

export const STUDIO_TRACK_SLUGS = [
  'product-scope',
  'mvp-builder',
  'ux-ui',
  'dedicated-teams',
] as const;

export const SERVICE_GROUPS: { id: 'all' | ServiceGroup; label: string }[] = [
  { id: 'all', label: 'All Services' },
  { id: 'product-software', label: 'Web, Mobile & Studio' },
  { id: 'ai-design', label: 'AI & UX/UI' },
  { id: 'infrastructure-security', label: 'Cloud, Security & Support' },
];

export const ALL_SERVICES_CATALOG: ServiceDetail[] = [
  {
    slug: 'custom-software',
    number: '01',
    group: 'product-software',
    groupLabel: 'Web & Enterprise Platforms',
    title: 'Web Development',
    shortDesc: 'Modern, scalable and high-performance websites, SaaS portals, and custom web applications.',
    tagline: 'Enterprise React, TypeScript, Vue, and Node.js systems engineered for high speed and 99.9% uptime.',
    heroTitle: 'High-Performance Platforms via',
    heroAccent: 'Web & Custom Software',
    heroDescription:
      'From responsive corporate platforms to multi-branch ERP, CRM, and fintech web portals, SAMITECH applies lean engineering frameworks and clean modular architectures built to scale smoothly across Africa and global markets.',
    timelineLabel: '4–12 Weeks Per Phase',
    engagementModel: 'Full-Stack Build · Modernization',
    contactCategory: 'Software Development',
    image: softwareFloorImg,
    imageAlt: 'SAMITECH software engineers building modern scalable web platforms',
    imageWidth: 720,
    imageHeight: 964,
    accentColor: '#002BFF',
    metrics: [
      { value: '100+', label: 'Web Platforms Delivered' },
      { value: '99.9%', label: 'Target Uptime SLA' },
      { value: '3x', label: 'Faster Workflow Processing' },
    ],
    capabilities: [
      {
        title: 'Custom Web Applications (React, Vue, Angular)',
        description:
          'Responsive single-page apps, client portals, and interactive dashboards engineered for instant load speed.',
      },
      {
        title: 'Bespoke ERP, CRM & Billing Suites',
        description:
          'Unify inventory, payroll, invoicing, and third-party Mobile Money/card checkouts into one platform.',
      },
      {
        title: 'Scalable Backend APIs & Microservices',
        description:
          'Documented Node.js and Python backends with role-based permissions, audit logs, and PostgreSQL indexing.',
      },
      {
        title: 'Legacy System Upgrades & Maintenance',
        description:
          'Eliminate slow spreadsheets and aging codebases with clean migrations and zero operational downtime.',
      },
    ],
    processSteps: [
      {
        step: '01.',
        title: 'Architecture & Schema Blueprint',
        detail: 'Define normalized databases, user roles, and clean REST/GraphQL API specs.',
      },
      {
        step: '02.',
        title: 'Agile Full-Stack Sprints',
        detail: 'Ship tested UI and backend features in weekly live staging environments.',
      },
      {
        step: '03.',
        title: 'Automated QA & Security Verification',
        detail: 'Validate cross-device responsiveness, load handling, and OWASP security.',
      },
      {
        step: '04.',
        title: 'Cloud Launch & Continuous Support',
        detail: 'Zero-downtime deployment with automated backups and monitoring alerts.',
      },
    ],
    deliverables: [
      'Production-Grade Responsive Web Application & Source Code',
      'REST / GraphQL Backend APIs & PostgreSQL Database',
      'Role-Based Access Control (RBAC) & Admin Portal',
      'Automated CI/CD Deployment Pipeline',
      'Documentation & Technical Team Handover',
    ],
    techStack: ['React', 'TypeScript', 'Next.js', 'Vue', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    idealFor: [
      {
        audience: 'Businesses Scaling Beyond Templates & Spreadsheets',
        outcome: 'Operate on tailored web software built specifically around your billing and branch workflows.',
      },
      {
        audience: 'Startups Launching Web SaaS Products',
        outcome: 'Ship maintainable, fast TypeScript applications ready for high customer concurrency.',
      },
    ],
    faqs: [
      {
        question: 'Which web stacks does SAMITECH build with most often?',
        answer:
          'We specialize in React, TypeScript, Next.js, Vue, Angular, Node.js, Python, and PostgreSQL deployed cleanly across AWS, Azure, GCP, or Vercel.',
      },
      {
        question: 'Can you integrate MTN Mobile Money, Orange Money, or Stripe?',
        answer:
          'Yes. We routinely implement local Mobile Money APIs alongside international card and bank payment providers.',
      },
    ],
    relatedCaseStudyId: 'erp-inventory-cloud',
  },
  {
    slug: 'mobile-app-development',
    number: '02',
    group: 'product-software',
    groupLabel: 'Android & iOS Apps',
    title: 'Mobile App Development',
    shortDesc: 'Powerful and user-friendly mobile apps engineered for Android & iOS.',
    tagline: 'Cross-platform Flutter and native mobile experiences built for speed, offline resilience, and retention.',
    heroTitle: 'Seamless Experiences With',
    heroAccent: 'Mobile App Development',
    heroDescription:
      'Put your service directly in customers’ hands across Android and iOS. SAMITECH designs and engineers fast, battery-friendly mobile apps with offline data sync, push alerts, biometric security, and Mobile Money checkout flows tailored to African and international users.',
    timelineLabel: '6–12 Weeks to Store Launch',
    engagementModel: 'iOS · Android · Flutter',
    contactCategory: 'Mobile App Development',
    image: softwareFloorImg,
    imageAlt: 'SAMITECH mobile application engineers testing Android and iOS interfaces',
    imageWidth: 720,
    imageHeight: 964,
    accentColor: '#002BFF',
    metrics: [
      { value: '2 Platforms', label: 'Single Unified Codebase' },
      { value: '60 fps', label: 'Fluid Native Interaction' },
      { value: 'Offline+', label: 'Sync-Ready Architecture' },
    ],
    capabilities: [
      {
        title: 'Cross-Platform Flutter & React Native',
        description:
          'Ship simultaneously to Google Play and Apple App Store with shared business logic and native performance.',
      },
      {
        title: 'Offline-First Synchronization',
        description:
          'Keep field agents, riders, and customers productive even in low-connectivity zones with background queue sync.',
      },
      {
        title: 'Mobile Payments, Maps & Telemetry',
        description:
          'Integrate MTN/Orange Mobile Money prompts, live GPS tracking, QR scanning, and push notifications.',
      },
      {
        title: 'App Store & Play Store Publishing',
        description:
          'Full compliance review, signing key management, crash analytics, and smooth phased releases.',
      },
    ],
    processSteps: [
      {
        step: '01.',
        title: 'Mobile Flow & Device Audit',
        detail: 'Design thumb-friendly screens and map offline edge cases early.',
      },
      {
        step: '02.',
        title: 'Interactive UI Prototyping',
        detail: 'Validate navigation and onboarding speed on real Android and iOS devices.',
      },
      {
        step: '03.',
        title: 'App & API Integration Sprints',
        detail: 'Connect secure mobile APIs, push messaging, and encrypted local storage.',
      },
      {
        step: '04.',
        title: 'QA & Store Deployment',
        detail: 'Device-matrix testing, store submission, and live crash monitoring.',
      },
    ],
    deliverables: [
      'Published Android (.aab) & iOS App Store Builds',
      'Clean Flutter / React Native Source Repository',
      'Offline Storage & Background API Sync Engine',
      'Push Notification & Analytics Instrumentation',
    ],
    techStack: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'TypeScript', 'Firebase FCM', 'REST / GraphQL'],
    idealFor: [
      {
        audience: 'Delivery, Fintech & Field Operations',
        outcome: 'Equip customers and field staff with reliable Android and iOS apps that work smoothly anywhere.',
      },
      {
        audience: 'Consumer Startups Scaling Mobile Reach',
        outcome: 'Reach both Android and iOS users faster from one maintainable engineering budget.',
      },
    ],
    faqs: [
      {
        question: 'Do you build for both Android and iOS simultaneously?',
        answer:
          'Yes. Using Flutter and React Native — or native Swift/Kotlin when specialized hardware is required — we deliver polished releases for both platforms.',
      },
      {
        question: 'Do you handle Google Play and Apple App Store submission?',
        answer:
          'Yes, including store metadata guidance, compliance checks, and automated build pipelines.',
      },
    ],
    relatedCaseStudyId: 'authorized-tracking-system',
  },
  {
    slug: 'networking-solutions',
    number: '03',
    group: 'infrastructure-security',
    groupLabel: 'Cloud & Network Fabric',
    title: 'Cloud Solutions & Deployment',
    shortDesc: 'Secure, scalable and reliable cloud infrastructure, LAN/WAN networks, and OpenVPN setups.',
    tagline: 'AWS, Azure, GCP cloud engineering paired with high-availability LAN/WAN and multi-site VPNs.',
    heroTitle: 'Resilient Scale Powered by',
    heroAccent: 'Cloud & Network Solutions',
    heroDescription:
      'Modern digital platforms depend on rock-solid infrastructure underneath. SAMITECH architects cloud deployments across AWS, Azure, and GCP alongside structured LAN/WAN topologies, hardened OpenVPN tunnels, load balancing, and continuous uptime monitoring.',
    timelineLabel: 'Rapid Rollout & 24/7 Watch',
    engagementModel: 'Cloud DevOps · Networking',
    contactCategory: 'Networking Solutions',
    image: fiberCoreImg,
    imageAlt: 'High-density enterprise fiber-optic core switches and cloud infrastructure racks',
    imageWidth: 720,
    imageHeight: 964,
    accentColor: '#0284C7',
    metrics: [
      { value: '99.95%', label: 'Measured Link & Cloud Uptime' },
      { value: '-58%', label: 'Packet Latency Improvement' },
      { value: '24/7', label: 'Infrastructure Telemetry' },
    ],
    capabilities: [
      {
        title: 'AWS, Azure & GCP Cloud Deployment',
        description:
          'Containerized hosting, auto-scaling clusters, CDN caching, SSL automation, and database backups.',
      },
      {
        title: 'Structured LAN / WAN & VLAN Fabrics',
        description:
          'High-throughput office and campus routing separating corporate, guest, and critical server traffic.',
      },
      {
        title: 'Hardened OpenVPN & Site-to-Site Tunnels',
        description:
          'Connect offices across Buea, Douala, Yaoundé, and remote teams through encrypted private tunnels.',
      },
      {
        title: 'Multi-ISP Load Balancing & CI/CD',
        description:
          'Dual-WAN failover and automated zero-downtime deployment pipelines for uninterrupted delivery.',
      },
    ],
    processSteps: [
      {
        step: '01.',
        title: 'Infrastructure & Traffic Audit',
        detail: 'Pinpoint latency bottlenecks, single points of failure, and cloud spending waste.',
      },
      {
        step: '02.',
        title: 'Redundant Cloud & Network Blueprint',
        detail: 'Design multi-AZ cloud clusters, firewalls, and failover routing policies.',
      },
      {
        step: '03.',
        title: 'Automated Deployment & Cutover',
        detail: 'Migrate workloads and configure switches/VPNs cleanly during zero-impact windows.',
      },
      {
        step: '04.',
        title: '24/7 Monitoring & Patching',
        detail: 'Real-time uptime alerts, resource tuning, and scheduled disaster-recovery drills.',
      },
    ],
    deliverables: [
      'AWS / Azure / GCP Production Infrastructure & Terraform/Docker Configs',
      'Structured LAN/WAN Topology Diagrams & Hardened OpenVPN Profiles',
      'Automated SSL, Backups & Multi-ISP Failover Setup',
      '24/7 Health Check & Alerting Dashboards',
    ],
    techStack: ['AWS', 'Azure', 'GCP', 'Docker', 'OpenVPN', 'Nginx / HAProxy', 'GitHub Actions', 'VLAN / BGP'],
    idealFor: [
      {
        audience: 'Growing SaaS & Multi-Branch Companies',
        outcome: 'Stop outages before they happen with automated cloud scaling and dual-ISP office failover.',
      },
      {
        audience: 'Distributed Remote Engineering Teams',
        outcome: 'Collaborate inside encrypted internal staging and server networks effortlessly.',
      },
    ],
    faqs: [
      {
        question: 'Can SAMITECH manage both cloud hosting and physical office networks?',
        answer:
          'Yes. We connect on-premise switching and OpenVPN setups seamlessly with cloud environments across AWS, Azure, and GCP.',
      },
      {
        question: 'Do you optimize existing cloud bills and slow servers?',
        answer:
          'Yes. Most audits uncover over-provisioned instances and missing caching layers that cut monthly cloud spend immediately.',
      },
    ],
    relatedCaseStudyId: 'lan-wan-vpn-fabric',
  },
  {
    slug: 'cybersecurity',
    number: '04',
    group: 'infrastructure-security',
    groupLabel: 'Defense & Auditing',
    title: 'Cybersecurity',
    shortDesc: 'Protect your data and business with penetration testing, vulnerability audits, and defense.',
    tagline: 'Proactive offensive testing and defense-in-depth hardening before attackers exploit weak links.',
    heroTitle: 'Safeguard Your Business With',
    heroAccent: 'Cybersecurity Services',
    heroDescription:
      'Digital growth expands your attack surface. SAMITECH’s security specialists perform black-box and white-box penetration tests, API and infrastructure audits, remediation verification within 48 hours, and incident response — protecting client trust and sensitive financial flows.',
    timelineLabel: '1–3 Weeks Per Audit Cycle',
    engagementModel: 'Pentesting · Retainer Defense',
    contactCategory: 'Cybersecurity Services',
    image: hardwareBenchImg,
    imageAlt: 'SAMITECH cybersecurity specialist auditing enterprise routing and network security systems',
    imageWidth: 720,
    imageHeight: 964,
    accentColor: '#DC0914',
    metrics: [
      { value: '100%', label: 'Critical CVEs Remediated' },
      { value: '48 hrs', label: 'Fix Verification Turnaround' },
      { value: '0', label: 'Post-Audit Breaches' },
    ],
    capabilities: [
      {
        title: 'Web, Mobile & API Penetration Testing',
        description:
          'Simulate realistic exploits across auth flows, payment endpoints, RBAC permissions, and API logic.',
      },
      {
        title: 'Cloud & Network Vulnerability Audits',
        description:
          'Inspect open ports, firewall configurations, IAM roles, TLS certificates, and server hardening.',
      },
      {
        title: 'Incident Response & Threat Containment',
        description:
          'Rapid forensic investigation, key rotation, and clean recovery playbooks during live incidents.',
      },
      {
        title: 'Developer & Staff Security Awareness',
        description:
          'Train internal staff against social engineering and equip developers on OWASP Top 10 defenses.',
      },
    ],
    processSteps: [
      {
        step: '01.',
        title: 'Attack Surface Mapping',
        detail: 'Inventory domains, APIs, cloud buckets, and privilege boundaries.',
      },
      {
        step: '02.',
        title: 'Controlled Exploitation',
        detail: 'Execute manual ethical hacking alongside automated scanners across OWASP vectors.',
      },
      {
        step: '03.',
        title: 'Developer-Ready Patch Guidance',
        detail: 'Deliver severity-ranked proof-of-concepts and exact remediation code.',
      },
      {
        step: '04.',
        title: '48-Hour Re-Test & Sign-Off',
        detail: 'Verify resolved fixes and issue an executive security audit report.',
      },
    ],
    deliverables: [
      'Executive & Technical Penetration Test Report',
      'CVSS Severity Matrix with Actionable Fix Snippets',
      'Cloud IAM, WAF & Firewall Hardening Rules',
      '48-Hour Remediation Verification Summary',
    ],
    techStack: ['OWASP Top 10', 'Burp Suite', 'Nmap / Wireshark', 'Zero-Trust IAM', 'TLS 1.3', 'WAF'],
    idealFor: [
      {
        audience: 'Fintech, Mobile Money & E-Commerce Teams',
        outcome: 'Validate payment and API integrity prior to scaling transaction volume.',
      },
      {
        audience: 'Enterprises Seeking Partner Security Assurance',
        outcome: 'Present verified third-party penetration test compliance to enterprise clients.',
      },
    ],
    faqs: [
      {
        question: 'Will penetration testing disrupt our live users?',
        answer:
          'No. Tests are carefully scoped and scheduled cleanly with staging replication for intrusive checks.',
      },
      {
        question: 'Do you assist developers in fixing found vulnerabilities?',
        answer:
          'Yes. Our engineering bench works directly with your developers to patch issues and re-verify fixes within 48 hours.',
      },
    ],
    relatedCaseStudyId: 'pentest-security-audit',
  },
  {
    slug: 'ai-development',
    number: '05',
    group: 'ai-design',
    groupLabel: 'Artificial Intelligence',
    title: 'AI & Machine Learning',
    shortDesc: 'Intelligent Machine Learning and Generative AI solutions to automate and optimize your business.',
    tagline: 'From private RAG knowledge engines and bilingual copilots to predictive analytics pipelines.',
    heroTitle: 'Future-Ready Automation With',
    heroAccent: 'AI & Machine Learning',
    heroDescription:
      'SAMITECH builds and embeds practical AI capabilities directly into your business systems — private document RAG assistants, English/French automated support agents, predictive demand/risk ML models, and workflow automation engineered with strict enterprise data privacy.',
    timelineLabel: '4–10 Weeks to Production',
    engagementModel: 'AI Enablement · Custom ML',
    contactCategory: 'AI Development & Enablement',
    image: campusArchImg,
    imageAlt: 'SAMITECH corporate AI research and machine learning engineering facility',
    imageWidth: 720,
    imageHeight: 964,
    accentColor: '#7C3AED',
    metrics: [
      { value: '60%+', label: 'Manual Triage Time Saved' },
      { value: 'Private', label: 'Zero-Leak Enterprise Data' },
      { value: '99.9%', label: 'API Inference Availability' },
    ],
    capabilities: [
      {
        title: 'Generative AI & Private RAG Copilots',
        description:
          'Query company handbooks, invoices, contracts, and ERP databases instantaneously with source citations.',
      },
      {
        title: 'Predictive Machine Learning Analytics',
        description:
          'Demand forecasting, anomaly detection, credit risk scoring, and customer churn insights.',
      },
      {
        title: 'Workflow & Support Automation',
        description:
          'Automate bilingual French/English customer triage, PDF data extraction, and executive reporting.',
      },
      {
        title: 'AI Guardrails & Cost Control',
        description:
          'Prompt-injection defense, evaluation benchmarks, caching, and token budget governance.',
      },
    ],
    processSteps: [
      {
        step: '01.',
        title: 'AI Readiness & ROI Discovery',
        detail: 'Audit internal datasets, latency targets, and high-impact automation use cases.',
      },
      {
        step: '02.',
        title: '2-Week Proof of Value',
        detail: 'Benchmark accuracy directly on anonymized company records before scaling.',
      },
      {
        step: '03.',
        title: 'Production Model & API Integration',
        detail: 'Embed vector search, structured tool calling, and fallback safety inside your apps.',
      },
      {
        step: '04.',
        title: 'Telemetry & Team Enablement',
        detail: 'Launch monitoring dashboards and train staff on practical daily workflows.',
      },
    ],
    deliverables: [
      'AI Readiness & ROI Assessment Blueprint',
      'Private RAG / LLM API Microservice with Guardrails',
      'Custom ML Training & Evaluation Pipeline',
      'Admin Cost & Accuracy Monitoring Dashboard',
    ],
    techStack: ['Python', 'TypeScript', 'Gemini API', 'PyTorch', 'pgvector', 'FastAPI', 'LangGraph'],
    idealFor: [
      {
        audience: 'Operations-Heavy Companies & Support Desks',
        outcome: 'Cut manual document review and ticket triage dramatically while keeping human oversight.',
      },
      {
        audience: 'Digital Products Adding Smart Intelligence',
        outcome: 'Ship dependable AI search, summaries, and forecasting natively inside your product.',
      },
    ],
    faqs: [
      {
        question: 'Is our company data exposed to public model training?',
        answer:
          'Never. Enterprise APIs and private VPC deployments operate with zero-retention data isolation.',
      },
      {
        question: 'Do we need huge clean datasets to start with AI?',
        answer:
          'Not always. Private RAG workflows work immediately with existing PDFs, policies, and structured databases.',
      },
    ],
    relatedCaseStudyId: 'erp-inventory-cloud',
  },
  {
    slug: 'product-scope',
    number: '06',
    group: 'product-software',
    groupLabel: 'Consulting & Alignment',
    title: 'Software Consulting & Product Scope',
    shortDesc: 'Expert guidance and a 15-day Product Scope process to turn ideas into validated technical blueprints.',
    tagline: 'Align stakeholders, UX wireframes, BPMN flows, and technical architecture before full build.',
    heroTitle: 'De-Risk Every Build With',
    heroAccent: 'Consulting & 15-Day Scope',
    heroDescription:
      'Building software without verified requirements causes expensive delays. Through our 15-day Product Scope and Software Consulting advisory, SAMITECH helps founders and CTOs lock down user stories, technical architecture, cloud costs, and clickable Figma prototypes before committing full development budget.',
    timelineLabel: '15-Day Scope Sprint',
    engagementModel: 'Fixed-Scope Discovery',
    contactCategory: 'Product Scope',
    image: aboutHqImg,
    imageAlt: 'SAMITECH strategic software consulting and architecture workspace',
    imageWidth: 720,
    imageHeight: 964,
    accentColor: '#0284C7',
    metrics: [
      { value: '15 Days', label: 'Complete Blueprint Delivery' },
      { value: '-35%', label: 'Avoided Rework Savings' },
      { value: '100%', label: 'Architecture & Budget Clarity' },
    ],
    capabilities: [
      {
        title: '15-Day Product Scope Alignment',
        description:
          'Translate raw product vision into crisp user stories, release phases, and measurable KPIs.',
      },
      {
        title: 'BPMN Workflows & System Architecture',
        description:
          'Map business rules, third-party integrations, database schemas, and cloud sizing specs.',
      },
      {
        title: 'Clickable UX Wireframe Prototypes',
        description:
          'Preview and validate every user screen in Figma prior to writing production code.',
      },
      {
        title: 'CTO Advisory & Codebase Audits',
        description:
          'Objective second opinions on vendor proposals, scaling bottlenecks, and security readiness.',
      },
    ],
    processSteps: [
      {
        step: '01.',
        title: 'Value Proposition & KPI Alignment',
        detail: 'Days 1–3: Clarify target users, revenue model, and critical operational constraints.',
      },
      {
        step: '02.',
        title: 'Feature Mapping & Backlog Cut',
        detail: 'Days 4–7: Separate Version-1 essentials from low-ROI scope bloat.',
      },
      {
        step: '03.',
        title: 'UX Flows & Interactive Wireframes',
        detail: 'Days 8–11: Assemble testable clickable screens covering happy paths and edge cases.',
      },
      {
        step: '04.',
        title: 'Architecture Memo & Fixed Quote',
        detail: 'Days 12–15: Deliver complete technical specs, timeline, and engineering budget.',
      },
    ],
    deliverables: [
      'Complete User Stories & Prioritized Release Backlog',
      'BPMN 2.0 Operational Workflow Diagrams',
      'Interactive Clickable Figma Wireframe Prototype',
      'Technical Architecture Memorandum & Build Estimate',
    ],
    techStack: ['Figma', 'BPMN 2.0', 'OpenAPI', 'System Design', 'AWS Sizing', 'Technical Due Diligence'],
    idealFor: [
      {
        audience: 'Founders Preparing Fundable Builds',
        outcome: 'Enter engineering or investor rooms with unambiguous blueprints instead of vague decks.',
      },
      {
        audience: 'Enterprises Procuring Custom Systems',
        outcome: 'Unite finance, operations, and IT leadership around a single locked specification.',
      },
    ],
    faqs: [
      {
        question: 'What happens after the 15-day Product Scope completes?',
        answer:
          'You own every diagram, user story, and prototype completely and can proceed seamlessly into our MVP Builder or Custom Software build — or hand off to any team.',
      },
    ],
    relatedCaseStudyId: 'erp-inventory-cloud',
  },
  {
    slug: 'mvp-builder',
    number: '07',
    group: 'product-software',
    groupLabel: 'MVP & Digital Modernization',
    title: 'Digital Transformation & MVP Builder',
    shortDesc: 'Upgrade legacy operations and launch fundable Minimum Viable Products rapidly.',
    tagline: 'Lean frameworks applied to modernizing workflows and shipping v1 products in 6–10 weeks.',
    heroTitle: 'Move Faster Through',
    heroAccent: 'Digital Transformation & MVPs',
    heroDescription:
      'Whether modernizing manual paper-based enterprise operations or launching a brand-new startup MVP to capture market traction, SAMITECH strips away unnecessary complexity to ship clean, working digital products rapidly and reliably.',
    timelineLabel: '6–10 Weeks to Go-Live',
    engagementModel: 'Lean Agile Transformation',
    contactCategory: 'MVP Builder',
    image: softwareFloorImg,
    imageAlt: 'SAMITECH engineers accelerating digital transformation and MVP delivery',
    imageWidth: 720,
    imageHeight: 964,
    accentColor: '#EAB308',
    metrics: [
      { value: '6–10 Wks', label: 'Launch Window' },
      { value: '2x', label: 'Faster Market Validation' },
      { value: '0', label: 'Throwaway Prototype Debt' },
    ],
    capabilities: [
      {
        title: 'Rapid Minimum Viable Product (MVP) Build',
        description:
          'Go from validated scope to live paying users with payments, auth, and analytics ready.',
      },
      {
        title: 'Paper-to-Digital Workflow Automation',
        description:
          'Replace disconnected spreadsheets and manual approvals with real-time cloud dashboards.',
      },
      {
        title: 'Production-Clean Modular Stack',
        description:
          'Built on TypeScript, React, Flutter, and PostgreSQL so version 2 expands cleanly without rewrites.',
      },
      {
        title: 'Team Onboarding & Change Management',
        description:
          'Guided staff training so digital tools stick across branches and leadership.',
      },
    ],
    processSteps: [
      {
        step: '01.',
        title: 'Bottleneck & Core Loop Lock',
        detail: 'Identify highest-leverage features or manual workflows to digitize first.',
      },
      {
        step: '02.',
        title: 'Streamlined UI & Data Migration',
        detail: 'Design clean everyday interfaces and import historical client/inventory data cleanly.',
      },
      {
        step: '03.',
        title: 'Weekly Staging Increments',
        detail: 'Test real builds every week with founders and department leads.',
      },
      {
        step: '04.',
        title: 'Live Rollout & Telemetry Tracking',
        detail: 'Measure adoption, conversion, and time saved from day one.',
      },
    ],
    deliverables: [
      'Live Web or Mobile MVP / Modernized Operations Portal',
      'Clean Modular Git Codebase & Automated Backups',
      'Payment Integrations (MTN MoMo, Orange Money, Stripe)',
      'Staff Training Guides & Analytics Dashboard',
    ],
    techStack: ['React', 'TypeScript', 'Flutter', 'Node.js', 'PostgreSQL', 'MTN MoMo API', 'Cloud CI/CD'],
    idealFor: [
      {
        audience: 'Venture Founders Testing Market Fit',
        outcome: 'Get real users onboarding and paying fast without burning multi-quarter runway.',
      },
      {
        audience: 'Established Businesses Digitizing Operations',
        outcome: 'Eliminate manual reporting delays and scattered files across offices.',
      },
    ],
    faqs: [
      {
        question: 'Will we have to rebuild our MVP from scratch once users grow?',
        answer:
          'No. Every MVP uses clean TypeScript and relational database architecture meant to scale into full enterprise volume.',
      },
    ],
    relatedCaseStudyId: 'erp-inventory-cloud',
  },
  {
    slug: 'tracking-support',
    number: '08',
    group: 'infrastructure-security',
    groupLabel: '24/7 Operations & Recovery',
    title: 'IT Support, Maintenance & Tracking',
    shortDesc: '24/7 managed IT support, preventative maintenance, and Authorized Equipment Tracking.',
    tagline: 'Keep servers, office systems, and high-value hardware protected with 24/7 response in Buea & beyond.',
    heroTitle: 'Always-On Reliability With',
    heroAccent: '24/7 IT Support & Tracking',
    heroDescription:
      'Downtime and stolen assets stall business momentum. SAMITECH’s operations desk provides round-the-clock server, software, and network maintenance alongside verified Authorized Equipment Tracking (smartphones, laptops, vehicles, IoT) integrated with MTN Mobile Money.',
    timelineLabel: '24/7 Immediate Desk',
    engagementModel: 'Retainer SLA · Recovery Tiers',
    contactCategory: 'Authorized Equipment Tracking',
    image: nocCenterImg,
    imageAlt: 'SAMITECH 24/7 Network Operations Center supporting infrastructure maintenance and asset tracking',
    imageWidth: 720,
    imageHeight: 964,
    accentColor: '#07133B',
    metrics: [
      { value: '24/7', label: 'Direct Hotline & WhatsApp' },
      { value: '4 Tiers', label: 'Authorized Device Tracking' },
      { value: '25k–85k', label: 'XAF Transparent Tracking Fees' },
    ],
    capabilities: [
      {
        title: 'Preventative IT Maintenance & SLA Monitoring',
        description:
          'OS/dependency updates, automated off-site backups, uptime probes, and rapid troubleshooting.',
      },
      {
        title: 'Smartphone & Tablet Tracking (35,000 XAF)',
        description:
          'Verified device recovery coordination upon receipt or original packaging proof of ownership.',
      },
      {
        title: 'Laptop & Workstation Recovery (45,000 XAF)',
        description:
          'Authorized hardware tracing for misplaced or stolen corporate and personal computers.',
      },
      {
        title: 'Vehicle (85,000 XAF) & IoT (25,000 XAF) Tracing',
        description:
          'Telemetry recovery coordination including law enforcement documentation on vehicle cases.',
      },
    ],
    processSteps: [
      {
        step: '01.',
        title: 'Rapid SLA or Ownership Intake',
        detail: 'Verify system baseline or original device ownership proof (no false reports permitted).',
      },
      {
        step: '02.',
        title: 'Immediate Desk Activation',
        detail: 'Assign certified support specialist or initiate MTN MoMo tracking file.',
      },
      {
        step: '03.',
        title: 'Active Resolution & Coordination',
        detail: 'Patch outages proactively or execute carrier & law enforcement tracing workflows.',
      },
      {
        step: '04.',
        title: 'Status Reporting & Prevention',
        detail: 'Direct progress updates via +237 674 137 259 and hardening recommendations.',
      },
    ],
    deliverables: [
      '24/7 Direct Operations Escalation (+237 674 137 259)',
      'Automated Backup, Uptime & Security Patch Reports',
      'Verified Equipment Tracking Case Documentation',
      'MTN Mobile Money Transparent Tier Receipting',
    ],
    techStack: ['24/7 Monitoring', 'MTN MoMo Intake', 'IMEI Telemetry', 'Automated Backups', 'Linux / Cloud Ops'],
    idealFor: [
      {
        audience: 'Businesses Requiring Guaranteed System Uptime',
        outcome: 'Focus on growth knowing certified engineers monitor, patch, and back up your stack 24/7.',
      },
      {
        audience: 'Device Owners & Fleet Managers',
        outcome: 'Access structured, legal, transparent equipment recovery support.',
      },
    ],
    faqs: [
      {
        question: 'What proof is needed for Authorized Equipment Tracking?',
        answer:
          'Original purchase receipt or matching serial/IMEI device packaging is strictly required; false reporting is prohibited.',
      },
    ],
    relatedCaseStudyId: 'authorized-tracking-system',
  },
  {
    slug: 'ux-ui',
    number: '09',
    group: 'ai-design',
    groupLabel: 'Product Design Studio',
    title: 'UX / UI Design',
    shortDesc: 'Design intuitive, engaging, and accessible digital products backed by user research.',
    tagline: 'Clickable Figma prototypes, design systems, and WCAG AA interfaces ready for engineering.',
    heroTitle: 'Effortless Usability Through',
    heroAccent: 'UX / UI Product Design',
    heroDescription:
      'Clean typography, clear spatial hierarchy, and intuitive task flows turn complex software into everyday tools users love. SAMITECH’s designers craft responsive web and mobile interfaces, reusable Figma design systems, and tested user journeys.',
    timelineLabel: '2–5 Weeks Per Phase',
    engagementModel: 'Design Sprint · Design System',
    contactCategory: 'UI/UX Design',
    image: aboutHqImg,
    imageAlt: 'SAMITECH UI/UX product designers crafting intuitive interfaces',
    imageWidth: 720,
    imageHeight: 964,
    accentColor: '#DB2777',
    metrics: [
      { value: 'WCAG AA', label: 'Accessibility Contrast Rigor' },
      { value: '100%', label: 'Developer-Ready Figma Tokens' },
      { value: '+40%', label: 'Task Completion Lift' },
    ],
    capabilities: [
      {
        title: 'User Journey & Friction Audits',
        description:
          'Map user behavior and streamline onboarding, forms, and navigation hierarchies.',
      },
      {
        title: 'Interactive Figma Prototypes',
        description:
          'Clickable flows that stakeholders and test users evaluate prior to full development.',
      },
      {
        title: 'Responsive Cross-Device Design Systems',
        description:
          'Consistent color, typography, button states, and component libraries tailored to Tailwind & React.',
      },
      {
        title: 'Micro-Interactions & Visual Polish',
        description:
          'Intentional transitions, loading skeletons, and crisp iconography across every state.',
      },
    ],
    processSteps: [
      {
        step: '01.',
        title: 'UX Audit & Screen Architecture',
        detail: 'Define navigation, screen hierarchy, and primary conversion paths.',
      },
      {
        step: '02.',
        title: 'Structural Wireframing',
        detail: 'Lock content priority and mobile responsiveness before styling.',
      },
      {
        step: '03.',
        title: 'High-Fidelity Visual UI',
        detail: 'Apply brand craft, contrast checks, and complete interactive states.',
      },
      {
        step: '04.',
        title: 'Design Tokens & Handoff',
        detail: 'Deliver organized Figma systems synced cleanly for developers.',
      },
    ],
    deliverables: [
      'Clickable High-Fidelity Figma Prototype',
      'Desktop, Tablet & Mobile Screen Specs',
      'Reusable UI Component & Token Library',
      'WCAG AA Contrast & Usability Review',
    ],
    techStack: ['Figma', 'Design Tokens', 'Auto Layout', 'Prototyping', 'WCAG AA', 'Tailwind Mapping'],
    idealFor: [
      {
        audience: 'Products Seeking World-Class Brand Polish',
        outcome: 'Command instant credibility with investors and enterprise buyers from screen one.',
      },
    ],
    faqs: [
      {
        question: 'Can we hire SAMITECH solely for UX/UI redesign?',
        answer:
          'Yes. You receive clean, annotated Figma prototypes and tokenized component specs ready for any front-end team.',
      },
    ],
    relatedCaseStudyId: 'authorized-tracking-system',
  },
  {
    slug: 'dedicated-teams',
    number: '10',
    group: 'product-software',
    groupLabel: 'Embedded Squads',
    title: 'Dedicated Teams',
    shortDesc: 'Scale faster with a dedicated pod of senior engineers, AI specialists, and designers.',
    tagline: 'Co-founder mindset, transparent daily standups, and immediate engineering capacity.',
    heroTitle: 'Scale Engineering Speed With',
    heroAccent: 'Dedicated Teams',
    heroDescription:
      'Skip months of solo recruiting. SAMITECH assigns an embedded pod of vetted full-stack developers, AI/ML specialists, DevOps, and UX designers directly inside your workflow — bringing ownership, architectural rigor, and WAT timezone alignment for Europe, Africa, and global partners.',
    timelineLabel: 'Onboard in 10–14 Days',
    engagementModel: 'Monthly Retainer Pod',
    contactCategory: 'Dedicated Teams',
    image: nocCenterImg,
    imageAlt: 'SAMITECH dedicated engineering team collaborating across active sprints',
    imageWidth: 720,
    imageHeight: 964,
    accentColor: '#EA580C',
    metrics: [
      { value: '10–14d', label: 'Team Onboarding Window' },
      { value: '15+', label: 'Certified In-House Specialists' },
      { value: '100%', label: 'Direct Git & IP Ownership' },
    ],
    capabilities: [
      {
        title: 'Full-Stack, AI & Mobile Squads',
        description:
          'Pre-gelled senior pods who collaborate smoothly across React, Node.js, Python, Flutter, and cloud.',
      },
      {
        title: 'Embedded Daily Workflow Integration',
        description:
          'Work inside your Slack, Jira/Linear, GitHub, and weekly sprint demos with zero handoff friction.',
      },
      {
        title: 'Backed by Security & Network Bench',
        description:
          'Draw on SAMITECH’s in-house penetration testers and DevOps architects whenever launches scale.',
      },
      {
        title: 'Predictable Monthly Capacity Scaling',
        description:
          'Scale pod size up or down cleanly as product priorities evolve.',
      },
    ],
    processSteps: [
      {
        step: '01.',
        title: 'Skill & Culture Calibration',
        detail: 'Define exact stack, seniority, and sprint cadence requirements.',
      },
      {
        step: '02.',
        title: 'Engineer Selection',
        detail: 'Meet your assigned engineers and review prior production architectures.',
      },
      {
        step: '03.',
        title: 'Repo & Tooling Integration',
        detail: 'Connect into CI/CD, trackers, and daily communication in week one.',
      },
      {
        step: '04.',
        title: 'Sprint Velocity & Reviews',
        detail: 'Deliver weekly shipping milestones with continuous code quality metrics.',
      },
    ],
    deliverables: [
      'Dedicated Multidisciplinary Pod (Engineers · UX · QA · Lead)',
      'Direct Access Inside Your Slack, Jira & GitHub',
      'Weekly Sprint Demos & Burn-Down Transparency',
      '100% Source Code & Intellectual Property Ownership',
    ],
    techStack: ['React / Node.js', 'Python / AI', 'Flutter', 'AWS / Docker', 'GitHub / Jira', 'CI/CD'],
    idealFor: [
      {
        audience: 'Funded Startups & CTOs Accelerating Roadmaps',
        outcome: 'Double shipping velocity immediately without multi-month hiring overhead.',
      },
    ],
    faqs: [
      {
        question: 'Are Dedicated Team engineers exclusive to our roadmap?',
        answer:
          'Yes. Assigned engineers focus 100% on your codebase and sprint backlog.',
      },
    ],
    relatedCaseStudyId: 'erp-inventory-cloud',
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return ALL_SERVICES_CATALOG.find((s) => s.slug === slug);
}
