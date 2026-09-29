import { useEffect, useRef, useState } from 'react';
import { Compass, Gauge, ShieldCheck, Brain, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface OtherServiceItem {
  id: string;
  tag: string;
  badge: string;
  title: string;
  icon: React.ElementType;
  paragraphs: string[];
  capabilities: string[];
}

const OTHER_SERVICES: OtherServiceItem[] = [
  {
    id: 'engineering-design',
    tag: 'SERVICE 01',
    badge: 'CAD / CAE & DIGITAL TWIN',
    title: 'Engineering Design & Digital Engineering',
    icon: Compass,
    paragraphs: [
      'Transform concepts into optimized engineering designs using CAD/CAE, parametric modelling, digital twins, and system-level design tools.',
      'Support performance prediction, design optimization, and design-for-manufacturing to improve efficiency and product readiness.',
    ],
    capabilities: [
      'Parametric 3D CAD/CAE Modeling',
      'High-Fidelity Digital Twins',
      'Design-for-Manufacturing (DFM)',
      'System-Level Performance Optimization',
    ],
  },
  {
    id: 'experimental-testing',
    tag: 'SERVICE 02',
    badge: 'RIG TESTING & CALIBRATION',
    title: 'Experimental Model Testing & Validation',
    icon: Gauge,
    paragraphs: [
      'Validate engineering designs through scale-model, hydrodynamic, propulsion, cavitation, thermal, and performance testing.',
      'Integrate instrumentation and experimental data with CFD results to verify accuracy and strengthen simulation confidence.',
    ],
    capabilities: [
      'Scale-Model & Towing Tank Testing',
      'Hydrodynamic, Cavitation & Propulsion',
      'Thermal & Flow Field Instrumentation',
      'CFD Correlation & Validation Rigs',
    ],
  },
  {
    id: 'advanced-consultancy',
    tag: 'SERVICE 03',
    badge: 'STRATEGIC R&D & TRL ANALYSIS',
    title: 'Advanced Engineering Consultancy & Technology Development',
    icon: ShieldCheck,
    paragraphs: [
      'Provide engineering consultancy, feasibility studies, technology assessment, troubleshooting, R&D support, and root-cause analysis.',
      'Support prototype development, technology development, and technology-readiness evaluation from early concepts to practical implementation.',
    ],
    capabilities: [
      'Engineering Feasibility & Risk Studies',
      'Root-Cause Failure & Forensic Analysis',
      'TRL Technology-Readiness Roadmap',
      'Custom Prototype Development',
    ],
  },
  {
    id: 'ai-/-ml',
    tag: 'SERVICE 04',
    badge: 'SURROGATE AI & HPC ORCHESTRATION',
    title: 'AI/ML-Driven Simulation, Optimization & Advanced Computing',
    icon: Brain,
    paragraphs: [
      'Use AI/ML-assisted CFD, surrogate models, reduced-order modelling, and automated workflows to accelerate simulation and design exploration.',
      'Combine design optimization, HPC, simulation automation, and quantum-classical computing for advanced engineering analysis.',
    ],
    capabilities: [
      'AI/ML Neural Surrogate Operators',
      'Reduced-Order Modeling (ROM)',
      'Automated Pareto Design Exploration',
      'Hybrid HPC & Quantum-Classical Compute',
    ],
  },
];

export default function OtherServicesSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="other-services"
      ref={sectionRef}
      className="relative py-24 bg-bg-secondary overflow-hidden border-t border-border-subtle"
    >
      {/* Background aesthetics matching platform style */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(3,207,244,0.07)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block px-3.5 py-1 border border-brand-cyan/30 rounded-sm bg-brand-cyan/10 mb-3">
            <span className="font-mono text-xs font-bold text-brand-cyan tracking-[0.2em] uppercase">
              OTHER SERVICES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            COMPREHENSIVE ENGINEERING &amp;{' '}
            <span className="text-gradient-cyan">TECHNOLOGY SOLUTIONS</span>
          </h2>
        </div>

        {/* 2x2 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {OTHER_SERVICES.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                id={service.id}
                className={`group relative rounded-sm bg-bg-card/80 backdrop-blur-sm border border-border-subtle p-7 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:border-brand-cyan/50 hover:shadow-[0_0_30px_rgba(3,207,244,0.12)] ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${150 + idx * 100}ms` }}
              >
                {/* Secondary anchor ID for URL compatibility (e.g. ai-ml) */}
                {service.id === 'ai-/-ml' && <span id="ai-ml" className="sr-only" />}

                {/* Card Top Banner: Tag, Badge, Icon */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="w-11 h-11 rounded-sm bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan group-hover:scale-105 group-hover:bg-brand-cyan/20 group-hover:border-brand-cyan transition-all duration-300">
                      <IconComponent size={22} />
                    </div>

                    <div className="w-8 h-8 rounded-full border border-border-subtle flex items-center justify-center text-slate-400 group-hover:text-brand-cyan group-hover:border-brand-cyan/40 transition">
                      <ArrowUpRight size={15} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-brand-cyan transition duration-300 mb-4 tracking-tight leading-snug">
                    {service.title}
                  </h3>

                  {/* Paragraphs */}
                  <div className="space-y-3 mb-6">
                    {service.paragraphs.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-slate-300 text-sm sm:text-[15px] leading-relaxed font-normal"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Capabilities pills */}
                <div className="pt-5 border-t border-border-subtle/70 mt-2">
                  <div className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-brand-cyan" />
                    <span>CORE CAPABILITIES</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.capabilities.map((cap, cIdx) => (
                      <div
                        key={cIdx}
                        className="text-[12px] font-mono text-slate-300 bg-bg-primary/70 px-2.5 py-1 rounded border border-border-subtle/50 flex items-center gap-1.5 group-hover:border-brand-cyan/25 transition"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan/60 flex-shrink-0" />
                        <span className="truncate">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
