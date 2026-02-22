import type { Config } from "tailwindcss";

const config: Config = {

  darkMode: ["class"],

  content: [

    "./pages/**/*.{ts,tsx}",

    "./components/**/*.{ts,tsx}",

    "./app/**/*.{ts,tsx}",

    "./src/**/*.{ts,tsx}",

  ],

  prefix: "",

  theme: {

    container: {

      center: true,

      padding: "2rem",

      screens: {

        "2xl": "1400px",

      },

    },



    extend: {



      /* ---------------- FONT ---------------- */

      fontFamily: {

        sans: ['"Plus Jakarta Sans"', "sans-serif"],

      },



      /* ---------------- COLORS ---------------- */

      colors: {

        "primary-purple": "#7e63f8",

        "secondary-yellow": "#fbdd84",

        "accent-green": "#cbec93",

        "cream-bg": "#faf7f1",

        "dark-bg": "#131022",



        border: "hsl(var(--border))",

        input: "hsl(var(--input))",

        ring: "hsl(var(--ring))",

        background: "hsl(var(--background))",

        foreground: "hsl(var(--foreground))",



        primary: {

          DEFAULT: "hsl(var(--primary))",

          foreground: "hsl(var(--primary-foreground))",

        },



        secondary: {

          DEFAULT: "hsl(var(--secondary))",

          foreground: "hsl(var(--secondary-foreground))",

        },



        destructive: {

          DEFAULT: "hsl(var(--destructive))",

          foreground: "hsl(var(--destructive-foreground))",

        },



        muted: {

          DEFAULT: "hsl(var(--muted))",

          foreground: "hsl(var(--muted-foreground))",

        },



        accent: {

          DEFAULT: "hsl(var(--accent))",

          foreground: "hsl(var(--accent-foreground))",

        },



        card: {

          DEFAULT: "hsl(var(--card))",

          foreground: "hsl(var(--card-foreground))",

        },



        sidebar: {

          DEFAULT: "hsl(var(--sidebar-background))",

          foreground: "hsl(var(--sidebar-foreground))",

          primary: "hsl(var(--sidebar-primary))",

          "primary-foreground":

            "hsl(var(--sidebar-primary-foreground))",

        },

      },



      /* ---------------- BORDER RADIUS ---------------- */

      borderRadius: {

        lg: "var(--radius)",

        md: "calc(var(--radius) - 2px)",

        sm: "calc(var(--radius) - 4px)",

      },



      /* ---------------- FONT SIZE ---------------- */

      fontSize: {

        xs: ["0.75rem"],

        sm: ["0.875rem"],

        base: ["0.9375rem"],

        lg: ["1.0625rem"],

        xl: ["1.25rem"],

        "2xl": ["1.5rem"],

        "3xl": ["1.875rem"],

        "4xl": ["2.25rem"],

      },



      /* ---------------- KEYFRAMES ---------------- */

      keyframes: {



        /* Existing */

        "accordion-down": {

          from: { height: "0" },

          to: {

            height:

              "var(--radix-accordion-content-height)",

          },

        },



        "accordion-up": {

          from: {

            height:

              "var(--radix-accordion-content-height)",

          },

          to: { height: "0" },

        },



        /* Loader animation */

        pulseLogo: {

          "0%,100%": {

            transform: "scale(1)",

            opacity: "1",

          },



          "50%": {

            transform: "scale(1.12)",

            opacity: ".7",

          },

        },

      },



      /* ---------------- ANIMATION ---------------- */

      animation: {

        "accordion-down":

          "accordion-down 0.2s ease-out",



        "accordion-up":

          "accordion-up 0.2s ease-out",



        pulseLogo:

          "pulseLogo 2s ease-in-out infinite",

      },



    },

  },



  plugins: [

    require("tailwindcss-animate"),

  ],

};



export default config;