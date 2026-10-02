export default function Footer() {
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

          {/* Details columns (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Company Details */}
            <div>
              <div className="font-mono text-xs font-bold text-brand-cyan tracking-[0.15em] mb-4 uppercase">
                Company Details
              </div>
              <ul className="space-y-3 text-sm">
                <li>
                  <span className="text-slate-400 text-xs font-mono uppercase tracking-wider block mb-0.5">Company Name</span>
                  <span className="text-slate-200 font-medium">Enginuvity Nexus Technologies LLP</span>
                </li>
                <li>
                  <span className="text-slate-400 text-xs font-mono uppercase tracking-wider block mb-0.5">Address</span>
                  <span className="text-slate-300">Medha tower address</span>
                </li>
              </ul>
            </div>

            {/* Registration Details */}
            <div>
              <div className="font-mono text-xs font-bold text-brand-cyan tracking-[0.15em] mb-4 uppercase">
                Registration Details
              </div>
              <ul className="space-y-3 text-sm">
                <li>
                  <span className="text-slate-400 text-xs font-mono uppercase tracking-wider block mb-0.5">GSTIN</span>
                  <span className="text-slate-200 font-mono text-xs tracking-wider">37AAMFE5324P1ZV</span>
                </li>
                <li>
                  <span className="text-slate-400 text-xs font-mono uppercase tracking-wider block mb-0.5">PAN</span>
                  <span className="text-slate-200 font-mono text-xs tracking-wider">AAMFE5324P</span>
                </li>
                <li>
                  <span className="text-slate-400 text-xs font-mono uppercase tracking-wider block mb-0.5">UDYAM (MSME)</span>
                  <span className="text-slate-200 font-mono text-xs tracking-wider">UDYAM-AP-10-0119499</span>
                </li>
                <li>
                  <span className="text-slate-400 text-xs font-mono uppercase tracking-wider block mb-0.5">DPIIT Startup Recognition</span>
                  <span className="text-slate-200 font-mono text-xs tracking-wider">DIPP248666</span>
                </li>
              </ul>
            </div>

            {/* Contact Details */}
            <div>
              <div className="font-mono text-xs font-bold text-brand-cyan tracking-[0.15em] mb-4 uppercase">
                Contact Details
              </div>
              <ul className="space-y-3 text-sm">
                <li>
                  <span className="text-slate-400 text-xs font-mono uppercase tracking-wider block mb-0.5">Contact Person</span>
                  <span className="text-slate-200">Libin Abraham</span>
                </li>
                <li>
                  <span className="text-slate-400 text-xs font-mono uppercase tracking-wider block mb-0.5">Contact Number</span>
                  <a href="tel:+918075998325" className="text-slate-200 hover:text-brand-cyan transition-colors">
                    +91-8075998325
                  </a>
                </li>
                <li>
                  <span className="text-slate-400 text-xs font-mono uppercase tracking-wider block mb-0.5">Email ID</span>
                  <div className="flex flex-col space-y-1">
                    <a href="mailto:libin.abraham@enginuvitynexus.com" className="text-slate-200 hover:text-brand-cyan transition-colors break-all">
                      libin.abraham@enginuvitynexus.com
                    </a>
                    <a href="mailto:info@enginuvitynexus.com" className="text-slate-200 hover:text-brand-cyan transition-colors break-all">
                      info@enginuvitynexus.com
                    </a>
                  </div>
                </li>
                <li>
                  <span className="text-slate-400 text-xs font-mono uppercase tracking-wider block mb-0.5">Company Email</span>
                  <a href="mailto:info@enginuvitynexus.com" className="text-slate-200 hover:text-brand-cyan transition-colors break-all">
                    info@enginuvitynexus.com
                  </a>
                </li>
                <li>
                  <span className="text-slate-400 text-xs font-mono uppercase tracking-wider block mb-0.5">Website</span>
                  <a
                    href="https://www.enginuvitynexus.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-200 hover:text-brand-cyan transition-colors break-all"
                  >
                    https://www.enginuvitynexus.com
                  </a>
                </li>
                <li>
                  <span className="text-slate-400 text-xs font-mono uppercase tracking-wider block mb-0.5">Mobile</span>
                  <a href="tel:+918075998325" className="text-slate-200 hover:text-brand-cyan transition-colors">
                    +91-8075998325
                  </a>
                </li>
              </ul>
            </div>
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
