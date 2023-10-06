import { antCommands } from '@codelab/frontend/test/cypress/antd'
import { registerCommands } from '@codelab/frontend/test/cypress/shared'

registerCommands([...antCommands])

export const loginToAuth0 = (username: string, password: string) => {
  const log = Cypress.log({
    autoEnd: false,

    displayName: 'AUTH0 LOGIN',

    message: [`🔐 Authenticating | ${username}`],
  })

  log.snapshot('before')

  loginViaAuth0Ui(username, password)

  log.snapshot('after')
  log.end()
}

const loginViaAuth0Ui = (username: string, password: string) => {
  cy.visit('/')
  // cy.get('button#login').click()
  cy.getButton({ label: 'Log In' }).click()

  // Login on Auth0.
  cy.origin(
    Cypress.env('auth0IssuerBaseUrl'),
    { args: { password, username } },
    ({ password: cyPassword, username: cyUsername }) => {
      console.log(cyPassword, cyUsername)
      // App landing page redirects to Auth0.
      cy.get('input#username').type(cyUsername)
      cy.get('input#password').type(cyPassword, { log: false })
      cy.contains('button[value=default]', 'Continue').click({
        force: true,
        timeout: 15000,
      })
    },
  )

  // Ensure Auth0 has redirected us back to the RWA.
  cy.url().should('include', Cypress.env('auth0BaseUrl'))
}
