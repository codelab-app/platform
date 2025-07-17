import pluginCanonical from 'eslint-plugin-canonical'

export default [
  pluginCanonical.configs['flat/recommended'],
  {
    rules: {
      'canonical/destructuring-property-newline': 'off',
      'canonical/import-specifier-newline': 'off',
      'canonical/id-match': [
        'error',
        '(^[A-Za-z]+(?:[A-Z][a-z]*)*\\d*$)|(^[A-Z]+(_[A-Z]+)*(_\\d$)*$)|(^(_|\\$)$)|(^auth0Instance$)|(^React19Compatibility$)|(^Auth0Provider$)',
      ],
    },
  },
  // Schema file specific rules
  {
    files: ['*.schema.ts', '*.schema.interface.ts'],
    rules: {
      'canonical/sort-keys': 'off',
    },
  },
]
