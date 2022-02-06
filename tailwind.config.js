module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        'primary': '#0056ab',
      },
    },
  },
  variants: {
    extend: {
      textColor: ['active']
    },
  },
  plugins: [],
}