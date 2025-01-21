import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        dark: "#05000c",
        light: "#f5f5f5",
        primary: "#B72C7A",
        secundary: "#531354",
        thirty: "#191538",
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
      backgroundImage:{
        circularLight: 'repeating-radial-gradient(#f5f5f5 1px, #05000c 8px, #05000c 120px);',
        circularLightLg: 'repeating-radial-gradient(#f5f5f5 1px, #05000c 8px, #05000c 90px);',
        circularLightMd: 'repeating-radial-gradient(#f5f5f5 1px, #05000c 8px, #05000c 70px);',
        circularLightSm: 'repeating-radial-gradient(#f5f5f5 1px, #05000c 8px, #05000c 50px);'
      }
    },
    screens:{
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }

      xs: { max: "479px" },
      // => @media (max-width: 479px) { ... }
    }
  },
  plugins: [],
} satisfies Config;
