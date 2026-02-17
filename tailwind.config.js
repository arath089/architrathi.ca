/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      keyframes: {
        auroraDrift: {
          "0%": {
            transform: "translate3d(-2%, -1%, 0) rotate(0deg) scale(1.02)",
          },
          "50%": {
            transform: "translate3d( 2%,  1%, 0) rotate(6deg)  scale(1.06)",
          },
          "100%": {
            transform: "translate3d(-2%, -1%, 0) rotate(0deg) scale(1.02)",
          },
        },
      },
      animation: {
        auroraDrift: "auroraDrift 38s linear infinite",
        auroraDriftSlow: "auroraDrift 52s linear infinite reverse",
      },
    },
  },
  plugins: [],
};
