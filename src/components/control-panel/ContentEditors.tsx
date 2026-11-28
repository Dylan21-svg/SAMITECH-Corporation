import { useEffect, useState } from 'react';
import { Loader2, Plus, Save, Trash2, X } from 'lucide-react';
import type { CareerOpening } from '../../data/careersData';
import type { SamitechCommunity } from '../../data/communitiesData';
import type { ProjectFilterId, ShowcaseProject } from '../../data/projectsData';
import type { FaqItem } from '../../data/samitechData';
import type { ServiceDetail, ServiceGroup } from '../../data/servicesCatalog';
import type { TeamMember } from '../../data/teamData';
import { SAMITECH_MEDIA_LIBRARY } from '../../lib/mediaAssets';
import { MediaFieldPicker } from './MediaFieldPicker';

// ---------------------------------------------------------------------------
// Shared Drawer Shell
// ---------------------------------------------------------------------------

function EditorDrawerShell({
  kicker,
  title,
  onClose,
  onSave,
  saving,
  error,
  children,
}: {
  kicker: string;
  title: string;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  saving: boolean;
  error: string | null;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#07133B]/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-white">
          <div className="min-w-0">
            <div className="text-[11px] font-mono text-slate-500">{kicker}</div>
            <h2 className="text-lg font-bold text-[#07133B] truncate">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close editor"
            className="w-9 h-9 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onSave} className="flex-1 overflow-y-auto p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-[#DC2626]">
              {error}
            </div>
          )}
          {children}
        </form>

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
            onClick={onSave}
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

// ---------------------------------------------------------------------------
// 1. Service Editor Drawer
// ---------------------------------------------------------------------------

export function createBlankService(count = 6): ServiceDetail {
  const defaultImg = SAMITECH_MEDIA_LIBRARY[6].src;
  const numStr = String(count + 1).padStart(2, '0');
  return {
    slug: `service-${Date.now()}`,
    number: numStr,
    group: 'software-teams',
    groupLabel: 'Technology Services',
    title: '',
    shortDesc: '',
    offerings: ['Consultation & Architecture', 'Implementation & Testing', 'Ongoing Support'],
    tagline: 'Dependable technology delivery built around business reliability.',
    heroTitle: 'Enterprise Solutions With',
    heroAccent: 'SAMITECH',
    heroDescription: '',
    timelineLabel: '1 to 4 Weeks',
    engagementModel: 'Fixed Scope or Retainer',
    contactCategory: 'Software Services',
    image: defaultImg,
    imageAlt: 'SAMITECH Service Showcase',
    imageWidth: 720,
    imageHeight: 964,
    accentColor: '#003BFF',
    metrics: [
      { value: '99.9%', label: 'Target Uptime' },
      { value: '24/7', label: 'Engineering Support' },
    ],
    capabilities: [
      {
        title: 'Tailored Execution',
        description: 'Configured and deployed cleanly for your specific organization.',
      },
    ],
    processSteps: [
      { step: '01.', title: 'Discovery', detail: 'Assess requirements and scope.' },
      { step: '02.', title: 'Deployment', detail: 'Engineer, configure, and verify.' },
    ],
    deliverables: ['Production Deployment', 'Documentation & Support'],
    techStack: ['React', 'Cloud', 'Networking'],
    idealFor: [
      { audience: 'Growing Enterprises', outcome: 'Reliable technology without operational bottlenecks.' },
    ],
    faqs: [
      {
        question: 'How quickly can SAMITECH start this service?',
        answer: 'Contact us directly via WhatsApp or the consultation form to schedule discovery.',
      },
    ],
    relatedCaseStudyId: 'campuspro',
  };
}

export function ServiceEditorDrawer({
  initialService,
  isNew,
  onClose,
  onSave,
}: {
  initialService: ServiceDetail | null;
  isNew: boolean;
  onClose: () => void;
  onSave: (service: ServiceDetail) => Promise<void>;
}) {
  const [form, setForm] = useState<ServiceDetail>(() => initialService ?? createBlankService());
  const [tab, setTab] = useState<'core' | 'details'>('core');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm(initialService ?? createBlankService());
    setTab('core');
    setError(null);
  }, [initialService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.shortDesc.trim()) {
      setError('Service title and short summary are required.');
      return;
    }
    setError(null);
    setSaving(true);
    try {
      await onSave({
        ...form,
        heroAccent: form.heroAccent.trim() || form.title.trim(),
        heroDescription: form.heroDescription.trim() || form.shortDesc.trim(),
        contactCategory: form.contactCategory.trim() || form.title.trim(),
        imageAlt: form.imageAlt.trim() || form.title.trim(),
        offerings: form.offerings.filter((o) => o.trim().length > 0),
        deliverables: form.deliverables.filter((d) => d.trim().length > 0),
        techStack: form.techStack.filter((t) => t.trim().length > 0),
        capabilities: form.capabilities.filter((c) => c.title.trim() && c.description.trim()),
        processSteps: form.processSteps.filter((p) => p.title.trim() && p.detail.trim()),
        metrics: form.metrics.filter((m) => m.value.trim() && m.label.trim()),
        faqs: form.faqs.filter((f) => f.question.trim() && f.answer.trim()),
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save service.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <EditorDrawerShell
      kicker={isNew ? 'New Service Division' : `Service #${form.number} · ${form.slug}`}
      title={isNew ? 'Add Service' : form.title || 'Edit Service'}
      onClose={onClose}
      onSave={handleSubmit}
      saving={saving}
      error={error}
    >
      <div className="flex items-center gap-1.5 pb-2 border-b border-slate-200">
        {[
          { id: 'core', label: 'Core Info & Media' },
          { id: 'details', label: 'Capabilities, Stack & FAQs' },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id as 'core' | 'details')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              tab === item.id
                ? 'bg-[#07133B] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'core' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Order #</label>
              <input
                type="text"
                value={form.number}
                onChange={(e) => setForm({ ...form, number: e.target.value })}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 font-mono text-sm"
              />
            </div>
            <div className="sm:col-span-3 space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Service Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Service Group</label>
              <select
                value={form.group}
                onChange={(e) => setForm({ ...form, group: e.target.value as ServiceGroup })}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs bg-white"
              >
                <option value="software-teams">Software &amp; Dedicated Teams</option>
                <option value="networks-support">Networks &amp; IT Maintenance</option>
                <option value="security-tracking">Cybersecurity &amp; Tracking</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Group Subtitle Label</label>
              <input
                type="text"
                value={form.groupLabel}
                onChange={(e) => setForm({ ...form, groupLabel: e.target.value })}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Timeline Badge</label>
              <input
                type="text"
                value={form.timelineLabel}
                onChange={(e) => setForm({ ...form, timelineLabel: e.target.value })}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Engagement Summary</label>
              <input
                type="text"
                value={form.engagementModel}
                onChange={(e) => setForm({ ...form, engagementModel: e.target.value })}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Card Short Description</label>
            <textarea
              rows={2}
              required
              value={form.shortDesc}
              onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
              className="w-full p-3 rounded-lg border border-slate-200 text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Detailed Service Hero Description</label>
            <textarea
              rows={3}
              value={form.heroDescription}
              onChange={(e) => setForm({ ...form, heroDescription: e.target.value })}
              className="w-full p-3 rounded-lg border border-slate-200 text-xs"
            />
          </div>

          <MediaFieldPicker
            label="Service Showcase Photo"
            value={form.image}
            onChange={(nextUrl) => setForm({ ...form, image: nextUrl })}
          />
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Key Offerings (One per line)</label>
              <textarea
                rows={4}
                value={form.offerings.join('\n')}
                onChange={(e) => setForm({ ...form, offerings: e.target.value.split('\n') })}
                className="w-full p-2.5 rounded-lg border border-slate-200 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Deliverables (One per line)</label>
              <textarea
                rows={4}
                value={form.deliverables.join('\n')}
                onChange={(e) => setForm({ ...form, deliverables: e.target.value.split('\n') })}
                className="w-full p-2.5 rounded-lg border border-slate-200 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Tech Stack / Platforms (Comma separated)</label>
            <input
              type="text"
              value={form.techStack.join(', ')}
              onChange={(e) =>
                setForm({
                  ...form,
                  techStack: e.target.value.split(',').map((s) => s.trim()),
                })
              }
              className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs"
            />
          </div>

          <div className="space-y-2.5 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#07133B]">Core Capabilities</h3>
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    capabilities: [...form.capabilities, { title: '', description: '' }],
                  })
                }
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Capability</span>
              </button>
            </div>
            {form.capabilities.map((cap, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={cap.title}
                    onChange={(e) => {
                      const next = [...form.capabilities];
                      next[idx] = { ...next[idx], title: e.target.value };
                      setForm({ ...form, capabilities: next });
                    }}
                    placeholder="Capability Heading"
                    className="flex-1 h-8 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        capabilities: form.capabilities.filter((_, i) => i !== idx),
                      })
                    }
                    className="p-1 text-slate-400 hover:text-[#DC2626] cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={cap.description}
                  onChange={(e) => {
                    const next = [...form.capabilities];
                    next[idx] = { ...next[idx], description: e.target.value };
                    setForm({ ...form, capabilities: next });
                  }}
                  placeholder="Capability explanation"
                  className="w-full p-2 rounded-lg border border-slate-200 text-xs"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </EditorDrawerShell>
  );
}

