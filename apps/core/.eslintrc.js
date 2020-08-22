module.exports = {
  extends: '@codelab/eslint-config-codelab',
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['tsconfig.lib.json', 'tsconfig.spec.json'],
  },
}
