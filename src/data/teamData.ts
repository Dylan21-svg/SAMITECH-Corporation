export type InterestIconKey =
  | 'tech'
  | 'connectivity'
  | 'music'
  | 'design'
  | 'fitness'
  | 'architecture'
  | 'ai'
  | 'agritech'
  | 'leadership';

export interface MemberExperienceItem {
  role: string;
  organization: string;
  highlightOrg?: boolean;
  period: string;
  description: string;
}

export interface MemberEducationItem {
  qualification: string;
  institution: string;
  specialization: string;
  period: string;
}

export interface MemberInterestItem {
  label: string;
  icon: InterestIconKey;
}

export interface TeamMember {
  id: string;
  executiveTitle: string;
  name: string;
  firstNamePart: string;
  accentNamePart: string;
  shortName?: string;
  role: string;
  heroTagline: string;
  focusLabel: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  websiteUrl: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
  bio: string;
  aboutMe: string;
  specialties: string[];
  skills: string[];
  languages: string[];
  interests: MemberInterestItem[];
  experience: MemberExperienceItem[];
  educationSectionTitle?: string;
  education: MemberEducationItem[];
  achievementsSectionTitle?: string;
  achievements: string[];
  focusAreas: string;
  contactTopic: string;
  socials: {
    github?: string;
    linkedin?: string;
    x?: string;
    whatsapp?: string;
  };
}

export const TEAM_HERO_MEDIA = {
  image: '/assets/aistudio/SAMITECH_Team_Collaboration_in_Modern_Office_a64eb672.png',
  alt: 'SAMITECH Corporation leadership and engineering collaboration in Buea',
  width: 1376,
  height: 768,
};

