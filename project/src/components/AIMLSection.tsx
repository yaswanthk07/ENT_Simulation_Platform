import { useEffect, useRef, useState } from 'react';
import { Brain, TrendingUp, Zap, Search } from 'lucide-react';

const pipeline = [
  { id: 'params', label: 'ENGINEERING GEOMETRY & PARAMETERS' },
  { id: 'sim', label: 'QUANTUM & CLASSICAL SIMULATION' },
  { id: 'ml', label: 'NEURAL OPERATOR / SURROGATE' },
  { id: 'pred', label: 'INSTANTANEOUS PREDICTION' },
  { id: 'opt', label: 'MULTI-OBJECTIVE OPTIMIZATION' },
  { id: 'design', label: 'OPTIMAL AERODYNAMIC DESIGN' },
];

const capabilities = [
  { icon: Brain, label: 'Deep Neural Surrogates', desc: 'Fourier neural operators providing 1,000× faster physics field approximations.' },
  { icon: Zap, label: 'Convergence Acceleration', desc: 'Machine learning preconditioners accelerating sparse Navier-Stokes solvers.' },
  { icon: TrendingUp, label: 'Physics-Informed ML (PINNs)', desc: 'Embedding Navier-Stokes and elastodynamics equations directly into loss functions.' },
  { icon: Search, label: 'Design Space Exploration', desc: 'Intelligent active learning navigating multi-dimensional airfoil and structural spaces.' },
];

function computeOutputs(v: number, p: number, t: number) {
  const efficiency = Math.min(99, 70 + v * 0.08 - Math.abs(p - 100) * 0.1 - (t - 298) * 0.03);
  const drag = 0.28 + (v / 300) * 0.15 - (p - 100) * 0.001;
  const stress = 120 + v * 0.8 + (t - 298) * 0.4;
  const massFlow = ((v * p * 1.18) / (287 * t)) * 100;
  return {
    efficiency: Math.max(50, Math.min(99, efficiency)).toFixed(1),
    drag: Math.max(0.18, drag).toFixed(3),
    stress: Math.round(Math.max(100, stress)),
    massFlow: Math.max(1, massFlow).toFixed(2),
  };
}

