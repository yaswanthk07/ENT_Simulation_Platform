import { useState, useEffect, useRef } from 'react';
import { Sliders, RotateCcw, Play, CheckCircle2, ShieldCheck, Gauge, Award, Layers, Terminal } from 'lucide-react';

const CAPABILITIES = [
  'Engineering consultancy',
  'Feasibility studies',
  'Technology assessment',
  'Troubleshooting',
  'R&D support',
  'Technology development',
  'Prototype development',
  'Failure/root-cause analysis',
  'Technology-readiness assessment',
];

export default function AdvancedConsultancySection() {
  const [targetTrl, setTargetTrl] = useState(7);
  const [fatigueCycles, setFatigueCycles] = useState(1.4); // x 10^6
  const [defectSize, setDefectSize] = useState(0.8); // mm
  const [thermalGradient, setThermalGradient] = useState(240); // deg C
  const [severityClass, setSeverityClass] = useState<'nominal' | 'elevated' | 'critical'>('nominal');
  const [isSolving, setIsSolving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Solved metrics
  const [solvedData, setSolvedData] = useState({
    trlStage: 'TRL 7 · SYSTEM PROTOTYPE',
    criticality: 'CLASS-I (LOW RISK)',
    rulHours: '48,200 hrs',
    confidence: 97.8,
    failureProb: '0.003 %',
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const phaseRef = useRef<number>(0);

  const calculateResults = (trl: number, cycles: number, defect: number, therm: number) => {
    const trlLabels: Record<number, string> = {
      3: 'TRL 3 · PROOF OF CONCEPT',
      4: 'TRL 4 · LAB VALIDATION',
      5: 'TRL 5 · RELEVANT RIG',
      6: 'TRL 6 · SUB-SCALE DEMO',
      7: 'TRL 7 · SYSTEM PROTOTYPE',
      8: 'TRL 8 · FLIGHT QUALIFIED',
      9: 'TRL 9 · MISSION PROVEN',
    };

    const riskScore = (defect * 1.5) + (cycles * 0.4) + (therm / 300);
    const crit = riskScore > 3.0 ? 'CLASS-III (CRITICAL)' : riskScore > 1.8 ? 'CLASS-II (ELEVATED)' : 'CLASS-I (LOW RISK)';
    const rul = Math.max(1200, Math.round(75000 - (cycles * 18000) - (defect * 8000))).toLocaleString();
    const conf = Math.min(99.4, 94.0 + (trl * 0.7) - (defect * 1.2)).toFixed(1);
    const failP = (Math.max(0.001, (defect * 0.015) + (cycles * 0.004))).toFixed(3);

    return {
      trlStage: trlLabels[trl] || `TRL ${trl} · EVALUATION`,
      criticality: crit,
      rulHours: `${rul} hrs`,
      confidence: parseFloat(conf),
      failureProb: `${failP} %`,
    };
  };

  const handleRunDiagnostic = () => {
    setIsSolving(true);
    setTimeout(() => {
      setSolvedData(calculateResults(targetTrl, fatigueCycles, defectSize, thermalGradient));
      setHasChanges(false);
      setIsSolving(false);
    }, 600);
  };

  const handleReset = () => {
    setTargetTrl(7);
    setFatigueCycles(1.4);
    setDefectSize(0.8);
    setThermalGradient(240);
    setSolvedData(calculateResults(7, 1.4, 0.8, 240));
    setHasChanges(false);
  };

  // Canvas visual loop: Acoustic Emission Waveform & Fault-Tree Radar
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

      // Dark oscilloscope background
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.06)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      phaseRef.current += 0.04;
      const t = phaseRef.current;

      // 1. TRL Progress Pipeline Arc / Radar in Left Half
      const radarCx = w * 0.28;
      const radarCy = h * 0.52;
      const radarR = 90;

      // Radar rings
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.2)';
      ctx.lineWidth = 1;
      for (let r = 25; r <= radarR; r += 25) {
        ctx.beginPath();
        ctx.arc(radarCx, radarCy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Radar sweep line
      const sweepAngle = t * 0.8;
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.8)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(radarCx, radarCy);
      ctx.lineTo(radarCx + Math.cos(sweepAngle) * radarR, radarCy + Math.sin(sweepAngle) * radarR);
      ctx.stroke();

      // TRL Stage Markers around circle
      for (let i = 1; i <= 9; i++) {
        const theta = ((i - 1) / 9) * Math.PI * 2 - Math.PI / 2;
        const x = radarCx + Math.cos(theta) * (radarR + 14);
        const y = radarCy + Math.sin(theta) * (radarR + 14);
        const isReached = i <= targetTrl;
        ctx.fillStyle = isReached ? '#00e5ff' : '#475569';
        ctx.beginPath();
        ctx.arc(x, y, isReached ? 4 : 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = '9px JetBrains Mono, monospace';
        ctx.fillText(`T${i}`, x - 5, y + 12);
      }

      ctx.fillStyle = '#00e5ff';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText('TRL MATURITY RADAR', radarCx - 50, radarCy + radarR + 32);

      // 2. Ultrasonic Acoustic Emission Fracture Mechanics Waveform in Right Half
      const waveStartX = w * 0.54;
      const waveW = w * 0.42;
      const waveCy = h * 0.52;

      // Axis
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
      ctx.beginPath();
      ctx.moveTo(waveStartX, waveCy);
      ctx.lineTo(waveStartX + waveW, waveCy);
      ctx.stroke();

      // Waveform
      ctx.beginPath();
      ctx.strokeStyle = defectSize > 1.5 ? '#ef4444' : defectSize > 0.8 ? '#facc15' : '#00e5ff';
      ctx.lineWidth = 2;
      for (let x = 0; x < waveW; x += 3) {
        const normX = x / waveW;
        // Enveloped high-frequency acoustic wave with crack pulse
        const envelope = Math.sin(normX * Math.PI) * (30 + defectSize * 18);
        const pulse = Math.sin(normX * 36 - t * 4) * envelope;
        const py = waveCy - pulse;
        if (x === 0) ctx.moveTo(waveStartX + x, py);
        else ctx.lineTo(waveStartX + x, py);
      }
      ctx.stroke();

      // Defect Threshold Scanline
      const threshY = waveCy - (defectSize * 25);
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(waveStartX, threshY);
      ctx.lineTo(waveStartX + waveW, threshY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#ef4444';
      ctx.font = '9px JetBrains Mono, monospace';
      ctx.fillText(`FRACTURE THRESHOLD: ${(defectSize * 1.8).toFixed(2)} MPa√m`, waveStartX, threshY - 6);

      // HUD Header
      ctx.fillStyle = '#00e5ff';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText(`ULTRASONIC ACOUSTIC SPECTRUM: ${fatigueCycles.toFixed(1)}M CYCLES`, 20, 30);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`ROOT-CAUSE FAULT TREE SCAN: ACTIVE | THERMAL SHOCK: ΔT ${thermalGradient}°C`, 20, 48);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [targetTrl, fatigueCycles, defectSize, thermalGradient]);

  return (
    <section id="advanced-consultancy" className="relative py-20 bg-bg-secondary overflow-hidden border-t border-border-subtle">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <div className="px-3.5 py-1.5 border border-brand-cyan/40 rounded-sm bg-brand-cyan/10">
                <span className="font-mono text-xs font-bold text-brand-cyan tracking-[0.2em] uppercase">
                  ENGINEERING SERVICE 04
                </span>
              </div>
              <div className="px-3 py-1.5 border border-border-subtle rounded-sm bg-bg-card">
                <span className="font-mono text-xs text-slate-300 font-medium">
                  R&amp;D TECHNOLOGY &amp; ROOT-CAUSE ANALYSIS
                </span>
              </div>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              ADVANCED ENGINEERING CONSULTANCY &amp; <span className="text-gradient-cyan">TECHNOLOGY</span>
            </h2>
            <p className="text-slate-300 text-lg max-w-3xl font-normal mt-2 leading-relaxed">
              Development Engineering consultancy, feasibility studies, technology assessment, troubleshooting, R&amp;D support, technology development, prototype development, failure/root-cause analysis, and technology-readiness assessment.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={handleRunDiagnostic}
              disabled={isSolving}
              className="btn-primary flex items-center gap-2.5 px-6 py-3.5 rounded-sm text-sm font-bold tracking-wider uppercase"
            >
              {isSolving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  DIAGNOSING FAULT MATRIX...
                </>
              ) : (
                <>
                  <Play size={16} />
                  RUN DIAGNOSTIC SOLVER
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
                ROOT-CAUSE FAILURE &amp; TRL DIAGNOSTIC ENGINE
              </span>
            </div>

            <div className="flex items-center gap-6">
              {hasChanges && (
                <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded">
                  <span className="font-mono text-xs font-bold text-amber-400">
                    DIAGNOSTIC CRITERIA CHANGED — CLICK 'RUN DIAGNOSTIC SOLVER'
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <div className="status-dot status-dot-cyan" />
                <span className="font-mono text-xs font-bold text-emerald-400">EXPERT CONSULTANCY ARMED</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            
            {/* Left Column: Interactive Consultancy Parameters (3 cols) */}
            <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-border-subtle bg-bg-card/90 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-border-subtle">
                  <Sliders size={16} className="text-brand-cyan" />
                  <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">
                    INTERACTIVE INPUT PARAMETERS
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Target TRL Level */}
                  <div>
                    <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                      <span>Target Readiness Level:</span>
                      <span className="font-bold text-brand-cyan">TRL {targetTrl}</span>
                    </div>
                    <input
                      type="range" min="3" max="9" step="1"
                      value={targetTrl}
                      onChange={(e) => {
                        setTargetTrl(parseInt(e.target.value));
                        setHasChanges(true);
                      }}
                      className="w-full"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                      <span>TRL 3 (PoC)</span>
                      <span>TRL 9 (Mission Proven)</span>
                    </div>
                  </div>

                  {/* Fatigue Stress Cycles */}
                  <div>
                    <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                      <span>Fatigue Cycles (N):</span>
                      <span className="font-bold text-brand-cyan">{fatigueCycles.toFixed(1)} × 10⁶</span>
                    </div>
                    <input
                      type="range" min="0.2" max="5.0" step="0.2"
                      value={fatigueCycles}
                      onChange={(e) => {
                        setFatigueCycles(parseFloat(e.target.value));
                        setHasChanges(true);
                      }}
                      className="w-full"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                      <span>0.2M (Initial)</span>
                      <span>5.0M (High Endurance)</span>
                    </div>
                  </div>

                  {/* Defect Severity */}
                  <div>
                    <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                      <span>Micro-Defect Size (a₀):</span>
                      <span className={`font-bold ${defectSize > 1.5 ? 'text-red-400' : defectSize > 0.8 ? 'text-amber-400' : 'text-brand-cyan'}`}>
                        {defectSize.toFixed(1)} mm
                      </span>
                    </div>
                    <input
                      type="range" min="0.1" max="3.0" step="0.1"
                      value={defectSize}
                      onChange={(e) => {
                        setDefectSize(parseFloat(e.target.value));
                        setHasChanges(true);
                      }}
                      className="w-full"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                      <span>0.1 mm (Incipient)</span>
                      <span className="text-red-400">3.0 mm (Flaw)</span>
                    </div>
                  </div>

                  {/* Thermal Gradient */}
                  <div>
                    <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                      <span>Thermal Gradient (ΔT):</span>
                      <span className="font-bold text-brand-cyan">{thermalGradient} °C</span>
                    </div>
                    <input
                      type="range" min="50" max="600" step="25"
                      value={thermalGradient}
                      onChange={(e) => {
                        setThermalGradient(parseInt(e.target.value));
                        setHasChanges(true);
                      }}
                      className="w-full"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                      <span>50 °C</span>
                      <span>600 °C (Severe Shock)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultancy Presets */}
              <div className="pt-4 border-t border-border-subtle mt-4">
                <span className="text-[11px] font-mono text-slate-400 block mb-2">ASSESSMENT CASE STUDIES:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setTargetTrl(5);
                      setFatigueCycles(0.6);
                      setDefectSize(0.3);
                      setThermalGradient(120);
                      setHasChanges(true);
                    }}
                    className="px-2.5 py-1.5 rounded text-[11px] font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 border border-border-subtle hover:border-brand-cyan/40 transition text-center"
                  >
                    Feasibility PoC
                  </button>
                  <button
                    onClick={() => {
                      setTargetTrl(9);
                      setFatigueCycles(3.8);
                      setDefectSize(1.9);
                      setThermalGradient(480);
                      setHasChanges(true);
                    }}
                    className="px-2.5 py-1.5 rounded text-[11px] font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 border border-border-subtle hover:border-brand-cyan/40 transition text-center"
                  >
                    Failure Root-Cause
                  </button>
                </div>
              </div>
            </div>

            {/* Center Viewport: Diagnostic Waveform & Radar (6 cols) */}
            <div className="lg:col-span-6 relative border-b lg:border-b-0 lg:border-r border-border-subtle bg-bg-primary flex flex-col">
              
              {/* Telemetry Tag */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <div className="px-3 py-1.5 rounded text-xs font-mono font-bold bg-slate-900/90 text-brand-cyan border border-brand-cyan/40 shadow">
                  ULTRASONIC ACOUSTIC &amp; TRL RADAR CANVASS
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
                    <span className="font-mono text-xs text-slate-400 block">STANDARDS</span>
                    <span className="font-mono text-sm font-bold text-brand-cyan">ISO 18436 · ASTM E1067</span>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-slate-400 block">REACHABILITY</span>
                    <span className="font-mono text-sm font-bold text-emerald-400">99.4% FEASIBLE</span>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-slate-400 block">CONSULTING LAB</span>
                    <span className="font-mono text-sm font-bold text-white">NEXUS ADVISORY</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-cyan" />
                  <span className="font-mono text-xs font-semibold text-slate-200">ASSESSMENT CONVERGED</span>
                </div>
              </div>
            </div>

            {/* Right Column: Solved Consultancy Results (3 cols) */}
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
                  Criteria modified. Click <strong>RUN DIAGNOSTIC SOLVER</strong> to update the feasibility and root-cause analysis!
                </div>
              )}

              <div className="py-4 space-y-3.5 flex-1">
                <div className="p-3.5 rounded bg-bg-secondary border border-border-subtle">
                  <div className="text-xs font-mono text-slate-400">Technology Readiness Level</div>
                  <div className="text-lg sm:text-xl font-mono font-bold mt-1 text-brand-cyan">
                    {solvedData.trlStage}
                  </div>
                </div>

                <div className="p-3.5 rounded bg-bg-secondary border border-border-subtle">
                  <div className="text-xs font-mono text-slate-400">Root-Cause Criticality Index</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold mt-1 text-emerald-400">
                    {solvedData.criticality}
                  </div>
                </div>

                <div className="p-3.5 rounded bg-bg-secondary border border-border-subtle">
                  <div className="text-xs font-mono text-slate-400">Remaining Useful Life (RUL)</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold mt-1 text-white">
                    {solvedData.rulHours}
                  </div>
                </div>

                <div className="p-3.5 rounded bg-bg-secondary border border-border-subtle">
                  <div className="text-xs font-mono text-slate-400">Feasibility Confidence Factor</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold mt-1 text-emerald-400">
                    {solvedData.confidence} %
                  </div>
                </div>

                <div className="p-3.5 rounded bg-bg-secondary border border-border-subtle">
                  <div className="text-xs font-mono text-slate-400">Failure Risk Probability</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold mt-1 text-brand-blue">
                    {solvedData.failureProb}
                  </div>
                </div>
              </div>

              <button
                onClick={handleRunDiagnostic}
                disabled={isSolving}
                className="mt-auto w-full btn-primary py-3 rounded-sm font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <Play size={14} />
                RUN DIAGNOSTIC SOLVER
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
