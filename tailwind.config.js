module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        graphik: ["Graphik"],
      },
      colors: {
        "regal-blue": "#243c5a",
        limegreen: "#23db8b",
        "transparent-back": "#30303063",
        "white-cover": "#f6f6f6",
        sideblack: "#1d1d1d",
        sidetext: "#707070",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
