import tailwind from 'eslint-plugin-tailwindcss'
import pluginReadableTailwind from 'eslint-plugin-readable-tailwind'
import pluginTailwindcss from 'eslint-plugin-tailwindcss'

export default [
  ...tailwind.configs['flat/recommended'],
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      tailwindcss: pluginTailwindcss,
      'readable-tailwind': pluginReadableTailwind,
    },
    rules: {
      ...(pluginTailwindcss.configs.recommended?.rules || {}),
      ...(pluginReadableTailwind.configs.error?.rules || {}),
      'tailwindcss/classnames-order': 'off',
      // enable all recommended rules to warn
      ...pluginReadableTailwind.configs.warning.rules,
      // enable all recommended rules to error
      ...pluginReadableTailwind.configs.error.rules,

      // or configure rules individually
      'readable-tailwind/multiline': ['warn', { printWidth: 100 }],

      // Apply recommended rules first
      // Custom overrides and additional rules
      'tailwindcss/classnames-order': 'off', // Disable default class order, prefer readable-tailwind

      'tailwindcss/no-custom-classname': ['error'], // Disallow custom classnames not in Tailwind config
    },
  },
]
