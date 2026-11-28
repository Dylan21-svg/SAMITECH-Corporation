export interface CareerOpening {
  id: string;
  title: string;
  location: string;
  department: string;
  type: string;
  summary: string;
  requirements: string[];
  isOpen?: boolean;
}

export const CAREER_OPENINGS: CareerOpening[] = [
  {
    id: 'software-department-internship',
    title: 'Software Department Internship',
    location: 'Cameroon / Hybrid',
    department: 'Software Department',
    type: 'Internship (3 to 6 Mo)',
    summary:
      'Join our Software Department to assist with real web, mobile, and UI/UX engineering projects using React, TypeScript, Node.js, and Flutter under senior mentor guidance.',
    requirements: [
      'Foundational knowledge of HTML, CSS, JavaScript/TypeScript, or mobile app development',
      'Eagerness to learn Git workflows, component architecture, and clean UI implementation',
      'Enrolled in or recently graduated from a Computer Science / Software Engineering track in Cameroon',
    ],
    isOpen: true,
  },
  {
    id: 'networking-department-internship',
    title: 'Networking Department Internship',
    location: 'Cameroon / On-Site',
    department: 'Networking Department',
    type: 'Internship (3 to 6 Mo)',
    summary:
      'Train alongside our field engineers on Starlink deployments, Wi-Fi hotspot zones, MikroTik/UniFi routing, structured LAN cabling, and network maintenance.',
    requirements: [
      'Basic understanding of IP addressing, LAN/WLAN fundamentals, and network hardware',
      'Willingness to participate in hands on field installations and hardware diagnostics',
      'Studying or recently trained in Networking, Telecoms, or IT Systems Administration',
    ],
    isOpen: true,
  },
];
