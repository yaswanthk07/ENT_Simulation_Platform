import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const scrollDown = () => {
    const el = document.getElementById('bottleneck') || document.getElementById('platform');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#070C18]">
      
      {/* ========================================================================= */}
      {/* STRICT DUAL-PANEL LAYOUT: hero-left (55%) & hero-right (45%)               */}
      {/* ========================================================================= */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row w-full min-h-screen">
        
        {/* ======================================================================= */}
        {/* LEFT SIDE: Light background (#F4F8FB), strictly contained               */}
        {/* ======================================================================= */}
        <div className="hero-left relative w-full lg:w-[55%] lg:max-w-[55%] min-w-0 bg-[#F4F8FB] overflow-hidden flex flex-col justify-center pt-24 sm:pt-28 pb-16 lg:pb-20 px-6 sm:px-10 lg:pl-12 lg:pr-8 xl:pl-16 xl:pr-12 2xl:pl-24 2xl:pr-16 border-b lg:border-b-0 lg:border-r border-[#01C8F3]/25">
          
          {/* Subtle technical grid overlay for light background */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-45"
            style={{
              backgroundImage: `
                linear-gradient(rgba(11, 35, 64, 0.065) 1px, transparent 1px),
                linear-gradient(90deg, rgba(11, 35, 64, 0.065) 1px, transparent 1px)
              `,
              backgroundSize: '54px 54px',
            }}
          />

          {/* Content wrapper strictly contained inside hero-left */}
          <div className="hero-content relative z-20 w-full max-w-[620px] xl:max-w-[680px] mx-auto lg:mx-0 flex flex-col justify-center min-w-0">
            
            {/* Prominent ENTangle Logo */}
            <div className="hero-logo mb-4 sm:mb-5 lg:mb-6 max-w-full">
              <h1 className="sr-only">ENTangle — Quantum Engineering Simulation Platform</h1>
              <img
                src="./assets/images/entangle_logo.png"
                alt="ENTangle"
                className="h-14 sm:h-20 md:h-24 lg:h-28 xl:h-32 2xl:h-36 w-auto max-w-full object-contain filter drop-shadow-sm"
              />
            </div>

            {/* Slogan */}
            <p className="hero-tagline text-[#07192F] text-lg sm:text-xl md:text-2xl lg:text-[1.65rem] xl:text-[1.85rem] leading-tight font-bold tracking-tight mb-8 sm:mb-9 max-w-full">
              Quantum Engineering Simulation Platform
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row flex-wrap gap-3.5 sm:gap-4 mb-9 sm:mb-10 max-w-full">
              {/* Button 1: EXPLORE PLATFORM */}
              <button
                onClick={scrollDown}
                className="flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded bg-white text-[#0A2540] hover:text-[#01C8F3] border border-[#CBDCE9] font-bold text-sm sm:text-base tracking-wider transition-all duration-200 shadow-[0_2px_10px_rgba(7,20,40,0.08)] hover:shadow-[0_4px_16px_rgba(1,200,243,0.2)] hover:-translate-y-0.5"
              >
                EXPLORE PLATFORM
              </button>

              {/* Button 2: Start Free Trial */}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=info@enginuvitynexus.com&su=Start%20Free%20Trial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded bg-[#01C8F3] hover:bg-[#00B4DC] text-white font-bold text-sm sm:text-base tracking-wider transition-all duration-200 shadow-[0_4px_16px_rgba(1,200,243,0.35)] hover:shadow-[0_6px_22px_rgba(1,200,243,0.5)] hover:-translate-y-0.5"
              >
                Start Free Trial
              </a>
            </div>

            {/* Dedicated Left-Only Divider Line & Key Value Blocks */}
            <div className="left-divider w-full max-w-full border-t border-[#D5E2EC] pt-6 sm:pt-7">
              <div className="hero-stats w-full max-w-full">
                
                {/* 1. EXPLORE */}
                <div className="hero-stat min-w-0 max-w-full overflow-hidden">
                  <div className="text-xl sm:text-2xl lg:text-[1.65rem] font-black text-[#07192F] tracking-tight leading-none">
                    EXPLORE
                  </div>
                  <div className="hero-stat-description text-sm sm:text-[15px] lg:text-base text-[#475E75] mt-2 font-medium leading-snug">
                    larger design spaces
                  </div>
                </div>

                {/* 2. OPTIMIZE */}
                <div className="hero-stat min-w-0 max-w-full overflow-hidden">
                  <div className="text-xl sm:text-2xl lg:text-[1.65rem] font-black text-[#07192F] tracking-tight leading-none">
                    OPTIMIZE
                  </div>
                  <div className="hero-stat-description text-sm sm:text-[15px] lg:text-base text-[#475E75] mt-2 font-medium leading-snug">
                    complex engineering systems
                  </div>
                </div>

                {/* 3. ACCELERATE */}
                <div className="hero-stat min-w-0 max-w-full overflow-hidden">
                  <div className="text-xl sm:text-2xl lg:text-[1.65rem] font-black text-[#07192F] tracking-tight leading-none">
                    ACCELERATE
                  </div>
                  <div className="hero-stat-description text-sm sm:text-[15px] lg:text-base text-[#475E75] mt-2 font-medium leading-snug">
                    compute-intensive subproblems
                  </div>
                </div>

              </div>
            </div>

            {/* Disclaimer Line (Strictly inside hero-left) */}
            <div className="mt-7 sm:mt-8 w-full max-w-full">
              <p className="hero-disclaimer w-full max-w-full text-xs sm:text-sm lg:text-[0.95rem] text-[#334E68] leading-relaxed font-normal border-l-2 border-[#01C8F3] pl-3.5">
                ENTangle is currently a research-stage initiative. The features shown on this website represent our planned development roadmap and conceptual framework.
              </p>
            </div>

          </div>
        </div>

        {/* ======================================================================= */}
        {/* RIGHT SIDE: Dark navy background (#070C18) & Simulation visualization   */}
        {/* ======================================================================= */}
        <div className="hero-right relative w-full lg:w-[45%] lg:max-w-[45%] min-w-0 bg-[#070C18] flex items-center justify-center pt-8 pb-16 lg:py-0 px-4 sm:px-6 lg:px-8 overflow-hidden">
          
          {/* Subtle technical grid overlay for dark background */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(rgba(1, 200, 243, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(1, 200, 243, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: '54px 54px',
            }}
          />

          {/* Ambient soft cyan glow behind visualization */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] bg-[#01C8F3]/6 blur-[120px] rounded-full pointer-events-none"
          />

          {/* Visualization (100% UNCHANGED) */}
          <div className="engineering-visual relative z-20 flex items-center justify-center w-full">
            <div className="relative aspect-square w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[480px] xl:max-w-[520px] mx-auto flex items-center justify-center">
              
              {/* Technical corner coordinate brackets */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-[#01C8F3]/50 pointer-events-none" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t border-r border-[#01C8F3]/50 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b border-l border-[#01C8F3]/50 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-[#01C8F3]/50 pointer-events-none" />

              {/* Concentric Circular HUD Ring 1 (Outer ring with cardinal indicators) */}
              <div 
                className="absolute inset-4 rounded-full border border-[#01C8F3]/30 pointer-events-none"
                style={{ animation: 'spin 45s linear infinite' }}
              >
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#01C8F3] rounded-full shadow-[0_0_6px_#01C8F3]" />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-[#01C8F3] rounded-full shadow-[0_0_6px_#01C8F3]" />
                <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#01C8F3] rounded-full shadow-[0_0_6px_#01C8F3]" />
                <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#01C8F3] rounded-full shadow-[0_0_6px_#01C8F3]" />
              </div>

              {/* Concentric Circular HUD Ring 2 (Inner ring with subtle counter rotation) */}
              <div 
                className="absolute inset-10 sm:inset-12 rounded-full border border-[#01C8F3]/20 pointer-events-none"
                style={{ animation: 'spin 35s linear infinite reverse' }}
              />

              {/* Subtle radar sweep line in HUD frame */}
              <div className="absolute inset-8 rounded-full pointer-events-none overflow-hidden opacity-25">
                <div 
                  className="w-full h-full rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg at 50% 50%, rgba(1, 200, 243, 0.16) 0deg, transparent 60deg, transparent 360deg)',
                    animation: 'spin 8s linear infinite',
                  }}
                />
              </div>

              {/* Ambient cyan glow behind the technical vessel model */}
              <div className="absolute inset-12 bg-[#01C8F3]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Luxury Yacht / Technical Vessel wireframe engineering visualization */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full max-w-[460px] object-contain pointer-events-none"
                  style={{
                    filter: 'drop-shadow(0 0 22px rgba(1, 200, 243, 0.45)) drop-shadow(0 0 50px rgba(1, 200, 243, 0.2))',
                  }}
                >
                  <source src="./assets/ENT_animation_video.webm" type="video/webm" />
                  <source src="./assets/ENT_animation_video.mp4" type="video/mp4" />
                </video>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* FLOATING HUD LABELS (Dedicated safe zones)                                */}
      {/* ========================================================================= */}
      <div className="hero-hud-labels" aria-hidden="true">
        <span className="hud-label hud-label-light hud-velocity">VELOCITY</span>
        <span className="hud-label hud-label-light hud-pressure">PRESSURE</span>
        <span className="hud-label hud-label-light hud-iteration">ITERATION</span>
        <span className="hud-label hud-label-dark hud-temperature">TEMPERATURE</span>
        <span className="hud-label hud-label-dark hud-stress">STRESS</span>
        <span className="hud-label hud-label-dark hud-mesh">MESH</span>
        <span className="hud-label hud-label-dark hud-solver">SOLVER</span>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM CENTER: Explore Platform Anchor & Navy Fade Band                   */}
      {/* ========================================================================= */}
      <div 
        className="absolute bottom-0 inset-x-0 h-28 sm:h-32 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(7, 12, 24, 0.6) 45%, #070C18 100%)',
        }}
      />

      <button
        onClick={scrollDown}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-300 hover:text-[#01C8F3] transition-colors duration-300 z-30 group"
        aria-label="Scroll to explore platform"
      >
        <span className="font-mono text-xs tracking-[0.2em] uppercase font-semibold text-slate-300 group-hover:text-[#01C8F3] transition-colors">
          EXPLORE PLATFORM
        </span>
        <ChevronDown size={18} className="animate-bounce text-[#01C8F3]" />
      </button>
    </section>
  );
}

