module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        'unused-imports/no-unused-imports': process.CI ? 'error' : 'off',
      },
    },
  ],
}
