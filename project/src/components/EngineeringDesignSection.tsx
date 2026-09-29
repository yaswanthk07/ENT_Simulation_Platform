import { useState, useEffect, useRef } from 'react';
import { Sliders, RotateCcw, Play, CheckCircle2, Layers, Cpu, Box, Compass } from 'lucide-react';

const CAPABILITIES = [
  'Conceptual design',
  'Mechanical design',
  'CAD/CAE',
  'System design',
  'Design optimization',
  'Digital twins',
  'Parametric modelling',
  'Performance prediction',
  'Design-for-manufacturing support',
];

export default function EngineeringDesignSection() {
  const [thickness, setThickness] = useState(4.5);
  const [meshDensity, setMeshDensity] = useState(180);
  const [appliedLoad, setAppliedLoad] = useState(65);
  const [material, setMaterial] = useState<'titanium' | 'aluminum' | 'inconel' | 'composite'>('titanium');
  const [viewMode, setViewMode] = useState<'wireframe' | 'stress' | 'iso'>('stress');
  const [isSolving, setIsSolving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Solved metrics
  const [solvedData, setSolvedData] = useState({
    dfmScore: 98.4,
    massReduction: 24.8,
    peakStress: 218.4,
    syncLatency: 1.2,
    safetyFactor: 2.42,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const angleRef = useRef<number>(0);

  const calculateResults = (t: number, mesh: number, load: number, mat: string) => {
    const matFactor = mat === 'titanium' ? 1.0 : mat === 'aluminum' ? 0.65 : mat === 'inconel' ? 1.35 : 0.85;
    const yieldLimit = mat === 'titanium' ? 880 : mat === 'aluminum' ? 503 : mat === 'inconel' ? 1150 : 780;
    const peak = Math.round((load * 3.4 * (6.0 / t)) * (1 / matFactor));
    const mass = (28 - (t * 1.8) + (mesh * 0.02)).toFixed(1);
    const dfm = Math.min(99.6, Math.max(82.0, 100 - Math.abs(t - 4.0) * 2.8)).toFixed(1);
    const sf = (yieldLimit / Math.max(1, peak)).toFixed(2);
    const latency = (0.8 + (mesh / 250) * 0.6).toFixed(1);

    return {
      dfmScore: parseFloat(dfm),
      massReduction: parseFloat(mass),
      peakStress: peak,
      syncLatency: parseFloat(latency),
      safetyFactor: parseFloat(sf),
    };
  };

  const handleRunSolver = () => {
    setIsSolving(true);
    setTimeout(() => {
      setSolvedData(calculateResults(thickness, meshDensity, appliedLoad, material));
      setHasChanges(false);
      setIsSolving(false);
    }, 600);
  };

  const handleReset = () => {
    setThickness(4.5);
    setMeshDensity(180);
    setAppliedLoad(65);
    setMaterial('titanium');
    setSolvedData(calculateResults(4.5, 180, 65, 'titanium'));
    setHasChanges(false);
  };

  // Canvas visual loop: 3D rotating parametric mechanical CAD model
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

      // Grid background
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 35) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += 35) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      angleRef.current += 0.008;
      const angle = angleRef.current;
      const cx = w / 2;
      const cy = h / 2;

      // 3D Parametric CAD Bracket / Rib geometry
      const rOuter = 110 + (thickness - 4.5) * 6;
      const rInner = 50 + (thickness - 4.5) * 3;
      const depth = 90;
      const nodes = 16;

      const project = (x: number, y: number, z: number) => {
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const xRot = x * cosA - z * sinA;
        const zRot = x * sinA + z * cosA;
        const yRot = y * Math.cos(0.4) - zRot * Math.sin(0.4);
        const scale = 380 / (380 + zRot * 0.4);
        return {
          px: cx + xRot * scale,
          py: cy + yRot * scale,
          depth: zRot,
        };
      };

      // Draw wireframe layers
      for (let layer = -1; layer <= 1; layer += 2) {
        const z = (layer * depth) / 2;
        ctx.beginPath();
        for (let i = 0; i <= nodes; i++) {
          const theta = (i / nodes) * Math.PI * 2;
          const r = i % 2 === 0 ? rOuter : rInner;
          const p = project(Math.cos(theta) * r, Math.sin(theta) * r, z);
          if (i === 0) ctx.moveTo(p.px, p.py);
          else ctx.lineTo(p.px, p.py);
        }
        ctx.closePath();
        ctx.strokeStyle = viewMode === 'stress' ? 'rgba(0, 229, 255, 0.85)' : 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      // Connecting ribs / finite elements
      for (let i = 0; i < nodes; i += 2) {
        const theta = (i / nodes) * Math.PI * 2;
        const r1 = rOuter;
        const r2 = rInner;
        const p1 = project(Math.cos(theta) * r1, Math.sin(theta) * r1, -depth / 2);
        const p2 = project(Math.cos(theta) * r1, Math.sin(theta) * r1, depth / 2);
        const p3 = project(Math.cos(theta) * r2, Math.sin(theta) * r2, depth / 2);
        const p4 = project(Math.cos(theta) * r2, Math.sin(theta) * r2, -depth / 2);

        // FEA Surface shading
        if (viewMode === 'stress') {
          const stressIntensity = Math.min(1.0, (appliedLoad / 200) + (i % 4 === 0 ? 0.35 : 0.05));
          ctx.fillStyle = stressIntensity > 0.65 ? 'rgba(239, 68, 68, 0.25)' : stressIntensity > 0.4 ? 'rgba(234, 179, 8, 0.2)' : 'rgba(0, 229, 255, 0.15)';
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.lineTo(p3.px, p3.py);
          ctx.lineTo(p4.px, p4.py);
          ctx.closePath();
          ctx.fill();
        }

        ctx.strokeStyle = 'rgba(0, 229, 255, 0.35)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py); ctx.lineTo(p2.px, p2.py);
        ctx.moveTo(p3.px, p3.py); ctx.lineTo(p4.px, p4.py);
        ctx.stroke();
      }

      // Coordinate axes HUD
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(50, h - 50); ctx.lineTo(95, h - 50); ctx.stroke();
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.8)';
      ctx.beginPath(); ctx.moveTo(50, h - 50); ctx.lineTo(50, h - 95); ctx.stroke();
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.8)';
      ctx.beginPath(); ctx.moveTo(50, h - 50); ctx.lineTo(75, h - 75); ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText('X', 100, h - 47);
      ctx.fillText('Y', 47, h - 100);
      ctx.fillText('Z', 80, h - 77);

      // HUD Telemetry
      ctx.fillStyle = '#00e5ff';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText(`PARAMETRIC ROTATION: ${(angle * (180 / Math.PI) % 360).toFixed(1)}°`, 20, 30);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`NODES: ${(meshDensity * 42).toLocaleString()} | CAD ENGINE: NEXUS DIGITAL TWIN v3.2`, 20, 48);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [thickness, meshDensity, appliedLoad, material, viewMode]);

  return (
    <section id="engineering-design" className="relative py-20 bg-bg-secondary overflow-hidden border-t border-border-subtle">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <div className="px-3.5 py-1.5 border border-brand-cyan/40 rounded-sm bg-brand-cyan/10">
                <span className="font-mono text-xs font-bold text-brand-cyan tracking-[0.2em] uppercase">
                  ENGINEERING SERVICE 02
                </span>
              </div>
              <div className="px-3 py-1.5 border border-border-subtle rounded-sm bg-bg-card">
                <span className="font-mono text-xs text-slate-300 font-medium">
                  CAD / CAE &amp; DIGITAL TWINS
                </span>
              </div>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              ENGINEERING DESIGN &amp; <span className="text-gradient-cyan">DIGITAL ENGINEERING</span>
            </h2>
            <p className="text-slate-300 text-lg max-w-3xl font-normal mt-2 leading-relaxed">
              Conceptual design, mechanical design, CAD/CAE, system design, design optimization, digital twins, parametric modelling, performance prediction, and design-for-manufacturing support.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={handleRunSolver}
              disabled={isSolving}
              className="btn-primary flex items-center gap-2.5 px-6 py-3.5 rounded-sm text-sm font-bold tracking-wider uppercase"
            >
              {isSolving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  SYNCING DIGITAL TWIN...
                </>
              ) : (
                <>
                  <Play size={16} />
                  RUN CAD SOLVER
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="btn-secondary flex items-center gap-2 px-5 py-3.5 rounded-sm text-sm font-semibold tracking-wider"
            >
              <RotateCcw size={15} />
              RESET
            </button>
          </div>
        </div>

        {/* Capability Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CAPABILITIES.map((cap) => (
            <span
              key={cap}
              className="px-3 py-1 bg-bg-card/80 border border-border-subtle rounded-sm text-xs font-mono text-slate-300 flex items-center gap-1.5 hover:border-brand-cyan/40 transition"
            >
              <CheckCircle2 size={12} className="text-brand-cyan" />
              {cap}
            </span>
          ))}
        </div>

        {/* Dedicated Simulation Lab Workbench */}
        <div className="border border-border-subtle rounded-sm overflow-hidden bg-bg-secondary shadow-2xl">
          
          {/* Top Status Bar */}
          <div className="flex flex-wrap items-center justify-between px-5 py-3 border-b border-border-subtle bg-bg-card">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs font-bold text-brand-cyan tracking-wider">
                SIMULATION WORKBENCH:
              </span>
              <span className="font-mono text-xs font-bold text-white uppercase">
                PARAMETRIC DIGITAL TWIN &amp; CAD FEA LAB
              </span>
            </div>

            <div className="flex items-center gap-6">
              {hasChanges && (
                <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded">
                  <span className="font-mono text-xs font-bold text-amber-400">
                    PARAMETERS MODIFIED — CLICK 'RUN CAD SOLVER' TO RECOMPUTE
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <div className="status-dot status-dot-cyan" />
                <span className="font-mono text-xs font-bold text-emerald-400">DIGITAL TWIN LIVE</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            
            {/* Left Column: Interactive Input Parameters (3 cols) */}
            <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-border-subtle bg-bg-card/90 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-border-subtle">
                  <Sliders size={16} className="text-brand-cyan" />
                  <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">
                    INTERACTIVE INPUT PARAMETERS
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Material */}
                  <div>
                    <div className="flex justify-between font-mono text-xs text-slate-300 mb-1.5">
                      <span>Material Alloy Specification:</span>
                    </div>
                    <select
                      value={material}
                      onChange={(e) => {
                        setMaterial(e.target.value as any);
                        setHasChanges(true);
                      }}
                      className="w-full bg-slate-900 border border-border-subtle rounded px-2.5 py-2 font-mono text-xs text-brand-cyan focus:outline-none focus:border-brand-cyan cursor-pointer"
                    >
                      <option value="titanium">Titanium Ti-6Al-4V (Grade 5)</option>
                      <option value="aluminum">Aluminum 7075-T6 (Aerospace)</option>
                      <option value="inconel">Inconel 718 (Nickel Superalloy)</option>
                      <option value="composite">Carbon Fiber Prepreg Composite</option>
                    </select>
                  </div>

                  {/* Wall Thickness */}
                  <div>
                    <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                      <span>Parametric Wall Thickness (t):</span>
                      <span className="font-bold text-brand-cyan">{thickness.toFixed(1)} mm</span>
                    </div>
                    <input
                      type="range" min="1.5" max="12.0" step="0.5"
                      value={thickness}
                      onChange={(e) => {
                        setThickness(parseFloat(e.target.value));
                        setHasChanges(true);
                      }}
                      className="w-full"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                      <span>1.5 mm (Thin Rib)</span>
                      <span>12.0 mm (Heavy Structural)</span>
                    </div>
                  </div>

                  {/* Mesh Density */}
                  <div>
                    <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                      <span>FEA Mesh Resolution:</span>
                      <span className="font-bold text-brand-cyan">{meshDensity}k Elements</span>
                    </div>
                    <input
                      type="range" min="50" max="400" step="10"
                      value={meshDensity}
                      onChange={(e) => {
                        setMeshDensity(parseInt(e.target.value));
                        setHasChanges(true);
                      }}
                      className="w-full"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                      <span>50k (Fast Preview)</span>
                      <span>400k (Fine Quadrilateral)</span>
                    </div>
                  </div>

                  {/* Mechanical Load */}
                  <div>
                    <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                      <span>Applied Structural Load (P):</span>
                      <span className="font-bold text-brand-cyan">{appliedLoad} kN</span>
                    </div>
                    <input
                      type="range" min="10" max="250" step="5"
                      value={appliedLoad}
                      onChange={(e) => {
                        setAppliedLoad(parseInt(e.target.value));
                        setHasChanges(true);
                      }}
                      className="w-full"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                      <span>10 kN</span>
                      <span>250 kN (Extreme Load)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="pt-4 border-t border-border-subtle mt-4">
                <span className="text-[11px] font-mono text-slate-400 block mb-2">DESIGN OPTIMIZATION PRESETS:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setThickness(3.0);
                      setAppliedLoad(45);
                      setMaterial('composite');
                      setHasChanges(true);
                    }}
                    className="px-2.5 py-1.5 rounded text-[11px] font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 border border-border-subtle hover:border-brand-cyan/40 transition text-center"
                  >
                    Ultra-Lightweight
                  </button>
                  <button
                    onClick={() => {
                      setThickness(8.5);
                      setAppliedLoad(180);
                      setMaterial('inconel');
                      setHasChanges(true);
                    }}
                    className="px-2.5 py-1.5 rounded text-[11px] font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 border border-border-subtle hover:border-brand-cyan/40 transition text-center"
                  >
                    Heavy-Duty Structural
                  </button>
                </div>
              </div>
            </div>

            {/* Center Viewport: Single CAD & Digital Twin Simulation Visualization (6 cols) */}
            <div className="lg:col-span-6 relative border-b lg:border-b-0 lg:border-r border-border-subtle bg-bg-primary flex flex-col">
              
              {/* Top View Mode Selector */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <button
                  onClick={() => setViewMode('stress')}
                  className={`px-3 py-1.5 rounded text-xs font-mono font-bold border transition-all ${
                    viewMode === 'stress'
                      ? 'bg-brand-cyan text-black border-brand-cyan'
                      : 'bg-slate-900/80 text-slate-300 border-border-subtle hover:text-white'
                  }`}
                >
                  STRESS CONTOUR
                </button>
                <button
                  onClick={() => setViewMode('wireframe')}
                  className={`px-3 py-1.5 rounded text-xs font-mono font-bold border transition-all ${
                    viewMode === 'wireframe'
                      ? 'bg-brand-cyan text-black border-brand-cyan'
                      : 'bg-slate-900/80 text-slate-300 border-border-subtle hover:text-white'
                  }`}
                >
                  PARAMETRIC WIREFRAME
                </button>
              </div>

              {/* Viewport Canvas */}
              <div className="flex-1 w-full h-[460px] lg:h-full relative min-h-[460px] bg-slate-950 flex items-center justify-center overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full block" />
              </div>

              {/* Bottom HUD Bar */}
              <div className="border-t border-border-subtle bg-bg-card/95 px-5 py-3 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="font-mono text-xs text-slate-400 block">CAD KERNEL</span>
                    <span className="font-mono text-sm font-bold text-brand-cyan">BREP SOLID v4.8</span>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-slate-400 block">TWIN FIDELITY</span>
                    <span className="font-mono text-sm font-bold text-emerald-400">99.8% SYNC</span>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-slate-400 block">SOLVER COUPLING</span>
                    <span className="font-mono text-sm font-bold text-white">ISO CAD/CAE</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-cyan" />
                  <span className="font-mono text-xs font-semibold text-slate-200">NUMERICAL EQUILIBRIUM</span>
                </div>
              </div>
            </div>

            {/* Right Column: Solved Numerical Results (3 cols) */}
            <div className="lg:col-span-3 bg-bg-card flex flex-col p-5">
              <div className="pb-3 border-b border-border-subtle flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">
                  SOLVED NUMERICAL RESULTS
                </span>
                <span className={`px-2 py-0.5 font-mono text-[11px] font-bold rounded ${hasChanges ? 'bg-amber-500/20 text-amber-400' : 'bg-brand-cyan/20 text-brand-cyan'}`}>
                  {hasChanges ? 'PENDING SOLVE' : 'SOLVED'}
                </span>
              </div>

              {hasChanges && (
                <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded text-xs font-mono text-amber-300 leading-relaxed">
                  Parameters have been modified. Click <strong>RUN CAD SOLVER</strong> to update the digital twin telemetry!
                </div>
              )}

              <div className="py-4 space-y-3.5 flex-1">
                <div className="p-3.5 rounded bg-bg-secondary border border-border-subtle">
                  <div className="text-xs font-mono text-slate-400">DFM Manufacturability Score</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold mt-1 text-emerald-400">
                    {solvedData.dfmScore} / 100
                  </div>
                </div>

                <div className="p-3.5 rounded bg-bg-secondary border border-border-subtle">
                  <div className="text-xs font-mono text-slate-400">Structural Mass Reduction</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold mt-1 text-brand-cyan">
                    -{solvedData.massReduction} %
                  </div>
                </div>

                <div className="p-3.5 rounded bg-bg-secondary border border-border-subtle">
                  <div className="text-xs font-mono text-slate-400">Peak Von Mises Stress</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold mt-1 text-white">
                    {solvedData.peakStress} MPa
                  </div>
                </div>

                <div className="p-3.5 rounded bg-bg-secondary border border-border-subtle">
                  <div className="text-xs font-mono text-slate-400">Digital Twin Sync Latency</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold mt-1 text-brand-blue">
                    {solvedData.syncLatency} ms
                  </div>
                </div>

                <div className="p-3.5 rounded bg-bg-secondary border border-border-subtle">
                  <div className="text-xs font-mono text-slate-400">Factor of Safety (FoS)</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold mt-1 text-emerald-400">
                    {solvedData.safetyFactor}
                  </div>
                </div>
              </div>

              <button
                onClick={handleRunSolver}
                disabled={isSolving}
                className="mt-auto w-full btn-primary py-3 rounded-sm font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <Play size={14} />
                RUN CAD SOLVER
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
