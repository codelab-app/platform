const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../../tailwind.config.js')],
  purge: [
    join(__dirname, '../../libs/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
};