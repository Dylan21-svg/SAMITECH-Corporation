import { useState } from 'react';
import { Activity, Server } from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type ImpactViewMode = 'split' | 'growth' | 'uptime';

interface GrowthPoint {
  period: string;
  deployments: number;
  managedNodes: number;
  note: string;
}

interface UptimeDepartmentPoint {
  department: string;
  shortLabel: string;
  uptime: number;
  responseSla: string;
  color: string;
}

const INFRASTRUCTURE_GROWTH_DATA: GrowthPoint[] = [
  {
    period: '2022',
    deployments: 14,
    managedNodes: 38,
    note: 'Founding web platforms & initial campus networks',
  },
  {
    period: '2023',
    deployments: 31,
    managedNodes: 96,
    note: 'Multi-site LAN/WAN & MikroTik rollouts across Cameroon',
  },
  {
    period: '2024',
    deployments: 56,
    managedNodes: 195,
    note: 'Cloud infrastructure, Starlink links & retail SaaS',
  },
  {
    period: '2025',
    deployments: 84,
    managedNodes: 318,
    note: 'CampusPro, VELORA Store & enterprise VPN mesh',
  },
  {
    period: '2026',
    deployments: 108,
    managedNodes: 440,
    note: 'Sylvester AI, Mail Console & managed NOC operations',
  },
];

const DEPARTMENT_UPTIME_DATA: UptimeDepartmentPoint[] = [
  {
    department: 'Cloud & DevOps',
    shortLabel: 'Cloud',
    uptime: 99.96,
    responseSla: '< 10 min failover',
    color: '#002BFF',
  },
  {
    department: 'Network & Starlink',
    shortLabel: 'Networks',
    uptime: 99.95,
    responseSla: 'Dual-WAN routing',
    color: '#0EA5E9',
  },
  {
    department: 'Cybersecurity & CCTV',
    shortLabel: 'Security',
    uptime: 99.94,
    responseSla: '24/7 perimeter watch',
    color: '#0F766E',
  },
  {
    department: 'Software & SaaS',
    shortLabel: 'Software',
    uptime: 99.92,
    responseSla: 'Zero-downtime CI/CD',
    color: '#1D4ED8',
  },
  {
    department: 'IT Maintenance SLA',
    shortLabel: 'Support',
    uptime: 99.88,
    responseSla: 'Same-day dispatch',
    color: '#475569',
  },
];

interface CustomTooltipPayloadItem<T> {
  name?: string;
  value?: number | string;
  color?: string;
  dataKey?: string;
  payload?: T;
}

interface CustomTooltipProps<T> {
  active?: boolean;
  payload?: CustomTooltipPayloadItem<T>[];
  label?: string | number;
}

function GrowthTooltip({ active, payload, label }: CustomTooltipProps<GrowthPoint>) {
  if (!active || !payload || payload.length === 0) return null;
  const point = payload[0]?.payload;

  return (
    <div className="rounded-xl bg-[#040B29] text-white px-3.5 py-2.5 shadow-xl border border-[#1E3A8A]/70 text-xs max-w-[230px]">
      <div className="font-bold text-[#93C5FD] tabular-nums mb-1.5">
        {String(label ?? '')} Milestone
      </div>
      <div className="space-y-1 tabular-nums">
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-300">Managed Nodes</span>
          <span className="font-mono font-bold text-white">{point?.managedNodes ?? 0}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-300">Delivered Systems</span>
          <span className="font-mono font-bold text-[#38BDF8]">{point?.deployments ?? 0}</span>
        </div>
      </div>
      {point?.note && (
        <p className="mt-1.5 pt-1.5 border-t border-white/15 text-[11px] text-slate-300 leading-snug">
          {point.note}
        </p>
      )}
    </div>
  );
}

function UptimeTooltip({ active, payload }: CustomTooltipProps<UptimeDepartmentPoint>) {
  if (!active || !payload || payload.length === 0) return null;
  const point = payload[0]?.payload;
  if (!point) return null;

  return (
    <div className="rounded-xl bg-[#040B29] text-white px-3.5 py-2.5 shadow-xl border border-[#1E3A8A]/70 text-xs max-w-[220px]">
      <div className="font-bold text-white mb-1">{point.department}</div>
      <div className="flex items-center justify-between gap-4 tabular-nums">
        <span className="text-slate-300">Measured Uptime</span>
        <span className="font-mono font-bold text-[#38BDF8]">{point.uptime.toFixed(2)}%</span>
      </div>
      <div className="mt-1 text-[11px] text-slate-300">SLA: {point.responseSla}</div>
    </div>
  );
}

