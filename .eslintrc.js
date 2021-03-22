module.exports = {
  extends: require.resolve('./dist/libs/tools/eslint-config-codelab'),
  parserOptions: {
    tsconfigRootDir: '.',
    extraFileExtensions: ['.graphql'],
    project: ['tsconfig.eslint.json'],
  },
  rules: {
    'import/no-cycle': 'off',
    'import/extensions': [1, { json: 'always' }],
    // 'unused-imports/no-unused-imports-ts': 'error',
  },
}
