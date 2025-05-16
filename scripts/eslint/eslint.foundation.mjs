import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import tseslint from 'typescript-eslint'
import eslint from '@eslint/js'

export default tseslint.config({
  // -- language + parser shared by EVERY slice after this one -------------
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parser: tseslint.parser,
    parserOptions: {
      // New in TS-ESLint 8: keeps a cache of Programs instead of re-building
      projectService: true,
    },
  },

  // -- ONE resolver instance for the whole run ----------------------------
  // settings: {
  //   'import/resolver': {
  //     typescript: createTypeScriptImportResolver({
  //       // ☑ No "project" → resolver starts at each source file's nearest tsconfig
  //       alwaysTryTypes: true,
  //       // project: '(apps|libs)/**/tsconfig.json',
  //     }),
  //   },
  //   // Keep settings from original import.config.mjs if needed, e.g., import/parsers
  //   'import/parsers': {
  //     '@typescript-eslint/parser': ['.ts', '.tsx'],
  //   },
  // },
})
