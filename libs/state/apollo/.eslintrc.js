module.exports = {
  extends: '../../../.eslintrc.js',
  root: true,
  settings: {
    'import/resolver': {
      typescript: {
        project: 'tsconfig.eslint.json',
      },
    },
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['tsconfig.eslint.json'],
  },
  rules: {
    camelcase: 0,
    'import/no-duplicates': 0,
    'import/order': 0,
    'import/newline-after-import': 0,
    'newline-after-var': 0,
    'newline-before-return': 0,
    'sort-imports': 0,
    'func-style': 0,
    '@typescript-eslint/array-type': 0,
  },
}
