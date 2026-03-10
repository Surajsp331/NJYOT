/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(222, 47%, 11%)", // Deep Slate/Navy
          foreground: "hsl(210, 40%, 98%)",
        },
        secondary: {
          DEFAULT: "hsl(38, 92%, 50%)", // Vibrant Gold
          foreground: "hsl(222, 47%, 11%)",
        },
        accent: {
          DEFAULT: "hsl(262, 83%, 58%)", // Elegant Purple/Indigo
          foreground: "white",
        },
        charcoal: "#0f172a",
        offwhite: "#f8fafc",
        surface: "#ffffff",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
        "glass-gradient": "linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4))",
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      animation: {
        "ken-burns": "ken-burns 20s ease-out infinite alternate",
        "fade-up": "fade-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
      },
      keyframes: {
        "ken-burns": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.15)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
