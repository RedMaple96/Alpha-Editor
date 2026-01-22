/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(220, 20%, 10%)',
        foreground: 'hsl(220, 10%, 90%)',
        primary: 'hsl(190, 100%, 50%)',
        'primary-foreground': 'hsl(220, 20%, 10%)',
        accent: 'hsl(220, 20%, 20%)',
        'accent-foreground': 'hsl(220, 10%, 90%)',
        'muted-foreground': 'hsl(220, 10%, 70%)',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}

