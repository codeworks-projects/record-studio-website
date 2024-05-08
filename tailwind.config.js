/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B22E83',
        'primary-dark': '#823F95',
        'primary-light': '#c6e1ff',
        'primary-hover': '#0852ad',
        secondary: '#F5F5F5',
        'secondary-light': '#FCFCFC',
        'secondary-hover': '#F2F2F2',
        grey: '#888888',
        'light-grey': '#e0e0e0',
        green: '#31b748',
        red: '#C74F4F',
        placeholder: '#EEEEEE',
        input: '#F5F5F5',
        'input-focus': '#F3F3F3',
        black: '#000000',
        white: '#FFFFFF',
        'white-contrast': '#F8F8F8',

        'dark-opacity': '#DADADA70',
        'blue-card': '#016BDC',
        'red-card': '#C74F4E',
        'orange-card': '#E06C3E',
        'light-blue-card': '#337993',
      },
      height: {
        input: '40px',
      },
      fontFamily: {
        title: ['Thicccboi', 'sans-serif'],
        subtitle: ['Playfair Display', 'sans-serif'],
        sans: ['Thicccboi', 'sans-serif'],
      },
      opacity: {
        disabled: 0.6,
      },
      screens: {
        xs: '540px',
        sm: '768px',
        md: '980px',
        lg: '1280px',
        '2xl': '1536px',
        '3xl': '1780px',
        '4xl': '1990px',
        '5xl': '2400px',
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey]

          const newVars =
            typeof value === 'string'
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`)

          return { ...vars, ...newVars }
        }, {})
      }

      addBase({
        ':root': extractColorVars(theme('colors')),
      })
    },
  ],
}
