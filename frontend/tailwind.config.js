/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "slide-in-from-top-2": {
          from: { transform: "translateY(-0.5rem)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-from-bottom-2": {
          from: { transform: "translateY(0.5rem)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-from-left-2": {
          from: { transform: "translateX(-0.5rem)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-from-right-2": {
          from: { transform: "translateX(0.5rem)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        "slide-in-from-top-2": "slide-in-from-top-2 0.2s ease-out",
        "slide-in-from-bottom-2": "slide-in-from-bottom-2 0.2s ease-out",
        "slide-in-from-left-2": "slide-in-from-left-2 0.2s ease-out",
        "slide-in-from-right-2": "slide-in-from-right-2 0.2s ease-out",
      },
    },
  },
  plugins: [],
}
