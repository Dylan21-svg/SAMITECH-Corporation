import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import {
  auth,
  db,
  firebaseProjectMeta,
  googleProvider,
  handleFirestoreError,
  OperationType,
  uploadJsonSnapshotToStorage,
} from '../lib/firebase';
import { SAMITECH_MEDIA_LIBRARY } from '../lib/mediaAssets';
import {
  CASE_STUDIES,
  COMPANY_CONTACT,
  FAQ_ITEMS,
  SERVICES,
  type CaseStudy,
  type FaqItem,
  type ServiceItem,
} from '../data/samitechData';
import {
  ALL_PRODUCTS,
  buildProductWhatsAppUrl as buildDefaultProductWhatsAppUrl,
  type SamitechProduct,
} from '../data/productsData';
import {
  ALL_SERVICES_CATALOG,
  type ServiceDetail,
} from '../data/servicesCatalog';
import {
  PORTFOLIO_PROJECTS,
  type ShowcaseProject,
} from '../data/projectsData';
import { TEAM_MEMBERS, type TeamMember } from '../data/teamData';
import {
  SAMITECH_COMMUNITIES,
  type SamitechCommunity,
} from '../data/communitiesData';
import { CAREER_OPENINGS, type CareerOpening } from '../data/careersData';

export const SUPER_ADMIN_EMAIL = 'chediland266@gmail.com';

export interface SiteSettings {
  brandName: string;
  legalName: string;
  domain: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  whatsappDefaultMessage: string;
  location: string;
  regions: string;
  founded: string;
  availability: string;
}

export interface AdminUserRecord {
  email: string;
  displayName: string;
  role: 'super_admin' | 'editor';
  active: boolean;
  addedByEmail: string;
}

export interface CloudSyncManifest {
  id: string;
  projectName: string;
  databaseId: string;
  storageBucket: string;
  storageSynced: boolean;
  storageUrl?: string;
  syncedByEmail: string;
  recordCount: number;
  assetCount: number;
  collections: Record<string, number>;
  assets: { id: string; label: string; category: string; src: string }[];
}

export interface CloudSyncResult {
  written: number;
  totalRecords: number;
  assetCount: number;
  storageSynced: boolean;
  storageUrl?: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  brandName: COMPANY_CONTACT.brandName,
  legalName: COMPANY_CONTACT.legalName,
  domain: COMPANY_CONTACT.domain,
  email: COMPANY_CONTACT.email,
  phone: COMPANY_CONTACT.phone,
  whatsappNumber: COMPANY_CONTACT.whatsappNumber,
  whatsappDefaultMessage:
    'Hello SAMITECH Corporation, I would like to inquire about your services.',
  location: COMPANY_CONTACT.location,
  regions: COMPANY_CONTACT.regions,
  founded: COMPANY_CONTACT.founded,
  availability: COMPANY_CONTACT.availability,
};

function stripUndefined<T>(input: T): T {
  if (Array.isArray(input)) {
    return input.map((item) => stripUndefined(item)) as unknown as T;
  }
  if (input !== null && typeof input === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
      if (v !== undefined) {
        out[k] = stripUndefined(v);
      }
    }
    return out as T;
  }
  return input;
}

function sanitizeId(raw: string): string {
  const cleaned = raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
  return cleaned || `item-${Date.now()}`;
}

export function normalizeWhatsappDigits(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 9 && digits.startsWith('6')) {
    return `237${digits}`;
  }
  return digits || DEFAULT_SITE_SETTINGS.whatsappNumber;
}

