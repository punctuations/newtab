module.exports = {
  purge: ["./src/**/*.{ts,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  mode: "jit",
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
