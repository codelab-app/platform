module.exports = {
  extends: '../../.eslintrc.js',
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['tsconfig.json', 'tsconfig.spec.json'],
  },
}
