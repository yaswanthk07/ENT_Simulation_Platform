import { useEffect, useRef, useState } from 'react';
import { Play, CheckCircle, Sliders, TrendingUp } from 'lucide-react';

type Material = 'Titanium' | 'Aluminum' | 'Composite';

function computeResults(angle: number, thickness: number, velocity: number, material: Material) {
  const matFactor = { Titanium: 1.0, Aluminum: 0.72, Composite: 0.88 }[material];
  const efficiency = Math.min(99, 68 + (angle - 18) * 1.2 - (thickness - 2.4) * 3 + (velocity - 120) * 0.05) * matFactor;
  const mass = (thickness / 2.4) * matFactor * 1.8;
  const stress = 150 + (velocity - 120) * 1.8 + (angle - 18) * 4 - (thickness - 2.4) * 20;
  const temp = 320 + (velocity - 120) * 0.8 + (angle - 18) * 2;
  const pressureDrop = 0.8 + (angle - 18) * 0.06 + (velocity - 120) * 0.003;
  return {
    efficiency: Math.max(40, Math.min(99, efficiency)).toFixed(1),
    mass: Math.max(0.5, mass).toFixed(2),
    stress: Math.round(Math.max(100, Math.min(600, stress))),
    temperature: Math.round(temp),
    pressureDrop: Math.max(0.2, pressureDrop).toFixed(2),
  };
}

