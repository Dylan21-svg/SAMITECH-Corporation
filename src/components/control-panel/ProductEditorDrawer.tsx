import { useEffect, useState } from 'react';
import { Loader2, Plus, Save, Trash2, X } from 'lucide-react';
import type { SamitechProduct } from '../../data/productsData';
import { SAMITECH_MEDIA_LIBRARY } from '../../lib/mediaAssets';
import { MediaFieldPicker } from './MediaFieldPicker';

interface ProductEditorDrawerProps {
  initialProduct: SamitechProduct | null;
  isNew: boolean;
  onClose: () => void;
  onSave: (product: SamitechProduct) => Promise<void>;
}

const CATEGORY_MAP: Record<SamitechProduct['category'], string> = {
  'networking-starlink': 'Networking & Starlink',
  'cctv-security': 'CCTV & Security',
  'computers-labs': 'Computers & Labs',
};

export function createBlankProduct(): SamitechProduct {
  const defaultImg = SAMITECH_MEDIA_LIBRARY[0].src;
  return {
    id: `product-${Date.now()}`,
    sku: `SMT-HW-${Math.floor(10 + Math.random() * 89)}`,
    name: '',
    category: 'networking-starlink',
    categoryLabel: 'Networking & Starlink',
    availability: 'In Stock',
    pricingType: 'fixed',
    pricePrefix: '',
    priceAmount: '100,000 XAF',
    unitPriceXaf: 100000,
    shortDesc: '',
    specs: ['Ready to deploy', 'Tested by SAMITECH', 'Support included'],
    heroHighlights: ['Tested Hardware', 'Pre-configured for Cameroon', 'WhatsApp Order Support', 'Optional Installation'],
    longDescription: '',
    aboutBullets: ['Verified reliability', 'Direct local engineer assistance'],
    whatsInBox: ['Main Hardware Unit', 'Power Adapter & Cabling', 'Quick Setup Guide'],
    image: defaultImg,
    imageAlt: 'SAMITECH Hardware Kit',
    studioWhiteBg: false,
    featured: false,
    gallery: [{ src: defaultImg, alt: 'Primary product view', label: 'Main Unit' }],
    trustStrip: [
      { icon: 'speed', title: 'High Performance' },
      { icon: 'globe', title: 'Nationwide Delivery' },
      { icon: 'support', title: '24/7 Support' },
      { icon: 'shield', title: 'Tested & Reliable' },
    ],
    keyFeatures: [
      { icon: 'rocket', label: 'Ready to Deploy' },
      { icon: 'gauge', label: 'High Throughput' },
      { icon: 'shield', label: 'Surge Protected' },
      { icon: 'home', label: 'Easy Installation' },
    ],
    technicalSpecs: [
      { label: 'Availability', value: 'In Stock (Cameroon)' },
      { label: 'Warranty', value: 'SAMITECH Support Care' },
    ],
    includedVisuals: [
      { title: 'Main Kit', image: defaultImg },
      { title: 'Install Option', image: SAMITECH_MEDIA_LIBRARY[11].src },
    ],
    promoBanner: {
      title: 'Deploy With Confidence',
      subtitle: 'Order today with optional installation anywhere in Cameroon.',
      image: SAMITECH_MEDIA_LIBRARY[2].src,
    },
    faqs: [
      {
        question: 'Does SAMITECH provide installation support?',
        answer: 'Yes. Toggle installation on or message us directly on WhatsApp for nationwide dispatch.',
      },
    ],
  };
}

