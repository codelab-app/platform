// React rules configuration - using plugins from the foundation file
// NO PLUGIN REGISTRATION HERE - plugins are registered only in eslint.config.mjs
import reactPlugin from 'eslint-plugin-react'

export default [
  // Config 1: *.tsx, *.jsx (React & Tailwind CSS)
  // tailwindcssPlugin.configs.recommended,
  // readableTailwindPlugin.configs.recommended,
  // reactPlugin.configs.recommended,
  {
    files: ['**/*.{tsx,jsx}'],
    plugins: {
      react: reactPlugin,
    },
    rules: {
      ...(reactPlugin.configs.recommended?.rules || {}),
      ...(reactPlugin.configs['jsx-runtime']?.rules || {}),
      'readable-tailwind/multiline': [
        'error',
        {
          group: 'newLine',
          preferSingleLine: true,
          classesPerLine: 3,
        },
      ],
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/prop-types': 'off', // Disable prop-types rule (using TypeScript)
      'react/no-unescaped-entities': 'off',
      'react/jsx-sort-props': 'error', // Enforce alphabetical sorting of props
      'react/no-unknown-property': [
        'error',
        {
          ignore: ['css'], // Allow 'css' prop for CSS-in-JS libraries
        },
      ],
      'react/jsx-props-no-spreading': [
        'error',
        {
          html: 'enforce',
          custom: 'enforce',
          explicitSpread: 'enforce',
          exceptions: [], // No exceptions by default
        },
      ],
      'react/jsx-curly-brace-presence': 'error', // Enforce curly braces presence
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
      tailwindcss: {
        // Optional: specify config path if not auto-detected
        // config: 'tailwind.config.js',
      },
    },
  },
  // Config 2: *.stories.jsx, *.stories.tsx (Storybook Specific Overrides)
  {
    files: ['**/*.stories.{jsx,tsx}'],
    // No plugins property - plugins are registered only in eslint.config.mjs
    rules: {
      // Allow prop spreading in Storybook files
      'react/jsx-props-no-spreading': 'off',
    },
  },
]
