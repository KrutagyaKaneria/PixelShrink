/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Stitch PixelShrink Design System ──────────────────────────────
        // Light-mode surfaces
        surface:           '#fbf8ff',
        'surface-dim':     '#dad9e3',
        'surface-low':     '#f4f2fd',
        'surface-ct':      '#eeedf7',   // surface-container
        'surface-high':    '#e8e7f1',   // surface-container-high
        'surface-highest': '#e3e1ec',   // surface-container-highest
        'surface-lowest':  '#ffffff',

        // On-surface text
        'on-surface':      '#1a1b22',
        'on-surface-var':  '#464555',

        // Dark-mode surfaces (Zinc-based from design MD)
        'dark-bg':         '#18181b',   // zinc-900
        'dark-surface':    '#1c1c1f',
        'dark-ct':         '#27272a',   // zinc-800
        'dark-ct-high':    '#3f3f46',   // zinc-700
        'dark-on':         '#f4f4f5',   // zinc-100 text
        'dark-on-muted':   '#a1a1aa',   // zinc-400 secondary text

        // Primary (Indigo)
        primary:           '#3525cd',
        'primary-ct':      '#4f46e5',   // indigo-600
        'primary-fixed':   '#e2dfff',
        'primary-dim':     '#c3c0ff',

        // Outline / border tokens
        outline:           '#777587',
        'outline-var':     '#c7c4d8',

        // Success / reduction badge
        success:           '#16a34a',   // green-600
        'success-light':   '#dcfce7',   // green-100
        'success-dark':    '#166534',   // green-800 for dark badge text

        // Secondary
        secondary:         '#5f5e61',
        'secondary-ct':    '#e4e1e6',
      },
      fontFamily: {
        geist: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'px-sm': '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
      },
      boxShadow: {
        'ambient': '0 2px 12px 0 rgba(0,0,0,0.05)',
        'ambient-lg': '0 4px 24px 0 rgba(0,0,0,0.07)',
        'indigo-glow': '0 0 0 2px rgba(79,70,229,0.10)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
      },
    },
  },
  plugins: [],
}
