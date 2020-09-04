module.exports = {
  extends: require.resolve('./dist/libs/eslint-config-codelab'),
  parserOptions: {
    tsconfigRootDir: '.',
    project: ['tsconfig.eslint.json'],
  },
}
