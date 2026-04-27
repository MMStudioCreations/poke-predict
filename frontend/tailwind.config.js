/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        terminal: {
          900: "#0b1220",
          800: "#101a2f",
          700: "#1f2a44",
          accent: "#3b82f6",
          success: "#22c55e",
          warning: "#f59e0b"
        }
      }
    }
  },
  plugins: []
};
