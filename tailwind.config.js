module.exports = {
  content: [
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