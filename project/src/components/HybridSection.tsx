import { useEffect, useRef, useState } from 'react';
import { Cpu, Brain, Atom, Layers, ArrowRight } from 'lucide-react';

type ComputeMode = 'classical' | 'ai' | 'quantum' | 'hybrid';

const modes: { id: ComputeMode; label: string; color: string }[] = [
  { id: 'hybrid', label: 'FULL HYBRID PIPELINE', color: '#00E5FF' },
  { id: 'quantum', label: 'QUANTUM ACCELERATED', color: '#38BDF8' },
  { id: 'ai', label: 'NEURAL SURROGATE', color: '#2563EB' },
  { id: 'classical', label: 'CLASSICAL HPC', color: '#0284C7' },
];

const modeData: Record<ComputeMode, {
  nodes: { label: string; icon: React.ElementType; active: boolean; color: string }[];
  metrics: { label: string; value: string; color: string }[];
  desc: string;
}> = {
  hybrid: {
    nodes: [
      { label: 'CPU HPC CLUSTER', icon: Cpu, active: true, color: '#00E5FF' },
      { label: 'GPU ACCELERATOR ARRAY', icon: Cpu, active: true, color: '#38BDF8' },
      { label: 'NEURAL OPERATOR LAYER', icon: Brain, active: true, color: '#2563EB' },
      { label: 'QUANTUM LOGICAL QPU', icon: Atom, active: true, color: '#00E5FF' },
    ],
    metrics: [
      { label: 'Pipeline Architecture', value: 'FULL HYBRID TRI-COMPUTE', color: 'text-brand-cyan' },
      { label: 'Dynamic Orchestration', value: 'ADAPTIVE PDE SCHEDULING', color: 'text-white' },
      { label: 'Combined Speedup', value: '340× VS STANDARD HPC', color: 'text-emerald-400' },
      { label: 'Platform Scope', value: 'Enterprise Engineering Multi-Physics', color: 'text-slate-200' },
    ],
    desc: 'All computational modalities working simultaneously: GPU sparse-matrix solvers handle mesh domains, neural surrogates bypass iterative loops, and quantum processors resolve combinatorial non-linearities.',
  },
  quantum: {
    nodes: [
      { label: 'CPU HPC CLUSTER', icon: Cpu, active: false, color: '#00E5FF' },
      { label: 'GPU ACCELERATOR ARRAY', icon: Cpu, active: false, color: '#38BDF8' },
      { label: 'NEURAL OPERATOR LAYER', icon: Brain, active: false, color: '#2563EB' },
      { label: 'QUANTUM LOGICAL QPU', icon: Atom, active: true, color: '#00E5FF' },
    ],
    metrics: [
      { label: 'Quantum Processor', value: '64 LOGICAL QUBITS', color: 'text-brand-cyan' },
      { label: 'Circuit Compilation', value: 'VQE & QAOA CIRCUITS', color: 'text-white' },
      { label: 'State Fidelity', value: '99.82% MITIGATED', color: 'text-emerald-400' },
      { label: 'Specialization', value: 'Combinatorial Topology & Material Lattice', color: 'text-slate-200' },
    ],
    desc: 'Dedicated quantum co-processor execution executing parameterized variational circuits for combinatorial structural optimization, molecular lattice stress, and aerodynamic mode discovery.',
  },
  ai: {
    nodes: [
      { label: 'CPU HPC CLUSTER', icon: Cpu, active: true, color: '#00E5FF' },
      { label: 'GPU ACCELERATOR ARRAY', icon: Cpu, active: true, color: '#38BDF8' },
      { label: 'NEURAL OPERATOR LAYER', icon: Brain, active: true, color: '#2563EB' },
      { label: 'QUANTUM LOGICAL QPU', icon: Atom, active: false, color: '#00E5FF' },
    ],
    metrics: [
      { label: 'Inference Velocity', value: '< 15 ms SUB-SECOND', color: 'text-brand-cyan' },
      { label: 'Surrogate Accuracy', value: '99.4% AGAINST CFD BENCHMARK', color: 'text-white' },
      { label: 'Model Architecture', value: 'FOURIER NEURAL OPERATOR (FNO)', color: 'text-brand-blue' },
      { label: 'Specialization', value: 'Real-time Aerodynamic Design Exploration', color: 'text-slate-200' },
    ],
    desc: 'Classical compute augmented by deep surrogate neural networks, delivering instantaneous fluid velocity and von Mises stress field estimations without recalculating billions of grid points.',
  },
  classical: {
    nodes: [
      { label: 'CPU HPC CLUSTER', icon: Cpu, active: true, color: '#00E5FF' },
      { label: 'GPU ACCELERATOR ARRAY', icon: Cpu, active: true, color: '#38BDF8' },
      { label: 'NEURAL OPERATOR LAYER', icon: Brain, active: false, color: '#2563EB' },
      { label: 'QUANTUM LOGICAL QPU', icon: Atom, active: false, color: '#00E5FF' },
    ],
    metrics: [
      { label: 'Baseline Execution', value: '1.0× STANDARD HPC', color: 'text-brand-cyan' },
      { label: 'Numerical Accuracy', value: 'DOUBLE PRECISION FP64', color: 'text-white' },
      { label: 'Scaling Profile', value: 'MPI PARALLEL OVER 1024 NODES', color: 'text-slate-200' },
      { label: 'Specialization', value: 'Established Production Certification', color: 'text-slate-300' },
    ],
    desc: 'Traditional high-performance CPU/GPU clusters running finite volume Navier-Stokes and finite element linear algebra for regulatory validation and baseline engineering verification.',
  },
};

