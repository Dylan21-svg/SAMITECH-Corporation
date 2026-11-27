export type CommunityPlatform = 'website' | 'whatsapp-group' | 'whatsapp-channel';

export interface SamitechCommunity {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  platform: CommunityPlatform;
  platformLabel: string;
  domainOrHandle: string;
  url: string;
  ctaLabel: string;
  description: string;
  highlights: string[];
  accentColor: string;
  image?: string;
  imageAlt?: string;
  imageFit?: 'cover' | 'contain';
  imageBg?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export const COMMUNITY_FILTERS: { id: 'all' | 'websites' | 'whatsapp'; label: string }[] = [
  { id: 'all', label: 'All Communities' },
  { id: 'websites', label: 'Web Ecosystems' },
  { id: 'whatsapp', label: 'WhatsApp Communities' },
];

export const SAMITECH_COMMUNITIES: SamitechCommunity[] = [
  {
    id: 'netcom',
    number: '01',
    name: 'NETCOM',
    subtitle: 'Building the Next Generation of Tech Professionals',
    platform: 'website',
    platformLabel: 'Web Ecosystem',
    domainOrHandle: 'netcom237.com',
    url: 'https://www.netcom237.com',
    ctaLabel: 'Visit netcom237.com',
    description:
      'A practical tech ecosystem where engineers, students, and innovators connect, learn, and grow together.',
    highlights: [
      'Hands-on engineering labs across networking, software, cloud & security',
      'Collaborative mentorship for students, builders, and tech professionals',
      'Independent web platform hosted at www.netcom237.com',
    ],
    accentColor: '#002BFF',
    image: '/assets/aistudio/Screenshot_2026-08-21_044502_30c24a0e.png',
    imageAlt: 'NETCOM tech ecosystem web platform at netcom237.com',
    imageFit: 'cover',
    imageBg: '#040B29',
    imageWidth: 1363,
    imageHeight: 582,
  },
  {
    id: 'samitech-networks',
    number: '02',
    name: 'SAMITECH Networks',
    subtitle: 'Networking, Starlink & Infrastructure Community',
    platform: 'whatsapp-group',
    platformLabel: 'WhatsApp Group',
    domainOrHandle: 'chat.whatsapp.com',
    url: 'https://chat.whatsapp.com/Hlj92LPZZHb9ar9U32OKgM',
    ctaLabel: 'Join WhatsApp Group',
    description:
      'An active community group bringing together network engineers, Starlink & Wi-Fi installers, and tech enthusiasts to share field insights, troubleshoot setups, and collaborate.',
    highlights: [
      'Practical discussions on Starlink, MikroTik, Wi-Fi zones & LAN setups',
      'Peer troubleshooting and real-world infrastructure guidance',
      'Direct interaction with SAMITECH networking practitioners',
    ],
    accentColor: '#059669',
    image: '/assets/aistudio/Screenshot_2026-11-27_040438_ff88a678.png',
    imageAlt: 'SAMITECH Networks community emblem — Connecting the Future',
    imageFit: 'contain',
    imageBg: '#070E24',
  },
  {
    id: 'samitech-channel',
    number: '03',
    name: 'SAMITECH Corporation',
    subtitle: 'Official Updates, Launches & Opportunities',
    platform: 'whatsapp-channel',
    platformLabel: 'WhatsApp Channel',
    domainOrHandle: 'whatsapp.com/channel',
    url: 'https://whatsapp.com/channel/0029Vb6LU7rHAdNdAxprZw3a',
    ctaLabel: 'Follow Channel',
    description:
      'The official SAMITECH Corporation WhatsApp Channel delivering company announcements, newly launched digital solutions, internship cohorts, and technology insights straight to your phone.',
    highlights: [
      'Verified updates on SAMITECH services, launches, and case studies',
      'Early alerts for engineering internships and training cohorts',
      'Curated cybersecurity tips and digital infrastructure updates',
    ],
    accentColor: '#0F766E',
    image: '/assets/aistudio/Screenshot_2026-11-27_040347_2648052c.png',
    imageAlt: 'SAMITECH Corporation emblem — Where Technology Meets Excellence',
    imageFit: 'contain',
    imageBg: '#FFFFFF',
  },
];