export default function AIMLSection() {
  const [visible, setVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [params, setParams] = useState({ v: 160, p: 101, t: 298 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % pipeline.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const outputs = computeOutputs(params.v, params.p, params.t);

  return (
    <section id="ai-/-ml" ref={sectionRef} className="relative py-24 bg-bg-secondary overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(0,229,255,0.06)_0%,transparent_60%)]" />

      {/* Reduced margins: max-w-[1520px] */}
      <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with larger fonts */}
        <div className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block px-4 py-1.5 border border-brand-cyan/30 rounded-sm bg-brand-cyan/10 mb-4">
            <span className="font-mono text-xs font-bold text-brand-cyan tracking-[0.2em] uppercase">
              AI / ML ACCELERATION
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
            NEURAL SURROGATE <span className="text-gradient-cyan">INTELLIGENCE LAYER</span>
          </h2>
          <p className="text-slate-200 text-lg sm:text-xl max-w-3xl font-normal leading-relaxed">
            Machine learning and neural operators augmenting high-fidelity simulation workflows through rapid surrogate physics models and active learning.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Pipeline + Capabilities (6 cols) */}
          <div className={`lg:col-span-6 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            
            {/* Animated pipeline */}
            <div className="glass-panel rounded-sm p-6 mb-6 relative border border-border-subtle shadow-xl">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-cyan" />
              <div className="font-mono text-xs font-bold text-brand-cyan tracking-[0.2em] mb-5 uppercase">
                AI PHYSICS COMPUTE PIPELINE
              </div>
              
              <div className="space-y-2">
                {pipeline.map((step, i) => {
                  const isActive = activeStep === i;
                  const isPast = activeStep > i;
                  return (
                    <div key={step.id}>
                      <div
                        className={`flex items-center gap-3.5 px-4 py-3 rounded-sm transition-all duration-400 ${
                          isActive 
                            ? 'bg-brand-cyan/15 border-2 border-brand-cyan shadow-[0_0_15px_rgba(0,229,255,0.2)]' 
                            : 'border border-transparent'
                        }`}
                      >
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0 transition-all duration-400"
                          style={{
                            background: isActive ? '#00E5FF' : isPast ? 'rgba(0,229,255,0.6)' : 'rgba(255,255,255,0.2)',
                            boxShadow: isActive ? '0 0 10px #00E5FF' : 'none',
                          }}
                        />
                        <span className={`font-mono text-xs sm:text-sm font-bold tracking-wider transition-colors duration-400 ${
                          isActive ? 'text-white' : isPast ? 'text-slate-300' : 'text-slate-500'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                      {i < pipeline.length - 1 && (
                        <div 
                          className="ml-5 w-0.5 h-3 transition-colors duration-400"
                          style={{ background: isPast ? '#00E5FF' : 'rgba(255,255,255,0.1)' }} 
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Capabilities grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {capabilities.map((cap) => {
                const Icon = cap.icon;
                return (
                  <div key={cap.label} className="glass-panel rounded-sm p-5 border border-border-subtle hover:border-brand-cyan/40 transition-all duration-300">
                    <Icon size={22} className="text-brand-cyan mb-3" />
                    <div className="font-bold text-white text-base mb-1.5">{cap.label}</div>
                    <div className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">{cap.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Interactive parameter demo (6 cols) */}
          <div className={`lg:col-span-6 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="glass-panel rounded-sm p-6 sm:p-7 relative border border-brand-cyan/30 shadow-2xl">
              <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-brand-cyan" />
              
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-border-subtle">
                <span className="font-mono text-xs font-bold text-brand-cyan tracking-[0.2em] uppercase">
                  LIVE SURROGATE PARAMETER INFERENCE
                </span>
                <span className="font-mono text-xs text-brand-blue font-bold px-2 py-0.5 rounded bg-brand-blue/10 border border-brand-blue/30">
                  REAL-TIME ML INFERENCE
                </span>
              </div>

              {/* Sliders with legible typography */}
              <div className="space-y-6 mb-8">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-xs sm:text-sm text-slate-300 font-semibold">Inflow Airspeed (Velocity)</span>
                    <span className="font-mono text-sm sm:text-base text-brand-cyan font-bold">{params.v} m/s</span>
                  </div>
                  <input
                    type="range" min={60} max={300} value={params.v}
                    onChange={(e) => setParams((pr) => ({ ...pr, v: +e.target.value }))}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-1 text-[11px] font-mono text-slate-500">
                    <span>60 m/s</span>
                    <span>300 m/s</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-xs sm:text-sm text-slate-300 font-semibold">Static Ambient Pressure</span>
                    <span className="font-mono text-sm sm:text-base text-brand-cyan font-bold">{params.p} kPa</span>
                  </div>
                  <input
                    type="range" min={80} max={200} value={params.p}
                    onChange={(e) => setParams((pr) => ({ ...pr, p: +e.target.value }))}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-1 text-[11px] font-mono text-slate-500">
                    <span>80 kPa</span>
                    <span>200 kPa</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-xs sm:text-sm text-slate-300 font-semibold">Boundary Temperature</span>
                    <span className="font-mono text-sm sm:text-base text-brand-cyan font-bold">{params.t} K</span>
                  </div>
                  <input
                    type="range" min={200} max={800} value={params.t}
                    onChange={(e) => setParams((pr) => ({ ...pr, t: +e.target.value }))}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-1 text-[11px] font-mono text-slate-500">
                    <span>200 K (-73°C)</span>
                    <span>800 K (527°C)</span>
                  </div>
                </div>
              </div>

              {/* AI Prediction Output with clear cards */}
              <div className="border-t border-border-subtle pt-6">
                <div className="font-mono text-xs font-bold text-white tracking-[0.15em] mb-4 uppercase">
                  SURROGATE MODEL INSTANTANEOUS INFERENCE
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Aerodynamic Efficiency', value: `${outputs.efficiency}%`, color: 'text-brand-cyan' },
                    { label: 'Predicted Drag Coeff', value: outputs.drag, color: 'text-white' },
                    { label: 'Peak Von Mises Stress', value: `${outputs.stress} MPa`, color: 'text-brand-blue' },
                    { label: 'Estimated Mass Flow', value: `${outputs.massFlow} kg/s`, color: 'text-emerald-400' },
                  ].map((out) => (
                    <div key={out.label} className="bg-bg-surface rounded-sm p-4 border border-border-subtle">
                      <div className="font-mono text-xs text-slate-300 mb-1">{out.label}</div>
                      <div className={`font-mono text-xl sm:text-2xl font-black ${out.color}`}>{out.value}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
