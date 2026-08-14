const fluid = (min, vw, max) => `clamp(${min}, ${vw}, ${max})`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        page: '#e9e7e3',
        ink: '#181818',
        muted: 'rgba(24, 24, 24, 0.64)',
        line: 'rgba(24, 24, 24, 0.28)',
        card: '#0f1012',
        warm: '#f5f1ea',
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
        serif: ['Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', 'Georgia', 'serif'],
      },
      spacing: {
        page: fluid('20px', '4vw', '64px'),
        section: fluid('72px', '9vw', '132px'),
        footer: fluid('72px', '9vw', '132px'),
        header: 'var(--header-height)',
      },
      borderRadius: {
        tile: '44px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        cover: 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      transitionDuration: {
        reveal: '800ms',
      },
      keyframes: {
        'page-cover': {
          to: { transform: 'translateY(0)' },
        },
      },
      animation: {
        'page-cover': 'page-cover 450ms cubic-bezier(0.76, 0, 0.24, 1) forwards',
      },
    },
  },
  plugins: [],
};
