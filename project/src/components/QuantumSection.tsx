import React, { useState } from 'react';
import {
  Atom,
  Layers,
  Activity,
  ChevronDown,
  ChevronUp,
  Zap,
  Cpu
} from 'lucide-react';

interface AdvantageItem {
  id: string;
  num: string;
  advantage: string;
  property: string;
  accent: {
    primary: string;
    border: string;
    bg: string;
    text: string;
    glow: string;
    badgeBg: string;
  };
  shortDescription: string;
  microcopy: string;
  engineeringRelevance: string;
  howItWorks: string;
  flow: [string, string, string];
  classicalVsQuantum: {
    classicalLabel: string;
    classicalDesc: string;
    quantumLabel: string;
    quantumDesc: string;
    complexity?: { classical: string; quantum: string };
  };
  mathFormula?: {
    latex: string;
    sublabel: string;
  };
}

const advantageData: AdvantageItem[] = [
  {
    id: 'superposition',
    num: '01',
    advantage: 'HIGH-DIMENSIONAL REPRESENTATION',
    property: 'SUPERPOSITION',
    accent: {
      primary: '#03cff4',
      border: 'border-[#03cff4]/30 hover:border-[#03cff4]/70',
      bg: 'rgba(3, 207, 244, 0.05)',
      text: 'text-[#03cff4]',
      glow: 'rgba(3, 207, 244, 0.25)',
      badgeBg: 'bg-[#03cff4]/10 text-[#03cff4] border-[#03cff4]/30',
    },
    shortDescription: 'Quantum states can represent combinations of many basis states simultaneously, enabling compact mathematical representations of large simulation state spaces.',
    microcopy: 'Represent large simulation state spaces through quantum amplitudes.',
    engineeringRelevance: 'Useful for representing high-dimensional discretized systems, large mesh coordinates, and fluid field state vectors in quantum form.',
    howItWorks: 'Instead of assigning individual classical memory registers to every spatial cell, an n-qubit quantum register spans a 2ⁿ-dimensional Hilbert space, expressing complex discretized state vectors as a coherent linear combination of basis vectors.',
    flow: ['MANY STATES', 'SUPERPOSITION', 'COMPACT QUANTUM REPRESENTATION'],
    classicalVsQuantum: {
      classicalLabel: 'Classical Vector Representation',
      classicalDesc: 'N simulation values represented explicitly across physical memory addresses (RAM/VRAM bound).',
      quantumLabel: 'Compact Quantum Representation',
      quantumDesc: 'N amplitudes represented within an n-qubit quantum state vector |ψ⟩ = ∑ aᵢ|i⟩.',
      complexity: { classical: 'O(N) memory storage', quantum: 'O(log₂ N) qubits register' }
    },
    mathFormula: {
      latex: '|ψ⟩ = ∑ᵢ₌₀^{N-1} aᵢ |i⟩,   where N = 2ⁿ',
      sublabel: 'Unitary state vector containing 2ⁿ complex probability amplitudes'
    },
  },
  {
    id: 'parallelism',
    num: '02',
    advantage: 'SIMULTANEOUS STATE PROCESSING',
    property: 'QUANTUM PARALLELISM',
    accent: {
      primary: '#0c8fce',
      border: 'border-[#0c8fce]/30 hover:border-[#0c8fce]/70',
      bg: 'rgba(12, 143, 206, 0.05)',
      text: 'text-[#0c8fce]',
      glow: 'rgba(12, 143, 206, 0.25)',
      badgeBg: 'bg-[#0c8fce]/10 text-[#0c8fce] border-[#0c8fce]/30',
    },
    shortDescription: 'Quantum operations can act across the amplitudes of a superposition at once, enabling certain transformations to process many encoded states simultaneously.',
    microcopy: 'Process superposed state amplitudes simultaneously via unitary operators.',
    engineeringRelevance: 'Provides a fundamentally different computational pathway for linear transformations on large encoded simulation spaces, PDE discretizations, and fluid operators.',
    howItWorks: 'A single unitary gate operation U applied to an n-qubit register acts on the entire superposition at once: U|ψ⟩ = ∑ aᵢ U|i⟩. Combined with structured interference, this extracts global physical properties without evaluating basis states individually.',
    flow: ['MULTIPLE ENCODED STATES', 'QUANTUM OPERATION', 'SIMULTANEOUS TRANSFORMATION'],
    classicalVsQuantum: {
      classicalLabel: 'Classical Sequential/SIMD Pipeline',
      classicalDesc: 'Processor executes operations across vector threads constrained by memory bandwidth & clock cycles.',
      quantumLabel: 'Unitary Superposition Processing',
      quantumDesc: 'Quantum operations act across superposed amplitudes simultaneously; interference filters target information.',
      complexity: { classical: 'Iterative mesh loops', quantum: 'Global operator evolution' }
    },
    mathFormula: {
      latex: 'U |ψ⟩ = U ( ∑ᵢ aᵢ |i⟩ ) = ∑ᵢ aᵢ ( U |i⟩ )',
      sublabel: 'Linear unitary transformation acting synchronously across entire basis'
    },
  },
  {
    id: 'entanglement',
    num: '03',
    advantage: 'COMPLEX CORRELATION REPRESENTATION',
    property: 'ENTANGLEMENT',
    accent: {
      primary: '#9f04c3',
      border: 'border-[#9f04c3]/30 hover:border-[#9f04c3]/70',
      bg: 'rgba(159, 4, 195, 0.05)',
      text: 'text-[#9f04c3]',
      glow: 'rgba(159, 4, 195, 0.25)',
      badgeBg: 'bg-[#9f04c3]/10 text-[#d866f2] border-[#9f04c3]/30',
    },
    shortDescription: 'Entanglement enables quantum systems to represent strong correlations between interconnected degrees of freedom that cannot be described independently.',
    microcopy: 'Represent coupled physical degrees of freedom natively without separability loss.',
    engineeringRelevance: 'Directly relevant to coupled variables, interacting physical systems, conjugate heat transfer, aeroelasticity, and multiphysics-style computational structures.',
    howItWorks: 'Physical systems with tightly coupled field variables (such as local fluid velocity u, pressure p, and temperature T) exhibit interdependencies. Entangled quantum states naturally embody non-separable joint probability distributions without requiring artificial decoupling.',
    flow: ['COUPLED VARIABLES', 'ENTANGLEMENT', 'CORRELATED QUANTUM STATE'],
    classicalVsQuantum: {
      classicalLabel: 'Classical Coupled Solver',
      classicalDesc: 'Iterative Picard or Newton-Raphson methods factorizing massive coupled Jacobian matrices.',
      quantumLabel: 'Entangled State Structure',
      quantumDesc: 'Joint degrees of freedom mapped to non-separable multi-qubit entangled states |Ψ_coupled⟩ ≠ |u⟩ ⊗ |p⟩ ⊗ |T⟩.',
      complexity: { classical: 'O(M³) coupled matrix inversion', quantum: 'Native tensor product correlation' }
    },
    mathFormula: {
      latex: '|Ψ_coupled⟩ = α |u₀ p₀ T₀⟩ + β |u₁ p₁ T₁⟩ ≠ |u⟩ ⊗ |p⟩ ⊗ |T⟩',
      sublabel: 'Non-separable multipartite entangled state encoding physical cross-coupling'
    },
  },
  {
    id: 'interference',
    num: '04',
    advantage: 'EFFICIENT SOLUTION AMPLIFICATION',
    property: 'QUANTUM INTERFERENCE',
    accent: {
      primary: '#e80874',
      border: 'border-[#e80874]/30 hover:border-[#e80874]/70',
      bg: 'rgba(232, 8, 116, 0.05)',
      text: 'text-[#e80874]',
      glow: 'rgba(232, 8, 116, 0.25)',
      badgeBg: 'bg-[#e80874]/10 text-[#ff66a8] border-[#e80874]/30',
    },
    shortDescription: 'Quantum interference allows useful computational pathways to reinforce while unwanted pathways cancel, helping algorithms concentrate information toward desired outcomes.',
    microcopy: 'Filter high-dimensional solution spaces by amplifying constructive phases.',
    engineeringRelevance: 'Supports quantum algorithms that extract relevant solution information and optimal aerodynamic profiles from combinatorial computational paths.',
    howItWorks: 'Complex probability amplitudes possess phase angles. By structuring quantum gates so that non-viable physical configurations interfere destructively while optimal solutions interfere constructively, algorithms concentrate probability into desired measurement outcomes.',
    flow: ['MANY COMPUTATIONAL PATHS', 'INTERFERENCE', 'USEFUL INFORMATION AMPLIFIED'],
    classicalVsQuantum: {
      classicalLabel: 'Classical Search & Filtering',
      classicalDesc: 'Exhaustive branching, pruning, or stochastic filtering across vast parameter spaces.',
      quantumLabel: 'Phase-Engineered Amplification',
      quantumDesc: 'Unfavorable states cancel destructively (∑ a_err → 0); optimal candidates amplify (∑ a_opt → 1).',
      complexity: { classical: 'Linear or combinatorial cost', quantum: 'Polynomial / quadratic amplitude boost' }
    },
    mathFormula: {
      latex: 'P(x) = | ∑ⱼ Aⱼ e^{i θⱼ} |²   [ Destructive: ∑ → 0, Constructive: ∑ → 1 ]',
      sublabel: 'Path amplitude summation concentrating probability into optimal solution states'
    },
  },
  {
    id: 'phase',
    num: '05',
    advantage: 'SPECTRAL & EIGENVALUE ANALYSIS',
    property: 'QUANTUM PHASE',
    accent: {
      primary: '#0c8fce',
      border: 'border-[#9f04c3]/30 hover:border-[#0c8fce]/70',
      bg: 'rgba(12, 143, 206, 0.05)',
      text: 'text-[#38bdf8]',
      glow: 'rgba(159, 4, 195, 0.25)',
      badgeBg: 'bg-[#0c8fce]/10 text-[#38bdf8] border-[#0c8fce]/30',
    },
    shortDescription: 'Quantum phase can encode eigenvalue, frequency and dynamical information, enabling algorithms to extract spectral properties of mathematical operators.',
    microcopy: 'Extract operator eigenvalues, resonant frequencies, and modal stability directly.',
    engineeringRelevance: 'Relevant to structural modal analysis, hydrodynamic stability analysis, aero-acoustics, vibration isolation, and operator-based PDE simulation methods.',
    howItWorks: 'Unitary evolution operators transform eigenstates by multiplying them by phase factors e^{i λ t}. Quantum Phase Estimation (QPE) uses auxiliary registers and inverse Quantum Fourier Transforms to project continuous eigenvalues directly into binary register outputs.',
    flow: ['ENGINEERING OPERATOR', 'QUANTUM PHASE', 'SPECTRAL INFORMATION'],
    classicalVsQuantum: {
      classicalLabel: 'Classical Eigenvalue Extraction',
      classicalDesc: 'Krylov subspace, Lanczos, and Arnoldi iterations on large sparse stiffness matrices [K - ω²M].',
      quantumLabel: 'Quantum Phase Estimation',
      quantumDesc: 'Operator eigenvalues mapped directly to phase angles and measured via Quantum Fourier Transform.',
      complexity: { classical: 'O(N² ~ N³) iterative matrix passes', quantum: 'Polynomial in precision & operator depth' }
    },
    mathFormula: {
      latex: 'U |uₖ⟩ = e^{2πi \\phiₖ} |uₖ⟩  ⟶  QPE yields binary representation of \\phiₖ',
      sublabel: 'Direct mapping of operator eigenfrequencies into quantum phase observables'
    },
  },
  {
    id: 'amplitude-estimation',
    num: '06',
    advantage: 'REDUCED SAMPLING COMPLEXITY',
    property: 'QUANTUM AMPLITUDE ESTIMATION',
    accent: {
      primary: '#ffc21c',
      border: 'border-[#ffc21c]/30 hover:border-[#ffc21c]/70',
      bg: 'rgba(255, 194, 28, 0.05)',
      text: 'text-[#ffc21c]',
      glow: 'rgba(255, 194, 28, 0.25)',
      badgeBg: 'bg-[#ffc21c]/10 text-[#ffc21c] border-[#ffc21c]/30',
    },
    shortDescription: 'Quantum amplitude estimation can reduce the number of samples required to estimate probabilities, expectation values and statistical quantities under suitable conditions.',
    microcopy: 'Estimate statistical quantities with fewer samples under suitable conditions.',
    engineeringRelevance: 'Potentially useful for uncertainty quantification (UQ), stochastic aerodynamic simulation, fatigue lifetime prediction, and risk assessment.',
    howItWorks: 'While classical Monte Carlo methods require O(1/ε²) runs to estimate an integral or expected value within precision ε, Quantum Amplitude Estimation (QAE) leverages Grover-like operator rotations to achieve O(1/ε) sample complexity, yielding a quadratic reduction in necessary evaluations.',
    flow: ['STATISTICAL QUANTITY', 'QUANTUM AMPLITUDE ESTIMATION', 'FEWER REQUIRED SAMPLES'],
    classicalVsQuantum: {
      classicalLabel: 'Classical Monte Carlo (UQ)',
      classicalDesc: 'Requires N ≈ O(1/ε²) independent solver evaluations to achieve accuracy ε (e.g., 1,000,000 runs).',
      quantumLabel: 'Quantum Amplitude Estimation',
      quantumDesc: 'Reduces sample queries to N ≈ O(1/ε) through coherent amplitude rotation (e.g., 1,000 queries).',
      complexity: { classical: 'O(1/ε²) sample evaluations', quantum: 'O(1/ε) coherent queries' }
    },
    mathFormula: {
      latex: 'N_{classical} = O( 1 / ε² )   vs   N_{quantum} = O( 1 / ε )',
      sublabel: 'Quadratic reduction in sampling evaluations for precision ε'
    },
  },
];

