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
  cy.get('button#login').click()

  cy.origin(
    Cypress.env('auth0IssuerBaseUrl'),
    { args: { password, username } },
    ({ password: cyPassword, username: cyUsername }) => {
      cy.get('input#username').type(cyUsername)
      cy.get('input#password').type(cyPassword, { log: false })
      cy.contains('button[value=default]', 'Continue').click({
        force: true,
      })
    },
  )

  cy.url({}).should('include', Cypress.env('auth0BaseUrl'))
}
