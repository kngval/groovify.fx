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
        customGray: "#586471",
      },
      fontSize: {
        xxs: "10px",
      },
      animation: {
        wave: 'wave 1s infinite ease-in-out',
        wave2: 'wave2 0.7s infinite ease-in-out',
        wave3: 'wave3 1.3s infinite ease-in-out',
      }
    },
  },
  plugins: [],
};
