module.exports = {
  extends: '../../.eslintrc.js',
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['tsconfig.e2e.json'],
  },
}
