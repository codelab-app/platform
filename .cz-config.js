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
      value: 'pref',
      name: '6) pref:     A code change that improves performance',
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
  ],
  scopes: [
    { value: '', name: '0) N/A' },
    { value: 'core', name: '1) core' },
    { value: 'core-e2e', name: '2) core-e2e' },
    { value: 'docs', name: '3) docs' },
    {
      value: 'plugins-react-e2e',
      name: '4) plugins-react-e2e',
    },
    { value: 'common', name: '5) common' },
    { value: 'd3', name: '6) d3' },
    { value: 'dto', name: '7) dto' },
    {
      value: 'eslint-config-codelab',
      name: '8) eslint-config-codelab',
    },
    { value: 'plugins-react', name: '9) plugins-react' },
    { value: 'props', name: '10) props' },
    { value: 'ui', name: '11) ui' },
    { value: 'utils', name: '12) utils' },
  ],
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
      'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
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
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
}