export function ServiceImpactCharts() {
  const [viewMode, setViewMode] = useState<ImpactViewMode>('split');

  const showGrowth = viewMode === 'split' || viewMode === 'growth';
  const showUptime = viewMode === 'split' || viewMode === 'uptime';

  return (
    <div className="rounded-2xl border border-[#DCE8FF] bg-[#F8FAFF] p-5 sm:p-6 lg:p-8 shadow-[0_12px_32px_rgba(4,11,41,0.05)]">
      {/* Header & Interactive View Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-5 sm:pb-6 border-b border-[#DCE8FF]">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-semibold text-[#002BFF]">
            <span>Service Impact Analytics</span>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <span className="font-mono tabular-nums text-[#07133B]">99.94% Avg. Uptime</span>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <span className="font-mono tabular-nums text-[#07133B]">440+ Active Nodes</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#07133B]">
            Infrastructure Growth &amp; Reliability Telemetry
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Cumulative expansion in managed client infrastructure alongside verified annual uptime across SAMITECH delivery divisions.
          </p>
        </div>

        <div
          role="group"
          aria-label="Chart display mode"
          className="inline-flex items-center self-start lg:self-auto rounded-lg bg-white border border-[#DCE8FF] p-1 gap-1"
        >
          {(
            [
              { id: 'split', label: 'Combined View' },
              { id: 'growth', label: 'Client Growth' },
              { id: 'uptime', label: 'Uptime SLA' },
            ] as const
          ).map((tab) => {
            const active = viewMode === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setViewMode(tab.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-[#07133B] text-white'
                    : 'text-slate-600 hover:text-[#07133B] hover:bg-[#F2F6FF]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Charts Grid */}
      <div
        className={`mt-5 sm:mt-6 grid gap-5 sm:gap-6 ${
          viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {showGrowth && (
          <div className="rounded-xl bg-white border border-[#DCE8FF] p-4 sm:p-5 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-[#002BFF]" strokeWidth={1.85} aria-hidden="true" />
                  <h4 className="text-sm sm:text-base font-bold text-[#07133B]">
                    Client Infrastructure Expansion (2022–2026)
                  </h4>
                </div>
                <p className="text-xs text-slate-500">
                  Cumulative managed network sites, servers &amp; production software systems
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="font-mono tabular-nums text-base sm:text-lg font-extrabold text-[#002BFF] leading-none">
                  +11.5x
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Node Growth</div>
              </div>
            </div>

            <div className="w-full h-[250px] sm:h-[270px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={INFRASTRUCTURE_GROWTH_DATA}
                  margin={{ top: 10, right: 12, left: -12, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="samitechNodesFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#002BFF" stopOpacity={0.26} />
                      <stop offset="95%" stopColor="#002BFF" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="samitechDeploysFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis
                    dataKey="period"
                    tick={{ fill: '#475569', fontSize: 12 }}
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#475569', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<GrowthTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="managedNodes"
                    name="Managed Nodes"
                    stroke="#002BFF"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#samitechNodesFill)"
                    activeDot={{ r: 5, fill: '#002BFF', stroke: '#FFFFFF', strokeWidth: 2 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="deployments"
                    name="Delivered Systems"
                    stroke="#0EA5E9"
                    strokeWidth={2.25}
                    fillOpacity={1}
                    fill="url(#samitechDeploysFill)"
                    activeDot={{ r: 4.5, fill: '#0EA5E9', stroke: '#FFFFFF', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#002BFF]" aria-hidden="true" />
                  <span>Managed Nodes (440)</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#0EA5E9]" aria-hidden="true" />
                  <span>Delivered Systems (108)</span>
                </span>
              </div>
              <span className="text-slate-400">Hover chart for annual milestones</span>
            </div>
          </div>
        )}

        {showUptime && (
          <div className="rounded-xl bg-white border border-[#DCE8FF] p-4 sm:p-5 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#0F766E]" strokeWidth={1.85} aria-hidden="true" />
                  <h4 className="text-sm sm:text-base font-bold text-[#07133B]">
                    Verified Division Uptime vs. SLA Target (%)
                  </h4>
                </div>
                <p className="text-xs text-slate-500">
                  Rolling 12-month availability across active production deployments
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="font-mono tabular-nums text-base sm:text-lg font-extrabold text-[#0F766E] leading-none">
                  99.90%
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">SLA Baseline</div>
              </div>
            </div>

            <div className="w-full h-[250px] sm:h-[270px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={DEPARTMENT_UPTIME_DATA}
                  margin={{ top: 10, right: 12, left: -4, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis
                    dataKey="shortLabel"
                    tick={{ fill: '#475569', fontSize: 12 }}
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[99.75, 100]}
                    tickCount={6}
                    tickFormatter={(val: number) => `${val.toFixed(2)}%`}
                    tick={{ fill: '#475569', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={56}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(0, 43, 255, 0.05)' }}
                    content={<UptimeTooltip />}
                  />
                  <ReferenceLine
                    y={99.9}
                    stroke="#DC0914"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    label={{
                      value: '99.9% Target',
                      position: 'insideTopRight',
                      fill: '#DC0914',
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  />
                  <Bar dataKey="uptime" name="Measured Uptime" radius={[6, 6, 0, 0]} maxBarSize={44}>
                    {DEPARTMENT_UPTIME_DATA.map((entry) => (
                      <Cell key={entry.department} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-[#DC0914]" aria-hidden="true" />
                  <span>99.90% SLA Baseline</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#002BFF]" aria-hidden="true" />
                  <span>Peak: 99.96% Cloud</span>
                </span>
              </div>
              <span className="text-slate-400">Hover bars for SLA response detail</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