interface SiteContentContextValue {
  // Public live data
  settings: SiteSettings;
  products: SamitechProduct[];
  featuredProduct: SamitechProduct;
  catalogProducts: SamitechProduct[];
  services: ServiceDetail[];
  homeServices: ServiceItem[];
  projects: ShowcaseProject[];
  homeCaseStudies: CaseStudy[];
  teamMembers: TeamMember[];
  communities: SamitechCommunity[];
  careers: CareerOpening[];
  faqs: FaqItem[];
  cloudSynced: boolean;
  cloudCounts: {
    settings: boolean;
    products: number;
    services: number;
    projects: number;
    team: number;
    communities: number;
    careers: number;
    faqs: number;
  };
  // Helper lookups & dynamic links
  getProductById: (id: string) => SamitechProduct | undefined;
  getServiceBySlug: (slug: string) => ServiceDetail | undefined;
  getTeamMemberBySlug: (slug: string) => TeamMember | undefined;
  buildWhatsAppUrl: (customMessage?: string) => string;
  buildProductWhatsAppUrl: (
    product: SamitechProduct,
    includeInstallation?: boolean,
    quantity?: number
  ) => string;
  // Auth & Admin state
  authUser: User | null;
  authReady: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  adminCheckLoading: boolean;
  adminUsers: AdminUserRecord[];
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  // Admin CMS mutations
  saveSettings: (next: SiteSettings) => Promise<void>;
  saveProduct: (product: SamitechProduct, sortOrder?: number) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  saveService: (service: ServiceDetail, sortOrder?: number) => Promise<void>;
  deleteService: (slug: string) => Promise<void>;
  saveProject: (project: ShowcaseProject, sortOrder?: number) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  saveTeamMember: (member: TeamMember, sortOrder?: number) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;
  saveCommunity: (community: SamitechCommunity, sortOrder?: number) => Promise<void>;
  deleteCommunity: (id: string) => Promise<void>;
  saveCareer: (career: CareerOpening, sortOrder?: number) => Promise<void>;
  deleteCareer: (id: string) => Promise<void>;
  saveFaq: (faq: FaqItem, sortOrder?: number) => Promise<void>;
  deleteFaq: (id: string) => Promise<void>;
  addAdminUser: (email: string, displayName: string, role: 'super_admin' | 'editor') => Promise<void>;
  toggleAdminUserActive: (record: AdminUserRecord) => Promise<void>;
  removeAdminUser: (email: string) => Promise<void>;
  seedDefaultsToFirestore: (overwrite?: boolean) => Promise<number>;
  syncAllToCloud: (overwrite?: boolean) => Promise<CloudSyncResult>;
  backupManifest: CloudSyncManifest | null;
  lastSyncTime: Date | null;
  cloudSyncing: boolean;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [cloudSettings, setCloudSettings] = useState<SiteSettings | null>(null);
  const [cloudProducts, setCloudProducts] = useState<SamitechProduct[]>([]);
  const [cloudServices, setCloudServices] = useState<ServiceDetail[]>([]);
  const [cloudProjects, setCloudProjects] = useState<ShowcaseProject[]>([]);
  const [cloudTeam, setCloudTeam] = useState<TeamMember[]>([]);
  const [cloudCommunities, setCloudCommunities] = useState<SamitechCommunity[]>([]);
  const [cloudCareers, setCloudCareers] = useState<CareerOpening[]>([]);
  const [cloudFaqs, setCloudFaqs] = useState<FaqItem[]>([]);

  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [listedAdminRecord, setListedAdminRecord] = useState<AdminUserRecord | null>(null);
  const [adminCheckLoading, setAdminCheckLoading] = useState(true);
  const [adminUsers, setAdminUsers] = useState<AdminUserRecord[]>([]);
  const [backupManifest, setBackupManifest] = useState<CloudSyncManifest | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [cloudSyncing, setCloudSyncing] = useState(false);
  const [publicCloudLoaded, setPublicCloudLoaded] = useState(false);
  const autoSyncedRef = useRef(false);

  // Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setAuthReady(true);
      if (!user) {
        setListedAdminRecord(null);
        setAdminUsers([]);
        setAdminCheckLoading(false);
      }
    });
    return () => unsub();
  }, []);

  const userEmailLower = authUser?.email?.toLowerCase() ?? '';
  const isSuperAdmin = Boolean(
    authUser && authUser.emailVerified && userEmailLower === SUPER_ADMIN_EMAIL
  );

  // Check current user allowlist entry when signed in
  useEffect(() => {
    if (!authReady || !authUser || !userEmailLower) {
      setAdminCheckLoading(false);
      return;
    }
    if (isSuperAdmin) {
      setAdminCheckLoading(false);
    } else {
      setAdminCheckLoading(true);
    }
    const adminRef = doc(db, 'admin_users', userEmailLower);
    const unsub = onSnapshot(
      adminRef,
      (snap) => {
        if (snap.exists()) {
          setListedAdminRecord(snap.data() as AdminUserRecord);
        } else {
          setListedAdminRecord(null);
        }
        setAdminCheckLoading(false);
      },
      () => {
        setListedAdminRecord(null);
        setAdminCheckLoading(false);
      }
    );
    return () => unsub();
  }, [authReady, authUser, userEmailLower, isSuperAdmin]);

  const isAdmin = Boolean(
    authUser &&
      authUser.emailVerified &&
      (isSuperAdmin || (listedAdminRecord && listedAdminRecord.active === true))
  );

  // Admin allowlist & cloud backup manifest subscriber (guarded by auth & isAdmin)
  useEffect(() => {
    if (!authReady || !authUser || !isAdmin) {
      setAdminUsers([]);
      setBackupManifest(null);
      return;
    }
    const unsubAdmins = onSnapshot(
      collection(db, 'admin_users'),
      (snap) => {
        const list = snap.docs.map((d) => d.data() as AdminUserRecord);
        list.sort((a, b) => a.email.localeCompare(b.email));
        setAdminUsers(list);
      },
      (err) => {
        console.warn('Unable to load admin allowlist:', err);
      }
    );
    const unsubBackup = onSnapshot(
      doc(db, 'site_backups', 'project-manifest'),
      (snap) => {
        if (snap.exists()) {
          const data = snap.data() as CloudSyncManifest & { updatedAt?: { toDate?: () => Date } };
          setBackupManifest(data);
          if (data.updatedAt && typeof data.updatedAt.toDate === 'function') {
            setLastSyncTime(data.updatedAt.toDate());
          }
        }
      },
      (err) => {
        console.warn('Unable to load site_backups manifest:', err);
      }
    );
    return () => {
      unsubAdmins();
      unsubBackup();
    };
  }, [authReady, authUser, isAdmin]);

  // Public Firestore collection listeners
  useEffect(() => {
    const unsubs: (() => void)[] = [];

    unsubs.push(
      onSnapshot(
        doc(db, 'site_settings', 'global'),
        (snap) => {
          setPublicCloudLoaded(true);
          if (snap.exists()) {
            const data = snap.data() as SiteSettings;
            setCloudSettings({
              brandName: data.brandName,
              legalName: data.legalName,
              domain: data.domain,
              email: data.email,
              phone: data.phone,
              whatsappNumber: data.whatsappNumber,
              whatsappDefaultMessage: data.whatsappDefaultMessage,
              location: data.location,
              regions: data.regions,
              founded: data.founded,
              availability: data.availability,
            });
          } else {
            setCloudSettings(null);
          }
        },
        (err) => {
          setPublicCloudLoaded(true);
          console.warn('site_settings read fallback active:', err);
        }
      )
    );

    const subscribeSortedCollection = <T extends object>(
      colName: string,
      setter: (items: T[]) => void
    ) => {
      unsubs.push(
        onSnapshot(
          collection(db, colName),
          (snap) => {
            const rows = snap.docs
              .map((d) => ({
                data: d.data() as T & { sortOrder?: number },
              }))
              .sort((a, b) => (a.data.sortOrder ?? 999) - (b.data.sortOrder ?? 999))
              .map((item) => item.data as T);
            setter(rows);
          },
          (err) => console.warn(`${colName} read fallback active:`, err)
        )
      );
    };

    subscribeSortedCollection<SamitechProduct>('site_products', setCloudProducts);
    subscribeSortedCollection<ServiceDetail>('site_services', setCloudServices);
    subscribeSortedCollection<ShowcaseProject>('site_projects', setCloudProjects);
    subscribeSortedCollection<TeamMember>('site_team', setCloudTeam);
    subscribeSortedCollection<SamitechCommunity>('site_communities', setCloudCommunities);
    subscribeSortedCollection<CareerOpening>('site_careers', setCloudCareers);
    subscribeSortedCollection<FaqItem>('site_faqs', setCloudFaqs);

    return () => {
      unsubs.forEach((fn) => fn());
    };
  }, []);

  const settings = cloudSettings ?? DEFAULT_SITE_SETTINGS;
  const products = cloudProducts.length > 0 ? cloudProducts : ALL_PRODUCTS;
  const services = cloudServices.length > 0 ? cloudServices : ALL_SERVICES_CATALOG;
  const projects = cloudProjects.length > 0 ? cloudProjects : PORTFOLIO_PROJECTS;
  const teamMembers = cloudTeam.length > 0 ? cloudTeam : TEAM_MEMBERS;
  const communities = cloudCommunities.length > 0 ? cloudCommunities : SAMITECH_COMMUNITIES;
  const careers =
    cloudSettings !== null || cloudCareers.length > 0
      ? cloudCareers
      : CAREER_OPENINGS;
  const faqs =
    cloudSettings !== null || cloudFaqs.length > 0
      ? cloudFaqs
      : FAQ_ITEMS;

  const featuredProduct = useMemo(
    () => products.find((p) => p.featured) ?? products[0],
    [products]
  );

  const catalogProducts = useMemo(() => {
    const rest = products.filter((p) => p.id !== featuredProduct?.id);
    return rest.length > 0 ? rest : products;
  }, [products, featuredProduct]);

  const homeServices: ServiceItem[] = useMemo(() => {
    if (cloudServices.length === 0) return SERVICES;
    return SERVICES.map((baseItem) => {
      const liveMatch = services.find((s) => s.slug === baseItem.detailSlug);
      if (!liveMatch) return baseItem;
      return {
        ...baseItem,
        title: liveMatch.title,
        shortDesc: liveMatch.shortDesc,
        image: liveMatch.image,
        imageAlt: liveMatch.imageAlt,
        serviceCategory: liveMatch.contactCategory,
      };
    });
  }, [cloudServices.length, services]);

  const homeCaseStudies: CaseStudy[] = useMemo(() => {
    if (cloudProjects.length === 0) return CASE_STUDIES;
    return projects.slice(0, 4);
  }, [cloudProjects.length, projects]);

  const getProductById = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products]
  );

  const getServiceBySlug = useCallback(
    (slug: string) => {
      const legacySlugAliases: Record<string, string> = {
        'custom-software': 'software-services',
        'mobile-app-development': 'software-services',
        'ux-ui': 'software-services',
        'ai-development': 'software-services',
        'product-scope': 'software-services',
        'mvp-builder': 'software-services',
        'networking-solutions': 'network-services',
        'tracking-support': 'tracking',
      };
      const normalized = legacySlugAliases[slug] ?? slug;
      return services.find((s) => s.slug === normalized);
    },
    [services]
  );

  const getTeamMemberBySlug = useCallback(
    (slug: string) => teamMembers.find((m) => m.id === slug),
    [teamMembers]
  );

  const buildWhatsAppUrl = useCallback(
    (customMessage?: string) => {
      const digits = normalizeWhatsappDigits(settings.whatsappNumber);
      const msg = customMessage || settings.whatsappDefaultMessage;
      return `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`;
    },
    [settings.whatsappNumber, settings.whatsappDefaultMessage]
  );

  const buildProductWhatsAppUrl = useCallback(
    (product: SamitechProduct, includeInstallation = false, quantity = 1) => {
      const baseUrl = buildDefaultProductWhatsAppUrl(product, includeInstallation, quantity);
      const digits = normalizeWhatsappDigits(settings.whatsappNumber);
      return baseUrl.replace(/https:\/\/wa\.me\/\d+/, `https://wa.me/${digits}`);
    },
    [settings.whatsappNumber]
  );

  const signInWithGoogle = useCallback(async () => {
    await signInWithPopup(auth, googleProvider);
  }, []);

  const signOutUser = useCallback(async () => {
    await signOut(auth);
  }, []);

  // ---------------------------------------------------------------------------
  // Admin CMS CRUD Writes (Enforced server-side by firestore.rules)
  // ---------------------------------------------------------------------------
  const saveSettings = useCallback(async (next: SiteSettings) => {
    const path = 'site_settings/global';
    try {
      const payload = stripUndefined({
        brandName: next.brandName.trim().slice(0, 80),
        legalName: next.legalName.trim().slice(0, 120),
        domain: next.domain.trim().slice(0, 120),
        email: next.email.trim().slice(0, 160),
        phone: next.phone.trim().slice(0, 40),
        whatsappNumber: normalizeWhatsappDigits(next.whatsappNumber).slice(0, 20),
        whatsappDefaultMessage: next.whatsappDefaultMessage.trim().slice(0, 300),
        location: next.location.trim().slice(0, 100),
        regions: next.regions.trim().slice(0, 140),
        founded: next.founded.trim().slice(0, 20),
        availability: next.availability.trim().slice(0, 80),
        updatedAt: serverTimestamp(),
      });
      await setDoc(doc(db, 'site_settings', 'global'), payload);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  }, []);

  const saveProduct = useCallback(
    async (product: SamitechProduct, sortOrder = 0) => {
      const cleanId = sanitizeId(product.id || product.name);
      const path = `site_products/${cleanId}`;
      try {
        const payload = stripUndefined({
          ...product,
          id: cleanId,
          sku: product.sku.trim().slice(0, 40),
          name: product.name.trim().slice(0, 140),
          categoryLabel: product.categoryLabel.trim().slice(0, 80),
          priceAmount: product.priceAmount.trim().slice(0, 60),
          shortDesc: product.shortDesc.trim().slice(0, 400),
          longDescription: product.longDescription.trim().slice(0, 2400),
          imageAlt: (product.imageAlt || product.name).trim().slice(0, 240),
          promoBanner: {
            title: product.promoBanner.title.trim().slice(0, 140),
            subtitle: product.promoBanner.subtitle.trim().slice(0, 400),
            image: product.promoBanner.image,
          },
          sortOrder,
          updatedAt: serverTimestamp(),
        });
        await setDoc(doc(db, 'site_products', cleanId), payload);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    },
    []
  );

  const deleteProduct = useCallback(async (id: string) => {
    const path = `site_products/${id}`;
    try {
      await deleteDoc(doc(db, 'site_products', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }, []);

  const saveService = useCallback(
    async (service: ServiceDetail, sortOrder = 0) => {
      const cleanSlug = sanitizeId(service.slug || service.title);
      const path = `site_services/${cleanSlug}`;
      try {
        const payload = stripUndefined({
          ...service,
          slug: cleanSlug,
          number: service.number.trim().slice(0, 16),
          groupLabel: service.groupLabel.trim().slice(0, 80),
          title: service.title.trim().slice(0, 120),
          shortDesc: service.shortDesc.trim().slice(0, 400),
          tagline: service.tagline.trim().slice(0, 200),
          heroTitle: service.heroTitle.trim().slice(0, 140),
          heroAccent: service.heroAccent.trim().slice(0, 140),
          heroDescription: service.heroDescription.trim().slice(0, 1200),
          timelineLabel: service.timelineLabel.trim().slice(0, 80),
          engagementModel: service.engagementModel.trim().slice(0, 120),
          contactCategory: service.contactCategory.trim().slice(0, 80),
          imageAlt: (service.imageAlt || service.title).trim().slice(0, 240),
          accentColor: service.accentColor.trim().slice(0, 20),
          relatedCaseStudyId: (service.relatedCaseStudyId || 'campuspro').slice(0, 128),
          sortOrder,
          updatedAt: serverTimestamp(),
        });
        await setDoc(doc(db, 'site_services', cleanSlug), payload);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    },
    []
  );

  const deleteService = useCallback(async (slug: string) => {
    const path = `site_services/${slug}`;
    try {
      await deleteDoc(doc(db, 'site_services', slug));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }, []);

  const saveProject = useCallback(
    async (project: ShowcaseProject, sortOrder = 0) => {
      const cleanId = sanitizeId(project.id || project.title);
      const path = `site_projects/${cleanId}`;
      try {
        const payload = stripUndefined({
          ...project,
          id: cleanId,
          title: project.title.trim().slice(0, 140),
          sector: project.sector.trim().slice(0, 100),
          location: project.location.trim().slice(0, 100),
          year: project.year.trim().slice(0, 20),
          serviceCategory: project.serviceCategory.trim().slice(0, 100),
          summary: project.summary.trim().slice(0, 400),
          challenge: project.challenge.trim().slice(0, 1600),
          solution: project.solution.trim().slice(0, 1600),
          imageAlt: (project.imageAlt || project.title).trim().slice(0, 240),
          sortOrder,
          updatedAt: serverTimestamp(),
        });
        await setDoc(doc(db, 'site_projects', cleanId), payload);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    },
    []
  );

  const deleteProject = useCallback(async (id: string) => {
    const path = `site_projects/${id}`;
    try {
      await deleteDoc(doc(db, 'site_projects', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }, []);

  const saveTeamMember = useCallback(
    async (member: TeamMember, sortOrder = 0) => {
      const cleanId = sanitizeId(member.id || member.name);
      const path = `site_team/${cleanId}`;
      try {
        const payload = stripUndefined({
          ...member,
          id: cleanId,
          executiveTitle: member.executiveTitle.trim().slice(0, 40),
          name: member.name.trim().slice(0, 120),
          firstNamePart: member.firstNamePart.trim().slice(0, 100),
          accentNamePart: member.accentNamePart.trim().slice(0, 80),
          role: member.role.trim().slice(0, 120),
          heroTagline: member.heroTagline.trim().slice(0, 400),
          focusLabel: member.focusLabel.trim().slice(0, 120),
          location: member.location.trim().slice(0, 100),
          email: member.email.trim().slice(0, 160),
          phone: member.phone.trim().slice(0, 40),
          imageAlt: (member.imageAlt || member.name).trim().slice(0, 240),
          bio: member.bio.trim().slice(0, 1000),
          aboutMe: member.aboutMe.trim().slice(0, 2400),
          focusAreas: member.focusAreas.trim().slice(0, 800),
          contactTopic: member.contactTopic.trim().slice(0, 120),
          sortOrder,
          updatedAt: serverTimestamp(),
        });
        await setDoc(doc(db, 'site_team', cleanId), payload);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    },
    []
  );

  const deleteTeamMember = useCallback(async (id: string) => {
    const path = `site_team/${id}`;
    try {
      await deleteDoc(doc(db, 'site_team', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }, []);

  const saveCommunity = useCallback(
    async (community: SamitechCommunity, sortOrder = 0) => {
      const cleanId = sanitizeId(community.id || community.name);
      const path = `site_communities/${cleanId}`;
      try {
        const payload = stripUndefined({
          ...community,
          id: cleanId,
          number: community.number.trim().slice(0, 16),
          name: community.name.trim().slice(0, 120),
          subtitle: community.subtitle.trim().slice(0, 200),
          platformLabel: community.platformLabel.trim().slice(0, 60),
          domainOrHandle: community.domainOrHandle.trim().slice(0, 120),
          url: community.url.trim().slice(0, 400),
          ctaLabel: community.ctaLabel.trim().slice(0, 80),
          description: community.description.trim().slice(0, 1200),
          accentColor: community.accentColor.trim().slice(0, 20),
          imageAlt: (community.imageAlt || community.name).trim().slice(0, 240),
          sortOrder,
          updatedAt: serverTimestamp(),
        });
        await setDoc(doc(db, 'site_communities', cleanId), payload);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    },
    []
  );

  const deleteCommunity = useCallback(async (id: string) => {
    const path = `site_communities/${id}`;
    try {
      await deleteDoc(doc(db, 'site_communities', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }, []);

  const saveCareer = useCallback(
    async (career: CareerOpening, sortOrder = 0) => {
      const cleanId = sanitizeId(career.id || career.title);
      const path = `site_careers/${cleanId}`;
      try {
        const payload = stripUndefined({
          id: cleanId,
          title: career.title.trim().slice(0, 140),
          location: career.location.trim().slice(0, 100),
          department: career.department.trim().slice(0, 100),
          type: career.type.trim().slice(0, 80),
          summary: career.summary.trim().slice(0, 1200),
          requirements: career.requirements.slice(0, 16),
          isOpen: career.isOpen !== false,
          sortOrder,
          updatedAt: serverTimestamp(),
        });
        await setDoc(doc(db, 'site_careers', cleanId), payload);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    },
    []
  );

  const deleteCareer = useCallback(async (id: string) => {
    const path = `site_careers/${id}`;
    try {
      await deleteDoc(doc(db, 'site_careers', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }, []);

  const saveFaq = useCallback(
    async (faq: FaqItem, sortOrder = 0) => {
      const cleanId = sanitizeId(faq.id || `faq-${Date.now()}`);
      const path = `site_faqs/${cleanId}`;
      try {
        const payload = stripUndefined({
          id: cleanId,
          question: faq.question.trim().slice(0, 280),
          answer: faq.answer.trim().slice(0, 1800),
          sortOrder,
          updatedAt: serverTimestamp(),
        });
        await setDoc(doc(db, 'site_faqs', cleanId), payload);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    },
    []
  );

  const deleteFaq = useCallback(async (id: string) => {
    const path = `site_faqs/${id}`;
    try {
      await deleteDoc(doc(db, 'site_faqs', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }, []);

  const addAdminUser = useCallback(
    async (email: string, displayName: string, role: 'super_admin' | 'editor') => {
      const lower = email.trim().toLowerCase();
      const path = `admin_users/${lower}`;
      try {
        await setDoc(doc(db, 'admin_users', lower), {
          email: lower,
          displayName: (displayName.trim() || lower.split('@')[0]).slice(0, 120),
          role,
          active: true,
          addedByEmail: userEmailLower || SUPER_ADMIN_EMAIL,
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    },
    [userEmailLower]
  );

  const toggleAdminUserActive = useCallback(
    async (record: AdminUserRecord) => {
      const lower = record.email.toLowerCase();
      const path = `admin_users/${lower}`;
      try {
        await setDoc(doc(db, 'admin_users', lower), {
          email: lower,
          displayName: record.displayName,
          role: record.role,
          active: !record.active,
          addedByEmail: record.addedByEmail,
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, path);
      }
    },
    []
  );

  const removeAdminUser = useCallback(async (email: string) => {
    const lower = email.toLowerCase();
    const path = `admin_users/${lower}`;
    try {
      await deleteDoc(doc(db, 'admin_users', lower));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }, []);

  const syncAllToCloud = useCallback(
    async (overwrite = false): Promise<CloudSyncResult> => {
      setCloudSyncing(true);
      let currentOp = OperationType.WRITE;
      let currentPath = 'site_settings/global';
      try {
        let written = 0;

        const existingMap = async (colName: string) => {
          if (overwrite) return new Set<string>();
          currentOp = OperationType.LIST;
          currentPath = colName;
          const snap = await getDocs(collection(db, colName));
          return new Set(snap.docs.map((d) => d.id));
        };

        const writeDocTracked = async (
          colName: string,
          docId: string,
          payload: Record<string, unknown>
        ) => {
          currentOp = OperationType.WRITE;
          currentPath = `${colName}/${docId}`;
          await setDoc(doc(db, colName, docId), stripUndefined(payload));
        };

        if (overwrite || !cloudSettings) {
          const baseSettings = cloudSettings ?? DEFAULT_SITE_SETTINGS;
          await writeDocTracked('site_settings', 'global', {
            brandName: baseSettings.brandName.trim().slice(0, 80),
            legalName: baseSettings.legalName.trim().slice(0, 120),
            domain: baseSettings.domain.trim().slice(0, 120),
            email: baseSettings.email.trim().slice(0, 160),
            phone: baseSettings.phone.trim().slice(0, 40),
            whatsappNumber: normalizeWhatsappDigits(baseSettings.whatsappNumber).slice(0, 20),
            whatsappDefaultMessage: baseSettings.whatsappDefaultMessage.trim().slice(0, 300),
            location: baseSettings.location.trim().slice(0, 100),
            regions: baseSettings.regions.trim().slice(0, 140),
            founded: baseSettings.founded.trim().slice(0, 20),
            availability: baseSettings.availability.trim().slice(0, 80),
            updatedAt: serverTimestamp(),
          });
          written++;
        }

        const [
          prodIds,
          servIds,
          projIds,
          teamIds,
          commIds,
          careerIds,
          faqIds,
        ] = await Promise.all([
          existingMap('site_products'),
          existingMap('site_services'),
          existingMap('site_projects'),
          existingMap('site_team'),
          existingMap('site_communities'),
          existingMap('site_careers'),
          existingMap('site_faqs'),
        ]);

        const effectiveProducts = cloudProducts.length > 0 ? cloudProducts : ALL_PRODUCTS;
        const effectiveServices = cloudServices.length > 0 ? cloudServices : ALL_SERVICES_CATALOG;
        const effectiveProjects = cloudProjects.length > 0 ? cloudProjects : PORTFOLIO_PROJECTS;
        const effectiveTeam = cloudTeam.length > 0 ? cloudTeam : TEAM_MEMBERS;
        const effectiveCommunities =
          cloudCommunities.length > 0 ? cloudCommunities : SAMITECH_COMMUNITIES;
        const effectiveCareers =
          cloudSettings !== null || cloudCareers.length > 0 ? cloudCareers : CAREER_OPENINGS;
        const effectiveFaqs =
          cloudSettings !== null || cloudFaqs.length > 0 ? cloudFaqs : FAQ_ITEMS;

        for (let idx = 0; idx < effectiveProducts.length; idx++) {
          const p = effectiveProducts[idx];
          const cleanId = sanitizeId(p.id || p.name);
          if (!prodIds.has(cleanId)) {
            await writeDocTracked('site_products', cleanId, {
              ...p,
              id: cleanId,
              sku: p.sku.trim().slice(0, 40),
              name: p.name.trim().slice(0, 140),
              categoryLabel: p.categoryLabel.trim().slice(0, 80),
              priceAmount: p.priceAmount.trim().slice(0, 60),
              shortDesc: p.shortDesc.trim().slice(0, 400),
              longDescription: p.longDescription.trim().slice(0, 2400),
              imageAlt: (p.imageAlt || p.name).trim().slice(0, 240),
              promoBanner: {
                title: p.promoBanner.title.trim().slice(0, 140),
                subtitle: p.promoBanner.subtitle.trim().slice(0, 400),
                image: p.promoBanner.image,
              },
              sortOrder: idx,
              updatedAt: serverTimestamp(),
            });
            written++;
          }
        }

        for (let idx = 0; idx < effectiveServices.length; idx++) {
          const s = effectiveServices[idx];
          const cleanSlug = sanitizeId(s.slug || s.title);
          if (!servIds.has(cleanSlug)) {
            await writeDocTracked('site_services', cleanSlug, {
              ...s,
              slug: cleanSlug,
              number: s.number.trim().slice(0, 16),
              groupLabel: s.groupLabel.trim().slice(0, 80),
              title: s.title.trim().slice(0, 120),
              shortDesc: s.shortDesc.trim().slice(0, 400),
              tagline: s.tagline.trim().slice(0, 200),
              heroTitle: s.heroTitle.trim().slice(0, 140),
              heroAccent: s.heroAccent.trim().slice(0, 140),
              heroDescription: s.heroDescription.trim().slice(0, 1200),
              timelineLabel: s.timelineLabel.trim().slice(0, 80),
              engagementModel: s.engagementModel.trim().slice(0, 120),
              contactCategory: s.contactCategory.trim().slice(0, 80),
              imageAlt: (s.imageAlt || s.title).trim().slice(0, 240),
              accentColor: s.accentColor.trim().slice(0, 20),
              relatedCaseStudyId: (s.relatedCaseStudyId || 'campuspro').slice(0, 128),
              sortOrder: idx,
              updatedAt: serverTimestamp(),
            });
            written++;
          }
        }

        for (let idx = 0; idx < effectiveProjects.length; idx++) {
          const proj = effectiveProjects[idx];
          const cleanId = sanitizeId(proj.id || proj.title);
          if (!projIds.has(cleanId)) {
            await writeDocTracked('site_projects', cleanId, {
              ...proj,
              id: cleanId,
              title: proj.title.trim().slice(0, 140),
              sector: proj.sector.trim().slice(0, 100),
              location: proj.location.trim().slice(0, 100),
              year: proj.year.trim().slice(0, 20),
              serviceCategory: proj.serviceCategory.trim().slice(0, 100),
              summary: proj.summary.trim().slice(0, 400),
              challenge: proj.challenge.trim().slice(0, 1600),
              solution: proj.solution.trim().slice(0, 1600),
              imageAlt: (proj.imageAlt || proj.title).trim().slice(0, 240),
              sortOrder: idx,
              updatedAt: serverTimestamp(),
            });
            written++;
          }
        }

        for (let idx = 0; idx < effectiveTeam.length; idx++) {
          const member = effectiveTeam[idx];
          const cleanId = sanitizeId(member.id || member.name);
          if (!teamIds.has(cleanId)) {
            await writeDocTracked('site_team', cleanId, {
              ...member,
              id: cleanId,
              executiveTitle: member.executiveTitle.trim().slice(0, 40),
              name: member.name.trim().slice(0, 120),
              firstNamePart: member.firstNamePart.trim().slice(0, 100),
              accentNamePart: member.accentNamePart.trim().slice(0, 80),
              role: member.role.trim().slice(0, 120),
              heroTagline: member.heroTagline.trim().slice(0, 400),
              focusLabel: member.focusLabel.trim().slice(0, 120),
              location: member.location.trim().slice(0, 100),
              email: member.email.trim().slice(0, 160),
              phone: member.phone.trim().slice(0, 40),
              imageAlt: (member.imageAlt || member.name).trim().slice(0, 240),
              bio: member.bio.trim().slice(0, 1000),
              aboutMe: member.aboutMe.trim().slice(0, 2400),
              focusAreas: member.focusAreas.trim().slice(0, 800),
              contactTopic: member.contactTopic.trim().slice(0, 120),
              sortOrder: idx,
              updatedAt: serverTimestamp(),
            });
            written++;
          }
        }

        for (let idx = 0; idx < effectiveCommunities.length; idx++) {
          const comm = effectiveCommunities[idx];
          const cleanId = sanitizeId(comm.id || comm.name);
          if (!commIds.has(cleanId)) {
            await writeDocTracked('site_communities', cleanId, {
              ...comm,
              id: cleanId,
              number: comm.number.trim().slice(0, 16),
              name: comm.name.trim().slice(0, 120),
              subtitle: comm.subtitle.trim().slice(0, 200),
              platformLabel: comm.platformLabel.trim().slice(0, 60),
              domainOrHandle: comm.domainOrHandle.trim().slice(0, 120),
              url: comm.url.trim().slice(0, 400),
              ctaLabel: comm.ctaLabel.trim().slice(0, 80),
              description: comm.description.trim().slice(0, 1200),
              accentColor: comm.accentColor.trim().slice(0, 20),
              imageAlt: (comm.imageAlt || comm.name).trim().slice(0, 240),
              sortOrder: idx,
              updatedAt: serverTimestamp(),
            });
            written++;
          }
        }

        for (let idx = 0; idx < effectiveCareers.length; idx++) {
          const job = effectiveCareers[idx];
          const cleanId = sanitizeId(job.id || job.title);
          if (!careerIds.has(cleanId)) {
            await writeDocTracked('site_careers', cleanId, {
              id: cleanId,
              title: job.title.trim().slice(0, 140),
              location: job.location.trim().slice(0, 100),
              department: job.department.trim().slice(0, 100),
              type: job.type.trim().slice(0, 80),
              summary: job.summary.trim().slice(0, 1200),
              requirements: job.requirements.slice(0, 16),
              isOpen: job.isOpen !== false,
              sortOrder: idx,
              updatedAt: serverTimestamp(),
            });
            written++;
          }
        }

        for (let idx = 0; idx < effectiveFaqs.length; idx++) {
          const faq = effectiveFaqs[idx];
          const cleanId = sanitizeId(faq.id || `faq-${idx + 1}`);
          if (!faqIds.has(cleanId)) {
            await writeDocTracked('site_faqs', cleanId, {
              id: cleanId,
              question: faq.question.trim().slice(0, 280),
              answer: faq.answer.trim().slice(0, 1800),
              sortOrder: idx,
              updatedAt: serverTimestamp(),
            });
            written++;
          }
        }

        if (isSuperAdmin) {
          const safeAdminName = (authUser?.displayName?.trim() || 'Primary Admin').slice(0, 120);
          await writeDocTracked('admin_users', SUPER_ADMIN_EMAIL, {
            email: SUPER_ADMIN_EMAIL,
            displayName: safeAdminName,
            role: 'super_admin',
            active: true,
            addedByEmail: SUPER_ADMIN_EMAIL,
            updatedAt: serverTimestamp(),
          });
        }

        const totalRecords =
          1 +
          effectiveProducts.length +
          effectiveServices.length +
          effectiveProjects.length +
          effectiveTeam.length +
          effectiveCommunities.length +
          effectiveCareers.length +
          effectiveFaqs.length;

        const assetsManifest = SAMITECH_MEDIA_LIBRARY.slice(0, 60).map((asset) => ({
          id: asset.id.slice(0, 80),
          label: asset.label.slice(0, 120),
          category: asset.category.slice(0, 60),
          src: asset.src.slice(0, 260),
        }));

        const fullSnapshotPayload = {
          projectName: 'SAMITECH Corporation Website & Control Panel',
          exportedAt: new Date().toISOString(),
          firebase: firebaseProjectMeta,
          settings: cloudSettings ?? DEFAULT_SITE_SETTINGS,
          collections: {
            products: effectiveProducts,
            services: effectiveServices,
            projects: effectiveProjects,
            team: effectiveTeam,
            communities: effectiveCommunities,
            careers: effectiveCareers,
            faqs: effectiveFaqs,
          },
          assets: assetsManifest,
        };

        const storageUrl = await uploadJsonSnapshotToStorage(
          'backups/samitech-project-data.json',
          fullSnapshotPayload
        );

        const manifestDoc = stripUndefined({
          id: 'project-manifest',
          projectName: 'SAMITECH Corporation',
          databaseId: firebaseProjectMeta.databaseId.slice(0, 140),
          storageBucket: firebaseProjectMeta.storageBucket.slice(0, 160),
          storageSynced: Boolean(storageUrl),
          storageUrl: storageUrl ? storageUrl.slice(0, 490) : undefined,
          syncedByEmail: (userEmailLower || SUPER_ADMIN_EMAIL).slice(0, 180),
          recordCount: totalRecords,
          assetCount: assetsManifest.length,
          collections: {
            settings: 1,
            products: effectiveProducts.length,
            services: effectiveServices.length,
            projects: effectiveProjects.length,
            team: effectiveTeam.length,
            communities: effectiveCommunities.length,
            careers: effectiveCareers.length,
            faqs: effectiveFaqs.length,
          },
          assets: assetsManifest,
          updatedAt: serverTimestamp(),
        });

        currentOp = OperationType.WRITE;
        currentPath = 'site_backups/project-manifest';
        await setDoc(doc(db, 'site_backups', 'project-manifest'), manifestDoc);
        setLastSyncTime(new Date());

        return {
          written,
          totalRecords,
          assetCount: assetsManifest.length,
          storageSynced: Boolean(storageUrl),
          storageUrl: storageUrl ?? undefined,
        };
      } catch (error) {
        handleFirestoreError(error, currentOp, currentPath);
      } finally {
        setCloudSyncing(false);
      }
    },
    [
      cloudSettings,
      cloudProducts,
      cloudServices,
      cloudProjects,
      cloudTeam,
      cloudCommunities,
      cloudCareers,
      cloudFaqs,
      isSuperAdmin,
      authUser?.displayName,
      userEmailLower,
    ]
  );

  const seedDefaultsToFirestore = useCallback(
    async (overwrite = false): Promise<number> => {
      const result = await syncAllToCloud(overwrite);
      return result.written;
    },
    [syncAllToCloud]
  );

  // Automatic initial cloud push when verified admin connects and collections aren't yet synced
  useEffect(() => {
    if (
      !authReady ||
      !isAdmin ||
      !publicCloudLoaded ||
      autoSyncedRef.current
    ) {
      return;
    }
    if (!cloudSettings || cloudProducts.length === 0) {
      autoSyncedRef.current = true;
      void syncAllToCloud(false).catch((err) =>
        console.warn('Initial automatic cloud push skipped:', err)
      );
    }
  }, [authReady, isAdmin, publicCloudLoaded, cloudSettings, cloudProducts.length, syncAllToCloud]);

  const cloudSynced = Boolean(cloudSettings);
  const cloudCounts = useMemo(
    () => ({
      settings: Boolean(cloudSettings),
      products: cloudProducts.length,
      services: cloudServices.length,
      projects: cloudProjects.length,
      team: cloudTeam.length,
      communities: cloudCommunities.length,
      careers: cloudCareers.length,
      faqs: cloudFaqs.length,
    }),
    [
      cloudSettings,
      cloudProducts.length,
      cloudServices.length,
      cloudProjects.length,
      cloudTeam.length,
      cloudCommunities.length,
      cloudCareers.length,
      cloudFaqs.length,
    ]
  );

  const value: SiteContentContextValue = {
    settings,
    products,
    featuredProduct,
    catalogProducts,
    services,
    homeServices,
    projects,
    homeCaseStudies,
    teamMembers,
    communities,
    careers,
    faqs,
    cloudSynced,
    cloudCounts,
    getProductById,
    getServiceBySlug,
    getTeamMemberBySlug,
    buildWhatsAppUrl,
    buildProductWhatsAppUrl,
    authUser,
    authReady,
    isAdmin,
    isSuperAdmin,
    adminCheckLoading,
    adminUsers,
    signInWithGoogle,
    signOutUser,
    saveSettings,
    saveProduct,
    deleteProduct,
    saveService,
    deleteService,
    saveProject,
    deleteProject,
    saveTeamMember,
    deleteTeamMember,
    saveCommunity,
    deleteCommunity,
    saveCareer,
    deleteCareer,
    saveFaq,
    deleteFaq,
    addAdminUser,
    toggleAdminUserActive,
    removeAdminUser,
    seedDefaultsToFirestore,
    syncAllToCloud,
    backupManifest,
    lastSyncTime,
    cloudSyncing,
  };

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent(): SiteContentContextValue {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error('useSiteContent must be used within SiteContentProvider');
  }
  return ctx;
}
