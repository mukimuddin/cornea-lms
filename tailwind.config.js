/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff0000', // Red
        secondary: '#000000', // Black
        accent: '#ffffff', // White
      },
    },
  },
  darkMode: 'class', // Enable dark mode
  plugins: [],
};

