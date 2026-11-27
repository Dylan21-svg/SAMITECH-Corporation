import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Check,
  Eye,
  FileText,
  Star,
  Wrench,
  X,
} from 'lucide-react';
import {
  buildGeneralHardwareWhatsAppUrl,
  buildProductWhatsAppUrl,
  FEATURED_STARLINK_PRODUCT,
  PRODUCT_CATEGORIES,
  PRODUCTS_HERO_MEDIA,
  SAMITECH_PRODUCTS,
  type ProductCategoryId,
  type SamitechProduct,
} from '../data/productsData';
import { Reveal, SAMITECH_EASE } from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';
import {
  CategoryTabIcon,
  FeaturedSpecIcon,
  ProductsCubeIcon,
  TrustBoltSolidIcon,
  TrustHeadsetBoldIcon,
  TrustShieldSolidIcon,
  WhatsAppCircleIcon,
} from './ProductsIcons';

interface ProductsPageProps {
  onNavigateServices: () => void;
  onOpenContact: (defaultCategory?: string) => void;
}

export function ProductsPage({
  onNavigateServices,
  onOpenContact,
}: ProductsPageProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategoryId>('all');
  const [selectedProduct, setSelectedProduct] = useState<SamitechProduct | null>(null);
  const [includeInstallInModal, setIncludeInstallInModal] = useState(true);

  useEffect(() => {
    if (!selectedProduct) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct]);

  const visibleProducts = useMemo(() => {
    if (activeCategory === 'all') return SAMITECH_PRODUCTS;
    return SAMITECH_PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const showFeaturedSpotlight =
    activeCategory === 'all' || activeCategory === 'networking-starlink';

  return (
    <div className="bg-[#EEF3FA] text-[#07133B] overflow-x-clip">
      {/* PREMIUM LIGHT HERO WITH INTEGRATED HARDWARE & SKYLINE COMPOSITION */}
      <section className="relative overflow-hidden bg-white pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24">
        {/* Seamless Full-Bleed Right-Anchored Hardware Composition */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <img
            src={PRODUCTS_HERO_MEDIA.heroShowcase}
            alt=""
            className="w-full h-full object-cover object-[78%_center] lg:object-right opacity-30 sm:opacity-55 lg:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 via-38% lg:from-white/95 lg:via-white/60 lg:via-32% to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#EEF3FA] to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal immediate direction="left" className="max-w-xl space-y-5">
            {/* Soft Ice-Blue Kicker with 3D Cube Icon */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCE6FA]/95 border border-[#C7D7F9] text-xs sm:text-sm font-bold text-[#07133B] shadow-xs">
              <ProductsCubeIcon />
              <span>Our Products</span>
            </div>

            <h1
              className="font-extrabold tracking-[-0.025em] leading-[1.08] text-[#0A1944] text-balance"
              style={{ fontSize: 'clamp(2.15rem, 4.1vw, 3.4rem)' }}
            >
              Tested Infrastructure &amp;
              <span className="block">Pre-Configured Hardware</span>
              <span className="block">
                Built for <span className="text-[#0070FF]">Reliability</span>
              </span>
            </h1>

            <p className="max-w-md text-sm sm:text-base text-[#2D3B5E] leading-relaxed font-medium">
              Get the right technology to power your business, school or organization — with
              expert support.
            </p>

            {/* 3-Column Feature Trust Row with Bold Solid Royal-Blue Icons */}
            <div className="pt-2 inline-flex flex-wrap items-center gap-x-6 gap-y-3 sm:divide-x sm:divide-[#C4D3EE]">
              <div className="flex items-center gap-2.5 pr-1">
                <TrustShieldSolidIcon />
                <div className="text-xs sm:text-sm font-extrabold text-[#0A1944] leading-tight">
                  Trusted
                  <span className="block">Quality</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:pl-6 pr-1">
                <TrustBoltSolidIcon />
                <div className="text-xs sm:text-sm font-extrabold text-[#0A1944] leading-tight">
                  Ready to
                  <span className="block">Deploy</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:pl-6">
                <TrustHeadsetBoldIcon />
                <div className="text-xs sm:text-sm font-extrabold text-[#0A1944] leading-tight">
                  Expert
                  <span className="block">Support</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FLOATING 4-TAB CATEGORY FILTER BAR */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-9 sm:-mt-10">
        <div
          role="tablist"
          aria-label="Filter hardware products by category"
          className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-0 p-2 sm:p-2.5 rounded-2xl bg-white border border-[#DCE6F8] shadow-[0_14px_34px_rgba(12,35,96,0.09)]"
        >
          {PRODUCT_CATEGORIES.map((category, index) => {
            const isSelected = activeCategory === category.id;
            return (
              <div
                key={category.id}
                className={`flex items-center justify-center ${
                  index > 0 ? 'lg:border-l lg:border-slate-200/90' : ''
                } px-1.5`}
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center justify-center gap-2.5 px-4 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#003BFF] to-[#0070FF] text-white shadow-[0_6px_18px_rgba(0,68,255,0.28)]'
                      : 'text-[#0A1944] hover:text-[#0044FF] hover:bg-[#F3F7FF]'
                  }`}
                >
                  <CategoryTabIcon category={category.id} active={isSelected} />
                  <span className="truncate">{category.label}</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* MAIN PRODUCT CATALOG CONTENT */}
      <section className="py-7 sm:py-9 lg:py-11">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7 sm:space-y-8">
          {/* FEATURED PRODUCT HORIZONTAL SPOTLIGHT CARD */}
          {showFeaturedSpotlight && (
            <Reveal direction="bottom" delay={0.04}>
              <article className="rounded-2xl bg-white border border-[#DCE6F8] shadow-[0_12px_30px_rgba(12,35,96,0.07)] p-4 sm:p-5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">
                  {/* Left Starlink Dish + Box Mountain Photo */}
                  <div className="lg:col-span-5 relative aspect-[16/10] rounded-xl overflow-hidden bg-[#040B29]">
                    <ResilientImage
                      src={FEATURED_STARLINK_PRODUCT.image}
                      alt={FEATURED_STARLINK_PRODUCT.imageAlt}
                      fallbackTitle={FEATURED_STARLINK_PRODUCT.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#0044FF] to-[#0066FF] text-white text-xs font-bold shadow-md">
                      <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" aria-hidden="true" />
                      <span>Featured Product</span>
                    </div>
                  </div>

                  {/* Right Details + 3 Highlight Icons + Bottom Price & CTAs */}
                  <div className="lg:col-span-7 flex flex-col justify-between gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      <div className="sm:col-span-8 space-y-2">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F0FF] text-xs font-bold text-[#0044FF]">
                          <CategoryTabIcon category="networking-starlink" className="w-3.5 h-3.5" />
                          <span>{FEATURED_STARLINK_PRODUCT.categoryLabel}</span>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A1944] tracking-tight">
                          {FEATURED_STARLINK_PRODUCT.name}
                        </h2>

                        <p className="text-sm text-[#3E4C6E] leading-relaxed">
                          {FEATURED_STARLINK_PRODUCT.shortDesc}
                        </p>

                        <ul className="space-y-1.5 pt-1">
                          {FEATURED_STARLINK_PRODUCT.specs.map((spec) => (
                            <li
                              key={spec}
                              className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0A1944]"
                            >
                              <Check className="w-4 h-4 text-[#0055FF] shrink-0" strokeWidth={2.8} aria-hidden="true" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right 3 Feature Icons Column */}
                      <div className="sm:col-span-4 sm:border-l sm:border-slate-200/85 sm:pl-5 space-y-3.5">
                        {FEATURED_STARLINK_PRODUCT.featuredHighlights?.map((item) => (
                          <div key={item.label} className="flex items-center gap-2.5">
                            <FeaturedSpecIcon type={item.icon} />
                            <span className="text-xs sm:text-sm font-bold text-[#0A1944]">
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price + Dual Pill Buttons */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="font-display font-extrabold text-xl sm:text-2xl text-[#0A1944] tabular-nums">
                        <span className="text-sm sm:text-base font-bold mr-1">
                          {FEATURED_STARLINK_PRODUCT.pricePrefix}
                        </span>
                        <span>450,000 </span>
                        <span className="text-[#0044FF]">XAF</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5">
                        <a
                          href={buildProductWhatsAppUrl(FEATURED_STARLINK_PRODUCT, true)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0044FF] to-[#0070FF] hover:from-[#0033CC] hover:to-[#0055FF] text-white text-xs sm:text-sm font-bold shadow-[0_6px_16px_rgba(0,68,255,0.28)] transition-all whitespace-nowrap"
                        >
                          <WhatsAppCircleIcon />
                          <span>Order via WhatsApp</span>
                          <ArrowRight className="w-3.5 h-3.5 shrink-0" strokeWidth={2.2} aria-hidden="true" />
                        </a>

                        <button
                          type="button"
                          onClick={() => setSelectedProduct(FEATURED_STARLINK_PRODUCT)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-[#0044FF]/35 hover:border-[#0044FF] hover:bg-[#F2F6FF] text-[#0044FF] text-xs sm:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer"
                        >
                          <span>View Details</span>
                          <Eye className="w-4 h-4 shrink-0" strokeWidth={1.9} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          )}

          {/* 3-COLUMN STUDIO PRODUCT CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProducts.map((product, index) => (
              <Reveal
                key={product.id}
                direction="bottom"
                delay={0.04 + (index % 3) * 0.05}
                wrapperClassName="h-full"
                className="h-full"
              >
                <article className="group h-full flex flex-col justify-between rounded-2xl bg-white border border-[#DCE6F8] hover:border-[#0055FF]/50 shadow-[0_10px_28px_rgba(12,35,96,0.06)] hover:shadow-[0_18px_36px_rgba(0,68,255,0.11)] hover:-translate-y-0.5 transition-all duration-200 p-5 sm:p-6">
                  <div>
                    {/* Top Metadata Row */}
                    <div className="flex items-center justify-between gap-2 pb-3">
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0044FF]">
                        <CategoryTabIcon category={product.category} className="w-3.5 h-3.5" />
                        <span>{product.categoryLabel}</span>
                      </div>

                      <span
                        className={`text-xs font-bold whitespace-nowrap ${
                          product.availability === 'In Stock'
                            ? 'text-emerald-700'
                            : product.availability === 'Pre-Order'
                              ? 'text-amber-600'
                              : 'text-[#0044FF]'
                        }`}
                      >
                        {product.availability}
                      </span>
                    </div>

                    {/* Crisp Studio Product Photography */}
                    <div
                      className={`aspect-[4/3] w-full rounded-xl overflow-hidden mb-4 ${
                        product.studioWhiteBg ? 'bg-white' : 'bg-[#F6F9FF]'
                      }`}
                    >
                      <ResilientImage
                        src={product.image}
                        alt={product.imageAlt}
                        fallbackTitle={product.name}
                        className={`w-full h-full ${
                          product.studioWhiteBg ? 'object-contain p-1' : 'object-cover'
                        } group-hover:scale-[1.03] transition-transform duration-300`}
                      />
                    </div>

                    {/* Title, Description & 3 Checkmark Specs */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-extrabold text-[#0A1944] group-hover:text-[#0044FF] transition-colors leading-snug">
                        {product.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#3E4C6E] leading-relaxed">
                        {product.shortDesc}
                      </p>

                      <ul className="space-y-1.5 pt-1">
                        {product.specs.map((spec) => (
                          <li
                            key={spec}
                            className="flex items-start gap-2 text-xs sm:text-[13px] font-semibold text-[#0A1944] leading-snug"
                          >
                            <Check
                              className="w-4 h-4 text-[#0055FF] shrink-0 mt-0.5"
                              strokeWidth={2.8}
                              aria-hidden="true"
                            />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Price + Dual Action Buttons */}
                  <div className="pt-4 mt-4 space-y-3">
                    <div className="font-display font-extrabold text-lg sm:text-xl text-[#0A1944] tabular-nums">
                      {product.pricePrefix && (
                        <span className="text-sm font-bold mr-1.5">{product.pricePrefix}</span>
                      )}
                      {product.pricingType === 'fixed' ? (
                        <>
                          <span>{product.priceAmount.replace(' XAF', '')} </span>
                          <span className="text-[#0044FF]">XAF</span>
                        </>
                      ) : (
                        <span className="text-[#0044FF]">{product.priceAmount}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={buildProductWhatsAppUrl(product, false)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-[#0044FF] to-[#0070FF] hover:from-[#0033CC] hover:to-[#0055FF] text-white text-xs font-bold shadow-[0_4px_12px_rgba(0,68,255,0.25)] transition-all whitespace-nowrap"
                      >
                        <WhatsAppCircleIcon className="w-3.5 h-3.5" />
                        <span>
                          {product.pricingType === 'fixed' ? 'Order via WhatsApp' : 'Quote on WhatsApp'}
                        </span>
                      </a>

                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-full bg-white border border-[#0044FF]/35 hover:border-[#0044FF] hover:bg-[#F2F6FF] text-[#0044FF] text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>View Specs</span>
                        <Eye className="w-3.5 h-3.5 shrink-0" strokeWidth={1.9} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* BOTTOM "PRODUCT + INSTALLATION" BANNER WITH INTERACTIVE ACTION BUTTONS */}
          <Reveal direction="bottom" delay={0.08}>
            <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-[#DCE6F8] shadow-[0_20px_48px_rgba(10,25,68,0.14)] bg-[#061854]">
              {/* Panoramic Banner with Container-Scaled Interactive Button Overlays on ALL Devices */}
              <div
                className="relative w-full aspect-[969/193] bg-[#061854]"
                style={{ containerType: 'inline-size' }}
              >
                <ResilientImage
                  src={PRODUCTS_HERO_MEDIA.bottomBanner}
                  alt="Product + Installation = Complete Peace of Mind — SAMITECH hardware kits with optional professional installation and custom quotes"
                  width={969}
                  height={193}
                  className="w-full h-full object-fill block"
                />

                {/* Overlaid Interactive "Learn More" Button — always directly over left slot */}
                <button
                  type="button"
                  onClick={onNavigateServices}
                  aria-label="Learn More about installation services"
                  className="inline-flex group/btn absolute left-[2.1%] bottom-[5%] w-[13.2%] h-[18.6%] items-center justify-center gap-[0.4cqw] rounded-full bg-white hover:bg-[#F0F5FF] text-[#0038FF] text-[1.15cqw] font-extrabold shadow-[0_4px_14px_rgba(4,11,41,0.22)] hover:shadow-[0_8px_22px_rgba(255,255,255,0.45)] hover:scale-[1.04] active:scale-[0.96] transition-all duration-200 ease-out whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white before:content-[''] before:absolute before:-inset-2 sm:before:-inset-1"
                >
                  <span>Learn More</span>
                  <ArrowRight
                    className="w-[1.15cqw] h-[1.15cqw] group-hover/btn:translate-x-0.5 transition-transform duration-150 shrink-0"
                    strokeWidth={2.4}
                    aria-hidden="true"
                  />
                </button>

                {/* Overlaid Interactive "Request a Quote" Button — always directly over right slot */}
                <a
                  href={buildGeneralHardwareWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Request a Quote on WhatsApp"
                  className="inline-flex group/btn absolute right-[2.6%] bottom-[14.8%] w-[19.7%] h-[21.8%] items-center justify-center gap-[0.5cqw] rounded-full bg-gradient-to-r from-[#003BFF] to-[#0070FF] hover:from-[#002BD6] hover:to-[#0055EE] text-white text-[1.15cqw] font-extrabold shadow-[0_6px_18px_rgba(0,68,255,0.34)] hover:shadow-[0_10px_24px_rgba(0,68,255,0.5)] hover:scale-[1.04] active:scale-[0.96] transition-all duration-200 ease-out whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0044FF] before:content-[''] before:absolute before:-inset-2 sm:before:-inset-1"
                >
                  <FileText
                    className="w-[1.2cqw] h-[1.2cqw] group-hover/btn:-rotate-3 transition-transform duration-150 shrink-0"
                    strokeWidth={2.1}
                    aria-hidden="true"
                  />
                  <span>Request a Quote</span>
                  <ArrowRight
                    className="w-[1.15cqw] h-[1.15cqw] group-hover/btn:translate-x-0.5 transition-transform duration-150 shrink-0"
                    strokeWidth={2.4}
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRODUCT SPECS & WHATSAPP ORDER MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: SAMITECH_EASE }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040B29]/75 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: SAMITECH_EASE }}
              className="w-full max-w-2xl rounded-2xl bg-white border border-[#DCE6F8] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`relative aspect-[16/9] border-b border-slate-200 ${
                  selectedProduct.studioWhiteBg ? 'bg-white' : 'bg-[#F1F5F9]'
                }`}
              >
                <ResilientImage
                  src={selectedProduct.image}
                  alt={selectedProduct.imageAlt}
                  fallbackTitle={selectedProduct.name}
                  className={`w-full h-full ${
                    selectedProduct.studioWhiteBg ? 'object-contain p-4' : 'object-cover'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  aria-label="Close product details"
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-[#0A1944] flex items-center justify-center shadow-md border border-slate-200 cursor-pointer"
                >
                  <X className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>

              <div className="p-6 sm:p-7 space-y-5">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className="text-[#0044FF]">{selectedProduct.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{selectedProduct.sku}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700">{selectedProduct.availability}</span>
                  </div>

                  <h3 id="product-modal-title" className="text-xl sm:text-2xl font-extrabold text-[#0A1944]">
                    {selectedProduct.name}
                  </h3>

                  <p className="text-sm text-[#3E4C6E] leading-relaxed">
                    {selectedProduct.shortDesc}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    What&apos;s Included
                  </div>
                  <ul className="space-y-2">
                    {selectedProduct.whatsInBox.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#0A1944]">
                        <Check className="w-4 h-4 text-[#0055FF] shrink-0 mt-0.5" strokeWidth={2.5} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Optional Installation Switch */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={includeInstallInModal}
                  onClick={() => setIncludeInstallInModal((prev) => !prev)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    includeInstallInModal
                      ? 'bg-[#EEF3FF] border-[#0044FF]/35 text-[#0A1944]'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-[#0044FF]" aria-hidden="true" />
                    <span>Include SAMITECH installation &amp; configuration</span>
                  </span>
                  <span
                    className={`w-9 h-5 rounded-full p-0.5 flex items-center transition-colors shrink-0 ${
                      includeInstallInModal ? 'bg-[#0044FF] justify-end' : 'bg-slate-300 justify-start'
                    }`}
                    aria-hidden="true"
                  >
                    <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
                  </span>
                </button>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="font-display font-extrabold text-xl text-[#0A1944] tabular-nums">
                    {selectedProduct.pricePrefix && (
                      <span className="text-sm font-bold mr-1.5">{selectedProduct.pricePrefix}</span>
                    )}
                    <span className={selectedProduct.pricingType === 'quote' ? 'text-[#0044FF]' : ''}>
                      {selectedProduct.priceAmount}
                    </span>
                  </div>

                  <a
                    href={buildProductWhatsAppUrl(selectedProduct, includeInstallInModal)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#0044FF] to-[#0070FF] hover:from-[#0033CC] hover:to-[#0055FF] text-white text-sm font-bold shadow-md transition-all whitespace-nowrap"
                  >
                    <WhatsAppCircleIcon />
                    <span>
                      {selectedProduct.pricingType === 'fixed'
                        ? 'Order via WhatsApp'
                        : 'Request Quote on WhatsApp'}
                    </span>
                    <ArrowRight className="w-4 h-4" strokeWidth={2.1} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
