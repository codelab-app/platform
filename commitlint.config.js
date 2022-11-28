const util = require('util')
const czConfig = require('./.cz-config.js')

const allowedTypes = czConfig.types.map((type) => type.value)
const allowedScopes = czConfig.scopes.map((scope) => scope.value)

module.exports = {
  // plugins: ['commitlint-plugin-jira-rules'],
  plugins: [
    // This allows us custom Regex rules for subject
    'commitlint-plugin-function-rules',
  ],
  extends: [
    '@commitlint/config-conventional',
    'cz',
    // '@commitlint/config-lerna-scopes',
    // 'jira',
  ],
  parserPreset: {
    // headerPattern: /^[a-z]+/,
    // parserOpts: {
    //   issuePrefixes: ['CODE-'],
    // },
  },
  rules: {
    // Jira
    // 'jira-task-id-separator': [0],
    // Default
    'type-enum': [2, 'always', allowedTypes],
    'scope-enum': [2, 'always', allowedScopes],
    // 'references-empty': [2, 'never'],
    'function-rules/subject-case': [
      2,
      'always',
      (parsed) => {
        const subject = parsed.subject
        const startWithRegex = /^[a-z]|#\d+\s[a-z]/
        const endWithRegex = /[a-z]$/

        /**
         * V feat(apps-builder): add some new feature
         * V feat(apps-builder): #1230 add some new feature
         * X feat(apps-builder): Add some new feature
         * X feat(apps-builder): #1234 Add some new feature
         * X feat(apps-builder): (#1234) add some new feature
         */
        if (!startWithRegex.test(subject)) {
          return [false, 'Subject must start with a lower case alphabet or issue number']
        }

        /**
         * V feat(apps-builder): add some new feature
         * X feat(apps-builder): add some new feature #1230
         * X feat(apps-builder): add some new feature (#1230)
         */
        if (!endWithRegex.test(subject)) {
          return [
            false,
            'Subject must end with a lower case alphabet',
          ]
        }

        return [true]
      },
    ],
    // 'subject-case': [
    //   2,
    //   'always',
    //   //
    //   // Remove to allow build(doc): CODE-29 some message
    //   //
    //   ['lower-case']
    //   // 'lower-case', // default
    //   // 'upper-case', // UPPERCASE
    //   // 'camel-case', // camelCase
    //   // 'kebab-case', // kebab-case
    //   // 'pascal-case', // PascalCase
    //   // 'sentence-case', // Sentence case
    //   // 'snake-case', // snake_case
    //   // 'start-case' // Start Case
    // ],
  },
}
