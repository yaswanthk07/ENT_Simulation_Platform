import { useState } from 'react';
import { Sparkles, Cpu, Layers, GitBranch, Shield, Zap } from 'lucide-react';

interface RoadmapYear {
  year: string;
  phase: string;
  badge: string;
  status: 'Completed' | 'Active' | 'Upcoming';
  description: string;
  icon: typeof Cpu;
}

const ROADMAP_DATA: RoadmapYear[] = [
  {
    year: 'Year 1',
    phase: 'Foundational Groundwork & Assessment',
    badge: '1D & 2D BENCHMARKING',
    status: 'Active',
    description:
      'Conduct detailed studies on the existing 1D and 2D QCFD groundwork, including assessment of classical and quantum approaches, algorithms, accuracy, computational requirements, and potential scalability.',
    icon: Cpu,
  },
  {
    year: 'Year 2',
    phase: 'Unified Framework Integration',
    badge: 'HYBRID CO-PROCESSING',
    status: 'Upcoming',
    description:
      'Integrate the existing 1D and 2D classical CFD and QCFD modules into a unified simulation framework and establish a common workflow.',
    icon: GitBranch,
  },
  {
    year: 'Year 3',
    phase: 'High-Resolution Optimization & Robustness',
    badge: 'EFFICIENCY & STABILITY',
    status: 'Upcoming',
    description:
      'Optimize and refine the framework for high-resolution simulations, focusing on computational efficiency, numerical reliability, and robustness.',
    icon: Layers,
  },
  {
    year: 'Year 4',
    phase: '3D Complex Flow Extension',
    badge: '3D FULL NAVIER-STOKES',
    status: 'Upcoming',
    description:
      'Extend the validated and optimized framework to 3D and more complex flow configurations, while maintaining modularity and scalability.',
    icon: Shield,
  },
  {
    year: 'Year 5',
    phase: 'Modular Industrial QCFD Simulator Delivery',
    badge: 'COMMERCIAL PLATFORM DEPLOYMENT',
    status: 'Upcoming',
    description:
      'Deliver a modular and scalable QCFD Simulator capable of supporting complex, high-resolution flow problems, integrating classical CFD and quantum computing capabilities into a unified platform for future research and industrial applications.',
    icon: Zap,
  },
];

export default function RoadmapSection() {
  const [selectedYearIndex, setSelectedYearIndex] = useState(0); // Default to Year 1 (Active)

  const activeData = ROADMAP_DATA[selectedYearIndex];

  return (
    <section id="roadmap" className="relative py-28 bg-bg-secondary overflow-hidden border-t border-border-subtle">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-brand-cyan/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-brand-cyan/40 rounded-sm bg-brand-cyan/10 mb-4 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
            <Sparkles size={14} className="text-brand-cyan animate-pulse" />
            <span className="font-mono text-sm sm:text-base font-bold text-brand-cyan tracking-[0.2em] uppercase">
              5-YEAR TECHNOLOGY STRATEGY · QCFD HORIZON
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            QUANTUM COMPUTATIONAL FLUID DYNAMICS
            <br />
            <span className="text-gradient-cyan">5-YEAR DEVELOPMENT ROADMAP</span>
          </h2>
          
          <p className="text-slate-300 text-lg sm:text-xl font-normal leading-relaxed">
            Strategic progression advancing from initial 1D and 2D quantum groundwork toward an industrial-grade, fully integrated 3D QCFD simulation framework.
          </p>
        </div>

        {/* Timeline Navigation Bar */}
        <div className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3.5">
            {ROADMAP_DATA.map((item, idx) => {
              const isSelected = selectedYearIndex === idx;
              const Icon = item.icon;
              return (
                <button
                  key={item.year}
                  onClick={() => setSelectedYearIndex(idx)}
                  className={`p-4 rounded-sm border transition-all text-left flex flex-col justify-between min-h-[125px] relative group ${
                    isSelected
                      ? 'bg-brand-cyan/15 border-brand-cyan shadow-[0_0_20px_rgba(0,229,255,0.2)]'
                      : 'bg-bg-card/90 border-border-subtle hover:border-brand-cyan/40 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-mono text-xs font-extrabold tracking-wider ${isSelected ? 'text-brand-cyan' : 'text-slate-400'}`}>
                      {item.year.toUpperCase()}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                        item.status === 'Active'
                          ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 animate-pulse'
                          : 'bg-slate-800 text-slate-400 border border-border-subtle'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5 mt-2">
                    <div className={`p-1.5 rounded flex-shrink-0 mt-0.5 ${isSelected ? 'bg-brand-cyan text-black' : 'bg-slate-800 text-slate-300'}`}>
                      <Icon size={14} />
                    </div>
                    <div className="font-mono text-xs font-bold text-white leading-snug break-words">
                      {item.phase}
                    </div>
                  </div>

                  {/* Active Indicator bar */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ${
                      isSelected ? 'bg-brand-cyan' : 'bg-transparent group-hover:bg-brand-cyan/30'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Selected Year Spotlight Card */}
        <div className="glass-panel p-6 sm:p-10 rounded-sm border border-border-subtle shadow-2xl relative overflow-hidden mb-16">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Top Meta Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-border-subtle">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-brand-cyan/20 border border-brand-cyan/50 text-brand-cyan font-mono text-xs font-bold rounded-sm uppercase tracking-wider">
                  {activeData.year} · {activeData.badge}
                </span>
                <span
                  className={`text-xs font-mono px-2.5 py-1 rounded font-bold uppercase ${
                    activeData.status === 'Active'
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  {activeData.status === 'Active' ? '▶ Active Milestone' : '○ Upcoming Target'}
                </span>
              </div>

              {/* Navigation CTA to adjacent years */}
              <div className="flex items-center gap-3">
                <button
                  disabled={selectedYearIndex === 0}
                  onClick={() => setSelectedYearIndex((prev) => Math.max(0, prev - 1))}
                  className="px-3.5 py-1.5 rounded-sm border border-border-subtle bg-bg-card font-mono text-xs text-slate-300 hover:text-white hover:border-brand-cyan/40 disabled:opacity-30 disabled:pointer-events-none transition"
                >
                  ← Previous Year
                </button>
                <button
                  disabled={selectedYearIndex === ROADMAP_DATA.length - 1}
                  onClick={() => setSelectedYearIndex((prev) => Math.min(ROADMAP_DATA.length - 1, prev + 1))}
                  className="px-3.5 py-1.5 rounded-sm border border-brand-cyan/40 bg-brand-cyan/10 font-mono text-xs text-brand-cyan hover:bg-brand-cyan/20 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition flex items-center gap-1 font-semibold"
                >
                  Next Phase →
                </button>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 tracking-tight">
              {activeData.phase}
            </h3>

            {/* Exact Roadmap Directive */}
            <div className="p-5 sm:p-6 rounded-sm bg-bg-primary/80 border border-brand-cyan/25 relative">
              <div className="text-xs font-mono text-brand-cyan mb-2 uppercase font-bold tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                OFFICIAL MILESTONE DIRECTIVE:
              </div>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                "{activeData.description}"
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
