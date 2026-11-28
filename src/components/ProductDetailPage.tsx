import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Check,
  ChevronLeft,
  ChevronRight,
  CloudRain,
  Cpu,
  Eye,
  Gauge,
  Globe,
  Headphones,
  Home,
  Maximize2,
  MessageCircle,
  Minus,
  Plus,
  Rocket,
  ShieldCheck,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import {
  formatXaf,
  type ProductFeatureItem,
  type ProductTrustItem,
  type SamitechProduct,
} from '../data/productsData';
import { useSiteContent } from '../context/SiteContentContext';
import { SAMITECH_EASE } from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';
import { CategoryTabIcon, WhatsAppCircleIcon } from './ProductsIcons';

export type ProductDetailTab = 'about' | 'specs' | 'box' | 'faq';

interface ProductDetailPageProps {
  product: SamitechProduct;
  onBackToProducts: () => void;
  onSelectProduct: (productId: string) => void;
  onNavigateHome: () => void;
  onOpenContact: (defaultCategory?: string) => void;
}

function TrustIcon({ icon }: { icon: ProductTrustItem['icon'] }) {
  switch (icon) {
    case 'speed':
      return <Zap className="w-6 h-6 text-[#0044FF] fill-[#0044FF]/15 shrink-0" strokeWidth={2.2} aria-hidden="true" />;
    case 'globe':
      return <Globe className="w-6 h-6 text-[#0044FF] shrink-0" strokeWidth={2.1} aria-hidden="true" />;
    case 'support':
      return <Headphones className="w-6 h-6 text-[#0044FF] shrink-0" strokeWidth={2.1} aria-hidden="true" />;
    case 'shield':
      return <ShieldCheck className="w-6 h-6 text-[#0044FF] shrink-0" strokeWidth={2.1} aria-hidden="true" />;
  }
}

function KeyFeatureIcon({ icon }: { icon: ProductFeatureItem['icon'] }) {
  const cls = 'w-7 h-7 sm:w-8 sm:h-8 text-[#0044FF] shrink-0';
  switch (icon) {
    case 'rocket':
      return <Rocket className={cls} strokeWidth={2} aria-hidden="true" />;
    case 'gauge':
      return <Gauge className={cls} strokeWidth={2} aria-hidden="true" />;
    case 'weather':
      return <CloudRain className={cls} strokeWidth={2} aria-hidden="true" />;
    case 'home':
      return <Home className={cls} strokeWidth={2} aria-hidden="true" />;
    case 'shield':
      return <ShieldCheck className={cls} strokeWidth={2} aria-hidden="true" />;
    case 'cpu':
      return <Cpu className={cls} strokeWidth={2} aria-hidden="true" />;
  }
}

