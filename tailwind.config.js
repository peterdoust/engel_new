/**
 * Engel & Engel brand palette (source: E&E Brand Guides PDF)
 *   Midnight Blue    #1d2653  main branding, primary headers, dark backgrounds
 *   Gold             #d4af37  main branding, buttons, accents
 *   Cobalt Blue      #293995  subheads, gradients paired with midnight blue
 *   Light Slate Gray #e2e6f0  dividers, borders, background boxes
 *   Midnight Charcoal #11162d body copy and micro-copy
 */
const brand = {
  midnight: '#1d2653',
  gold: '#d4af37',
  cobalt: '#293995',
  slate: '#e2e6f0',
  charcoal: '#11162d',
}

// Blue scale built around the brand blues (600 = cobalt, 900 = midnight).
// Also used for Tailwind's `blue` and `indigo` so old classes stay on-brand.
const brandBlue = {
  50: '#f0f2f9',
  100: '#e2e6f0',
  200: '#c5cce3',
  300: '#9aa5cf',
  400: '#6676b8',
  500: '#3d4fa8',
  600: brand.cobalt,
  700: '#243282',
  800: '#202c6a',
  900: brand.midnight,
  950: brand.charcoal,
}

// Cool neutral scale tinted toward the brand navy (200 = light slate, 900 = charcoal).
// Also used for Tailwind's `slate`.
const brandNeutral = {
  50: '#f6f7fb',
  100: '#eef0f6',
  200: brand.slate,
  300: '#c9cfdf',
  400: '#9aa2b8',
  500: '#6b7390',
  600: '#4d5570',
  700: '#363d57',
  800: '#232a42',
  900: brand.charcoal,
  950: '#0b0e1e',
}

const brandGold = {
  50: '#fbf7e9',
  100: '#f6edc8',
  200: '#eedc96',
  300: '#e5c964',
  400: '#dcbb48',
  500: brand.gold,
  600: '#b8952a',
  700: '#957722',
  800: '#735c1c',
  900: '#574617',
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand,
        primary: brandBlue,
        blue: brandBlue,
        indigo: brandBlue,
        gold: brandGold,
        gray: brandNeutral,
        slate: brandNeutral,
        // Semantic colors
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: brand.cobalt,
      },
      fontFamily: {
        // Brand font is Futura 100 LXT (licensed). Jost is the free stand-in
        // until the webfont licence is in place; Arial is the brand fallback.
        sans: ['var(--font-brand)', 'Futura', 'Arial', 'sans-serif'],
        // Brand has no serif — `font-serif` headings now use the brand font too.
        serif: ['var(--font-brand)', 'Futura', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'shine': 'shine 3s ease-in-out infinite',
      },
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-100%) skewX(-20deg)' },
          '40%, 100%': { transform: 'translateX(400%) skewX(-20deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': "url('/images/hero-pattern.svg')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
