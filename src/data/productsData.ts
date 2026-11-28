import starlinkKitBoxImg from '../assets/images/product_starlink_kit_box_1795753271580.jpg';
import starlinkHotspotImg from '../assets/images/product_starlink_hotspot_kit_1795749471820.jpg';
import starlinkFieldImg from '../assets/images/service_starlink_network_1795723132625.jpg';
import mikrotikHotspotWhiteImg from '../assets/images/product_mikrotik_hotspot_white_1795753271759.jpg';
import mikrotikRouterImg from '../assets/images/product_mikrotik_router_1795749472719.jpg';
import cctvPackWhiteImg from '../assets/images/product_cctv_pack_white_1795753273715.jpg';
import cctvSecurityKitImg from '../assets/images/product_cctv_security_kit_1795749473536.jpg';
import cctvWarehouseImg from '../assets/images/service_cctv_security_1795723133116.jpg';
import desktopWorkstationWhiteImg from '../assets/images/product_desktop_workstation_white_1795753272929.jpg';
import workstationLaptopImg from '../assets/images/product_workstation_laptop_1795749474156.jpg';
import computerLabImg from '../assets/images/service_computer_lab_1795723132597.jpg';
import technicianInstallImg from '../assets/images/product_technician_install_1795753273672.jpg';
import fiberCoreImg from '../assets/images/samitech_fiber_core_1794695612961.webp';
import hardwareBenchImg from '../assets/images/samitech_hardware_bench_1794695613315.webp';
import nocCenterImg from '../assets/images/samitech_noc_center_1794695614349.webp';

export type ProductCategoryId =
  | 'all'
  | 'networking-starlink'
  | 'cctv-security'
  | 'computers-labs';

export type ProductPricingType = 'fixed' | 'quote';

export interface ProductGalleryImage {
  src: string;
  alt: string;
  label: string;
  studioWhiteBg?: boolean;
}

export interface ProductTrustItem {
  icon: 'speed' | 'globe' | 'support' | 'shield';
  title: string;
}

export interface ProductFeatureItem {
  icon: 'rocket' | 'gauge' | 'weather' | 'home' | 'shield' | 'cpu';
  label: string;
}

export interface ProductIncludedItem {
  title: string;
  image: string;
  studioWhiteBg?: boolean;
}

export interface ProductSpecRow {
  label: string;
  value: string;
}

export interface ProductFaqItem {
  question: string;
  answer: string;
}

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
  unitPriceXaf?: number;
  shortDesc: string;
  specs: string[];
  heroHighlights: string[];
  longDescription: string;
  aboutBullets: string[];
  whatsInBox: string[];
  image: string;
  imageAlt: string;
  studioWhiteBg?: boolean;
  featured?: boolean;
  featuredHighlights?: {
    icon: 'globe' | 'latency' | 'plug';
    label: string;
  }[];
  gallery: ProductGalleryImage[];
  trustStrip: ProductTrustItem[];
  keyFeatures: ProductFeatureItem[];
  technicalSpecs: ProductSpecRow[];
  includedVisuals: ProductIncludedItem[];
  promoBanner: {
    title: string;
    subtitle: string;
    image: string;
  };
  faqs: ProductFaqItem[];
}

export const WHATSAPP_ORDER_NUMBER = '237695200361';

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

export function formatXaf(amount: number): string {
  return `${amount.toLocaleString('en-US')} XAF`;
}

