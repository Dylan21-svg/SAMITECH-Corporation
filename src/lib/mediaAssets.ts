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
import softwareFloorImg from '../assets/images/samitech_software_floor_1794695612730.webp';
import hardwareBenchImg from '../assets/images/samitech_hardware_bench_1794695613315.webp';
import nocCenterImg from '../assets/images/samitech_noc_center_1794695614349.webp';
import campusArchImg from '../assets/images/samitech_campus_architecture_1794695614655.webp';
import projectsHeroLaptopImg from '../assets/images/projects_hero_laptop.webp';
import campusProImg from '../assets/images/projects_campuspro.webp';
import veloraStoreImg from '../assets/images/projects_velora_store.webp';
import codeForgeImg from '../assets/images/projects_codeforge.webp';
import mailConsoleImg from '../assets/images/projects_mail_console.webp';

export interface MediaAssetPreset {
  id: string;
  label: string;
  category: 'Hardware' | 'Services' | 'Projects' | 'Team' | 'Brand';
  src: string;
}

export const SAMITECH_MEDIA_LIBRARY: MediaAssetPreset[] = [
  { id: 'starlink-kit', label: 'Starlink Standard Kit + Box', category: 'Hardware', src: starlinkKitBoxImg },
  { id: 'starlink-hotspot', label: 'Starlink + Hotspot Field Setup', category: 'Hardware', src: starlinkHotspotImg },
  { id: 'starlink-dish', label: 'Starlink Roof Alignment', category: 'Hardware', src: starlinkFieldImg },
  { id: 'mikrotik-white', label: 'MikroTik Hotspot White Kit', category: 'Hardware', src: mikrotikHotspotWhiteImg },
  { id: 'mikrotik-router', label: 'MikroTik Enterprise Router', category: 'Hardware', src: mikrotikRouterImg },
  { id: 'cctv-pack', label: '4-Camera CCTV Security Pack', category: 'Hardware', src: cctvPackWhiteImg },
  { id: 'cctv-kit', label: 'CCTV NVR Surveillance Kit', category: 'Hardware', src: cctvSecurityKitImg },
  { id: 'cctv-site', label: 'Commercial Security Camera', category: 'Hardware', src: cctvWarehouseImg },
  { id: 'desktop-ws', label: 'Desktop Workstation White', category: 'Hardware', src: desktopWorkstationWhiteImg },
  { id: 'laptop-ws', label: 'Pro Laptop Workstation', category: 'Hardware', src: workstationLaptopImg },
  { id: 'computer-lab', label: 'Computer Lab Deployment', category: 'Hardware', src: computerLabImg },
  { id: 'tech-install', label: 'SAMITECH Engineer Install', category: 'Hardware', src: technicianInstallImg },
  { id: 'software-floor', label: 'Software Engineering Floor', category: 'Services', src: softwareFloorImg },
  { id: 'fiber-core', label: 'Enterprise Fiber Core', category: 'Services', src: fiberCoreImg },
  { id: 'hardware-bench', label: 'Security & Hardware Bench', category: 'Services', src: hardwareBenchImg },
  { id: 'noc-center', label: 'Network Operations Center', category: 'Services', src: nocCenterImg },
  { id: 'campus-arch', label: 'SAMITECH Campus Building', category: 'Services', src: campusArchImg },
  { id: 'proj-laptop', label: 'Projects Holographic Laptop', category: 'Projects', src: projectsHeroLaptopImg },
  { id: 'proj-campuspro', label: 'CampusPro Showcase', category: 'Projects', src: campusProImg },
  { id: 'proj-velora', label: 'Velora Store Showcase', category: 'Projects', src: veloraStoreImg },
  { id: 'proj-codeforge', label: 'CodeForge Showcase', category: 'Projects', src: codeForgeImg },
  { id: 'proj-mail', label: 'Mail Console Showcase', category: 'Projects', src: mailConsoleImg },
  {
    id: 'proj-sylvester',
    label: 'Sylvester AI Showcase',
    category: 'Projects',
    src: '/assets/aistudio/Screenshot_2026-11-06_044025_f15f1f41.png',
  },
  {
    id: 'team-samuel',
    label: 'Foshong Samuel Kella (CEO)',
    category: 'Team',
    src: '/assets/aistudio/samuel_9840cba5.png',
  },
  {
    id: 'team-fabian',
    label: 'Chefor Fabian Nche (COO)',
    category: 'Team',
    src: '/assets/aistudio/fabian_4b120e12.png',
  },
  {
    id: 'team-marcel',
    label: 'Fru Marcel (CTO)',
    category: 'Team',
    src: '/assets/aistudio/marcel_0fb0a737.png',
  },
  {
    id: 'brand-logo',
    label: 'SAMITECH Corporation Emblem',
    category: 'Brand',
    src: '/assets/aistudio/Screenshot_2026-11-27_040347_2648052c.png',
  },
  {
    id: 'brand-networks',
    label: 'SAMITECH Networks Emblem',
    category: 'Brand',
    src: '/assets/aistudio/Screenshot_2026-11-27_040438_ff88a678.png',
  },
];

/**
 * Compresses an uploaded image file into a lightweight WebP data URI (<= 260 KB)
 * so it persists safely inside Firestore document size constraints without external storage.
 */
export async function compressImageFileToDataUrl(
  file: File,
  maxDimension = 1080,
  maxBytes = 250000
): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please choose a valid image file (PNG, JPG, WebP).');
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('Could not decode the selected image file.'));
      el.src = objectUrl;
    });

    const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
    const width = Math.max(1, Math.round(img.width * scale));
    const height = Math.max(1, Math.round(img.height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Browser canvas is unavailable for image optimization.');
    }
    ctx.drawImage(img, 0, 0, width, height);

    let quality = 0.84;
    let output = canvas.toDataURL('image/webp', quality);
    while (output.length > maxBytes && quality > 0.35) {
      quality -= 0.12;
      output = canvas.toDataURL('image/webp', quality);
    }

    if (output.length > 320000) {
      throw new Error('Image is still too large after compression. Please choose a smaller photo or paste an image URL.');
    }

    return output;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
