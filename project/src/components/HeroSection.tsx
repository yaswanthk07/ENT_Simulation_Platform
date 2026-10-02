import { ChevronDown } from 'lucide-react';


export default function HeroSection() {
  const scrollDown = () => {
    const el = document.getElementById('bottleneck') || document.getElementById('platform');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="hero relative min-h-screen flex flex-col justify-between overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 750px 500px at 46% 22%, rgba(145, 218, 255, 0.42) 0%, rgba(145, 218, 255, 0) 70%),
          radial-gradient(circle at 76% 54%, rgba(0, 160, 230, 0.16) 0%, rgba(0, 40, 90, 0) 60%),
          linear-gradient(
            100deg,
            #FCFCFD 0%,
            #F5FAFE 16%,
            #DEF1FE 28%,
            #C2E5FD 36%,
            #78BEF4 44%,
            #2D87DC 51%,
            #1261B4 58%,
            #03458D 66%,
            #003474 76%,
            #002656 86%,
            #011B40 94%,
            #011430 100%
          )
        `,
      }}
    >
      {/* ========================================================================= */}
      {/* CONTINUOUS ADAPTIVE ENGINEERING GRID BACKGROUND                           */}
      {/* ========================================================================= */}

      {/* 1. Light area engineering grid (Pale-blue lines on light background) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 145, 225, 0.16) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 145, 225, 0.16) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 34%, rgba(0,0,0,0) 54%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 34%, rgba(0,0,0,0) 54%)',
        }}
      />

      {/* 2. Dark area engineering grid (Luminous cyan lines on dark background) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 215, 255, 0.22) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 215, 255, 0.22) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 38%, rgba(0,0,0,0.7) 54%, rgba(0,0,0,1) 100%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 38%, rgba(0,0,0,0.7) 54%, rgba(0,0,0,1) 100%)',
        }}
      />


      {/* ========================================================================= */}
      {/* FLOATING HUD LABELS (Matching Reference Layout & Badges)                  */}
      {/* ========================================================================= */}

      {/* Left / Light Side Badges */}
      {/*
      <div 
        className="hud-badge absolute top-[19%] left-[7.2%] bg-white/85 border border-[#00B4E6]/30 text-[#002B55] shadow-sm backdrop-blur-sm pointer-events-none z-20 hidden md:block"
      >
        VELOCITY
      </div>
      <div 
        className="hud-badge absolute top-[24.5%] left-[8.8%] bg-white/85 border border-[#00B4E6]/30 text-[#002B55] shadow-sm backdrop-blur-sm pointer-events-none z-20 hidden md:block"
      >
        ITERATION
      </div>
      <div 
        className="hud-badge absolute top-[27.5%] left-[29.2%] bg-white/85 border border-[#00B4E6]/30 text-[#002B55] shadow-sm backdrop-blur-sm pointer-events-none z-20 hidden lg:block"
      >
        PRESSURE
      </div>
      <div 
        className="hud-badge absolute top-[41.2%] left-[40.2%] bg-white/85 border border-[#00B4E6]/30 text-[#002B55] shadow-sm backdrop-blur-sm pointer-events-none z-20 hidden lg:block"
      >
        TEMPERATURE
      </div>*/}

      {/* ========================================================================= */}
      {/* MAIN HERO CONTENT (Responsive CSS Grid)                                   */}
      {/* ========================================================================= */}
      <div className="relative z-10 flex-1 w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 sm:pt-28 pb-16 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 w-full items-center">

          {/* --------------------------------------------------------------------- */}
          {/* LEFT ZONE: Branding & Content (7 Cols)                                */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center text-left min-w-0 max-w-2xl xl:max-w-3xl">

            {/* Prominent ENTangle Logo */}
            <div className="hero-logo mb-4 sm:mb-5 lg:mb-6 max-w-full">
              <h1 className="sr-only">ENTangle — Quantum Engineering Simulation Platform</h1>
              <img
                src="./assets/images/entangle_logo.png"
                alt="ENTangle"
                className="h-16 sm:h-20 md:h-24 lg:h-26 xl:h-28 2xl:h-32 w-auto max-w-full object-contain filter drop-shadow-sm"
              />
            </div>

            {/* Slogan */}
            <p className="hero-tagline text-[#002B55] text-lg sm:text-xl md:text-2xl lg:text-[1.65rem] xl:text-[1.85rem] leading-tight font-bold tracking-tight mb-7 sm:mb-8 max-w-2xl">
              Quantum Engineering Simulation Platform
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row flex-wrap gap-3.5 sm:gap-4 mb-8 sm:mb-9 max-w-full">
              {/* Button 1: EXPLORE PLATFORM (White with cyan text) */}
              <button
                onClick={scrollDown}
                className="flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-sm bg-white text-[#00B4E6] border border-[#CDE5F6] font-bold text-sm sm:text-base tracking-wider transition-all duration-200 shadow-[0_2px_12px_rgba(0,50,110,0.1)] hover:bg-[#F8FCFF] hover:border-[#00B4E6]/60 hover:-translate-y-0.5"
              >
                EXPLORE PLATFORM
              </button>

              {/* Button 2: Start Free Trial (Cyan filled with white text) */}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=info@enginuvitynexus.com&su=Start%20Free%20Trial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-sm bg-[#00B4E6] hover:bg-[#00A2D2] text-white font-bold text-sm sm:text-base tracking-wider transition-all duration-200 shadow-[0_4px_18px_rgba(0,180,230,0.4)] hover:shadow-[0_6px_22px_rgba(0,180,230,0.55)] hover:-translate-y-0.5"
              >
                Start Free Trial
              </a>
            </div>

            {/* 3 Key Value Blocks (ENT Dark Navy: #002B55) */}
            <div className="hero-stats grid grid-cols-1 sm:grid-cols-3 gap-5 xl:gap-8 pt-6 w-full max-w-2xl">
              <div className="hero-stat min-w-0">
                <div className="text-2xl sm:text-3xl font-black text-[#002B55] tracking-tight leading-none">
                  EXPLORE
                </div>
                <div className="hero-stat-description text-sm sm:text-[15px] text-[#1E3A5A] mt-2 font-medium leading-snug">
                  Larger design spaces
                </div>
              </div>

              <div className="hero-stat min-w-0">
                <div className="text-2xl sm:text-3xl font-black text-[#002B55] tracking-tight leading-none">
                  OPTIMIZE
                </div>
                <div className="hero-stat-description text-sm sm:text-[15px] text-[#1E3A5A] mt-2 font-medium leading-snug">
                  Complex engineering systems
                </div>
              </div>

              <div className="hero-stat min-w-0">
                <div className="text-2xl sm:text-3xl font-black text-[#002B55] tracking-tight leading-none">
                  ACCELERATE
                </div>
                <div className="hero-stat-description text-sm sm:text-[15px] text-[#1E3A5A] mt-2 font-medium leading-snug break-words">
                  Compute-intensive subproblems
                </div>
              </div>
            </div>

            {/* Disclaimer Line with Cyan Accent */}
            <div className="mt-8 max-w-2xl">
              <p className="hero-disclaimer text-xs sm:text-sm lg:text-[0.95rem] text-[#1E3A5A] leading-relaxed font-normal border-l-2 border-[#00B4E6] pl-3.5">
                ENTangle is currently a research-stage initiative. The features shown on this website represent our planned development roadmap and conceptual framework.
              </p>
            </div>

          </div>

          {/* --------------------------------------------------------------------- */}
          {/* RIGHT ZONE: Submarine Visualization & Circular HUD Frame (5 Cols)     */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center relative min-w-0 py-6 lg:py-0">
            <div className="relative aspect-square w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[480px] xl:max-w-[520px] mx-auto flex items-center justify-center">

              {/* Corner HUD coordinate brackets */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#00B4E6] pointer-events-none" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#00B4E6] pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#00B4E6] pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#00B4E6] pointer-events-none" />

              {/* Ring 1: Primary Outer concentric circular ring with 4 glowing nodes */}
              <div
                className="absolute inset-3 sm:inset-4 rounded-full border border-[#00B4E6]/50 pointer-events-none"
                style={{ animation: 'spin 55s linear infinite' }}
              >
                {/* 4 glowing nodes along circle matching reference */}
                <span className="absolute top-1/4 -right-1 w-2 h-2 bg-white rounded-full shadow-[0_0_8px_#00E5FF,0_0_14px_#00B4E6]" />
                <span className="absolute top-1/2 -left-1 w-2 h-2 bg-white rounded-full shadow-[0_0_8px_#00E5FF,0_0_14px_#00B4E6]" />
                <span className="absolute bottom-1/4 left-8 w-2 h-2 bg-white rounded-full shadow-[0_0_8px_#00E5FF,0_0_14px_#00B4E6]" />
                <span className="absolute top-1/4 left-8 w-2 h-2 bg-white rounded-full shadow-[0_0_8px_#00E5FF,0_0_14px_#00B4E6]" />
              </div>

              {/* Ring 2: Primary Inner concentric circular ring */}
              <div
                className="absolute inset-10 sm:inset-12 rounded-full border border-[#00B4E6]/25 pointer-events-none"
                style={{ animation: 'spin 45s linear infinite reverse' }}
              />

              {/* Ambient cyan glow behind submarine model */}
              <div className="absolute inset-16 bg-[#00B4E6]/12 rounded-full blur-3xl pointer-events-none" />

              {/* Submarine simulation video animation */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full max-w-[460px] object-contain pointer-events-none"
                  style={{
                    filter:
                      'grayscale(100%) brightness(190%) contrast(110%) drop-shadow(0 0 8px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 22px rgba(0, 229, 255, 0.3)) drop-shadow(0 0 45px rgba(0, 180, 230, 0.15))',
                    mixBlendMode: 'screen',
                  }}
                >
                  <source src="./assets/ENT_animation_video.webm" type="video/webm" />
                  <source src="./assets/ENT_animation_video.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Translucent Dark Navy HUD Badges (Matching Reference Positions) */}
              <div className="hud-badge absolute top-[18%] -left-3 bg-[#001D3D]/85 border border-[#00E5FF]/45 text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.22)] backdrop-blur-sm pointer-events-none z-20">
                TEMPERATURE
              </div>
              <div className="hud-badge absolute top-1/4 -right-2 bg-[#001D3D]/85 border border-[#00E5FF]/45 text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.22)] backdrop-blur-sm pointer-events-none z-20">
                STRESS
              </div>
              <div className="hud-badge absolute bottom-[28%] -right-1 bg-[#001D3D]/85 border border-[#00E5FF]/45 text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.22)] backdrop-blur-sm pointer-events-none z-20">
                MESH
              </div>
              <div className="hud-badge absolute bottom-[18%] left-4 bg-[#001D3D]/85 border border-[#00E5FF]/45 text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.22)] backdrop-blur-sm pointer-events-none z-20">
                SOLVER
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM CENTER: Explore Platform Anchor                                    */}
      {/* ========================================================================= */}
      <button
        onClick={scrollDown}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/90 hover:text-[#00E5FF] transition-colors duration-300 z-30 group"
        aria-label="Scroll to explore platform"
      >
        <span className="font-mono text-xs tracking-[0.2em] uppercase font-semibold text-white/90 group-hover:text-[#00E5FF] transition-colors">
          EXPLORE PLATFORM
        </span>
        <ChevronDown size={18} className="animate-bounce text-[#00B4E6]" />
      </button>
    </section>
  );
}
