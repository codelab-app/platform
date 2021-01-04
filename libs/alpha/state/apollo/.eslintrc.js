module.exports = {
  extends: '../../../../.eslintrc.js',
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
    'func-style': 0,
  },
}
