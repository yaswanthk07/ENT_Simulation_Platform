export default function ComputationalBottleneckSection() {
  return (
    <section
      id="bottleneck"
      className="relative py-12 sm:py-14 lg:py-16 bg-[#040409] text-[#fbfbff] overflow-hidden border-t border-[#01c8f3]/20 scroll-mt-28"
    >
      {/* Background technical grid and subtle ambient glow */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#03cff4]/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-10 w-[600px] h-[400px] bg-[#9f04c3]/5 blur-[180px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================================================== */}
        {/* SECTION HEADER                                     */}
        {/* ================================================== */}
        <div className="max-w-4xl mb-10 sm:mb-12">
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
            <p className="text-lg sm:text-xl font-semibold text-white/90">
              High-fidelity engineering simulation is no longer about solving a single physical phenomenon
            </p>
          </div>
        </div>

        {/* ================================================== */}
        {/* 4 COMPUTATIONAL CHALLENGE MODULES                  */}
        {/* Desktop: 2x2, Tablet: 2 cols, Mobile: 1 col        */}
        {/* ================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

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
                    01 SCALE
                  </span>
                </div>
                <span className="font-mono text-xs text-[#aaa8ba] uppercase tracking-wider bg-slate-900/90 px-2 py-0.5 rounded border border-white/5">
                  Spatial Discretization
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                SIMULATIONS ARE<br />GETTING BIGGER
              </h3>

              <div className="text-lg sm:text-xl font-semibold text-[#03cff4]">
                More resolution means more computation.
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
                  <span className="w-2 h-2 rounded-full bg-[#03cff4]" />
                  <span className="font-mono text-xs font-bold text-[#03cff4] tracking-widest uppercase">
                    02 ITERATE
                  </span>
                </div>
                <span className="font-mono text-xs text-[#aaa8ba] uppercase tracking-wider bg-slate-900/90 px-2 py-0.5 rounded border border-white/5">
                  Solver Convergence
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                THE SAME EQUATIONS<br />ARE SOLVED AGAIN AND AGAIN
              </h3>

              <div className="text-lg sm:text-xl font-semibold text-[#03cff4]">
                Simulation is iterative by nature.
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
                  <span className="w-2 h-2 rounded-full bg-[#03cff4]" />
                  <span className="font-mono text-xs font-bold text-[#03cff4] tracking-widest uppercase">
                    03 EXPLORE
                  </span>
                </div>
                <span className="font-mono text-xs text-[#aaa8ba] uppercase tracking-wider bg-slate-900/90 px-2 py-0.5 rounded border border-white/5">
                  Design-Space Multiplier
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                DESIGN EXPLORATION<br />MULTIPLIES THE COST
              </h3>

              <div className="text-lg sm:text-xl font-semibold text-[#03cff4]">
                One simulation is manageable. Thousands of designs are not.
              </div>
            </div>
          </div>

          {/* ------------------------------------------------ */}
          {/* CHALLENGE 04: INTEGRATE                             */}
          {/* ------------------------------------------------ */}
          <div className="p-6 sm:p-8 rounded-sm bg-[rgba(13,10,24,0.78)] border border-[#01c8f3]/25 hover:border-[#03cff4]/60 transition-all duration-300 flex flex-col justify-between group shadow-xl">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#01c8f3]/15">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#03cff4]" />
                  <span className="font-mono text-xs font-bold text-[#03cff4] tracking-widest uppercase">
                    04 INTEGRATE
                  </span>
                </div>
                <span className="font-mono text-xs text-[#aaa8ba] uppercase tracking-wider bg-slate-900/90 px-2 py-0.5 rounded border border-white/5">
                  Multiphysics Coupling
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                PHYSICS DOESN'T<br />EXIST IN ISOLATION
              </h3>

              <div className="text-lg sm:text-xl font-semibold text-[#03cff4]">
                Real engineering simulations are coupled.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
