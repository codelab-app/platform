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

// Import commands.js using ES2015 syntax:
import 'cypress-nextjs-auth0'
// import '@hon2a/cypress-antd/lib/register'
import './commands'
import './antd/register'

Cypress.on('uncaught:exception', (err) => {
  const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/

  /* returning false here prevents Cypress from failing the test */
  return !resizeObserverLoopErrRe.test(err.message)
})

/**
 * Preserve cookies globally here
 * https://docs.cypress.io/api/cypress-api/cookies#Defaults
 */
beforeEach(() => {
  Cypress.Cookies.preserveOnce(
    'appSession',
    'appSession.0',
    'appSession.1',
    'appSession.2',
    'appSession.3',
  )
})
