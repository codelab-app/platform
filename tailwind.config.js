const { join } = require('path');
const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme');
const TailwindAnimate = require('tailwindcss-animate');

// const { breakpoints } = require('./.codelab.js')

/**
 * This only works if `tailwind.config.js` & `postcss.config.js` are at the project root
 */
module.exports = {
  plugins: [],
  theme: {
    extend: {
      minHeight: {
        '1/2': '50%',
        '1/3': '33%',
        '2/3': '66%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '70%',
      },
      minWidth: {
        '1/2': '50%',
        '1/3': '33%',
        '2/3': '66%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '70%',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      // colors: ({ theme }) => ({
      //   primary: theme('colors.violet')
      // }),
      screens: {
        laptop: '768px',
        tablet: '0px',
        desktop: '1200px',
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
    fontFamily: {
      body: ['Nunito'],
      display: ['Montserrat'],
      sans: ['var(--font-sans)', ...fontFamily.sans],
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    screens: {
      xs: '0px',
      sm: '576px',
      // => @media (min-width: 576px) { ... }
      md: '768px',
      // => @media (min-width: 768px) { ... }
      lg: '992px',
      // => @media (min-width: 992px) { ... }
      xl: '1200px',
      // => @media (min-width: 1200px) { ... }
      '2xl': '1600px',
      // => @media (min-width: 1600px) { ... }
    },
  },
  corePlugins: {
    // Reset adds `background:transparent`, which background-color can't override
    preflight: false,
  },
  plugins: [TailwindAnimate],
  darkMode: ['class'],
  variants: {
    opacity: ({ after }) => after(['disabled'])
  },
}
