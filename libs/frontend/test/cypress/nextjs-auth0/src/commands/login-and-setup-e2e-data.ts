/**
 * Login and seed user
 */
export const loginAndSetupE2eData = () => {
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
  cy.postApiRequest('/admin/setup-e2e-data')
}
