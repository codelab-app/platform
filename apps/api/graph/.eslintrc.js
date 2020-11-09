module.exports = {
  extends: '../../../.eslintrc.js',
  root: true,
  settings: {
    'import/resolver': {
      typescript: {
        project: 'tsconfig.eslint.json',
      },
    },
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['tsconfig.eslint.json'],
  },
  rules: {
    'react/static-property-placement': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-useless-constructor': 'off',
  },
}
