/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: '#01C8F3', // Professional cyan from logo
          blue: '#0284C7',
          cobalt: '#0369A1',
          navy: '#0C4A6E',
          azure: '#38BDF8',
          // Cohesive mapping for existing references
          magenta: '#0284C7',
          purple: '#0369A1',
          orange: '#01C8F3',
          white: '#F8FAFC',
        },
        bg: {
          primary: '#030712',
          secondary: '#070C18',
          tertiary: '#0B1222',
          card: '#0D1527',
          surface: '#111B33',
          elevated: '#162342',
        },
        border: {
          subtle: 'rgba(1,200,243,0.16)',
          glow: 'rgba(1,200,243,0.32)',
          active: 'rgba(1,200,243,0.60)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #01C8F3 0%, #0284C7 60%, #0369A1 100%)',
        'cyan-blue': 'linear-gradient(135deg, #01C8F3, #0284C7)',
        'blue-purple': 'linear-gradient(135deg, #0284C7, #0C4A6E)',
        'purple-magenta': 'linear-gradient(135deg, #01C8F3, #0284C7)',
        'orange-magenta': 'linear-gradient(135deg, #38BDF8, #0369A1)',
        'hero-glow': 'radial-gradient(ellipse at center, rgba(1,200,243,0.07) 0%, transparent 70%)',
        'grid-pattern': 'linear-gradient(rgba(1,200,243,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(1,200,243,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 2s linear infinite',
        'data-flow': 'dataFlow 3s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'orbit': 'orbit 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        dataFlow: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0,192,240,0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(0,192,240,0.7), 0 0 60px rgba(0,192,240,0.3)' },
        },
      },
      boxShadow: {
        'cyan-glow': '0 0 20px rgba(0,192,240,0.4)',
        'magenta-glow': '0 0 20px rgba(240,0,112,0.4)',
        'purple-glow': '0 0 20px rgba(144,0,208,0.4)',
        'card-glow': '0 4px 30px rgba(0,192,240,0.08)',
      },
    },
  },
  plugins: [],
};
