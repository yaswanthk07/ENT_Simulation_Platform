import { useEffect, useRef, useState } from 'react';
import { 
  GitMerge, Compass, Layers, Brain, Atom, 
  CheckCircle2, Zap
} from 'lucide-react';

interface BenefitItem {
  id: string;
  num: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  tag: string;
  shortLabel: string;
  x: number;
  y: number;
  color: string;
}

const benefits: BenefitItem[] = [
  {
    id: 'hybrid',
    num: '01',
    title: 'HYBRID BY DESIGN',
    desc: 'Classical + quantum enabled computation',
    icon: GitMerge,
    tag: 'COUPLED SOLVERS',
    shortLabel: 'HYBRID BY DESIGN',
    x: 50,
    y: 16,
    color: '#00E5FF',
  },
  {
    id: 'exploration',
    num: '02',
    title: 'FASTER DESIGN EXPLORATION',
    desc: 'Evaluate larger engineering design spaces intelligently',
    icon: Compass,
    tag: 'DESIGN SPACE',
    shortLabel: 'DESIGN EXPLORATION',
    x: 82.5,
    y: 39.5,
    color: '#38BDF8',
  },
  {
    id: 'multiphysics',
    num: '03',
    title: 'MULTIPHYSICS IN ONE PLATFORM',
    desc: 'CFD • Thermal • Structural • FEA • Coupled Physics',
    icon: Layers,
    tag: 'UNIFIED SOLVER',
    shortLabel: 'MULTIPHYSICS',
    x: 70.0,
    y: 77.5,
    color: '#0284C7',
  },
  {
    id: 'ai',
    num: '04',
    title: 'AI-ASSISTED SIMULATION',
    desc: 'Surrogate models, optimization & intelligent workflows',
    icon: Brain,
    tag: 'NEURAL OPERATORS',
    shortLabel: 'AI SURROGATES',
    x: 30.0,
    y: 77.5,
    color: '#2563EB',
  },
  {
    id: 'quantum',
    num: '05',
    title: 'QUANTUM READY SOLVERS',
    desc: 'Built to integrate emerging QPU algorithms and hardware',
    icon: Atom,
    tag: 'QPU INTEGRATED',
    shortLabel: 'QUANTUM READY',
    x: 17.5,
    y: 39.5,
    color: '#A855F7',
  },
];

