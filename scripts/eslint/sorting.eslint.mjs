import perfectionistPlugin from 'eslint-plugin-perfectionist'
import tsPlugin from '@typescript-eslint/eslint-plugin'

/**
 * ESLint configuration for code sorting and ordering rules.
 */
export default [
  // Config 1: *.ts, *.tsx, *.js, *.jsx (General Sorting)
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      perfectionist: perfectionistPlugin,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...(perfectionistPlugin.configs['recommended-natural-legacy']?.rules ||
        {}),
      // Specific overrides for perfectionist
      'perfectionist/sort-interfaces': 'off',
      'perfectionist/sort-intersection-types': 'off',
      // Breaks up logical grouping
      'perfectionist/sort-modules': 'off',
      'perfectionist/sort-object-types': 'off',
      // Handled by @typescript-eslint/member-ordering
      'perfectionist/sort-classes': 'off',
      'perfectionist/sort-jsx-props': 'off',
      'perfectionist/sort-union-types': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          ignoreCase: true,
          partitionByNewLine: false,
          partitionByComment: false,
          groups: [
            'conditional',
            'function',
            'import',
            'intersection',
            'keyword',
            'literal',
            'named',
            'object',
            'operator',
            'tuple',
            'union',
            'nullish',
          ],
        },
      ],
      // TypeScript specific member ordering
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: {
            // "optionalityOrder": "required-first",
            // "order": "alphabetically"
          },
          interfaces: {
            memberTypes: ['signature', 'constructor', 'field', 'method'],
            // "optionalityOrder": "required-first",
            order: 'alphabetically',
          },
          classes: {
            memberTypes: [
              ['public-static-field', 'public-static-method'],
              'get',
              'public-field',
              'public-method',
              [
                'protected-field',
                'protected-get',
                'protected-set',
                'protected-method',
              ],
              'private-static-method',
              'private-static-field',
              ['private-field', 'private-method'],
              'private-get',
              'private-set',
            ],
            order: 'alphabetically',
          },
        },
      ],
    },
  },
  // Config 2: *.schema.ts, *.config.ts (Disable sorting)
  {
    files: ['**/*.schema.ts', '**/*.config.ts'],
    rules: {
      // Disable sorting for specific file types where order might matter
      'perfectionist/sort-objects': 'off',
    },
  },
]