export const TEAM_PROOF_STATS = [
  { value: '3', label: 'Executive Leaders · CEO, COO & CTO' },
  { value: '6+', label: 'Core Domains · Telecom, SaaS, AI & IoT' },
  { value: '3', label: 'Hubs · Buea, Douala & Yaoundé' },
  { value: '24/7', label: 'Operations, Support & Delivery' },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'foshong-samuel-kella',
    executiveTitle: 'CEO',
    name: 'Foshong Samuel Kella',
    firstNamePart: 'Foshong Samuel',
    accentNamePart: 'Kella',
    shortName: 'Foshong Samuel K.',
    role: 'CEO & Founder',
    heroTagline:
      'Connecting people, businesses and possibilities through networking, telecommunications and dependable digital infrastructure.',
    focusLabel: 'Networking & Telecommunications',
    location: 'Buea, Cameroon',
    email: 'samitech237@gmail.com',
    phone: '+237 6 95 20 03 61',
    website: 'foshongsamuel.com',
    websiteUrl: 'https://foshongsamuel.com/',
    image: '/assets/aistudio/samuel_9840cba5.png',
    imageAlt: 'Foshong Samuel Kella, Founder and Chief Executive Officer of SAMITECH Corporation',
    width: 864,
    height: 785,
    bio: 'Networking & Telecommunications Professional and Founder of SAMITECH Corporation. His focus brings together networks, connectivity, and the technology that connects businesses and individuals.',
    aboutMe:
      'Foshong Samuel Kella is a Networking & Telecommunications Professional and the Founder & CEO of SAMITECH Corporation. His focus brings together networks, connectivity, and the technology that connects businesses and individuals. Through SAMITECH Corporation, he unites networking and IT infrastructure, internet connectivity, software development, CCTV and security systems, computer and electronics services, and digital solutions into dependable technology for organizations and individuals.',
    specialties: [
      'Networking & IT Infrastructure',
      'Internet & Connectivity',
      'CCTV & Security Systems',
      'Software & Digital Solutions',
    ],
    skills: [
      'Networking & Telecom',
      'Network Installation',
      'Network Administration',
      'Router & Server Config',
      'Internet Connectivity',
      'Network Distribution',
      'Infrastructure Maintenance',
      'CCTV & Surveillance',
      'Security Integration',
      'Software Solutions',
      'Hardware Support',
      'IT Consulting',
    ],
    languages: ['English (Fluent)', 'French (Working Proficiency)'],
    interests: [
      { label: 'Connectivity', icon: 'connectivity' },
      { label: 'IT Infrastructure', icon: 'architecture' },
      { label: 'Tech & Innovation', icon: 'tech' },
      { label: 'Leadership', icon: 'leadership' },
    ],
    experience: [
      {
        role: 'Founder & CEO',
        organization: 'SAMITECH Corporation',
        highlightOrg: true,
        period: 'Present',
        description:
          'Founded SAMITECH Corporation to bring together software development, connectivity, IT infrastructure, security systems, and digital services for businesses and individuals.',
      },
      {
        role: 'Networking & Telecommunications Professional',
        organization: 'Enterprise & Individual Connectivity Practice',
        period: 'Core Practice',
        description:
          'Directs network installation and configuration, router and server setup, network administration, internet distribution, CCTV surveillance integration, and hands on IT consulting.',
      },
    ],
    educationSectionTitle: 'Core Solution Domains',
    education: [
      {
        qualification: 'Networking, IT Infrastructure & Connectivity',
        institution: 'SAMITECH Corporation, Infrastructure & Telecom Division',
        specialization:
          'Network installation & administration, router/server configuration, internet connectivity, data packages, and network distribution',
        period: 'Telecom & Networks',
      },
      {
        qualification: 'Security Systems, Hardware & Digital Solutions',
        institution: 'SAMITECH Corporation, Technology Services Division',
        specialization:
          'CCTV & surveillance integration, web/mobile/database software, computer & electronics repairs, and business digitalization',
        period: 'Integrated IT',
      },
    ],
    achievementsSectionTitle: 'Key Capabilities & Highlights',
    achievements: [
      'Founded SAMITECH Corporation to unite networking, telecommunications, software, security, and digital services under one roof.',
      'Delivers end to end Networking and IT Infrastructure, from installation and router/server configuration to ongoing maintenance and IT consulting.',
      'Provides dependable Internet and Connectivity solutions, network distribution, and connectivity infrastructure for individuals and organizations.',
      'Oversees CCTV & integrated surveillance systems, custom web/mobile/database software, hardware maintenance, and digital branding services.',
    ],
    focusAreas:
      'Connecting people, businesses, and possibilities through networking, telecommunications, and dependable digital infrastructure.',
    contactTopic: 'Networking & Cloud Solutions',
    socials: {
      whatsapp: 'https://wa.me/237695200361',
    },
  },
  {
    id: 'che-amah-diland-ngwa',
    executiveTitle: 'COO',
    name: 'Che Amah Diland Ngwa',
    firstNamePart: 'Che Amah',
    accentNamePart: 'Diland Ngwa',
    role: 'COO & Lead Software Engineer',
    heroTagline:
      'I specialize in backend architecture where speed, security, and scalability converge, building distributed Python systems and SaaS platforms.',
    focusLabel: 'Backend & Distributed Systems',
    location: 'Bonduma Gate, Buea, Cameroon',
    email: 'ngwadiland68@gmail.com',
    phone: '+237 672 344 814',
    website: 'che-amah-diland-ngwa.vercel.app',
    websiteUrl: 'https://che-amah-diland-ngwa.vercel.app/',
    image: '/assets/aistudio/dy_168c6588.jpeg',
    imageAlt: 'Che Amah Diland Ngwa, Chief Operating Officer and Lead Software Engineer at SAMITECH Corporation',
    width: 862,
    height: 1078,
    bio: 'Software Engineer and Chief Operating Officer at SAMITECH Corporation specializing in Python backend architecture, distributed systems, offline first synchronization, and operational strategy.',
    aboutMe:
      'I am Che Amah Diland Ngwa, a Software Engineer and Chief Operating Officer at SAMITECH Corporation, focused on building high impact, scalable solutions. I specialize in bridging technical execution with efficient operational strategy. My expertise is rooted in the Python ecosystem, building distributed systems, robust backend infrastructures, and SaaS platforms where speed, security, and scalability converge. I am particularly interested in architectural challenges like data synchronization and system resilience, balancing clean, logic driven interfaces with high performance server side logic.',
    specialties: [
      'Python Backend & API Architecture',
      'Distributed Systems & Queues',
      'Database Design & Multi Tenancy',
      'DevOps, Scaling & Operations',
    ],
    skills: [
      'Python',
      'FastAPI',
      'Django',
      'Flask',
      'TypeScript',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Celery',
      'RabbitMQ',
      'Docker',
      'Kubernetes',
      'CRDT Delta Sync',
      'WebSockets',
      'gRPC',
      'Nginx',
      'CI/CD Pipelines',
      'Linux / Bash',
    ],
    languages: ['English (Fluent)', 'French (Working Proficiency)'],
    interests: [
      { label: 'Backend & SaaS', icon: 'architecture' },
      { label: 'ML & Automation', icon: 'ai' },
      { label: 'Logic & Strategy', icon: 'tech' },
      { label: 'Tech Education', icon: 'leadership' },
    ],
    experience: [
      {
        role: 'Lead Software Engineer & COO',
        organization: 'SAMITECH Corporation',
        highlightOrg: true,
        period: 'Sep 2023 to Present',
        description:
          'Leading distributed backend architecture, asynchronous event pipelines, and operational engineering roadmaps across SAMITECH’s flagship SaaS platforms. Engineered decoupled Python/FastAPI/Docker pipelines reducing processing latency by over 60%, established standardized DevOps CI/CD workflows, and guaranteed strict multi tenant data isolation.',
      },
      {
        role: 'Software Engineer Intern',
        organization: 'Revival Company Ltd.',
        period: 'Jun 2025 to Nov 2025',
        description:
          'Strengthened core backend reliability through internal API standardization, comprehensive unit and integration test suites, and third party integration stabilization, drastically reducing regressions and debugging cycles.',
      },
      {
        role: 'Full Stack Backend Developer',
        organization: 'NEXORA / Freelance',
        period: 'Aug 2024 to Oct 2024',
        description:
          'Designed and deployed modular backend architectures and standardized RESTful APIs using Python, Django, FastAPI, PostgreSQL, and Docker for 5+ early stage startups across fintech, logistics, and edtech.',
      },
    ],
    educationSectionTitle: 'Education & Credentials',
    education: [
      {
        qualification: 'Higher National Diploma in Software Engineering',
        institution: 'College of Technology / University of Buea',
        specialization:
          'Specialization: Distributed Systems, Relational Database Theory, Network Protocols, and Algorithmic Optimization',
        period: 'Oct 2024 to Jun 2026',
      },
      {
        qualification: 'Bachelor of Science in Computer Science',
        institution: 'College of Technology / University of Buea',
        specialization:
          'Specialization: Computer Architecture, Operating Systems, Memory Management, and Concurrent Programming',
        period: 'Oct 2022 to Dec 2026',
      },
    ],
    achievementsSectionTitle: 'Key Systems & Achievements',
    achievements: [
      'AWS Certified Developer (Associate) & Technical Specialist in Advanced Python Backend and API Design, 4+ years experience, 20+ global clients, and 30+ projects delivered.',
      'CodeForge (Lead Backend Architect): Engineered an offline first educational coding platform achieving 98% data overhead reduction and <28ms P99 execution latency.',
      'RevenueArchitect AI (Senior Distributed Systems Engineer): Built Python/Celery/Redis agentic pipelines ingesting 45k events/min and recovering $1.4M+ in SaaS revenue.',
      'VELORA Store (Principal Backend Engineer): Architected high concurrency flash sale checkout handling 12,500+ peak throughput with 0 overselling incidents.',
      'Delivered production platforms including NetCom 237 (98/100 Lighthouse, +45% inquiry conversion), SAMITECH Corporation (+120% enterprise inquiries), and Sea Digital Wealth (60% faster onboarding).',
    ],
    focusAreas:
      'Bridging technical execution with operational strategy, architecting high throughput Python distributed systems, offline first sync protocols, and scalable SaaS platforms.',
    contactTopic: 'Custom Software Development',
    socials: {
      github: 'https://github.com/Dylan21-svg',
      linkedin: 'https://www.linkedin.com/in/che-amah-diland-ngwa',
      x: 'https://twitter.com/dylansparks',
    },
  },
  {
    id: 'nji-prosper',
    executiveTitle: 'CTO',
    name: 'Nji Prosper',
    firstNamePart: 'Nji',
    accentNamePart: 'Prosper',
    role: 'CTO · Full Stack Developer | Data & Systems Engineer',
    heroTagline:
      'Multidisciplinary technologist specializing in full stack development, data engineering, scalable system architecture, AI, and IoT.',
    focusLabel: 'Full Stack, Data & Systems Engineering',
    location: 'Buea, Cameroon',
    email: 'samitech237@gmail.com',
    phone: '+237 6 95 20 03 61',
    website: 'samitech237.com/team/nji-prosper',
    websiteUrl: 'https://samitech237.com/team/nji-prosper',
    image: '/assets/aistudio/protech-_3e12073f.png',
    imageAlt: 'Nji Prosper, Chief Technology Officer, Full Stack Developer and Data & Systems Engineer at SAMITECH Corporation',
    width: 720,
    height: 760,
    bio: 'Multidisciplinary technologist specializing in full stack development, data engineering, and scalable system architecture across web platforms, AI powered tools, IoT integrated systems, and network infrastructures.',
    aboutMe:
      'I’m Nji Prosper, Chief Technology Officer and Full Stack Developer | Data & Systems Engineer at SAMITECH Corporation. I am a multidisciplinary technologist specializing in full stack development, data engineering, and scalable system architecture. Experienced in building modern web platforms, AI powered tools, IoT integrated systems, and network infrastructures, I combine software engineering, data systems, networking, UI/UX design, and real world problem solving across domains including fintech, automation, and digital agriculture.',
    specialties: [
      'Full Stack & Cloud Architecture',
      'Data Engineering, ETL & AI',
      'Networking & Cybersecurity',
      'IoT, Automation & Digital Agriculture',
    ],
    skills: [
      'JavaScript',
      'Node.js',
      'React',
      'PHP',
      'Laravel',
      'Python',
      'Rust',
      'Flutter',
      'C#',
      'Java',
      'REST APIs',
      'Cloud Architecture',
      'MySQL',
      'ETL & Data Analysis',
      'Machine Learning',
      'AI Integration',
      'LAN/WAN Setup',
      'Basic Cybersecurity',
      'UI/UX & Branding',
      'IoT Systems',
    ],
    languages: ['English (Fluent)', 'French (Working Proficiency)'],
    interests: [
      { label: 'IoT & AgriTech', icon: 'agritech' },
      { label: 'AI & Data', icon: 'ai' },
      { label: 'Networking', icon: 'connectivity' },
      { label: 'UI/UX & Design', icon: 'design' },
    ],
    experience: [
      {
        role: 'CTO · Lead Developer & Systems Engineer',
        organization: 'SAMITECH Corporation / Independent',
        highlightOrg: true,
        period: '2024 to Present',
        description:
          'Leading development of scalable web platforms, backend systems, and AI integrated applications. Architecting full stack solutions using Node.js, PHP, and modern frontend frameworks, while also handling networking environments and deployment systems.',
      },
      {
        role: 'Software Engineer',
        organization: 'Tech Labs / Projects',
        period: '2021 to 2024',
        description:
          'Developed frontend systems and backend services, building strong foundations in JavaScript, Node.js, and system architecture principles.',
      },
    ],
    educationSectionTitle: 'Certifications & Credentials',
    education: [
      {
        qualification: 'Google Cloud Professional',
        institution: 'Cloud Architecture & Infrastructure Certification',
        specialization: 'Scalable cloud deployments, distributed services, and data processing pipelines',
        period: 'Certified',
      },
      {
        qualification: 'React Certified & Self Taught Full Stack Systems Developer',
        institution: 'Full Stack Engineering, Networking & Design Practice',
        specialization:
          'Modern web frameworks, database design (MySQL), LAN/WAN configuration, router troubleshooting, and UI/UX design',
        period: 'Verified',
      },
    ],
    achievementsSectionTitle: 'Featured Projects & Achievements',
    achievements: [
      'IoT Monitoring Platform: Built a real time monitoring dashboard for industrial and agricultural IoT devices with predictive analytics (Angular, Node.js, InfluxDB, Grafana, MQTT).',
      'Advanced WhatsApp Bot Platform: Engineered a feature rich automation system with AI integration, media tools, and an admin dashboard (Node.js, JavaScript, AI APIs).',
      'Student Banking & Saving System: Delivered a secure fintech platform featuring deposits, withdrawals, admin controls, and real time notifications (PHP, MySQL, JavaScript).',
      'BookBloom Story Platform & Hymnal Web Application: Developed full featured interactive content and audio playback web platforms with search, bookmarks, and admin dashboards.',
      'AgriTech Monitoring System: Designed an IoT and data tracking system delivering actionable monitoring and real time insights for digital agriculture.',
    ],
    focusAreas:
      'Combining full stack software engineering, data systems, AI integration, IoT telemetry, and networking to solve real world problems across fintech, automation, and digital agriculture.',
    contactTopic: 'AI Development & Enablement',
    socials: {
      github: 'https://github.com/prosper-protech',
      linkedin: 'https://cm.linkedin.com/in/yunga-nji-prosper',
    },
  },
];

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return TEAM_MEMBERS.find((member) => member.id === slug);
}
