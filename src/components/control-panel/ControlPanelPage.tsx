import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Box,
  Briefcase,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CloudUpload,
  Contact2,
  Copy,
  ExternalLink,
  Eye,
  Filter,
  HelpCircle,
  Home,
  Loader2,
  LogOut,
  Menu,
  MessageSquareMore,
  MoreVertical,
  Pencil,
  Plus,
  RefreshCw,
  Rocket,
  Search,
  ShieldCheck,
  ShieldPlus,
  Trash2,
  UserPlus,
  Users,
  X,
  Zap,
} from 'lucide-react';
import type { CareerOpening } from '../../data/careersData';
import type { SamitechCommunity } from '../../data/communitiesData';
import type { ShowcaseProject } from '../../data/projectsData';
import type { SamitechProduct } from '../../data/productsData';
import type { FaqItem } from '../../data/samitechData';
import type { ServiceDetail } from '../../data/servicesCatalog';
import type { TeamMember } from '../../data/teamData';
import {
  normalizeWhatsappDigits,
  SUPER_ADMIN_EMAIL,
  useSiteContent,
  type AdminUserRecord,
  type SiteSettings,
} from '../../context/SiteContentContext';
import { SAMITECH_MEDIA_LIBRARY } from '../../lib/mediaAssets';
import { ResilientImage } from '../ResilientImage';
import { WhatsAppBrandIcon } from '../WhatsAppFloatingButton';
import {
  CareerEditorDrawer,
  CommunityEditorDrawer,
  createBlankCareer,
  createBlankCommunity,
  createBlankFaq,
  createBlankProject,
  createBlankService,
  createBlankTeamMember,
  FaqEditorDrawer,
  ProjectEditorDrawer,
  ServiceEditorDrawer,
  TeamMemberEditorDrawer,
} from './ContentEditors';
import { createBlankProduct, ProductEditorDrawer } from './ProductEditorDrawer';
import {
  CustomSolutionBannerVisual,
  DottedWorldMapBackdrop,
  Kpi3DCubeIcon,
  Kpi3DFolderIcon,
  Kpi3DGearIcon,
  Kpi3DTeamIcon,
  QuickActionIcon,
  SidebarCosmicStarGraphic,
  SidebarPulseWave,
  WebsiteOverviewChartCard,
  type QuickActionKind,
} from './ControlPanelVisuals';

type ControlTab =
  | 'overview'
  | 'products'
  | 'services'
  | 'projects'
  | 'team'
  | 'communities'
  | 'careers'
  | 'faqs'
  | 'settings'
  | 'admins';

type ProductFilterMode =
  | 'all'
  | 'In Stock'
  | 'Pre-Order'
  | 'Request Quote'
  | 'featured';

interface DeletePromptState {
  entityLabel: string;
  itemName: string;
  onConfirm: () => Promise<void>;
}

const PRIMARY_NAV_ITEMS: {
  id: ControlTab;
  label: string;
  icon: typeof Home;
}[] = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'products', label: 'Products', icon: Box },
  { id: 'services', label: 'Services', icon: Rocket },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'team', label: 'Team', icon: Contact2 },
  { id: 'communities', label: 'Communities', icon: Users },
  { id: 'careers', label: 'Careers', icon: BriefcaseBusiness },
  { id: 'faqs', label: 'FAQs', icon: HelpCircle },
  { id: 'settings', label: 'Contact & WhatsApp', icon: MessageSquareMore },
];

const SECONDARY_NAV_ITEMS: {
  id: ControlTab;
  label: string;
  icon: typeof ShieldPlus;
}[] = [{ id: 'admins', label: 'Admin Access', icon: ShieldPlus }];

function getShortCategoryBadge(categoryLabel: string): string {
  const lower = categoryLabel.toLowerCase();
  if (lower.includes('security') || lower.includes('cctv')) return 'Security';
  if (lower.includes('computer') || lower.includes('workstation')) return 'Computers';
  if (lower.includes('network') || lower.includes('starlink') || lower.includes('hardware')) {
    return 'Hardware';
  }
  return categoryLabel.split(' ')[0] || 'Hardware';
}

