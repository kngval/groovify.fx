/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/**/*.{js,ts,tsx,jsx}",
    "./src/pages/**/*.{js,ts,tsx,jsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customLightBlue: "#6CA9CE",
        customBlue: "#0E1D35",
      },
    },
  },
  plugins: [],
};