function DesignSpaceCanvas({ designs, currentDesign }: {
  designs: { x: number; y: number; efficiency: number; iteration: number }[];
  currentDesign: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    ctx.clearRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.06)';
    ctx.lineWidth = 0.8;
    for (let x = 0; x < w; x += 35) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 35) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

    // Axes
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(40, h - 35); ctx.lineTo(w - 15, h - 35); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(40, h - 35); ctx.lineTo(40, 15); ctx.stroke();

    ctx.fillStyle = '#00E5FF';
    ctx.font = 'bold 11px JetBrains Mono';
    ctx.fillText('STRUCTURAL MASS →', w - 140, h - 15);
    ctx.save();
    ctx.translate(16, h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('AERODYNAMIC EFFICIENCY →', -80, 0);
    ctx.restore();

    // Pareto front (approximate)
    const sorted = [...designs].sort((a, b) => a.x - b.x);
    if (sorted.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.moveTo(sorted[0].x, sorted[0].y);
      sorted.forEach((d) => ctx.lineTo(d.x, d.y));
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Design points
    designs.forEach((d, i) => {
      const isCurrentBest = i === currentDesign;
      const r = isCurrentBest ? 7 : 4;
      const alpha = 0.4 + (d.efficiency / 99) * 0.6;

      if (isCurrentBest) {
        const glow = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, r * 3);
        glow.addColorStop(0, 'rgba(0, 229, 255, 0.6)');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(d.x, d.y, r * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
      ctx.fillStyle = isCurrentBest ? '#00E5FF' : `rgba(56, 189, 248, ${alpha})`;
      ctx.fill();
      if (isCurrentBest) {
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });

    // Labels
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px JetBrains Mono';
    ctx.fillText('QUANTUM PARETO FRONTIER', 50, 28);
    ctx.fillStyle = 'rgba(0, 229, 255, 0.8)';
    ctx.fillText(`${designs.length} / 50 CANDIDATES EVALUATED`, 50, 44);
  }, [designs, currentDesign]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

const materials: Material[] = ['Titanium', 'Aluminum', 'Composite'];

export default function OptimizationSection() {
  const [angle, setAngle] = useState(18);
  const [thickness, setThickness] = useState(2.4);
  const [velocity, setVelocity] = useState(160);
  const [material, setMaterial] = useState<Material>('Titanium');
  const [running, setRunning] = useState(false);
  const [designs, setDesigns] = useState<{ x: number; y: number; efficiency: number; iteration: number }[]>([]);
  const [currentDesign, setCurrentDesign] = useState(0);
  const [complete, setComplete] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const results = computeResults(angle, thickness, velocity, material);

  const runOptimization = () => {
    if (running) return;
    setRunning(true);
    setComplete(false);
    setDesigns([]);
    setCurrentDesign(0);

    const totalDesigns = 50;
    let count = 0;

    const interval = setInterval(() => {
      if (count >= totalDesigns) {
        clearInterval(interval);
        setRunning(false);
        setComplete(true);
        return;
      }

      const a = 18 + Math.random() * 14;
      const t = 2.4 + Math.random() * 2.4;
      const v = 120 + Math.random() * 120;
      const m = materials[Math.floor(Math.random() * 3)];
      const r = computeResults(a, t, v, m);

      const canvasW = 460;
      const canvasH = 260;

      const px = 50 + (parseFloat(r.mass) / 3.6) * (canvasW - 80);
      const py = (canvasH - 40) - (parseFloat(r.efficiency) / 100) * (canvasH - 60);

      setDesigns((prev) => {
        const next = [...prev, { x: px, y: py, efficiency: parseFloat(r.efficiency), iteration: count }];
        const best = next.reduce((acc, d, i) => (d.efficiency > next[acc].efficiency ? i : acc), 0);
        setCurrentDesign(best);
        return next;
      });

      count++;
    }, 60);
  };

  return (
    <section id="optimization" ref={sectionRef} className="relative py-24 bg-bg-primary overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Reduced margins: max-w-[1520px] */}
      <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block px-4 py-1.5 border border-brand-cyan/30 rounded-sm bg-brand-cyan/10 mb-4">
            <span className="font-mono text-xs font-bold text-brand-cyan tracking-[0.2em] uppercase">
              MULTI-OBJECTIVE CO-DESIGN
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
            QUANTUM & AI <span className="text-gradient-cyan">TOPOLOGY OPTIMIZATION</span>
          </h2>
          <p className="text-slate-200 text-lg sm:text-xl max-w-3xl mx-auto font-normal leading-relaxed">
            Exploring thousands of structural mass and aerodynamic lift configurations in parallel to identify the optimal Pareto frontier.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (6 cols) */}
          <div className={`lg:col-span-6 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="glass-panel rounded-sm p-6 sm:p-7 border border-border-subtle shadow-xl">
              <div className="font-mono text-xs font-bold text-brand-cyan tracking-wider mb-6 uppercase pb-3 border-b border-border-subtle">
                DESIGN PARAMETER CONSTRAINTS
              </div>

              <div className="space-y-6 mb-7">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-xs sm:text-sm text-slate-300 font-semibold">Aerodynamic Pitch Angle</span>
                    <span className="font-mono text-sm sm:text-base text-brand-cyan font-bold">{angle}&deg;</span>
                  </div>
                  <input type="range" min={18} max={32} value={angle}
                    onChange={(e) => setAngle(+e.target.value)} className="w-full" disabled={running} />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-xs sm:text-sm text-slate-300 font-semibold">Spar Skin Thickness</span>
                    <span className="font-mono text-sm sm:text-base text-brand-cyan font-bold">{thickness} mm</span>
                  </div>
                  <input type="range" min={1.2} max={4.8} step={0.2} value={thickness}
                    onChange={(e) => setThickness(+e.target.value)} className="w-full" disabled={running} />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-xs sm:text-sm text-slate-300 font-semibold">Inflow Airspeed</span>
                    <span className="font-mono text-sm sm:text-base text-brand-cyan font-bold">{velocity} m/s</span>
                  </div>
                  <input type="range" min={120} max={240} value={velocity}
                    onChange={(e) => setVelocity(+e.target.value)} className="w-full" disabled={running} />
                </div>

                <div>
                  <div className="font-mono text-xs sm:text-sm text-slate-300 font-semibold mb-2.5">Structural Material:</div>
                  <div className="grid grid-cols-3 gap-3">
                    {materials.map((m) => (
                      <button
                        key={m}
                        onClick={() => setMaterial(m)}
                        disabled={running}
                        className={`py-2.5 rounded-sm font-mono text-xs sm:text-sm font-bold tracking-wider border transition-all duration-200 ${
                          material === m
                            ? 'bg-brand-cyan/20 border-brand-cyan text-brand-cyan shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                            : 'border-border-subtle bg-bg-surface text-slate-300 hover:text-white'
                        }`}
                      >
                        {m.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Current results */}
              <div className="border-t border-border-subtle pt-6 mb-6">
                <div className="font-mono text-xs font-bold text-white tracking-[0.15em] mb-4 uppercase">
                  ACTIVE CANDIDATE DESIGN METRICS
                </div>
                <div className="grid grid-cols-2 gap-3.5">
                  {[
                    { label: 'Aerodynamic Efficiency', value: `${results.efficiency}%`, color: 'text-brand-cyan' },
                    { label: 'Structural Mass', value: `${results.mass} kg`, color: 'text-white' },
                    { label: 'Peak Von Mises Stress', value: `${results.stress} MPa`, color: 'text-brand-blue' },
                    { label: 'Pressure Loss', value: `${results.pressureDrop} kPa`, color: 'text-emerald-400' },
                  ].map((r) => (
                    <div key={r.label} className="bg-bg-surface rounded-sm p-3.5 border border-border-subtle">
                      <div className="font-mono text-xs text-slate-400 mb-1">{r.label}</div>
                      <div className={`font-mono text-lg sm:text-xl font-bold ${r.color}`}>{r.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={runOptimization}
                disabled={running}
                className={`w-full flex items-center justify-center gap-3 py-4 rounded-sm font-mono text-xs sm:text-sm font-bold tracking-widest transition-all duration-200 uppercase ${
                  running ? 'bg-white/5 text-white/40 cursor-not-allowed border border-border-subtle' : 'btn-primary'
                }`}
              >
                {running ? (
                  <><div className="w-4 h-4 border-2 border-white/20 border-t-brand-cyan rounded-full animate-spin" /> EXPLORING DESIGN SPACE... {designs.length}/50</>
                ) : complete ? (
                  <><CheckCircle size={16} className="text-emerald-400" /> OPTIMIZATION COMPLETE — RE-RUN STUDY</>
                ) : (
                  <><Play size={16} /> EXECUTE PARETO OPTIMIZATION (50 DESIGNS)</>
                )}
              </button>
            </div>
          </div>

          {/* Design space visualization (6 cols) */}
          <div className={`lg:col-span-6 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="glass-panel rounded-sm overflow-hidden border border-brand-cyan/30 shadow-2xl" style={{ height: 320 }}>
              <DesignSpaceCanvas designs={designs} currentDesign={currentDesign} />
            </div>

            {complete && (
              <div className="mt-5 p-6 border-2 border-emerald-500/40 rounded-sm bg-emerald-500/10 shadow-xl">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle size={18} className="text-emerald-400" />
                  <span className="font-mono text-xs sm:text-sm font-bold text-emerald-400 tracking-wider uppercase">
                    PARETO OPTIMIZATION CONVERGED
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Designs Explored', value: '50 Candidates' },
                    { label: 'Peak Efficiency', value: `${Math.max(...designs.map((d) => d.efficiency)).toFixed(1)}%` },
                    { label: 'Mass Reduction', value: '-14.8%' },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="font-mono text-base sm:text-xl font-black text-brand-cyan">{m.value}</div>
                      <div className="font-mono text-xs text-slate-300 mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!complete && designs.length === 0 && (
              <div className="mt-5 p-6 glass-panel rounded-sm text-center border border-border-subtle">
                <div className="font-mono text-sm text-slate-300 mb-1 font-semibold">CLICK 'EXECUTE PARETO OPTIMIZATION'</div>
                <div className="font-mono text-xs text-slate-500">TO COMPUTE THE PARETO TRADE-OFF FRONTIER</div>
              </div>
            )}

            {running && designs.length > 0 && (
              <div className="mt-5 p-5 glass-panel rounded-sm border border-brand-cyan/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-brand-cyan">EXPLORING MULTI-PHYSICS SPACE</span>
                  <span className="font-mono text-xs font-bold text-white">{designs.length} / 50</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-cyan to-brand-cobalt rounded-full transition-all duration-200"
                    style={{ width: `${(designs.length / 50) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
