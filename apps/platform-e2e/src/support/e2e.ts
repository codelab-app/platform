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
import { antCommands } from '@codelab/testing/cypress/antd'
import { codelabUICommands } from '@codelab/testing/cypress/codelab'
import {
  databaseCommands,
  graphQLCommands,
  registerCommands,
  userCommands,
} from '@codelab/testing/cypress/command'
import { nextjsAuth0Commands } from '@codelab/testing/cypress/nextjs-auth0'
import { builderCommands } from './builder'
import { UICommands } from './entities'

registerCommands([
  ...graphQLCommands,
  ...userCommands,
  ...antCommands,
  ...codelabUICommands,
  ...databaseCommands,
  ...UICommands,
  ...nextjsAuth0Commands,
  ...builderCommands,
])

// afterEach(stopOnFirstError)

// This actually make some tests get skipped even if it seems the e2e
// tests are passing, so it could skip testing breaking changes
// Lets comment this out for now
// Cypress.on('test:after:run', (test) => {
//   if (test.state !== 'passed' && test.retries > 0) {
//     ;(Cypress as any).runner.stop()
//   }
// })
