import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-bg-primary border-t border-border-subtle overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent" />

      {/* Reduced margins: max-w-[1520px] */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Brand (Centered) */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <img
            src="./assets/images/enginuvity_logo_transparent.png"
            alt="Enginuvity Nexus Technologies"
            className="h-12 w-auto object-contain mb-4 mx-auto"
          />
          <div className="font-extrabold text-white text-base tracking-wider mb-1">
            ENGINUVITY NEXUS TECHNOLOGIES
          </div>
          <div className="text-slate-300 text-sm font-normal mb-5 leading-relaxed max-w-lg mx-auto">
            Pioneering quantum-accelerated multi-physics simulation, finite element analysis, and engineering intelligence.
          </div>
          <div className="inline-block px-3 py-1.5 border border-brand-cyan/30 rounded-sm bg-brand-cyan/10">
            <span className="font-mono text-xs font-bold text-brand-cyan tracking-[0.18em] uppercase">
              Quantum Engineering Simulation Platform
            </span>
          </div>
        </div>

        {/* Contact & Social Links Bar (matching image) */}
        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-10 lg:gap-x-12 gap-y-4 text-sm text-slate-300">
          <a
            href="mailto:info@enginuvitynexus.com"
            className="hover:text-brand-cyan transition-colors"
          >
            info@enginuvitynexus.com
          </a>

          <a
            href="tel:+918075998325"
            className="hover:text-brand-cyan transition-colors"
          >
            +91 80759 98325
          </a>

          <a
            href="https://www.enginuvitynexus.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-brand-cyan transition-colors group"
          >
            <span>enginuvitynexus.com</span>
            <ArrowUpRight size={14} className="text-slate-400 group-hover:text-brand-cyan transition-colors" />
          </a>

          <a
            href="https://www.linkedin.com/company/enginuvity-nexus-technologies/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-brand-cyan transition-colors group"
          >
            <span>LinkedIn</span>
            <ArrowUpRight size={14} className="text-slate-400 group-hover:text-brand-cyan transition-colors" />
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61563715481704"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-brand-cyan transition-colors group"
          >
            <span>Facebook</span>
            <ArrowUpRight size={14} className="text-slate-400 group-hover:text-brand-cyan transition-colors" />
          </a>

          <a
            href="https://www.instagram.com/enginuvitynexus?igsh=dTh2ZTh2ZmtxYW8y"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-brand-cyan transition-colors group"
          >
            <span>Instagram</span>
            <ArrowUpRight size={14} className="text-slate-400 group-hover:text-brand-cyan transition-colors" />
          </a>
        </div>

        {/* Bottom Bar: Copyright & System Status */}
        <div className="mt-8 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-slate-400">
            &copy; 2026 ENGINUVITY NEXUS TECHNOLOGIES. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-3">
            <div className="status-dot status-dot-cyan" />
            <span className="font-mono text-xs text-slate-300 font-medium">
              QUANTUM ENGINEERING SIMULATION PLATFORM
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