// ---------------------------------------------------------------------------
// 2. Project Editor Drawer
// ---------------------------------------------------------------------------

export function createBlankProject(): ShowcaseProject {
  const defaultImg = SAMITECH_MEDIA_LIBRARY[14].src;
  return {
    id: `project-${Date.now()}`,
    title: '',
    sector: 'Software & Cloud',
    location: 'Cameroon',
    year: String(new Date().getFullYear()),
    filterCategory: 'web-apps',
    serviceCategory: 'Software Services',
    featured: false,
    summary: '',
    challenge: '',
    solution: '',
    deliverables: ['Production Platform', 'Cloud Deployment'],
    metrics: [
      { value: '99.9%', label: 'Uptime' },
      { value: '24/7', label: 'Monitoring' },
    ],
    image: defaultImg,
    imageAlt: 'SAMITECH Project Case Study',
    imageWidth: 960,
    imageHeight: 536,
  };
}

export function ProjectEditorDrawer({
  initialProject,
  isNew,
  onClose,
  onSave,
}: {
  initialProject: ShowcaseProject | null;
  isNew: boolean;
  onClose: () => void;
  onSave: (project: ShowcaseProject) => Promise<void>;
}) {
  const [form, setForm] = useState<ShowcaseProject>(() => initialProject ?? createBlankProject());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm(initialProject ?? createBlankProject());
    setError(null);
  }, [initialProject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.summary.trim()) {
      setError('Project title and summary are required.');
      return;
    }
    setError(null);
    setSaving(true);
    try {
      await onSave({
        ...form,
        imageAlt: form.imageAlt.trim() || form.title.trim(),
        challenge: form.challenge.trim() || form.summary.trim(),
        solution: form.solution.trim() || form.summary.trim(),
        deliverables: form.deliverables.filter((d) => d.trim().length > 0),
        metrics: form.metrics.filter((m) => m.value.trim() && m.label.trim()),
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save project.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <EditorDrawerShell
      kicker={isNew ? 'New Portfolio Case Study' : `Project ID: ${form.id}`}
      title={isNew ? 'Add Project' : form.title || 'Edit Project'}
      onClose={onClose}
      onSave={handleSubmit}
      saving={saving}
      error={error}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Project Title</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. CampusPro"
            className="w-full h-9 px-3 rounded-lg border border-slate-200 text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Year</label>
          <input
            type="text"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            className="w-full h-9 px-3 rounded-lg border border-slate-200 font-mono text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Sector</label>
          <input
            type="text"
            value={form.sector}
            onChange={(e) => setForm({ ...form, sector: e.target.value })}
            className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Filter Tag</label>
          <select
            value={form.filterCategory}
            onChange={(e) =>
              setForm({
                ...form,
                filterCategory: e.target.value as Exclude<ProjectFilterId, 'all'>,
              })
            }
            className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs bg-white"
          >
            <option value="web-apps">Web Apps</option>
            <option value="ai-automation">AI &amp; Automation</option>
            <option value="business-tools">Business Tools</option>
            <option value="ecommerce">Ecommerce</option>
            <option value="cloud-networking">Cloud &amp; Networking</option>
            <option value="education-dev">Education &amp; Dev Tools</option>
          </select>
        </div>
      </div>

      <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
        <input
          type="checkbox"
          checked={Boolean(form.featured)}
          onChange={(e) => setForm({ ...form, featured: e.target.checked })}
        />
        <span>Pin as Featured Portfolio Spotlight</span>
      </label>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700">One-Line Card Summary</label>
        <input
          type="text"
          required
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
          className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Client Challenge</label>
          <textarea
            rows={3}
            value={form.challenge}
            onChange={(e) => setForm({ ...form, challenge: e.target.value })}
            className="w-full p-2.5 rounded-lg border border-slate-200 text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Delivered Solution</label>
          <textarea
            rows={3}
            value={form.solution}
            onChange={(e) => setForm({ ...form, solution: e.target.value })}
            className="w-full p-2.5 rounded-lg border border-slate-200 text-xs"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700">Deliverables (One per line)</label>
        <textarea
          rows={3}
          value={form.deliverables.join('\n')}
          onChange={(e) => setForm({ ...form, deliverables: e.target.value.split('\n') })}
          className="w-full p-2.5 rounded-lg border border-slate-200 text-xs"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700">Outcome Metrics</label>
          <button
            type="button"
            onClick={() =>
              setForm({ ...form, metrics: [...form.metrics, { value: '', label: '' }] })
            }
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Metric</span>
          </button>
        </div>
        {form.metrics.map((metric, idx) => (
          <div key={idx} className="grid grid-cols-12 gap-2 items-center">
            <input
              type="text"
              value={metric.value}
              onChange={(e) => {
                const next = [...form.metrics];
                next[idx] = { ...next[idx], value: e.target.value };
                setForm({ ...form, metrics: next });
              }}
              placeholder="e.g. +28%"
              className="col-span-4 h-9 px-2.5 rounded-lg border border-slate-200 font-mono text-xs font-semibold"
            />
            <input
              type="text"
              value={metric.label}
              onChange={(e) => {
                const next = [...form.metrics];
                next[idx] = { ...next[idx], label: e.target.value };
                setForm({ ...form, metrics: next });
              }}
              placeholder="Metric label"
              className="col-span-7 h-9 px-2.5 rounded-lg border border-slate-200 text-xs"
            />
            <button
              type="button"
              onClick={() =>
                setForm({ ...form, metrics: form.metrics.filter((_, i) => i !== idx) })
              }
              className="col-span-1 h-9 flex items-center justify-center text-slate-400 hover:text-[#DC2626] cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <MediaFieldPicker
        label="Project Cover Screenshot"
        value={form.image}
        onChange={(nextUrl) => setForm({ ...form, image: nextUrl })}
      />
    </EditorDrawerShell>
  );
}

// ---------------------------------------------------------------------------
// 3. Team Member Editor Drawer
// ---------------------------------------------------------------------------

export function createBlankTeamMember(): TeamMember {
  const defaultImg = SAMITECH_MEDIA_LIBRARY[20].src;
  return {
    id: `member-${Date.now()}`,
    executiveTitle: 'ENGINEER',
    name: '',
    firstNamePart: '',
    accentNamePart: '',
    role: 'Technology Specialist',
    heroTagline: 'Engineering dependable digital and network solutions at SAMITECH Corporation.',
    focusLabel: 'Engineering & Systems',
    location: 'Cameroon',
    email: 'samitech237@gmail.com',
    phone: '+237 6 95 20 03 61',
    website: 'samitech237.com',
    websiteUrl: 'https://samitech237.com/',
    image: defaultImg,
    imageAlt: 'SAMITECH Team Member Portrait',
    width: 800,
    height: 800,
    bio: '',
    aboutMe: '',
    specialties: ['Systems Architecture', 'Client Delivery'],
    skills: ['TypeScript', 'Networking', 'Security'],
    languages: ['English', 'French'],
    interests: [{ label: 'Tech & Innovation', icon: 'tech' }],
    experience: [
      {
        role: 'Specialist',
        organization: 'SAMITECH Corporation',
        highlightOrg: true,
        period: 'Present',
        description: 'Delivering enterprise digital systems and field engineering.',
      },
    ],
    educationSectionTitle: 'Education & Credentials',
    education: [],
    achievementsSectionTitle: 'Key Highlights',
    achievements: [],
    focusAreas: 'Delivering reliable technology infrastructure across Cameroon and beyond.',
    contactTopic: 'Software Services',
    socials: {},
  };
}

export function TeamMemberEditorDrawer({
  initialMember,
  isNew,
  onClose,
  onSave,
}: {
  initialMember: TeamMember | null;
  isNew: boolean;
  onClose: () => void;
  onSave: (member: TeamMember) => Promise<void>;
}) {
  const [form, setForm] = useState<TeamMember>(() => initialMember ?? createBlankTeamMember());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm(initialMember ?? createBlankTeamMember());
    setError(null);
  }, [initialMember]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.role.trim()) {
      setError('Full name and role title are required.');
      return;
    }
    const nameParts = form.name.trim().split(' ');
    const defaultAccent = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
    const defaultFirst =
      nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : form.name.trim();

    setError(null);
    setSaving(true);
    try {
      await onSave({
        ...form,
        firstNamePart: form.firstNamePart.trim() || defaultFirst,
        accentNamePart: form.accentNamePart.trim() || defaultAccent,
        imageAlt: form.imageAlt.trim() || form.name.trim(),
        aboutMe: form.aboutMe.trim() || form.bio.trim(),
        specialties: form.specialties.filter((s) => s.trim().length > 0),
        skills: form.skills.filter((s) => s.trim().length > 0),
        languages: form.languages.filter((s) => s.trim().length > 0),
        achievements: form.achievements.filter((s) => s.trim().length > 0),
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <EditorDrawerShell
      kicker={isNew ? 'New Team Profile' : `Profile Slug: ${form.id}`}
      title={isNew ? 'Add Team Member' : form.name || 'Edit Team Member'}
      onClose={onClose}
      onSave={handleSubmit}
      saving={saving}
      error={error}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Full Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full h-9 px-3 rounded-lg border border-slate-200 text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Executive Badge</label>
          <input
            type="text"
            value={form.executiveTitle}
            onChange={(e) => setForm({ ...form, executiveTitle: e.target.value })}
            placeholder="CEO / COO / CTO"
            className="w-full h-9 px-3 rounded-lg border border-slate-200 font-mono text-xs uppercase"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Role / Position Title</label>
          <input
            type="text"
            required
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Primary Focus Domain</label>
          <input
            type="text"
            value={form.focusLabel}
            onChange={(e) => setForm({ ...form, focusLabel: e.target.value })}
            className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Phone</label>
          <input
            type="text"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700">Card Bio Summary</label>
        <textarea
          rows={2}
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          className="w-full p-2.5 rounded-lg border border-slate-200 text-xs"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700">Full About Me Biography</label>
        <textarea
          rows={3}
          value={form.aboutMe}
          onChange={(e) => setForm({ ...form, aboutMe: e.target.value })}
          className="w-full p-2.5 rounded-lg border border-slate-200 text-xs"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Specialties (One per line)</label>
          <textarea
            rows={3}
            value={form.specialties.join('\n')}
            onChange={(e) => setForm({ ...form, specialties: e.target.value.split('\n') })}
            className="w-full p-2.5 rounded-lg border border-slate-200 text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Technical Skills (Comma separated)</label>
          <textarea
            rows={3}
            value={form.skills.join(', ')}
            onChange={(e) =>
              setForm({ ...form, skills: e.target.value.split(',').map((s) => s.trim()) })
            }
            className="w-full p-2.5 rounded-lg border border-slate-200 text-xs"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700">Achievements (One per line)</label>
        <textarea
          rows={3}
          value={form.achievements.join('\n')}
          onChange={(e) => setForm({ ...form, achievements: e.target.value.split('\n') })}
          className="w-full p-2.5 rounded-lg border border-slate-200 text-xs"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">GitHub URL</label>
          <input
            type="url"
            value={form.socials.github ?? ''}
            onChange={(e) =>
              setForm({ ...form, socials: { ...form.socials, github: e.target.value } })
            }
            className="w-full h-9 px-2.5 rounded-lg border border-slate-200 text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">LinkedIn URL</label>
          <input
            type="url"
            value={form.socials.linkedin ?? ''}
            onChange={(e) =>
              setForm({ ...form, socials: { ...form.socials, linkedin: e.target.value } })
            }
            className="w-full h-9 px-2.5 rounded-lg border border-slate-200 text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">WhatsApp Direct Link</label>
          <input
            type="url"
            value={form.socials.whatsapp ?? ''}
            onChange={(e) =>
              setForm({ ...form, socials: { ...form.socials, whatsapp: e.target.value } })
            }
            className="w-full h-9 px-2.5 rounded-lg border border-slate-200 text-xs"
          />
        </div>
      </div>

      <MediaFieldPicker
        label="Profile Portrait Photo"
        value={form.image}
        onChange={(nextUrl) => setForm({ ...form, image: nextUrl })}
      />
    </EditorDrawerShell>
  );
}

// ---------------------------------------------------------------------------
// 4. Community Editor Drawer
// ---------------------------------------------------------------------------

export function createBlankCommunity(count = 3): SamitechCommunity {
  return {
    id: `community-${Date.now()}`,
    number: String(count + 1).padStart(2, '0'),
    name: '',
    subtitle: '',
    platform: 'whatsapp-group',
    platformLabel: 'WhatsApp Group',
    domainOrHandle: 'chat.whatsapp.com',
    url: 'https://chat.whatsapp.com/',
    ctaLabel: 'Join Community',
    description: '',
    highlights: ['Practical field insights', 'Direct mentor & peer collaboration'],
    accentColor: '#003BFF',
    image: SAMITECH_MEDIA_LIBRARY[23].src,
    imageAlt: 'SAMITECH Community Emblem',
    imageFit: 'contain',
    imageBg: '#070E24',
  };
}

export function CommunityEditorDrawer({
  initialCommunity,
  isNew,
  onClose,
  onSave,
}: {
  initialCommunity: SamitechCommunity | null;
  isNew: boolean;
  onClose: () => void;
  onSave: (community: SamitechCommunity) => Promise<void>;
}) {
  const [form, setForm] = useState<SamitechCommunity>(
    () => initialCommunity ?? createBlankCommunity()
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm(initialCommunity ?? createBlankCommunity());
    setError(null);
  }, [initialCommunity]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.url.trim()) {
      setError('Community name and destination URL are required.');
      return;
    }
    setError(null);
    setSaving(true);
    try {
      await onSave({
        ...form,
        imageAlt: form.imageAlt || form.name,
        highlights: form.highlights.filter((h) => h.trim().length > 0),
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save community.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <EditorDrawerShell
      kicker={isNew ? 'New Community Channel' : `Community #${form.number}`}
      title={isNew ? 'Add Community' : form.name || 'Edit Community'}
      onClose={onClose}
      onSave={handleSubmit}
      saving={saving}
      error={error}
    >
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Order #</label>
          <input
            type="text"
            value={form.number}
            onChange={(e) => setForm({ ...form, number: e.target.value })}
            className="w-full h-9 px-3 rounded-lg border border-slate-200 font-mono text-sm"
          />
        </div>
        <div className="sm:col-span-3 space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Community Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full h-9 px-3 rounded-lg border border-slate-200 text-sm"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700">Subtitle</label>
        <input
          type="text"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Platform Type</label>
          <select
            value={form.platform}
            onChange={(e) => {
              const p = e.target.value as SamitechCommunity['platform'];
              const labelMap: Record<SamitechCommunity['platform'], string> = {
                website: 'Web Ecosystem',
                'whatsapp-group': 'WhatsApp Group',
                'whatsapp-channel': 'WhatsApp Channel',
              };
              setForm({ ...form, platform: p, platformLabel: labelMap[p] });
            }}
            className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs bg-white"
          >
            <option value="website">Web Ecosystem</option>
            <option value="whatsapp-group">WhatsApp Group</option>
            <option value="whatsapp-channel">WhatsApp Channel</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Button Label</label>
          <input
            type="text"
            value={form.ctaLabel}
            onChange={(e) => setForm({ ...form, ctaLabel: e.target.value })}
            className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Invite / Website URL</label>
          <input
            type="url"
            required
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Domain or Handle Label</label>
          <input
            type="text"
            value={form.domainOrHandle}
            onChange={(e) => setForm({ ...form, domainOrHandle: e.target.value })}
            className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700">Description</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2.5 rounded-lg border border-slate-200 text-xs"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700">Highlights (One per line)</label>
        <textarea
          rows={3}
          value={form.highlights.join('\n')}
          onChange={(e) => setForm({ ...form, highlights: e.target.value.split('\n') })}
          className="w-full p-2.5 rounded-lg border border-slate-200 text-xs"
        />
      </div>

      <MediaFieldPicker
        label="Community Banner / Emblem"
        value={form.image ?? ''}
        onChange={(nextUrl) => setForm({ ...form, image: nextUrl })}
      />
    </EditorDrawerShell>
  );
}

// ---------------------------------------------------------------------------
// 5. Career Opening Editor Drawer
// ---------------------------------------------------------------------------

export function createBlankCareer(): CareerOpening {
  return {
    id: `role-${Date.now()}`,
    title: '',
    department: 'Software Department',
    location: 'Cameroon / Hybrid',
    type: 'Internship (3 to 6 Mo)',
    summary: '',
    requirements: ['Foundational technical skill', 'Strong teamwork and discipline'],
    isOpen: true,
  };
}

export function CareerEditorDrawer({
  initialCareer,
  isNew,
  onClose,
  onSave,
}: {
  initialCareer: CareerOpening | null;
  isNew: boolean;
  onClose: () => void;
  onSave: (career: CareerOpening) => Promise<void>;
}) {
  const [form, setForm] = useState<CareerOpening>(() => initialCareer ?? createBlankCareer());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm(initialCareer ?? createBlankCareer());
    setError(null);
  }, [initialCareer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.summary.trim()) {
      setError('Role title and summary are required.');
      return;
    }
    setError(null);
    setSaving(true);
    try {
      await onSave({
        ...form,
        requirements: form.requirements.filter((r) => r.trim().length > 0),
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save role.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <EditorDrawerShell
      kicker={isNew ? 'New Open Position' : `Role ID: ${form.id}`}
      title={isNew ? 'Add Career / Internship Role' : form.title || 'Edit Role'}
      onClose={onClose}
      onSave={handleSubmit}
      saving={saving}
      error={error}
    >
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700">Role Title</label>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="e.g. Software Department Internship"
          className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Department</label>
          <input
            type="text"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Type / Duration</label>
          <input
            type="text"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs"
          />
        </div>
      </div>

      <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
        <input
          type="checkbox"
          checked={form.isOpen !== false}
          onChange={(e) => setForm({ ...form, isOpen: e.target.checked })}
        />
        <span>Role Open &amp; Visible on Careers Page</span>
      </label>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700">Role Overview</label>
        <textarea
          rows={3}
          required
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
          className="w-full p-2.5 rounded-lg border border-slate-200 text-xs"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700">Requirements (One per line)</label>
        <textarea
          rows={4}
          value={form.requirements.join('\n')}
          onChange={(e) => setForm({ ...form, requirements: e.target.value.split('\n') })}
          className="w-full p-2.5 rounded-lg border border-slate-200 text-xs"
        />
      </div>
    </EditorDrawerShell>
  );
}

// ---------------------------------------------------------------------------
// 6. Global FAQ Editor Drawer
// ---------------------------------------------------------------------------

export function createBlankFaq(): FaqItem {
  return {
    id: `faq-${Date.now()}`,
    question: '',
    answer: '',
  };
}

export function FaqEditorDrawer({
  initialFaq,
  isNew,
  onClose,
  onSave,
}: {
  initialFaq: FaqItem | null;
  isNew: boolean;
  onClose: () => void;
  onSave: (faq: FaqItem) => Promise<void>;
}) {
  const [form, setForm] = useState<FaqItem>(() => initialFaq ?? createBlankFaq());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm(initialFaq ?? createBlankFaq());
    setError(null);
  }, [initialFaq]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.question.trim() || !form.answer.trim()) {
      setError('Both question and answer are required.');
      return;
    }
    setError(null);
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save FAQ.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <EditorDrawerShell
      kicker={isNew ? 'New Global FAQ' : `FAQ ID: ${form.id}`}
      title={isNew ? 'Add FAQ Item' : 'Edit FAQ Item'}
      onClose={onClose}
      onSave={handleSubmit}
      saving={saving}
      error={error}
    >
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700">Question</label>
        <input
          type="text"
          required
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
          placeholder="e.g. How fast can SAMITECH deploy Starlink?"
          className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700">Answer</label>
        <textarea
          rows={5}
          required
          value={form.answer}
          onChange={(e) => setForm({ ...form, answer: e.target.value })}
          className="w-full p-3 rounded-lg border border-slate-200 text-sm leading-relaxed"
        />
      </div>
    </EditorDrawerShell>
  );
}
