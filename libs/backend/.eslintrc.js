module.exports = {
  extends: '../../.eslintrc.js',
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
    '@typescript-eslint/ban-ts-comment': 'off',
    'consistent-return': 'off',
    'no-return-await': 'off',
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
}
