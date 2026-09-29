import { useEffect, useRef, useState, useMemo } from 'react';
import { 
  Play, RotateCcw, ChevronRight, Wind, Activity, Volume2, 
  Thermometer, Layers, Settings, GitMerge, CheckCircle2, 
  AlertCircle, Sliders, Video, Eye, Waves
} from 'lucide-react';

export type SimDomain = 
  | 'cfd'
  | 'thermal'
  | 'stress'
  | 'structural'
  | 'modal'
  | 'heat'
  | 'multiphysics'
  | 'optimization'
  | 'fea'
  | 'nvh';

interface SimModuleDef {
  id: SimDomain;
  label: string;
  icon: React.ElementType;
  badge: string;
}

const SIM_MODULES: SimModuleDef[] = [
  { id: 'cfd', label: 'CFD & FLOW', icon: Wind, badge: 'AERODYNAMICS' },
  { id: 'thermal', label: 'THERMAL FLUID ANALYSIS', icon: Thermometer, badge: 'GRADIENTS' },
  { id: 'stress', label: 'MULTI PHASE FLOW', icon: Waves, badge: 'EULER-EULER' },
  { id: 'structural', label: 'STRUCTURAL FEA', icon: Layers, badge: 'DEFLECTION' },
];

// Helper calculations for each domain
function computeDomainResults(domain: SimDomain, p: any) {
  switch (domain) {
    case 'cfd': {
      const isStalled = p.aoa > 13;
      const cl = isStalled ? Math.max(0.18, 0.42 + (18 - p.aoa) * 0.02) : (p.aoa + 2.5) * 0.108;
      const cd = isStalled ? 0.24 + (p.aoa - 13) * 0.035 : 0.009 + 0.038 * Math.pow(cl, 2);
      const ld = (cl / Math.max(0.005, cd)).toFixed(1);
      const q = (0.5 * 1.225 * Math.pow(p.airspeed, 2)) / 1000;
      return [
        { label: 'Lift Coefficient (CL)', value: cl.toFixed(3), color: isStalled ? 'text-amber-400' : 'text-brand-cyan' },
        { label: 'Drag Coefficient (CD)', value: cd.toFixed(4), color: isStalled ? 'text-red-400' : 'text-white' },
        { label: 'Lift-to-Drag Ratio (L/D)', value: ld, color: 'text-emerald-400' },
        { label: 'Dynamic Pressure (q)', value: `${q.toFixed(1)} kPa`, color: 'text-brand-blue' },
        { label: 'Boundary Layer State', value: isStalled ? 'SEPARATED (STALL WAKE)' : 'ATTACHED LAMINAR', color: isStalled ? 'text-red-400' : 'text-brand-cyan' },
      ];
    }
    case 'thermal': {
      const uIn = p.uIn ?? 1.20;
      const qFlux = (p.heatFlux ?? 180) * 1000;
      const tIn = p.tempIn ?? 85.0;
      const re = Math.round(17583 * uIn);
      const nu = (0.023 * Math.pow(Math.max(100, re), 0.8) * Math.pow(14.7, 0.4) * 1.78).toFixed(1);
      const h = ((parseFloat(nu) * 0.41) / 0.03).toFixed(0);
      const twMax = (tIn + (qFlux / parseFloat(h))).toFixed(1);
      const mDot = 1055 * uIn * 0.02;
      const deltaT = ((qFlux * 0.12) / (mDot * 3350)).toFixed(1);
      const tOut = (tIn + parseFloat(deltaT)).toFixed(1);
      return [
        { label: 'Reynolds Number (Re)', value: re.toLocaleString(), color: 'text-brand-cyan' },
        { label: 'Avg. Nusselt Number (Nu)', value: nu, color: 'text-white' },
        { label: 'Convective Coeff (h)', value: `${parseInt(h).toLocaleString()} W/m²K`, color: 'text-emerald-400' },
        { label: 'Peak Wall Temp (Tw,max)', value: `${twMax} °C`, color: parseFloat(twMax) > 128 ? 'text-amber-400' : 'text-brand-cyan' },
        { label: 'Outlet Bulk Temp (Tout)', value: `${tOut} °C`, color: 'text-white' },
      ];
    }
    case 'stress': {
      const q = p.q ?? 0.05;
      const Do_mm = p.o ?? 10;
      const Do = Do_mm / 1000;
      const RL = 998, RG = 1.2, SG = 0.072, G = 9.81;
      const Eo = (G * (RL - RG) * Do * Do / SG).toFixed(2);
      const dT = Math.cbrt(6 * SG * Do / (G * (RL - RG)));
      const Q_m3s = q * Math.PI / 4 * Do * Do;
      const V = 1.378 * Math.pow(Q_m3s, 1.2) * Math.pow(G, -0.6);
      const dD = Math.cbrt(6 * V / Math.PI);
      const dForm = (Math.max(2e-3, Math.min(20e-3, Math.max(dT, dD))) * 1000).toFixed(1);
      const gasFlowLmin = (Q_m3s * 6e4).toFixed(2);
      const estHoldup = Math.min(35, Math.max(2, (q * 180 + (Do_mm / 10) * 1.5))).toFixed(1);
      return [
        { label: 'Inlet Gas Velocity (v_in)', value: `${q.toFixed(3)} m/s`, color: 'text-brand-cyan' },
        { label: 'Orifice Gas Flow Rate', value: `${gasFlowLmin} L/min`, color: 'text-emerald-400' },
        { label: 'Inlet Eötvös Number (Eo)', value: Eo, color: 'text-white' },
        { label: 'Bubble Formation d₀', value: `${dForm} mm`, color: 'text-brand-blue' },
        { label: 'Est. Mean Gas Holdup (α)', value: `${estHoldup} %`, color: 'text-amber-400' },
      ];
    }
    case 'structural': {
      const matKey = p.material || 'steel';
      const matMap: Record<string, { E: number; yield: number; behavior?: string }> = {
        steel: { E: 201, yield: 250, behavior: 'ductile' },
        aluminum: { E: 69, yield: 276, behavior: 'ductile' },
        titanium: { E: 114, yield: 880, behavior: 'high-strength' },
        concrete: { E: 30, yield: 35, behavior: 'brittle' },
        polymer: { E: 5, yield: 150, behavior: 'ductile' },
        custom: { E: 201, yield: 5000, behavior: 'ductile' },
      };
      const currentMat = matMap[matKey] || matMap.steel;
      const E_GPa = matKey === 'custom' ? (p.stiffness ?? 201) : (p.stiffness ?? currentMat.E);
      const E = E_GPa * 1e9;
      const yieldStrength = currentMat.yield * 1e6;
      const P = (p.load ?? 0) * 1000;
      const h = (p.thick ?? 150) / 1000;
      const posPct = (p.pos ?? 50) / 100;
      const beamWidth = 1.5;
      const L = 3.0;
      const I = (beamWidth * Math.pow(h, 3)) / 12;

      // Eccentric Point Load Calculations (a = dist from left, b_len = dist from right)
      const a = L * posPct;
      const b_len = L - a;

      // Max moment always occurs exactly under the load application point
      const maxMoment = (P * a * b_len) / L;

      // Deflection at the load point
      const maxDeflectionM = (I > 0 && E > 0) ? (P * Math.pow(a, 2) * Math.pow(b_len, 2)) / (3 * L * E * I) : 0;
      const maxDeflectionMM = maxDeflectionM * 1000;

      const maxStressPa = I > 0 ? (maxMoment * (h / 2)) / I : 0;
      const maxStressMPa = maxStressPa / 1e6;
      const isFractured = maxStressPa >= yieldStrength;
      const safetyFactor = maxStressPa > 0 ? yieldStrength / maxStressPa : Infinity;

      const deflDisplay = isFractured ? 'FRACTURED' : P === 0 ? '0.0 mm' : `${maxDeflectionMM.toFixed(2)} mm`;
      const stressDisplay = P === 0 ? '0.0 MPa' : `${maxStressMPa.toFixed(1)} MPa`;
      const yieldDisplay = `${currentMat.yield} MPa`;
      const sfDisplay = isFractured ? '0.00' : P === 0 || safetyFactor === Infinity || safetyFactor > 99 ? '∞' : safetyFactor.toFixed(2);

      return [
        {
          label: 'Deflection (δ)',
          value: deflDisplay,
          color: isFractured ? 'text-red-400' : 'text-brand-cyan',
        },
        {
          label: 'Max Stress (σ)',
          value: stressDisplay,
          color: isFractured ? 'text-red-400' : maxStressMPa > currentMat.yield * 0.7 ? 'text-amber-400' : 'text-white',
        },
        {
          label: 'Yield Limit',
          value: yieldDisplay,
          color: 'text-slate-300',
        },
        {
          label: 'Safety Factor (FS)',
          value: sfDisplay,
          color: isFractured ? 'text-red-400' : sfDisplay === '∞' ? 'text-brand-cyan' : safetyFactor < 1.5 ? 'text-amber-400' : 'text-emerald-400',
        },
      ];
    }
    case 'modal': {
      const f1 = (48 * Math.sqrt(100 / (p.tipMass + 25))).toFixed(1);
      const f2 = (parseFloat(f1) * 2.85).toFixed(1);
      const f3 = (parseFloat(f1) * 5.42).toFixed(1);
      const q = (100 / (2 * p.damping)).toFixed(1);
      return [
        { label: 'Mode 1 (1st Bending)', value: `${f1} Hz`, color: 'text-brand-cyan' },
        { label: 'Mode 2 (Torsional)', value: `${f2} Hz`, color: 'text-white' },
        { label: 'Mode 3 (2nd Bending)', value: `${f3} Hz`, color: 'text-brand-blue' },
        { label: 'Dynamic Q Factor', value: q, color: 'text-emerald-400' },
      ];
    }
    case 'heat': {
      const qFlux = (p.conductivity * (p.inletTemp - 25) * (p.flowSpeed * 0.12)).toFixed(1);
      const hCoeff = (120 + p.flowSpeed * 42).toFixed(0);
      const nusselt = (45 + p.flowSpeed * 8.4).toFixed(1);
      return [
        { label: 'Total Heat Flux', value: `${qFlux} kW/m²`, color: 'text-brand-cyan' },
        { label: 'Convection Coeff (h)', value: `${hCoeff} W/m²K`, color: 'text-white' },
        { label: 'Nusselt Number (Nu)', value: nusselt, color: 'text-emerald-400' },
        { label: 'Thermal Boundary Layer', value: '1.42 mm', color: 'text-brand-blue' },
      ];
    }
    case 'multiphysics': {
      const flutterMargin = (2.4 - p.dynPress * 0.02).toFixed(2);
      const twist = (p.dynPress * (120 / p.modulus) * 0.4).toFixed(2);
      const couplingIter = Math.round(12 + p.dynPress * 0.18);
      return [
        { label: 'Flutter Speed Margin', value: `Mach ${flutterMargin}`, color: 'text-brand-cyan' },
        { label: 'Aeroelastic Wing Twist', value: `${twist}°`, color: 'text-white' },
        { label: 'FSI Coupling Cycles', value: `${couplingIter} iters`, color: 'text-emerald-400' },
        { label: 'Equilibrium State', value: 'CONVERGED', color: 'text-brand-blue' },
      ];
    }
    case 'optimization': {
      const massRed = (p.variables * 0.28).toFixed(1);
      const dragRed = (p.variables * 0.19).toFixed(1);
      return [
        { label: 'Optimal Candidate ID', value: '#OPT-42B', color: 'text-brand-cyan' },
        { label: 'Structural Mass Reduction', value: `-${massRed} %`, color: 'text-emerald-400' },
        { label: 'Aerodynamic Drag Reduction', value: `-${dragRed} %`, color: 'text-white' },
        { label: 'Pareto Confidence', value: '99.4 %', color: 'text-brand-blue' },
      ];
    }
    case 'fea': {
      const peakMpa = (p.pointLoad * 4.6 * (p.elements === 500 ? 1.0 : 0.92)).toFixed(1);
      const maxDisp = (p.pointLoad * 0.022).toFixed(2);
      const sf = (880 / parseFloat(peakMpa)).toFixed(2);
      return [
        { label: 'Peak Von Mises Stress', value: `${peakMpa} MPa`, color: 'text-brand-cyan' },
        { label: 'Max Nodal Displacement', value: `${maxDisp} mm`, color: 'text-white' },
        { label: 'Safety Margin Factor', value: sf, color: 'text-emerald-400' },
        { label: 'Element Formulation', value: 'Hex8 Quad4 Continuum', color: 'text-brand-blue' },
      ];
    }
    case 'nvh': {
      const baseSpl = (p.rpm / 120) * 0.82 + 54;
      const suppressed = p.suppression ? baseSpl - 22.4 : baseSpl;
      const peakHz = Math.round((p.rpm / 60) * 4);
      return [
        { label: 'Overall Sound Level (SPL)', value: `${suppressed.toFixed(1)} dB(A)`, color: 'text-brand-cyan' },
        { label: 'Active Attenuation', value: p.suppression ? '-22.4 dB' : '0.0 dB', color: 'text-emerald-400' },
        { label: 'Dominant Blade Pass Freq', value: `${peakHz} Hz`, color: 'text-white' },
        { label: 'Acoustic Severity', value: p.suppression ? 'NOMINAL / QUIET' : 'ELEVATED NOISE', color: p.suppression ? 'text-brand-cyan' : 'text-amber-400' },
      ];
    }
    default:
      return [];
  }
}

