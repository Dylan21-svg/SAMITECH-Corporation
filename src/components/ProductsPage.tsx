import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  Eye,
  FileText,
  Star,
} from 'lucide-react';
import {
  PRODUCT_CATEGORIES,
  PRODUCTS_HERO_MEDIA,
  type ProductCategoryId,
  type SamitechProduct,
} from '../data/productsData';
import { useSiteContent } from '../context/SiteContentContext';
import { Reveal } from './MotionPrimitives';
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
  onSelectProduct: (product: SamitechProduct) => void;
  onNavigateServices: () => void;
  onOpenContact: (defaultCategory?: string) => void;
}

export function ProductsPage({
  onSelectProduct,
  onNavigateServices,
  onOpenContact: _onOpenContact,
}: ProductsPageProps) {
  const {
    featuredProduct,
    catalogProducts,
    buildProductWhatsAppUrl,
    buildWhatsAppUrl,
  } = useSiteContent();
  const [activeCategory, setActiveCategory] = useState<ProductCategoryId>('all');

  const visibleProducts = useMemo(() => {
    if (activeCategory === 'all') return catalogProducts;
    return catalogProducts.filter((p) => p.category === activeCategory);
  }, [activeCategory, catalogProducts]);

  const showFeaturedSpotlight =
    Boolean(featuredProduct) &&
    (activeCategory === 'all' || activeCategory === featuredProduct.category);

  return (
    <div className="bg-[#EEF3FA] text-[#07133B] overflow-x-clip">
      {/* PREMIUM LIGHT HERO WITH INTEGRATED HARDWARE & SKYLINE COMPOSITION */}
      <section className="relative overflow-hidden bg-white pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-24">
        {/* Seamless Full-Bleed Right-Anchored Hardware Composition */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <img
            src={PRODUCTS_HERO_MEDIA.heroShowcase}
            alt=""
            className="w-full h-full object-cover object-[80%_center] lg:object-right opacity-70 sm:opacity-85 lg:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 via-44% to-white/10 lg:from-white/95 lg:via-white/60 lg:via-32% lg:to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#EEF3FA] to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal immediate direction="left" className="max-w-xl space-y-3 sm:space-y-5">
            {/* Soft Ice-Blue Kicker with 3D Cube Icon */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#DCE6FA]/95 border border-[#C7D7F9] text-xs sm:text-sm font-bold text-[#07133B] shadow-xs">
              <ProductsCubeIcon />
              <span>Our Products</span>
            </div>

            <h1
              className="font-extrabold tracking-[-0.025em] leading-[1.08] text-[#0A1944] text-balance"
              style={{ fontSize: 'clamp(1.55rem, 4.1vw, 3.4rem)' }}
            >
              Tested Infrastructure &amp;
              <span className="block">Pre-Configured Hardware</span>
              <span className="block">
                Built for <span className="text-[#0070FF]">Reliability</span>
              </span>
            </h1>

            <div className="h-1 w-14 rounded-full bg-gradient-to-r from-[#0044FF] to-[#22D3EE]" aria-hidden="true" />

            <p className="max-w-[270px] sm:max-w-md text-xs sm:text-base text-[#2D3B5E] leading-relaxed font-medium">
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

      {/* FLOATING 4-TAB CATEGORY FILTER BAR (Horizontal Pills on Mobile, 4-Col Bar on Desktop) */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10">
        <div
          role="tablist"
          aria-label="Filter hardware products by category"
          className="flex items-center gap-2 overflow-x-auto pb-1.5 lg:pb-2.5 lg:grid lg:grid-cols-4 lg:gap-0 lg:p-2.5 lg:rounded-2xl lg:bg-white lg:border lg:border-[#DCE6F8] lg:shadow-[0_14px_34px_rgba(12,35,96,0.09)]"
        >
          {PRODUCT_CATEGORIES.map((category, index) => {
            const isSelected = activeCategory === category.id;
            return (
              <div
                key={category.id}
                className={`flex items-center justify-center shrink-0 lg:shrink ${
                  index > 0 ? 'lg:border-l lg:border-slate-200/90' : ''
                } lg:px-1.5`}
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center justify-center gap-2 lg:w-full px-3.5 py-2 sm:px-4 sm:py-2.5 lg:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#003BFF] to-[#0070FF] text-white shadow-[0_6px_18px_rgba(0,68,255,0.28)]'
                      : 'bg-white lg:bg-transparent border border-[#DCE6F8] lg:border-transparent text-[#0A1944] hover:text-[#0044FF] hover:bg-[#F3F7FF] shadow-xs lg:shadow-none'
                  }`}
                >
                  <CategoryTabIcon category={category.id} active={isSelected} />
                  <span>{category.label}</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* MAIN PRODUCT CATALOG CONTENT */}
      <section className="py-7 sm:py-9 lg:py-11">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          {/* FEATURED PRODUCT HORIZONTAL SPOTLIGHT CARD */}
          {showFeaturedSpotlight && featuredProduct && (
            <Reveal direction="bottom" delay={0.04}>
              <article className="rounded-2xl bg-white border border-[#DCE6F8] shadow-[0_12px_30px_rgba(12,35,96,0.07)] p-2.5 sm:p-5">
                <div className="grid grid-cols-1 min-[340px]:grid-cols-[46%_minmax(0,1fr)] sm:grid-cols-12 gap-3 sm:gap-5 lg:gap-6 items-stretch sm:items-center">
                  {/* Left Featured Photo */}
                  <button
                    type="button"
                    onClick={() => onSelectProduct(featuredProduct)}
                    aria-label={`View details for ${featuredProduct.name}`}
                    className="w-full min-w-0 sm:col-span-5 lg:col-span-5 relative min-h-[160px] sm:min-h-0 sm:aspect-[16/10] rounded-xl overflow-hidden bg-[#040B29] text-left cursor-pointer group/feat"
                  >
                    <ResilientImage
                      src={featuredProduct.image}
                      alt={featuredProduct.imageAlt}
                      fallbackTitle={featuredProduct.name}
                      wrapperClassName="absolute inset-0 w-full h-full"
                      className="w-full h-full object-cover group-hover/feat:scale-[1.03] transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r from-[#0044FF] to-[#0066FF] text-white text-[10px] sm:text-xs font-bold shadow-md">
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-300 text-amber-300 shrink-0" aria-hidden="true" />
                      <span>Featured Product</span>
                    </div>
                  </button>

                  {/* Right Details + 3 Highlight Icons + Bottom Price & CTAs */}
                  <div className="w-full min-w-0 sm:col-span-7 lg:col-span-7 flex flex-col justify-between gap-2 sm:gap-4 py-0.5">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
                      <div className="md:col-span-8 space-y-1 sm:space-y-2">
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#E8F0FF] text-[10px] sm:text-xs font-bold text-[#0044FF]">
                          <CategoryTabIcon category={featuredProduct.category} className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                          <span>{featuredProduct.categoryLabel}</span>
                        </div>

                        <h2 className="text-[13px] sm:text-2xl font-extrabold text-[#0A1944] tracking-tight leading-snug">
                          <button
                            type="button"
                            onClick={() => onSelectProduct(featuredProduct)}
                            className="text-left hover:text-[#0044FF] transition-colors cursor-pointer"
                          >
                            {featuredProduct.name}
                          </button>
                        </h2>

                        <p className="text-[10.5px] sm:text-sm text-[#3E4C6E] leading-snug sm:leading-relaxed">
                          {featuredProduct.shortDesc}
                        </p>

                        <ul className="space-y-0.5 sm:space-y-1.5 pt-0.5 sm:pt-1">
                          {featuredProduct.specs.map((spec) => (
                            <li
                              key={spec}
                              className="flex items-center gap-1.5 sm:gap-2 text-[10.5px] sm:text-sm font-semibold text-[#0A1944]"
                            >
                              <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#0055FF] shrink-0" strokeWidth={2.8} aria-hidden="true" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right 3 Feature Icons Column (Desktop & Tablet) */}
                      <div className="hidden md:block md:col-span-4 md:border-l md:border-slate-200/85 md:pl-5 space-y-3.5">
                        {(featuredProduct.featuredHighlights ?? []).map((item) => (
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
                    <div className="pt-1 sm:pt-3 sm:border-t sm:border-slate-100 flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-between gap-2 sm:gap-3">
                      <div className="font-display font-extrabold text-sm sm:text-2xl text-[#0A1944] tabular-nums">
                        {featuredProduct.pricePrefix && (
                          <span className="text-xs sm:text-base font-bold mr-1">
                            {featuredProduct.pricePrefix}
                          </span>
                        )}
                        {featuredProduct.pricingType === 'fixed' ? (
                          <>
                            <span className="text-[#0044FF] sm:text-[#0A1944]">
                              {featuredProduct.priceAmount.replace(' XAF', '')}{' '}
                            </span>
                            <span className="text-[#0044FF]">XAF</span>
                          </>
                        ) : (
                          <span className="text-[#0044FF]">{featuredProduct.priceAmount}</span>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-1.5 sm:gap-2.5">
                        <a
                          href={buildProductWhatsAppUrl(featuredProduct, true)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#0044FF] to-[#0070FF] hover:from-[#0033CC] hover:to-[#0055FF] text-white text-[11px] sm:text-sm font-bold shadow-[0_6px_16px_rgba(0,68,255,0.28)] transition-all whitespace-nowrap"
                        >
                          <WhatsAppCircleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span>Order via WhatsApp</span>
                          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" strokeWidth={2.2} aria-hidden="true" />
                        </a>

                        <button
                          type="button"
                          onClick={() => onSelectProduct(featuredProduct)}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-full bg-white border border-[#0044FF]/35 hover:border-[#0044FF] hover:bg-[#F2F6FF] text-[#0044FF] text-[11px] sm:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" strokeWidth={1.9} aria-hidden="true" />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          )}

          {/* STUDIO PRODUCT CARDS GRID (2-Col on Mobile, 3-Col on Desktop) */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5 lg:gap-6">
            {visibleProducts.map((product, index) => (
              <Reveal
                key={product.id}
                direction="bottom"
                delay={0.04 + (index % 3) * 0.05}
                wrapperClassName="h-full"
                className="h-full"
              >
                <article className="group h-full flex flex-col justify-between rounded-2xl bg-white border border-[#DCE6F8] hover:border-[#0055FF]/50 shadow-[0_10px_28px_rgba(12,35,96,0.06)] hover:shadow-[0_18px_36px_rgba(0,68,255,0.11)] hover:-translate-y-0.5 transition-all duration-200 p-2.5 sm:p-5 lg:p-6">
                  <div>
                    {/* Top Metadata Row */}
                    <div className="flex items-center justify-between gap-1.5 pb-2 sm:pb-3">
                      <div className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-0 sm:py-0 rounded-full bg-[#EEF3FF] sm:bg-transparent text-[9.5px] sm:text-xs font-bold text-[#0044FF] min-w-0">
                        <CategoryTabIcon category={product.category} className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                        <span className="truncate">{product.categoryLabel}</span>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-0 sm:py-0 rounded-full text-[9.5px] sm:text-xs font-bold whitespace-nowrap shrink-0 ${
                          product.availability === 'In Stock'
                            ? 'bg-emerald-50 sm:bg-transparent text-emerald-700'
                            : product.availability === 'Pre-Order'
                              ? 'bg-amber-50 sm:bg-transparent text-amber-600'
                              : 'bg-[#EEF3FF] sm:bg-transparent text-[#0044FF]'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full sm:hidden ${
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
                    </div>

                    {/* Crisp Studio Product Photography */}
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      aria-label={`View full details for ${product.name}`}
                      className={`block aspect-[4/3] w-full rounded-xl overflow-hidden mb-2.5 sm:mb-4 cursor-pointer ${
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
                    </button>

                    {/* Title, Description & 3 Checkmark Specs */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <h3 className="text-xs sm:text-lg font-extrabold text-[#0A1944] group-hover:text-[#0044FF] transition-colors leading-snug">
                        <button
                          type="button"
                          onClick={() => onSelectProduct(product)}
                          className="text-left cursor-pointer"
                        >
                          {product.name}
                        </button>
                      </h3>

                      <p className="text-[10.5px] sm:text-sm text-[#3E4C6E] leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {product.shortDesc}
                      </p>

                      <ul className="space-y-1 sm:space-y-1.5 pt-0.5 sm:pt-1">
                        {product.specs.map((spec) => (
                          <li
                            key={spec}
                            className="flex items-start gap-1.5 sm:gap-2 text-[10px] sm:text-[13px] font-semibold text-[#0A1944] leading-snug"
                          >
                            <Check
                              className="w-3 h-3 sm:w-4 sm:h-4 text-[#0055FF] shrink-0 mt-0.5"
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
                  <div className="pt-3 mt-3 sm:pt-4 sm:mt-4 space-y-2 sm:space-y-3 border-t border-slate-100 sm:border-t-0">
                    <div className="font-display font-extrabold text-sm sm:text-xl text-[#0A1944] tabular-nums">
                      {product.pricePrefix && (
                        <span className="text-[11px] sm:text-sm font-bold mr-1 sm:mr-1.5">{product.pricePrefix}</span>
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

                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <a
                        href={buildProductWhatsAppUrl(product, false)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-3.5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#0044FF] to-[#0070FF] hover:from-[#0033CC] hover:to-[#0055FF] text-white text-[10.5px] sm:text-xs font-bold shadow-[0_4px_12px_rgba(0,68,255,0.25)] transition-all whitespace-nowrap"
                      >
                        <WhatsAppCircleIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span className="sm:hidden">
                          {product.pricingType === 'fixed' ? 'Buy Now' : 'Quote'}
                        </span>
                        <span className="hidden sm:inline">
                          {product.pricingType === 'fixed' ? 'Order via WhatsApp' : 'Quote on WhatsApp'}
                        </span>
                      </a>

                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-full bg-white border border-[#0044FF]/35 hover:border-[#0044FF] hover:bg-[#F2F6FF] text-[#0044FF] text-[10.5px] sm:text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span className="sm:hidden">Specs</span>
                        <span className="hidden sm:inline">View Specs</span>
                        <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" strokeWidth={1.9} aria-hidden="true" />
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
                  href={buildWhatsAppUrl(
                    'Hello SAMITECH Corporation, I would like to request a custom quote for Hardware + Installation.'
                  )}
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
    </div>
  );
}
