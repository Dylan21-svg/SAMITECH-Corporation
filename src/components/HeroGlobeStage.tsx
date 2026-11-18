import { CloudUpload, Code2, Network, ShieldCheck } from 'lucide-react';

interface HeroGlobeStageProps {
  onSelectCategory: (category: string) => void;
}

export function HeroGlobeStage({ onSelectCategory }: HeroGlobeStageProps) {
  return (
    <div className="relative w-full h-[175px] sm:h-[300px] md:h-[370px] lg:h-[490px] flex items-center justify-center select-none">
      {/* Glowing Digital Globe Backdrop */}
      <div className="relative w-[155px] h-[155px] sm:w-[270px] sm:h-[270px] md:w-[340px] md:h-[340px] lg:w-[420px] lg:h-[420px] flex items-center justify-center">
        {/* Radial Blue Atmospheric Glow */}
        <div
          className="absolute inset-0 rounded-full bg-radial from-[#38BDF8]/40 via-[#0044FF]/35 to-transparent blur-xl sm:blur-2xl"
          aria-hidden="true"
        />

        {/* Dotted / Wireframe Holographic Earth Globe SVG */}
        <svg
          viewBox="0 0 300 300"
          className="absolute -top-2 sm:-top-5 lg:-top-8 w-[124px] h-[124px] sm:w-[215px] sm:h-[215px] md:w-[260px] md:h-[260px] lg:w-[300px] lg:h-[300px] opacity-85"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="globeGrad" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.45" />
              <stop offset="65%" stopColor="#0044FF" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#040B29" stopOpacity="0.05" />
            </radialGradient>
            <pattern id="dotGrid" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#93C5FD" fillOpacity="0.55" />
            </pattern>
          </defs>
          <circle cx="150" cy="150" r="118" fill="url(#globeGrad)" stroke="#60A5FA" strokeOpacity="0.45" strokeWidth="1" />
          <circle cx="150" cy="150" r="114" fill="url(#dotGrid)" />
          {/* Longitude & Latitude arcs */}
          <ellipse cx="150" cy="150" rx="118" ry="44" fill="none" stroke="#93C5FD" strokeOpacity="0.32" strokeWidth="1" />
          <ellipse cx="150" cy="150" rx="118" ry="82" fill="none" stroke="#93C5FD" strokeOpacity="0.25" strokeWidth="1" />
          <ellipse cx="150" cy="150" rx="58" ry="118" fill="none" stroke="#93C5FD" strokeOpacity="0.32" strokeWidth="1" />
          <ellipse cx="150" cy="150" rx="95" ry="118" fill="none" stroke="#93C5FD" strokeOpacity="0.22" strokeWidth="1" />
          {/* Orbital Light Rings */}
          <ellipse
            cx="150"
            cy="158"
            rx="142"
            ry="38"
            transform="rotate(-14 150 158)"
            fill="none"
            stroke="#60A5FA"
            strokeOpacity="0.7"
            strokeWidth="1.4"
          />
          <ellipse
            cx="150"
            cy="162"
            rx="136"
            ry="32"
            transform="rotate(11 150 162)"
            fill="none"
            stroke="#93C5FD"
            strokeOpacity="0.5"
            strokeWidth="1"
          />
        </svg>

        {/* Centerpiece 3D-Styled ST Emblem matching official SAMITECH Corporation mark */}
        <div className="relative z-10 flex flex-col items-center translate-y-1 sm:translate-y-2 lg:translate-y-4">
          <div className="relative w-24 h-24 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-64 lg:h-64 drop-shadow-[0_10px_22px_rgba(0,102,255,0.65)]">
            <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden="true">
              <defs>
                <linearGradient id="stBlueRing" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="50%" stopColor="#0055FF" />
                  <stop offset="100%" stopColor="#001A99" />
                </linearGradient>
                <linearGradient id="stRedArc" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#950606" />
                  <stop offset="50%" stopColor="#EF1E26" />
                  <stop offset="100%" stopColor="#FF4D4D" />
                </linearGradient>
                <linearGradient id="stInnerBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1D6FFF" />
                  <stop offset="100%" stopColor="#00B4FF" />
                </linearGradient>
              </defs>

              {/* Outer Blue Crescent Arc (Left/Top) */}
              <path
                d="M 52 162 A 86 86 0 1 1 162 42 A 72 72 0 1 0 68 152 Z"
                fill="url(#stBlueRing)"
              />
              {/* Outer Red Crescent Arc (Bottom/Right) */}
              <path
                d="M 48 184 A 88 88 0 0 0 198 118 A 76 76 0 0 1 68 176 Z"
                fill="url(#stRedArc)"
              />
              {/* Stylized Red Top "T" Bar & Stem */}
              <path
                d="M 78 68 L 194 68 L 180 94 L 146 94 L 146 142 L 122 142 L 122 94 L 66 94 Z"
                fill="url(#stRedArc)"
                stroke="#FF8080"
                strokeOpacity="0.45"
                strokeWidth="1.5"
              />
              {/* Stylized Blue Sweeping "S" Ribbon */}
              <path
                d="M 68 106 L 116 106 L 116 130 L 88 130 Q 82 130 82 136 L 154 136 Q 178 136 178 158 Q 178 180 150 180 L 44 180 L 62 156 L 146 156 Q 154 156 154 149 Q 154 143 146 143 L 82 143 Q 68 143 68 122 Z"
                fill="url(#stInnerBlue)"
                stroke="#93C5FD"
                strokeOpacity="0.55"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* Glowing Concentric Neon-Blue Pedestal Rings */}
          <div className="relative -mt-3 sm:-mt-6 lg:-mt-8 w-28 sm:w-52 md:w-64 lg:w-80 h-8 sm:h-14 lg:h-20 flex items-center justify-center animate-pulse-ring">
            <div className="absolute w-full h-7 sm:h-12 lg:h-16 rounded-[100%] border sm:border-2 border-[#38BDF8]/80 bg-gradient-to-b from-[#0055FF]/35 to-[#040B29]/90 shadow-[0_0_20px_rgba(56,189,248,0.65)]" />
            <div className="absolute w-[78%] h-5 sm:h-9 lg:h-12 -translate-y-0.5 sm:-translate-y-1.5 rounded-[100%] border sm:border-2 border-[#60A5FA] bg-gradient-to-b from-[#1D6FFF]/45 to-[#040B29]/90 shadow-[0_0_14px_rgba(96,165,250,0.75)]" />
            <div className="absolute w-[54%] h-3 sm:h-5 lg:h-7 -translate-y-1.5 sm:-translate-y-3 rounded-[100%] border border-[#BAE6FD] bg-[#0044FF]/55 shadow-[0_0_12px_rgba(186,230,253,0.9)]" />
          </div>
        </div>

        {/* 4 Floating Glassmorphic Interactive Tech Nodes around the Globe */}
        <button
          type="button"
          onClick={() => onSelectCategory('Networking Solutions')}
          title="Explore Cloud & Networking Solutions"
          aria-label="Cloud and Networking Solutions"
          className="absolute top-3 sm:top-6 lg:top-8 left-0 sm:left-0 w-6 h-6 sm:w-10 sm:h-10 lg:w-14 lg:h-14 rounded-md sm:rounded-xl bg-[#0044FF]/35 backdrop-blur-md border border-[#93C5FD]/55 shadow-[0_0_16px_rgba(56,189,248,0.45)] flex items-center justify-center text-white hover:scale-110 hover:border-white transition-all duration-200 cursor-pointer"
        >
          <CloudUpload className="w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#E0F2FE]" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => onSelectCategory('Cybersecurity Services')}
          title="Explore Cybersecurity Services"
          aria-label="Cybersecurity Services"
          className="absolute top-2 sm:top-5 lg:top-6 right-0 sm:right-0 w-6 h-6 sm:w-10 sm:h-10 lg:w-14 lg:h-14 rounded-md sm:rounded-xl bg-[#0044FF]/35 backdrop-blur-md border border-[#93C5FD]/55 shadow-[0_0_16px_rgba(56,189,248,0.45)] flex items-center justify-center text-white hover:scale-110 hover:border-white transition-all duration-200 cursor-pointer"
        >
          <ShieldCheck className="w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#E0F2FE]" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => onSelectCategory('Software Development')}
          title="Explore Software Development"
          aria-label="Software Development"
          className="absolute bottom-7 sm:bottom-12 lg:bottom-16 -left-1 sm:-left-3 lg:-left-4 w-6 h-6 sm:w-10 sm:h-10 lg:w-14 lg:h-14 rounded-md sm:rounded-xl bg-[#0044FF]/35 backdrop-blur-md border border-[#93C5FD]/55 shadow-[0_0_16px_rgba(56,189,248,0.45)] flex items-center justify-center text-white hover:scale-110 hover:border-white transition-all duration-200 cursor-pointer"
        >
          <Code2 className="w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#E0F2FE]" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => onSelectCategory('Data & AI')}
          title="Explore Data, AI & Network Mesh"
          aria-label="Data, AI and Network Topology"
          className="absolute bottom-6 sm:bottom-10 lg:bottom-14 -right-1 sm:-right-2 lg:-right-3 w-6 h-6 sm:w-10 sm:h-10 lg:w-14 lg:h-14 rounded-md sm:rounded-xl bg-[#0044FF]/35 backdrop-blur-md border border-[#93C5FD]/55 shadow-[0_0_16px_rgba(56,189,248,0.45)] flex items-center justify-center text-white hover:scale-110 hover:border-white transition-all duration-200 cursor-pointer"
        >
          <Network className="w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#E0F2FE]" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
