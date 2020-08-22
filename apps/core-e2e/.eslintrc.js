module.exports = {
  extends: '@codelab/eslint-config-codelab',
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['tsconfig.e2e.json'],
  },
}
