import starlinkKitBoxImg from '../assets/images/product_starlink_kit_box_1795753271580.jpg';
import mikrotikHotspotWhiteImg from '../assets/images/product_mikrotik_hotspot_white_1795753271759.jpg';
import cctvPackWhiteImg from '../assets/images/product_cctv_pack_white_1795753273715.jpg';
import desktopWorkstationWhiteImg from '../assets/images/product_desktop_workstation_white_1795753272929.jpg';
import starlinkHotspotImg from '../assets/images/product_starlink_hotspot_kit_1795749471820.jpg';
import cctvWarehouseImg from '../assets/images/service_cctv_security_1795723133116.jpg';
import computerLabImg from '../assets/images/service_computer_lab_1795723132597.jpg';

export type ProductCategoryId =
  | 'all'
  | 'networking-starlink'
  | 'cctv-security'
  | 'computers-labs';

export type ProductPricingType = 'fixed' | 'quote';

export interface SamitechProduct {
  id: string;
  sku: string;
  name: string;
  category: Exclude<ProductCategoryId, 'all'>;
  categoryLabel: string;
  availability: 'In Stock' | 'Pre-Order' | 'Request Quote';
  pricingType: ProductPricingType;
  pricePrefix?: string;
  priceAmount: string;
  shortDesc: string;
  specs: string[];
  whatsInBox: string[];
  image: string;
  imageAlt: string;
  studioWhiteBg?: boolean;
  featured?: boolean;
  featuredHighlights?: {
    icon: 'globe' | 'latency' | 'plug';
    label: string;
  }[];
}

export const WHATSAPP_ORDER_NUMBER = '237674137259';

export const PRODUCTS_HERO_MEDIA = {
  heroShowcase: '/assets/aistudio/SAMITECH_Networks_Futuristic_Tech_Horizon_78af4cc8.png',
  bottomBanner: '/assets/aistudio/product2_c27d30e8.png',
};

export const PRODUCT_CATEGORIES: { id: ProductCategoryId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'networking-starlink', label: 'Networking & Starlink' },
  { id: 'cctv-security', label: 'CCTV & Security' },
  { id: 'computers-labs', label: 'Computers & Labs' },
];

