export default function ComputationalBottleneckSection() {
  return (
    <section 
      id="bottleneck" 
      className="relative py-28 bg-[#040409] text-[#fbfbff] overflow-hidden border-t border-[#01c8f3]/20"
    >
      {/* Background technical grid and subtle ambient glow */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#03cff4]/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-10 w-[600px] h-[400px] bg-[#9f04c3]/5 blur-[180px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================================================== */}
        {/* SECTION HEADER                                     */}
        {/* ================================================== */}
        <div className="max-w-4xl mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm border border-[#03cff4]/30 bg-[#03cff4]/10 mb-4 shadow-[0_0_15px_rgba(3,207,244,0.12)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#03cff4] animate-pulse" />
            <span className="font-mono text-sm sm:text-base font-bold text-[#03cff4] tracking-[0.2em] uppercase">
              THE COMPUTATIONAL BOTTLENECK
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-6 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#03cff4] via-[#0c8fce] to-[#38bdf8]">
              ENGINEERING COMPLEXITY
            </span>
            <br />
            IS OUTGROWING
            <br />
            TRADITIONAL COMPUTE.
          </h2>

          <div className="border-l-2 border-[#03cff4]/40 pl-4 py-1">
            <p className="text-lg sm:text-xl font-semibold text-white/90 mb-2">
              High-fidelity engineering simulation is no longer about solving a single model.
            </p>
            <p className="text-sm sm:text-base text-[#aaa8ba] leading-relaxed max-w-3xl">
              Modern workflows require finer meshes, repeated numerical solves, coupled physics and large-scale design exploration — increasing computational cost, memory demand and time-to-solution.
            </p>
          </div>
        </div>

        {/* ================================================== */}
        {/* 4 COMPUTATIONAL CHALLENGE MODULES                  */}
        {/* Desktop: 2x2, Tablet: 2 cols, Mobile: 1 col        */}
        {/* ================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-24">
          
          {/* ------------------------------------------------ */}
          {/* CHALLENGE 01: SCALE                              */}
          {/* ------------------------------------------------ */}
          <div className="p-6 sm:p-8 rounded-sm bg-[rgba(13,10,24,0.78)] border border-[#01c8f3]/25 hover:border-[#03cff4]/60 transition-all duration-300 flex flex-col justify-between group shadow-xl">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#01c8f3]/15">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#03cff4]" />
                  <span className="font-mono text-xs font-bold text-[#03cff4] tracking-widest uppercase">
                    01 // SCALE
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#aaa8ba] uppercase tracking-wider bg-slate-900/90 px-2 py-0.5 rounded border border-white/5">
                  Spatial Discretization
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                SIMULATIONS ARE<br />GETTING BIGGER
              </h3>
              
              <div className="text-sm font-semibold text-[#03cff4] mb-3">
                More resolution means more computation.
              </div>

              <p className="text-xs sm:text-sm text-[#aaa8ba] leading-relaxed mb-6">
                Higher-fidelity CFD, FEA and multiphysics models require increasingly larger meshes and more degrees of freedom to capture boundary layers, shocks, and micro-vortices.
              </p>

              {/* Visual Sequence */}
              <div className="p-4 rounded-sm bg-[#040409] border border-[#01c8f3]/20">
                <div className="text-[10px] font-mono text-[#03cff4] mb-2 uppercase tracking-widest font-bold">
                  RESOLUTION PROGRESSION:
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-300 bg-[#090713] p-3 rounded border border-white/5">
                  <span className="px-2.5 py-1 rounded bg-[#03cff4]/10 text-[#03cff4] font-bold border border-[#03cff4]/30">
                    COARSE MESH
                  </span>
                  <span className="text-slate-500 font-bold">→</span>
                  <span className="px-2.5 py-1 rounded bg-[#03cff4]/10 text-[#03cff4] font-bold border border-[#03cff4]/30">
                    MEDIUM MESH
                  </span>
                  <span className="text-slate-500 font-bold">→</span>
                  <span className="px-2.5 py-1 rounded bg-[#03cff4]/15 text-[#03cff4] font-bold border border-[#03cff4]/40">
                    FINE MESH
                  </span>
                  <span className="text-slate-500 font-bold">→</span>
                  <span className="px-2.5 py-1 rounded bg-[#03cff4]/25 text-white font-extrabold border border-[#03cff4]">
                    HIGH-FIDELITY MODEL
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------ */}
          {/* CHALLENGE 02: ITERATE                            */}
          {/* ------------------------------------------------ */}
          <div className="p-6 sm:p-8 rounded-sm bg-[rgba(13,10,24,0.78)] border border-[#01c8f3]/25 hover:border-[#03cff4]/60 transition-all duration-300 flex flex-col justify-between group shadow-xl">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#01c8f3]/15">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0c8fce]" />
                  <span className="font-mono text-xs font-bold text-[#0c8fce] tracking-widest uppercase">
                    02 // ITERATE
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#aaa8ba] uppercase tracking-wider bg-slate-900/90 px-2 py-0.5 rounded border border-white/5">
                  Solver Convergence
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                THE SAME EQUATIONS<br />ARE SOLVED AGAIN AND AGAIN
              </h3>
              
              <div className="text-sm font-semibold text-[#0c8fce] mb-3">
                Simulation is iterative by nature.
              </div>

              <p className="text-xs sm:text-sm text-[#aaa8ba] leading-relaxed mb-6">
                Large linear systems, nonlinear corrections and convergence loops may be solved repeatedly throughout a single engineering simulation.
              </p>

              {/* Visual Flow Loop */}
              <div className="p-4 rounded-sm bg-[#040409] border border-[#01c8f3]/20">
                <div className="text-[10px] font-mono text-[#0c8fce] mb-2 uppercase tracking-widest font-bold">
                  SOLVER CONVERGENCE LOOP:
                </div>
                <div className="flex flex-wrap items-center justify-between gap-1.5 text-[11px] font-mono text-slate-300 bg-[#090713] p-3 rounded border border-white/5">
                  <span className="px-2 py-1 rounded bg-[#0c8fce]/10 text-[#0c8fce] font-bold border border-[#0c8fce]/30">
                    INITIAL STATE
                  </span>
                  <span className="text-slate-500 font-bold">→</span>
                  <span className="px-2 py-1 rounded bg-[#0c8fce]/10 text-white font-semibold">
                    SOLVE
                  </span>
                  <span className="text-slate-500 font-bold">→</span>
                  <span className="px-2 py-1 rounded bg-[#0c8fce]/10 text-white font-semibold">
                    UPDATE
                  </span>
                  <span className="text-slate-500 font-bold">→</span>
                  <span className="px-2 py-1 rounded bg-[#0c8fce]/10 text-white font-semibold">
                    CHECK CONVERGENCE
                  </span>
                  <span className="text-slate-500 font-bold">→</span>
                  <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    NOT CONVERGED ↺ SOLVE AGAIN
                  </span>
                  <span className="text-slate-500 font-bold">→</span>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40">
                    CONVERGED ✓
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------ */}
          {/* CHALLENGE 03: EXPLORE                            */}
          {/* ------------------------------------------------ */}
          <div className="p-6 sm:p-8 rounded-sm bg-[rgba(13,10,24,0.78)] border border-[#01c8f3]/25 hover:border-[#03cff4]/60 transition-all duration-300 flex flex-col justify-between group shadow-xl">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#01c8f3]/15">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#fa9224]" />
                  <span className="font-mono text-xs font-bold text-[#fa9224] tracking-widest uppercase">
                    03 // EXPLORE
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#aaa8ba] uppercase tracking-wider bg-slate-900/90 px-2 py-0.5 rounded border border-white/5">
                  Design-Space Multiplier
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                DESIGN EXPLORATION<br />MULTIPLIES THE COST
              </h3>
              
              <div className="text-sm font-semibold text-[#fa9224] mb-3">
                One simulation is manageable. Thousands of designs are not.
              </div>

              <p className="text-xs sm:text-sm text-[#aaa8ba] leading-relaxed mb-6">
                Engineering optimization can require evaluating many combinations of geometry, materials, operating conditions and design parameters.
              </p>

              {/* Contrast and Technical Parameters */}
              <div className="p-4 rounded-sm bg-[#040409] border border-[#01c8f3]/20 mb-4">
                {/* 1 vs 1,000 Contrast Banner */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 text-center font-mono">
                  <div className="p-3 rounded bg-[#090713] border border-border-subtle">
                    <span className="text-[10px] text-slate-400 block mb-1">SINGLE CASE</span>
                    <span className="text-xs font-bold text-white">1 DESIGN → 1 SIMULATION</span>
                  </div>
                  <div className="p-3 rounded bg-[#fa9224]/10 border border-[#fa9224]/30">
                    <span className="text-[10px] text-[#fa9224] block mb-1 font-semibold">OPTIMIZATION WORKFLOW</span>
                    <span className="text-xs font-bold text-[#fa9224]">1,000 DESIGNS → 1,000+ SIMULATIONS</span>
                  </div>
                </div>

                {/* Technical Labels */}
                <div className="flex flex-wrap items-center justify-center gap-2 p-2.5 rounded bg-[#090713] border border-white/5 font-mono text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10 text-slate-300">GEOMETRY</span>
                  <span className="text-slate-600">•</span>
                  <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10 text-slate-300">MATERIAL</span>
                  <span className="text-slate-600">•</span>
                  <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10 text-slate-300">BOUNDARY CONDITIONS</span>
                  <span className="text-slate-600">•</span>
                  <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10 text-slate-300">OPERATING POINT</span>
                  <span className="text-slate-600">•</span>
                  <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10 text-[#fa9224] font-bold">DESIGN VARIABLES</span>
                </div>
              </div>

              {/* Prominent Callout Line */}
              <div className="p-3 rounded bg-[#fa9224]/10 border border-[#fa9224]/30 text-center">
                <span className="text-xs font-mono font-bold text-white tracking-wide">
                  THE CHALLENGE SHIFTS FROM SOLVING A MODEL TO EXPLORING A DESIGN SPACE
                </span>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------ */}
          {/* CHALLENGE 04: COUPLE                             */}
          {/* ------------------------------------------------ */}
          <div className="p-6 sm:p-8 rounded-sm bg-[rgba(13,10,24,0.78)] border border-[#01c8f3]/25 hover:border-[#03cff4]/60 transition-all duration-300 flex flex-col justify-between group shadow-xl">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#01c8f3]/15">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#9f04c3]" />
                  <span className="font-mono text-xs font-bold text-[#9f04c3] tracking-widest uppercase">
                    04 // COUPLE
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#aaa8ba] uppercase tracking-wider bg-slate-900/90 px-2 py-0.5 rounded border border-white/5">
                  Multiphysics Coupling
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                PHYSICS DOESN'T<br />EXIST IN ISOLATION
              </h3>
              
              <div className="text-sm font-semibold text-[#9f04c3] mb-3">
                Real engineering systems are coupled.
              </div>

              <p className="text-xs sm:text-sm text-[#aaa8ba] leading-relaxed mb-6">
                Fluid flow, heat transfer, structural response and acoustic behaviour can influence one another inside the same engineering system.
              </p>

              {/* Coupled Physics Sequence */}
              <div className="p-4 rounded-sm bg-[#040409] border border-[#01c8f3]/20">
                <div className="text-[10px] font-mono text-[#9f04c3] mb-2 uppercase tracking-widest font-bold">
                  MULTI-FIELD FEEDBACK SEQUENCE:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
                  <div className="p-2.5 rounded bg-[#090713] border border-white/5">
                    <strong className="text-[#03cff4]">FLOW</strong> → Changes Temperature
                  </div>
                  <div className="p-2.5 rounded bg-[#090713] border border-white/5">
                    <strong className="text-[#fa9224]">TEMPERATURE</strong> → Changes Material Behaviour
                  </div>
                  <div className="p-2.5 rounded bg-[#090713] border border-white/5">
                    <strong className="text-[#e80874]">STRUCTURAL DEFORMATION</strong> → Changes Flow Geometry
                  </div>
                  <div className="p-2.5 rounded bg-[#090713] border border-white/5">
                    <strong className="text-[#9f04c3]">VIBRATION</strong> → Generates Acoustic Response
                  </div>
                </div>

                {/* Reciprocal Coupling Loop */}
                <div className="mt-3 p-2.5 rounded bg-[#090713] border border-[#9f04c3]/30 flex items-center justify-between text-xs font-mono text-center">
                  <span className="text-[#03cff4] font-bold">FLUID</span>
                  <span className="text-slate-500 font-bold">↕</span>
                  <span className="text-[#fa9224] font-bold">THERMAL</span>
                  <span className="text-slate-500 font-bold">↕</span>
                  <span className="text-[#e80874] font-bold">STRUCTURAL</span>
                  <span className="text-slate-500 font-bold">↕</span>
                  <span className="text-[#9f04c3] font-bold">ACOUSTICS</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
