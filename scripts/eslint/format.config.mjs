// import tsPlugin from '@typescript-eslint/eslint-plugin'
// import canonicalPlugin from 'eslint-plugin-canonical'; // Add if canonical rule is used

export default [
  {
    files: ['**/*.{ts,tsx,js,jsx}'], // Adjusted glob pattern
    // plugins: {
    //   '@typescript-eslint': tsPlugin,
    //   // canonical: canonicalPlugin,
    // },
    rules: {
      '@typescript-eslint/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: ['interface', 'type'],
        },
      ],
      // This is the base ESLint rule, ensure it doesn't conflict with the TS version if both are active
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: ['const', 'let', 'var', 'block', 'if', 'block-like', 'return'],
        },
        {
          blankLine: 'always',
          prev: ['const', 'let', 'var', 'if', 'block-like'],
          next: '*',
        },
        {
          blankLine: 'always',
          prev: ['const', 'let', 'var'],
          next: ['expression', 'block', 'block-like', 'return'],
        },
        // {
        //   "blankLine": "any",
        //   "prev": ["const", "let", "var"],
        //   "next": ["const", "let", "var", "expression"]
        // },
        {
          blankLine: 'never',
          prev: ['singleline-const', 'singleline-let', 'singleline-var'],
          next: ['singleline-const', 'singleline-let', 'singleline-var'],
        },
        {
          blankLine: 'always',
          prev: ['*'],
          next: ['multiline-const', 'multiline-let', 'multiline-var'],
        },
        {
          blankLine: 'always',
          prev: ['multiline-const', 'multiline-let', 'multiline-var'],
          next: ['*'],
        },
        {
          blankLine: 'any',
          prev: ['cjs-import'],
          next: ['const', 'let', 'var'],
        },
      ],
      'lines-between-class-members': ['error', 'always'],
      'spaced-comment': [
        'error',
        'always',
        {
          markers: ['/'],
          block: {
            balanced: true,
          },
        },
      ],
      'no-inline-comments': 'error',
      // 'canonical/export-specifier-newline': 'off', // Ensure canonical plugin is imported if used
    },
  },
]
