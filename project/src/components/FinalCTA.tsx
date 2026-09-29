import { useEffect, useRef, useState } from 'react';
import { Zap, ArrowRight, Atom } from 'lucide-react';

function CTACanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const t = timeRef.current;

      const cx = w / 2;
      const cy = h / 2;
      const colors = ['#00E5FF', '#38BDF8', '#2563EB', '#60A5FA'];

      // Concentric rings
      for (let i = 0; i < 6; i++) {
        const r = 40 + i * 45 + 12 * Math.sin(t * 0.02 + i * 0.5);
        const alpha = 0.05 + 0.03 * Math.sin(t * 0.03 + i * 0.3);
        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Streaming quantum particles
      for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2 + t * 0.012;
        const r = 90 + 35 * Math.sin(t * 0.02 + i * 0.3);
        const px = cx + Math.cos(angle) * r;
        const py = cy + Math.sin(angle) * r;
        const size = 2 + Math.sin(t * 0.05 + i) * 1;
        const color = colors[i % colors.length];
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      // Grid lines
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.04)';
      ctx.lineWidth = 0.8;
      for (let x = 0; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      timeRef.current++;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />;
}

export default function FinalCTA() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-bg-primary overflow-hidden">
      <div className="absolute inset-0">
        <CTACanvas />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/70 via-transparent to-bg-primary/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,255,0.08)_0%,transparent_70%)]" />

      {/* Content */}
      <div className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="inline-block px-4 py-1.5 border border-brand-cyan/40 rounded-sm bg-brand-cyan/10 mb-8 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
          <span className="font-mono text-xs sm:text-sm font-bold text-brand-cyan tracking-[0.22em] uppercase">
            QUANTUM ENGINEERING SIMULATION PLATFORM
          </span>
        </div>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
          THE NEXT GENERATION OF
          <br />
          <span className="text-gradient-cyan">QUANTUM ENGINEERING SIMULATION</span>
        </h2>

        <p className="text-slate-200 text-lg sm:text-2xl max-w-3xl mx-auto leading-relaxed font-normal mb-12">
          Experience the power where classical multi-physics, neural surrogate models, and quantum algorithms converge to build the future of aerospace, acoustics, and mechanical design.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <button
            onClick={() => document.getElementById('simulation-lab')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary flex items-center justify-center gap-3 px-9 py-4.5 rounded-sm text-base font-bold tracking-wider"
          >
            <Zap size={18} />
            LAUNCH SIMULATION LAB
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn-secondary flex items-center justify-center gap-3 px-9 py-4.5 rounded-sm text-base font-bold tracking-wider"
          >
            EXPLORE PLATFORM OVERVIEW
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {[
            { label: 'Compute Architecture', value: 'Quantum Hybrid' },
            { label: 'Physics Solvers', value: 'FEA • CFD • NVH' },
            { label: 'Classical Speedup', value: 'Up to 340×' },
            { label: 'Platform Vision', value: 'Quantum First' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded bg-bg-card/60 border border-border-subtle">
              <div className="text-2xl sm:text-3xl font-black text-gradient-cyan mb-1.5">{stat.value}</div>
              <div className="font-mono text-xs sm:text-sm text-slate-300 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
