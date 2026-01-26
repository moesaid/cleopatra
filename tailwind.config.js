export default {
  content: [
    "./src/**/*.{html,js,scss}",
    "./src/views/**/*.{html,js,scss}"
  ],
  theme: {
    screens: {
      // // Mobile-first breakpoints (standard practice)
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {},
  },
  plugins: [],
};
