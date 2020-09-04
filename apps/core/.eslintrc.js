module.exports = {
  extends: '../../.eslintrc',
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['tsconfig.json', 'tsconfig.spec.json'],
  },
}
