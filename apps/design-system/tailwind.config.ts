import { createGlobPatternsForDependencies } from '@nx/react/tailwind'
import { join } from 'path'

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../../scripts/tailwind/tailwind.config.ts')],
  purge: [
    join(__dirname, '../../libs/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
}
