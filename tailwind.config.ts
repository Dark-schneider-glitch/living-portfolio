import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // "Orange & Black" — vibrant palette for IT support + AI web creator from Delhi
        void: {
          950: '#080301',   // Deep background
          900: '#0d0704',
        },
        surface: {
          950: '#1a120e',   // Elevated panels
          900: '#241810',
          800: '#2e2018',
        },
        border: {
          800: '#3a2e24',
          700: '#4a3d35',
          600: '#5a4d3d',
        },
        orange: {
          400: '#ff6b35',   // Vibrant orange — primary accent
          500: '#e6542e',
          600: '#cc4a25',
          700: '#9a3a1e',
        },
        black: {
          950: '#0c0806',
          900: '#140f0c',
        },
        brand: {
          300: '#ffa36b',
          400: '#ff6b35',
          500: '#e6542e',
          600: '#cc4a25',
          700: '#9a3a1e',
          800: '#6a2c1a',
          900: '#3a180e',
          950: '#1a0e07',
        },
        dark: {
          900: '#140f0c',
          950: '#0c0806',
          1000: '#060402',
        },
        caution: {
          400: '#ff8c00',   // Warm caution amber
          500: '#ff7800',
          600: '#cc6a00',
        },
        muted: {
          400: '#7a6b65',
          500: '#6b5d57',
        },
        text: {
          100: '#ffffff',
          200: '#f0e8e4',
          300: '#d0c8c4',
        },
      },
      fontFamily: {
        // Outfit for display + body (modern, readable); JetBrains Mono for technical
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-lg': ['clamp(2.25rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '700' }],
        'section-title': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
        'body-lg': ['clamp(1.125rem, 1.8vw, 1.25rem)', { lineHeight: '1.7', letterSpacing: '0' }],
        'body': ['1rem', { lineHeight: '1.65' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        'prose': '65ch',
        'prose-lg': '75ch',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 20s linear infinite',
        'blink': 'blink 1.2s step-end infinite',
        // Motion primitives
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'fade-out': 'fade-out 0.2s ease-in forwards',
        'slide-up': 'slide-up 0.4s var(--ease-expo-out) forwards',
        'slide-down': 'slide-down 0.3s var(--ease-expo-out) forwards',
        'slide-left': 'slide-left 0.4s var(--ease-expo-out) forwards',
        'slide-right': 'slide-right 0.4s var(--ease-expo-out) forwards',
        'scale-in': 'scale-in 0.25s var(--ease-expo-out) forwards',
        'scale-out': 'scale-out 0.2s var(--ease-expo-in) forwards',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        // Motion primitive keyframes
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-out': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-4px)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-left': {
          '0%': { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-right': {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'scale-out': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'expo-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      boxShadow: {
        'terminal': '0 0 0 1px rgba(8,3,1,1), 0 8px 32px -8px rgba(0,0,0,0.6)',
        'terminal-lg': '0 0 0 1px rgba(8,3,1,1), 0 20px 48px -12px rgba(0,0,0,0.7)',
        'orange': '0 0 0 1px rgba(255,107,53,0.2), 0 4px 24px -4px rgba(255,107,53,0.3)',
        'caution': '0 0 0 1px rgba(255,140,0,0.2), 0 4px 24px -4px rgba(255,140,0,0.2)',
        // Elevation scale
        'elev-1': '0 1px 2px 0 rgba(0,0,0,0.3)',
        'elev-2': '0 4px 8px -2px rgba(0,0,0,0.3), 0 2px 4px -2px rgba(0,0,0,0.2)',
        'elev-3': '0 12px 24px -6px rgba(0,0,0,0.4), 0 4px 8px -4px rgba(0,0,0,0.2)',
        'elev-4': '0 24px 48px -12px rgba(0,0,0,0.5), 0 8px 16px -8px rgba(0,0,0,0.3)',
        'elev-5': '0 48px 96px -24px rgba(0,0,0,0.6), 0 16px 32px -16px rgba(0,0,0,0.4)',
        // Inner shadows for pressed states
        'inner-orange': 'inset 0 2px 4px 0 rgba(255,107,53,0.2)',
        'inner-caution': 'inset 0 2px 4px 0 rgba(255,140,0,0.2)',
      },
      backgroundImage: {
        'grid-orange': 'linear-gradient(rgba(255,107,53,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.03) 1px, transparent 1px)',
        'grid-caution': 'linear-gradient(rgba(255,140,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,0,0.02) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
      },
      backgroundSize: {
        'grid': '48px 48px',
        'shimmer': '200% 100%',
      },
    },
  },
  plugins: [],
};

export default config;