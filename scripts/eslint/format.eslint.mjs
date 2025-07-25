import stylistic from '@stylistic/eslint-plugin'
// import tsPlugin from '@typescript-eslint/eslint-plugin'

/**
 * ESLint configuration for code formatting rules.
 */
export default [
  {
    files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
    plugins: {
      '@stylistic': stylistic,
      // '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@stylistic/padding-line-between-statements': [
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
    },
  },
]
