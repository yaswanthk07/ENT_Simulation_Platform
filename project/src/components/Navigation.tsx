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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-[#070C18]/95 backdrop-blur-xl border-b border-[#01C8F3]/20 shadow-2xl'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo + Tagline (Left side over cool white / light bluish-white portion) */}
          <a href="#" className="flex items-center gap-3.5 flex-shrink-0 group">
            <img
              src="./assets/images/enginuvity_logo_transparent.png"
              alt="Enginuvity Nexus Technologies"
              className="h-10 sm:h-11 lg:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <div className="hidden sm:flex flex-col">
              <span className={`font-extrabold text-sm tracking-wider transition-colors duration-300 ${scrolled ? 'text-white' : 'text-[#07192F]'
                }`}>
                ENGINUVITY NEXUS TECHNOLOGIES
              </span>
              <span className={`font-mono text-[11px] tracking-widest uppercase transition-colors duration-300 ${scrolled ? 'text-[#01C8F3]' : 'text-[#0284C7]'
                }`}>
                Quantum Engineering Simulation Platform
              </span>
            </div>
          </a>

          {/* Desktop Nav (Right side over dark navy portion) */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToTarget(item.target)}
                className={`px-3.5 py-2 text-sm font-semibold transition-colors duration-200 relative group ${scrolled
                    ? 'text-slate-200 hover:text-[#01C8F3]'
                    : 'text-slate-100 hover:text-[#01C8F3]'
                  }`}
              >
                {item.label}
                <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-[#01C8F3] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden p-2 transition-colors ${scrolled ? 'text-white/80 hover:text-[#01C8F3]' : 'text-[#07192F] hover:text-[#0284C7]'
              }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#070C18]/98 backdrop-blur-xl border-t border-[#01C8F3]/20 max-h-[80vh] overflow-y-auto shadow-2xl">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToTarget(item.target)}
                className="text-left px-4 py-3 text-base font-medium text-slate-100 hover:text-[#01C8F3] hover:bg-[#01C8F3]/10 rounded transition-colors duration-200"
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
