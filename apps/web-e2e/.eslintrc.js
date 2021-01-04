module.exports = {
  extends: ['../../.eslintrc.js'],
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
  env: {
    'cypress/globals': true,
  },
  plugins: ['cypress'],
}
