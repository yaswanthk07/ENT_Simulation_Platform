const navColumns = [
  {
    heading: 'Platform',
    links: [
      { label: 'Quantum Platform', target: 'platform' },
      { label: 'Simulation Lab', target: 'simulation-lab' },
      { label: 'Platform Architecture', target: 'technology' },
      { label: 'Multi-Objective Optimization', target: 'optimization' },
    ],
  },
  {
    heading: 'Physics Solvers',
    links: [
      { label: 'Airfoil Aerodynamics (CFD)', target: 'simulation-lab' },
      { label: 'Finite Element Analysis (FEA)', target: 'platform-modules' },
      { label: 'Acoustics & NVH Dynamics', target: 'simulation-lab' },
      { label: 'Coupled FSI Multiphysics', target: 'platform-modules' },
    ],
  },
  {
    heading: 'Quantum & Intelligence',
    links: [
      { label: 'Quantum Engineering Engine', target: 'quantum' },
      { label: 'Variational Quantum Circuits (VQE/QAOA)', target: 'quantum' },
      { label: 'Hybrid QPU-GPU Architecture', target: 'hybrid' },
      { label: 'AI Neural Operators (PINNs)', target: 'ai-/-ml' },
    ],
  },
];

export default function Footer() {
  const scrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-bg-primary border-t border-border-subtle overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent" />

      {/* Reduced margins: max-w-[1520px] */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Brand (4 cols) */}
          <div className="lg:col-span-4">
            <img
              src="./assets/images/enginuvity_logo_transparent.png"
              alt="Enginuvity Nexus Technologies"
              className="h-12 w-auto object-contain mb-4"
            />
            <div className="font-extrabold text-white text-base tracking-wider mb-1">
              ENGINUVITY NEXUS TECHNOLOGIES
            </div>
            <div className="text-slate-300 text-sm font-normal mb-5 leading-relaxed max-w-sm">
              Pioneering quantum-accelerated multi-physics simulation, finite element analysis, and engineering intelligence.
            </div>
            <div className="inline-block px-3 py-1.5 border border-brand-cyan/30 rounded-sm bg-brand-cyan/10">
              <span className="font-mono text-xs font-bold text-brand-cyan tracking-[0.18em] uppercase">
                Quantum Engineering Simulation Platform
              </span>
            </div>
          </div>

          {/* Nav columns (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {navColumns.map((col) => (
              <div key={col.heading}>
                <div className="font-mono text-xs font-bold text-brand-cyan tracking-[0.15em] mb-4 uppercase">
                  {col.heading}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => scrollTo(link.target)}
                        className="text-slate-300 text-sm hover:text-brand-cyan transition-colors duration-200 font-normal text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        <div className="mt-14 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-slate-400">
            &copy; 2026 ENGINUVITY NEXUS TECHNOLOGIES. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-3">
            <div className="status-dot status-dot-cyan" />
            <span className="font-mono text-xs text-slate-300 font-medium">
              QUANTUM MULTI-PHYSICS SIMULATION PLATFORM
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
