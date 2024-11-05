/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scans all .js, .jsx, .ts, and .tsx files in the src folder
    "./public/index.html",         // Include index.html if it has Tailwind classes
  ],
  theme: {
    extend: {
      textShadow: {
        'default': '0 0 10px rgba(56, 178, 172, 0.8)', // Adjust color and intensity
        'md': '0 0 15px rgba(56, 178, 172, 0.8)',
        'lg': '0 0 20px rgba(56, 178, 172, 1.0)',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'), // Include the text-shadow plugin
  ],
};
