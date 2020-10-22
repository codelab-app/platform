const path = require('path')
const glob = require('glob')
const R = require('ramda')

const files = glob.sync('@(apps|libs)/**/tsconfig.json', {
  ignore: [
    '**/node_modules/**/tsconfig.json',
    '**/.storybook/**/tsconfig.json',
  ],
})

/**
 * We take the file path and creating array of dirnames. We then create all ordered combinations. We will have duplicates at this point
 */
const allPathCombinations = (paths, file) => {
  // ['libs', 'core', 'node']
  const pathSepArr = path.dirname(file).split(path.sep)

  // ['libs']
  // ['libs-core']
  // ['libs-core-node']
  const nestedPaths = pathSepArr.reduce((acc, curr, index) => {
    return [...acc, pathSepArr.slice(0, index + 1).join('-')]
  }, [])

  return [...paths, ...nestedPaths]
}

const scopes = R.pipe(
  R.reduce(allPathCombinations, []),
  R.sort((a, b) => a.localeCompare(b)),
  R.uniq,
  R.addIndex(R.map)((name, index) => {
    return {
      value: name,
      name: `${index + 1}) ${name}`,
    }
  }),
)(files)

// console.log(scopes)

module.exports = {
  types: [
    { value: 'feat', name: '1) feat:     A new feature' },
    { value: 'fix', name: '2) fix:      A bug fix' },
    { value: 'docs', name: '3) docs:     Documentation only changes' },
    {
      value: 'style',
      name: '4) style:    Changes that do not affect the meaning of the code',
    },
    {
      value: 'refactor',
      name:
        '5) refactor: A code change that neither fixes a bug nor adds a feature	',
    },
    {
      value: 'perf',
      name: '6) perf:     A code change that improves performance',
    },
    {
      value: 'test',
      name: '7) test:     Adding missing tests or correcting existing tests',
    },
    {
      value: 'build',
      name:
        '8) build:    Changes that affect the build system or external dependencies',
    },
    {
      value: 'ci',
      name: '9) ci:       Changes to our CI configuration files and scripts',
    },
    {
      value: 'chore',
      name: "10) chore:   Other changes that don't modify src or test files",
    },
    {
      value: 'revert',
      name: '11) revert:  Reverts a previous commit',
    },
    {
      value: 'story',
      name: '12) story:  Storybook examples',
    },
  ],
  scopes,
  allowTicketNumber: true,
  isTicketNumberRequired: false,
  ticketNumberPrefix: '',
  ticketNumberRegExp: '#\\d{1,5}',
  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  // override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you're committing:",
    scope: '\nDenote the SCOPE of this change (optional):',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body:
      'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer:
      'This commit CLOSES any issues if specified (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?',
  },
  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  // skipQuestions: ['ticketNumber'],
  skipQuestions: ['breaking'],
  // limit subject length
  subjectLimit: 100,
  // breaklineChar: '|', // It is supported for fields body and footer.
  footerPrefix: 'CLOSES:',
  // askForBreakingChangeFirst : true, // default is false
}
