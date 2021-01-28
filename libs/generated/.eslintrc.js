module.exports = {
  extends: '../../.eslintrc.js',
  root: true,
  settings: {
    'import/resolver': {
      typescript: {
        project: 'tsconfig.eslint.json',
      },
    },
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['tsconfig.eslint.json'],
  },
}
