import nextPlugin from '@next/eslint-plugin-next'

const eslintNextConfig = [
  {
    // Scoping Next.js specific rules to typical Next.js app file patterns
    files: [
      'pages/**/*.{js,jsx,ts,tsx}',
      'app/**/*.{js,jsx,ts,tsx}',
      'components/**/*.{js,jsx,ts,tsx}',
      'lib/**/*.{js,jsx,ts,tsx}',
      'src/**/*.{js,jsx,ts,tsx}', // If you use an src directory
    ],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      // Spread rules here so we don't register plugins
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules, // Includes stricter rules for Core Web Vitals
    },
    // languageOptions for parser (e.g., for Next.js's Babel parser for JS/JSX if not handled by baseConfig)
    // or specific globals would be configured here if needed.
    // For now, assumes baseConfig handles necessary parsing and React/Hooks plugins.
  },
]

export default eslintNextConfig
