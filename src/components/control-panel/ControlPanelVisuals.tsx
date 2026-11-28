import { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { BarChart3, ChevronDown, Eye, MousePointer, Users } from 'lucide-react';

// -----------------------------------------------------------------------------
// Custom 3D-Style KPI Tile Icons (Matching Control Panel Design Reference)
// -----------------------------------------------------------------------------
export function Kpi3DCubeIcon() {
  return (
    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#DCEBFF] to-[#C2DCFF] border border-white/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_6px_14px_rgba(0,85,255,0.14)] flex items-center justify-center shrink-0">
      <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none" aria-hidden="true">
        <path d="M20 5L33 12.2V27.8L20 35L7 27.8V12.2L20 5Z" fill="#0B5CFF" />
        <path d="M20 5L33 12.2L20 19.5L7 12.2L20 5Z" fill="#4BA3FF" />
        <path d="M20 19.5L33 12.2V27.8L20 35V19.5Z" fill="#0041CC" />
        <path
          d="M20 19.5V35M20 19.5L33 12.2M20 19.5L7 12.2"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function Kpi3DGearIcon() {
  return (
    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#EDE3FF] to-[#DCCBFF] border border-white/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_6px_14px_rgba(124,58,237,0.14)] flex items-center justify-center shrink-0">
      <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="cpGearGrad" x1="8" y1="6" x2="32" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
        </defs>
        <path
          d="M17.2 5.4C17.5 4.6 18.2 4 19 4H21C21.8 4 22.5 4.6 22.8 5.4L23.5 7.7C24.5 8 25.4 8.4 26.2 8.9L28.4 7.8C29.2 7.4 30.1 7.6 30.7 8.2L32.1 9.6C32.7 10.2 32.9 11.1 32.5 11.9L31.4 14.1C31.9 14.9 32.3 15.8 32.6 16.8L34.9 17.5C35.7 17.8 36.3 18.5 36.3 19.3V21.3C36.3 22.1 35.7 22.8 34.9 23.1L32.6 23.8C32.3 24.8 31.9 25.7 31.4 26.5L32.5 28.7C32.9 29.5 32.7 30.4 32.1 31L30.7 32.4C30.1 33 29.2 33.2 28.4 32.8L26.2 31.7C25.4 32.2 24.5 32.6 23.5 32.9L22.8 35.2C22.5 36 21.8 36.6 21 36.6H19C18.2 36.6 17.5 36 17.2 35.2L16.5 32.9C15.5 32.6 14.6 32.2 13.8 31.7L11.6 32.8C10.8 33.2 9.9 33 9.3 32.4L7.9 31C7.3 30.4 7.1 29.5 7.5 28.7L8.6 26.5C8.1 25.7 7.7 24.8 7.4 23.8L5.1 23.1C4.3 22.8 3.7 22.1 3.7 21.3V19.3C3.7 18.5 4.3 17.8 5.1 17.5L7.4 16.8C7.7 15.8 8.1 14.9 8.6 14.1L7.5 11.9C7.1 11.1 7.3 10.2 7.9 9.6L9.3 8.2C9.9 7.6 10.8 7.4 11.6 7.8L13.8 8.9C14.6 8.4 15.5 8 16.5 7.7L17.2 5.4Z"
          fill="url(#cpGearGrad)"
        />
        <circle cx="20" cy="20.3" r="5.5" fill="#EDE3FF" />
      </svg>
    </div>
  );
}

export function Kpi3DFolderIcon() {
  return (
    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D7F7E8] to-[#BCEFD6] border border-white/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_6px_14px_rgba(16,185,129,0.14)] flex items-center justify-center shrink-0">
      <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none" aria-hidden="true">
        <path
          d="M5 11C5 9.34315 6.34315 8 8 8H15.2C16.1 8 16.95 8.42 17.5 9.14L19.4 11.6H32C33.6569 11.6 35 12.9431 35 14.6V29C35 30.6569 33.6569 32 32 32H8C6.34315 32 5 30.6569 5 29V11Z"
          fill="#059669"
        />
        <rect x="6" y="14" width="28" height="17" rx="3" fill="#10B981" />
        <rect x="9" y="17" width="14" height="2.4" rx="1.2" fill="rgba(255,255,255,0.5)" />
      </svg>
    </div>
  );
}

export function Kpi3DTeamIcon() {
  return (
    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] border border-white/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_6px_14px_rgba(37,99,235,0.14)] flex items-center justify-center shrink-0">
      <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none" aria-hidden="true">
        <circle cx="27" cy="14" r="4.2" fill="#3B82F6" />
        <path
          d="M22.5 29C22.5 24.8 25.4 22 29.2 22C32.2 22 34.5 23.9 35 27.5V29H22.5Z"
          fill="#3B82F6"
        />
        <circle cx="16.5" cy="13.5" r="5.3" fill="#0044FF" />
        <path
          d="M6.5 30C6.5 24.4772 10.9772 20 16.5 20C22.0228 20 26.5 24.4772 26.5 30V31H6.5V30Z"
          fill="#0044FF"
        />
      </svg>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Quick Action Icons (6 Pastel Cards)
// -----------------------------------------------------------------------------
export type QuickActionKind =
  | 'product'
  | 'service'
  | 'project'
  | 'team'
  | 'community'
  | 'career';

export function QuickActionIcon({ kind }: { kind: QuickActionKind }) {
  if (kind === 'product') {
    return (
      <svg viewBox="0 0 28 28" className="w-7 h-7" fill="none" aria-hidden="true">
        <path d="M14 3L24 8.4V19.6L14 25L4 19.6V8.4L14 3Z" fill="#0044FF" />
        <path d="M14 3L24 8.4L14 14L4 8.4L14 3Z" fill="#60A5FA" />
        <path d="M14 14L24 8.4V19.6L14 25V14Z" fill="#0035C5" />
      </svg>
    );
  }
  if (kind === 'service') {
    return (
      <svg viewBox="0 0 28 28" className="w-7 h-7" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="8.5" height="8.5" rx="2.2" fill="#7C3AED" />
        <rect x="15.5" y="4" width="8.5" height="8.5" rx="2.2" fill="#A855F7" />
        <rect x="4" y="15.5" width="8.5" height="8.5" rx="2.2" fill="#A855F7" />
        <rect x="15.5" y="15.5" width="8.5" height="8.5" rx="2.2" fill="#6D28D9" />
      </svg>
    );
  }
  if (kind === 'project') {
    return (
      <svg viewBox="0 0 28 28" className="w-7 h-7" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="22" height="18" rx="3.5" fill="#10B981" />
        <circle cx="9.5" cy="11" r="2.2" fill="#D1FAE5" />
        <path d="M6 20L11.5 14L15.5 18L19 14.5L23 20H6Z" fill="#047857" />
      </svg>
    );
  }
  if (kind === 'team') {
    return (
      <svg viewBox="0 0 28 28" className="w-7 h-7" fill="none" aria-hidden="true">
        <circle cx="19" cy="10.5" r="3" fill="#3B82F6" />
        <path d="M15.5 22C15.5 18.8 17.7 16.5 20.8 16.5C23 16.5 24.5 17.8 25 20.5V22H15.5Z" fill="#3B82F6" />
        <circle cx="11.5" cy="10" r="3.8" fill="#0044FF" />
        <path d="M4.5 22.5C4.5 18.4 7.6 15.5 11.5 15.5C15.4 15.5 18.5 18.4 18.5 22.5V23H4.5V22.5Z" fill="#0044FF" />
      </svg>
    );
  }
  if (kind === 'community') {
    return (
      <svg viewBox="0 0 28 28" className="w-7 h-7" fill="none" aria-hidden="true">
        <circle cx="19.5" cy="10.5" r="3" fill="#FB923C" />
        <path d="M16 22C16 18.8 18.1 16.5 21 16.5C23 16.5 24.5 17.8 25 20.5V22H16Z" fill="#FB923C" />
        <circle cx="11.5" cy="10" r="3.8" fill="#EA580C" />
        <path d="M4.5 22.5C4.5 18.4 7.6 15.5 11.5 15.5C15.4 15.5 18.5 18.4 18.5 22.5V23H4.5V22.5Z" fill="#EA580C" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 28 28" className="w-7 h-7" fill="none" aria-hidden="true">
      <path d="M10 6.5C10 5.4 10.9 4.5 12 4.5H16C17.1 4.5 18 5.4 18 6.5V8.5H10V6.5Z" fill="#4338CA" />
      <rect x="4" y="8" width="20" height="15" rx="3.2" fill="#4F46E5" />
      <path d="M4 13.5H24" stroke="#C7D2FE" strokeWidth="1.5" />
      <rect x="12.2" y="12" width="3.6" height="3" rx="0.8" fill="#E0E7FF" />
    </svg>
  );
}

// -----------------------------------------------------------------------------
// Sidebar Decorations (Pulse Wave + Cosmic Starburst + Subtle World Map)
// -----------------------------------------------------------------------------
export function SidebarPulseWave() {
  return (
    <svg viewBox="0 0 64 26" className="w-12 h-5 shrink-0" fill="none" aria-hidden="true">
      <polyline
        points="2,14 14,14 19,6 24,22 29,4 35,19 40,12 46,14 62,14"
        stroke="#22C55E"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SidebarCosmicStarGraphic() {
  return (
    <svg viewBox="0 0 180 120" className="w-36 h-24 mx-auto opacity-95" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="cpStarGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#2563EB" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#040B29" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cpOrbitLine" x1="20" y1="90" x2="160" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <circle cx="90" cy="60" r="54" fill="url(#cpStarGlow)" />
      <ellipse
        cx="90"
        cy="60"
        rx="68"
        ry="22"
        transform="rotate(-24 90 60)"
        stroke="url(#cpOrbitLine)"
        strokeWidth="1.4"
      />
      <ellipse
        cx="90"
        cy="60"
        rx="56"
        ry="18"
        transform="rotate(20 90 60)"
        stroke="rgba(147,197,253,0.45)"
        strokeWidth="1"
      />
      {/* 4-point glowing star */}
      <path
        d="M90 14L96.5 52.5L134 60L96.5 67.5L90 106L83.5 67.5L46 60L83.5 52.5L90 14Z"
        fill="#60A5FA"
      />
      <path
        d="M90 28L93.5 55L120 60L93.5 65L90 92L86.5 65L60 60L86.5 55L90 28Z"
        fill="#EFF6FF"
      />
      <circle cx="143" cy="36" r="2.2" fill="#93C5FD" />
      <circle cx="44" cy="84" r="1.8" fill="#60A5FA" />
    </svg>
  );
}

export function DottedWorldMapBackdrop() {
  // Lightweight decorative dot grid representing global connectivity
  const dots: { cx: number; cy: number }[] = [];
  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < 26; col++) {
      const wave =
        Math.sin(col * 0.45 + row * 0.35) + Math.cos(col * 0.25 - row * 0.6);
      if (wave > 0.15) {
        dots.push({ cx: 14 + col * 15, cy: 14 + row * 14 });
      }
    }
  }
  return (
    <svg
      viewBox="0 0 400 180"
      className="w-[380px] h-[170px] text-[#3B82F6]/18 pointer-events-none select-none"
      fill="currentColor"
      aria-hidden="true"
    >
      {dots.map((dot, i) => (
        <circle key={i} cx={dot.cx} cy={dot.cy} r="2.1" />
      ))}
    </svg>
  );
}

// -----------------------------------------------------------------------------
// Website Overview Interactive Recharts Card
// -----------------------------------------------------------------------------
type TimeRangeKey = '7d' | '30d' | '90d';

const ANALYTICS_SERIES: Record<
  TimeRangeKey,
  {
    visitorsTotal: string;
    visitorsDelta: string;
    viewsTotal: string;
    viewsDelta: string;
    uniqueTotal: string;
    uniqueDelta: string;
    points: { label: string; visitors: number; pageViews: number }[];
  }
> = {
  '7d': {
    visitorsTotal: '6.4K',
    visitorsDelta: '+9.8%',
    viewsTotal: '2.9K',
    viewsDelta: '+14.1%',
    uniqueTotal: '1.2K',
    uniqueDelta: '+11.3%',
    points: [
      { label: 'Mon', visitors: 3200, pageViews: 1900 },
      { label: 'Tue', visitors: 4600, pageViews: 2600 },
      { label: 'Wed', visitors: 5100, pageViews: 3100 },
      { label: 'Thu', visitors: 4900, pageViews: 2950 },
      { label: 'Fri', visitors: 6800, pageViews: 4100 },
      { label: 'Sat', visitors: 7400, pageViews: 4550 },
      { label: 'Sun', visitors: 8600, pageViews: 5300 },
    ],
  },
  '30d': {
    visitorsTotal: '24.8K',
    visitorsDelta: '+12.5%',
    viewsTotal: '8.7K',
    viewsDelta: '+18.2%',
    uniqueTotal: '3.1K',
    uniqueDelta: '+14.7%',
    points: [
      { label: 'Nov 1', visitors: 4200, pageViews: 2400 },
      { label: 'Nov 5', visitors: 4700, pageViews: 2900 },
      { label: 'Nov 8', visitors: 5600, pageViews: 3350 },
      { label: 'Nov 12', visitors: 6400, pageViews: 4100 },
      { label: 'Nov 15', visitors: 7900, pageViews: 4850 },
      { label: 'Nov 19', visitors: 7700, pageViews: 5200 },
      { label: 'Nov 22', visitors: 8900, pageViews: 5900 },
      { label: 'Nov 26', visitors: 11200, pageViews: 7800 },
      { label: 'Nov 30', visitors: 12400, pageViews: 8700 },
    ],
  },
  '90d': {
    visitorsTotal: '68.2K',
    visitorsDelta: '+24.6%',
    viewsTotal: '26.4K',
    viewsDelta: '+29.1%',
    uniqueTotal: '9.4K',
    uniqueDelta: '+21.0%',
    points: [
      { label: 'Sep W1', visitors: 5200, pageViews: 3100 },
      { label: 'Sep W3', visitors: 6800, pageViews: 4200 },
      { label: 'Oct W1', visitors: 7900, pageViews: 4900 },
      { label: 'Oct W3', visitors: 9400, pageViews: 6100 },
      { label: 'Nov W1', visitors: 10800, pageViews: 7200 },
      { label: 'Nov W3', visitors: 12900, pageViews: 8600 },
      { label: 'Nov W4', visitors: 14600, pageViews: 9800 },
    ],
  },
};

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ value?: number; dataKey?: string }>;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const visitorsVal = payload.find((p) => p.dataKey === 'visitors')?.value ?? payload[0]?.value ?? 0;
  const formatted =
    visitorsVal >= 1000 ? `${(visitorsVal / 1000).toFixed(1)}K` : `${visitorsVal}`;
  return (
    <div className="px-3 py-1 rounded-full bg-[#07133B] text-white text-xs font-bold shadow-lg border border-white/15 flex items-center gap-1.5">
      <span className="tabular-nums">{formatted}</span>
      <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]" />
    </div>
  );
}

export function WebsiteOverviewChartCard() {
  const [range, setRange] = useState<TimeRangeKey>('30d');
  const activeSeries = ANALYTICS_SERIES[range];

  return (
    <div className="rounded-2xl bg-white/85 backdrop-blur-md border border-white shadow-[0_10px_28px_rgba(7,19,59,0.06)] p-5 flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#EFF5FF] text-[#0044FF] flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h2 className="text-[15px] font-bold text-[#07133B] tracking-tight">
              Website Overview
            </h2>
          </div>

          <div className="relative">
            <select
              aria-label="Analytics timeframe"
              value={range}
              onChange={(e) => setRange(e.target.value as TimeRangeKey)}
              className="appearance-none h-8 pl-3 pr-7 rounded-full bg-slate-50/90 border border-slate-200 text-xs font-semibold text-[#07133B] focus:outline-none focus:border-[#0044FF] cursor-pointer"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 3 Metrics Strip */}
        <div className="grid grid-cols-3 gap-3 pt-1">
          <div className="flex items-start gap-2.5">
            <Eye className="w-4 h-4 text-[#0044FF] mt-1 shrink-0" />
            <div className="min-w-0">
              <div className="text-xl sm:text-2xl font-extrabold text-[#07133B] leading-none tabular-nums">
                {activeSeries.visitorsTotal}
              </div>
              <div className="text-[11px] font-medium text-slate-500 mt-1 truncate">
                Total Visitors
              </div>
              <div className="text-[11px] font-bold text-emerald-600 mt-0.5 tabular-nums">
                ↑ {activeSeries.visitorsDelta}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 border-l border-slate-200/70 pl-3">
            <MousePointer className="w-4 h-4 text-[#0044FF] mt-1 shrink-0" />
            <div className="min-w-0">
              <div className="text-xl sm:text-2xl font-extrabold text-[#07133B] leading-none tabular-nums">
                {activeSeries.viewsTotal}
              </div>
              <div className="text-[11px] font-medium text-slate-500 mt-1 truncate">
                Page Views
              </div>
              <div className="text-[11px] font-bold text-emerald-600 mt-0.5 tabular-nums">
                ↑ {activeSeries.viewsDelta}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 border-l border-slate-200/70 pl-3">
            <Users className="w-4 h-4 text-[#0044FF] mt-1 shrink-0" />
            <div className="min-w-0">
              <div className="text-xl sm:text-2xl font-extrabold text-[#07133B] leading-none tabular-nums">
                {activeSeries.uniqueTotal}
              </div>
              <div className="text-[11px] font-medium text-slate-500 mt-1 truncate">
                Unique Visitors
              </div>
              <div className="text-[11px] font-bold text-emerald-600 mt-0.5 tabular-nums">
                ↑ {activeSeries.uniqueDelta}
              </div>
            </div>
          </div>
        </div>

        {/* Chart Legend */}
        <div className="flex items-center justify-center gap-5 text-[11px] font-semibold text-slate-600 pt-1">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0044FF]" />
            <span>Visitors</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
            <span>Page Views</span>
          </span>
        </div>
      </div>

      {/* Recharts Smooth Area Chart */}
      <div className="h-[190px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={activeSeries.points}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="cpVisitorsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0044FF" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#0044FF" stopOpacity={0.01} />
              </linearGradient>
              <linearGradient id="cpViewsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 4" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 11 }}
              dy={6}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 11 }}
              tickFormatter={(v: number) => (v === 0 ? '0' : `${Math.round(v / 1000)}K`)}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="visitors"
              stroke="#0044FF"
              strokeWidth={2.5}
              fill="url(#cpVisitorsFill)"
              activeDot={{ r: 5, fill: '#0044FF', stroke: '#FFFFFF', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="pageViews"
              stroke="#38BDF8"
              strokeWidth={2.2}
              fill="url(#cpViewsFill)"
              activeDot={{ r: 4, fill: '#38BDF8', stroke: '#FFFFFF', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Bottom Help Banner Laptop Visual
// -----------------------------------------------------------------------------
export function CustomSolutionBannerVisual() {
  return (
    <div className="relative w-44 sm:w-52 h-28 shrink-0 hidden md:flex items-center justify-center select-none pointer-events-none">
      {/* Glow orb */}
      <div className="absolute inset-2 bg-[#2563EB]/35 blur-xl rounded-full" />
      {/* Angled sleek dark laptop frame */}
      <div className="relative w-40 h-24 rounded-xl bg-gradient-to-br from-[#0D1E59] to-[#040B29] border border-[#60A5FA]/45 shadow-2xl -rotate-6 flex flex-col items-center justify-center p-2.5 overflow-hidden">
        <div className="absolute top-1.5 left-2 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400/80" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-300/80" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
        </div>
        <img
          src="/assets/aistudio/Samitech_Corporation_Logo_7401e1c3.png"
          alt=""
          className="h-7 w-auto object-contain footer-logo-glow"
        />
        <span className="mt-1 text-[9px] font-semibold tracking-wider uppercase text-blue-200/80">
          Cloud Control Center
        </span>
      </div>
      {/* Laptop metallic base */}
      <div className="absolute bottom-1 w-44 h-2.5 rounded-b-xl bg-gradient-to-r from-slate-400/50 via-slate-200/80 to-slate-400/50 -rotate-6 blur-[0.3px]" />
    </div>
  );
}
