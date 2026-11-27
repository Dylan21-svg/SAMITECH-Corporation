import aboutHqImg from '../assets/images/about_samitech_hq_1794695612230.webp';
import fiberCoreImg from '../assets/images/samitech_fiber_core_1794695612961.webp';
import softwareFloorImg from '../assets/images/samitech_software_floor_1794695612730.webp';
import hardwareBenchImg from '../assets/images/samitech_hardware_bench_1794695613315.webp';
import nocCenterImg from '../assets/images/samitech_noc_center_1794695614349.webp';
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
    alt: 'SAMITECH Corporation modern blue glass technology headquarters at twilight',
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

export type ServiceGroup = 'software-teams' | 'networks-support' | 'security-tracking';

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
  offerings: string[];
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

export const SERVICE_GROUPS: { id: 'all' | ServiceGroup; label: string }[] = [
  { id: 'all', label: 'All Services' },
  { id: 'software-teams', label: 'Software & Dedicated Teams' },
  { id: 'networks-support', label: 'Networks & IT Maintenance' },
  { id: 'security-tracking', label: 'Cybersecurity & Tracking' },
];

export const ALL_SERVICES_CATALOG: ServiceDetail[] = [
  {
    slug: 'software-services',
    number: '01',
    group: 'software-teams',
    groupLabel: 'Design, Web & App Engineering',
    title: 'Software Services',
    shortDesc: 'UI/UX design, web and mobile app development, graphics design, and custom digital platforms.',
    offerings: [
      'UI/UX Design & Prototyping',
      'Web & Mobile App Development',
      'Graphics Design & Brand Identity',
      'Custom Software, APIs & AI Integration',
    ],
    tagline: 'End to end product craft from brand graphics and UI/UX wireframes to scalable web and mobile systems.',
    heroTitle: 'End to End Digital Craft With',
    heroAccent: 'Software Services',
    heroDescription:
      'From intuitive UI/UX design and crisp graphics design to full stack web platforms and Android/iOS mobile applications, SAMITECH designs and engineers dependable digital products built for speed, usability, and scale.',
    timelineLabel: '2 to 12 Weeks Per Release',
    engagementModel: 'UI/UX · Web & App Dev · Graphics',
    contactCategory: 'Software Services',
    image: softwareFloorImg,
    imageAlt: 'SAMITECH software engineers and designers building UI/UX, web, and mobile applications',
    imageWidth: 720,
    imageHeight: 964,
    accentColor: '#002BFF',
    metrics: [
      { value: '100+', label: 'Digital Products Shipped' },
      { value: '99.9%', label: 'Target Uptime SLA' },
      { value: 'WCAG AA', label: 'UI/UX Accessibility Standard' },
    ],
    capabilities: [
      {
        title: 'UI/UX Design & Interactive Prototyping',
        description:
          'User journey mapping, clickable Figma prototypes, and responsive design systems crafted for clarity across desktop and mobile.',
      },
      {
        title: 'Web & Mobile App Development',
        description:
          'Scalable React, TypeScript, Next.js, Node.js, and Flutter/native apps with MTN & Orange Mobile Money integrations.',
      },
      {
        title: 'Graphics Design & Visual Branding',
        description:
          'Logos, marketing collateral, social media kits, pitch decks, and cohesive brand identity systems that stand out.',
      },
      {
        title: 'Custom Platforms, APIs & AI Enablement',
        description:
          'Bespoke ERP/CRM dashboards, automated workflows, and private AI assistants tailored around your business rules.',
      },
    ],
    processSteps: [
      {
        step: '01.',
        title: 'Discovery & Visual Direction',
        detail: 'Align on user flows, brand identity, UI/UX wireframes, and technical requirements.',
      },
      {
        step: '02.',
        title: 'Design Systems & Graphics',
        detail: 'Craft high-fidelity Figma screens, visual assets, and developer-ready tokens.',
      },
      {
        step: '03.',
        title: 'Web & App Engineering Sprints',
        detail: 'Build frontend interfaces, mobile apps, and secure backend APIs in weekly live builds.',
      },
      {
        step: '04.',
        title: 'QA, Launch & Iteration',
        detail: 'Cross-device testing, store/cloud deployment, and continuous post-launch support.',
      },
    ],
    deliverables: [
      'High-Fidelity UI/UX Prototypes & Design Systems',
      'Production Web & Android/iOS Mobile Applications',
      'Brand Graphics, Logos & Marketing Design Kits',
      'Backend APIs, Databases & Cloud Deployment',
      'Documentation & Technical Handover',
    ],
    techStack: ['Figma', 'React', 'TypeScript', 'Flutter', 'Node.js', 'PostgreSQL', 'Adobe Creative Cloud', 'Tailwind CSS'],
    idealFor: [
      {
        audience: 'Businesses Launching Digital Products & Brands',
        outcome: 'Get unified UI/UX, brand graphics, and web/mobile engineering from one accountable studio.',
      },
      {
        audience: 'Organizations Modernizing Workflows',
        outcome: 'Replace manual spreadsheets and fragmented tools with tailored web and mobile software.',
      },
    ],
    faqs: [
      {
        question: 'Can we hire SAMITECH for UI/UX or graphics design alone?',
        answer:
          'Yes. You can engage us specifically for UI/UX product design, brand graphics design, or a complete package combining design with web and mobile app development.',
      },
      {
        question: 'Do you integrate MTN Mobile Money, Orange Money, or international cards?',
        answer:
          'Yes. We routinely build local Mobile Money APIs alongside international card and bank payment flows into web and mobile apps.',
      },
    ],
    relatedCaseStudyId: 'erp-inventory-cloud',
  },
  {
    slug: 'network-services',
    number: '02',
    group: 'networks-support',
    groupLabel: 'Starlink, Wi-Fi Zones & LAN',
    title: 'Network Services',
    shortDesc:
      'Starlink installation & configuration, outdoor Wi-Fi & AP deployment, PtP/PtMP wireless networks, Wi-Fi hotspots, MikroTik configuration, and network optimization.',
    offerings: [
      'Starlink Installation & Configuration',
      'Outdoor Wi-Fi & Access Point Deployment',
      'Network Coverage Expansion',
      'Point-to-Point & Point-to-Multipoint Wireless Networks',
      'Wi-Fi Hotspot Infrastructure',
      'Community & Business Internet Solutions',
      'Network Design, Configuration & Optimization',
      'MikroTik Network Configuration',
    ],
    tagline: 'High-speed Starlink deployments, wide-coverage Wi-Fi zones, and structured office/campus LAN cabling.',
    heroTitle: 'Reliable Connectivity Through',
    heroAccent: 'Network Services',
    heroDescription:
      'From Starlink installation & configuration, outdoor Wi-Fi & access point deployment, and point-to-point/multipoint wireless links to Wi-Fi hotspot infrastructure, MikroTik configuration, and full network design & optimization, SAMITECH delivers fast, stable connectivity for communities, campuses, and businesses.',
    timelineLabel: '1 to 7 Days Field Deployment',
    engagementModel: 'Starlink · Wi-Fi Zones · MikroTik · LAN',
    contactCategory: 'Network Services',
    image: fiberCoreImg,
    imageAlt: 'Enterprise network switching racks and structured cabling deployed by SAMITECH engineers',
    imageWidth: 720,
    imageHeight: 964,
    accentColor: '#0284C7',
    metrics: [
      { value: '99.95%', label: 'Target Link Availability' },
      { value: 'Multi-Site', label: 'Starlink Mesh & PtP Links' },
      { value: '24/7', label: 'Network Health Monitoring' },
    ],
    capabilities: [
      {
        title: 'Starlink Installation & Configuration',
        description:
          'Obstruction-free roof or mast mounting, weatherproof cabling, bypass-mode router setup, and high-throughput configuration.',
      },
      {
        title: 'Outdoor Wi-Fi & Access Point Deployment',
        description:
          'Weather-rated outdoor access points and directional antennas engineered for yards, compounds, hotels, and open campuses.',
      },
      {
        title: 'Network Coverage Expansion',
        description:
          'Eliminate dead zones across multi-story buildings, annexes, and large properties with seamless mesh and wired backhaul extensions.',
      },
      {
        title: 'Point-to-Point & Point-to-Multipoint Wireless Networks',
        description:
          'Long-range line-of-sight wireless bridges linking headquarters, remote branches, and distributed sites reliably.',
      },
      {
        title: 'Wi-Fi Hotspot Infrastructure',
        description:
          'Commercial hotspot zones featuring captive portals, voucher or Mobile Money billing, bandwidth quotas, and fair-use shaping.',
      },
      {
        title: 'Community & Business Internet Solutions',
        description:
          'Shared high-speed internet distribution architectures built for residential estates, schools, offices, and community hubs.',
      },
      {
        title: 'Network Design, Configuration & Optimization',
        description:
          'Structured Cat6a/fiber LAN setups, VLAN segmentation, dual-WAN failover, and latency tuning for peak reliability.',
      },
      {
        title: 'MikroTik Network Configuration',
        description:
          'Advanced MikroTik RouterOS routing, firewall hardening, hotspot management, QoS traffic shaping, and OpenVPN tunneling.',
      },
    ],
    processSteps: [
      {
        step: '01.',
        title: 'Site & RF Signal Survey',
        detail: 'Assess sky visibility for Starlink, wall attenuation, cable runs, and user density.',
      },
      {
        step: '02.',
        title: 'Topology & Hardware Blueprint',
        detail: 'Specify mounts, outdoor APs, MikroTik/Ubiquiti routers, PoE switches, and surge protection.',
      },
      {
        step: '03.',
        title: 'Precision Field Installation',
        detail: 'Mount dishes, terminate structured LAN runs, configure Wi-Fi zones, and extend coverage.',
      },
      {
        step: '04.',
        title: 'Speed Testing & Handover',
        detail: 'Verify throughput across every zone, label ports cleanly, and enable remote monitoring.',
      },
    ],
    deliverables: [
      'Mounted & Weatherproofed Starlink Kit with Optimal Sky Alignment',
      'Point-to-Point Extension & Multi-Zone Wi-Fi Coverage Map',
      'Neatly Terminated, Tested & Labeled Structured LAN Cabling',
      'Configured Router Firewall, Captive Portal & Backup Profiles',
    ],
    techStack: ['Starlink', 'Ubiquiti UniFi', 'MikroTik', 'Cat6a / Fiber', 'OpenVPN', 'PoE+ Switching', 'Captive Portals'],
    idealFor: [
      {
        audience: 'Offices, Hotels, Campuses & Estates',
        outcome: 'Eliminate dead zones and extend single Starlink or fiber connections cleanly across entire properties.',
      },
      {
        audience: 'Entrepreneurs Launching Commercial Wi-Fi Zones',
        outcome: 'Deploy reliable outdoor hotspots with fair bandwidth limits and voucher or Mobile Money access.',
      },
    ],
    faqs: [
      {
        question: 'Can you extend one Starlink connection to multiple buildings or apartments?',
        answer:
          'Yes. Using bypass mode, enterprise routing, outdoor fiber or point-to-point wireless bridges, and mesh access points, we expand one Starlink dish across compounds, hostels, and offices.',
      },
      {
        question: 'Do you handle both small office LAN setups and large Wi-Fi zones?',
        answer:
          'Yes. We design and install everything from 10-desk office LANs to multi-acre campus and commercial Wi-Fi zones.',
      },
    ],
    relatedCaseStudyId: 'lan-wan-vpn-fabric',
  },
  {
    slug: 'it-support-maintenance',
    number: '03',
    group: 'networks-support',
    groupLabel: 'Hardware & Lab Operations',
    title: 'Maintenance (IT Support)',
    shortDesc: 'Computer maintenance, full computer lab setup, professional installation, and 24/7 technical support.',
    offerings: [
      'Professional Installation & Technical Support',
      'Computer Maintenance & Diagnostics',
      'Complete Computer Lab Setup',
      'OS Deployment, Imaging & Preventative Servicing',
    ],
    tagline: 'Keep workstations, school labs, and office IT fleets running at peak speed with zero unplanned downtime.',
    heroTitle: 'Peak Performance With',
    heroAccent: 'Maintenance & IT Support',
    heroDescription:
      'Slow, overheating, or poorly configured machines drain productivity. SAMITECH provides professional installation & technical support, proactive computer maintenance, turnkey computer lab setup for schools and training centers, hardware repairs, and 24/7 assistance.',
    timelineLabel: 'Same-Day Support & Scheduled SLAs',
    engagementModel: 'Computer Maintenance · Lab Setup',
    contactCategory: 'Maintenance (IT Support)',
    image: nocCenterImg,
    imageAlt: 'SAMITECH engineers managing workstations, computer labs, and IT infrastructure',
    imageWidth: 720,
    imageHeight: 964,
    accentColor: '#0F766E',
    metrics: [
      { value: '24/7', label: 'Direct Support Desk' },
      { value: 'Same Day', label: 'Workstation Diagnostics' },
      { value: 'Turnkey', label: 'School & Office Lab Setup' },
    ],
    capabilities: [
      {
        title: 'Professional Installation & Technical Support',
        description:
          'On-site and remote hardware/software installation, workstation commissioning, troubleshooting, and responsive 24/7 technical support via +237 674 137 259.',
      },
      {
        title: 'Computer Maintenance & Hardware Servicing',
        description:
          'Thermal cleaning, SSD/RAM upgrades, power diagnostics, motherboard/component repair, and malware removal for desktops and laptops.',
      },
      {
        title: 'Turnkey Computer Lab Setup',
        description:
          'End-to-end setup of school, university, and training center computer labs—desks, power protection, LAN cabling, OS imaging, and teacher controls.',
      },
      {
        title: 'OS Deployment, Licensing & Backup Policies',
        description:
          'Standardized Windows/Linux installations, automated system images, office productivity suites, and scheduled data backups.',
      },
    ],
    processSteps: [
      {
        step: '01.',
        title: 'Asset Audit & Health Check',
        detail: 'Inspect hardware condition, storage health, power backup, and room layout requirements.',
      },
      {
        step: '02.',
        title: 'Lab Layout or Repair Plan',
        detail: 'Prepare power/network schematics for new labs or component upgrade lists for existing PCs.',
      },
      {
        step: '03.',
        title: 'Servicing, Imaging & Cabling',
        detail: 'Clean, upgrade, clone standard OS images across machines, and secure power/LAN drops.',
      },
      {
        step: '04.',
        title: 'Testing & Ongoing Support',
        detail: 'Stress-test every workstation and establish preventative maintenance schedules.',
      },
    ],
    deliverables: [
      'Fully Tested, Serviced & Upgraded Workstations',
      'Complete Networked Computer Lab with Surge/UPS Protection',
      'Standardized OS Images, Essential Software & Antivirus',
      'Asset Inventory Sheet & Scheduled Maintenance Plan',
    ],
    techStack: ['Windows / Linux', 'SSD & RAM Upgrades', 'PXE / Clonezilla Imaging', 'UPS & Power Protection', 'LAN Cabling', 'Remote Helpdesk'],
    idealFor: [
      {
        audience: 'Schools, Training Institutes & Cybercafés',
        outcome: 'Launch clean, reliable, centrally managed computer labs built to withstand heavy daily student use.',
      },
      {
        audience: 'Offices & Growing Teams',
        outcome: 'Extend laptop and desktop lifespans while resolving technical glitches immediately.',
      },
    ],
    faqs: [
      {
        question: 'What is included in a turnkey Computer Lab Setup?',
        answer:
          'We handle workstation sourcing/inspection, physical desk and power/UPS layout, structured LAN networking, OS imaging across all PCs, and classroom management software.',
      },
      {
        question: 'Do you offer recurring computer maintenance contracts for offices?',
        answer:
          'Yes. We provide scheduled monthly/quarterly servicing alongside priority on-call IT support.',
      },
    ],
    relatedCaseStudyId: 'lan-wan-vpn-fabric',
  },
  {
    slug: 'cybersecurity',
    number: '04',
    group: 'security-tracking',
    groupLabel: 'CCTV Surveillance & Digital Defense',
    title: 'Cybersecurity',
    shortDesc: 'CCTV & smart security installation, camera maintenance, network security audits, firewall hardening, and defense.',
    offerings: [
      'CCTV & Smart Security Installation',
      'CCTV Camera Maintenance & NVR Storage Setup',
      'Remote Mobile Viewing & Access Control',
      'Network Security Audits & Incident Defense',
    ],
    tagline: 'Complete physical and digital protection combining smart CCTV surveillance with proactive cyber defense.',
    heroTitle: 'Physical & Digital Protection With',
    heroAccent: 'Cybersecurity & CCTV',
    heroDescription:
      'Protecting your organization requires both physical visibility and hardened digital systems. SAMITECH delivers CCTV & smart security installation and ongoing maintenance with remote phone access alongside network security audits, firewall hardening, and incident defense.',
    timelineLabel: 'Rapid CCTV Setup & Security Audits',
    engagementModel: 'CCTV Systems · Cyber Defense',
    contactCategory: 'Cybersecurity',
    image: hardwareBenchImg,
    imageAlt: 'SAMITECH security specialist configuring enterprise security hardware and surveillance systems',
    imageWidth: 720,
    imageHeight: 964,
    accentColor: '#DC0914',
    metrics: [
      { value: '24/7', label: 'HD / Night-Vision Recording' },
      { value: '100%', label: 'Critical Risks Remediated' },
      { value: '48 hrs', label: 'Security Retest Turnaround' },
    ],
    capabilities: [
      {
        title: 'CCTV & Smart Security Installation',
        description:
          'Indoor/outdoor IP & PoE camera placement, smart motion alerts, NVR/DVR storage sizing, clean concealed cabling, night-vision tuning, and ongoing camera servicing.',
      },
      {
        title: 'Remote Mobile & Multi-Site Surveillance Access',
        description:
          'Encrypted mobile and desktop viewing apps, motion alert zones, and power-backup integration so feeds stay live during outages.',
      },
      {
        title: 'Network & Infrastructure Security Audits',
        description:
          'Comprehensive review of firewalls, Wi-Fi/LAN segmentation, user access controls, and server configurations to close security gaps.',
      },
      {
        title: 'Network Hardening & Incident Response',
        description:
          'Firewall policies, VLAN camera isolation, malware containment, and staff security awareness training.',
      },
    ],
    processSteps: [
      {
        step: '01.',
        title: 'Site & Security Survey',
        detail: 'Map blind spots, entry points, lighting conditions, and network endpoints.',
      },
      {
        step: '02.',
        title: 'Camera Layout or Audit Execution',
        detail: 'Install weatherproof PoE/IP cameras & NVR, or conduct comprehensive security assessments.',
      },
      {
        step: '03.',
        title: 'Hardening & Encrypted Access',
        detail: 'Lock down camera VLANs/passwords, apply patches, and configure secure remote viewing.',
      },
      {
        step: '04.',
        title: 'Verification & Ongoing Maintenance',
        detail: 'Test retention storage, verify fixes, and schedule periodic CCTV health checks.',
      },
    ],
    deliverables: [
      'Installed & Calibrated HD/IP CCTV System with NVR Storage',
      'Encrypted Mobile & Desktop Live Viewing Setup',
      'Scheduled CCTV Cleaning, Firmware & Storage Maintenance',
      'Security Audit & Network Hardening Report',
    ],
    techStack: ['IP / PoE CCTV', 'Hikvision / Dahua / UniFi', 'NVR & Solar Backup', 'VLAN Isolation', 'Zero Trust Firewalls'],
    idealFor: [
      {
        audience: 'Homes, Offices, Warehouses & Shops',
        outcome: 'Monitor premises clearly day and night from anywhere with reliable maintenance support.',
      },
      {
        audience: 'Fintech, SaaS & Enterprise Platforms',
        outcome: 'Identify and patch security gaps before attackers can exploit customer or financial data.',
      },
    ],
    faqs: [
      {
        question: 'Can we view our CCTV cameras remotely from our phones?',
        answer:
          'Yes. Every CCTV installation includes secure mobile and desktop app configuration with encrypted credentials and isolated network rules.',
      },
      {
        question: 'Do you maintain or repair existing CCTV camera systems?',
        answer:
          'Yes. We diagnose failed cameras, replace damaged power supplies or cables, upgrade NVR hard drives, and clean lenses under maintenance plans.',
      },
    ],
    relatedCaseStudyId: 'pentest-security-audit',
  },
  {
    slug: 'dedicated-teams',
    number: '05',
    group: 'software-teams',
    groupLabel: 'Embedded Engineering & Design Pods',
    title: 'Dedicated Teams',
    shortDesc: 'Scale faster with dedicated pods of software engineers, UI/UX & graphics designers, and network specialists.',
    offerings: [
      'Full-Stack & Mobile Engineering Pods',
      'Dedicated UI/UX & Graphics Designers',
      'Embedded Network & IT Support Staff',
      'Full Git, Tooling & IP Ownership',
    ],
    tagline: 'Cofounder mindset, transparent daily standups, and immediate technical capacity aligned to your schedule.',
    heroTitle: 'Scale Capacity Fast With',
    heroAccent: 'Dedicated Teams',
    heroDescription:
      'Skip months of solo recruiting. SAMITECH assigns an embedded pod of vetted software developers, UI/UX & graphics designers, network engineers, and IT support specialists directly inside your workflow with full IP ownership and reliable WAT timezone collaboration.',
    timelineLabel: 'Onboard in 10 to 14 Days',
    engagementModel: 'Monthly Retainer Pod',
    contactCategory: 'Dedicated Teams',
    image: aboutHqImg,
    imageAlt: 'SAMITECH dedicated engineering and design pod collaborating on client projects',
    imageWidth: 720,
    imageHeight: 964,
    accentColor: '#EA580C',
    metrics: [
      { value: '10 to 14d', label: 'Team Onboarding Window' },
      { value: '15+', label: 'Certified In-House Specialists' },
      { value: '100%', label: 'Direct Git & IP Ownership' },
    ],
    capabilities: [
      {
        title: 'Full-Stack, Mobile & AI Squads',
        description:
          'Prebuilt senior pods collaborating smoothly across React, TypeScript, Node.js, Python, Flutter, and cloud.',
      },
      {
        title: 'Embedded UI/UX & Graphics Designers',
        description:
          'Keep your product interfaces, marketing visuals, and design systems shipping every single week.',
      },
      {
        title: 'Daily Workflow & Tooling Integration',
        description:
          'Work inside your Slack, Jira/Linear, GitHub, and weekly sprint demos with zero handoff friction.',
      },
      {
        title: 'Backed by Network, CCTV & Security Bench',
        description:
          'Tap SAMITECH’s in-house networking, IT maintenance, and cybersecurity specialists whenever needed.',
      },
    ],
    processSteps: [
      {
        step: '01.',
        title: 'Skill & Role Calibration',
        detail: 'Define exact stack, design or support needs, and sprint cadence requirements.',
      },
      {
        step: '02.',
        title: 'Specialist Selection',
        detail: 'Meet your assigned engineers and designers and review prior production work.',
      },
      {
        step: '03.',
        title: 'Repo & Tooling Integration',
        detail: 'Connect into CI/CD, trackers, and daily communication in week one.',
      },
      {
        step: '04.',
        title: 'Sprint Velocity & Reviews',
        detail: 'Deliver weekly shipping milestones with clear progress reporting.',
      },
    ],
    deliverables: [
      'Dedicated Multidisciplinary Pod (Developers · Designers · QA · Lead)',
      'Direct Access Inside Your Slack, Jira & GitHub',
      'Weekly Sprint Demos & Transparent Reporting',
      '100% Source Code & Intellectual Property Ownership',
    ],
    techStack: ['React / Node.js', 'Flutter', 'Figma', 'Python / AI', 'AWS / Docker', 'GitHub / Jira'],
    idealFor: [
      {
        audience: 'Funded Startups & CTOs Accelerating Roadmaps',
        outcome: 'Double shipping velocity immediately without multi-month hiring overhead.',
      },
      {
        audience: 'Enterprises Needing Ongoing Tech & Design Ops',
        outcome: 'Maintain predictable monthly capacity across software, design, and IT support.',
      },
    ],
    faqs: [
      {
        question: 'Are Dedicated Team members exclusive to our roadmap?',
        answer:
          'Yes. Assigned specialists focus 100% on your projects, tools, and sprint backlog.',
      },
      {
        question: 'Can we scale the team size up or down as priorities shift?',
        answer:
          'Yes. Monthly retainer pods can expand with extra developers or designers or adjust cleanly between project phases.',
      },
    ],
    relatedCaseStudyId: 'erp-inventory-cloud',
  },
  {
    slug: 'tracking',
    number: '06',
    group: 'security-tracking',
    groupLabel: 'Authorized Asset Recovery & Telemetry',
    title: 'Tracking',
    shortDesc: 'Authorized equipment, device, and vehicle tracking with verified ownership intake and recovery coordination.',
    offerings: [
      'Smartphone & Tablet Tracking',
      'Laptop & Workstation Tracking',
      'Vehicle & Fleet Tracking',
      'IoT & Asset Telemetry',
    ],
    tagline: 'Structured, lawful equipment and vehicle tracking backed by proof-of-ownership verification.',
    heroTitle: 'Verified Asset Recovery With',
    heroAccent: 'Authorized Tracking',
    heroDescription:
      'Misplaced or stolen hardware disrupts work and personal security. SAMITECH operates a strict, verified Authorized Equipment Tracking desk supporting smartphones, laptops, motor vehicles, and IoT trackers with proof-of-ownership intake and law enforcement coordination.',
    timelineLabel: '24/7 Immediate Case Intake',
    engagementModel: 'Verified Recovery Categories',
    contactCategory: 'Tracking',
    image: nocCenterImg,
    imageAlt: 'SAMITECH tracking operations desk monitoring telemetry and recovery workflows',
    imageWidth: 720,
    imageHeight: 964,
    accentColor: '#07133B',
    metrics: [
      { value: '24/7', label: 'Direct Hotline & WhatsApp' },
      { value: '4 Categories', label: 'Device & Fleet Coverage' },
      { value: 'Verified', label: 'Proof-of-Ownership Intake' },
    ],
    capabilities: [
      {
        title: 'Smartphone & Tablet Tracking',
        description:
          'Verified device recovery coordination upon original purchase receipt or IMEI packaging proof of ownership.',
      },
      {
        title: 'Laptop & Workstation Recovery',
        description:
          'Authorized hardware tracing for misplaced or stolen corporate and personal computers.',
      },
      {
        title: 'Motor Vehicle & Fleet Tracking',
        description:
          'GPS telemetry installation and recovery coordination including formal law enforcement documentation.',
      },
      {
        title: 'IoT & Equipment Telemetry',
        description:
          'Continuous asset monitoring and location alerts for field tools, generators, and high-value gear.',
      },
    ],
    processSteps: [
      {
        step: '01.',
        title: 'Ownership Proof Verification',
        detail: 'Submit original purchase receipt or matching serial/IMEI packaging (no false reports permitted).',
      },
      {
        step: '02.',
        title: 'Case Activation & Intake',
        detail: 'Open your verified tracking file and assign a dedicated recovery specialist.',
      },
      {
        step: '03.',
        title: 'Active Telemetry & Tracing',
        detail: 'Execute carrier, device telemetry, and law enforcement coordination workflows.',
      },
      {
        step: '04.',
        title: 'Status Updates & Recovery',
        detail: 'Receive direct progress updates via +237 674 137 259 through case closure.',
      },
    ],
    deliverables: [
      '24/7 Direct Operations Escalation (+237 674 137 259)',
      'Verified Equipment Tracking Case Documentation',
      'Structured Case Intake & Progress Reporting',
      'Law Enforcement Liaison (Vehicle Recovery Cases)',
    ],
    techStack: ['IMEI Telemetry', 'GPS Fleet Trackers', 'Case Documentation', 'Ownership Verification', '24/7 Ops Desk'],
    idealFor: [
      {
        audience: 'Individuals & Corporate Device Owners',
        outcome: 'Access a lawful, transparent channel to trace misplaced or stolen smartphones and laptops.',
      },
      {
        audience: 'Fleet & Logistics Managers',
        outcome: 'Protect vehicles and field equipment with reliable GPS tracking and recovery support.',
      },
    ],
    faqs: [
      {
        question: 'What proof is required for Authorized Equipment Tracking?',
        answer:
          'Original purchase receipt or matching serial/IMEI device packaging is strictly mandatory; false reporting is prohibited.',
      },
      {
        question: 'How do I start a tracking case quickly?',
        answer:
          'Call or WhatsApp +237 674 137 259 or submit your device details through our contact form with your proof of ownership ready.',
      },
    ],
    relatedCaseStudyId: 'authorized-tracking-system',
  },
];

const LEGACY_SLUG_ALIASES: Record<string, string> = {
  'custom-software': 'software-services',
  'mobile-app-development': 'software-services',
  'ux-ui': 'software-services',
  'ai-development': 'software-services',
  'product-scope': 'software-services',
  'mvp-builder': 'software-services',
  'networking-solutions': 'network-services',
  'tracking-support': 'tracking',
};

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  const normalized = LEGACY_SLUG_ALIASES[slug] ?? slug;
  return ALL_SERVICES_CATALOG.find((s) => s.slug === normalized);
}
