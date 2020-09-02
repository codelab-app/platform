module.exports = {
  extends: '../../.eslintrc.js',
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['tsconfig.app.json', 'tsconfig.spec.json'],
  },
}
