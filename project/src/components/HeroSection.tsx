import { ChevronDown } from 'lucide-react';

const statLabels = ['VELOCITY', 'PRESSURE', 'TEMPERATURE', 'STRESS', 'MESH', 'SOLVER', 'ITERATION'];

export default function HeroSection() {
  const scrollDown = () => {
    const el = document.getElementById('bottleneck') || document.getElementById('platform');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        backgroundColor: '#01172E',
        background: `
          linear-gradient(
            125deg,
            #EDF5FB 0%,
            #E2EFF8 18%,
            #A2CBE9 34%,
            #4E90CC 48%,
            #185B9A 62%,
            #083561 76%,
            #021E3C 90%,
            #01172E 100%
          )
        `,
      }}
    >
      {/* Background technical grid */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(14, 95, 140, 0.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14, 95, 140, 0.09) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Floating technical labels matching reference screenshot */}
      {statLabels.map((label, i) => {
        const topPercent = 14 + ((i * 12) % 65);
        const isUpper = i === 0 || i === 1 || i === 2 || i === 6; // VELOCITY, PRESSURE, TEMPERATURE, ITERATION
        return (
          <div
            key={label}
            className="absolute hidden sm:block pointer-events-none z-20"
            style={{
              left: `${6 + ((i * 14) % 84)}%`,
              top: `${topPercent}%`,
              animation: `particleFloat ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            <span
              className={`font-mono text-xs tracking-widest px-2.5 py-0.5 rounded transition-colors duration-300 ${
                isUpper
                  ? 'text-[#0A2235] font-bold bg-white/80 border border-[#0A2235]/15 shadow-sm backdrop-blur-sm'
                  : 'text-brand-cyan font-bold bg-[#061725]/85 border border-brand-cyan/40 backdrop-blur-sm shadow-[0_0_12px_rgba(1,200,243,0.15)]'
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}

      {/* Main content */}
      <div className="relative z-10 flex-1 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-12 gap-8 min-h-[calc(100vh-9rem)] items-center">

          {/* Left: Hero text (7 cols) */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
            <div className="mb-6">
              <h1 className="sr-only">ENTangle</h1>
              <img
                src="./assets/images/entangle_logo.png"
                alt="ENTangle"
                className="h-16 sm:h-20 lg:h-24 w-auto object-contain"
              />
            </div>

            <p className="text-[#0A2235] text-lg sm:text-xl leading-relaxed mb-9 max-w-2xl font-semibold">
              Setting the Platform for the Quantum Engineering Simulation
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={scrollDown}
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-sm text-base font-bold tracking-wider bg-white text-[#01C8F3] hover:bg-slate-50 transition-all duration-200 shadow-md"
              >
                EXPLORE PLATFORM
              </button>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=info@enginuvitynexus.com&su=Start%20Free%20Trial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-sm text-base font-bold tracking-wider text-white bg-[#01C8F3] hover:bg-[#00B4E0] transition-all duration-200 shadow-md"
              >
                Start Free Trial
              </a>
            </div>

            {/* Quick stats / Highlights */}
            <div className="grid grid-cols-3 gap-6 pt-7">
              <div>
                <div className="text-xl sm:text-2xl xl:text-3xl font-black text-brand-cyan tracking-tight">EXPLORE</div>
                <div className="text-base sm:text-lg xl:text-xl text-white mt-1 font-sans font-normal">larger design spaces</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl xl:text-3xl font-black text-brand-cyan tracking-tight">OPTIMIZE</div>
                <div className="text-base sm:text-lg xl:text-xl text-white mt-1 font-sans font-normal">complex engineering systems</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl xl:text-3xl font-black text-brand-cyan tracking-tight">ACCELERATE</div>
                <div className="text-base sm:text-lg xl:text-xl text-white mt-1 font-sans font-normal">compute-intensive subproblems</div>
              </div>
            </div>

            {/* Research initiative disclaimer */}
            <p className="text-sm sm:text-base text-white/90 mt-6 leading-relaxed font-normal border-l-2 border-brand-cyan pl-3">
              ENTangle is currently a research-stage initiative. The features shown on this website represent our planned development roadmap and conceptual framework.
            </p>
          </div>

          {/* Right: 3D Visualization (5 cols) */}
          <div className="lg:col-span-5 xl:col-span-5 relative flex items-center justify-center">
            <div className="relative aspect-square w-full max-w-lg xl:max-w-xl mx-auto flex items-center justify-center">
              {/* Corner brackets matching reference image */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-brand-cyan/80 pointer-events-none" />
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-brand-cyan/80 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-brand-cyan/80 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-brand-cyan/80 pointer-events-none" />

              {/* Outer circular HUD rings */}
              <div className="absolute inset-8 rounded-full border border-brand-cyan/50 animate-spin-slow pointer-events-none" />
              <div className="absolute inset-12 rounded-full border border-brand-cyan/20 pointer-events-none" />

              {/* Video visualization */}
              <div className="absolute inset-10 rounded-lg overflow-hidden flex items-center justify-center bg-transparent">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full max-w-[500px] object-contain pointer-events-none bg-transparent"
                  style={{
                    width: '100%',
                    height: '100%',
                    maxWidth: '500px',
                    objectFit: 'contain',
                    background: 'transparent',
                    display: 'block',
                  }}
                >
                  <source src="./ENT_animation_video.webm" type="video/webm" />
                  <source src="./ENT_animation_video.mov" type="video/quicktime" />
                  <source src="./assets/ENT_animation_video.webm" type="video/webm" />
                  <source src="./assets/ENT_animation_video.mov" type="video/quicktime" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/80 hover:text-brand-cyan transition-colors duration-300 z-20"
      >
        <span className="font-mono text-xs tracking-widest uppercase font-semibold">EXPLORE PLATFORM</span>
        <ChevronDown size={18} className="animate-bounce text-brand-cyan" />
      </button>
    </section>
  );
}
