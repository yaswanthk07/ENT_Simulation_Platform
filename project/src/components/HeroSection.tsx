import { ChevronDown } from 'lucide-react';

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

      {/* Decorative technical HUD labels in dedicated safe zones */}
      <div className="hero-hud-labels" aria-hidden="true">
        <span className="hud-label hud-label-light hud-velocity">VELOCITY</span>
        <span className="hud-label hud-label-light hud-iteration">ITERATION</span>
        <span className="hud-label hud-label-light hud-pressure">PRESSURE</span>
        <span className="hud-label hud-label-dark hud-temperature">TEMPERATURE</span>
        <span className="hud-label hud-label-dark hud-stress">STRESS</span>
        <span className="hud-label hud-label-dark hud-mesh">MESH</span>
        <span className="hud-label hud-label-dark hud-solver">SOLVER</span>
      </div>

      {/* Main content */}
      <div className="hero-content relative z-10 flex-1 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-12 gap-8 min-h-[calc(100vh-9rem)] items-center">

          {/* Left: Hero text (7 cols) */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
            <div className="hero-logo mb-5 sm:mb-6 lg:mb-7 relative z-10">
              <h1 className="sr-only">ENTangle — Quantum Engineering Simulation Platform</h1>
              <img
                src="./assets/images/entangle_logo.png"
                alt="ENTangle"
                className="h-[72px] sm:h-24 md:h-[108px] lg:h-[132px] xl:h-36 2xl:h-[156px] w-auto max-w-full object-contain"
              />
            </div>

            <p className="hero-tagline text-[#082847] text-lg sm:text-xl md:text-2xl lg:text-[1.75rem] xl:text-[1.95rem] leading-tight font-bold tracking-tight mb-8 sm:mb-9 max-w-2xl relative z-10">
              Quantum Engineering Simulation Platform
            </p>

            <div className="hero-buttons flex flex-col sm:flex-row gap-4 mb-9 sm:mb-11 relative z-10">
              <button
                onClick={scrollDown}
                className="flex items-center justify-center gap-3 px-8 sm:px-9 py-4 sm:py-4.5 rounded-sm text-base sm:text-lg font-bold tracking-wider bg-white text-[#01C8F3] hover:bg-slate-50 transition-all duration-200 shadow-md"
              >
                EXPLORE PLATFORM
              </button>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=info@enginuvitynexus.com&su=Start%20Free%20Trial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 sm:px-9 py-4 sm:py-4.5 rounded-sm text-base sm:text-lg font-bold tracking-wider text-white bg-[#01C8F3] hover:bg-[#00B4E0] transition-all duration-200 shadow-md"
              >
                Start Free Trial
              </a>
            </div>

            {/* Quick stats / Highlights */}
            <div className="hero-stats grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 relative z-10">
              <div>
                <div className="text-2xl sm:text-3xl lg:text-[1.85rem] xl:text-[2.2rem] font-black text-brand-cyan tracking-tight leading-none">EXPLORE</div>
                <div className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/95 mt-2 font-sans font-medium leading-snug">larger design spaces</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-[1.85rem] xl:text-[2.2rem] font-black text-brand-cyan tracking-tight leading-none">OPTIMIZE</div>
                <div className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/95 mt-2 font-sans font-medium leading-snug">complex engineering systems</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-[1.85rem] xl:text-[2.2rem] font-black text-brand-cyan tracking-tight leading-none">ACCELERATE</div>
                <div className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/95 mt-2 font-sans font-medium leading-snug">compute-intensive subproblems</div>
              </div>
            </div>

            {/* Research initiative disclaimer */}
            <p className="hero-disclaimer text-sm sm:text-base lg:text-[1.05rem] text-white/90 mt-7 sm:mt-8 leading-relaxed font-normal border-l-2 border-brand-cyan pl-3.5 max-w-2xl relative z-10">
              ENTangle is currently a research-stage initiative. The features shown on this website represent our planned development roadmap and conceptual framework.
            </p>
          </div>

          {/* Right: 3D Visualization (5 cols) */}
          <div className="engineering-visual lg:col-span-5 xl:col-span-5 relative z-10 flex items-center justify-center">
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
