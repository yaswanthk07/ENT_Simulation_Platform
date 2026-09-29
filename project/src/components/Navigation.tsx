import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Why ENT?', target: 'platform' },
  { label: 'Simulation Modules', target: 'platform-modules' },
  { label: 'Why Quantum?', target: 'quantum' },
  { label: 'Architecture', target: 'architecture' },
  { label: 'Road Map', target: 'roadmap' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollToTarget = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
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
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToTarget(item.target)}
                className="px-3.5 py-2 text-sm font-semibold text-slate-200 hover:text-brand-cyan transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-brand-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            ))}
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
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToTarget(item.target)}
                className="text-left px-4 py-3 text-base font-medium text-white/80 hover:text-brand-cyan hover:bg-brand-cyan/10 rounded transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
