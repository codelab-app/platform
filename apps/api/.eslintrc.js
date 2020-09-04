module.exports = {
  extends: '../../.eslintrc',
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['tsconfig.app.json', 'tsconfig.spec.json'],
  },
}
