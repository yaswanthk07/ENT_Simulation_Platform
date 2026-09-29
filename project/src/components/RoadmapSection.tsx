import { useState } from 'react';
import { Calendar, CheckCircle2, ArrowRight, Sparkles, Cpu, Layers, GitBranch, Shield, Zap } from 'lucide-react';

interface RoadmapYear {
  year: string;
  phase: string;
  badge: string;
  status: 'Completed' | 'Active' | 'Upcoming';
  description: string;
  deliverables: string[];
  metrics: { label: string; value: string };
  icon: typeof Cpu;
}

const ROADMAP_DATA: RoadmapYear[] = [
  {
    year: 'Year 1',
    phase: 'Foundational Groundwork & Assessment',
    badge: '1D & 2D BENCHMARKING',
    status: 'Completed',
    description:
      'Conduct detailed studies on the existing 1D and 2D QCFD groundwork, including assessment of classical and quantum approaches, algorithms, accuracy, computational requirements, and potential scalability.',
    deliverables: [
      'Comparative accuracy analysis between classical Navier-Stokes & quantum algorithms',
      'Evaluation of qubit resource requirements, circuit depth, and noise thresholds',
      'Benchmarking 1D Burgers equation & 2D Euler flow quantum linear system solvers (QLS)',
    ],
    metrics: { label: 'Theoretical Scalability', value: 'Verified O(log N)' },
    icon: Cpu,
  },
  {
    year: 'Year 2',
    phase: 'Unified Framework Integration',
    badge: 'HYBRID CO-PROCESSING',
    status: 'Active',
    description:
      'Integrate the existing 1D and 2D classical CFD and QCFD modules into a unified simulation framework and establish a common workflow.',
    deliverables: [
      'Seamless QPU-GPU data interchange for mesh state vector serialization',
      'Unified API for switching between classical OpenFOAM kernels & VQLS routines',
      'Automated hybrid workflow pipeline with convergence monitoring and fallback',
    ],
    metrics: { label: 'Framework Interop', value: '100% Unified Pipeline' },
    icon: GitBranch,
  },
  {
    year: 'Year 3',
    phase: 'High-Resolution Optimization & Robustness',
    badge: 'EFFICIENCY & STABILITY',
    status: 'Upcoming',
    description:
      'Optimize and refine the framework for high-resolution simulations, focusing on computational efficiency, numerical reliability, and robustness.',
    deliverables: [
      'Quantum preconditioning techniques to accelerate matrix inversion in stiff flows',
      'Algorithmic error mitigation tailored to variational quantum eigensolvers',
      'High-resolution boundary layer mesh handling with adaptive multi-grid refinement',
    ],
    metrics: { label: 'Numerical Stability', value: '99.98% Robustness' },
    icon: Layers,
  },
  {
    year: 'Year 4',
    phase: '3D Complex Flow Extension',
    badge: '3D FULL NAVIER-STOKES',
    status: 'Upcoming',
    description:
      'Extend the validated and optimized framework to 3D and more complex flow configurations, while maintaining modularity and scalability.',
    deliverables: [
      'Implementation of 3D turbulent kinetic energy (k-ω SST) quantum surrogate formulations',
      'Curvilinear and unstructured 3D volumetric mesh quantum state vector encoding',
      'Validation against experimental wind tunnel & cavitation rig test datasets',
    ],
    metrics: { label: 'Domain Expansion', value: '3D Multi-Block Geometry' },
    icon: Shield,
  },
  {
    year: 'Year 5',
    phase: 'Modular Industrial QCFD Simulator Delivery',
    badge: 'COMMERCIAL PLATFORM DEPLOYMENT',
    status: 'Upcoming',
    description:
      'Deliver a modular and scalable QCFD Simulator capable of supporting complex, high-resolution flow problems, integrating classical CFD and quantum computing capabilities into a unified platform for future research and industrial applications.',
    deliverables: [
      'Turnkey commercial-grade Quantum CFD Workbench with cloud QPU access',
      'Scalable multi-node hybrid clusters solving aerospace, marine, and energy flow problems',
      'Comprehensive SDK, documentation, and enterprise verification validation test suites',
    ],
    metrics: { label: 'Industrial Readiness', value: 'Full Commercial Release' },
    icon: Zap,
  },
];

