/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      white: "hsl(var(--white))",
      black: "hsl(var(--black))",
      lightGrey: "hsl(var(--light-grey))",
      greyBgTop: "hsl(var(--grey-header))",
      lightBlack: "hsl(var(--light-black))",
      lineColor: "hsl(var(--line-color))",
      blue: "hsl(var(--blue))",
      orange: "hsl(var(--orange))",
      green: "hsl(var(--green))",
    },
    extend: {
      backgroundColor: {
        "transparent-grey": "hsla( 0, 2%, 44%,0.6)",
      },
    },
  },
  plugins: [],
};
