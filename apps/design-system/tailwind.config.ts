import { createGlobPatternsForDependencies } from '@nx/react/tailwind'
import { join } from 'path'

// eslint-disable-next-line @nx/enforce-module-boundaries
import rootTailwindConfig from '../../tailwind.config'

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [rootTailwindConfig],
  purge: [
    join(__dirname, '../../libs/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
}
