/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['Fira Code', 'Monaco', 'Cascadia Code', 'Segoe UI Mono', 'Roboto Mono', 'monospace'],
        'brand': ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        'code-bg': '#1e1e1e',
        'code-text': '#d4d4d4',
        'success': '#22c55e',
        'error': '#ef4444',
        'warning': '#f59e0b'
      }
    },
  },
  plugins: [],
}