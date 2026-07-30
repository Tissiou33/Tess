/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F1EFEA',
        surface: '#FBFAF7',
        ink: '#171513',
        'ink-soft': '#5E5A55',
        'ink-faint': '#9B958E',
        accent: '#E66A1F',
        'accent-soft': '#FDE7D7',
        'accent-dark': '#B44712',
        data: '#56B870',
        line: '#D8D1C8',
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