export function ProductEditorDrawer({
  initialProduct,
  isNew,
  onClose,
  onSave,
}: ProductEditorDrawerProps) {
  const [form, setForm] = useState<SamitechProduct>(() => initialProduct ?? createBlankProduct());
  const [section, setSection] = useState<'general' | 'gallery' | 'specs' | 'faqs'>('general');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialProduct) {
      setForm(initialProduct);
    } else {
      setForm(createBlankProduct());
    }
    setSection('general');
    setError(null);
  }, [initialProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Product name is required.');
      return;
    }
    if (!form.shortDesc.trim() || !form.longDescription.trim()) {
      setError('Please enter both short description and full product overview.');
      return;
    }
    setError(null);
    setSaving(true);
    try {
      await onSave({
        ...form,
        imageAlt: form.imageAlt.trim() || form.name.trim(),
        categoryLabel: CATEGORY_MAP[form.category],
        specs: form.specs.filter((s) => s.trim().length > 0),
        heroHighlights: form.heroHighlights.filter((s) => s.trim().length > 0),
        aboutBullets: form.aboutBullets.filter((s) => s.trim().length > 0),
        whatsInBox: form.whatsInBox.filter((s) => s.trim().length > 0),
        gallery: form.gallery.filter((g) => g.src.trim().length > 0),
        technicalSpecs: form.technicalSpecs.filter((r) => r.label.trim() && r.value.trim()),
        includedVisuals: form.includedVisuals.filter((v) => v.title.trim() && v.image.trim()),
        faqs: form.faqs.filter((f) => f.question.trim() && f.answer.trim()),
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save product.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#07133B]/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label={isNew ? 'Add New Product' : `Edit ${form.name}`}
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-white">
          <div className="min-w-0">
            <div className="text-xs font-mono text-slate-500">
              {isNew ? 'New Hardware Record' : `SKU: ${form.sku}`}
            </div>
            <h2 className="text-lg font-bold text-[#07133B] truncate">
              {isNew ? 'Create Product' : form.name || 'Edit Product'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product editor"
            className="w-9 h-9 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Inner Editor Tabs */}
        <div className="px-6 pt-3 pb-2 border-b border-slate-200 bg-slate-50 flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'general', label: 'Basic & Pricing' },
            { id: 'gallery', label: 'Images & Included' },
            { id: 'specs', label: 'Specs & Highlights' },
            { id: 'faqs', label: 'Promo Banner & FAQs' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSection(tab.id as typeof section)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                section === tab.id
                  ? 'bg-[#07133B] text-white'
                  : 'text-slate-600 hover:bg-white hover:text-[#07133B]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-[#DC2626]">
              {error}
            </div>
          )}

          {section === 'general' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Product Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Starlink Standard Kit + Mount"
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#003BFF]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">SKU Code</label>
                  <input
                    type="text"
                    required
                    value={form.sku}
                    onChange={(e) => setForm({ ...form, sku: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 font-mono text-sm text-slate-900 focus:outline-none focus:border-[#003BFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => {
                      const cat = e.target.value as SamitechProduct['category'];
                      setForm({ ...form, category: cat, categoryLabel: CATEGORY_MAP[cat] });
                    }}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm bg-white text-slate-900 focus:outline-none focus:border-[#003BFF]"
                  >
                    <option value="networking-starlink">Networking &amp; Starlink</option>
                    <option value="cctv-security">CCTV &amp; Security</option>
                    <option value="computers-labs">Computers &amp; Labs</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Stock Availability</label>
                  <select
                    value={form.availability}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        availability: e.target.value as SamitechProduct['availability'],
                      })
                    }
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm bg-white text-slate-900 focus:outline-none focus:border-[#003BFF]"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Pre-Order">Pre-Order</option>
                    <option value="Request Quote">Request Quote</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Pricing Model</label>
                  <select
                    value={form.pricingType}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        pricingType: e.target.value as SamitechProduct['pricingType'],
                      })
                    }
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm bg-white text-slate-900 focus:outline-none focus:border-[#003BFF]"
                  >
                    <option value="fixed">Fixed Price (XAF)</option>
                    <option value="quote">Custom Quote Only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Price Prefix (Optional)</label>
                  <input
                    type="text"
                    value={form.pricePrefix ?? ''}
                    onChange={(e) => setForm({ ...form, pricePrefix: e.target.value })}
                    placeholder="e.g. From"
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#003BFF]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Display Price Text</label>
                  <input
                    type="text"
                    required
                    value={form.priceAmount}
                    onChange={(e) => setForm({ ...form, priceAmount: e.target.value })}
                    placeholder="e.g. 450,000 XAF"
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 font-mono text-sm text-slate-900 focus:outline-none focus:border-[#003BFF]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Numeric XAF (For Qty Total)</label>
                  <input
                    type="number"
                    min={0}
                    value={form.unitPriceXaf ?? 0}
                    onChange={(e) => {
                      const num = Number(e.target.value) || 0;
                      setForm({
                        ...form,
                        unitPriceXaf: num,
                        priceAmount:
                          form.pricingType === 'fixed' && num > 0
                            ? `${num.toLocaleString('en-US')} XAF`
                            : form.priceAmount,
                      });
                    }}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 font-mono text-sm text-slate-900 focus:outline-none focus:border-[#003BFF]"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-1">
                <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(form.featured)}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="rounded border-slate-300 text-[#003BFF]"
                  />
                  <span>Highlight as Featured Spotlight Product</span>
                </label>

                <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(form.studioWhiteBg)}
                    onChange={(e) => setForm({ ...form, studioWhiteBg: e.target.checked })}
                    className="rounded border-slate-300 text-[#003BFF]"
                  />
                  <span>White Studio Cutout Fit (object-contain)</span>
                </label>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Short Summary (Catalog Card &amp; Hero)</label>
                <textarea
                  rows={2}
                  required
                  value={form.shortDesc}
                  onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
                  className="w-full p-3 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#003BFF]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Full About Description (Product Detail Page)</label>
                <textarea
                  rows={4}
                  required
                  value={form.longDescription}
                  onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
                  className="w-full p-3 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#003BFF]"
                />
              </div>
            </div>
          )}

          {section === 'gallery' && (
            <div className="space-y-6">
              <MediaFieldPicker
                label="Primary Thumbnail / Main Product Photo"
                value={form.image}
                onChange={(nextUrl) => setForm({ ...form, image: nextUrl })}
              />

              <div className="space-y-3 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#07133B]">Product Detail Multi-Image Gallery</h3>
                    <p className="text-xs text-slate-500">Shown in the interactive gallery switcher on the Product Detail Page.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        gallery: [
                          ...form.gallery,
                          { src: form.image, alt: form.name, label: `View ${form.gallery.length + 1}` },
                        ],
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#003BFF] text-white text-xs font-semibold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Gallery Photo</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {form.gallery.map((gItem, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={gItem.label}
                          onChange={(e) => {
                            const next = [...form.gallery];
                            next[idx] = { ...next[idx], label: e.target.value };
                            setForm({ ...form, gallery: next });
                          }}
                          placeholder="Photo caption label (e.g. Dish & Stand)"
                          className="flex-1 h-8 px-2.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold"
                        />
                        <label className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
                          <input
                            type="checkbox"
                            checked={Boolean(gItem.studioWhiteBg)}
                            onChange={(e) => {
                              const next = [...form.gallery];
                              next[idx] = { ...next[idx], studioWhiteBg: e.target.checked };
                              setForm({ ...form, gallery: next });
                            }}
                          />
                          <span>White Bg</span>
                        </label>
                        {form.gallery.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setForm({
                                ...form,
                                gallery: form.gallery.filter((_, i) => i !== idx),
                              })
                            }
                            aria-label="Remove gallery photo"
                            className="p-1.5 text-slate-400 hover:text-[#DC2626] cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <MediaFieldPicker
                        label={`Photo #${idx + 1}`}
                        value={gItem.src}
                        onChange={(nextUrl) => {
                          const next = [...form.gallery];
                          next[idx] = { ...next[idx], src: nextUrl, alt: gItem.alt || form.name };
                          setForm({ ...form, gallery: next });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {section === 'specs' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Card Bullet Specs (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={form.specs.join('\n')}
                    onChange={(e) => setForm({ ...form, specs: e.target.value.split('\n') })}
                    className="w-full p-3 rounded-lg border border-slate-200 text-xs leading-relaxed"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Hero Top Checkmarks (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={form.heroHighlights.join('\n')}
                    onChange={(e) =>
                      setForm({ ...form, heroHighlights: e.target.value.split('\n') })
                    }
                    className="w-full p-3 rounded-lg border border-slate-200 text-xs leading-relaxed"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    About Section Bullets (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={form.aboutBullets.join('\n')}
                    onChange={(e) =>
                      setForm({ ...form, aboutBullets: e.target.value.split('\n') })
                    }
                    className="w-full p-3 rounded-lg border border-slate-200 text-xs leading-relaxed"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    What&apos;s in the Box Checklist (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={form.whatsInBox.join('\n')}
                    onChange={(e) =>
                      setForm({ ...form, whatsInBox: e.target.value.split('\n') })
                    }
                    className="w-full p-3 rounded-lg border border-slate-200 text-xs leading-relaxed"
                  />
                </div>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#07133B]">Technical Specifications Table</h3>
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        technicalSpecs: [...form.technicalSpecs, { label: '', value: '' }],
                      })
                    }
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Row</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {form.technicalSpecs.map((row, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                      <input
                        type="text"
                        value={row.label}
                        onChange={(e) => {
                          const next = [...form.technicalSpecs];
                          next[idx] = { ...next[idx], label: e.target.value };
                          setForm({ ...form, technicalSpecs: next });
                        }}
                        placeholder="Spec Name"
                        className="col-span-5 h-9 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold"
                      />
                      <input
                        type="text"
                        value={row.value}
                        onChange={(e) => {
                          const next = [...form.technicalSpecs];
                          next[idx] = { ...next[idx], value: e.target.value };
                          setForm({ ...form, technicalSpecs: next });
                        }}
                        placeholder="Value"
                        className="col-span-6 h-9 px-2.5 rounded-lg border border-slate-200 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setForm({
                            ...form,
                            technicalSpecs: form.technicalSpecs.filter((_, i) => i !== idx),
                          })
                        }
                        className="col-span-1 h-9 flex items-center justify-center text-slate-400 hover:text-[#DC2626] cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {section === 'faqs' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <h3 className="text-sm font-bold text-[#07133B]">Product Detail Dark Promo Banner Card</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Banner Headline</label>
                    <input
                      type="text"
                      value={form.promoBanner.title}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          promoBanner: { ...form.promoBanner, title: e.target.value },
                        })
                      }
                      className="w-full h-9 px-3 rounded-lg bg-white border border-slate-200 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Banner Subtitle</label>
                    <input
                      type="text"
                      value={form.promoBanner.subtitle}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          promoBanner: { ...form.promoBanner, subtitle: e.target.value },
                        })
                      }
                      className="w-full h-9 px-3 rounded-lg bg-white border border-slate-200 text-xs"
                    />
                  </div>
                </div>
                <MediaFieldPicker
                  label="Promo Banner Backdrop Photo"
                  value={form.promoBanner.image}
                  onChange={(nextUrl) =>
                    setForm({ ...form, promoBanner: { ...form.promoBanner, image: nextUrl } })
                  }
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#07133B]">Product-Specific FAQs</h3>
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        faqs: [...form.faqs, { question: '', answer: '' }],
                      })
                    }
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add FAQ</span>
                  </button>
                </div>

                {form.faqs.map((faq, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => {
                          const next = [...form.faqs];
                          next[idx] = { ...next[idx], question: e.target.value };
                          setForm({ ...form, faqs: next });
                        }}
                        placeholder="Question"
                        className="flex-1 h-9 px-3 rounded-lg border border-slate-200 text-xs font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setForm({
                            ...form,
                            faqs: form.faqs.filter((_, i) => i !== idx),
                          })
                        }
                        className="p-1.5 text-slate-400 hover:text-[#DC2626] cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => {
                        const next = [...form.faqs];
                        next[idx] = { ...next[idx], answer: e.target.value };
                        setForm({ ...form, faqs: next });
                      }}
                      placeholder="Answer"
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#003BFF] hover:bg-[#0028B8] text-white text-xs font-semibold shadow-xs cursor-pointer disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Publishing...' : 'Save & Publish'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
