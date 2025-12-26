module.exports = {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { inter: ['Inter', 'sans-serif'] },
      colors: {
        brand: {
          50: '#f5f7ff',
          300: '#a5b4fc',
          600: '#4f46e5'
        }
      }
    }
  },
  plugins: [],
}
