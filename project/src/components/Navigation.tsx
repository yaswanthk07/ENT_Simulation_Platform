import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

const serviceItems = [
  { label: 'Computational Engineering & Multiphysics Simulation (simulation lab)', target: 'simulation-lab' },
  { label: 'Engineering Design & Digital Engineering', target: 'engineering-design' },
  { label: 'Experimental Model Testing & Validation', target: 'experimental-testing' },
  { label: 'Advanced Engineering Consultancy & Technology', target: 'advanced-consultancy' },
  { label: 'AI/ML', target: 'ai-/-ml' },
];

const navItems = [
  { label: 'Why ENT?', target: 'platform' },
  { label: 'Services', target: 'simulation-lab', isDropdown: true },
  { label: 'Simulation Modules', target: 'platform-modules' },
  { label: 'Why Quantum?', target: 'quantum' },
  { label: 'Architecture', target: 'architecture' },
  { label: 'Road Map', target: 'roadmap' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollToTarget = (targetId: string) => {
    const el = document.getElementById(targetId) || document.getElementById('simulation-lab');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
    setServicesOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-bg-primary/95 backdrop-blur-xl border-b border-border-subtle shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo + Tagline */}
          <a href="#" className="flex items-center gap-3.5 flex-shrink-0 group">
            <img
              src="./assets/images/enginuvity_logo_transparent.png"
              alt="Enginuvity Nexus Technologies"
              className="h-11 lg:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <div className="hidden sm:flex flex-col">
              <span className="font-extrabold text-sm tracking-wider text-white">ENGINUVITY NEXUS TECHNOLOGIES</span>
              <span className="font-mono text-[11px] text-brand-cyan tracking-widest uppercase">Quantum Engineering Platform</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              if (item.isDropdown) {
                return (
                  <div key={item.label} className="relative group">
                    <button
                      onClick={() => scrollToTarget(item.target)}
                      className="px-3.5 py-2 text-sm font-semibold text-slate-200 hover:text-brand-cyan transition-colors duration-200 relative flex items-center gap-1.5"
                    >
                      {item.label}
                      <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180 text-brand-cyan/70 group-hover:text-brand-cyan" />
                      <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-brand-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </button>

                    {/* Hover Dropdown */}
                    <div className="absolute top-full left-0 pt-2 w-[380px] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                      <div className="bg-bg-secondary/95 backdrop-blur-2xl border border-border-subtle rounded-md shadow-2xl p-2 flex flex-col gap-1 ring-1 ring-brand-cyan/20">
                        {serviceItems.map((svc) => (
                          <button
                            key={svc.label}
                            onClick={() => scrollToTarget(svc.target)}
                            className="text-left px-3.5 py-2.5 rounded text-xs font-semibold text-slate-200 hover:text-brand-cyan hover:bg-brand-cyan/10 transition-all duration-150 flex items-center justify-between group/item"
                          >
                            <span className="leading-snug">{svc.label}</span>
                            <ChevronRight size={13} className="opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-brand-cyan flex-shrink-0 ml-2" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={item.label}
                  onClick={() => scrollToTarget(item.target)}
                  className="px-3.5 py-2 text-sm font-semibold text-slate-200 hover:text-brand-cyan transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-brand-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-white/70 hover:text-brand-cyan transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden glass-panel border-t border-border-subtle max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => {
              if (item.isDropdown) {
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="w-full flex items-center justify-between text-left px-4 py-3 text-base font-medium text-white/80 hover:text-brand-cyan hover:bg-brand-cyan/10 rounded transition-colors duration-200"
                    >
                      <span>{item.label}</span>
                      <ChevronDown size={16} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180 text-brand-cyan' : ''}`} />
                    </button>
                    {servicesOpen && (
                      <div className="pl-3 pr-1 py-1 flex flex-col gap-1 border-l-2 border-brand-cyan/40 ml-4 my-1">
                        {serviceItems.map((svc) => (
                          <button
                            key={svc.label}
                            onClick={() => scrollToTarget(svc.target)}
                            className="text-left px-3 py-2 text-xs font-medium text-slate-300 hover:text-brand-cyan hover:bg-brand-cyan/10 rounded transition-colors"
                          >
                            {svc.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.label}
                  onClick={() => scrollToTarget(item.target)}
                  className="text-left px-4 py-3 text-base font-medium text-white/80 hover:text-brand-cyan hover:bg-brand-cyan/10 rounded transition-colors duration-200"
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
