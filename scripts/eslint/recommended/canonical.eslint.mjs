import pluginCanonical from 'eslint-plugin-canonical'

export default [
  pluginCanonical.configs['flat/recommended'],
  {
    rules: {
      'canonical/destructuring-property-newline': 'off',
      'canonical/import-specifier-newline': 'off',
      'canonical/id-match': 'off',
      // 'canonical/id-match': [
      //   'error',
      //   '(^[A-Za-z]+(?:[A-Z][a-z]*)*\\d*$)|(^[A-Z]+(_[A-Z]+)*(_\\d$)*$)|(^(_|\\$)$)|(^[aA]uth0[A-Za-z]*$)|(^[rR]eact19[A-Za-z]*$)|(^[mM]2[mM][A-Za-z]*$)|(^__typename$)',
      // ],
    },
  },
  // Schema file specific rules
  {
    files: ['*.schema.ts', '*.schema.interface.ts'],
    rules: {
      'perfectionist/sort-objects': 'off',
    },
  },
]
