/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F7F7F4',
        surface: '#FFFFFF',
        ink: '#14161B',
        'ink-soft': '#5B5F68',
        'ink-faint': '#9A9DA6',
        accent: '#4438CA',
        'accent-soft': '#EDEBFB',
        'accent-dark': '#332AA0',
        data: '#0EA5A0',
        line: '#E4E3DE',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      maxWidth: {
        content: '1160px',
      },
    },
  },
  plugins: [],
}
