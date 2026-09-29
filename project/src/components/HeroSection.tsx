import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  speed: Math.random() * 0.3 + 0.1,
  color: ['#00C0F0', '#9000D0', '#F00070', '#F0A020'][Math.floor(Math.random() * 4)],
  opacity: Math.random() * 0.6 + 0.2,
}));

function TurbineCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string }[] = [];

    const addParticle = (cx: number, cy: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.5 + 0.5;
      const colors = ['#00C0F0', '#00D8F0', '#9000D0', '#F00070'];
      particles.push({
        x: cx + (Math.random() - 0.5) * 60,
        y: cy - Math.random() * 40,
        vx: Math.cos(angle) * speed * 0.8 + 1.5,
        vy: Math.sin(angle) * speed * 0.4 - 0.3,
        life: 0,
        maxLife: 80 + Math.random() * 80,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    const drawBlade = (ctx: CanvasRenderingContext2D, cx: number, cy: number, angle: number, t: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const scale = Math.min(w, h) / 500;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      // Blade body
      const grad = ctx.createLinearGradient(-60 * scale, -120 * scale, 60 * scale, 120 * scale);
      grad.addColorStop(0, 'rgba(0,192,240,0.15)');
      grad.addColorStop(0.3, 'rgba(0,192,240,0.25)');
      grad.addColorStop(0.7, 'rgba(144,0,208,0.2)');
      grad.addColorStop(1, 'rgba(240,0,112,0.1)');

      ctx.beginPath();
      ctx.moveTo(-8 * scale, -120 * scale);
      ctx.bezierCurveTo(-20 * scale, -80 * scale, -35 * scale, -30 * scale, -25 * scale, 20 * scale);
      ctx.bezierCurveTo(-15 * scale, 60 * scale, 0, 90 * scale, 5 * scale, 120 * scale);
      ctx.bezierCurveTo(20 * scale, 80 * scale, 30 * scale, 30 * scale, 20 * scale, -20 * scale);
      ctx.bezierCurveTo(15 * scale, -60 * scale, 8 * scale, -90 * scale, -8 * scale, -120 * scale);
      ctx.fillStyle = grad;
      ctx.fill();

      // Wireframe edges
      ctx.strokeStyle = 'rgba(0,192,240,0.5)';
      ctx.lineWidth = 0.8 * scale;
      ctx.stroke();

      // Leading edge glow
      ctx.beginPath();
      ctx.moveTo(-8 * scale, -120 * scale);
      ctx.bezierCurveTo(-20 * scale, -80 * scale, -35 * scale, -30 * scale, -25 * scale, 20 * scale);
      ctx.strokeStyle = `rgba(0,192,240,${0.5 + 0.3 * Math.sin(t * 0.05)})`;
      ctx.lineWidth = 1.5 * scale;
      ctx.stroke();

      // Mesh grid lines
      ctx.strokeStyle = 'rgba(0,216,240,0.15)';
      ctx.lineWidth = 0.4 * scale;
      for (let i = -100; i <= 100; i += 18) {
        ctx.beginPath();
        ctx.moveTo(-30 * scale, i * scale);
        ctx.lineTo(20 * scale, i * scale);
        ctx.stroke();
      }
      for (let i = -30; i <= 20; i += 12) {
        ctx.beginPath();
        ctx.moveTo(i * scale, -120 * scale);
        ctx.lineTo(i * scale, 120 * scale);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawStreamlines = (ctx: CanvasRenderingContext2D, cx: number, cy: number, t: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      for (let i = 0; i < 8; i++) {
        const offset = (i / 8) * h;
        const phase = t * 0.02 + i * 0.5;
        const colors = ['#00C0F0', '#00D8F0', '#9000D0', '#F00070'];
        const color = colors[i % colors.length];

        ctx.beginPath();
        ctx.strokeStyle = `${color}40`;
        ctx.lineWidth = 1;

        let px = 0;
        let py = offset;
        ctx.moveTo(px, py);

        for (let x = 0; x < w; x += 3) {
          const distFromBlade = Math.abs(x - cx);
          const distFromCenter = Math.abs(py - cy);
          let deflection = 0;
          if (distFromBlade < 120) {
            deflection = (30 * (1 - distFromBlade / 120)) * Math.sin(phase + x * 0.01);
          }
          py = offset + deflection + 5 * Math.sin(phase + x * 0.015);
          ctx.lineTo(x, py);
        }
        ctx.stroke();
      }
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.5;
      const t = timeRef.current;

      // Background grid
      ctx.strokeStyle = 'rgba(0,192,240,0.04)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Streamlines behind blade
      drawStreamlines(ctx, cx, cy, t);

      // Turbine blades (3 blades rotated)
      const baseAngle = t * 0.008;
      for (let b = 0; b < 3; b++) {
        drawBlade(ctx, cx, cy, baseAngle + (b * Math.PI * 2) / 3, t);
      }

      // Hub circle
      const hubGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 25);
      hubGrad.addColorStop(0, 'rgba(0,192,240,0.4)');
      hubGrad.addColorStop(0.5, 'rgba(144,0,208,0.3)');
      hubGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      ctx.fillStyle = hubGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,192,240,0.6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Flow particles
      if (t % 4 === 0 && particles.length < 120) {
        addParticle(cx * 0.2, cy + (Math.random() - 0.5) * h * 0.6);
      }

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        const alpha = (1 - p.life / p.maxLife) * 0.8;
        const size = 2 * (1 - p.life / p.maxLife) + 0.5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      // Remove dead particles
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].life >= particles[i].maxLife || particles[i].x > w) {
          particles.splice(i, 1);
        }
      }

      // Coordinate axes
      ctx.strokeStyle = 'rgba(0,192,240,0.25)';
      ctx.lineWidth = 1;
      // X axis
      ctx.beginPath(); ctx.moveTo(30, h - 30); ctx.lineTo(80, h - 30); ctx.stroke();
      ctx.fillStyle = '#00C0F0'; ctx.font = '9px JetBrains Mono'; ctx.fillText('X', 82, h - 27);
      // Y axis
      ctx.beginPath(); ctx.moveTo(30, h - 30); ctx.lineTo(30, h - 80); ctx.stroke();
      ctx.fillText('Y', 27, h - 83);

      timeRef.current++;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

const statLabels = ['VELOCITY', 'PRESSURE', 'TEMPERATURE', 'STRESS', 'MESH', 'SOLVER', 'ITERATION'];

export default function HeroSection() {
  const scrollDown = () => {
    const el = document.getElementById('bottleneck') || document.getElementById('platform');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-bg-primary">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(0,229,255,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(37,99,235,0.08)_0%,transparent_50%)]" />

      {/* Floating technical labels */}
      {statLabels.map((label, i) => (
        <div
          key={label}
          className="absolute hidden sm:block pointer-events-none"
          style={{
            left: `${6 + ((i * 14) % 84)}%`,
            top: `${14 + ((i * 12) % 65)}%`,
            animation: `particleFloat ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          <span className="font-mono text-xs text-brand-cyan/50 tracking-widest bg-bg-card/70 px-2 py-0.5 border border-border-subtle rounded">{label}</span>
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 flex-1 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-12 gap-8 min-h-[calc(100vh-9rem)] items-center">

          {/* Left: Hero text (7 cols) */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
            {/* Badge */}


            <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black leading-[1.08] tracking-tight mb-6">
              <span className="text-white">ENT</span>
              <span className="text-gradient-brand">angle</span>
            </h1>

            <p className="text-slate-200 text-lg sm:text-xl leading-relaxed mb-9 max-w-2xl font-normal">
              Setting the Platform for the Quantum Engineering Simulation
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={scrollDown}
                className="btn-secondary flex items-center justify-center gap-3 px-8 py-4 rounded-sm text-base font-bold tracking-wider"
              >
                EXPLORE PLATFORM
              </button>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=info@enginuvitynexus.com&su=Start%20Free%20Trial"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-3 px-8 py-4 rounded-sm text-base font-bold tracking-wider"
              >
                Start Free Trial
              </a>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-6 border-t border-border-subtle pt-7">
              <div>
                <div className="text-xl sm:text-2xl xl:text-3xl font-black text-gradient-cyan tracking-tight">EXPLORE</div>
                <div className="text-xs sm:text-sm text-slate-300 mt-1 font-mono font-medium">larger design spaces</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl xl:text-3xl font-black text-gradient-cyan tracking-tight">OPTIMIZE</div>
                <div className="text-xs sm:text-sm text-slate-300 mt-1 font-mono font-medium">complex engineering systems</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl xl:text-3xl font-black text-gradient-cyan tracking-tight">ACCELERATE</div>
                <div className="text-xs sm:text-sm text-slate-300 mt-1 font-mono font-medium">compute-intensive subproblems</div>
              </div>
            </div>

            {/* Research initiative disclaimer */}
            <p className="text-xs sm:text-sm text-slate-400 mt-6 leading-relaxed font-normal border-l-2 border-brand-cyan/40 pl-3">
              ENTangle is currently a research-stage initiative. The features shown on this website represent our planned development roadmap and conceptual framework.
            </p>
          </div>

          {/* Right: 3D Visualization (5 cols) */}
          <div className="lg:col-span-5 xl:col-span-5 relative flex items-center justify-center">
            <div className="relative aspect-square w-full max-w-lg mx-auto">
              {/* Outer rings */}
              <div className="absolute inset-0 rounded-full border border-brand-cyan/20 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-brand-cobalt/20" style={{ animation: 'spin 14s linear infinite reverse' }} />

              {/* Canvas visualization */}
              <div className="absolute inset-6 rounded-lg overflow-hidden border border-border-subtle bg-bg-card/70 backdrop-blur">
                <TurbineCanvas />
              </div>

              {/* Corner brackets */}
              <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-brand-cyan/70" />
              <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-brand-cyan/70" />
              <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-brand-cyan/70" />
              <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-brand-cyan/70" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-300 hover:text-brand-cyan transition-colors duration-300"
      >
        <span className="font-mono text-xs tracking-widest uppercase font-semibold">EXPLORE PLATFORM</span>
        <ChevronDown size={18} className="animate-bounce text-brand-cyan" />
      </button>
    </section>
  );
}
