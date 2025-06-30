// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './app/**/*.{js,ts,jsx,tsx,mdx}',
    // './pages/**/*.{js,ts,jsx,tsx,mdx}',
    // './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'background-primary': 'var(--background)',
        'background-elements-primary': 'var(--background-elements)',
        'primary': 'var(--color)',
        'input-primary': 'var(--input)',
      },
    },
  },
  plugins: [],
};