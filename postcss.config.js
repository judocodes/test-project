module.exports = () => ({
  plugins: [
    require('tailwindcss'),
    require('postcss-custom-properties')({
      preserve: false,
      importFrom: ['src/styles/fullcalendar-vars.css'],
    }),
    require('postcss-calc'),
  ],
});
