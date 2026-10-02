import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const scrollDown = () => {
    const el = document.getElementById('bottleneck') || document.getElementById('platform');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#070C18]"
    >
      {/* ========================================================================= */}
      {/* SPLIT BACKGROUND ARCHITECTURE: Light Left (#F4F8FB) / Dark Right (#070C18) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Left Visual Zone: Cool white / very light bluish white */}
        <div 
          className="absolute top-0 left-0 w-full lg:w-[54%] xl:w-[53%] h-[68%] lg:h-full bg-[#F4F8FB]"
        >
          {/* Subtle technical grid overlay on light background */}
          <div 
            className="absolute inset-0 opacity-45"
            style={{
              backgroundImage: `
                linear-gradient(rgba(11, 35, 64, 0.065) 1px, transparent 1px),
                linear-gradient(90deg, rgba(11, 35, 64, 0.065) 1px, transparent 1px)
              `,
              backgroundSize: '54px 54px',
            }}
          />
        </div>

        {/* Right Visual Zone: Very dark navy / near-black blue */}
        <div 
          className="absolute bottom-0 right-0 w-full lg:top-0 lg:w-[46%] xl:w-[47%] h-[32%] lg:h-full bg-[#070C18]"
        >
          {/* Subtle technical grid overlay on dark background */}
          <div 
            className="absolute inset-0 opacity-30"
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
        </div>

        {/* Subtle clean vertical separator between the two zones on desktop */}
        <div 
          className="hidden lg:block absolute inset-y-0 left-[54%] xl:left-[53%] w-px bg-gradient-to-b from-transparent via-[#01C8F3]/25 to-transparent z-10" 
        />

        {/* Bottom dark navy footer fade band starting just below the disclaimer line */}
        <div 
          className="absolute bottom-0 inset-x-0 h-32 sm:h-36 lg:h-44 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(244, 248, 251, 0) 0%, rgba(7, 12, 24, 0.6) 45%, #070C18 100%)',
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* FLOATING TECHNICAL HUD LABELS (Dedicated non-overlapping safe zones)       */}
      {/* ========================================================================= */}
      <div className="hero-hud-labels" aria-hidden="true">
        {/* Safe labels on light background */}
        <span className="hud-label hud-label-light hud-velocity">VELOCITY</span>
        <span className="hud-label hud-label-light hud-pressure">PRESSURE</span>
        <span className="hud-label hud-label-light hud-iteration">ITERATION</span>

        {/* Safe labels on dark navy background */}
        <span className="hud-label hud-label-dark hud-temperature">TEMPERATURE</span>
        <span className="hud-label hud-label-dark hud-stress">STRESS</span>
        <span className="hud-label hud-label-dark hud-mesh">MESH</span>
        <span className="hud-label hud-label-dark hud-solver">SOLVER</span>
      </div>

      {/* ========================================================================= */}
      {/* MAIN HERO CONTENT CONTAINER                                               */}
      {/* ========================================================================= */}
      <div className="hero-content relative z-20 flex-1 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20 w-full flex items-center">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 w-full items-center">

          {/* --------------------------------------------------------------------- */}
          {/* LEFT ZONE: Branding & Content (7 Cols)                                */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center text-left">
            
            {/* Prominent ENTangle Logo */}
            <div className="hero-logo mb-4 sm:mb-5 lg:mb-6">
              <h1 className="sr-only">ENTangle — Quantum Engineering Simulation Platform</h1>
              <img
                src="./assets/images/entangle_logo.png"
                alt="ENTangle"
                className="h-14 sm:h-20 md:h-24 lg:h-28 xl:h-32 2xl:h-36 w-auto max-w-full object-contain filter drop-shadow-sm"
              />
            </div>

            {/* Slogan */}
            <p className="hero-tagline text-[#07192F] text-lg sm:text-xl md:text-2xl lg:text-[1.65rem] xl:text-[1.85rem] leading-tight font-bold tracking-tight mb-8 sm:mb-9 max-w-2xl">
              Quantum Engineering Simulation Platform
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-3.5 sm:gap-4 mb-9 sm:mb-10">
              {/* Button 1: EXPLORE PLATFORM (White/off-white with dark/cyan text) */}
              <button
                onClick={scrollDown}
                className="flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded bg-white text-[#0A2540] hover:text-[#01C8F3] border border-[#CBDCE9] font-bold text-sm sm:text-base tracking-wider transition-all duration-200 shadow-[0_2px_10px_rgba(7,20,40,0.08)] hover:shadow-[0_4px_16px_rgba(1,200,243,0.2)] hover:-translate-y-0.5"
              >
                EXPLORE PLATFORM
              </button>

              {/* Button 2: Start Free Trial (Cyan filled with white text) */}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=info@enginuvitynexus.com&su=Start%20Free%20Trial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded bg-[#01C8F3] hover:bg-[#00B4DC] text-white font-bold text-sm sm:text-base tracking-wider transition-all duration-200 shadow-[0_4px_16px_rgba(1,200,243,0.35)] hover:shadow-[0_6px_22px_rgba(1,200,243,0.5)] hover:-translate-y-0.5"
              >
                Start Free Trial
              </a>
            </div>

            {/* Three Key Value Blocks (Dark navy headings on light background) */}
            <div className="hero-stats grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 pt-6 sm:pt-7 border-t border-[#D5E2EC]">
              <div>
                <div className="text-xl sm:text-2xl lg:text-[1.65rem] font-black text-[#07192F] tracking-tight leading-none">
                  EXPLORE
                </div>
                <div className="text-sm sm:text-[15px] lg:text-base text-[#475E75] mt-2 font-medium leading-snug">
                  larger design spaces
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl lg:text-[1.65rem] font-black text-[#07192F] tracking-tight leading-none">
                  OPTIMIZE
                </div>
                <div className="text-sm sm:text-[15px] lg:text-base text-[#475E75] mt-2 font-medium leading-snug">
                  complex engineering systems
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl lg:text-[1.65rem] font-black text-[#07192F] tracking-tight leading-none">
                  ACCELERATE
                </div>
                <div className="text-sm sm:text-[15px] lg:text-base text-[#475E75] mt-2 font-medium leading-snug">
                  compute-intensive subproblems
                </div>
              </div>
            </div>

            {/* Disclaimer Line (Subtle left cyan accent line, readable text) */}
            <div className="mt-7 sm:mt-8">
              <p className="hero-disclaimer text-xs sm:text-sm lg:text-[0.95rem] text-[#334E68] leading-relaxed font-normal border-l-2 border-[#01C8F3] pl-3.5 max-w-2xl">
                ENTangle is currently a research-stage initiative. The features shown on this website represent our planned development roadmap and conceptual framework.
              </p>
            </div>

          </div>

          {/* --------------------------------------------------------------------- */}
          {/* RIGHT ZONE: Engineering Visualization (5 Cols)                        */}
          {/* --------------------------------------------------------------------- */}
          <div className="engineering-visual lg:col-span-5 xl:col-span-5 relative flex items-center justify-center py-6 lg:py-0">
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
                  <source src="./ENT_animation_video.webm" type="video/webm" />
                  <source src="./ENT_animation_video.mp4" type="video/mp4" />
                  <source src="./assets/ENT_animation_video.webm" type="video/webm" />
                  <source src="./assets/ENT_animation_video.mp4" type="video/mp4" />
                  <source src="./ENT_animation_video.mov" type="video/quicktime" />
                  <source src="./assets/ENT_animation_video.mov" type="video/quicktime" />
                </video>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM CENTER: Explore Platform Anchor (Inside Dark Navy Fade Band)       */}
      {/* ========================================================================= */}
      <button
        onClick={scrollDown}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-300 hover:text-[#01C8F3] transition-colors duration-300 z-20 group"
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

