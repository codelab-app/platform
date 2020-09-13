module.exports = {
  extends: require.resolve('./dist/libs/tools/eslint-config-codelab'),
  parserOptions: {
    tsconfigRootDir: '.',
    project: ['tsconfig.eslint.json'],
  },
  rules: {
    // 'unused-imports/no-unused-imports-ts': 'error',
    // 'arrow-body-style': off,
    // 'nx-enforce-module-boundaries': [
    //   'error',
    //   {
    //     allow: [],
    //     depConstraints: [
    //       // standalone cannot have deps
    //       {
    //         sourceTag: 'scope:standalone',
    //         onlyDependOnLibsWithTags: [],
    //       },
    //     ],
    //   },
    // ],
  },
}
