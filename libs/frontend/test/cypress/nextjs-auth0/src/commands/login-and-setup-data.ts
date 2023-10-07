export const loginAndSetupData = () => {
  cy.session(
    ['auth0-session'],
    () => {
      cy.loginToAuth0(
        Cypress.env('auth0Username'),
        Cypress.env('auth0Password'),
      )
    },
    {
      cacheAcrossSpecs: true,
    },
  )
}
