/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#26241C",
          soft: "#2E2C23",
          deep: "#1C1A14",
        },
        taupe: {
          DEFAULT: "#8F8877",
          soft: "#A8A291",
          light: "#B9B3A4",
        },
        stone: {
          DEFAULT: "#656359",
          warm: "#A5A6A5",
          mist: "#E2E3E3",
        },
        sand: {
          DEFAULT: "#F4F2ED",
          warm: "#EFEDE6",
          deep: "#E8E5DC",
        },
        leaf: {
          DEFAULT: "#7A8B6F",
          soft: "#93A387",
          light: "#DCE4D6",
        },
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(38, 36, 28, 0.18)",
        card: "0 4px 24px -6px rgba(38, 36, 28, 0.12)",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
        "3xl": "2.25rem",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out both",
        "fade-in": "fadeIn 0.9s ease-out both",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
      },
    },
  },
  plugins: [],
};