export default function QuantumSection() {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="quantum"
      className="relative py-28 bg-[#040409] text-[#fbfbff] overflow-hidden border-t border-[#01c8f3]/15"
    >
      {/* Precision Engineering Background Grid & Gradients */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(3, 207, 244, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(3, 207, 244, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(3,207,244,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(159,4,195,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================================================== */}
        {/* SECTION HEADER                                     */}
        {/* ================================================== */}
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xs border border-[#03cff4]/30 bg-[#03cff4]/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#03cff4] animate-pulse" />
            <span className="font-mono text-sm sm:text-base font-bold text-[#03cff4] tracking-[0.2em] uppercase">
              QUANTUM COMPUTATIONAL ADVANTAGE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#fbfbff] tracking-tight leading-[1.15] mb-5">
            WHAT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#03cff4] via-[#0c8fce] to-[#38bdf8]">QUANTUM</span> BRINGS <br className="hidden sm:inline" />
            TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#03cff4] via-[#38bdf8] to-[#0c8fce]">ENGINEERING SIMULATION</span>
          </h2>

          <p className="text-lg sm:text-xl text-[#fbfbff]/90 font-medium leading-relaxed">
            Computational advantages enabled by the fundamental properties of quantum mechanics.
          </p>
        </div>

        {/* ================================================== */}
        {/* 6 INTERACTIVE ADVANTAGE CARDS                      */}
        {/* ================================================== */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantageData.map((item) => {
              const isExpanded = !!expandedCards[item.id];

              return (
                <div
                  key={item.id}
                  onClick={() => toggleExpand(item.id)}
                  style={{
                    boxShadow: isExpanded
                      ? `0 0 24px ${item.accent.glow}`
                      : undefined,
                  }}
                  className={`relative p-6 rounded-sm transition-all duration-300 cursor-pointer flex flex-col justify-between border ${isExpanded
                      ? `bg-[#090713] ${item.accent.border.split(' ')[0]}  ring-1 ring-[#03cff4]/40`
                      : 'bg-[rgba(13,10,24,0.78)] border-[#01c8f3]/15 hover:border-[#01c8f3]/40 hover:bg-[#090713]/90'
                    }`}
                >
                  {/* Top corner technical bracket indicator */}
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#03cff4]/30" />

                  <div>
                    {/* Quantum Property Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold px-3 py-1 rounded border border-slate-700/80 bg-slate-800/70 text-slate-200 uppercase tracking-wider">
                        <Atom size={14} className="flex-shrink-0 text-slate-400" />
                        POWERED BY: {item.property}
                      </span>
                    </div>

                    {/* ADVANTAGE NAME: LARGEST TEXT */}
                    <h3 className="text-lg sm:text-xl font-black text-[#fbfbff] tracking-wide leading-snug mb-4 group-hover:text-[#03cff4] transition-colors">
                      {item.advantage}
                    </h3>
                  </div>

                  {/* Card Footer: How It Helps Accordion Trigger */}
                  <div className="pt-3 border-t border-[#01c8f3]/10 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={(e) => toggleExpand(item.id, e)}
                        className="font-mono text-xs sm:text-sm font-semibold text-[#03cff4] hover:text-white flex items-center gap-1 transition-colors py-1"
                      >
                        <span>{isExpanded ? 'HIDE HOW IT HELPS' : 'HOW IT HELPS'}</span>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>

                    {/* Expandable Accordion with technical details */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-[#01c8f3]/10 text-xs sm:text-sm flex flex-col gap-3 animate-fadeIn">
                        <div>
                          <span className="font-mono text-[10px] text-[#03cff4] uppercase font-bold tracking-wider block mb-1">
                            HOW IT WORKS:
                          </span>
                          <p className="text-[#fbfbff]/90 leading-relaxed font-normal">
                            {item.howItWorks}
                          </p>
                        </div>

                        <div>
                          <span className="font-mono text-[10px] text-[#38bdf8] uppercase font-bold tracking-wider block mb-1">
                            ENGINEERING RELEVANCE:
                          </span>
                          <p className="text-[#aaa8ba] leading-relaxed">
                            {item.engineeringRelevance}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================== */}
        {/* BOTTOM SUMMARY SECTION                             */}
        {/* ================================================== */}
        <div className="mb-12 pt-12 border-t border-[#01c8f3]/20">

          {/* Heading for Computational Pipeline */}
          <div className="mb-8">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
              Quantum <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#03cff4] to-[#0c8fce]">Computational Pathway</span>
            </h3>
          </div>

          {/* 4 Outcome Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Block 1 */}
            <div className="p-5 rounded-sm bg-[rgba(13,10,24,0.78)] border border-[#01c8f3]/20 hover:border-[#03cff4]/50 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded bg-[#03cff4]/10 border border-[#03cff4]/30 flex items-center justify-center text-[#03cff4]">
                  <Layers size={15} />
                </div>
                <span className="font-mono text-xs sm:text-sm font-bold text-[#03cff4] tracking-widest">
                  01 REPRESENT
                </span>
              </div>
              <h5 className="font-bold text-white text-base sm:text-lg mb-1">
                State Spaces
              </h5>
              <p className="text-sm sm:text-base text-[#aaa8ba] leading-relaxed">
                High-dimensional engineering state spaces and discretized finite-volume vectors encoded natively into Hilbert space.
              </p>
            </div>

            {/* Block 2 */}
            <div className="p-5 rounded-sm bg-[rgba(13,10,24,0.78)] border border-[#01c8f3]/20 hover:border-[#0c8fce]/50 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded bg-[#0c8fce]/10 border border-[#0c8fce]/30 flex items-center justify-center text-[#0c8fce]">
                  <Cpu size={15} />
                </div>
                <span className="font-mono text-xs sm:text-sm font-bold text-[#0c8fce] tracking-widest">
                  02 PROCESS
                </span>
              </div>
              <h5 className="font-bold text-white text-base sm:text-lg mb-1">
                Encoded States
              </h5>
              <p className="text-sm sm:text-base text-[#aaa8ba] leading-relaxed">
                Encoded states transformed synchronously through quantum unitary operations and parameterized physical circuits.
              </p>
            </div>

            {/* Block 3 */}
            <div className="p-5 rounded-sm bg-[rgba(13,10,24,0.78)] border border-[#01c8f3]/20 hover:border-[#9f04c3]/50 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded bg-[#9f04c3]/10 border border-[#9f04c3]/30 flex items-center justify-center text-[#9f04c3]">
                  <Activity size={15} />
                </div>
                <span className="font-mono text-xs sm:text-sm font-bold text-[#9f04c3] tracking-widest">
                  03 EXTRACT
                </span>
              </div>
              <h5 className="font-bold text-white text-base sm:text-lg mb-1">
                Spectral & Statistical
              </h5>
              <p className="text-sm sm:text-base text-[#aaa8ba] leading-relaxed">
                Useful spectral modes, resonant eigenvalues, and statistical uncertainty quantities extracted with reduced sample complexity.
              </p>
            </div>

            {/* Block 4 */}
            <div className="p-5 rounded-sm bg-[rgba(13,10,24,0.78)] border border-[#01c8f3]/20 hover:border-[#ffc21c]/50 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded bg-[#ffc21c]/10 border border-[#ffc21c]/30 flex items-center justify-center text-[#ffc21c]">
                  <Zap size={15} />
                </div>
                <span className="font-mono text-xs sm:text-sm font-bold text-[#ffc21c] tracking-widest">
                  04 OPTIMIZE
                </span>
              </div>
              <h5 className="font-bold text-white text-base sm:text-lg mb-1">
                Engineering Workflows
              </h5>
              <p className="text-sm sm:text-base text-[#aaa8ba] leading-relaxed">
                Complex engineering workflows, aerodynamic geometries, and multiphysics design spaces optimized with hybrid classical co-design.
              </p>
            </div>

          </div>

        </div>



      </div>
    </section>
  );
}