export default function PlatformIntro() {
  const [activeId, setActiveId] = useState<string>('hybrid');
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeBenefit = benefits.find((b) => b.id === activeId) || benefits[0];

  return (
    <section id="platform" ref={sectionRef} className="relative py-24 bg-bg-secondary overflow-hidden border-t border-border-subtle">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,255,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="inline-block px-4 py-1.5 border border-brand-cyan/30 rounded-sm bg-brand-cyan/10 mb-4">
            <span className="font-mono text-sm sm:text-base font-bold text-brand-cyan tracking-[0.2em] uppercase">
              WHY ENGINUVITY NEXUS TECHNOLOGIES ?
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight tracking-tight">
            ENGINEERING BEYOND
            <br />
            <span className="text-gradient-cyan">CLASSICAL LIMITS</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Interactive Topology Constellation Diagram (5 cols) */}
          <div
            className={`lg:col-span-5 relative max-w-lg mx-auto w-full transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <div className="relative aspect-square w-full">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_35px_rgba(0,229,255,0.18)]" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <radialGradient id="platformCenterGrad">
                    <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.95" />
                    <stop offset="60%" stopColor="#2563EB" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#0B1222" stopOpacity="0.6" />
                  </radialGradient>
                </defs>

                {/* Outer Ring Polygon Connections */}
                {benefits.map((node, i) => {
                  const nextNode = benefits[(i + 1) % benefits.length];
                  return (
                    <line
                      key={`ring-${node.id}-${nextNode.id}`}
                      x1={node.x}
                      y1={node.y}
                      x2={nextNode.x}
                      y2={nextNode.y}
                      stroke="rgba(0,229,255,0.18)"
                      strokeWidth="0.5"
                      strokeDasharray="1.5 1.5"
                    />
                  );
                })}

                {/* Radial connection lines to center */}
                {benefits.map((node) => {
                  const isActive = activeId === node.id;
                  return (
                    <line
                      key={`line-${node.id}`}
                      x1="50"
                      y1="50"
                      x2={node.x}
                      y2={node.y}
                      stroke={isActive ? '#00E5FF' : 'rgba(0,229,255,0.22)'}
                      strokeWidth={isActive ? 1.2 : 0.6}
                      strokeDasharray={isActive ? '2 1' : '0'}
                      style={{ transition: 'all 0.3s ease' }}
                    />
                  );
                })}

                {/* Outer node circles */}
                {benefits.map((node) => {
                  const isActive = activeId === node.id;
                  return (
                    <g key={`g-${node.id}`} onClick={() => setActiveId(node.id)} className="cursor-pointer">
                      {/* Active glow pulse */}
                      {isActive && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={10.5}
                          fill="none"
                          stroke="#00E5FF"
                          strokeWidth="0.6"
                          opacity="0.6"
                        />
                      )}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isActive ? 8 : 6.2}
                        fill={isActive ? 'rgba(0,229,255,0.25)' : 'rgba(11,18,34,0.95)'}
                        stroke={isActive ? '#00E5FF' : `${node.color}95`}
                        strokeWidth={isActive ? 1.2 : 0.7}
                        style={{ transition: 'all 0.3s ease' }}
                        onMouseEnter={() => setActiveId(node.id)}
                      />
                      <text
                        x={node.x}
                        y={node.y + 1.2}
                        textAnchor="middle"
                        fill={isActive ? '#00E5FF' : '#FFFFFF'}
                        fontSize="3.2"
                        fontWeight="bold"
                        fontFamily="JetBrains Mono"
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {node.num}
                      </text>
                    </g>
                  );
                })}

                {/* Central Nexus Core */}
                <circle cx="50" cy="50" r="14" fill="rgba(3,7,18,0.92)" stroke="rgba(0,229,255,0.4)" strokeWidth="0.8" />
                <circle cx="50" cy="50" r="10" fill="url(#platformCenterGrad)" opacity="0.95" />
                <circle cx="50" cy="50" r="16.5" fill="none" stroke="rgba(0,229,255,0.25)" strokeWidth="0.5" strokeDasharray="1.5 2" />

                <text x="50" y="51.2" textAnchor="middle" fill="#FFFFFF" fontSize="3.6" fontWeight="900" fontFamily="JetBrains Mono">
                  ENT
                </text>
              </svg>
            </div>

            {/* Active telemetry indicator card beneath diagram */}
            <div className="mt-3 p-3 rounded-sm bg-bg-card/90 border border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                <span className="font-mono text-sm sm:text-base text-slate-300 font-medium">
                  SELECTED: <strong className="text-white">{activeBenefit.title}</strong>
                </span>
              </div>
              <span className="font-mono text-xs sm:text-sm tracking-wider px-2 py-0.5 rounded bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan font-bold">
                {activeBenefit.tag}
              </span>
            </div>
          </div>

          {/* 5 Compact Benefit Rows (7 cols) */}
          <div
            className={`lg:col-span-7 flex flex-col gap-3 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            {benefits.map((item) => {
              const Icon = item.icon;
              const isActive = activeId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  onMouseEnter={() => setActiveId(item.id)}
                  className={`relative text-left p-4 sm:p-4.5 rounded-sm border transition-all duration-200 cursor-pointer group flex items-center justify-between gap-4 ${
                    isActive
                      ? 'bg-brand-cyan/15 border-brand-cyan shadow-[0_0_24px_rgba(0,229,255,0.2)] -translate-x-1'
                      : 'bg-bg-card/85 border-border-subtle hover:border-brand-cyan/50 hover:bg-bg-card'
                  }`}
                >
                  {/* Subtle top-left corner indicator */}
                  <div 
                    className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 transition-colors duration-200"
                    style={{ borderColor: isActive ? '#00E5FF' : 'rgba(0,229,255,0.3)' }} 
                  />

                  <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                    {/* Index + Icon */}
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                      <span className="font-mono text-xs font-bold text-brand-cyan/90 w-5">
                        {item.num}
                      </span>
                      <div
                        className={`p-2.5 rounded transition-colors duration-200 ${
                          isActive
                            ? 'bg-brand-cyan text-bg-primary font-bold'
                            : 'bg-brand-cyan/10 text-brand-cyan group-hover:bg-brand-cyan/20'
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                    </div>

                    {/* Benefit Titles and Subtitles */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm sm:text-base text-white tracking-wide group-hover:text-brand-cyan transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Right side tag and active pill */}
                  <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan font-bold">
                      {item.tag}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-brand-cyan animate-ping' : 'bg-slate-500'}`} />
                      {isActive ? 'ACTIVE' : 'READY'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Telemetry Pipeline Footer */}
        <div className="mt-14 pt-8 border-t border-border-subtle flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5 sm:gap-4 flex-wrap justify-center text-center">
            <div className="px-3.5 py-1.5 rounded-sm bg-bg-card border border-border-subtle">
              <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-[0.18em]">
                FROM PHYSICS
              </span>
            </div>
            <span className="text-brand-cyan font-bold text-base sm:text-lg">→</span>
            <div className="px-3.5 py-1.5 rounded-sm bg-brand-cyan/10 border border-brand-cyan/40">
              <span className="font-mono text-xs sm:text-sm font-bold text-brand-cyan tracking-[0.18em]">
                COMPUTATION
              </span>
            </div>
            <span className="text-brand-cyan font-bold text-base sm:text-lg">→</span>
            <div className="px-3.5 py-1.5 rounded-sm bg-bg-card border border-border-subtle">
              <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-[0.18em]">
                ENGINEERING INSIGHT
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
              <CheckCircle2 size={13} />
              <span>CLASSICAL VERIFIED</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan font-semibold">
              <Zap size={13} />
              <span>QUANTUM ENHANCED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