export function ControlPanelPage({
  onExitToSite,
}: {
  onExitToSite: () => void;
}) {
  const {
    settings,
    products,
    services,
    projects,
    teamMembers,
    communities,
    careers,
    faqs,
    cloudSynced,
    cloudCounts,
    buildWhatsAppUrl,
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
    syncAllToCloud,
    backupManifest,
    lastSyncTime,
    cloudSyncing,
  } = useSiteContent();

  const shouldReduceMotion = useReducedMotion();

  const [activeTab, setActiveTab] = useState<ControlTab>('overview');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [productFilter, setProductFilter] = useState<ProductFilterMode>('all');
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [openRowMenuId, setOpenRowMenuId] = useState<string | null>(null);
  const [togglingProductId, setTogglingProductId] = useState<string | null>(null);
  const [previewProduct, setPreviewProduct] = useState<SamitechProduct | null>(null);

  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ kind: 'success' | 'error'; text: string } | null>(null);
  const [deletePrompt, setDeletePrompt] = useState<DeletePromptState | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Active slide-over editors (mounted at root so Quick Actions on Overview open any editor)
  const [editingProduct, setEditingProduct] = useState<{
    item: SamitechProduct;
    isNew: boolean;
  } | null>(null);
  const [editingService, setEditingService] = useState<{
    item: ServiceDetail;
    isNew: boolean;
  } | null>(null);
  const [editingProject, setEditingProject] = useState<{
    item: ShowcaseProject;
    isNew: boolean;
  } | null>(null);
  const [editingTeamMember, setEditingTeamMember] = useState<{
    item: TeamMember;
    isNew: boolean;
  } | null>(null);
  const [editingCommunity, setEditingCommunity] = useState<{
    item: SamitechCommunity;
    isNew: boolean;
  } | null>(null);
  const [editingCareer, setEditingCareer] = useState<{
    item: CareerOpening;
    isNew: boolean;
  } | null>(null);
  const [editingFaq, setEditingFaq] = useState<{
    item: FaqItem;
    isNew: boolean;
  } | null>(null);

  // Settings local draft
  const [settingsDraft, setSettingsDraft] = useState<SiteSettings>(settings);
  const [savingSettings, setSavingSettings] = useState(false);

  // Admin invite draft
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<'editor' | 'super_admin'>('editor');
  const [addingAdmin, setAddingAdmin] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  // Close popovers on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
      if (filterMenuRef.current && !filterMenuRef.current.contains(e.target as Node)) {
        setFilterDropdownOpen(false);
      }
      setOpenRowMenuId(null);
    };
    window.addEventListener('click', handleOutside);
    return () => window.removeEventListener('click', handleOutside);
  }, []);

  const showToast = (kind: 'success' | 'error', text: string) => {
    setToast({ kind, text });
    window.setTimeout(() => {
      setToast((prev) => (prev?.text === text ? null : prev));
    }, 5200);
  };

  const handleSelectTab = (tab: ControlTab) => {
    setActiveTab(tab);
    setSearchQuery('');
    setProductFilter('all');
    setMobileNavOpen(false);
    setProfileMenuOpen(false);
    if (tab === 'settings') {
      setSettingsDraft(settings);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    setAuthBusy(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setAuthError(
        err instanceof Error
          ? err.message
          : 'Google sign-in popup was cancelled or blocked.'
      );
    } finally {
      setAuthBusy(false);
    }
  };

  const handleFullCloudSync = async (overwrite = false) => {
    try {
      const result = await syncAllToCloud(overwrite);
      showToast(
        'success',
        `Cloud sync complete: ${result.totalRecords} site records & ${result.assetCount} asset references saved${
          result.storageSynced ? ' + Storage JSON snapshot uploaded' : ''
        }.`
      );
    } catch (err) {
      showToast('error', err instanceof Error ? err.message : 'Cloud sync failed.');
    }
  };

  const handleToggleProductStock = async (product: SamitechProduct, idx: number) => {
    setTogglingProductId(product.id);
    const nextAvailability =
      product.availability === 'In Stock' ? 'Request Quote' : 'In Stock';
    try {
      await saveProduct(
        {
          ...product,
          availability: nextAvailability,
        },
        idx
      );
      showToast(
        'success',
        `"${product.name}" status switched to ${nextAvailability}.`
      );
    } catch (err) {
      showToast('error', err instanceof Error ? err.message : 'Status update failed.');
    } finally {
      setTogglingProductId(null);
    }
  };

  const handleDuplicateProduct = async (product: SamitechProduct) => {
    const stamp = Date.now().toString().slice(-4);
    const copy: SamitechProduct = {
      ...product,
      id: `${product.id}-copy-${stamp}`,
      sku: `${product.sku}-${stamp}`,
      name: `${product.name} (Copy)`,
      featured: false,
    };
    setEditingProduct({ item: copy, isNew: true });
  };

  const handleCreateForTab = (tabOverride?: ControlTab) => {
    const target = tabOverride ?? activeTab;
    if (target === 'products') {
      setEditingProduct({ item: createBlankProduct(), isNew: true });
    } else if (target === 'services') {
      setEditingService({ item: createBlankService(services.length), isNew: true });
    } else if (target === 'projects') {
      setEditingProject({ item: createBlankProject(), isNew: true });
    } else if (target === 'team') {
      setEditingTeamMember({ item: createBlankTeamMember(), isNew: true });
    } else if (target === 'communities') {
      setEditingCommunity({
        item: createBlankCommunity(communities.length),
        isNew: true,
      });
    } else if (target === 'careers') {
      setEditingCareer({ item: createBlankCareer(), isNew: true });
    } else if (target === 'faqs') {
      setEditingFaq({ item: createBlankFaq(), isNew: true });
    }
  };

  const confirmDelete = async () => {
    if (!deletePrompt) return;
    setDeleting(true);
    try {
      await deletePrompt.onConfirm();
      showToast('success', `${deletePrompt.entityLabel} "${deletePrompt.itemName}" removed.`);
      setDeletePrompt(null);
    } catch (err) {
      showToast('error', err instanceof Error ? err.message : 'Unable to delete item.');
    } finally {
      setDeleting(false);
    }
  };

  const queryLower = searchQuery.trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery =
        !queryLower ||
        p.name.toLowerCase().includes(queryLower) ||
        p.sku.toLowerCase().includes(queryLower) ||
        p.categoryLabel.toLowerCase().includes(queryLower) ||
        p.shortDesc.toLowerCase().includes(queryLower);

      const matchesFilter =
        productFilter === 'all'
          ? true
          : productFilter === 'featured'
            ? Boolean(p.featured)
            : p.availability === productFilter;

      return matchesQuery && matchesFilter;
    });
  }, [products, queryLower, productFilter]);

  const filteredServices = useMemo(
    () =>
      services.filter(
        (s) =>
          s.title.toLowerCase().includes(queryLower) ||
          s.groupLabel.toLowerCase().includes(queryLower)
      ),
    [services, queryLower]
  );

  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (p) =>
          p.title.toLowerCase().includes(queryLower) ||
          p.sector.toLowerCase().includes(queryLower)
      ),
    [projects, queryLower]
  );

  const filteredTeam = useMemo(
    () =>
      teamMembers.filter(
        (m) =>
          m.name.toLowerCase().includes(queryLower) ||
          m.role.toLowerCase().includes(queryLower) ||
          m.executiveTitle.toLowerCase().includes(queryLower)
      ),
    [teamMembers, queryLower]
  );

  const filteredCommunities = useMemo(
    () =>
      communities.filter(
        (c) =>
          c.name.toLowerCase().includes(queryLower) ||
          c.platformLabel.toLowerCase().includes(queryLower)
      ),
    [communities, queryLower]
  );

  const filteredCareers = useMemo(
    () =>
      careers.filter(
        (c) =>
          c.title.toLowerCase().includes(queryLower) ||
          c.department.toLowerCase().includes(queryLower)
      ),
    [careers, queryLower]
  );

  const filteredFaqs = useMemo(
    () =>
      faqs.filter(
        (f) =>
          f.question.toLowerCase().includes(queryLower) ||
          f.answer.toLowerCase().includes(queryLower)
      ),
    [faqs, queryLower]
  );

  // ---------------------------------------------------------------------------
  // 1. Auth Loading Gate
  // ---------------------------------------------------------------------------
  if (!authReady || (authUser && adminCheckLoading)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#040B29] via-[#07184A] to-[#0B2D82] flex items-center justify-center p-6">
        <div className="w-full max-w-sm rounded-3xl bg-white/95 backdrop-blur-xl border border-white/60 p-8 text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-[#EEF3FF] text-[#0044FF] flex items-center justify-center mx-auto">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
          <div className="space-y-1">
            <h1 className="text-base font-bold text-[#07133B]">
              Verifying Control Panel Access
            </h1>
            <p className="text-xs text-slate-500">
              Checking Google credentials and Firebase permissions...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 2. Unauthenticated Google Sign-In Gate
  // ---------------------------------------------------------------------------
  if (!authUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#040B29] via-[#07184A] to-[#0B2D82] flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#0055FF]/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#38BDF8]/15 blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-md rounded-3xl bg-white/95 backdrop-blur-xl border border-white shadow-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between gap-3 pb-5 border-b border-slate-100">
            <img
              src="/assets/aistudio/Samitech_Corporation_Logo_7401e1c3.png"
              alt="SAMITECH Corporation"
              className="h-9 w-auto object-contain"
            />
            <span className="px-3 py-1 rounded-full bg-[#EEF3FF] border border-[#C7D7F9] text-[11px] font-bold text-[#0044FF]">
              Control Panel
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-extrabold tracking-tight text-[#07133B]">
              Authorized Team Sign-In
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Sign in with an approved SAMITECH Google account to publish products,
              services, projects, team profiles, careers, and WhatsApp details live.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-[#DC2626] flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={authBusy}
            className="w-full h-11 rounded-xl bg-gradient-to-r from-[#0044FF] to-[#0077FF] hover:from-[#0035D1] hover:to-[#0062D6] text-white text-sm font-semibold inline-flex items-center justify-center gap-2.5 shadow-[0_10px_24px_rgba(0,68,255,0.3)] transition-all cursor-pointer disabled:opacity-60"
          >
            {authBusy ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-blue-100" />
            )}
            <span>{authBusy ? 'Opening Google Sign-In...' : 'Continue with Google'}</span>
          </button>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Hidden Management Route</span>
            <button
              type="button"
              onClick={onExitToSite}
              className="inline-flex items-center gap-1 font-semibold text-[#0044FF] hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 3. Unauthorized Google Account Gate
  // ---------------------------------------------------------------------------
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#040B29] via-[#07184A] to-[#0B2D82] flex flex-col justify-center items-center p-4 sm:p-6">
        <div className="w-full max-w-md rounded-3xl bg-white/95 backdrop-blur-xl border border-red-200 shadow-2xl p-6 sm:p-8 space-y-5">
          <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-200 text-[#DC2626] flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-extrabold text-[#07133B]">Access Restricted</h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              The account{' '}
              <span className="font-mono font-semibold text-[#07133B]">
                {authUser.email}
              </span>{' '}
              is not currently on the SAMITECH Control Panel allowlist.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => void signOutUser()}
              className="flex-1 h-10 rounded-xl bg-[#07133B] hover:bg-[#0D1E59] text-white text-xs font-semibold inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Switch Google Account</span>
            </button>
            <button
              type="button"
              onClick={onExitToSite}
              className="flex-1 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Public Site</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 4. Main Admin Workspace
  // ---------------------------------------------------------------------------
  const allNavItems = [...PRIMARY_NAV_ITEMS, ...SECONDARY_NAV_ITEMS];
  const activeNavObj = allNavItems.find((n) => n.id === activeTab) ?? PRIMARY_NAV_ITEMS[0];
  const supportsCreateButton =
    activeTab !== 'overview' && activeTab !== 'settings' && activeTab !== 'admins';

  const totalCloudRecords =
    (cloudCounts.settings ? 1 : 0) +
    cloudCounts.products +
    cloudCounts.services +
    cloudCounts.projects +
    cloudCounts.team +
    cloudCounts.communities +
    cloudCounts.careers +
    cloudCounts.faqs;

  const formattedSyncTime = (lastSyncTime ?? new Date()).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

  const userInitial = (
    authUser.displayName?.[0] ||
    authUser.email?.[0] ||
    'A'
  ).toUpperCase();

  const quickActionsList: {
    kind: QuickActionKind;
    label: string;
    bgClass: string;
    onClick: () => void;
  }[] = [
    {
      kind: 'product',
      label: 'Add Product →',
      bgClass: 'bg-[#EFF5FF] hover:bg-[#E1ECFF] border-[#DCE8FF]',
      onClick: () => handleCreateForTab('products'),
    },
    {
      kind: 'service',
      label: 'Add Service →',
      bgClass: 'bg-[#F3EEFF] hover:bg-[#EAE0FF] border-[#E5DBFF]',
      onClick: () => handleCreateForTab('services'),
    },
    {
      kind: 'project',
      label: 'Add Project →',
      bgClass: 'bg-[#ECFDF5] hover:bg-[#DCFCE7] border-[#D1FAE5]',
      onClick: () => handleCreateForTab('projects'),
    },
    {
      kind: 'team',
      label: 'Add Team Member →',
      bgClass: 'bg-[#EFF6FF] hover:bg-[#E0ECFF] border-[#DBEAFE]',
      onClick: () => handleCreateForTab('team'),
    },
    {
      kind: 'community',
      label: 'Add Community →',
      bgClass: 'bg-[#FFF7ED] hover:bg-[#FFEDD5] border-[#FED7AA]',
      onClick: () => handleCreateForTab('communities'),
    },
    {
      kind: 'career',
      label: 'Post Career',
      bgClass: 'bg-[#EEF2FF] hover:bg-[#E0E7FF] border-[#C7D2FE]',
      onClick: () => handleCreateForTab('careers'),
    },
  ];

  // Shared Products Table renderer (shown inside Overview & Products tab)
  const renderProductsTableCard = (showAllRows: boolean) => {
    const displayRows = showAllRows
      ? filteredProducts
      : filteredProducts.slice(0, 6);

    return (
      <div className="rounded-2xl bg-white/88 backdrop-blur-md border border-white shadow-[0_10px_28px_rgba(7,19,59,0.06)] overflow-hidden">
        {/* Header Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#EFF5FF] text-[#0044FF] flex items-center justify-center">
              <Box className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-[#07133B] leading-tight">
                Products Management
              </h2>
              <p className="text-[11px] text-slate-500">
                {filteredProducts.length} of {products.length} hardware &amp; kit listings
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full h-9 pl-9 pr-3 rounded-full bg-slate-50/90 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0044FF] focus:bg-white transition-colors"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative" ref={filterMenuRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFilterDropdownOpen((prev) => !prev);
                }}
                className="h-9 px-3.5 rounded-full bg-slate-50/90 hover:bg-white border border-slate-200 text-xs font-semibold text-[#07133B] inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                <span>
                  {productFilter === 'all' ? 'Filter' : productFilter === 'featured' ? 'Featured' : productFilter}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {filterDropdownOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 mt-1.5 w-44 rounded-xl bg-white border border-slate-200 shadow-xl py-1 z-30 text-xs"
                >
                  {(
                    [
                      { key: 'all', label: 'All Products' },
                      { key: 'In Stock', label: 'In Stock' },
                      { key: 'Pre-Order', label: 'Pre-Order' },
                      { key: 'Request Quote', label: 'Request Quote' },
                      { key: 'featured', label: 'Featured Only' },
                    ] as { key: ProductFilterMode; label: string }[]
                  ).map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => {
                        setProductFilter(opt.key);
                        setFilterDropdownOpen(false);
                      }}
                      className={`w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                        productFilter === opt.key
                          ? 'font-bold text-[#0044FF]'
                          : 'font-medium text-slate-700'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {productFilter === opt.key && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary Add Product Button */}
            <button
              type="button"
              onClick={() => handleCreateForTab('products')}
              className="h-9 px-4 rounded-full bg-gradient-to-r from-[#0044FF] to-[#0077FF] hover:from-[#0035D1] hover:to-[#0062D6] text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-[0_6px_16px_rgba(0,68,255,0.28)] whitespace-nowrap cursor-pointer transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-500">
                <th className="py-3 px-4 sm:px-5">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price (XAF)</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 sm:px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {displayRows.map((product) => {
                const fullIdx = products.findIndex((p) => p.id === product.id);
                const isLiveInStock = product.availability === 'In Stock';
                const isBusy = togglingProductId === product.id;

                return (
                  <tr key={product.id} className="hover:bg-[#F5F8FF]/75 transition-colors">
                    <td className="py-3 px-4 sm:px-5">
                      <div className="flex items-center gap-3 min-w-[230px]">
                        <div className="w-12 h-10 rounded-xl overflow-hidden border border-slate-200/80 bg-white shrink-0 shadow-2xs">
                          <ResilientImage
                            src={product.image}
                            alt={product.name}
                            fallbackTitle={product.name}
                            wrapperClassName="w-full h-full"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 max-w-[260px]">
                          <div className="font-bold text-[#07133B] truncate">
                            {product.name}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">
                            {product.shortDesc}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#EFF5FF] text-[#0044FF] text-[11px] font-semibold">
                        {getShortCategoryBadge(product.categoryLabel)}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-bold text-[#07133B] tabular-nums whitespace-nowrap">
                      {product.priceAmount.replace(/\s*XAF$/i, '')}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          product.availability === 'In Stock'
                            ? 'bg-emerald-50 text-emerald-700'
                            : product.availability === 'Pre-Order'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            product.availability === 'In Stock'
                              ? 'bg-emerald-500'
                              : product.availability === 'Pre-Order'
                                ? 'bg-amber-500'
                                : 'bg-slate-400'
                          }`}
                        />
                        <span>{product.availability}</span>
                      </span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={isLiveInStock}
                        aria-label={`Toggle stock status for ${product.name}`}
                        disabled={isBusy}
                        onClick={() => void handleToggleProductStock(product, fullIdx)}
                        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors cursor-pointer disabled:opacity-50 ${
                          isLiveInStock ? 'bg-[#0055FF]' : 'bg-slate-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                            isLiveInStock ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </td>

                    <td className="py-3 px-4 sm:px-5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-1.5 relative">
                        <button
                          type="button"
                          onClick={() => setPreviewProduct(product)}
                          aria-label={`Preview ${product.name}`}
                          className="w-8 h-8 rounded-full bg-[#F1F5FF] hover:bg-[#DCE8FF] text-[#0044FF] inline-flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingProduct({ item: product, isNew: false })}
                          aria-label={`Edit ${product.name}`}
                          className="w-8 h-8 rounded-full bg-[#F1F5FF] hover:bg-[#DCE8FF] text-[#0044FF] inline-flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenRowMenuId((prev) =>
                                prev === product.id ? null : product.id
                              );
                            }}
                            aria-label={`More actions for ${product.name}`}
                            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 inline-flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>

                          {openRowMenuId === product.id && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-0 mt-1 w-40 rounded-xl bg-white border border-slate-200 shadow-xl py-1 z-30 text-left"
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenRowMenuId(null);
                                  void handleDuplicateProduct(product);
                                }}
                                className="w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                              >
                                <Copy className="w-3.5 h-3.5 text-[#0044FF]" />
                                <span>Duplicate</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenRowMenuId(null);
                                  setDeletePrompt({
                                    entityLabel: 'Product',
                                    itemName: product.name,
                                    onConfirm: () => deleteProduct(product.id),
                                  });
                                }}
                                className="w-full px-3 py-2 text-xs font-semibold text-[#DC2626] hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-500">
            No products match your search or filter criteria.
          </div>
        )}

        {!showAllRows && filteredProducts.length > 6 && (
          <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              Showing 6 of {filteredProducts.length} products
            </span>
            <button
              type="button"
              onClick={() => handleSelectTab('products')}
              className="font-bold text-[#0044FF] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View All Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    );
  };

  // Cosmic Dark Navy Sidebar
  const sidebarContent = (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#040B29] via-[#06133B] to-[#081F63] text-white relative overflow-hidden">
      {/* Bottom radiant blue glow */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#0055FF]/35 blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="px-5 pt-5 pb-4 flex items-center justify-between gap-2 relative z-10">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src="/assets/aistudio/Samitech_Corporation_Logo_7401e1c3.png"
            alt="SAMITECH Corporation"
            className="h-9 w-auto object-contain footer-logo-glow"
          />
        </div>
        <button
          type="button"
          onClick={() => setMobileNavOpen(false)}
          aria-label="Close sidebar"
          className="lg:hidden p-1.5 rounded-lg text-slate-300 hover:bg-white/10 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Control Panel sections"
        className="flex-1 overflow-y-auto px-3.5 py-2 space-y-1 relative z-10"
      >
        {PRIMARY_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#0055FF] to-[#0088FF] text-white shadow-[0_8px_22px_rgba(0,115,255,0.45)]'
                  : 'text-slate-300 hover:bg-white/8 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-300/90'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}

        <div className="my-3 border-t border-white/10" />

        {SECONDARY_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#0055FF] to-[#0088FF] text-white shadow-[0_8px_22px_rgba(0,115,255,0.45)]'
                  : 'text-slate-300 hover:bg-white/8 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* System Status + Cosmic Brand Graphic */}
      <div className="px-4 pb-4 pt-2 space-y-3 relative z-10">
        <div className="rounded-xl bg-[#071645]/90 border border-white/15 px-3.5 py-2.5 flex items-center justify-between gap-2 shadow-inner">
          <div className="flex items-start gap-2.5 min-w-0">
            <span
              className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                cloudSynced
                  ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                  : 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
              }`}
            />
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-white leading-tight">
                System Status
              </div>
              <div className="text-[10.5px] font-semibold text-emerald-400 truncate mt-0.5">
                {cloudSyncing
                  ? 'Syncing Cloud...'
                  : cloudSynced
                    ? 'All Systems Online'
                    : 'Ready to Sync'}
              </div>
            </div>
          </div>
          <SidebarPulseWave />
        </div>

        {/* Cosmic Star Artwork */}
        <div className="text-center space-y-1 pt-1">
          <SidebarCosmicStarGraphic />
          <div className="italic leading-none">
            <div className="text-sm font-medium text-white/95">Let&apos;s Build</div>
            <div className="text-xl font-extrabold text-[#38BDF8] tracking-tight">
              Together
            </div>
          </div>
          <div className="mx-auto w-24 h-0.5 rounded-full bg-gradient-to-r from-transparent via-[#DC0914] to-[#38BDF8]" />
        </div>

        <p className="text-[10px] text-slate-400/90 text-center leading-snug pt-1">
          © 2026 SAMITECH Corporation.
          <br />
          All rights reserved.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2F6FF] via-[#EAF1FF] to-[#E1ECFF] text-[#07133B] flex relative overflow-x-clip">
      {/* Subtle top-right dotted world map backdrop matching screenshot */}
      <div className="fixed top-6 right-8 pointer-events-none z-0 opacity-85">
        <DottedWorldMapBackdrop />
      </div>

      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block w-[252px] shrink-0 relative z-20 shadow-[8px_0_30px_rgba(4,11,41,0.18)]">
        <div className="sticky top-0 h-screen">{sidebarContent}</div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex bg-[#040B29]/60 backdrop-blur-xs"
          onClick={() => setMobileNavOpen(false)}
        >
          <div className="w-68 h-full" onClick={(e) => e.stopPropagation()}>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Main Workspace Canvas */}
      <div className="flex-1 min-w-0 flex flex-col relative z-10">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-[#F2F6FF]/80 backdrop-blur-lg border-b border-white/80 px-4 sm:px-7 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open Control Panel menu"
              className="lg:hidden w-9 h-9 rounded-xl border border-slate-200 bg-white/80 flex items-center justify-center text-slate-700 hover:bg-white cursor-pointer"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs sm:text-[13px] min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#0044FF] text-white flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(0,68,255,0.3)]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <button
                type="button"
                onClick={() => handleSelectTab('overview')}
                className="font-bold text-[#0044FF] hover:underline cursor-pointer whitespace-nowrap"
              >
                Control Panel
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-semibold text-[#07133B] truncate">
                {activeNavObj.label}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* Live Sync Status Pill */}
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-200/80 text-[11px] font-bold text-emerald-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="tabular-nums">
                Live Sync • {formattedSyncTime}
              </span>
            </div>

            {supportsCreateButton && (
              <button
                type="button"
                onClick={() => handleCreateForTab()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#0044FF] to-[#0077FF] text-white text-xs font-semibold whitespace-nowrap shadow-[0_6px_16px_rgba(0,68,255,0.25)] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New</span>
              </button>
            )}

            <button
              type="button"
              onClick={onExitToSite}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#BFD4FF] bg-white/85 hover:bg-white text-xs font-semibold text-[#0044FF] whitespace-nowrap shadow-2xs transition-colors cursor-pointer"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {/* Profile Avatar Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileMenuOpen((prev) => !prev);
                }}
                aria-label="Account menu"
                className="inline-flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-full bg-white/85 border border-slate-200/80 hover:bg-white cursor-pointer"
              >
                {authUser.photoURL ? (
                  <img
                    src={authUser.photoURL}
                    alt={authUser.displayName || 'Admin'}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#07133B] text-white text-xs font-bold flex items-center justify-center">
                    {userInitial}
                  </div>
                )}
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {profileMenuOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-2xl p-3 space-y-2.5 z-40"
                >
                  <div className="px-2 py-1.5 border-b border-slate-100">
                    <div className="text-xs font-bold text-[#07133B] truncate">
                      {authUser.displayName || 'SAMITECH Admin'}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {authUser.email}
                    </div>
                    <span className="mt-1 inline-block px-2 py-0.5 rounded-md bg-[#EEF3FF] text-[#0044FF] text-[10px] font-bold">
                      {isSuperAdmin ? 'Super Admin' : 'Authorized Editor'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      void handleFullCloudSync(false);
                    }}
                    className="w-full px-2.5 py-2 rounded-xl hover:bg-slate-50 text-xs font-semibold text-[#07133B] flex items-center gap-2 cursor-pointer"
                  >
                    <CloudUpload className="w-4 h-4 text-[#0044FF]" />
                    <span>Push All Data to Cloud</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectTab('admins')}
                    className="w-full px-2.5 py-2 rounded-xl hover:bg-slate-50 text-xs font-semibold text-[#07133B] flex items-center gap-2 cursor-pointer"
                  >
                    <ShieldPlus className="w-4 h-4 text-[#0044FF]" />
                    <span>Manage Admin Access</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => void signOutUser()}
                    className="w-full px-2.5 py-2 rounded-xl hover:bg-red-50 text-xs font-semibold text-[#DC2626] flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Inline Toast Banner */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="px-4 sm:px-7 pt-4"
            >
              <div
                className={`p-3.5 rounded-2xl border text-xs font-semibold flex items-center justify-between gap-3 shadow-sm ${
                  toast.kind === 'success'
                    ? 'bg-emerald-50/95 border-emerald-200 text-emerald-800'
                    : 'bg-red-50/95 border-red-200 text-[#DC2626]'
                }`}
              >
                <span className="flex items-center gap-2">
                  {toast.kind === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{toast.text}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setToast(null)}
                  className="p-1 opacity-70 hover:opacity-100 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main View Area */}
        <main className="p-4 sm:p-7 space-y-5 flex-1">
          {/* ---------------------------------------------------------------- */}
          {/* OVERVIEW TAB                                                     */}
          {/* ---------------------------------------------------------------- */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              {/* Title + Powered by Firebase Hero */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#07133B]">
                    SAMITECH{' '}
                    <span className="text-[#0044FF]">Control Panel</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Manage your website content with ease. Publish changes instantly across the entire site.
                  </p>
                </div>

                {/* Glassmorphic Powered by Firebase Card */}
                <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-white shadow-[0_8px_22px_rgba(7,19,59,0.06)] self-start md:self-auto">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0055FF] to-[#0088FF] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,85,255,0.3)]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="pr-2">
                    <div className="text-xs font-bold text-[#07133B]">
                      Powered by Firebase
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Real-time cloud updates
                    </div>
                  </div>
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      cloudSynced ? 'bg-emerald-500' : 'bg-amber-400'
                    }`}
                  />
                </div>
              </div>

              {/* 4 Top KPI Stat Cards */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                  {
                    tab: 'products' as ControlTab,
                    label: 'Products',
                    count: products.length,
                    delta: cloudCounts.products,
                    icon: <Kpi3DCubeIcon />,
                  },
                  {
                    tab: 'services' as ControlTab,
                    label: 'Services',
                    count: services.length,
                    delta: cloudCounts.services,
                    icon: <Kpi3DGearIcon />,
                  },
                  {
                    tab: 'projects' as ControlTab,
                    label: 'Projects',
                    count: projects.length,
                    delta: cloudCounts.projects,
                    icon: <Kpi3DFolderIcon />,
                  },
                  {
                    tab: 'team' as ControlTab,
                    label: 'Team Members',
                    count: teamMembers.length,
                    delta: cloudCounts.team,
                    icon: <Kpi3DTeamIcon />,
                  },
                ].map((stat) => (
                  <button
                    key={stat.tab}
                    type="button"
                    onClick={() => handleSelectTab(stat.tab)}
                    className="group relative rounded-2xl bg-white/85 backdrop-blur-md border border-white hover:border-[#BFD4FF] p-4 shadow-[0_10px_26px_rgba(7,19,59,0.06)] hover:shadow-[0_14px_30px_rgba(0,68,255,0.12)] transition-all text-left flex items-center gap-3.5 cursor-pointer"
                  >
                    <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-slate-100/90 group-hover:bg-[#EFF5FF] text-slate-400 group-hover:text-[#0044FF] flex items-center justify-center transition-colors">
                      <ChevronRight className="w-3 h-3" />
                    </span>

                    {stat.icon}

                    <div className="min-w-0">
                      <div className="text-2xl font-extrabold text-[#07133B] leading-none tabular-nums">
                        {stat.count}
                      </div>
                      <div className="mt-1.5 flex items-center gap-2 text-xs">
                        <span className="font-semibold text-slate-600 truncate">
                          {stat.label}
                        </span>
                        <span className="font-bold text-emerald-600 tabular-nums">
                          ↑ +{stat.delta}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Middle Bento Grid: Website Overview Chart + Quick Actions */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
                <div className="xl:col-span-7">
                  <WebsiteOverviewChartCard />
                </div>

                <div className="xl:col-span-5 rounded-2xl bg-white/85 backdrop-blur-md border border-white shadow-[0_10px_28px_rgba(7,19,59,0.06)] p-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#EFF5FF] text-[#0044FF] flex items-center justify-center mt-0.5 shrink-0">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="text-[15px] font-bold text-[#07133B] leading-tight">
                          Quick Actions
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Manage your content faster
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {quickActionsList.map((action) => (
                        <button
                          key={action.kind}
                          type="button"
                          onClick={action.onClick}
                          className={`rounded-2xl border p-3.5 flex flex-col items-center justify-center text-center gap-2.5 min-h-[108px] transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer ${action.bgClass}`}
                        >
                          <QuickActionIcon kind={action.kind} />
                          <span className="text-[11.5px] font-bold text-[#07133B] leading-snug">
                            {action.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Full-Width Mint Cloud Sync Status Banner */}
              <div className="rounded-2xl bg-gradient-to-r from-[#ECFDF5] via-[#F2FDF9] to-[#E6F7FF] border border-emerald-200/80 px-5 py-3.5 shadow-[0_8px_22px_rgba(16,185,129,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(16,185,129,0.35)]">
                    <Check className="w-5 h-5 stroke-[2.6]" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-[#07133B]">
                      {cloudSynced
                        ? 'Everything is up to date!'
                        : 'Ready to Push All Project Data to Cloud'}
                    </div>
                    <p className="text-xs text-slate-600">
                      Your website is live and synchronized with Firebase ({totalCloudRecords}{' '}
                      cloud records · {SAMITECH_MEDIA_LIBRARY.length} project assets
                      {backupManifest?.storageSynced ? ' · Storage Snapshot Ready' : ''}).
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => void handleFullCloudSync(false)}
                  disabled={cloudSyncing}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#07133B] shadow-2xs shrink-0 cursor-pointer disabled:opacity-60 transition-colors"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 text-emerald-600 ${
                      cloudSyncing ? 'animate-spin' : ''
                    }`}
                  />
                  <span>{cloudSyncing ? 'Syncing Cloud...' : 'Sync Now'}</span>
                </button>
              </div>

              {/* Embedded Products Management Table */}
              {renderProductsTableCard(false)}

              {/* Bottom Custom Solution / WhatsApp Banner */}
              <div className="rounded-2xl bg-gradient-to-r from-[#030A24] via-[#07184A] to-[#0A2E85] p-5 sm:p-6 text-white shadow-[0_14px_34px_rgba(4,11,41,0.22)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-5">
                <div className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full bg-[#38BDF8]/15 blur-3xl pointer-events-none" />

                <div className="flex items-center gap-5 relative z-10">
                  <CustomSolutionBannerVisual />
                  <div className="space-y-1 max-w-md text-center md:text-left">
                    <h3 className="text-base sm:text-lg font-extrabold tracking-tight">
                      Need Help or a Custom Solution?
                    </h3>
                    <p className="text-xs sm:text-[13px] text-blue-100/85 leading-relaxed">
                      Our team is here to help you build, upgrade, or customize your technology needs.
                    </p>
                  </div>
                </div>

                <a
                  href={buildWhatsAppUrl(
                    'Hello SAMITECH team, I am contacting from the Control Panel regarding a custom solution.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs font-bold backdrop-blur-md transition-colors whitespace-nowrap shrink-0"
                >
                  <WhatsAppBrandIcon className="w-4 h-4 text-[#25D366]" />
                  <span>Contact Us on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* PRODUCTS TAB                                                     */}
          {/* ---------------------------------------------------------------- */}
          {activeTab === 'products' && renderProductsTableCard(true)}

          {/* ---------------------------------------------------------------- */}
          {/* SEARCH TOOLBAR FOR REMAINING COLLECTION TABS                     */}
          {/* ---------------------------------------------------------------- */}
          {supportsCreateButton && activeTab !== 'products' && (
            <div className="rounded-2xl bg-white/85 backdrop-blur-md border border-white p-4 shadow-[0_8px_24px_rgba(7,19,59,0.05)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${activeNavObj.label.toLowerCase()}...`}
                  className="w-full h-10 pl-9 pr-3 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0044FF]"
                />
              </div>
              <div className="text-xs text-slate-500">
                Changes save straight to Firestore and update live visitors immediately.
              </div>
            </div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* SERVICES TABLE                                                   */}
          {/* ---------------------------------------------------------------- */}
          {activeTab === 'services' && (
            <div className="rounded-2xl bg-white/88 backdrop-blur-md border border-white shadow-[0_10px_28px_rgba(7,19,59,0.06)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Division Label</th>
                      <th className="py-3 px-4">Timeline</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredServices.map((service) => (
                      <tr key={service.slug} className="hover:bg-[#F5F8FF]/70">
                        <td className="py-3 px-4 font-mono font-bold text-[#0044FF] tabular-nums">
                          {service.number}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3 min-w-[200px]">
                            <div className="w-11 h-9 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                              <ResilientImage
                                src={service.image}
                                alt={service.title}
                                fallbackTitle={service.title}
                                wrapperClassName="w-full h-full"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="font-bold text-[#07133B]">{service.title}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{service.groupLabel}</td>
                        <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                          {service.timelineLabel}
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                          <button
                            type="button"
                            onClick={() => setEditingService({ item: service, isNew: false })}
                            className="px-3.5 py-1.5 rounded-full border border-slate-200 bg-white hover:border-[#0044FF] hover:text-[#0044FF] font-semibold cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setDeletePrompt({
                                entityLabel: 'Service',
                                itemName: service.title,
                                onConfirm: () => deleteService(service.slug),
                              })
                            }
                            aria-label={`Delete ${service.title}`}
                            className="p-1.5 rounded-full text-slate-400 hover:text-[#DC2626] hover:bg-red-50 cursor-pointer align-middle"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* PROJECTS TABLE                                                   */}
          {/* ---------------------------------------------------------------- */}
          {activeTab === 'projects' && (
            <div className="rounded-2xl bg-white/88 backdrop-blur-md border border-white shadow-[0_10px_28px_rgba(7,19,59,0.06)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Project</th>
                      <th className="py-3 px-4">Sector</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Year</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredProjects.map((project) => (
                      <tr key={project.id} className="hover:bg-[#F5F8FF]/70">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3 min-w-[200px]">
                            <div className="w-12 h-9 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                              <ResilientImage
                                src={project.image}
                                alt={project.title}
                                fallbackTitle={project.title}
                                wrapperClassName="w-full h-full"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-bold text-[#07133B]">{project.title}</div>
                              {project.featured && (
                                <span className="text-[10px] font-semibold text-[#0044FF]">
                                  Pinned Spotlight
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{project.sector}</td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                          {project.filterCategory}
                        </td>
                        <td className="py-3 px-4 font-mono tabular-nums text-slate-700">
                          {project.year}
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                          <button
                            type="button"
                            onClick={() => setEditingProject({ item: project, isNew: false })}
                            className="px-3.5 py-1.5 rounded-full border border-slate-200 bg-white hover:border-[#0044FF] hover:text-[#0044FF] font-semibold cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setDeletePrompt({
                                entityLabel: 'Project',
                                itemName: project.title,
                                onConfirm: () => deleteProject(project.id),
                              })
                            }
                            aria-label={`Delete ${project.title}`}
                            className="p-1.5 rounded-full text-slate-400 hover:text-[#DC2626] hover:bg-red-50 cursor-pointer align-middle"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* TEAM TABLE                                                       */}
          {/* ---------------------------------------------------------------- */}
          {activeTab === 'team' && (
            <div className="rounded-2xl bg-white/88 backdrop-blur-md border border-white shadow-[0_10px_28px_rgba(7,19,59,0.06)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Member</th>
                      <th className="py-3 px-4">Title Badge</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredTeam.map((member) => (
                      <tr key={member.id} className="hover:bg-[#F5F8FF]/70">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3 min-w-[200px]">
                            <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 shrink-0">
                              <ResilientImage
                                src={member.image}
                                alt={member.name}
                                fallbackTitle={member.name}
                                wrapperClassName="w-full h-full"
                                className="w-full h-full object-cover object-top"
                              />
                            </div>
                            <div className="font-bold text-[#07133B]">{member.name}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono font-semibold text-[#0044FF]">
                          {member.executiveTitle}
                        </td>
                        <td className="py-3 px-4 text-slate-600">{member.role}</td>
                        <td className="py-3 px-4 text-slate-600">{member.email}</td>
                        <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                          <button
                            type="button"
                            onClick={() => setEditingTeamMember({ item: member, isNew: false })}
                            className="px-3.5 py-1.5 rounded-full border border-slate-200 bg-white hover:border-[#0044FF] hover:text-[#0044FF] font-semibold cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setDeletePrompt({
                                entityLabel: 'Team Profile',
                                itemName: member.name,
                                onConfirm: () => deleteTeamMember(member.id),
                              })
                            }
                            aria-label={`Delete ${member.name}`}
                            className="p-1.5 rounded-full text-slate-400 hover:text-[#DC2626] hover:bg-red-50 cursor-pointer align-middle"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* COMMUNITIES TABLE                                                */}
          {/* ---------------------------------------------------------------- */}
          {activeTab === 'communities' && (
            <div className="rounded-2xl bg-white/88 backdrop-blur-md border border-white shadow-[0_10px_28px_rgba(7,19,59,0.06)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Community</th>
                      <th className="py-3 px-4">Platform</th>
                      <th className="py-3 px-4">Destination</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredCommunities.map((comm) => (
                      <tr key={comm.id} className="hover:bg-[#F5F8FF]/70">
                        <td className="py-3 px-4 font-mono font-bold text-[#0044FF] tabular-nums">
                          {comm.number}
                        </td>
                        <td className="py-3 px-4 font-bold text-[#07133B]">{comm.name}</td>
                        <td className="py-3 px-4 text-slate-600">{comm.platformLabel}</td>
                        <td className="py-3 px-4 text-slate-600 truncate max-w-xs">
                          <a
                            href={comm.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0044FF] hover:underline"
                          >
                            {comm.domainOrHandle || comm.url}
                          </a>
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                          <button
                            type="button"
                            onClick={() => setEditingCommunity({ item: comm, isNew: false })}
                            className="px-3.5 py-1.5 rounded-full border border-slate-200 bg-white hover:border-[#0044FF] hover:text-[#0044FF] font-semibold cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setDeletePrompt({
                                entityLabel: 'Community',
                                itemName: comm.name,
                                onConfirm: () => deleteCommunity(comm.id),
                              })
                            }
                            aria-label={`Delete ${comm.name}`}
                            className="p-1.5 rounded-full text-slate-400 hover:text-[#DC2626] hover:bg-red-50 cursor-pointer align-middle"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* CAREERS TABLE                                                    */}
          {/* ---------------------------------------------------------------- */}
          {activeTab === 'careers' && (
            <div className="rounded-2xl bg-white/88 backdrop-blur-md border border-white shadow-[0_10px_28px_rgba(7,19,59,0.06)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Role Title</th>
                      <th className="py-3 px-4">Department</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Visibility</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredCareers.map((career, idx) => (
                      <tr key={career.id} className="hover:bg-[#F5F8FF]/70">
                        <td className="py-3 px-4 font-bold text-[#07133B]">{career.title}</td>
                        <td className="py-3 px-4 text-slate-600">{career.department}</td>
                        <td className="py-3 px-4 text-slate-600">{career.type}</td>
                        <td className="py-3 px-4">
                          <button
                            type="button"
                            onClick={async () => {
                              await saveCareer(
                                { ...career, isOpen: career.isOpen === false },
                                idx
                              );
                              showToast(
                                'success',
                                `Role "${career.title}" ${
                                  career.isOpen === false ? 're-opened' : 'paused'
                                }.`
                              );
                            }}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer ${
                              career.isOpen !== false
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {career.isOpen !== false ? 'Open' : 'Paused'}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                          <button
                            type="button"
                            onClick={() => setEditingCareer({ item: career, isNew: false })}
                            className="px-3.5 py-1.5 rounded-full border border-slate-200 bg-white hover:border-[#0044FF] hover:text-[#0044FF] font-semibold cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setDeletePrompt({
                                entityLabel: 'Career Opening',
                                itemName: career.title,
                                onConfirm: () => deleteCareer(career.id),
                              })
                            }
                            aria-label={`Delete ${career.title}`}
                            className="p-1.5 rounded-full text-slate-400 hover:text-[#DC2626] hover:bg-red-50 cursor-pointer align-middle"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* GLOBAL FAQS TABLE                                                */}
          {/* ---------------------------------------------------------------- */}
          {activeTab === 'faqs' && (
            <div className="rounded-2xl bg-white/88 backdrop-blur-md border border-white shadow-[0_10px_28px_rgba(7,19,59,0.06)] overflow-hidden divide-y divide-slate-100">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 hover:bg-[#F5F8FF]/70"
                >
                  <div className="space-y-1 max-w-3xl">
                    <div className="text-sm font-bold text-[#07133B]">{faq.question}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingFaq({ item: faq, isNew: false })}
                      className="px-3.5 py-1.5 rounded-full border border-slate-200 bg-white hover:border-[#0044FF] hover:text-[#0044FF] text-xs font-semibold cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setDeletePrompt({
                          entityLabel: 'FAQ',
                          itemName: faq.question,
                          onConfirm: () => deleteFaq(faq.id),
                        })
                      }
                      aria-label={`Delete ${faq.question}`}
                      className="p-1.5 rounded-full text-slate-400 hover:text-[#DC2626] hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* CONTACT, WHATSAPP & BRAND SETTINGS                               */}
          {/* ---------------------------------------------------------------- */}
          {activeTab === 'settings' && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setSavingSettings(true);
                try {
                  await saveSettings(settingsDraft);
                  showToast(
                    'success',
                    'Global contact, phone & WhatsApp settings updated across the live site.'
                  );
                } catch (err) {
                  showToast(
                    'error',
                    err instanceof Error ? err.message : 'Unable to save global settings.'
                  );
                } finally {
                  setSavingSettings(false);
                }
              }}
              className="max-w-3xl rounded-2xl bg-white/88 backdrop-blur-md border border-white shadow-[0_10px_28px_rgba(7,19,59,0.06)] p-6 space-y-5"
            >
              <div className="space-y-1 pb-4 border-b border-slate-100">
                <h2 className="text-base font-bold text-[#07133B]">
                  Global Contact, WhatsApp &amp; Company Identity
                </h2>
                <p className="text-xs text-slate-500">
                  Changes here immediately update the floating WhatsApp widget, product order
                  links, navbar drawer, contact page, and site footer.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    WhatsApp Order Digits (Country Code + Number)
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsDraft.whatsappNumber}
                    onChange={(e) =>
                      setSettingsDraft({ ...settingsDraft, whatsappNumber: e.target.value })
                    }
                    placeholder="237695200361"
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white font-mono text-sm tabular-nums"
                  />
                  <p className="text-[11px] text-slate-500">
                    Live Target:{' '}
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#16A34A] font-semibold hover:underline"
                    >
                      https://wa.me/{normalizeWhatsappDigits(settingsDraft.whatsappNumber)}
                    </a>
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Public Display Phone
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsDraft.phone}
                    onChange={(e) =>
                      setSettingsDraft({ ...settingsDraft, phone: e.target.value })
                    }
                    placeholder="+237 6 95 20 03 61"
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white font-mono text-sm tabular-nums"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Default WhatsApp Floating Chat Message
                </label>
                <input
                  type="text"
                  required
                  value={settingsDraft.whatsappDefaultMessage}
                  onChange={(e) =>
                    setSettingsDraft({
                      ...settingsDraft,
                      whatsappDefaultMessage: e.target.value,
                    })
                  }
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Support Email</label>
                  <input
                    type="email"
                    required
                    value={settingsDraft.email}
                    onChange={(e) =>
                      setSettingsDraft({ ...settingsDraft, email: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Availability Badge</label>
                  <input
                    type="text"
                    required
                    value={settingsDraft.availability}
                    onChange={(e) =>
                      setSettingsDraft({ ...settingsDraft, availability: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Legal Brand Name</label>
                  <input
                    type="text"
                    required
                    value={settingsDraft.legalName}
                    onChange={(e) =>
                      setSettingsDraft({ ...settingsDraft, legalName: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Primary Location</label>
                  <input
                    type="text"
                    required
                    value={settingsDraft.location}
                    onChange={(e) =>
                      setSettingsDraft({ ...settingsDraft, location: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Domain</label>
                  <input
                    type="text"
                    required
                    value={settingsDraft.domain}
                    onChange={(e) =>
                      setSettingsDraft({ ...settingsDraft, domain: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0044FF] to-[#0077FF] text-white text-xs font-semibold shadow-[0_6px_16px_rgba(0,68,255,0.28)] cursor-pointer disabled:opacity-60"
                >
                  {savingSettings ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span>{savingSettings ? 'Saving...' : 'Save Contact Settings'}</span>
                </button>
              </div>
            </form>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* ADMIN ALLOWLIST & CLOUD BACKUP MANAGEMENT                        */}
          {/* ---------------------------------------------------------------- */}
          {activeTab === 'admins' && (
            <div className="max-w-4xl space-y-6">
              {/* Full Project Cloud Snapshot Status Card */}
              <div className="rounded-2xl bg-white/88 backdrop-blur-md border border-white shadow-[0_10px_28px_rgba(7,19,59,0.06)] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-[#0044FF] uppercase tracking-wider">
                    Firebase Cloud Archive &amp; Asset Manifest
                  </div>
                  <div className="text-sm font-bold text-[#07133B]">
                    {backupManifest
                      ? `${backupManifest.recordCount} database documents & ${backupManifest.assetCount} project assets pushed`
                      : 'Push all current project collections and asset manifest to Cloud'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Bucket: {backupManifest?.storageBucket || 'tough-flare-8hnbb.firebasestorage.app'}
                    {backupManifest?.storageUrl && ' • JSON Snapshot Uploaded'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => void handleFullCloudSync(true)}
                  disabled={cloudSyncing}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#0044FF] to-[#0077FF] text-white text-xs font-semibold shadow-sm shrink-0 cursor-pointer disabled:opacity-60"
                >
                  <CloudUpload className="w-4 h-4" />
                  <span>{cloudSyncing ? 'Pushing...' : 'Push Full Project Backup'}</span>
                </button>
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const cleanEmail = newAdminEmail.trim().toLowerCase();
                  if (!cleanEmail || !cleanEmail.includes('@')) {
                    showToast('error', 'Enter a valid Google Workspace or Gmail email address.');
                    return;
                  }
                  setAddingAdmin(true);
                  try {
                    await addAdminUser(cleanEmail, newAdminName, newAdminRole);
                    setNewAdminEmail('');
                    setNewAdminName('');
                    showToast('success', `Granted Control Panel access to ${cleanEmail}.`);
                  } catch (err) {
                    showToast(
                      'error',
                      err instanceof Error ? err.message : 'Unable to add admin user.'
                    );
                  } finally {
                    setAddingAdmin(false);
                  }
                }}
                className="rounded-2xl bg-white/88 backdrop-blur-md border border-white shadow-[0_10px_28px_rgba(7,19,59,0.06)] p-5 space-y-4"
              >
                <div>
                  <h2 className="text-sm font-bold text-[#07133B]">
                    Authorize a Team Google Account
                  </h2>
                  <p className="text-xs text-slate-500">
                    Only the emails listed below (plus the primary super admin) can sign in to
                    this Control Panel.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <input
                    type="email"
                    required
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    placeholder="teammate@gmail.com"
                    className="sm:col-span-5 h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs"
                  />
                  <input
                    type="text"
                    value={newAdminName}
                    onChange={(e) => setNewAdminName(e.target.value)}
                    placeholder="Full Name (e.g. Samuel)"
                    className="sm:col-span-3 h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs"
                  />
                  <select
                    value={newAdminRole}
                    onChange={(e) =>
                      setNewAdminRole(e.target.value as 'editor' | 'super_admin')
                    }
                    className="sm:col-span-2 h-10 px-2.5 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="editor">Editor</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                  <button
                    type="submit"
                    disabled={addingAdmin}
                    className="sm:col-span-2 h-10 rounded-xl bg-[#0044FF] hover:bg-[#0032C4] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>{addingAdmin ? 'Adding...' : 'Approve'}</span>
                  </button>
                </div>
              </form>

              <div className="rounded-2xl bg-white/88 backdrop-blur-md border border-white shadow-[0_10px_28px_rgba(7,19,59,0.06)] overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Google Email</th>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Access</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    <tr className="bg-[#F5F8FF]">
                      <td className="py-3 px-4 font-mono font-semibold text-[#07133B]">
                        {SUPER_ADMIN_EMAIL}
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#07133B]">
                        Primary Owner
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#EEF3FF] text-[#0044FF] font-semibold">
                          Super Admin
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
                          Active (Protected)
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-slate-400">Owner</td>
                    </tr>

                    {adminUsers
                      .filter((u) => u.email.toLowerCase() !== SUPER_ADMIN_EMAIL)
                      .map((record: AdminUserRecord) => (
                        <tr key={record.email} className="hover:bg-[#F5F8FF]/70">
                          <td className="py-3 px-4 font-mono text-[#07133B]">
                            {record.email}
                          </td>
                          <td className="py-3 px-4 font-semibold text-slate-700">
                            {record.displayName}
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            {record.role === 'super_admin' ? 'Super Admin' : 'Editor'}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              type="button"
                              onClick={async () => {
                                await toggleAdminUserActive(record);
                                showToast(
                                  'success',
                                  `${record.email} ${record.active ? 'paused' : 'activated'}.`
                                );
                              }}
                              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold cursor-pointer ${
                                record.active
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {record.active ? 'Active' : 'Paused'}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right">
                            {(isSuperAdmin || record.email !== authUser.email?.toLowerCase()) && (
                              <button
                                type="button"
                                onClick={() =>
                                  setDeletePrompt({
                                    entityLabel: 'Admin Access',
                                    itemName: record.email,
                                    onConfirm: () => removeAdminUser(record.email),
                                  })
                                }
                                aria-label={`Remove ${record.email}`}
                                className="p-1.5 rounded-full text-slate-400 hover:text-[#DC2626] hover:bg-red-50 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* ROOT-MOUNTED SLIDE-OVER EDITORS (Accessible from Quick Actions too)  */}
      {/* -------------------------------------------------------------------- */}
      {editingProduct && (
        <ProductEditorDrawer
          initialProduct={editingProduct.item}
          isNew={editingProduct.isNew}
          onClose={() => setEditingProduct(null)}
          onSave={async (next) => {
            const idx = products.findIndex((p) => p.id === next.id);
            await saveProduct(next, idx >= 0 ? idx : products.length);
            showToast('success', `Product "${next.name}" published live.`);
          }}
        />
      )}

      {editingService && (
        <ServiceEditorDrawer
          initialService={editingService.item}
          isNew={editingService.isNew}
          onClose={() => setEditingService(null)}
          onSave={async (next) => {
            const idx = services.findIndex((s) => s.slug === next.slug);
            await saveService(next, idx >= 0 ? idx : services.length);
            showToast('success', `Service "${next.title}" published live.`);
          }}
        />
      )}

      {editingProject && (
        <ProjectEditorDrawer
          initialProject={editingProject.item}
          isNew={editingProject.isNew}
          onClose={() => setEditingProject(null)}
          onSave={async (next) => {
            const idx = projects.findIndex((p) => p.id === next.id);
            await saveProject(next, idx >= 0 ? idx : projects.length);
            showToast('success', `Project "${next.title}" published live.`);
          }}
        />
      )}

      {editingTeamMember && (
        <TeamMemberEditorDrawer
          initialMember={editingTeamMember.item}
          isNew={editingTeamMember.isNew}
          onClose={() => setEditingTeamMember(null)}
          onSave={async (next) => {
            const idx = teamMembers.findIndex((m) => m.id === next.id);
            await saveTeamMember(next, idx >= 0 ? idx : teamMembers.length);
            showToast('success', `Team profile "${next.name}" published live.`);
          }}
        />
      )}

      {editingCommunity && (
        <CommunityEditorDrawer
          initialCommunity={editingCommunity.item}
          isNew={editingCommunity.isNew}
          onClose={() => setEditingCommunity(null)}
          onSave={async (next) => {
            const idx = communities.findIndex((c) => c.id === next.id);
            await saveCommunity(next, idx >= 0 ? idx : communities.length);
            showToast('success', `Community "${next.name}" published live.`);
          }}
        />
      )}

      {editingCareer && (
        <CareerEditorDrawer
          initialCareer={editingCareer.item}
          isNew={editingCareer.isNew}
          onClose={() => setEditingCareer(null)}
          onSave={async (next) => {
            const idx = careers.findIndex((c) => c.id === next.id);
            await saveCareer(next, idx >= 0 ? idx : careers.length);
            showToast('success', `Career role "${next.title}" published live.`);
          }}
        />
      )}

      {editingFaq && (
        <FaqEditorDrawer
          initialFaq={editingFaq.item}
          isNew={editingFaq.isNew}
          onClose={() => setEditingFaq(null)}
          onSave={async (next) => {
            const idx = faqs.findIndex((f) => f.id === next.id);
            await saveFaq(next, idx >= 0 ? idx : faqs.length);
            showToast('success', 'FAQ item saved live.');
          }}
        />
      )}

      {/* Product Quick Preview Modal (Eye Action) */}
      {previewProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040B29]/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          onClick={() => setPreviewProduct(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] bg-slate-100">
              <ResilientImage
                src={previewProduct.image}
                alt={previewProduct.name}
                fallbackTitle={previewProduct.name}
                wrapperClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setPreviewProduct(null)}
                aria-label="Close product preview"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-[#07133B] flex items-center justify-center shadow cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#EFF5FF] text-[#0044FF] text-[11px] font-bold">
                    {previewProduct.categoryLabel}
                  </span>
                  <h3 className="text-lg font-extrabold text-[#07133B] mt-1">
                    {previewProduct.name}
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-slate-400 font-semibold">
                    {previewProduct.pricePrefix || 'Price'}
                  </div>
                  <div className="text-base font-extrabold text-[#0044FF] tabular-nums">
                    {previewProduct.priceAmount}
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {previewProduct.shortDesc}
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
                <a
                  href={`#/products/${previewProduct.id}`}
                  onClick={() => setPreviewProduct(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0044FF] hover:underline"
                >
                  <span>Open Public Detail Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const target = previewProduct;
                    setPreviewProduct(null);
                    setEditingProduct({ item: target, isNew: false });
                  }}
                  className="px-4 py-2 rounded-full bg-[#07133B] text-white text-xs font-semibold cursor-pointer"
                >
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inline Delete Confirmation Dialog */}
      {deletePrompt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040B29]/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          onClick={() => setDeletePrompt(null)}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-white border border-slate-200 p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-[#07133B]">
                Remove {deletePrompt.entityLabel}?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Are you sure you want to delete{' '}
                <span className="font-semibold text-[#07133B]">
                  {deletePrompt.itemName}
                </span>
                ? This removes it immediately from the live website.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeletePrompt(null)}
                className="px-4 py-2 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={() => void confirmDelete()}
                className="px-4 py-2 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-semibold cursor-pointer disabled:opacity-60"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
