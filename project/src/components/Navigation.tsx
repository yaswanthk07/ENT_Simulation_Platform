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

  // Automatically close mobile menu immediately when user starts scrolling
  useEffect(() => {
    if (!menuOpen) return;

    const closeMenu = () => {
      setMenuOpen(false);
    };

    window.addEventListener('scroll', closeMenu, { passive: true });
    window.addEventListener('touchmove', closeMenu, { passive: true });
    window.addEventListener('wheel', closeMenu, { passive: true });

    return () => {
      window.removeEventListener('scroll', closeMenu);
      window.removeEventListener('touchmove', closeMenu);
      window.removeEventListener('wheel', closeMenu);
    };
  }, [menuOpen]);

  const scrollToTarget = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        scrolled && !menuOpen
          ? 'bg-[#070C18]/95 backdrop-blur-xl border-b border-[#01C8F3]/20 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      {/* Top Header Bar */}
      <div
        className={`w-full transition-colors duration-200 ${
          menuOpen
            ? 'bg-[#F4F8FB] border-b border-[#01C8F3]/30 shadow-md'
            : scrolled
            ? 'bg-transparent'
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
                className="h-10 sm:h-11 lg:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div className="hidden sm:flex flex-col">
                <span
                  className={`font-extrabold text-sm tracking-wider transition-colors duration-300 ${
                    menuOpen
                      ? 'text-[#07192F]'
                      : scrolled
                      ? 'text-white'
                      : 'text-[#07192F]'
                  }`}
                >
                  ENGINUVITY NEXUS TECHNOLOGIES
                </span>
                <span
                  className={`font-mono text-[11px] tracking-widest uppercase transition-colors duration-300 ${
                    menuOpen
                      ? 'text-[#0284C7]'
                      : scrolled
                      ? 'text-[#01C8F3]'
                      : 'text-[#0284C7]'
                  }`}
                >
                  Quantum Engineering Simulation Platform
                </span>
              </div>
            </a>

            {/* Desktop Nav (Right side over dark navy portion) - UNCHANGED */}
            <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToTarget(item.target)}
                  className={`px-3.5 py-2 text-sm font-semibold transition-colors duration-200 relative group ${
                    scrolled
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
              className={`lg:hidden p-2 transition-colors focus:outline-none ${
                menuOpen
                  ? 'text-[#071A33] hover:text-[#00C8F3]'
                  : scrolled
                  ? 'text-white/80 hover:text-[#01C8F3]'
                  : 'text-[#07192F] hover:text-[#0284C7]'
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {menuOpen ? <X size={26} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {menuOpen && (
        <div
          className="lg:hidden w-full bg-[#070C18] border-b border-[#00C8F3]/40 shadow-2xl overflow-hidden"
          style={{
            backgroundColor: '#070C18',
            backgroundImage: 'none',
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
            opacity: 1,
          }}
        >
          <div className="flex flex-col py-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToTarget(item.target)}
                className="text-left w-full px-7 py-[18px] text-[18px] sm:text-[19px] font-semibold text-[#F4F8FB] hover:text-[#00C8F3] hover:bg-[#00C8F3]/5 border-l-4 border-transparent hover:border-[#00C8F3] transition-all duration-200 leading-[1.45] flex items-center"
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
