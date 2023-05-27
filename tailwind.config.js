/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["var(--font-main-title)"],
        poppins: ["var(--font-main-text)"],
      },
      backgroundImage: {
        connexion:
          "linear-gradient(to right, rgba(9, 10, 36, 0.96), rgba(9, 10, 36, 0.84), rgba(9, 10, 36, 0.55), rgba(9, 10, 36, 0.27)), url('/bg-joker.jpeg')",
        register:
          "linear-gradient(to right, rgba(9, 10, 36, 0.96), rgba(9, 10, 36, 0.84), rgba(9, 10, 36, 0.55), rgba(9, 10, 36, 0.27)), url('/bg-spiderman.jpg')",
        welcome:
          "linear-gradient(to right, rgba(9, 10, 36, 0.96) 65%, rgba(9, 10, 36, 0.84), rgba(9, 10, 36, 0.55), rgba(9, 10, 36, 0.37)), url(https://m.media-amazon.com/images/G/01/digital/video/EU6_MLP/November/MLP_Template_Left-Aligned_PV_FR.jpg)",
      },
      textColor: {
        rose: "#F692FF",
      },
      gridTemplateColumns: {
        cast: "auto auto auto",
      },
    },
  },
  plugins: [],
};
