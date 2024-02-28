/**
 * Login and seed user
 */
export const loginAndReinitializeE2eSystemData = () => {
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
  // cy.postApiRequest('/admin/reinitialize-e2e-system-data')
  cy.postApiRequest('/admin/reset-and-seed-user')
}
