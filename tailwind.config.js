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
        filter: "#1c1c1c",
        sidetext: "#707070",
        dropdwonc: "#2e3138",
        box: "#f6f6f6",
        background: "#EEEEEE",
        tab: "#f2f2f2",
        hover: "#f7f7f7",
        tabborder: "#4611ea",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
