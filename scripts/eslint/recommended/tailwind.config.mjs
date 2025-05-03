import eslintPluginReadableTailwind from 'eslint-plugin-readable-tailwind'
import tailwind from 'eslint-plugin-tailwindcss'

export default [
  ...tailwind.configs['flat/recommended'],
  {
    files: ['**/*.{jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'readable-tailwind': eslintPluginReadableTailwind,
    },
    rules: {
      // enable all recommended rules to warn
      ...eslintPluginReadableTailwind.configs.warning.rules,
      // enable all recommended rules to error
      ...eslintPluginReadableTailwind.configs.error.rules,

      // or configure rules individually
      'readable-tailwind/multiline': ['warn', { printWidth: 100 }],

      // Apply recommended rules first
      // Custom overrides and additional rules
      'tailwindcss/classnames-order': 'off', // Disable default class order, prefer readable-tailwind

      'tailwindcss/no-custom-classname': ['error'], // Disallow custom classnames not in Tailwind config
    },
  },
]