export default function SimulationLab() {
  const [activeModule, setActiveModule] = useState<SimDomain>('cfd');
  const [simStatus, setSimStatus] = useState<'ready' | 'running' | 'converged'>('ready');
  const [iteration, setIteration] = useState(140);
  const [convergence, setConvergence] = useState(99.4);
  const [cfdViewMode, setCfdViewMode] = useState<'windtunnel_sim' | 'windtunnel_video'>('windtunnel_sim');

  // Input states for each domain
  const [inputs, setInputs] = useState({
    cfd: { aoa: 7, airspeed: 160 },
    thermal: { uIn: 1.20, heatFlux: 180, tempIn: 85.0, probeX: 0.65 },
    stress: { q: 0.05, o: 10, n: 0.0003, f: '0' },
    structural: { material: 'steel', stiffness: 201, pos: 50, load: 0, thick: 150 },
    modal: { tipMass: 15, damping: 1.8 },
    heat: { conductivity: 120, flowSpeed: 14, inletTemp: 420 },
    multiphysics: { dynPress: 35, modulus: 110 },
    optimization: { variables: 64, objective: 'Balanced' },
    fea: { pointLoad: 75, elements: 500 },
    nvh: { rpm: 6400, suppression: true },
  });

  // State storing the results calculated ONLY after clicking "Run Solver Iteration"
  const [solvedResults, setSolvedResults] = useState<{ [key in SimDomain]: any }>({
    cfd: computeDomainResults('cfd', { aoa: 7, airspeed: 160 }),
    thermal: computeDomainResults('thermal', { uIn: 1.20, heatFlux: 180, tempIn: 85.0, probeX: 0.65 }),
    stress: computeDomainResults('stress', { q: 0.05, o: 10, n: 0.0003, f: '0' }),
    structural: computeDomainResults('structural', { material: 'steel', stiffness: 201, pos: 50, load: 0, thick: 150 }),
    modal: computeDomainResults('modal', { tipMass: 15, damping: 1.8 }),
    heat: computeDomainResults('heat', { conductivity: 120, flowSpeed: 14, inletTemp: 420 }),
    multiphysics: computeDomainResults('multiphysics', { dynPress: 35, modulus: 110 }),
    optimization: computeDomainResults('optimization', { variables: 64, objective: 'Balanced' }),
    fea: computeDomainResults('fea', { pointLoad: 75, elements: 500 }),
    nvh: computeDomainResults('nvh', { rpm: 6400, suppression: true }),
  });

  // Track if inputs have changed since last solve
  const [hasUnsolvedChanges, setHasUnsolvedChanges] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const thermalIframeRef = useRef<HTMLIFrameElement>(null);
  const structuralIframeRef = useRef<HTMLIFrameElement>(null);
  const multiphaseIframeRef = useRef<HTMLIFrameElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  // Sync multiphase flow parameters with iframe when changed
  useEffect(() => {
    if (activeModule === 'stress' && multiphaseIframeRef.current?.contentWindow) {
      multiphaseIframeRef.current.contentWindow.postMessage({
        type: 'UPDATE_MULTIPHASE',
        q: inputs.stress.q,
        o: inputs.stress.o,
        n: inputs.stress.n,
        f: inputs.stress.f,
      }, '*');
    }
  }, [inputs.stress, activeModule]);

  // Sync thermal boundary conditions with iframe when changed
  useEffect(() => {
    if (activeModule === 'thermal' && thermalIframeRef.current?.contentWindow) {
      thermalIframeRef.current.contentWindow.postMessage({
        type: 'UPDATE_BC',
        uIn: inputs.thermal.uIn,
        heatFlux: inputs.thermal.heatFlux,
        tempIn: inputs.thermal.tempIn,
        probeX: inputs.thermal.probeX,
      }, '*');
    }
  }, [inputs.thermal, activeModule]);

  // Sync structural FEA parameters with iframe when changed
  useEffect(() => {
    if (activeModule === 'structural' && structuralIframeRef.current?.contentWindow) {
      structuralIframeRef.current.contentWindow.postMessage({
        type: 'UPDATE_FEA',
        material: inputs.structural.material,
        stiffness: inputs.structural.stiffness,
        pos: inputs.structural.pos,
        load: inputs.structural.load,
        thick: inputs.structural.thick,
      }, '*');
    }
  }, [inputs.structural, activeModule]);

  // When user modifies any input parameter, mark hasUnsolvedChanges as true
  const updateInput = (domain: SimDomain, key: string, value: any) => {
    setInputs((prev) => ({
      ...prev,
      [domain]: {
        ...prev[domain],
        [key]: value,
      },
    }));
    setHasUnsolvedChanges(true);
  };

  // Rule 1: "update the results only after clicking the run solver iteration button"
  const handleRunSolver = () => {
    setSimStatus('running');
    setIteration(0);
    setConvergence(65.0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setIteration((prev) => Math.min(180, prev + Math.floor(Math.random() * 8) + 5));
      setConvergence((prev) => Math.min(99.8, prev + (100 - prev) * 0.2));

      if (step >= 12) {
        clearInterval(interval);
        // Compute and update solved results now
        const newResults = computeDomainResults(activeModule, inputs[activeModule]);
        setSolvedResults((prev) => ({
          ...prev,
          [activeModule]: newResults,
        }));
        setHasUnsolvedChanges(false);
        setSimStatus('converged');
        setConvergence(99.6);
        setIteration(180);
      }
    }, 100);
  };

  const handleReset = () => {
    setSimStatus('ready');
    setIteration(140);
    setConvergence(99.4);
    setHasUnsolvedChanges(false);
  };

  // Canvas visual loop
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
      const t = timeRef.current;
      ctx.clearRect(0, 0, w, h);

      // Background subtle grid
      ctx.strokeStyle = 'rgba(1, 200, 243, 0.04)';
      ctx.lineWidth = 0.8;
      for (let x = 0; x < w; x += 35) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 35) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      // 1. CFD & FLOW (Faithfully referencing uploaded airfoil_boundary_layer.mp4 wind tunnel video)
      if (activeModule === 'cfd') {
        const topWall = 16;
        const botWall = h - 16;
        const tunnelH = botWall - topWall;

        // Test section chamber boundary guides with optical measurement ticks
        ctx.strokeStyle = 'rgba(71, 85, 105, 0.35)';
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.moveTo(0, topWall);
        ctx.lineTo(w, topWall);
        ctx.moveTo(0, botWall);
        ctx.lineTo(w, botWall);
        ctx.stroke();

        // Chamber scale ticks
        ctx.strokeStyle = 'rgba(100, 116, 139, 0.25)';
        ctx.lineWidth = 0.8;
        for (let x = 30; x < w; x += 30) {
          ctx.beginPath();
          ctx.moveTo(x, topWall);
          ctx.lineTo(x, topWall + 5);
          ctx.moveTo(x, botWall);
          ctx.lineTo(x, botWall - 5);
          ctx.stroke();
        }

        // Airfoil geometry and position (Left-to-Right flow matching reference images)
        // Airfoil leading edge is on the left facing oncoming flow; trailing edge is on the right
        const cx = w * 0.44;
        const cy = h * 0.50;
        const chord = Math.min(w * 0.38, 305);
        const aoa = inputs.cfd.aoa;
        const radAoA = (aoa * Math.PI) / 180;
        const cosA = Math.cos(radAoA);
        const sinA = Math.sin(radAoA);
        const isStalled = aoa > 13;
        const streamSpeed = inputs.cfd.airspeed / 160;
        const flowSpeed = streamSpeed * 3.4;

        const leX = cx - chord * 0.45 * cosA;
        const leY = cy - chord * 0.45 * sinA;
        const teX = cx + chord * 0.55 * cosA;
        const teY = cy + chord * 0.55 * sinA;
        const chordSpan = teX - leX;

        // Separation point along chord (fraction from leading edge: 0 = LE, 1 = TE)
        const xSepRatio = isStalled ? Math.max(0.12, 0.70 - (aoa - 12) * 0.055) : 0.95;
        const xSepX = leX + xSepRatio * chordSpan;

        // Precompute NACA 0015 / 2412 coordinates along chord for the body
        const foilSteps = 100;
        const upperFoilPts: { x: number; y: number }[] = [];
        const lowerFoilPts: { x: number; y: number }[] = [];

        for (let i = 0; i <= foilSteps; i++) {
          const s = i / foilSteps; // 0 = LE (left), 1 = TE (right)
          const yt = 5 * 0.14 * (0.2969 * Math.sqrt(s) - 0.1260 * s - 0.3516 * s * s + 0.2843 * Math.pow(s, 3) - 0.1015 * Math.pow(s, 4)) * chord;
          const yc = (s < 0.4 ? (0.02 / 0.16) * (0.8 * s - s * s) : (0.02 / 0.36) * (0.2 + 0.8 * s - s * s)) * chord;
          const px_c = leX + s * (teX - leX);
          const py_c = leY + s * (teY - leY);
          const nx = -sinA;
          const ny = cosA;
          upperFoilPts.push({ x: px_c - nx * (yt - yc), y: py_c - ny * (yt - yc) });
          lowerFoilPts.push({ x: px_c + nx * (yt + yc), y: py_c + ny * (yt + yc) });
        }

        const getFoilSurfaces = (xVal: number) => {
          const s = Math.max(0.0, Math.min(1.0, (xVal - leX) / chordSpan));
          const idx = Math.min(foilSteps - 1, Math.floor(s * foilSteps));
          const f = s * foilSteps - idx;
          const yUp = upperFoilPts[idx].y * (1 - f) + upperFoilPts[idx + 1].y * f;
          const yLow = lowerFoilPts[idx].y * (1 - f) + lowerFoilPts[idx + 1].y * f;
          return { yUp, yLow, s };
        };

        // Dense smoke streaklines (46 streaklines matching the reference images)
        const numStreaklines = 46;
        const dyLine = (tunnelH - 24) / (numStreaklines + 1);

        // Inflow smoke-wire rack on the left edge
        const rackX = 16;
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(rackX, topWall + 6);
        ctx.lineTo(rackX, botWall - 6);
        ctx.stroke();

        const stagY = leY + Math.sin(radAoA) * 3.5;

        // Render each streakline flowing from left to right
        for (let k = 0; k < numStreaklines; k++) {
          const y0 = topWall + 12 + dyLine * (k + 1);
          const dyStag = y0 - stagY;
          const isUpper = dyStag < -0.5;
          const distStag = Math.abs(dyStag);

          const blend = Math.exp(-Math.pow(distStag / 65.0, 1.65));
          const layerOffset = 1.2 + distStag * 0.85;

          const getEffTarget = (sVal: number) => {
            const sEff = Math.min(1.0, sVal + 0.035 * (1.0 - sVal));
            const ytEff = 5 * 0.14 * (0.2969 * Math.sqrt(sEff) - 0.1260 * sEff - 0.3516 * sEff * sEff + 0.2843 * Math.pow(sEff, 3) - 0.1015 * Math.pow(sEff, 4)) * chord;
            const ycEff = (sEff < 0.4 ? (0.02 / 0.16) * (0.8 * sEff - sEff * sEff) : (0.02 / 0.36) * (0.2 + 0.8 * sEff - sEff * sEff)) * chord;
            const pyEff = leY + sEff * (teY - leY);
            if (isUpper) {
              const yUpEff = pyEff - cosA * (ytEff - ycEff);
              return yUpEff - layerOffset;
            } else {
              const yLowEff = pyEff + cosA * (ytEff + ycEff);
              return yLowEff + layerOffset;
            }
          };

          const targetYLe = getEffTarget(0.0);
          let yLe = y0 + (targetYLe - y0) * blend;
          const { yUp: yUp0, yLow: yLow0 } = getFoilSurfaces(leX);
          if (isUpper) {
            yLe = Math.min(yLe, yUp0 - 1.2);
          } else {
            yLe = Math.max(yLe, yLow0 + 1.2);
          }

          const { yUp: yUpTe, yLow: yLowTe } = getFoilSurfaces(teX);
          let targetYTe = getEffTarget(1.0);
          let stallArchTe = 0.0;
          let vortexRollTe = 0.0;
          if (isStalled && isUpper && teX > xSepX) {
            const sepDist = teX - xSepX;
            const growthLen = teX - xSepX;
            const sSep = sepDist / growthLen;
            const sepAct = Math.pow(Math.sin(Math.min(Math.PI * 0.5, sSep * Math.PI * 0.5)), 2);
            stallArchTe = (aoa - 11) * 5.2 * sepAct;
            const wavePhase = (teX * 0.075 - t * 0.14 * streamSpeed);
            vortexRollTe = Math.sin(wavePhase) * (aoa - 11) * 3.0 * sepAct;
            targetYTe -= (stallArchTe + vortexRollTe);
          }
          let yTe = y0 + (targetYTe - y0) * blend;
          if (isUpper) {
            yTe = Math.min(yTe, yUpTe - 1.2);
          } else {
            yTe = Math.max(yTe, yLowTe + 1.2);
          }

          // Emitter bead at smoke-wire on left
          ctx.fillStyle = 'rgba(226, 232, 240, 0.7)';
          ctx.beginPath();
          ctx.arc(rackX, y0, 1.2, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          let inSeparationWake = false;

          for (let x = rackX; x <= w; x += 4) {
            let stallArch = 0.0;
            let vortexRoll = 0.0;

            if (isStalled && isUpper && x > xSepX) {
              const sepDist = x - xSepX;
              const growthLen = teX - xSepX;
              const sSep = sepDist / growthLen;
              const sepAct = Math.pow(Math.sin(Math.min(Math.PI * 0.5, sSep * Math.PI * 0.5)), 2);
              const wakeDecay = Math.exp(-Math.max(0.0, x - teX) / 220.0);
              stallArch = (aoa - 11) * 5.2 * sepAct * wakeDecay;
              const wavePhase = (x * 0.075 - t * 0.14 * streamSpeed);
              vortexRoll = Math.sin(wavePhase) * (aoa - 11) * 3.0 * sepAct * Math.exp(-Math.max(0.0, x - teX) / 160.0);

              if (distStag < (stallArch + 24)) {
                inSeparationWake = true;
              }
            }

            let y = y0;
            if (x < leX) {
              // Ahead of leading edge: smooth approach curve that touches curved front nose seamlessly
              const dxAhead = leX - x;
              const approachLen = 38.0 + distStag * 0.5;
              const approach = Math.exp(-dxAhead / approachLen);
              y = y0 + (yLe - y0) * approach;
              if (isUpper) {
                y = Math.min(y, yUp0 - 1.2);
              } else {
                y = Math.max(y, yLow0 + 1.2);
              }
            } else if (x <= teX) {
              // Over the airfoil body: guaranteed non-penetration through upper & lower surfaces
              const { yUp, yLow, s } = getFoilSurfaces(x);
              let targetY = getEffTarget(s);
              if (isUpper) {
                targetY -= (stallArch + vortexRoll);
                y = y0 + (targetY - y0) * blend;
                // STRICT NON-PENETRATION: clamp above upper contour
                y = Math.min(y, yUp - 1.2);
              } else {
                y = y0 + (targetY - y0) * blend;
                // STRICT NON-PENETRATION: clamp below lower contour
                y = Math.max(y, yLow + 1.2);
              }
            } else {
              // Downstream wake: smooth continuation without step, leveling downstream
              const wakeDist = x - teX;
              if (isStalled && isUpper) {
                const vortWake = (vortexRoll - vortexRollTe) * blend;
                y = yTe + vortWake + (stallArch - stallArchTe) * blend;
              } else {
                y = yTe + (y0 - yTe) * (1.0 - Math.exp(-wakeDist / 350.0)) * 0.15;
              }
            }

            if (x === rackX) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          // Streakline styling: high-contrast white on dark, soft diffuse smoke in separated stall wake
          if (inSeparationWake && isStalled) {
            ctx.strokeStyle = 'rgba(203, 213, 225, 0.32)';
            ctx.lineWidth = 1.0;
          } else {
            ctx.strokeStyle = 'rgba(235, 242, 250, 0.72)';
            ctx.lineWidth = 1.15;
          }
          ctx.stroke();

          // Traveling smoke filament pulses along streaklines from left to right
          const pulseOffset = (t * flowSpeed * 2.2 + k * 14) % 120;
          for (let px = rackX + pulseOffset; px < w; px += 120) {
            ctx.fillStyle = inSeparationWake
              ? 'rgba(1, 200, 243, 0.25)'
              : 'rgba(255, 255, 255, 0.45)';
            ctx.beginPath();
            ctx.arc(px, y0, 1.0, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Stalled Turbulent Smoke Cloud & Recirculation Vortices (matching reference images)
        if (isStalled) {
          const stallHeight = (aoa - 11) * 5.5;

          // Soft smoky separation envelope fill over the upper surface
          ctx.save();
          const smokeGrad = ctx.createLinearGradient(xSepX, leY, teX + 60, teY - stallHeight);
          smokeGrad.addColorStop(0, 'rgba(148, 163, 184, 0.03)');
          smokeGrad.addColorStop(0.5, 'rgba(100, 116, 139, 0.18)');
          smokeGrad.addColorStop(1, 'rgba(15, 23, 42, 0.24)');
          ctx.fillStyle = smokeGrad;

          ctx.beginPath();
          // Trace rolling wave crests along separated shear layer
          let first = true;
          for (let xv = xSepX; xv <= teX; xv += 4) {
            const { yUp } = getFoilSurfaces(xv);
            const sepDist = xv - xSepX;
            const growthLen = teX - xSepX;
            const sSep = sepDist / growthLen;
            const sepAct = Math.pow(Math.sin(Math.min(Math.PI * 0.5, sSep * Math.PI * 0.5)), 2);
            const wakeDecay = Math.exp(-Math.max(0.0, xv - teX) / 220.0);
            const sArch = (aoa - 11) * 5.2 * sepAct * wakeDecay;
            const wPhase = (xv * 0.075 - t * 0.14 * streamSpeed);
            const vRoll = Math.sin(wPhase) * (aoa - 11) * 3.0 * sepAct;
            const yCrest = yUp - (sArch + vRoll);
            if (first) {
              ctx.moveTo(xv, yCrest);
              first = false;
            } else {
              ctx.lineTo(xv, yCrest);
            }
          }
          // Return along upper surface back to separation point
          const startIdx = Math.min(foilSteps, Math.floor(xSepRatio * foilSteps));
          for (let si = foilSteps; si >= startIdx; si--) {
            ctx.lineTo(upperFoilPts[si].x, upperFoilPts[si].y);
          }
          ctx.closePath();
          ctx.fill();

          // Periodic vortex shedding eddies drifting downstream in the wake to the right
          for (let v = 0; v < 3; v++) {
            const vOffset = (t * flowSpeed * 1.6 + v * 95) % (w - teX + 40);
            const vx = teX + vOffset;
            const vy = teY - stallHeight * 0.45 + Math.sin(t * 0.08 + v * 1.8) * 12;
            const vRadius = 14 + (vOffset / (w - teX + 40)) * 22;

            if (vx > teX && vx < w - 20) {
              ctx.strokeStyle = `rgba(203, 213, 225, ${Math.max(0.06, 0.28 - vOffset * 0.0008)})`;
              ctx.lineWidth = 1.0;
              ctx.beginPath();
              ctx.arc(vx, vy, vRadius, (t * 0.1) % (Math.PI * 2), (t * 0.1 + Math.PI * 1.5) % (Math.PI * 2));
              ctx.stroke();

              // Subtle secondary inner swirl
              ctx.beginPath();
              ctx.arc(vx, vy, vRadius * 0.55, (-t * 0.12) % (Math.PI * 2), (-t * 0.12 + Math.PI * 1.4) % (Math.PI * 2));
              ctx.stroke();
            }
          }
          ctx.restore();
        }

        // Airfoil Body Rendering (Matte metallic test model matching the video & reference images)
        ctx.save();
        ctx.beginPath();
        // Upper contour: from leading edge (s = 0, index 0) to trailing edge (s = 1, index foilSteps)
        ctx.moveTo(upperFoilPts[0].x, upperFoilPts[0].y);
        for (let i = 1; i <= foilSteps; i++) {
          ctx.lineTo(upperFoilPts[i].x, upperFoilPts[i].y);
        }
        // Lower contour: from trailing edge back to leading edge
        for (let i = foilSteps; i >= 0; i--) {
          ctx.lineTo(lowerFoilPts[i].x, lowerFoilPts[i].y);
        }
        ctx.closePath();

        // Metallic gradient fill matching the optical tunnel model
        const foilGrad = ctx.createLinearGradient(leX, leY - 40, cx, cy + 40);
        foilGrad.addColorStop(0, '#384558');
        foilGrad.addColorStop(0.5, '#243042');
        foilGrad.addColorStop(1, '#151E2E');
        ctx.fillStyle = foilGrad;
        ctx.fill();

        // Crisp border outline
        ctx.strokeStyle = '#94A3B8';
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Leading edge highlight
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(leX, leY, 4, Math.PI * 0.5, -Math.PI * 0.5);
        ctx.stroke();

        // Internal model mounting hardware (2 concentric mounting circles matching reference video)
        const mount1S = 0.42;
        const mount2S = 0.58;
        const mount1X = leX + mount1S * (teX - leX);
        const mount1Y = leY + mount1S * (teY - leY);
        const mount2X = leX + mount2S * (teX - leX);
        const mount2Y = leY + mount2S * (teY - leY);

        [ { x: mount1X, y: mount1Y }, { x: mount2X, y: mount2Y } ].forEach((pin) => {
          // Outer mounting ring
          ctx.strokeStyle = '#64748B';
          ctx.lineWidth = 1.2;
          ctx.fillStyle = '#0F172A';
          ctx.beginPath();
          ctx.arc(pin.x, pin.y, 4.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          // Center pivot dot
          ctx.fillStyle = '#94A3B8';
          ctx.beginPath();
          ctx.arc(pin.x, pin.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        });

        // Separation point marker on upper surface (when stalled)
        if (isStalled) {
          const sepIdx = Math.min(foilSteps - 1, Math.floor(xSepRatio * foilSteps));
          const sepPt = upperFoilPts[sepIdx];
          ctx.fillStyle = '#F87171';
          ctx.beginPath();
          ctx.arc(sepPt.x, sepPt.y, 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#EF4444';
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.moveTo(sepPt.x, sepPt.y);
          ctx.lineTo(sepPt.x + 18, sepPt.y - 24);
          ctx.stroke();

          ctx.fillStyle = '#FCA5A5';
          ctx.font = '9px JetBrains Mono';
          ctx.fillText(`SEP X/C ${(xSepRatio * 100).toFixed(0)}%`, sepPt.x + 22, sepPt.y - 28);
        }

        ctx.restore();

        // HUD Telemetry Overlays
        const reynolds = Math.round((1.225 * inputs.cfd.airspeed * 0.3) / 1.789e-5);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px JetBrains Mono';
        ctx.fillText('WIND TUNNEL FLOW VISUALIZATION · MULTI-STREAKLINE FACILITY', 22, 32);

        // Status badge
        if (isStalled) {
          ctx.fillStyle = '#EF4444';
          ctx.fillText(`▲ BOUNDARY LAYER SEPARATION (STALL WAKE) | AoA: ${aoa}° | Re: ${(reynolds / 1000).toFixed(0)}k`, 22, 50);
        } else {
          ctx.fillStyle = '#01C8F3';
          ctx.fillText(`● ATTACHED LAMINAR FLOW | AoA: ${aoa}° | Re: ${(reynolds / 1000).toFixed(0)}k`, 22, 50);
        }

        // Flow Direction vector indicator (Left to Right)
        ctx.fillStyle = '#94A3B8';
        ctx.font = '11px JetBrains Mono';
        ctx.fillText(`INFLOW V∞: ${inputs.cfd.airspeed} m/s →`, w - 195, 32);

        // Reference model note
        ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
        ctx.font = '10px JetBrains Mono';
        ctx.fillText('NACA 0015 MODEL · HELE-SHAW / SMOKE-WIRE TUNNEL EXPERIMENT', 22, h - 22);
      }

      // 2. THERMAL
      else if (activeModule === 'thermal') {
        const cx = w * 0.5;
        const cy = h * 0.5;
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px JetBrains Mono';
        ctx.fillText('ISOTHERMAL TEMPERATURE FIELD DISTRIBUTION', 20, 30);

        // Heat fins
        for (let f = -4; f <= 4; f++) {
          const fx = cx + f * 34;
          const grad = ctx.createLinearGradient(fx, cy + 80, fx, cy - 80);
          grad.addColorStop(0, '#EF4444');
          grad.addColorStop(0.4, '#F59E0B');
          grad.addColorStop(1, '#01C8F3');
          ctx.fillStyle = grad;
          ctx.fillRect(fx - 8, cy - 80, 16, 160);
          ctx.strokeStyle = '#01C8F3';
          ctx.strokeRect(fx - 8, cy - 80, 16, 160);
        }
      }

      // 3. STRESS
      else if (activeModule === 'stress') {
        const cx = w * 0.5;
        const cy = h * 0.5;
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px JetBrains Mono';
        ctx.fillText('NOTCHED SPECIMEN VON MISES STRESS CONCENTRATION', 20, 30);

        // Specimen dogbone with notch
        ctx.strokeStyle = '#01C8F3';
        ctx.lineWidth = 2;
        ctx.strokeRect(cx - 160, cy - 60, 320, 120);

        // Notch fillet with stress hotspot
        const spotGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 55);
        spotGrad.addColorStop(0, 'rgba(239, 68, 68, 0.9)');
        spotGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.7)');
        spotGrad.addColorStop(1, 'rgba(1, 200, 243, 0.1)');
        ctx.fillStyle = spotGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, 55, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. STRUCTURAL
      else if (activeModule === 'structural') {
        const sx = w * 0.2;
        const sy = h * 0.45;
        const sw = w * 0.6;
        const defl = Math.min(60, inputs.structural.load * 1.8);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px JetBrains Mono';
        ctx.fillText('CANTILEVER ELASTIC DEFLECTION PROFILE', 20, 30);

        // Fixed wall
        ctx.fillStyle = 'rgba(2, 132, 199, 0.3)';
        ctx.fillRect(sx - 20, sy - 40, 20, 100);
        ctx.strokeStyle = '#01C8F3';
        ctx.strokeRect(sx - 20, sy - 40, 20, 100);

        // Beam
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.quadraticCurveTo(sx + sw * 0.5, sy, sx + sw, sy + defl);
        ctx.lineTo(sx + sw, sy + 30 + defl);
        ctx.quadraticCurveTo(sx + sw * 0.5, sy + 30, sx, sy + 30);
        ctx.closePath();
        ctx.fillStyle = 'rgba(1, 200, 243, 0.25)';
        ctx.fill();
        ctx.strokeStyle = '#01C8F3';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // 5. MODAL
      else if (activeModule === 'modal') {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px JetBrains Mono';
        ctx.fillText('DYNAMIC EIGENMODE RESONANCE STANDING WAVE', 20, 30);

        ctx.beginPath();
        ctx.strokeStyle = '#01C8F3';
        ctx.lineWidth = 3;
        const my = h * 0.5;
        for (let x = 60; x <= w - 60; x += 6) {
          const frac = (x - 60) / (w - 120);
          const amp = Math.sin(frac * Math.PI * 2) * Math.sin(t * 0.08) * 45;
          if (x === 60) ctx.moveTo(x, my + amp);
          else ctx.lineTo(x, my + amp);
        }
        ctx.stroke();
      }

      // 6. HEAT TRANSFER
      else if (activeModule === 'heat') {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px JetBrains Mono';
        ctx.fillText('CONJUGATE BOUNDARY LAYER CONVECTION & CONDUCTION', 20, 30);

        // Thermal boundary layers
        for (let i = 0; i < 8; i++) {
          const by = h * 0.3 + i * 22;
          ctx.strokeStyle = `rgba(1, 200, 243, ${0.8 - i * 0.09})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(60, by);
          ctx.lineTo(w - 60, by);
          ctx.stroke();
        }
      }

      // 7. MULTIPHYSICS
      else if (activeModule === 'multiphysics') {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px JetBrains Mono';
        ctx.fillText('TWO-WAY FLUID-STRUCTURE INTERACTION (FSI) COUPLING', 20, 30);

        // Moving wing spar and coupled pressure vectors
        const cx = w * 0.5;
        const cy = h * 0.5;
        const flex = Math.sin(t * 0.07) * 20;

        ctx.beginPath();
        ctx.ellipse(cx, cy + flex, 140, 22, 0.1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(1, 200, 243, 0.2)';
        ctx.fill();
        ctx.strokeStyle = '#01C8F3';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // 8. OPTIMIZATION
      else if (activeModule === 'optimization') {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px JetBrains Mono';
        ctx.fillText('PARETO FRONTIER MASS VS PERFORMANCE SPACE', 20, 30);

        // Scatter points
        for (let p = 0; p < 25; p++) {
          const px = 100 + (p * 18);
          const py = h * 0.7 - Math.pow(p / 25, 0.6) * 160;
          ctx.fillStyle = p === 18 ? '#01C8F3' : 'rgba(255, 255, 255, 0.4)';
          ctx.beginPath();
          ctx.arc(px, py, p === 18 ? 8 : 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 9. FINITE ELEMENT ANALYSIS
      else if (activeModule === 'fea') {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px JetBrains Mono';
        ctx.fillText('DISCRETIZED CONTINUUM FINITE ELEMENT MESH (HEX8/QUAD4)', 20, 30);

        const fx = w * 0.25;
        const fy = h * 0.35;
        const cols = 12;
        const rows = 6;
        for (let c = 0; c < cols; c++) {
          for (let r = 0; r < rows; r++) {
            const rx = fx + c * 35;
            const ry = fy + r * 30;
            ctx.strokeStyle = 'rgba(1, 200, 243, 0.5)';
            ctx.lineWidth = 1;
            ctx.strokeRect(rx, ry, 35, 30);
          }
        }
      }

      // 10. ACOUSTICS & NVH
      else if (activeModule === 'nvh') {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px JetBrains Mono';
        ctx.fillText('1/3 OCTAVE ACOUSTIC FFT SPECTRUM & WAVE EMISSION', 20, 30);

        // Spectrum bars
        const bars = 22;
        const bw = (w - 140) / bars;
        for (let b = 0; b < bars; b++) {
          const bx = 70 + b * bw;
          const hVal = Math.sin(b * 0.4 + t * 0.05) * 40 + 70;
          ctx.fillStyle = inputs.nvh.suppression ? '#01C8F3' : '#F59E0B';
          ctx.fillRect(bx, h * 0.8 - hVal, bw - 4, hVal);
        }
      }

      timeRef.current++;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [activeModule, inputs, cfdViewMode]);

  return (
    <section id="simulation-lab" className="relative py-20 bg-bg-primary overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Reduced Margins: max-w-[1540px] */}
      <div className="relative z-10 max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <div className="px-3.5 py-1.5 border border-brand-cyan/40 rounded-sm bg-brand-cyan/10">
                <span className="font-mono text-xs font-bold text-brand-cyan tracking-[0.2em] uppercase">
                  SIMULATION WORKBENCH
                </span>
              </div>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              QUANTUM & ENGINEERING <span className="text-gradient-cyan">SIMULATION LAB</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            {/* Rule 1: Run Solver Iteration Button */}
            <button
              onClick={handleRunSolver}
              disabled={simStatus === 'running'}
              className="btn-primary flex items-center gap-2.5 px-6 py-3.5 rounded-sm text-sm font-bold tracking-wider uppercase"
            >
              {simStatus === 'running' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  SOLVING DOMAIN...
                </>
              ) : (
                <>
                  <Play size={16} />
                  RUN SOLVER ITERATION
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

        {/* Workbench Wrapper */}
        <div className="border border-border-subtle rounded-sm overflow-hidden bg-bg-secondary shadow-2xl">
          
          {/* Top Status Bar */}
          <div className="flex flex-wrap items-center justify-between px-5 py-3 border-b border-border-subtle bg-bg-card">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs font-bold text-brand-cyan tracking-wider">
                ACTIVE DOMAIN:
              </span>
              <span className="font-mono text-xs font-bold text-white uppercase">
                {SIM_MODULES.find((m) => m.id === activeModule)?.label}
              </span>
            </div>

            <div className="flex items-center gap-6">
              {hasUnsolvedChanges && (
                <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded">
                  <AlertCircle size={14} className="text-amber-400" />
                  <span className="font-mono text-xs font-bold text-amber-400">
                    INPUTS CHANGED — CLICK 'RUN SOLVER ITERATION' TO UPDATE RESULTS
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <div className="status-dot status-dot-cyan" />
                <span className="font-mono text-xs font-bold text-emerald-400">SOLVER READY</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
            
            {/* Left Column: 10 Simulation Modules (3 cols) */}
            <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-border-subtle bg-bg-card/90 p-4 flex flex-col">
              <div className="pb-2.5 mb-3 border-b border-border-subtle flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-300 tracking-wider">
                  SELECT SIMULATION:
                </span>
                <span className="font-mono text-[11px] text-brand-cyan">{SIM_MODULES.length} AVAILABLE</span>
              </div>

              <div className="space-y-1.5 overflow-y-auto max-h-[380px] pr-1">
                {SIM_MODULES.map((mod) => {
                  const Icon = mod.icon;
                  const isActive = activeModule === mod.id;
                  return (
                    <button
                      key={mod.id}
                      onClick={() => {
                        setActiveModule(mod.id);
                        setHasUnsolvedChanges(false);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-sm transition-all duration-200 text-left ${
                        isActive
                          ? 'bg-brand-cyan/20 border-2 border-brand-cyan shadow-sm'
                          : 'border border-border-subtle/50 hover:bg-slate-800/40 hover:border-brand-cyan/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`p-1.5 rounded ${isActive ? 'bg-brand-cyan text-black' : 'bg-slate-800 text-brand-cyan'}`}>
                          <Icon size={16} />
                        </div>
                        <div>
                          <div className={`font-mono text-xs font-bold tracking-wide ${isActive ? 'text-white' : 'text-slate-200'}`}>
                            {mod.label}
                          </div>
                          <div className="font-mono text-[10px] text-brand-cyan/80">
                            {mod.badge}
                          </div>
                        </div>
                      </div>
                      <ChevronRight size={14} className={isActive ? 'text-brand-cyan' : 'text-slate-600'} />
                    </button>
                  );
                })}
              </div>

              {/* Interactive Parameters Drawer */}
              <div className="mt-5 pt-4 border-t border-border-subtle">
                <div className="flex items-center gap-2 mb-3">
                  <Sliders size={15} className="text-brand-cyan" />
                  <span className="font-mono text-xs font-bold text-white tracking-wider">
                    INTERACTIVE INPUT PARAMETERS
                  </span>
                </div>

                {/* 1. CFD & FLOW INPUTS */}
                {activeModule === 'cfd' && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                        <span>Angle of Attack (AoA):</span>
                        <span className="font-bold text-brand-cyan">{inputs.cfd.aoa}°</span>
                      </div>
                      <input
                        type="range" min="-4" max="24" step="1"
                        value={inputs.cfd.aoa}
                        onChange={(e) => updateInput('cfd', 'aoa', parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                        <span>-4°</span>
                        <span>0°</span>
                        <span className="text-amber-400">14° (Stall)</span>
                        <span className="text-rose-400">24°</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                        <span>Inflow Airspeed:</span>
                        <span className="font-bold text-brand-cyan">{inputs.cfd.airspeed} m/s</span>
                      </div>
                      <input
                        type="range" min="60" max="300" step="10"
                        value={inputs.cfd.airspeed}
                        onChange={(e) => updateInput('cfd', 'airspeed', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                {/* 2. THERMAL FLUID ANALYSIS INPUTS (Boundary Conditions) */}
                {activeModule === 'thermal' && (
                  <div className="space-y-4">
                    <div className="pb-1 border-b border-border-subtle/60 flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                        BOUNDARY CONDITIONS
                      </span>
                      <button
                        onClick={() => {
                          setInputs((prev) => ({
                            ...prev,
                            thermal: { uIn: 1.20, heatFlux: 180, tempIn: 85.0, probeX: 0.65 }
                          }));
                          setHasUnsolvedChanges(true);
                        }}
                        className="text-[10px] font-mono text-slate-400 hover:text-sky-400 transition"
                      >
                        Reset Defaults
                      </button>
                    </div>

                    <div>
                      <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                        <span>Inlet Velocity (u_in):</span>
                        <span className="font-bold text-sky-400">{inputs.thermal.uIn.toFixed(2)} m/s</span>
                      </div>
                      <input
                        type="range" min="0.2" max="3.5" step="0.05"
                        value={inputs.thermal.uIn}
                        onChange={(e) => updateInput('thermal', 'uIn', parseFloat(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                        <span>0.2 m/s (Idle)</span>
                        <span>3.5 m/s (High RPM)</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                        <span>Engine Block Heat Flux (q″_w):</span>
                        <span className="font-bold text-amber-400">{inputs.thermal.heatFlux} kW/m²</span>
                      </div>
                      <input
                        type="range" min="40" max="400" step="10"
                        value={inputs.thermal.heatFlux}
                        onChange={(e) => updateInput('thermal', 'heatFlux', parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                        <span>40 kW/m² (Cruise)</span>
                        <span>400 kW/m² (Peak)</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                        <span>Coolant Inlet Temp (T_in):</span>
                        <span className="font-bold text-emerald-400">{inputs.thermal.tempIn.toFixed(1)} °C</span>
                      </div>
                      <input
                        type="range" min="60" max="105" step="1"
                        value={inputs.thermal.tempIn}
                        onChange={(e) => updateInput('thermal', 'tempIn', parseFloat(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                        <span>60 °C (Cold)</span>
                        <span>105 °C (Hot Soak)</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                        <span>Cross-Section Probe (x/L):</span>
                        <span className="font-bold text-purple-400">{inputs.thermal.probeX.toFixed(2)} ({Math.round(inputs.thermal.probeX * 120)} mm)</span>
                      </div>
                      <input
                        type="range" min="0.1" max="0.95" step="0.01"
                        value={inputs.thermal.probeX}
                        onChange={(e) => updateInput('thermal', 'probeX', parseFloat(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                        <span>0.10</span>
                        <span>0.95</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. MULTI PHASE FLOW INPUTS */}
                {activeModule === 'stress' && (
                  <div className="space-y-4">
                    <div className="pb-1 border-b border-border-subtle/60 flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-brand-cyan uppercase tracking-wider">
                        EULER–EULER TWO-FLUID PARAMETERS
                      </span>
                    </div>
                    <div>
                      <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                        <span>Inlet Gas Velocity:</span>
                        <span className="font-bold text-brand-cyan">{(inputs.stress.q ?? 0.05).toFixed(3)} m/s</span>
                      </div>
                      <input
                        type="range" min="0.01" max="0.12" step="0.005"
                        value={inputs.stress.q ?? 0.05}
                        onChange={(e) => updateInput('stress', 'q', parseFloat(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                        <span>0.010 m/s</span>
                        <span>0.120 m/s</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                        <span>Orifice Diameter (D₀):</span>
                        <span className="font-bold text-brand-cyan">{inputs.stress.o ?? 10} mm</span>
                      </div>
                      <input
                        type="range" min="5" max="40" step="5"
                        value={inputs.stress.o ?? 10}
                        onChange={(e) => updateInput('stress', 'o', parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                        <span>5 mm</span>
                        <span>40 mm</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                        <span>Eddy Viscosity (ν_t):</span>
                        <span className="font-bold text-brand-cyan">{(inputs.stress.n ?? 0.0003).toExponential(1)} m²/s</span>
                      </div>
                      <input
                        type="range" min="0" max="0.0008" step="0.00002"
                        value={inputs.stress.n ?? 0.0003}
                        onChange={(e) => updateInput('stress', 'n', parseFloat(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                        <span>0 m²/s</span>
                        <span>8.0e-4 m²/s</span>
                      </div>
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-slate-300 mb-1">Field Displayed:</label>
                      <select
                        value={inputs.stress.f ?? '0'}
                        onChange={(e) => updateInput('stress', 'f', e.target.value)}
                        className="w-full bg-slate-900 border border-border-subtle rounded px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-brand-cyan"
                      >
                        <option value="0">Gas fraction α_g</option>
                        <option value="1">Liquid speed |u_l|</option>
                        <option value="2">Gas speed |u_g|</option>
                        <option value="3">Bubble diameter d</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* 4. STRUCTURAL FEA INPUTS */}
                {activeModule === 'structural' && (
                  <div className="space-y-4">
                    <div className="pb-1 border-b border-border-subtle/60 flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-brand-cyan uppercase tracking-wider">
                        FEA PARAMETERS
                      </span>
                      <button
                        onClick={() => {
                          setInputs((prev) => ({
                            ...prev,
                            structural: { material: 'steel', stiffness: 201, pos: 50, load: 0, thick: 150 },
                          }));
                          setHasUnsolvedChanges(true);
                        }}
                        className="text-[10px] font-mono text-slate-400 hover:text-brand-cyan transition"
                      >
                        Reset Structure
                      </button>
                    </div>

                    <div>
                      <div className="flex justify-between font-mono text-xs text-slate-300 mb-1.5">
                        <span>Material Profile</span>
                      </div>
                      <select
                        value={inputs.structural.material}
                        onChange={(e) => {
                          const mat = e.target.value;
                          const matStiffnessMap: Record<string, number> = {
                            steel: 201,
                            aluminum: 69,
                            titanium: 114,
                            concrete: 30,
                            polymer: 5,
                            custom: inputs.structural.stiffness,
                          };
                          const newE = matStiffnessMap[mat] ?? inputs.structural.stiffness;
                          setInputs((prev) => ({
                            ...prev,
                            structural: {
                              ...prev.structural,
                              material: mat,
                              stiffness: newE,
                            },
                          }));
                          setHasUnsolvedChanges(true);
                        }}
                        className="w-full bg-slate-900 border border-border-subtle rounded px-2.5 py-2 font-mono text-xs text-brand-cyan focus:outline-none focus:border-brand-cyan cursor-pointer"
                      >
                        <option value="steel">Structural Steel (Ductile)</option>
                        <option value="aluminum">Aluminum 6061 (Ductile)</option>
                        <option value="titanium">Titanium Grade 5 (Rigid)</option>
                        <option value="concrete">Concrete (Brittle)</option>
                        <option value="polymer">Flexible Polymer (High Bend)</option>
                        <option value="custom">Custom Configuration</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                        <span>Custom Stiffness (E)</span>
                        <span className="font-bold text-brand-cyan">{inputs.structural.stiffness} GPa</span>
                      </div>
                      <input
                        type="range" min="1" max="1000" step="5"
                        value={inputs.structural.stiffness}
                        disabled={inputs.structural.material !== 'custom'}
                        onChange={(e) => updateInput('structural', 'stiffness', parseInt(e.target.value))}
                        className={`w-full ${inputs.structural.material !== 'custom' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      />
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                        <span>1 GPa</span>
                        <span className={inputs.structural.material === 'custom' ? 'text-brand-cyan' : ''}>
                          {inputs.structural.material === 'custom' ? 'Editable' : '(Locked to Material)'}
                        </span>
                        <span>1000 GPa</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                        <span>Load Position (X-Axis)</span>
                        <span className="font-bold text-brand-cyan">{inputs.structural.pos}%</span>
                      </div>
                      <input
                        type="range" min="5" max="95" step="1"
                        value={inputs.structural.pos}
                        onChange={(e) => updateInput('structural', 'pos', parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                        <span>5% (Left Support)</span>
                        <span>50%</span>
                        <span>95% (Right Support)</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                        <span>Applied Load (P)</span>
                        <span className="font-bold text-brand-cyan">{inputs.structural.load.toLocaleString()} kN</span>
                      </div>
                      <input
                        type="range" min="0" max="25000" step="1"
                        value={inputs.structural.load}
                        onChange={(e) => updateInput('structural', 'load', parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                        <span>0 kN</span>
                        <span>25,000 kN</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                        <span>Beam Thickness (h)</span>
                        <span className="font-bold text-brand-cyan">{inputs.structural.thick} mm</span>
                      </div>
                      <input
                        type="range" min="10" max="1000" step="10"
                        value={inputs.structural.thick}
                        onChange={(e) => updateInput('structural', 'thick', parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                        <span>10 mm</span>
                        <span>1000 mm</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. MODAL INPUTS */}
                {activeModule === 'modal' && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                        <span>Attached Tip Mass:</span>
                        <span className="font-bold text-brand-cyan">{inputs.modal.tipMass} kg</span>
                      </div>
                      <input
                        type="range" min="0" max="50" step="5"
                        value={inputs.modal.tipMass}
                        onChange={(e) => updateInput('modal', 'tipMass', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                        <span>Structural Damping:</span>
                        <span className="font-bold text-brand-cyan">{inputs.modal.damping} %</span>
                      </div>
                      <input
                        type="range" min="0.5" max="5.0" step="0.1"
                        value={inputs.modal.damping}
                        onChange={(e) => updateInput('modal', 'damping', parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                {/* 6. HEAT TRANSFER INPUTS */}
                {activeModule === 'heat' && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                        <span>Thermal Conductivity (k):</span>
                        <span className="font-bold text-brand-cyan">{inputs.heat.conductivity} W/mK</span>
                      </div>
                      <input
                        type="range" min="15" max="300" step="10"
                        value={inputs.heat.conductivity}
                        onChange={(e) => updateInput('heat', 'conductivity', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                        <span>Inlet Gas Temperature:</span>
                        <span className="font-bold text-brand-cyan">{inputs.heat.inletTemp} °C</span>
                      </div>
                      <input
                        type="range" min="100" max="800" step="20"
                        value={inputs.heat.inletTemp}
                        onChange={(e) => updateInput('heat', 'inletTemp', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                {/* 7. MULTIPHYSICS INPUTS */}
                {activeModule === 'multiphysics' && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                        <span>Fluid Dynamic Pressure (q):</span>
                        <span className="font-bold text-brand-cyan">{inputs.multiphysics.dynPress} kPa</span>
                      </div>
                      <input
                        type="range" min="10" max="80" step="5"
                        value={inputs.multiphysics.dynPress}
                        onChange={(e) => updateInput('multiphysics', 'dynPress', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                        <span>Elastic Modulus (E):</span>
                        <span className="font-bold text-brand-cyan">{inputs.multiphysics.modulus} GPa</span>
                      </div>
                      <input
                        type="range" min="40" max="210" step="10"
                        value={inputs.multiphysics.modulus}
                        onChange={(e) => updateInput('multiphysics', 'modulus', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                {/* 8. OPTIMIZATION INPUTS */}
                {activeModule === 'optimization' && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                        <span>Design Parameter Variables:</span>
                        <span className="font-bold text-brand-cyan">{inputs.optimization.variables} DoF</span>
                      </div>
                      <input
                        type="range" min="20" max="100" step="4"
                        value={inputs.optimization.variables}
                        onChange={(e) => updateInput('optimization', 'variables', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                {/* 9. FINITE ELEMENT ANALYSIS INPUTS */}
                {activeModule === 'fea' && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                        <span>Applied Nodal Load:</span>
                        <span className="font-bold text-brand-cyan">{inputs.fea.pointLoad} kN</span>
                      </div>
                      <input
                        type="range" min="20" max="200" step="5"
                        value={inputs.fea.pointLoad}
                        onChange={(e) => updateInput('fea', 'pointLoad', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                {/* 10. ACOUSTICS & NVH INPUTS */}
                {activeModule === 'nvh' && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between font-mono text-xs text-slate-300 mb-1">
                        <span>Shaft Velocity:</span>
                        <span className="font-bold text-brand-cyan">{inputs.nvh.rpm} RPM</span>
                      </div>
                      <input
                        type="range" min="2000" max="12000" step="200"
                        value={inputs.nvh.rpm}
                        onChange={(e) => updateInput('nvh', 'rpm', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 cursor-pointer font-mono text-xs text-slate-200">
                        <input
                          type="checkbox"
                          checked={inputs.nvh.suppression}
                          onChange={(e) => updateInput('nvh', 'suppression', e.target.checked)}
                          className="rounded border-slate-700 text-brand-cyan focus:ring-0"
                        />
                        <span>Active Noise Cancellation (-22.4 dB)</span>
                      </label>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Center Canvas Viewport (6 cols) */}
            <div className="lg:col-span-6 relative border-b lg:border-b-0 lg:border-r border-border-subtle bg-bg-primary flex flex-col">
              
              {/* Top View Selector for CFD */}
              {activeModule === 'cfd' && (
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <button
                    onClick={() => setCfdViewMode('windtunnel_sim')}
                    className={`px-3 py-1.5 rounded text-xs font-mono font-bold border transition-all ${
                      cfdViewMode === 'windtunnel_sim'
                        ? 'bg-brand-cyan text-black border-brand-cyan'
                        : 'bg-slate-900/80 text-slate-300 border-border-subtle hover:text-white'
                    }`}
                  >
                    SMOKE-WIRE STREAKLINE CANVAS
                  </button>
                  <button
                    onClick={() => setCfdViewMode('windtunnel_video')}
                    className={`px-3 py-1.5 rounded text-xs font-mono font-bold border transition-all flex items-center gap-1.5 ${
                      cfdViewMode === 'windtunnel_video'
                        ? 'bg-brand-cyan text-black border-brand-cyan'
                        : 'bg-slate-900/80 text-slate-300 border-border-subtle hover:text-white'
                    }`}
                  >
                    <Video size={14} />
                    WIND TUNNEL EXPERIMENT VIDEO
                  </button>
                </div>
              )}

              {/* Viewport content */}
              <div className="flex-1 w-full h-[460px] lg:h-full relative min-h-[460px] bg-slate-950 flex items-center justify-center overflow-hidden">
                {activeModule === 'cfd' && cfdViewMode === 'windtunnel_video' ? (
                  <div className="relative w-full h-full flex items-center justify-center bg-black">
                    <video
                      src="./assets/airfoil_boundary_layer.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1.5 rounded border border-border-subtle">
                      <span className="font-mono text-xs text-brand-cyan">
                        AIRFOIL BOUNDARY LAYER SEPARATION — REFERENCE EXPERIMENT
                      </span>
                    </div>
                  </div>
                ) : activeModule === 'thermal' ? (
                  <div className="relative w-full h-full min-h-[580px] flex flex-col bg-slate-950">
                    <div className="flex items-center justify-between px-3 py-2 bg-slate-900/90 border-b border-border-subtle z-10">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                        <span className="font-mono text-xs text-white font-bold tracking-wider">
                          THERMAL FLUID ANALYSIS — 2D CFD RIG &amp; DUMMY CSV DATA
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href="./dummy_data.csv"
                          download="dummy_data.csv"
                          className="px-2.5 py-1 rounded text-[11px] font-mono font-medium bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition flex items-center gap-1"
                        >
                          ⬇ Dummy CSV
                        </a>
                      </div>
                    </div>
                    <iframe
                      ref={thermalIframeRef}
                      src="./thermal_fluid_analysis.html?embedded=true"
                      title="Thermal Fluid Analysis Simulation"
                      className="w-full flex-1 min-h-[540px] border-0 bg-[#0b0f19]"
                      allowFullScreen={true}
                      allow="fullscreen"
                      onLoad={() => {
                        thermalIframeRef.current?.contentWindow?.postMessage({
                          type: 'UPDATE_BC',
                          uIn: inputs.thermal.uIn,
                          heatFlux: inputs.thermal.heatFlux,
                          tempIn: inputs.thermal.tempIn,
                          probeX: inputs.thermal.probeX,
                        }, '*');
                      }}
                    />
                  </div>
                ) : activeModule === 'stress' ? (
                  <div className="relative w-full h-full min-h-[580px] flex flex-col bg-[#070b14]">
                    <div className="flex items-center justify-between px-3 py-2 bg-slate-900/90 border-b border-border-subtle z-10">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                        <span className="font-mono text-xs text-white font-bold tracking-wider">
                          TWO-FLUID EULER–EULER BUBBLE COLUMN SIMULATION (SI UNITS)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-slate-400">
                          Δt = 4ms • 40×100 Grid
                        </span>
                      </div>
                    </div>
                    <iframe
                      ref={multiphaseIframeRef}
                      src="./multiphase_flow.html"
                      title="Multi Phase Flow Simulation"
                      className="w-full flex-1 min-h-[540px] border-0 bg-[#070b14]"
                      allowFullScreen={true}
                      allow="fullscreen"
                      onLoad={() => {
                        multiphaseIframeRef.current?.contentWindow?.postMessage({
                          type: 'UPDATE_MULTIPHASE',
                          q: inputs.stress.q,
                          o: inputs.stress.o,
                          n: inputs.stress.n,
                          f: inputs.stress.f,
                        }, '*');
                      }}
                    />
                  </div>
                ) : activeModule === 'structural' ? (
                  <div className="relative w-full h-full min-h-[580px] flex flex-col bg-slate-950">
                    <iframe
                      ref={structuralIframeRef}
                      src="./structural_fea.html"
                      title="STRUCTURAL FEA Simulation"
                      className="w-full flex-1 min-h-[540px] border-0 bg-[#050505]"
                      allowFullScreen={true}
                      allow="fullscreen"
                      onLoad={() => {
                        structuralIframeRef.current?.contentWindow?.postMessage({
                          type: 'UPDATE_FEA',
                          material: inputs.structural.material,
                          stiffness: inputs.structural.stiffness,
                          pos: inputs.structural.pos,
                          load: inputs.structural.load,
                          thick: inputs.structural.thick,
                        }, '*');
                      }}
                    />
                  </div>
                ) : (
                  <canvas ref={canvasRef} className="w-full h-full block" />
                )}
              </div>

              {/* Bottom HUD Bar */}
              <div className="border-t border-border-subtle bg-bg-card/95 px-5 py-3 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="font-mono text-xs text-slate-400 block">SOLVER STEP</span>
                    <span className="font-mono text-sm font-bold text-brand-cyan">ITER {iteration.toString().padStart(3, '0')}</span>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-slate-400 block">CONVERGENCE</span>
                    <span className="font-mono text-sm font-bold text-emerald-400">{convergence.toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-slate-400 block">EXECUTION</span>
                    <span className="font-mono text-sm font-bold text-white">NEXUS HYBRID SOLVER</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-cyan" />
                  <span className="font-mono text-xs font-semibold text-slate-200">NUMERICAL EQUILIBRIUM</span>
                </div>
              </div>
            </div>

            {/* Right Panel: Solved Results (3 cols) */}
            <div className="lg:col-span-3 bg-bg-card flex flex-col p-5">
              <div className="pb-3 border-b border-border-subtle flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">
                  SOLVED NUMERICAL RESULTS
                </span>
                <span className={`px-2 py-0.5 font-mono text-[11px] font-bold rounded ${hasUnsolvedChanges ? 'bg-amber-500/20 text-amber-400' : 'bg-brand-cyan/20 text-brand-cyan'}`}>
                  {hasUnsolvedChanges ? 'PENDING SOLVE' : 'SOLVED'}
                </span>
              </div>

              {hasUnsolvedChanges && (
                <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded text-xs font-mono text-amber-300 leading-relaxed">
                  Parameters have been modified. Results shown below correspond to the last solved state. Click <strong>RUN SOLVER ITERATION</strong> above to recompute!
                </div>
              )}

              {/* Rule 1: Solved Results displayed here only update on solve iteration */}
              <div className="py-4 space-y-3.5 flex-1">
                {solvedResults[activeModule]?.map((res: any) => (
                  <div key={res.label} className="p-3.5 rounded bg-bg-secondary border border-border-subtle">
                    <div className="text-xs font-mono text-slate-400">{res.label}</div>
                    <div className={`text-xl sm:text-2xl font-mono font-bold mt-1 ${res.color}`}>
                      {res.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Status footer button */}
              <button
                onClick={handleRunSolver}
                disabled={simStatus === 'running'}
                className="mt-auto w-full btn-primary py-3 rounded-sm font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <Play size={14} />
                RUN SOLVER ITERATION
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
