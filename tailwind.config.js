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
          DEFAULT: "#EECE4A", // Readymart Yellow
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#D61C38", // Readymart Red
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#F3F3F3", // Light grey for sections/cards
          foreground: "#000000",
        },
        charcoal: "#1a1a1a",
        offwhite: "#F9F9F9",
        surface: "#ffffff",
        muted: "#f4f4f5",
        "muted-foreground": "#71717a",
      },
      fontFamily: {
        heading: ["var(--font-inter)", "sans-serif"], // e-commerce generally uses strict sans-serif
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #EECE4A 0%, #e0c13e 100%)",
        "red-gradient": "linear-gradient(135deg, #D61C38 0%, #b8162f 100%)",
        "subtle-gradient": "linear-gradient(180deg, #ffffff 0%, #F9F9F9 100%)",
      },
      borderRadius: {
        'xl': '0.5rem',
        '2xl': '0.5rem', // squarer borders for readymart theme
        '3xl': '0.75rem',
      },
      animation: {
        "ken-burns": "ken-burns 20s ease-out infinite alternate",
        "fade-up": "fade-up 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
        "slide-in": "slide-in 0.4s ease-out forwards",
      },
      keyframes: {
        "ken-burns": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
