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
import { codelabCommands } from '@codelab/frontend/test/cypress/cui'
import { nextjsAuth0Commands } from '@codelab/frontend/test/cypress/nextjs-auth0'
import { registerCommands } from '@codelab/frontend/test/cypress/shared'
import { utilsCommands } from '@codelab/frontend/test/cypress/utils'
import { commands } from './commands'

/**
 * When we register, the global Cypress types are loaded in the command files
 */
registerCommands([
  ...antCommands,
  ...codelabCommands,
  ...utilsCommands,
  ...nextjsAuth0Commands,
  /**
   * These commands depend on the previous
   */
  ...commands,
])
