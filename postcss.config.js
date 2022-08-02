module.exports = {
  plugins: {
    // Required for @import for .css files
    'postcss-import': {},
    // Required for scss like rules for .css files
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
}