function DataFlowCanvas({ mode }: { mode: ComputeMode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const t = timeRef.current;

      // Background grid
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.05)';
      ctx.lineWidth = 0.8;
      for (let x = 0; x < w; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      const nodeX = [w * 0.15, w * 0.38, w * 0.62, w * 0.85];
      const nodeY = h * 0.5;

      const currentData = modeData[mode];

      // Draw connections
      for (let i = 0; i < nodeX.length - 1; i++) {
        const active = currentData.nodes[i].active && currentData.nodes[i + 1].active;
        ctx.strokeStyle = active ? 'rgba(0, 229, 255, 0.6)' : 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = active ? 2.5 : 1;
        ctx.beginPath();
        ctx.moveTo(nodeX[i], nodeY);
        ctx.lineTo(nodeX[i + 1], nodeY);
        ctx.stroke();

        // Animated particles along active connections
        if (active) {
          const flow = (t * 0.03 + i * 0.25) % 1;
          const px = nodeX[i] + (nodeX[i + 1] - nodeX[i]) * flow;
          ctx.fillStyle = '#00E5FF';
          ctx.beginPath();
          ctx.arc(px, nodeY, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw nodes
      nodeX.forEach((nx, idx) => {
        const node = currentData.nodes[idx];
        const isActive = node.active;

        ctx.fillStyle = isActive ? 'rgba(0, 229, 255, 0.2)' : 'rgba(15, 23, 42, 0.8)';
        ctx.strokeStyle = isActive ? '#00E5FF' : 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(nx, nodeY, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        if (isActive) {
          ctx.fillStyle = '#00E5FF';
          ctx.beginPath();
          ctx.arc(nx, nodeY, 8, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)';
        ctx.font = 'bold 11px JetBrains Mono';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, nx, nodeY + 40);
      });

      timeRef.current++;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [mode]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

export default function HybridSection() {
  const [activeMode, setActiveMode] = useState<ComputeMode>('hybrid');
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const data = modeData[activeMode];

  return (
    <section id="hybrid" ref={sectionRef} className="relative py-24 bg-bg-secondary overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,255,0.06)_0%,transparent_70%)]" />

      {/* Reduced margins: max-w-[1520px] */}
      <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with larger fonts */}
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block px-4 py-1.5 border border-brand-cyan/30 rounded-sm bg-brand-cyan/10 mb-4">
            <span className="font-mono text-xs font-bold text-brand-cyan tracking-[0.2em] uppercase">
              COMPUTE ORCHESTRATION
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
            HYBRID QUANTUM-CLASSICAL <span className="text-gradient-cyan">COMPUTE PIPELINE</span>
          </h2>
          <p className="text-slate-200 text-lg sm:text-xl max-w-3xl mx-auto font-normal leading-relaxed">
            Orchestrating classical HPC clusters, neural surrogate solvers, and quantum co-processors into a single coherent engineering simulation environment.
          </p>
        </div>

        {/* Mode selector with large clickable tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={`px-5 py-3 rounded-sm font-mono text-xs sm:text-sm tracking-wider font-bold transition-all duration-300 border ${
                activeMode === mode.id
                  ? 'border-brand-cyan bg-brand-cyan/20 text-white shadow-[0_0_20px_rgba(0,229,255,0.25)]'
                  : 'border-border-subtle bg-bg-card text-slate-300 hover:text-white hover:border-brand-cyan/40'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Data flow visualization (7 cols) */}
          <div className={`lg:col-span-7 transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="glass-panel rounded-sm overflow-hidden border border-border-subtle shadow-xl" style={{ height: 320 }}>
              <DataFlowCanvas mode={activeMode} />
            </div>

            <div className="mt-5 p-6 glass-panel rounded-sm border border-border-subtle">
              <div className="font-mono text-xs font-bold text-brand-cyan tracking-[0.15em] mb-2 uppercase">
                ARCHITECTURE & EXECUTION PROFILE
              </div>
              <p className="text-slate-200 text-base leading-relaxed font-normal">{data.desc}</p>
            </div>
          </div>

          {/* Metrics Panel (5 cols) */}
          <div className={`lg:col-span-5 transition-all duration-500 delay-200 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="glass-panel rounded-sm p-6 sm:p-7 border border-brand-cyan/30 shadow-2xl">
              <div className="font-mono text-xs font-bold text-white tracking-[0.15em] mb-5 uppercase pb-3 border-b border-border-subtle">
                PIPELINE TELEMETRY & SPECIFICATIONS
              </div>

              <div className="space-y-4 mb-7">
                {data.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col gap-1 pb-3 border-b border-border-subtle/50">
                    <span className="font-mono text-xs text-slate-400">{m.label}</span>
                    <span className={`font-mono text-sm sm:text-base font-bold ${m.color}`}>{m.value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5">
                <div className="font-mono text-xs font-bold text-slate-300 tracking-wider mb-2 uppercase">
                  COMPUTE SUBSYSTEM STATE
                </div>
                {data.nodes.map((node) => {
                  const Icon = node.icon;
                  return (
                    <div
                      key={node.label}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-sm transition-all duration-300 border border-border-subtle"
                      style={{ background: node.active ? 'rgba(0,229,255,0.08)' : 'rgba(15,23,42,0.4)' }}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{
                          background: node.active ? '#00E5FF' : 'rgba(255,255,255,0.2)',
                          boxShadow: node.active ? '0 0 8px #00E5FF' : 'none',
                        }}
                      />
                      <Icon size={16} className={node.active ? 'text-brand-cyan' : 'text-slate-500'} />
                      <span className={`font-mono text-xs font-semibold ${node.active ? 'text-white' : 'text-slate-500'}`}>
                        {node.label}
                      </span>
                      <span className={`ml-auto font-mono text-xs font-bold ${node.active ? 'text-brand-cyan' : 'text-slate-600'}`}>
                        {node.active ? 'CO-PROCESSING' : 'STANDBY'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
