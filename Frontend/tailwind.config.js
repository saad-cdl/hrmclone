/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#146ADC',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'custom-image': "url('client/src/components/assets/Container.jpg')",
      },
    },
  },
  plugins: [],
}

