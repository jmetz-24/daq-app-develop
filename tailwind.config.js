/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <-- Add this line
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aurora-blue': {
          DEFAULT: '#006AED', // Blue 500
          'dark': '#001733',     // Blue 900
        },
        'dynamic': {
        // Green color palette from the image
        'green': {
          '50': '#EAFBF1',
          '200': '#B9EBD0',
          '500': '#28C564',
        },
        // Yellow color palette from the image
        'yellow': {
          '50': '#FFFBE5',
          '150': '#FFE999',
          '300': '#FFD333',
        },
        // Orange color palette from the image
        'orange': {
          '50': '#FFF8E5',
          '150': '#FFE999', // Note: This hex code is the same as yellow-150 in the provided image.
          '300': '#FE8045',
        },
        // Red color palette from the image
        'red': {
          '50': '#FFEBE5',
          '200': '#FFAF99',
          '600': '#EC3D00',
        },
        // Blue color palette from the image
        'blue': {
          '50': '#E9F3FF',
          '200': '#B8D8FF',
          '500': '#006AED',
        },
        // Purple color palette from the image
        'purple': {
          '50': '#F4F1FE',
          '200': '#DBD0FA',
          '600': '#6254EF',
        },
        },
        'context': {
          '700': '#464E5D',
          '600': '#576175',
          '500': '#68748D',
          '400': '#A7AFBE',
          '300': '#D1D6E0',
          '200': '#E6E9F0',
        }
      },
      fontFamily: {
        // Set 'Inter' as the primary font
        'sans': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        // Add a larger radius based on the 25px guideline
        'brand': '25px',
      }
    },
  },
  plugins: [],
}