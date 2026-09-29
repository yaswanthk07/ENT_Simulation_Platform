import { useState, useEffect, useRef } from 'react';
import { Sliders, RotateCcw, Play, CheckCircle2, Waves, Activity, Anchor, Gauge } from 'lucide-react';

const CAPABILITIES = [
  'Scale-model testing',
  'Hydrodynamic testing',
  'Resistance and propulsion tests',
  'Cavitation testing',
  'Thermal testing',
  'Performance characterization',
  'Instrumentation',
  'CFD–experimental validation',
];

export default function ExperimentalTestingSection() {
  const [velocity, setVelocity] = useState(4.2);
  const [scaleRatio, setScaleRatio] = useState(25);
  const [cavitationNum, setCavitationNum] = useState(0.85);
  const [waterTemp, setWaterTemp] = useState(18);
  const [samplingRate, setSamplingRate] = useState(20);
  const [isAcquiring, setIsAcquiring] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Solved experimental telemetry
  const [solvedData, setSolvedData] = useState({
    resistance: 48.6,
    cavitationMargin: '+0.42 σ',
    thrustFactor: 0.942,
    correlation: 99.2,
    sensorRms: 1.82,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const waveOffsetRef = useRef<number>(0);

  const calculateResults = (v: number, scale: number, sigma: number, temp: number) => {
    const rawR = 0.5 * 1025 * Math.pow(v, 2) * (0.08 * (25 / scale));
    const cavRisk = sigma < 0.7;
    const margin = (sigma - 0.45).toFixed(2);
    const thrust = (0.98 - (v * 0.008)).toFixed(3);
    const corr = Math.min(99.8, 98.0 + (scale / 50) * 1.5 - Math.abs(temp - 18) * 0.05).toFixed(1);
    const rms = (0.8 + v * 0.22 + (cavRisk ? 1.4 : 0.0)).toFixed(2);

    return {
      resistance: Math.round(rawR * 10) / 10,
      cavitationMargin: `${parseFloat(margin) >= 0 ? '+' : ''}${margin} σ`,
      thrustFactor: parseFloat(thrust),
      correlation: parseFloat(corr),
      sensorRms: parseFloat(rms),
    };
  };

  const handleAcquire = () => {
    setIsAcquiring(true);
    setTimeout(() => {
      setSolvedData(calculateResults(velocity, scaleRatio, cavitationNum, waterTemp));
      setHasChanges(false);
      setIsAcquiring(false);
    }, 600);
  };

  const handleReset = () => {
    setVelocity(4.2);
    setScaleRatio(25);
    setCavitationNum(0.85);
    setWaterTemp(18);
    setSamplingRate(20);
    setSolvedData(calculateResults(4.2, 25, 0.85, 18));
    setHasChanges(false);
  };

  // Canvas visual loop: Towing Tank & Cavitation Test Rig
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

    // Dynamic water particles
    const particles: { x: number; y: number; speed: number; size: number }[] = [];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * 800,
        y: 160 + Math.random() * 220,
        speed: 1.5 + Math.random() * 2.5,
        size: 1 + Math.random() * 2,
      });
    }

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Flume background
      const flumeGrad = ctx.createLinearGradient(0, 0, 0, h);
      flumeGrad.addColorStop(0, '#040812');
      flumeGrad.addColorStop(0.35, '#061326');
      flumeGrad.addColorStop(1, '#020b18');
      ctx.fillStyle = flumeGrad;
      ctx.fillRect(0, 0, w, h);

      // Carriage rail at top
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 20, w, 24);
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 20, w, 24);

      // Carriage mount slider
      const carriageX = w * 0.35;
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(carriageX - 35, 16, 70, 32);
      ctx.strokeStyle = '#38bdf8';
      ctx.strokeRect(carriageX - 35, 16, 70, 32);

      // Stinger strut into water
      ctx.fillStyle = '#334155';
      ctx.fillRect(carriageX - 5, 48, 10, 160);
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 1;
      ctx.strokeRect(carriageX - 5, 48, 10, 160);

      // Water surface waves
      waveOffsetRef.current += velocity * 0.035;
      const waveY = 140;
      ctx.beginPath();
      ctx.moveTo(0, waveY);
      for (let x = 0; x <= w; x += 10) {
        const y = waveY + Math.sin(x * 0.02 + waveOffsetRef.current) * (3.5 + velocity * 0.6)
                        + Math.cos(x * 0.04 - waveOffsetRef.current * 0.8) * 2;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 140, 255, 0.12)';
      ctx.fill();

      // Wave crest line
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.6)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(0, waveY);
      for (let x = 0; x <= w; x += 10) {
        const y = waveY + Math.sin(x * 0.02 + waveOffsetRef.current) * (3.5 + velocity * 0.6)
                        + Math.cos(x * 0.04 - waveOffsetRef.current * 0.8) * 2;
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Scale Model Body (Hydrofoil / Submerged Test Body)
      const modelY = 208;
      ctx.save();
      ctx.translate(carriageX, modelY);

      // Hydrofoil profile
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-90, 0);
      ctx.bezierCurveTo(-40, -28, 40, -24, 110, 0);
      ctx.bezierCurveTo(40, 16, -40, 18, -90, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Propeller or tail rotor
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      const propSpin = waveOffsetRef.current * 4;
      ctx.beginPath();
      ctx.moveTo(110, -Math.sin(propSpin) * 18);
      ctx.lineTo(110, Math.sin(propSpin) * 18);
      ctx.stroke();

      // Cavitation bubble plume if cavitationNum < 0.75
      if (cavitationNum < 0.75) {
        const bubbleCount = Math.round((0.8 - cavitationNum) * 25);
        for (let b = 0; b < bubbleCount; b++) {
          const bx = 110 + (b * 6) + Math.random() * 10;
          const by = (Math.random() - 0.5) * 22;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
          ctx.beginPath();
          ctx.arc(bx, by, 1.5 + Math.random() * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();

      // Particle streamlines moving across
      ctx.fillStyle = 'rgba(0, 229, 255, 0.45)';
      particles.forEach((p) => {
        p.x -= p.speed * (velocity * 0.8);
        if (p.x < 0) p.x = w;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Laser measurement grid HUD line
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(carriageX + 110, 50);
      ctx.lineTo(carriageX + 110, h - 30);
      ctx.stroke();
      ctx.setLineDash([]);

      // Laser telemetry indicator
      ctx.fillStyle = '#ef4444';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText('OPTICAL PIV LASER PROBE', carriageX + 118, 70);

      // HUD Metrics overlay
      ctx.fillStyle = '#00e5ff';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText(`TOW SPEED: ${velocity.toFixed(2)} m/s | FNF: ${(velocity / Math.sqrt(9.81 * 2.5)).toFixed(3)}`, 20, 75);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`CAVITATION INCEPTION σ: ${cavitationNum.toFixed(2)} | SCALE: 1:${scaleRatio}`, 20, 93);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [velocity, scaleRatio, cavitationNum, waterTemp]);

  return (
    <section id="experimental-testing" className="relative py-20 bg-bg-primary overflow-hidden border-t border-border-subtle">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <div className="px-3.5 py-1.5 border border-brand-cyan/40 rounded-sm bg-brand-cyan/10">
                <span className="font-mono text-xs font-bold text-brand-cyan tracking-[0.2em] uppercase">
                  ENGINEERING SERVICE 03
                </span>
              </div>
              <div className="px-3 py-1.5 border border-border-subtle rounded-sm bg-bg-card">
                <span className="font-mono text-xs text-slate-300 font-medium">
                  TOWING TANK &amp; WATER FLUME RIGS
                </span>
              </div>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              EXPERIMENTAL MODEL TESTING &amp; <span className="text-gradient-cyan">VALIDATION</span>
            </h2>
            <p className="text-slate-300 text-lg max-w-3xl font-normal mt-2 leading-relaxed">
              Scale-model testing, hydrodynamic testing, resistance and propulsion tests, cavitation testing, thermal testing, performance characterization, instrumentation, and CFD–experimental validation.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={handleAcquire}
              disabled={isAcquiring}
              className="btn-primary flex items-center gap-2.5 px-6 py-3.5 rounded-sm text-sm font-bold tracking-wider uppercase"
            >
              {isAcquiring ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ACQUIRING EXPERIMENTAL RUN...
                </>
              ) : (
                <>
                  <Play size={16} />
                  ACQUIRE EXPERIMENTAL RUN
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
                HYDRODYNAMIC TOWING TANK &amp; CAVITATION TUNNEL RIG
              </span>
            </div>

            <div className="flex items-center gap-6">
              {hasChanges && (
                <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded">
                  <span className="font-mono text-xs font-bold text-amber-400">
                    TEST RIG MODIFIED — CLICK 'ACQUIRE EXPERIMENTAL RUN'
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <div className="status-dot status-dot-cyan" />
                <span className="font-mono text-xs font-bold text-emerald-400">PIV TELEMETRY ONLINE</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            
            {/* Left Column: Interactive Rig Parameters (3 cols) */}
            <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-border-subtle bg-bg-card/90 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-border-subtle">
                  <Sliders size={16} className="text-brand-cyan" />
                  <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">
                    INTERACTIVE RIG PARAMETERS
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Towing Velocity */}
                  <div>
                    <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                      <span>Towing / Flow Speed (u):</span>
                      <span className="font-bold text-brand-cyan">{velocity.toFixed(2)} m/s</span>
                    </div>
                    <input
                      type="range" min="0.5" max="10.0" step="0.1"
                      value={velocity}
                      onChange={(e) => {
                        setVelocity(parseFloat(e.target.value));
                        setHasChanges(true);
                      }}
                      className="w-full"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                      <span>0.5 m/s (Creep)</span>
                      <span>10.0 m/s (High-Speed Run)</span>
                    </div>
                  </div>

                  {/* Scale Ratio */}
                  <div>
                    <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                      <span>Model Scale Factor (λ):</span>
                      <span className="font-bold text-brand-cyan">1:{scaleRatio}</span>
                    </div>
                    <input
                      type="range" min="10" max="50" step="5"
                      value={scaleRatio}
                      onChange={(e) => {
                        setScaleRatio(parseInt(e.target.value));
                        setHasChanges(true);
                      }}
                      className="w-full"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                      <span>1:10 (Large Basin)</span>
                      <span>1:50 (Compact Tunnel)</span>
                    </div>
                  </div>

                  {/* Cavitation Number */}
                  <div>
                    <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                      <span>Cavitation Number (σ):</span>
                      <span className={`font-bold ${cavitationNum < 0.75 ? 'text-amber-400' : 'text-brand-cyan'}`}>
                        {cavitationNum.toFixed(2)} {cavitationNum < 0.75 && '⚠ Plume'}
                      </span>
                    </div>
                    <input
                      type="range" min="0.25" max="1.60" step="0.05"
                      value={cavitationNum}
                      onChange={(e) => {
                        setCavitationNum(parseFloat(e.target.value));
                        setHasChanges(true);
                      }}
                      className="w-full"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                      <span className="text-amber-400">0.25 (Supercavitation)</span>
                      <span>1.60 (Subcritical)</span>
                    </div>
                  </div>

                  {/* Water Temperature */}
                  <div>
                    <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                      <span>Water Flume Temp (T):</span>
                      <span className="font-bold text-brand-cyan">{waterTemp} °C</span>
                    </div>
                    <input
                      type="range" min="10" max="35" step="1"
                      value={waterTemp}
                      onChange={(e) => {
                        setWaterTemp(parseInt(e.target.value));
                        setHasChanges(true);
                      }}
                      className="w-full"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                      <span>10 °C</span>
                      <span>35 °C</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Protocol presets */}
              <div className="pt-4 border-t border-border-subtle mt-4">
                <span className="text-[11px] font-mono text-slate-400 block mb-2">TEST RIG CONFIGURATIONS:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setVelocity(2.4);
                      setCavitationNum(1.20);
                      setScaleRatio(30);
                      setHasChanges(true);
                    }}
                    className="px-2.5 py-1.5 rounded text-[11px] font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 border border-border-subtle hover:border-brand-cyan/40 transition text-center"
                  >
                    Smooth Water ITTC
                  </button>
                  <button
                    onClick={() => {
                      setVelocity(8.5);
                      setCavitationNum(0.45);
                      setScaleRatio(15);
                      setHasChanges(true);
                    }}
                    className="px-2.5 py-1.5 rounded text-[11px] font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 border border-border-subtle hover:border-brand-cyan/40 transition text-center"
                  >
                    High-Speed Cavitation
                  </button>
                </div>
              </div>
            </div>

            {/* Center Viewport: Single Towing Tank Simulation Visualization (6 cols) */}
            <div className="lg:col-span-6 relative border-b lg:border-b-0 lg:border-r border-border-subtle bg-bg-primary flex flex-col">
              
              {/* Telemetry Tag */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <div className="px-3 py-1.5 rounded text-xs font-mono font-bold bg-slate-900/90 text-brand-cyan border border-brand-cyan/40 shadow">
                  TOWING CARRIAGE PIV SENSOR CANVASS
                </div>
              </div>

              {/* Viewport Canvas */}
              <div className="flex-1 w-full h-[460px] lg:h-full relative min-h-[460px] bg-slate-950 flex items-center justify-center overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full block" />
              </div>

              {/* Bottom HUD Bar */}
              <div className="border-t border-border-subtle bg-bg-card/95 px-5 py-3 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="font-mono text-xs text-slate-400 block">DAQ SAMPLING</span>
                    <span className="font-mono text-sm font-bold text-brand-cyan">{samplingRate} kHz PIV</span>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-slate-400 block">CFD-EXP ERROR</span>
                    <span className="font-mono text-sm font-bold text-emerald-400">&lt; 0.8% RMS</span>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-slate-400 block">STANDARDS</span>
                    <span className="font-mono text-sm font-bold text-white">ITTC 7.5-02</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-cyan" />
                  <span className="font-mono text-xs font-semibold text-slate-200">BASIN CALIBRATED</span>
                </div>
              </div>
            </div>

            {/* Right Column: Solved Experimental Results (3 cols) */}
            <div className="lg:col-span-3 bg-bg-card flex flex-col p-5">
              <div className="pb-3 border-b border-border-subtle flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">
                  SOLVED NUMERICAL RESULTS
                </span>
                <span className={`px-2 py-0.5 font-mono text-[11px] font-bold rounded ${hasChanges ? 'bg-amber-500/20 text-amber-400' : 'bg-brand-cyan/20 text-brand-cyan'}`}>
                  {hasChanges ? 'PENDING RUN' : 'ACQUIRED'}
                </span>
              </div>

              {hasChanges && (
                <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded text-xs font-mono text-amber-300 leading-relaxed">
                  Rig settings changed. Click <strong>ACQUIRE EXPERIMENTAL RUN</strong> to compute updated hydrodynamic telemetry!
                </div>
              )}

              <div className="py-4 space-y-3.5 flex-1">
                <div className="p-3.5 rounded bg-bg-secondary border border-border-subtle">
                  <div className="text-xs font-mono text-slate-400">Total Hydrodynamic Resistance (Rt)</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold mt-1 text-brand-cyan">
                    {solvedData.resistance} N
                  </div>
                </div>

                <div className="p-3.5 rounded bg-bg-secondary border border-border-subtle">
                  <div className="text-xs font-mono text-slate-400">Cavitation Inception Margin</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold mt-1 text-emerald-400">
                    {solvedData.cavitationMargin}
                  </div>
                </div>

                <div className="p-3.5 rounded bg-bg-secondary border border-border-subtle">
                  <div className="text-xs font-mono text-slate-400">Thrust Deduction Factor (1 - t)</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold mt-1 text-white">
                    {solvedData.thrustFactor}
                  </div>
                </div>

                <div className="p-3.5 rounded bg-bg-secondary border border-border-subtle">
                  <div className="text-xs font-mono text-slate-400">CFD-to-Experimental Correlation</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold mt-1 text-emerald-400">
                    {solvedData.correlation} %
                  </div>
                </div>

                <div className="p-3.5 rounded bg-bg-secondary border border-border-subtle">
                  <div className="text-xs font-mono text-slate-400">Acoustic Hydrophone Noise RMS</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold mt-1 text-brand-blue">
                    {solvedData.sensorRms} kPa
                  </div>
                </div>
              </div>

              <button
                onClick={handleAcquire}
                disabled={isAcquiring}
                className="mt-auto w-full btn-primary py-3 rounded-sm font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <Play size={14} />
                ACQUIRE EXPERIMENTAL RUN
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