export function ProductDetailPage({
  product,
  onBackToProducts,
  onSelectProduct,
  onNavigateHome,
  onOpenContact,
}: ProductDetailPageProps) {
  const { products, buildProductWhatsAppUrl } = useSiteContent();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [includeInstallation, setIncludeInstallation] = useState(true);
  const [activeTab, setActiveTab] = useState<ProductDetailTab>('about');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const tabsSectionRef = useRef<HTMLDivElement>(null);
  const thumbsRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
    setIncludeInstallation(true);
    setActiveTab('about');
    setOpenFaqIndex(0);
    setIsLightboxOpen(false);
  }, [product.id]);

  const gallery = product.gallery.length > 0
    ? product.gallery
    : [{ src: product.image, alt: product.imageAlt, label: product.name, studioWhiteBg: product.studioWhiteBg }];

  const currentImage = gallery[activeImageIndex] ?? gallery[0];

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') setActiveImageIndex((prev) => (prev + 1) % gallery.length);
      if (e.key === 'ArrowLeft') setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isLightboxOpen, gallery.length]);

  const handleJumpToSpecs = () => {
    setActiveTab('specs');
    window.setTimeout(() => {
      tabsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);
  };

  const whatsAppOrderUrl = useMemo(
    () => buildProductWhatsAppUrl(product, includeInstallation, quantity),
    [buildProductWhatsAppUrl, product, includeInstallation, quantity]
  );

  const computedTotalXaf =
    product.pricingType === 'fixed' && product.unitPriceXaf
      ? formatXaf(product.unitPriceXaf * quantity)
      : null;

  const relatedProducts = useMemo(
    () => products.filter((p) => p.id !== product.id).slice(0, 3),
    [products, product.id]
  );

  const tabs: { id: ProductDetailTab; label: string }[] = [
    { id: 'about', label: 'About This Product' },
    { id: 'specs', label: 'Specifications' },
    { id: 'box', label: "What's in the Box" },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <div className="min-h-screen bg-[#EEF3FA] text-[#07133B] pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-5 sm:space-y-7">
        {/* TOP BREADCRUMB NAVIGATION */}
        <nav
          aria-label="Breadcrumb"
          className="pt-2 sm:pt-3 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm"
        >
          <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-slate-500 font-medium min-w-0">
            <li>
              <button
                type="button"
                onClick={onNavigateHome}
                className="inline-flex items-center gap-1 hover:text-[#0044FF] transition-colors cursor-pointer"
                aria-label="Home"
              >
                <Home className="w-3.5 h-3.5 text-[#0044FF]" strokeWidth={2.1} aria-hidden="true" />
              </button>
            </li>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
            <li>
              <button
                type="button"
                onClick={onBackToProducts}
                className="font-bold text-[#0A1944] hover:text-[#0044FF] transition-colors cursor-pointer"
              >
                Products
              </button>
            </li>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
            <li className="hidden sm:inline text-slate-600">{product.categoryLabel}</li>
            <ChevronRight className="hidden sm:inline w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
            <li className="font-semibold text-[#0A1944] truncate max-w-[200px] sm:max-w-xs" aria-current="page">
              {product.name}
            </li>
          </ol>

          <button
            type="button"
            onClick={onBackToProducts}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0044FF] hover:text-[#0028B8] transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.2} aria-hidden="true" />
            <span>Back to Catalog</span>
          </button>
        </nav>

        {/* HERO PRODUCT STAGE: MULTI-IMAGE GALLERY (LEFT) + ORDER CONFIGURATOR (RIGHT) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-8 items-start">
          {/* LEFT: INTERACTIVE MULTI-IMAGE SHOWCASE & THUMBNAIL STRIP */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-3.5">
            <div
              className={`relative aspect-[16/10] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#DCE6F8] shadow-[0_14px_34px_rgba(12,35,96,0.09)] group ${
                currentImage.studioWhiteBg ? 'bg-white' : 'bg-[#061238]'
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${product.id}-img-${activeImageIndex}`}
                  initial={{ opacity: 0.35, scale: 1.01 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.35 }}
                  transition={{ duration: 0.22, ease: SAMITECH_EASE }}
                  className="w-full h-full cursor-zoom-in"
                  onClick={() => setIsLightboxOpen(true)}
                >
                  <ResilientImage
                    src={currentImage.src}
                    alt={currentImage.alt}
                    fallbackTitle={product.name}
                    priority
                    wrapperClassName="w-full h-full"
                    className={`w-full h-full ${
                      currentImage.studioWhiteBg ? 'object-contain p-4 sm:p-8' : 'object-cover'
                    }`}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Top-right Expand / Lightbox Trigger */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                aria-label="Inspect full-size product image"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-[#0A1944] hover:text-[#0044FF] border border-[#DCE6F8] shadow-md flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
              >
                <Maximize2 className="w-4 h-4" strokeWidth={2.2} aria-hidden="true" />
              </button>

              {/* Bottom-left Active Photo Caption + Counter */}
              <div className="pointer-events-none absolute bottom-3 left-3 sm:bottom-4 sm:left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#07133B]/80 backdrop-blur-sm text-white text-[11px] sm:text-xs font-semibold shadow-sm">
                <span>{currentImage.label}</span>
                <span className="text-white/60">·</span>
                <span className="tabular-nums text-sky-200">
                  {activeImageIndex + 1}/{gallery.length}
                </span>
              </div>

              {/* Left / Right Subtle Gallery Steppers */}
              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label="Previous product photo"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#0A1944] shadow-md border border-[#DCE6F8] flex items-center justify-center opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" strokeWidth={2.4} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label="Next product photo"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#0A1944] shadow-md border border-[#DCE6F8] flex items-center justify-center opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" strokeWidth={2.4} />
                  </button>
                </>
              )}
            </div>

            {/* THUMBNAIL STRIP WITH NEXT-IMAGE NAVIGATION */}
            <div className="relative flex items-center gap-2">
              <div
                ref={thumbsRowRef}
                className="flex-1 grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-2.5"
              >
                {gallery.map((item, index) => {
                  const isActive = index === activeImageIndex;
                  return (
                    <button
                      key={`${item.label}-${index}`}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      aria-label={`View image ${index + 1}: ${item.label}`}
                      aria-pressed={isActive}
                      className={`group/thumb relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all duration-150 cursor-pointer ${
                        item.studioWhiteBg ? 'bg-white' : 'bg-[#081542]'
                      } ${
                        isActive
                          ? 'border-[#0044FF] shadow-[0_4px_14px_rgba(0,68,255,0.28)] ring-2 ring-[#0044FF]/20'
                          : 'border-[#DCE6F8] hover:border-[#0044FF]/55 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <ResilientImage
                        src={item.src}
                        alt={item.alt}
                        fallbackTitle={item.label}
                        wrapperClassName="w-full h-full"
                        className={`w-full h-full ${
                          item.studioWhiteBg ? 'object-contain p-1' : 'object-cover'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {gallery.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextImage}
                  aria-label="Next gallery image"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0A1944] hover:bg-[#0044FF] text-white shadow-md flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.4} />
                </button>
              )}
            </div>
          </div>

          {/* RIGHT: STICKY PURCHASE & ORDER CONFIGURATION MODULE */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4 sm:space-y-5">
            {/* Metadata Tags Row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE6FA] text-[#0038DD] text-xs font-bold">
                <Box className="w-3.5 h-3.5" strokeWidth={2.2} aria-hidden="true" />
                <span>Hardware Kit</span>
              </span>

              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  product.availability === 'In Stock'
                    ? 'bg-emerald-100/90 text-emerald-700'
                    : product.availability === 'Pre-Order'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-[#E8F0FF] text-[#0044FF]'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    product.availability === 'In Stock'
                      ? 'bg-emerald-500'
                      : product.availability === 'Pre-Order'
                        ? 'bg-amber-500'
                        : 'bg-[#0044FF]'
                  }`}
                  aria-hidden="true"
                />
                <span>{product.availability}</span>
              </span>

              <span className="ml-auto font-mono text-[11px] font-semibold text-slate-500">
                SKU: {product.sku}
              </span>
            </div>

            {/* Product Headline & Short Description */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-[2.15rem] font-extrabold text-[#0A1944] tracking-[-0.02em] leading-[1.12] text-balance">
                {product.name}
              </h1>

              <p className="text-sm sm:text-[15px] text-[#334155] leading-relaxed font-medium">
                {product.shortDesc}
              </p>
            </div>

            {/* 4 Checkmark Key Highlights */}
            <ul className="space-y-2 pt-0.5">
              {product.heroHighlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-center gap-2.5 text-sm sm:text-[15px] font-semibold text-[#0A1944]"
                >
                  <Check
                    className="w-4 h-4 text-[#0044FF] shrink-0"
                    strokeWidth={3}
                    aria-hidden="true"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            {/* Price Block */}
            <div className="pt-1 space-y-1">
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#0A1944] tabular-nums flex flex-wrap items-baseline gap-1.5">
                {product.pricePrefix && (
                  <span className="text-base sm:text-lg font-bold text-[#0A1944]">
                    {product.pricePrefix}
                  </span>
                )}
                {product.pricingType === 'fixed' ? (
                  <>
                    <span className="text-[#0044FF]">{product.priceAmount.replace(' XAF', '')}</span>
                    <span className="text-lg sm:text-xl font-extrabold text-[#0044FF]">XAF</span>
                  </>
                ) : (
                  <span className="text-[#0044FF]">{product.priceAmount}</span>
                )}
              </div>

              {computedTotalXaf && quantity > 1 && (
                <p className="text-xs sm:text-sm font-semibold text-[#0044FF] tabular-nums">
                  Estimated Total ({quantity} units): {computedTotalXaf}
                </p>
              )}
            </div>

            {/* Optional SAMITECH Installation Toggle */}
            <button
              type="button"
              role="switch"
              aria-checked={includeInstallation}
              onClick={() => setIncludeInstallation((prev) => !prev)}
              className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                includeInstallation
                  ? 'bg-[#E8F0FF]/80 border-[#0044FF]/35 text-[#0A1944]'
                  : 'bg-white border-[#DCE6F8] text-slate-600'
              }`}
            >
              <span className="flex items-center gap-2 text-left">
                <Wrench className="w-4 h-4 text-[#0044FF] shrink-0" aria-hidden="true" />
                <span>Include SAMITECH professional installation &amp; setup</span>
              </span>
              <span
                className={`w-9 h-5 rounded-full p-0.5 flex items-center transition-colors shrink-0 ${
                  includeInstallation ? 'bg-[#0044FF] justify-end' : 'bg-slate-300 justify-start'
                }`}
                aria-hidden="true"
              >
                <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </span>
            </button>

            {/* Stepper + Order via WhatsApp + View Specs CTA Cluster */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 sm:gap-3">
                {/* Quantity Stepper Pill */}
                <div className="inline-flex items-center h-11 sm:h-12 px-1.5 rounded-full bg-white border border-[#C7D7F9] shadow-xs shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#0A1944] hover:bg-[#EEF3FF] disabled:opacity-35 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <Minus className="w-3.5 h-3.5" strokeWidth={2.4} />
                  </button>
                  <span
                    className="w-8 text-center font-bold text-sm sm:text-base text-[#0A1944] tabular-nums"
                    aria-live="polite"
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                    aria-label="Increase quantity"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#0A1944] hover:bg-[#EEF3FF] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" strokeWidth={2.4} />
                  </button>
                </div>

                {/* Primary Order via WhatsApp Button */}
                <a
                  href={whatsAppOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-11 sm:h-12 inline-flex items-center justify-center gap-2 px-4 sm:px-6 rounded-full bg-gradient-to-r from-[#003BFF] to-[#0070FF] hover:from-[#002BD6] hover:to-[#0055EE] text-white text-sm sm:text-[15px] font-bold shadow-[0_8px_22px_rgba(0,68,255,0.32)] hover:shadow-[0_12px_28px_rgba(0,68,255,0.42)] active:scale-[0.98] transition-all whitespace-nowrap"
                >
                  <WhatsAppCircleIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                  <span>
                    {product.pricingType === 'fixed' ? 'Order via WhatsApp' : 'Quote via WhatsApp'}
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={2.2} aria-hidden="true" />
                </a>
              </div>

              {/* Secondary Outlined View Specs CTA */}
              <button
                type="button"
                onClick={handleJumpToSpecs}
                className="w-full h-11 inline-flex items-center justify-center gap-2 px-5 rounded-full bg-white border border-[#0044FF]/35 hover:border-[#0044FF] hover:bg-[#F2F6FF] text-[#0A1944] hover:text-[#0044FF] text-sm font-bold transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#0044FF]" strokeWidth={2} aria-hidden="true" />
                <span>View Specs</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.2} aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        {/* FULL-WIDTH 4-COLUMN TRUST & FEATURE BAR */}
        <section aria-label="Product reliability highlights">
          <div className="rounded-2xl bg-white/95 border border-[#DCE6F8] shadow-[0_10px_28px_rgba(12,35,96,0.06)] px-4 py-4 sm:px-6 sm:py-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x lg:divide-[#DCE6F8]">
              {product.trustStrip.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-start lg:justify-center gap-3 lg:px-5"
                >
                  <TrustIcon icon={item.icon} />
                  <span className="text-xs sm:text-sm font-extrabold text-[#0038DD] leading-snug">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEGMENTED INTERACTIVE TABS & DETAILED CONTENT SECTION */}
        <section ref={tabsSectionRef} id="product-details-tabs" className="scroll-mt-24 space-y-0">
          {/* Tab Switcher Row */}
          <div
            role="tablist"
            aria-label="Product information tabs"
            className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 sm:pb-0 sm:px-2"
          >
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-t-2xl sm:rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'text-white shadow-[0_6px_18px_rgba(0,68,255,0.28)]'
                      : 'bg-white/80 hover:bg-white text-[#0A1944] border border-[#DCE6F8]'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="product-detail-active-tab"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-t-2xl sm:rounded-full bg-gradient-to-r from-[#003BFF] to-[#0070FF]"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main Tab Content Area */}
          <div className="pt-3 sm:pt-4">
            <AnimatePresence mode="wait">
              {activeTab === 'about' && (
                <motion.div
                  key="tab-about"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: SAMITECH_EASE }}
                  className="space-y-5"
                >
                  {/* Split Card: About Narrative (Left) + Ice-Blue Key Features (Right) */}
                  <div className="rounded-2xl bg-white border border-[#DCE6F8] shadow-[0_12px_30px_rgba(12,35,96,0.06)] p-5 sm:p-7 lg:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                      <div className="lg:col-span-7 space-y-4">
                        <div>
                          <h2 className="text-lg sm:text-xl font-extrabold text-[#0A1944]">
                            About This Product
                          </h2>
                          <div className="mt-1.5 h-[3px] w-16 rounded-full bg-[#0044FF]" />
                        </div>

                        <p className="text-sm sm:text-[15px] text-[#334155] leading-relaxed">
                          {product.longDescription}
                        </p>

                        <ul className="space-y-2.5 pt-1">
                          {product.aboutBullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-start gap-2.5 text-sm font-medium text-[#0A1944]"
                            >
                              <Check
                                className="w-4 h-4 text-[#0055FF] shrink-0 mt-0.5"
                                strokeWidth={2.8}
                                aria-hidden="true"
                              />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Key Features Ice-Blue Panel */}
                      <div className="lg:col-span-5 rounded-2xl bg-[#EEF4FF] border border-[#DCE6F8] p-5 sm:p-6 flex flex-col justify-between space-y-4">
                        <h3 className="text-lg sm:text-xl font-extrabold text-[#0A1944]">
                          Key Features
                        </h3>

                        <div className="space-y-4 flex-1 flex flex-col justify-center">
                          {product.keyFeatures.map((feat) => (
                            <div key={feat.label} className="flex items-center gap-4">
                              <div className="w-11 h-11 rounded-xl bg-white border border-[#DCE6F8] shadow-xs flex items-center justify-center shrink-0">
                                <KeyFeatureIcon icon={feat.icon} />
                              </div>
                              <span className="text-sm sm:text-base font-bold text-[#0A1944]">
                                {feat.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3-Column Lower Row: Specifications | What's Included | Dark Promo Card */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 items-stretch">
                    {/* Col 1: Specifications Key-Value Table */}
                    <div className="lg:col-span-4 rounded-2xl bg-white border border-[#DCE6F8] shadow-[0_10px_28px_rgba(12,35,96,0.06)] p-5 sm:p-6 flex flex-col">
                      <div className="mb-3">
                        <h3 className="text-lg font-extrabold text-[#0044FF]">Specifications</h3>
                        <div className="mt-1.5 h-[3px] w-16 rounded-full bg-[#0044FF]" />
                      </div>

                      <dl className="divide-y divide-slate-100 text-xs sm:text-sm flex-1">
                        {product.technicalSpecs.map((row) => (
                          <div key={row.label} className="py-2.5 grid grid-cols-12 gap-2 items-center">
                            <dt className="col-span-5 font-bold text-[#0A1944]">{row.label}</dt>
                            <dd className="col-span-7 text-slate-600 font-medium border-l border-slate-100 pl-3">
                              {row.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    {/* Col 2: What's Included 4-Thumbnail Visual Grid */}
                    <div className="lg:col-span-4 rounded-2xl bg-white border border-[#DCE6F8] shadow-[0_10px_28px_rgba(12,35,96,0.06)] p-5 sm:p-6 flex flex-col">
                      <div className="mb-4">
                        <h3 className="text-lg font-extrabold text-[#0044FF]">What&apos;s Included</h3>
                        <div className="mt-1.5 h-[3px] w-16 rounded-full bg-[#0044FF]" />
                      </div>

                      <div className="grid grid-cols-2 gap-3 flex-1">
                        {product.includedVisuals.slice(0, 4).map((item) => (
                          <div
                            key={item.title}
                            className="rounded-xl border border-[#DCE6F8] bg-[#F8FAFF] p-2.5 flex flex-col items-center justify-between text-center gap-2"
                          >
                            <div
                              className={`w-full aspect-[4/3] rounded-lg overflow-hidden ${
                                item.studioWhiteBg ? 'bg-white' : 'bg-[#081542]'
                              }`}
                            >
                              <ResilientImage
                                src={item.image}
                                alt={item.title}
                                fallbackTitle={item.title}
                                wrapperClassName="w-full h-full"
                                className={`w-full h-full ${
                                  item.studioWhiteBg ? 'object-contain p-1' : 'object-cover'
                                }`}
                              />
                            </div>
                            <span className="text-[11px] sm:text-xs font-bold text-[#0A1944] leading-tight">
                              {item.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Col 3: Cosmic Space-Blue Promo CTA Card */}
                    <div className="md:col-span-2 lg:col-span-4 relative rounded-2xl overflow-hidden bg-[#061854] border border-[#0044FF]/30 shadow-[0_14px_34px_rgba(6,24,84,0.28)] p-6 flex flex-col justify-end min-h-[250px] text-white">
                      <ResilientImage
                        src={product.promoBanner.image}
                        alt={product.promoBanner.title}
                        fallbackTitle={product.promoBanner.title}
                        darkSkeleton
                        wrapperClassName="absolute inset-0 w-full h-full"
                        className="w-full h-full object-cover opacity-55"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-[#030D36] via-[#04144D]/80 to-[#051B66]/45"
                        aria-hidden="true"
                      />

                      <div className="relative z-10 space-y-3 text-center sm:text-left">
                        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight text-balance">
                          {product.promoBanner.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed">
                          {product.promoBanner.subtitle}
                        </p>
                        <div className="pt-1 flex justify-center sm:justify-start">
                          <a
                            href={whatsAppOrderUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-[#F0F5FF] text-[#003BFF] text-sm font-extrabold shadow-lg transition-all hover:scale-[1.03] active:scale-[0.98]"
                          >
                            <span>Order Now</span>
                            <ArrowRight className="w-4 h-4" strokeWidth={2.4} aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'specs' && (
                <motion.div
                  key="tab-specs"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: SAMITECH_EASE }}
                  className="rounded-2xl bg-white border border-[#DCE6F8] shadow-[0_12px_30px_rgba(12,35,96,0.06)] p-5 sm:p-7 lg:p-8 space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg sm:text-xl font-extrabold text-[#0A1944]">
                        Technical Specifications — {product.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Verified by SAMITECH engineering before dispatch or on-site installation.
                      </p>
                    </div>
                    <a
                      href={whatsAppOrderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EEF3FF] hover:bg-[#DCE6FA] text-[#0044FF] text-xs sm:text-sm font-bold transition-colors"
                    >
                      <WhatsAppCircleIcon />
                      <span>Confirm Specs on WhatsApp</span>
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <dl className="divide-y divide-slate-100 rounded-xl border border-[#DCE6F8] bg-[#F9FBFF] px-4 py-2">
                      {product.technicalSpecs.map((row) => (
                        <div key={row.label} className="py-3 flex items-center justify-between gap-4 text-sm">
                          <dt className="font-bold text-[#0A1944]">{row.label}</dt>
                          <dd className="text-slate-600 font-medium text-right">{row.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="rounded-xl border border-[#DCE6F8] bg-[#EEF4FF]/70 p-5 space-y-4">
                      <h3 className="text-base font-extrabold text-[#0A1944]">
                        Deployment &amp; Support Highlights
                      </h3>
                      <ul className="space-y-2.5">
                        {product.heroHighlights.concat(product.aboutBullets).slice(0, 5).map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-[#0A1944]">
                            <Check className="w-4 h-4 text-[#0044FF] shrink-0 mt-0.5" strokeWidth={2.6} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => onOpenContact(product.categoryLabel)}
                          className="text-xs sm:text-sm font-bold text-[#0044FF] hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Need a custom engineering site survey? Request quote</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'box' && (
                <motion.div
                  key="tab-box"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: SAMITECH_EASE }}
                  className="rounded-2xl bg-white border border-[#DCE6F8] shadow-[0_12px_30px_rgba(12,35,96,0.06)] p-5 sm:p-7 lg:p-8 space-y-6"
                >
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-[#0A1944]">
                      What&apos;s Included in the Package
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Complete hardware components packed and bench-tested for plug-and-play operation.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {product.includedVisuals.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-xl border border-[#DCE6F8] bg-[#F8FAFF] p-3 flex flex-col items-center text-center gap-2.5"
                      >
                        <div
                          className={`w-full aspect-[4/3] rounded-lg overflow-hidden ${
                            item.studioWhiteBg ? 'bg-white' : 'bg-[#081542]'
                          }`}
                        >
                          <ResilientImage
                            src={item.image}
                            alt={item.title}
                            fallbackTitle={item.title}
                            wrapperClassName="w-full h-full"
                            className={`w-full h-full ${
                              item.studioWhiteBg ? 'object-contain p-1.5' : 'object-cover'
                            }`}
                          />
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-[#0A1944]">{item.title}</span>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-[#DCE6F8] bg-[#F9FBFF] p-5 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Itemized Checklist
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.whatsInBox.map((line) => (
                        <li key={line} className="flex items-start gap-2.5 text-sm font-medium text-[#0A1944]">
                          <Check className="w-4 h-4 text-[#0055FF] shrink-0 mt-0.5" strokeWidth={2.8} />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === 'faq' && (
                <motion.div
                  key="tab-faq"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: SAMITECH_EASE }}
                  className="rounded-2xl bg-white border border-[#DCE6F8] shadow-[0_12px_30px_rgba(12,35,96,0.06)] p-5 sm:p-7 lg:p-8 space-y-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg sm:text-xl font-extrabold text-[#0A1944]">
                        Frequently Asked Questions
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Everything you need to know before ordering {product.name}.
                      </p>
                    </div>
                    <a
                      href={whatsAppOrderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#003BFF] to-[#0070FF] text-white text-xs sm:text-sm font-bold shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Ask Us on WhatsApp</span>
                    </a>
                  </div>

                  <div className="divide-y divide-[#DCE6F8] rounded-xl border border-[#DCE6F8] overflow-hidden">
                    {product.faqs.map((faq, index) => {
                      const isOpen = openFaqIndex === index;
                      return (
                        <div key={faq.question} className="bg-white">
                          <button
                            type="button"
                            onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                            aria-expanded={isOpen}
                            className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-[#F7FAFF] transition-colors cursor-pointer"
                          >
                            <span className="text-sm sm:text-base font-bold text-[#0A1944]">
                              {faq.question}
                            </span>
                            <span className="w-7 h-7 rounded-full bg-[#EEF3FF] text-[#0044FF] flex items-center justify-center shrink-0">
                              {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                            </span>
                          </button>
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: SAMITECH_EASE }}
                                className="overflow-hidden"
                              >
                                <p className="px-5 pb-4 text-sm text-[#334155] leading-relaxed">
                                  {faq.answer}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* EXPLORE MORE HARDWARE STRIP */}
        <section className="pt-4 sm:pt-6 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#0A1944]">
              Explore More Tested Hardware
            </h2>
            <button
              type="button"
              onClick={onBackToProducts}
              className="text-xs sm:text-sm font-bold text-[#0044FF] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>All Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
            {relatedProducts.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectProduct(item.id)}
                className="group text-left rounded-2xl bg-white border border-[#DCE6F8] hover:border-[#0044FF]/55 shadow-sm hover:shadow-md p-3.5 sm:p-4 flex items-center gap-3.5 transition-all cursor-pointer"
              >
                <div
                  className={`w-20 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-100 ${
                    item.studioWhiteBg ? 'bg-white' : 'bg-[#081542]'
                  }`}
                >
                  <ResilientImage
                    src={item.image}
                    alt={item.imageAlt}
                    fallbackTitle={item.name}
                    wrapperClassName="w-full h-full"
                    className={`w-full h-full ${
                      item.studioWhiteBg ? 'object-contain p-1' : 'object-cover'
                    } group-hover:scale-105 transition-transform duration-300`}
                  />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="inline-flex items-center gap-1 text-[10.5px] font-bold text-[#0044FF]">
                    <CategoryTabIcon category={item.category} className="w-3 h-3" />
                    <span className="truncate">{item.categoryLabel}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-[#0A1944] group-hover:text-[#0044FF] transition-colors truncate">
                    {item.name}
                  </div>
                  <div className="text-xs font-bold text-slate-600 tabular-nums">
                    {item.pricePrefix ? `${item.pricePrefix} ` : ''}
                    <span className="text-[#0044FF]">{item.priceAmount}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0044FF] shrink-0" />
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* FULLSCREEN IMAGE LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: SAMITECH_EASE }}
            onClick={() => setIsLightboxOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${product.name} image gallery`}
            className="fixed inset-0 z-50 bg-[#040B29]/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
          >
            <div
              className="relative w-full max-w-5xl space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between text-white">
                <div>
                  <div className="text-sm sm:text-base font-bold">{product.name}</div>
                  <div className="text-xs text-sky-200">
                    {currentImage.label} ({activeImageIndex + 1} of {gallery.length})
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  aria-label="Close fullscreen gallery"
                  className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div
                className={`relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/15 ${
                  currentImage.studioWhiteBg ? 'bg-white' : 'bg-[#07133B]'
                }`}
              >
                <ResilientImage
                  src={currentImage.src}
                  alt={currentImage.alt}
                  fallbackTitle={product.name}
                  priority
                  wrapperClassName="w-full h-full"
                  className={`w-full h-full ${
                    currentImage.studioWhiteBg ? 'object-contain p-6 sm:p-10' : 'object-contain'
                  }`}
                />

                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#0A1944] shadow-lg flex items-center justify-center cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#0A1944] shadow-lg flex items-center justify-center cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