export function buildProductWhatsAppUrl(
  product: SamitechProduct,
  includeInstallation = false
): string {
  const fullPrice = product.pricePrefix
    ? `${product.pricePrefix} ${product.priceAmount}`
    : product.priceAmount;

  const installNote = includeInstallation
    ? ' Please also include professional SAMITECH installation & setup.'
    : '';

  const text =
    product.pricingType === 'fixed'
      ? `Hello SAMITECH, I would like to order *${product.name}* (${product.sku} · ${fullPrice}).${installNote} Please confirm availability and next steps.`
      : `Hello SAMITECH, I would like to request a quote for *${product.name}* (${product.sku}).${installNote} Please let me know what details you need.`;

  return `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function buildGeneralHardwareWhatsAppUrl(): string {
  const text =
    'Hello SAMITECH, I need a custom hardware quote (bulk order, multi-site setup, or specific hardware sourcing).';
  return `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const FEATURED_STARLINK_PRODUCT: SamitechProduct = {
  id: 'starlink-standard-kit',
  sku: 'SMT-NET-01',
  name: 'Starlink Standard Kit + Mount',
  category: 'networking-starlink',
  categoryLabel: 'Networking & Starlink',
  availability: 'In Stock',
  pricingType: 'fixed',
  pricePrefix: 'From',
  priceAmount: '450,000 XAF',
  shortDesc: 'High-speed internet anywhere in Cameroon and beyond.',
  specs: [
    'Starlink Standard Kit',
    'Professional Mount',
    'Easy Setup Guide',
  ],
  whatsInBox: [
    'Starlink Standard Dish & Kickstand Base',
    'Gen Router + Power Supply Unit',
    '15m Weatherproof Cable + Heavy-Duty Mast/Roof Mount',
    'Optional MikroTik Bypass Configuration Ready',
  ],
  image: starlinkKitBoxImg,
  imageAlt: 'Starlink satellite dish standing beside sleek matte black hardware box overlooking blue mountains',
  featured: true,
  featuredHighlights: [
    { icon: 'globe', label: 'Global Coverage' },
    { icon: 'latency', label: 'Low Latency' },
    { icon: 'plug', label: 'Plug & Play' },
  ],
};

export const SAMITECH_PRODUCTS: SamitechProduct[] = [
  {
    id: 'wifi-hotspot-box',
    sku: 'SMT-NET-02',
    name: 'Wi-Fi Hotspot Business-in-a-Box',
    category: 'networking-starlink',
    categoryLabel: 'Networking & Starlink',
    availability: 'In Stock',
    pricingType: 'fixed',
    pricePrefix: 'From',
    priceAmount: '200,000 XAF',
    shortDesc: 'Provide internet access, manage users and bill easily.',
    specs: [
      'MikroTik Router + Outdoor AP',
      'Captive Portal & Voucher System',
      'Installation Support',
    ],
    whatsInBox: [
      'Pre-Configured Dual-Antenna Hotspot Router',
      'Weather-Rated Outdoor Access Point + PoE Injector',
      'Custom Branded Captive Portal & Voucher Setup',
    ],
    image: mikrotikHotspotWhiteImg,
    imageAlt: 'White dual-antenna MikroTik router beside white vertical outdoor access point on studio white background',
    studioWhiteBg: true,
  },
  {
    id: 'home-shop-security-pack',
    sku: 'SMT-SEC-01',
    name: 'Home / Shop Security Pack',
    category: 'cctv-security',
    categoryLabel: 'CCTV & Security',
    availability: 'In Stock',
    pricingType: 'fixed',
    priceAmount: '150,000 XAF',
    shortDesc: 'Monitor what matters, day and night.',
    specs: [
      '4 HD Cameras',
      '1TB NVR',
      'Mobile App Access',
    ],
    whatsInBox: [
      '4x Weatherproof IP/PoE Dome Night-Vision Cameras',
      '4-Channel NVR Recorder with 1TB Surveillance HDD',
      'Encrypted Smartphone & Desktop Live Viewing Setup',
    ],
    image: cctvPackWhiteImg,
    imageAlt: 'Four white weatherproof dome CCTV cameras arranged above a matte black 4-channel NVR unit',
    studioWhiteBg: true,
  },
  {
    id: 'pre-configured-workstations',
    sku: 'SMT-CMP-01',
    name: 'Pre-Configured Workstations',
    category: 'computers-labs',
    categoryLabel: 'Computers & Labs',
    availability: 'Pre-Order',
    pricingType: 'fixed',
    pricePrefix: 'From',
    priceAmount: '300,000 XAF',
    shortDesc: 'Ready-to-use PCs for schools and offices.',
    specs: [
      'Intel Core i5/i7',
      '16GB RAM, 512GB SSD',
      'Windows 11 Pro',
    ],
    whatsInBox: [
      'Business Desktop Tower + Widescreen Full HD Monitor',
      '16GB Memory + 512GB NVMe SSD + Keyboard & Mouse',
      'Clean Windows 11 Pro Setup & Full Hardware Check',
    ],
    image: desktopWorkstationWhiteImg,
    imageAlt: 'Matte black desktop tower PC beside widescreen monitor with blue wave display, keyboard and mouse',
    studioWhiteBg: true,
  },
  {
    id: 'ptp-ptmp-wireless-kit',
    sku: 'SMT-NET-03',
    name: 'PtP / PtMP Wireless Bridge Kit',
    category: 'networking-starlink',
    categoryLabel: 'Networking & Starlink',
    availability: 'Request Quote',
    pricingType: 'quote',
    priceAmount: 'Request Quote',
    shortDesc: 'Extend Starlink or fiber internet across buildings and estates.',
    specs: [
      'Matched Directional Dish Radios',
      'PoE Injectors & Surge Arrestors',
      'Pre-Paired Site Configuration',
    ],
    whatsInBox: [
      'Long-Range Outdoor PtP/PtMP Wireless Bridge Pair',
      'Mast Brackets, Outdoor Shielded Cabling & Surge Protection',
      'Link Alignment & Throughput Verification',
    ],
    image: starlinkHotspotImg,
    imageAlt: 'Long-range outdoor wireless access point and Starlink connectivity hardware kit',
  },
  {
    id: 'warehouse-enterprise-cctv',
    sku: 'SMT-SEC-02',
    name: '8+ Camera Warehouse CCTV Bundle',
    category: 'cctv-security',
    categoryLabel: 'CCTV & Security',
    availability: 'Request Quote',
    pricingType: 'quote',
    priceAmount: 'Request Quote',
    shortDesc: 'Multi-zone perimeter surveillance with backup power options.',
    specs: [
      '8–16 WDR Color Night Cameras',
      'Multi-Bay NVR & UPS Backup',
      'VLAN Isolated Remote Viewing',
    ],
    whatsInBox: [
      '8 to 16 Weatherproof IP PoE Bullet & Dome Cameras',
      'Multi-Bay NVR + Extended Retention Storage',
      'Optional Solar / UPS Outage Continuity Pack',
    ],
    image: cctvWarehouseImg,
    imageAlt: 'Enterprise multi-camera CCTV surveillance installation overlooking commercial grounds',
  },
  {
    id: 'turnkey-school-lab-pack',
    sku: 'SMT-CMP-02',
    name: 'Turnkey School Computer Lab Pack',
    category: 'computers-labs',
    categoryLabel: 'Computers & Labs',
    availability: 'Request Quote',
    pricingType: 'quote',
    priceAmount: 'Request Quote',
    shortDesc: 'Matched classroom workstation batches with LAN and UPS protection.',
    specs: [
      '10–50+ Identically Imaged PCs',
      'Gigabit Switch & Cat6a Cabling',
      'Power Surge & UPS Protection',
    ],
    whatsInBox: [
      'Batch of 10 to 50+ Matched Workstations & Monitors',
      'Gigabit Switch, Patch Panel & Structured Desk Cabling',
      'Standardized OS Image & Teacher Lab Setup',
    ],
    image: computerLabImg,
    imageAlt: 'Complete networked computer lab configured for schools and technical training centers',
  },
];
