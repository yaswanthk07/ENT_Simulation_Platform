import { useEffect, useRef, useState } from 'react';
import { Cpu, Brain, Atom } from 'lucide-react';

export default function ArchitectureSection() {
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

  return (
    <section id="architecture" ref={sectionRef} className="relative py-12 sm:py-14 lg:py-16 bg-bg-primary overflow-hidden border-t border-border-subtle">
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(3,207,244,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-8 sm:mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block px-3.5 py-1 border border-brand-cyan/30 rounded-sm bg-brand-cyan/10 mb-3">
            <span className="font-mono text-sm sm:text-base font-bold text-brand-cyan tracking-[0.2em] uppercase">
              INTELLIGENT HYBRID ARCHITECTURE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            ONE PHYSICS PLATFORM.
            <br />
            <span className="text-gradient-cyan">MULTIPLE COMPUTE ENGINES.</span>
          </h2>
        </div>

        {/* Horizontal Architecture Flow Pipeline */}
        <div className={`max-w-4xl mx-auto flex flex-col items-center transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Step 1: Engineering The Physics */}
          <div className="w-full max-w-md p-4 rounded-sm bg-bg-card border border-brand-cyan/40 text-center shadow-lg">
            <div className="font-mono text-[11px] font-bold text-brand-cyan tracking-[0.2em] uppercase">
              STEP 01
            </div>
            <div className="text-base font-bold text-white mt-0.5">
              ENGINEERING THE PHYSICS
            </div>
            <div className="text-sm text-slate-300 mt-1">
              Fluid, Thermal, Structural, and Multiphysics
            </div>
          </div>

          {/* Down Arrow */}
          <div className="my-2 text-brand-cyan font-bold text-lg select-none">↓</div>

          {/* Step 2: Numerical Model */}
          <div className="w-full max-w-md p-4 rounded-sm bg-bg-card border border-border-subtle text-center shadow-lg">
            <div className="font-mono text-[11px] font-bold text-slate-400 tracking-[0.2em] uppercase">
              STEP 02
            </div>
            <div className="text-base font-bold text-white mt-0.5">
              NUMERICAL MODEL
            </div>
            <div className="text-sm text-slate-300 mt-1">
              High-Order Discretization, Adaptive Mesh Topologies & Boundary Constraints
            </div>
          </div>

          {/* Down Arrow */}
          <div className="my-2 text-brand-cyan font-bold text-lg select-none">↓</div>

          {/* Step 3: Compute Engines Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 my-2">

            {/* Classical Solvers */}
            <div className="p-5 rounded-sm bg-bg-card/90 border border-brand-cyan/30 flex flex-col justify-between hover:border-brand-cyan/60 transition-colors">
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="p-2 rounded bg-brand-cyan/10 text-brand-cyan">
                    <Cpu size={18} />
                  </div>
                  <div className="font-mono text-xs font-bold text-brand-cyan uppercase tracking-wider">
                    CLASSICAL SOLVERS
                  </div>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-2">
                  Proven numerical techniques for engineering physics and baseline simulation workflows.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border-subtle font-mono text-[10px] text-slate-400">
                HPC CLUSTERS • CPU/GPU MPI • SPARSE MATRIX SOLVERS
              </div>
            </div>

            {/* AI / ML Acceleration */}
            <div className="p-5 rounded-sm bg-bg-card/90 border border-blue-500/30 flex flex-col justify-between hover:border-blue-400/60 transition-colors">
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="p-2 rounded bg-blue-500/10 text-blue-400">
                    <Brain size={18} />
                  </div>
                  <div className="font-mono text-xs font-bold text-blue-400 uppercase tracking-wider">
                    AI / ML
                  </div>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-2">
                  Surrogate modelling, reduced-order prediction and intelligent design-space exploration.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border-subtle font-mono text-[10px] text-slate-400">
                FOURIER NEURAL OPERATORS • PINNs • ACTIVE INFERENCE
              </div>
            </div>

            {/* Quantum Computing */}
            <div className="p-5 rounded-sm bg-bg-card/90 border border-purple-500/30 flex flex-col justify-between hover:border-purple-400/60 transition-colors">
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="p-2 rounded bg-purple-500/10 text-purple-400">
                    <Atom size={18} />
                  </div>
                  <div className="font-mono text-xs font-bold text-purple-400 uppercase tracking-wider">
                    QUANTUM COMPUTING
                  </div>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-2">
                  Quantum algorithms investigated for suitable computational and optimization subproblems.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border-subtle font-mono text-[10px] text-slate-400">
                VQE / QAOA • HAMILTONIAN SIMULATION • QPU • HHL
              </div>
            </div>

          </div>

          {/* Down Arrow */}
          <div className="my-2 text-brand-cyan font-bold text-lg select-none">↓</div>

          {/* Step 4: Hybrid Compute Orchestration */}
          <div className="w-full max-w-xl p-4.5 rounded-sm bg-bg-card border border-brand-cyan/50 text-center shadow-lg">
            <div className="font-mono text-[11px] font-bold text-brand-cyan tracking-[0.2em] uppercase">
              STAGE 04
            </div>
            <div className="text-base font-bold text-white mt-0.5">
              HYBRID COMPUTE ORCHESTRATION
            </div>
            <p className="text-sm text-slate-300 mt-1 max-w-lg mx-auto">
              Coordinates classical, AI and quantum resources according to the engineering problem.
            </p>
          </div>

          {/* Down Arrow */}
          <div className="my-2 text-brand-cyan font-bold text-lg select-none">↓</div>

          {/* Step 5: Engineering Insight */}
          <div className="w-full max-w-md p-4 rounded-sm bg-brand-cyan/15 border border-brand-cyan text-center shadow-[0_0_24px_rgba(3,207,244,0.18)]">
            <div className="font-mono text-[11px] font-bold text-brand-cyan tracking-[0.2em] uppercase">
              STAGE 05
            </div>
            <div className="text-base font-bold text-white mt-0.5">
              ENGINEERING INSIGHT
            </div>
            <div className="text-sm text-slate-200 mt-1">
              Verified Accuracy, Accelerated Design Convergence & High-Fidelity Decisions
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
