/**
 * Login and seed user
 */
export const loginAndReinitData = () => {
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
  cy.postApiRequest('/admin/reinitialize-e2e-system-data')
}