export function buildProductWhatsAppUrl(
  product: SamitechProduct,
  includeInstallation = false,
  quantity = 1
): string {
  const safeQty = Math.max(1, Math.min(99, Math.floor(quantity)));
  const fullPrice =
    product.pricingType === 'fixed' && product.unitPriceXaf
      ? `${product.pricePrefix ? `${product.pricePrefix} ` : ''}${formatXaf(product.unitPriceXaf)} each${
          safeQty > 1 ? ` (Est. Total: ${formatXaf(product.unitPriceXaf * safeQty)})` : ''
        }`
      : product.pricePrefix
        ? `${product.pricePrefix} ${product.priceAmount}`
        : product.priceAmount;

  const installNote = includeInstallation
    ? '\n• Installation: Include SAMITECH professional installation & setup'
    : '\n• Installation: Hardware kit only (self-setup)';

  const text =
    product.pricingType === 'fixed'
      ? `Hello SAMITECH Corporation,\n\nI would like to order:\n• Product: *${product.name}*\n• SKU: ${product.sku}\n• Quantity: ${safeQty}\n• Price: ${fullPrice}${installNote}\n\nPlease confirm availability, delivery options, and payment steps.`
      : `Hello SAMITECH Corporation,\n\nI would like to request a quote for:\n• Product: *${product.name}*\n• SKU: ${product.sku}\n• Quantity: ${safeQty}${installNote}\n\nPlease let me know what site details you need.`;

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
  unitPriceXaf: 450000,
  shortDesc: 'High-speed internet anywhere in Cameroon and beyond.',
  specs: [
    'Starlink Standard Kit',
    'Professional Mount',
    'Easy Setup Guide',
  ],
  heroHighlights: [
    'Ultra-Fast Speeds (up to 250 Mbps)',
    'Global Coverage Across Cameroon',
    'Easy Setup & Optional Roof Installation',
    'Includes Heavy-Duty Mount Kit',
  ],
  longDescription:
    'The Starlink Standard Kit brings the power of low-earth orbit satellite internet directly to your home, school, hotel, or office. Designed by SpaceX and pre-inspected by SAMITECH engineers, it delivers ultra-fast, low-latency connectivity even in remote regions where fiber or 4G falls short—whether you are in Buea, Douala, Yaounde, or off-grid sites.',
  aboutBullets: [
    'Blazing-fast speeds (up to 250 Mbps download)',
    'Wide coverage across Cameroon and remote sites',
    'Simple plug-and-play setup or full SAMITECH mounting',
    'Weather-sealed reliability through heavy rain and wind',
  ],
  whatsInBox: [
    'Starlink Standard Dish & Kickstand Base',
    'Gen 3 Wi-Fi 6 Router + Power Supply Unit',
    '15m Weatherproof Cable + Heavy-Duty Mast / Roof Mount',
    'Quick Setup Guide + Optional MikroTik Bypass Configuration',
  ],
  image: starlinkKitBoxImg,
  imageAlt: 'Starlink satellite dish standing beside sleek matte black hardware box overlooking blue mountains',
  featured: true,
  featuredHighlights: [
    { icon: 'globe', label: 'Global Coverage' },
    { icon: 'latency', label: 'Low Latency' },
    { icon: 'plug', label: 'Plug & Play' },
  ],
  gallery: [
    {
      src: starlinkKitBoxImg,
      alt: 'Starlink Standard Kit dish and matte black packaging box outdoors',
      label: 'Full Kit & Box',
    },
    {
      src: starlinkFieldImg,
      alt: 'Starlink dish mounted with outdoor wireless links across campus roofline',
      label: 'Outdoor Field View',
    },
    {
      src: starlinkHotspotImg,
      alt: 'Starlink kit integrated with outdoor Wi-Fi hotspot radio hardware',
      label: 'Hotspot Integration',
    },
    {
      src: technicianInstallImg,
      alt: 'SAMITECH field technician commissioning wireless access point indoors',
      label: 'SAMITECH Install',
    },
    {
      src: fiberCoreImg,
      alt: 'Enterprise network rack integrated with Starlink WAN uplink',
      label: 'Core Uplink',
    },
  ],
  trustStrip: [
    { icon: 'speed', title: 'Ultra-Fast Speeds' },
    { icon: 'globe', title: 'Global Coverage' },
    { icon: 'support', title: '24/7 Support' },
    { icon: 'shield', title: 'Secure & Reliable' },
  ],
  keyFeatures: [
    { icon: 'rocket', label: 'Wide Cameroon Coverage' },
    { icon: 'gauge', label: 'Ultra-Fast Internet' },
    { icon: 'weather', label: 'Low Latency & Weatherproof' },
    { icon: 'home', label: 'Easy Self or Pro Install' },
  ],
  technicalSpecs: [
    { label: 'Download Speed', value: 'Up to 250 Mbps' },
    { label: 'Upload Speed', value: 'Up to 25 Mbps' },
    { label: 'Latency', value: 'Low (~20–40 ms)' },
    { label: 'Coverage', value: 'Nationwide Cameroon' },
    { label: 'Power Usage', value: '~50–75W Average' },
    { label: 'Connectivity', value: 'Wi-Fi 6 (Dual Ethernet)' },
  ],
  includedVisuals: [
    { title: 'Starlink Dish', image: starlinkKitBoxImg },
    { title: 'Mount Kit', image: starlinkFieldImg },
    { title: 'Wi-Fi Router', image: mikrotikHotspotWhiteImg, studioWhiteBg: true },
    { title: 'Hotspot Expansion', image: starlinkHotspotImg },
  ],
  promoBanner: {
    title: 'Connect Without Limits',
    subtitle: 'Experience the next level of internet with Starlink & SAMITECH.',
    image: starlinkFieldImg,
  },
  faqs: [
    {
      question: 'Does SAMITECH handle installation and mounting across Cameroon?',
      answer:
        'Yes. You can order hardware only for self-setup or request our field network engineers to mount the dish, seal cables, and configure Wi-Fi or MikroTik failover on site.',
    },
    {
      question: 'Can we connect the Starlink kit to our office LAN or voucher hotspot?',
      answer:
        'Yes. The Gen 3 router supports direct Ethernet and bypass mode so we can feed your MikroTik hotspot controller, office switch, or Point-to-Point wireless bridge seamlessly.',
    },
    {
      question: 'How fast can we receive the kit after ordering via WhatsApp?',
      answer:
        'In-stock kits can be prepared for same-day pickup or dispatched nationwide across Cameroon immediately after order confirmation on WhatsApp.',
    },
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
    unitPriceXaf: 200000,
    shortDesc: 'Provide internet access, manage users and bill easily.',
    specs: [
      'MikroTik Router + Outdoor AP',
      'Captive Portal & Voucher System',
      'Installation Support',
    ],
    heroHighlights: [
      'Pre-Configured MikroTik Hotspot Controller',
      'Weather-Rated Outdoor Coverage Access Point',
      'Custom Branded Login Portal & Voucher Billing',
      'Seamless Starlink, Fiber or 4G Uplink Ready',
    ],
    longDescription:
      'Built for student residences, hotels, cafés, and neighborhood Wi-Fi entrepreneurs across Cameroon, our Wi-Fi Hotspot Business-in-a-Box arrives fully pre-configured by SAMITECH engineers. Simply plug into your Starlink or fiber line and start issuing timed or data-capped vouchers with zero complex networking setup.',
    aboutBullets: [
      'Generates printable time & bandwidth hotspot vouchers in seconds',
      'Bandwidth fair-use shaping keeps video calls and browsing smooth',
      'High-gain outdoor AP penetrates courtyards and multi-room blocks',
      'Remote management & 24/7 engineering backup from SAMITECH',
    ],
    whatsInBox: [
      'Pre-Configured Dual-Antenna MikroTik Hotspot Router',
      'Weather-Rated Outdoor Access Point + PoE Injector',
      'Custom Branded Captive Portal & Voucher Setup',
      'Wall/Mast Mounting Hardware + Patch Cables',
    ],
    image: mikrotikHotspotWhiteImg,
    imageAlt: 'White dual-antenna MikroTik router beside white vertical outdoor access point on studio white background',
    studioWhiteBg: true,
    gallery: [
      {
        src: mikrotikHotspotWhiteImg,
        alt: 'MikroTik dual-antenna router and outdoor access point studio view',
        label: 'Hotspot Kit',
        studioWhiteBg: true,
      },
      {
        src: mikrotikRouterImg,
        alt: 'MikroTik enterprise routing unit configured for hotspot traffic management',
        label: 'MikroTik Core',
      },
      {
        src: starlinkHotspotImg,
        alt: 'Outdoor Wi-Fi hotspot system paired with Starlink satellite internet',
        label: 'Starlink Pairing',
      },
      {
        src: technicianInstallImg,
        alt: 'SAMITECH technician wall-mounting an indoor/outdoor wireless access point',
        label: 'Mounting Setup',
      },
      {
        src: hardwareBenchImg,
        alt: 'Pre-deployment testing on SAMITECH hardware bench',
        label: 'Bench Tested',
      },
    ],
    trustStrip: [
      { icon: 'speed', title: 'Plug & Earn Ready' },
      { icon: 'globe', title: 'Wide Hotspot Range' },
      { icon: 'support', title: '24/7 Tech Support' },
      { icon: 'shield', title: 'Bandwidth Control' },
    ],
    keyFeatures: [
      { icon: 'rocket', label: 'Instant Voucher Sales' },
      { icon: 'gauge', label: 'Per-User Speed Limits' },
      { icon: 'weather', label: 'All-Weather Outdoor AP' },
      { icon: 'home', label: 'Pre-Tested by SAMITECH' },
    ],
    technicalSpecs: [
      { label: 'Concurrent Users', value: '80–150+ Active Devices' },
      { label: 'Hotspot Engine', value: 'RouterOS Captive Portal' },
      { label: 'Outdoor Radio', value: 'Dual-Band 2.4 / 5 GHz' },
      { label: 'Coverage Radius', value: 'Up to 150m Line-of-Sight' },
      { label: 'Uplink Ports', value: 'Gigabit WAN (Starlink/Fiber)' },
      { label: 'Power', value: 'PoE Injector Included' },
    ],
    includedVisuals: [
      { title: 'Hotspot Router', image: mikrotikHotspotWhiteImg, studioWhiteBg: true },
      { title: 'RouterOS Core', image: mikrotikRouterImg },
      { title: 'Outdoor Mounting', image: technicianInstallImg },
      { title: 'Starlink Compatible', image: starlinkHotspotImg },
    ],
    promoBanner: {
      title: 'Launch Your Wi-Fi Zone Today',
      subtitle: 'Start monetizing fast internet in residences, hostels, and public hubs.',
      image: starlinkHotspotImg,
    },
    faqs: [
      {
        question: 'Can I customize the Wi-Fi login page with my brand name?',
        answer:
          'Yes! We customize the captive portal splash page with your business logo, pricing plans, and contact info before shipping.',
      },
      {
        question: 'Does this work directly with Starlink?',
        answer:
          'Yes. Plug your Starlink Ethernet cable into the WAN port and the system immediately manages vouchers and bandwidth quotas.',
      },
      {
        question: 'Can we expand coverage later with additional access points?',
        answer:
          'Absolutely. Additional indoor or outdoor sector access points can be added anytime without replacing the main controller.',
      },
    ],
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
    unitPriceXaf: 150000,
    shortDesc: 'Monitor what matters, day and night.',
    specs: [
      '4 HD Cameras',
      '1TB NVR',
      'Mobile App Access',
    ],
    heroHighlights: [
      '4x Crisp HD Weatherproof Night-Vision Cameras',
      '4-Channel NVR Recorder with 1TB Storage',
      'Live Remote Smartphone & PC Viewing Anywhere',
      'Motion Alerts & Local Continuous Recording',
    ],
    longDescription:
      'Protect your shop, residence, warehouse entrance, or office reception round the clock with SAMITECH’s complete 4-camera security pack. Engineered for reliable 24/7 recording with clear infrared night vision and instant smartphone notifications whenever motion is detected.',
    aboutBullets: [
      'Sharp HD daytime clarity and automatic infrared night vision',
      'Stores weeks of continuous or motion-triggered footage on 1TB HDD',
      'Encrypted mobile app viewing on Android, iOS, and desktop',
      'Optional SAMITECH professional installation & concealed cabling',
    ],
    whatsInBox: [
      '4x Weatherproof IP/PoE Dome Night-Vision Cameras',
      '4-Channel NVR Recorder with 1TB Surveillance HDD',
      'Encrypted Smartphone & Desktop Live Viewing Setup',
      'Power Adapters, BNC/Network Connectors & Mounting Screws',
    ],
    image: cctvPackWhiteImg,
    imageAlt: 'Four white weatherproof dome CCTV cameras arranged above a matte black 4-channel NVR unit',
    studioWhiteBg: true,
    gallery: [
      {
        src: cctvPackWhiteImg,
        alt: 'Four white HD dome CCTV cameras and matte black 4-channel NVR recorder',
        label: '4-Camera Pack',
        studioWhiteBg: true,
      },
      {
        src: cctvSecurityKitImg,
        alt: 'Complete smart surveillance kit cameras and recorder ready to deploy',
        label: 'NVR & Optics',
      },
      {
        src: cctvWarehouseImg,
        alt: 'Live outdoor security surveillance deployment overlooking commercial grounds',
        label: 'Site Coverage',
      },
      {
        src: technicianInstallImg,
        alt: 'SAMITECH specialist configuring remote phone security access',
        label: 'Pro Configuration',
      },
    ],
    trustStrip: [
      { icon: 'shield', title: 'Day & Night Clarity' },
      { icon: 'speed', title: 'Instant Mobile Alerts' },
      { icon: 'support', title: '24/7 Support' },
      { icon: 'globe', title: 'Remote Phone View' },
    ],
    keyFeatures: [
      { icon: 'shield', label: 'Weatherproof IP66 Domes' },
      { icon: 'weather', label: 'Infrared Night Vision' },
      { icon: 'cpu', label: 'Smart Motion Detection' },
      { icon: 'home', label: 'Mobile & TV Live View' },
    ],
    technicalSpecs: [
      { label: 'Camera Count', value: '4x HD Dome Cameras' },
      { label: 'Recorder', value: '4-Channel Network NVR' },
      { label: 'Storage', value: '1TB Surveillance Drive' },
      { label: 'Night Vision', value: 'Up to 30m Smart IR' },
      { label: 'Remote Access', value: 'iOS, Android & Windows' },
      { label: 'Weather Rating', value: 'IP66 Indoor / Outdoor' },
    ],
    includedVisuals: [
      { title: '4x HD Cameras', image: cctvPackWhiteImg, studioWhiteBg: true },
      { title: '1TB NVR Unit', image: cctvSecurityKitImg },
      { title: 'Perimeter View', image: cctvWarehouseImg },
      { title: 'App Pairing', image: technicianInstallImg },
    ],
    promoBanner: {
      title: 'Monitor Your Property Anywhere',
      subtitle: 'Get crisp live feeds and motion alerts directly on your phone 24/7.',
      image: cctvWarehouseImg,
    },
    faqs: [
      {
        question: 'Can I watch the cameras on my phone when I travel?',
        answer:
          'Yes. Once connected to your Wi-Fi or Starlink router, you can view live streams and recorded playback securely from anywhere.',
      },
      {
        question: 'Does the NVR keep recording if internet goes down?',
        answer:
          'Yes! Cameras record locally onto the 1TB NVR hard drive 24/7 even without active internet access.',
      },
      {
        question: 'Does SAMITECH handle installation and cable routing?',
        answer:
          'Yes, toggle professional installation when ordering on WhatsApp and our security team will mount, cable, and configure the system.',
      },
    ],
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
    unitPriceXaf: 300000,
    shortDesc: 'Ready-to-use PCs for schools and offices.',
    specs: [
      'Intel Core i5/i7',
      '16GB RAM, 512GB SSD',
      'Windows 11 Pro',
    ],
    heroHighlights: [
      'Intel Core i5 / i7 Multi-Core Performance',
      '16GB High-Speed RAM + 512GB NVMe SSD',
      'Crisp Widescreen Full HD Monitor Included',
      'Clean Windows 11 Pro & Office-Ready Image',
    ],
    longDescription:
      'Skip hours of driver hunting and sluggish setups. SAMITECH’s Pre-Configured Workstations arrive fully tested, thermal-verified, and loaded with Windows 11 Pro, essential productivity suites, and endpoint protection—ideal for business offices, accounting desks, software trainees, and modern schools.',
    aboutBullets: [
      'Fast NVMe SSD boot times under 10 seconds',
      'Full stress-testing and clean BIOS/driver commissioning before delivery',
      'Ergonomic full-HD widescreen display, keyboard, and mouse included',
      'Volume discounts available for multi-seat offices and training centers',
    ],
    whatsInBox: [
      'Business Desktop Tower + Widescreen Full HD Monitor',
      '16GB Memory + 512GB NVMe SSD + Keyboard & Mouse',
      'Clean Windows 11 Pro Setup & Full Hardware Check',
      'Power Cables & DisplayPort/HDMI Video Cable',
    ],
    image: desktopWorkstationWhiteImg,
    imageAlt: 'Matte black desktop tower PC beside widescreen monitor with blue wave display, keyboard and mouse',
    studioWhiteBg: true,
    gallery: [
      {
        src: desktopWorkstationWhiteImg,
        alt: 'Complete desktop workstation with widescreen display, keyboard, and mouse',
        label: 'Desktop Bundle',
        studioWhiteBg: true,
      },
      {
        src: workstationLaptopImg,
        alt: 'High-performance developer laptop option in studio lighting',
        label: 'Mobile Option',
      },
      {
        src: computerLabImg,
        alt: 'Rows of configured SAMITECH workstations deployed in a training lab',
        label: 'Lab Deployment',
      },
      {
        src: hardwareBenchImg,
        alt: 'Technician inspecting workstation components before delivery',
        label: 'QA Verified',
      },
    ],
    trustStrip: [
      { icon: 'speed', title: 'Fast NVMe SSD' },
      { icon: 'shield', title: 'Stress-Tested QA' },
      { icon: 'support', title: 'IT Support Ready' },
      { icon: 'globe', title: 'Office & Lab Built' },
    ],
    keyFeatures: [
      { icon: 'cpu', label: 'Intel Core i5 / i7' },
      { icon: 'gauge', label: '16GB RAM · 512GB SSD' },
      { icon: 'shield', label: 'Windows 11 Pro Ready' },
      { icon: 'home', label: 'Monitor & Peripherals' },
    ],
    technicalSpecs: [
      { label: 'Processor', value: 'Intel Core i5 / i7' },
      { label: 'Memory', value: '16GB DDR4 / DDR5' },
      { label: 'Storage', value: '512GB NVMe SSD' },
      { label: 'Display', value: '22"–24" Full HD Monitor' },
      { label: 'Operating System', value: 'Windows 11 Pro Activated' },
      { label: 'Warranty & Care', value: 'SAMITECH Bench Tested' },
    ],
    includedVisuals: [
      { title: 'Workstation Tower', image: desktopWorkstationWhiteImg, studioWhiteBg: true },
      { title: 'Full HD Monitor', image: computerLabImg },
      { title: 'Laptop Alternative', image: workstationLaptopImg },
      { title: 'Bench Testing', image: hardwareBenchImg },
    ],
    promoBanner: {
      title: 'Equip Your Team Without Delays',
      subtitle: 'Pre-imaged workstations ready to plug in on day one.',
      image: computerLabImg,
    },
    faqs: [
      {
        question: 'Can SAMITECH pre-install specific office or coding software?',
        answer:
          'Yes. Share your required applications when placing your order on WhatsApp and we will configure your image before delivery.',
      },
      {
        question: 'Can we upgrade to 32GB RAM or 1TB SSD?',
        answer:
          'Yes, memory and storage upgrades are available upon request before commissioning.',
      },
      {
        question: 'Do you offer batch pricing for offices or schools?',
        answer:
          'Yes, orders of 5 or more workstations qualify for volume discounts and bundled UPS/LAN packages.',
      },
    ],
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
    heroHighlights: [
      'Multi-Kilometer Outdoor Wireless Backhaul',
      'Extend 1 Starlink or Fiber Line Across Multiple Buildings',
      'Pre-Paired Encrypted Bridge Link Before Delivery',
      'Includes Surge Arrestors & Outdoor Mast Mounts',
    ],
    longDescription:
      'Eliminate duplicate internet subscriptions across annexes, school blocks, factories, or residential compounds. Our Point-to-Point (PtP) and Point-to-Multipoint (PtMP) Wireless Bridge Kits beam gigabit-class connectivity across hundreds of meters or multiple kilometers cleanly without trenching fiber.',
    aboutBullets: [
      'Connects main office Starlink or fiber directly to remote branches',
      'High-gain weatherproof radios resist heavy tropical rain fade',
      'Pre-paired IP addressing and WPA2/AES bridge encryption out of the box',
      'Backed by SAMITECH line-of-sight survey & tower alignment service',
    ],
    whatsInBox: [
      'Long-Range Outdoor PtP/PtMP Wireless Bridge Pair',
      'Mast Brackets, Outdoor Shielded Cabling & Surge Protection',
      'Link Alignment & Throughput Verification',
      'PoE Power Injectors & Weatherproof Cable Glands',
    ],
    image: starlinkHotspotImg,
    imageAlt: 'Long-range outdoor wireless access point and Starlink connectivity hardware kit',
    gallery: [
      {
        src: starlinkHotspotImg,
        alt: 'Outdoor wireless bridge hardware alongside Starlink antenna',
        label: 'Wireless Bridge',
      },
      {
        src: starlinkFieldImg,
        alt: 'Rooftop Starlink & directional wireless installation',
        label: 'Rooftop Link',
      },
      {
        src: fiberCoreImg,
        alt: 'Structured switching rack terminated for multi-building network links',
        label: 'Switch Uplink',
      },
      {
        src: nocCenterImg,
        alt: 'Live throughput monitoring across PtP campus links',
        label: 'Link Monitoring',
      },
    ],
    trustStrip: [
      { icon: 'globe', title: 'Multi-Km Range' },
      { icon: 'speed', title: 'Low Latency Hop' },
      { icon: 'shield', title: 'AES Encrypted' },
      { icon: 'support', title: 'Site Survey Ready' },
    ],
    keyFeatures: [
      { icon: 'rocket', label: 'Multi-Building Links' },
      { icon: 'gauge', label: 'High Throughput Link' },
      { icon: 'weather', label: 'Rain & Surge Guarded' },
      { icon: 'home', label: 'No Fiber Trenching' },
    ],
    technicalSpecs: [
      { label: 'Topology', value: 'Point-to-Point / PtMP' },
      { label: 'Effective Range', value: '500m to 15km+ (LoS)' },
      { label: 'Frequency', value: '5 GHz High-Gain MIMO' },
      { label: 'Protection', value: 'ESD Surge & IP67 Shell' },
      { label: 'Provisioning', value: 'Pre-Paired by SAMITECH' },
      { label: 'Uplink Compatibility', value: 'Starlink, Fiber & MikroTik' },
    ],
    includedVisuals: [
      { title: 'Directional Radios', image: starlinkHotspotImg },
      { title: 'Rooftop Mounting', image: starlinkFieldImg },
      { title: 'Switch Fabric', image: fiberCoreImg },
      { title: 'Telemetry Check', image: nocCenterImg },
    ],
    promoBanner: {
      title: 'Share One Connection Everywhere',
      subtitle: 'Bridge annex offices, campuses, and warehouses wirelessly in one day.',
      image: starlinkFieldImg,
    },
    faqs: [
      {
        question: 'How far can the wireless bridge transmit?',
        answer:
          'Depending on line-of-sight and selected radio pair, links easily span 500 meters across compounds up to 15+ kilometers across towns.',
      },
      {
        question: 'Do the two radios come already paired?',
        answer:
          'Yes, our engineers configure and bench-test the bridge pair before dispatch so mounting and alignment is fast.',
      },
      {
        question: 'Can you perform an on-site line-of-sight survey first?',
        answer:
          'Yes! Request a site survey via WhatsApp and we will verify antenna height and link budget for your exact locations.',
      },
    ],
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
    heroHighlights: [
      '8 to 16 Wide Dynamic Range Color Night Cameras',
      'Multi-Bay Enterprise NVR with Extended Storage',
      'VLAN-Segmented Network Security & Remote Access',
      'Solar / UPS Power Outage Continuity Options',
    ],
    longDescription:
      'Engineered for factories, loading bays, commercial plazas, hotels, and multi-building campuses, the SAMITECH 8+ Camera Enterprise CCTV Bundle secures wide perimeters with crystal-clear night optics, redundant UPS backup power, and hardened remote viewing.',
    aboutBullets: [
      'Eliminates glare at loading docks and entry gates with True WDR',
      'Keeps recording smoothly through power cuts via UPS/solar integration',
      'Separated surveillance VLAN protects corporate office Wi-Fi & servers',
      'Turnkey cabling, rack mounting, and preventive maintenance plan',
    ],
    whatsInBox: [
      '8 to 16 Weatherproof IP PoE Bullet & Dome Cameras',
      'Multi-Bay NVR + Extended Retention Storage',
      'Optional Solar / UPS Outage Continuity Pack',
      'PoE Core Switch, Cat6 Outdoor Cabling & Surge Protection',
    ],
    image: cctvWarehouseImg,
    imageAlt: 'Enterprise multi-camera CCTV surveillance installation overlooking commercial grounds',
    gallery: [
      {
        src: cctvWarehouseImg,
        alt: 'Wide perimeter enterprise CCTV installation at warehouse entrance',
        label: 'Warehouse View',
      },
      {
        src: cctvSecurityKitImg,
        alt: 'Multi-camera IP dome and bullet hardware kit',
        label: 'Camera Array',
      },
      {
        src: cctvPackWhiteImg,
        alt: 'Weatherproof dome cameras paired with enterprise NVR',
        label: 'Optics & NVR',
        studioWhiteBg: true,
      },
      {
        src: nocCenterImg,
        alt: 'Multi-screen control room monitoring enterprise surveillance feeds',
        label: 'Control Room',
      },
    ],
    trustStrip: [
      { icon: 'shield', title: 'VLAN Hardened' },
      { icon: 'speed', title: 'WDR Color Night' },
      { icon: 'support', title: 'Pro Maintenance' },
      { icon: 'globe', title: 'Multi-Site Feeds' },
    ],
    keyFeatures: [
      { icon: 'shield', label: 'Perimeter Bullet & Dome' },
      { icon: 'weather', label: 'Outage UPS Continuity' },
      { icon: 'cpu', label: 'Smart Line-Crossing AI' },
      { icon: 'home', label: 'Control Room Ready' },
    ],
    technicalSpecs: [
      { label: 'Channels', value: '8 / 16 / 32 Channel Scalable' },
      { label: 'Optics', value: '4MP–8MP True WDR PoE' },
      { label: 'Retention', value: '4TB–16TB RAID Ready' },
      { label: 'Power', value: 'PoE+ Switch + UPS Option' },
      { label: 'Security', value: 'Isolated Surveillance VLAN' },
      { label: 'Maintenance', value: 'SLA Support Available' },
    ],
    includedVisuals: [
      { title: 'Perimeter Cameras', image: cctvWarehouseImg },
      { title: 'Multi-Bay NVR', image: cctvSecurityKitImg },
      { title: 'Dome Array', image: cctvPackWhiteImg, studioWhiteBg: true },
      { title: 'Monitoring Desk', image: nocCenterImg },
    ],
    promoBanner: {
      title: 'Enterprise Visibility Zero Blind Spots',
      subtitle: 'Request a custom camera count and perimeter blueprint on WhatsApp.',
      image: cctvWarehouseImg,
    },
    faqs: [
      {
        question: 'Can we start with 8 cameras and add more later?',
        answer:
          'Yes. We can provision a 16-channel or 32-channel NVR from day one so adding extra cameras later requires zero core replacement.',
      },
      {
        question: 'How long do the cameras keep running if electricity cuts out?',
        answer:
          'With our optional UPS or solar battery pack, your NVR and PoE switch continue recording seamlessly through outages.',
      },
      {
        question: 'Do you sign ongoing CCTV maintenance contracts?',
        answer:
          'Yes, SAMITECH provides scheduled lens cleaning, storage health checks, and rapid hardware replacement.',
      },
    ],
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
    heroHighlights: [
      '10 to 50+ Identically Imaged Student & Instructor PCs',
      'Structured Gigabit LAN Cabling & Rack Switch',
      'Voltage Regulation, Surge & UPS Backup Protection',
      'Turnkey Classroom Setup & Maintenance Training',
    ],
    longDescription:
      'Equip your secondary school, university ICT hall, or technical vocational institute with a cohesive computer laboratory engineered from power outlet to screen. Every workstation shares the same clean curriculum software image, centralized LAN connectivity, and surge-protected wiring.',
    aboutBullets: [
      'Identical OS & coding/office software cloned across every lab seat',
      'Structured under-desk trunking keeps Ethernet and power tidy & safe',
      'Voltage regulators & UPS units safeguard hardware from grid spikes',
      'Includes instructor control workstation and ongoing SLA maintenance',
    ],
    whatsInBox: [
      'Batch of 10 to 50+ Matched Workstations & Monitors',
      'Gigabit Switch, Patch Panel & Structured Desk Cabling',
      'Standardized OS Image & Teacher Lab Setup',
      'Surge Protectors, Voltage Stabilizers & Cable Trunking',
    ],
    image: computerLabImg,
    imageAlt: 'Complete networked computer lab configured for schools and technical training centers',
    gallery: [
      {
        src: computerLabImg,
        alt: 'Complete networked classroom computer lab installed by SAMITECH',
        label: 'Classroom Lab',
      },
      {
        src: desktopWorkstationWhiteImg,
        alt: 'Matched student workstation tower and widescreen monitor',
        label: 'Student PC Unit',
        studioWhiteBg: true,
      },
      {
        src: fiberCoreImg,
        alt: 'Gigabit lab switch and patch panel cabinet',
        label: 'Lab Networking',
      },
      {
        src: hardwareBenchImg,
        alt: 'Bulk OS imaging and hardware diagnostics at SAMITECH',
        label: 'Batch Imaging',
      },
    ],
    trustStrip: [
      { icon: 'speed', title: 'Unified Lab Image' },
      { icon: 'shield', title: 'Surge & UPS Safe' },
      { icon: 'support', title: 'School SLA Care' },
      { icon: 'globe', title: 'Nationwide Setup' },
    ],
    keyFeatures: [
      { icon: 'cpu', label: '10–50+ Matched PCs' },
      { icon: 'gauge', label: 'Gigabit Classroom LAN' },
      { icon: 'shield', label: 'Voltage & UPS Guard' },
      { icon: 'home', label: 'Full Room Wiring' },
    ],
    technicalSpecs: [
      { label: 'Seat Count', value: '10 to 50+ Workstations' },
      { label: 'Per Seat Spec', value: 'i5/i7 · 8–16GB · SSD' },
      { label: 'Lab Network', value: 'Cat6a + Gigabit Switch' },
      { label: 'Power Guard', value: 'Surge + UPS Conditioning' },
      { label: 'Software', value: 'Custom Curriculum Image' },
      { label: 'Turnaround', value: '1–3 Weeks Turnkey' },
    ],
    includedVisuals: [
      { title: 'Matched PCs', image: desktopWorkstationWhiteImg, studioWhiteBg: true },
      { title: 'Lab Layout', image: computerLabImg },
      { title: 'Gigabit Switch', image: fiberCoreImg },
      { title: 'Pre-Imaging QA', image: hardwareBenchImg },
    ],
    promoBanner: {
      title: 'Build a Modern ICT Lab Faster',
      subtitle: 'Get a complete per-seat quote covering PCs, cabling, and installation.',
      image: computerLabImg,
    },
    faqs: [
      {
        question: 'Can SAMITECH set up the lab outside Yaounde or Douala?',
        answer:
          'Yes, our deployment teams outfit school and university labs across every region of Cameroon.',
      },
      {
        question: 'Can you include internet (Starlink) + classroom Wi-Fi in the same lab quote?',
        answer:
          'Yes! Many schools bundle a Starlink Standard Kit with our lab pack so every PC has fast day-one internet.',
      },
      {
        question: 'What happens if a PC needs servicing during the school year?',
        answer:
          'All lab packs come with direct 24/7 SAMITECH support via +237 6 95 20 03 61 and optional annual maintenance coverage.',
      },
    ],
  },
];

export const ALL_PRODUCTS: SamitechProduct[] = [
  FEATURED_STARLINK_PRODUCT,
  ...SAMITECH_PRODUCTS,
];

export function getProductById(id: string): SamitechProduct | undefined {
  return ALL_PRODUCTS.find((item) => item.id === id);
}
