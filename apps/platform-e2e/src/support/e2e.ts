// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
import '@testing-library/cypress/add-commands'
import { antCommands } from '@codelab/frontend/test/cypress/antd'
import { auth0Commands } from '@codelab/frontend/test/cypress/auth0'
import { codelabCommands } from '@codelab/frontend/test/cypress/cui'
import { registerCommands } from '@codelab/frontend/test/cypress/shared'
import { utilsCommands } from '@codelab/frontend/test/cypress/utils'
import { commands } from './commands'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('cypress-terminal-report/src/installLogsCollector')()

/**
 * When we register, the global Cypress types are loaded in the command files
 */
registerCommands([
  ...antCommands,
  ...codelabCommands,
  ...utilsCommands,
  ...auth0Commands,
  /**
   * These commands depend on the previous
   */
  ...commands,
])

before(() => {
  Cypress.log({
    message: 'Running before hook inside e2e.ts',
    name: 'setup e2e',
  })
  cy.loginAndSetupE2eData()
})
