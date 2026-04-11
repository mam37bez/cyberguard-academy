import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50:'#eef2ff',100:'#e0e7ff',200:'#c7d2fe',300:'#a5b4fc',
          400:'#818cf8',500:'#6366f1',600:'#4f46e5',700:'#4338ca',
          800:'#3730a3',900:'#312e81',950:'#1e1b4b',
        },
        cyber: {
          green: '#00ff41',
          blue: '#00d4ff',
          purple: '#a855f7',
          red: '#ff3131',
          dark: '#0a0a1a',
          darker: '#050510',
          card: '#111127',
          border: '#1e1e3f',
        },
      },
      fontFamily: {
        sans: ['Inter','system-ui','sans-serif'],
        mono: ['JetBrains Mono','monospace'],
      },
      animation: {
        'glow':'glow 2s ease-in-out infinite alternate',
        'float':'float 6s ease-in-out infinite',
        'pulse-slow':'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'shield-pulse':'shield-pulse 2s ease-in-out infinite',
        'slide-up':'slide-up 0.5s ease-out',
        'fade-in':'fade-in 0.5s ease-out',
      },
      keyframes: {
        glow: {
          '0%':{boxShadow:'0 0 5px #00ff41,0 0 10px #00ff41'},
          '100%':{boxShadow:'0 0 10px #00d4ff,0 0 20px #00d4ff'},
        },
        float: {
          '0%,100%':{transform:'translateY(0)'},
          '50%':{transform:'translateY(-20px)'},
        },
        'shield-pulse': {
          '0%,100%':{opacity:'1',transform:'scale(1)'},
          '50%':{opacity:'0.8',transform:'scale(1.05)'},
        },
        'slide-up': {
          '0%':{transform:'translateY(20px)',opacity:'0'},
          '100%':{transform:'translateY(0)',opacity:'1'},
        },
        'fade-in': {
          '0%':{opacity:'0'},
          '100%':{opacity:'1'},
        },
      },
      backgroundImage: {
        'grid-pattern':'linear-gradient(to right,rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.02) 1px,transparent 1px)',
        'glow-gradient':'radial-gradient(ellipse at center,rgba(99,102,241,0.15) 0%,transparent 70%)',
      },
      backgroundSize: {'grid':'50px 50px'},
    },
  },
  plugins: [],
};
export default config;
