module.exports = {
  extends: '../../.eslintrc',
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['tsconfig.e2e.json'],
  },
}