export default function RoadmapSection() {
  const [selectedYearIndex, setSelectedYearIndex] = useState(1); // Default to Year 2 (Active)

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
            <span className="font-mono text-xs font-bold text-brand-cyan tracking-[0.2em] uppercase">
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
                  className={`p-4 rounded-sm border transition-all text-left flex flex-col justify-between min-h-[110px] relative group ${
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
                        item.status === 'Completed'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : item.status === 'Active'
                          ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 animate-pulse'
                          : 'bg-slate-800 text-slate-400 border border-border-subtle'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded ${isSelected ? 'bg-brand-cyan text-black' : 'bg-slate-800 text-slate-300'}`}>
                      <Icon size={14} />
                    </div>
                    <div className="font-mono text-xs font-bold text-white line-clamp-1">
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 cols: Description and Key Focus */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-brand-cyan/20 border border-brand-cyan/50 text-brand-cyan font-mono text-xs font-bold rounded-sm uppercase tracking-wider">
                  {activeData.year} · {activeData.badge}
                </span>
                <span
                  className={`text-xs font-mono px-2.5 py-1 rounded font-bold uppercase ${
                    activeData.status === 'Completed'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : activeData.status === 'Active'
                      ? 'bg-sky-500/20 text-sky-400'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {activeData.status === 'Completed' ? '✔ Stage Completed' : activeData.status === 'Active' ? '▶ Active Milestone' : '○ Upcoming Target'}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 tracking-tight">
                {activeData.phase}
              </h3>

              {/* Exact Roadmap Content from User */}
              <div className="p-4 sm:p-5 rounded-sm bg-bg-primary/80 border border-brand-cyan/25 mb-6 relative">
                <div className="text-xs font-mono text-brand-cyan mb-1.5 uppercase font-bold tracking-wider">
                  OFFICIAL MILESTONE DIRECTIVE:
                </div>
                <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                  "{activeData.description}"
                </p>
              </div>

              {/* Key Deliverables */}
              <div>
                <div className="text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider font-semibold">
                  CORE DELIVERABLES &amp; ARCHITECTURAL TARGETS:
                </div>
                <div className="space-y-2.5">
                  {activeData.deliverables.map((deliv, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="p-1 rounded bg-brand-cyan/15 text-brand-cyan flex-shrink-0 mt-0.5">
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="text-slate-300 text-sm leading-relaxed">
                        {deliv}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 cols: Telemetry and Key Target Metrics */}
            <div className="lg:col-span-5 bg-bg-card p-6 sm:p-7 rounded border border-border-subtle flex flex-col justify-between h-full">
              <div>
                <div className="pb-3 border-b border-border-subtle flex items-center justify-between mb-5">
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    TARGET VALIDATION METRICS
                  </span>
                  <span className="font-mono text-xs text-brand-cyan font-bold">
                    {activeData.year}
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="p-4 rounded bg-bg-secondary border border-border-subtle">
                    <span className="text-xs font-mono text-slate-400 block mb-1">
                      {activeData.metrics.label}
                    </span>
                    <span className="text-xl sm:text-2xl font-mono font-bold text-brand-cyan">
                      {activeData.metrics.value}
                    </span>
                  </div>

                  <div className="p-4 rounded bg-bg-secondary border border-border-subtle">
                    <span className="text-xs font-mono text-slate-400 block mb-1">
                      Architecture Paradigm
                    </span>
                    <span className="text-base sm:text-lg font-mono font-bold text-white">
                      Hybrid QPU-GPU Classical Co-Processing
                    </span>
                  </div>

                  <div className="p-4 rounded bg-bg-secondary border border-border-subtle">
                    <span className="text-xs font-mono text-slate-400 block mb-1">
                      Governing Solver Physics
                    </span>
                    <span className="text-base sm:text-lg font-mono font-bold text-emerald-400">
                      Compressible &amp; Incompressible Navier-Stokes
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation CTA to adjacent years */}
              <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                <button
                  disabled={selectedYearIndex === 0}
                  onClick={() => setSelectedYearIndex((prev) => Math.max(0, prev - 1))}
                  className="text-xs font-mono text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition"
                >
                  ← Previous Year
                </button>
                <button
                  disabled={selectedYearIndex === ROADMAP_DATA.length - 1}
                  onClick={() => setSelectedYearIndex((prev) => Math.min(ROADMAP_DATA.length - 1, prev + 1))}
                  className="text-xs font-mono text-brand-cyan hover:text-white flex items-center gap-1 disabled:opacity-30 disabled:hover:text-brand-cyan transition"
                >
                  Next Phase →
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 5-Year Full Timeline Sequence Grid */}
        <div>
          <div className="text-xs font-mono text-brand-cyan font-bold tracking-wider uppercase mb-4 text-center">
            COMPLETE 5-YEAR EXECUTION PROGRESSION:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {ROADMAP_DATA.map((item, idx) => (
              <div
                key={item.year}
                onClick={() => setSelectedYearIndex(idx)}
                className={`p-5 rounded border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedYearIndex === idx
                    ? 'bg-brand-cyan/15 border-brand-cyan shadow-md'
                    : 'bg-bg-card/70 border-border-subtle/70 hover:border-brand-cyan/40 hover:bg-bg-card'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-black text-brand-cyan">
                      {item.year}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      STAGE 0{idx + 1}
                    </span>
                  </div>
                  <h4 className="text-xs font-mono font-bold text-white mb-2 line-clamp-1">
                    {item.phase}
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed line-clamp-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-border-subtle/50 flex items-center justify-between text-[11px] font-mono text-brand-cyan">
                  <span>View Details</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
