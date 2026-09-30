import { ChevronDown } from 'lucide-react';

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


            <div className="mb-6">
              <h1 className="sr-only">ENTangle</h1>
              <img
                src="./assets/images/entangle_logo.png"
                alt="ENTangle"
                className="h-14 sm:h-20 lg:h-24 w-auto object-contain drop-shadow-[0_0_25px_rgba(1,200,243,0.2)]"
              />
            </div>

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
                <div className="text-base sm:text-lg xl:text-xl text-slate-300 mt-1 font-sans font-normal">larger design spaces</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl xl:text-3xl font-black text-gradient-cyan tracking-tight">OPTIMIZE</div>
                <div className="text-base sm:text-lg xl:text-xl text-slate-300 mt-1 font-sans font-normal">complex engineering systems</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl xl:text-3xl font-black text-gradient-cyan tracking-tight">ACCELERATE</div>
                <div className="text-base sm:text-lg xl:text-xl text-slate-300 mt-1 font-sans font-normal">compute-intensive subproblems</div>
              </div>
            </div>

            {/* Research initiative disclaimer */}
            <p className="text-sm sm:text-base text-slate-400 mt-6 leading-relaxed font-normal border-l-2 border-brand-cyan/40 pl-3">
              ENTangle is currently a research-stage initiative. The features shown on this website represent our planned development roadmap and conceptual framework.
            </p>
          </div>

          {/* Right: 3D Visualization (5 cols) */}
          <div className="lg:col-span-5 xl:col-span-5 relative flex items-center justify-center">
            <div className="relative aspect-square w-full max-w-lg mx-auto">
              {/* Outer rings */}
              <div className="absolute inset-0 rounded-full border border-brand-cyan/20 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-brand-cobalt/20" style={{ animation: 'spin 14s linear infinite reverse' }} />

              {/* Video visualization */}
              <div className="absolute inset-6 rounded-lg overflow-hidden flex items-center justify-center">
                <video
                  src="./assets/ENT_website_animation_video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain mix-blend-screen pointer-events-none"
                  style={{
                    mixBlendMode: 'screen',
                    filter: 'hue-rotate(65deg) brightness(1.2) contrast(1.1)',
                  }}
                >
                  <source src="./assets/ENT_website_animation_video.mp4" type="video/mp4" />
                  <source src="./ENT_website_animation_video.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Corner brackets */}
              <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-brand-cyan/70 pointer-events-none" />
              <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-brand-cyan/70 pointer-events-none" />
              <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-brand-cyan/70 pointer-events-none" />
              <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-brand-cyan/70 pointer-events-none" />
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
