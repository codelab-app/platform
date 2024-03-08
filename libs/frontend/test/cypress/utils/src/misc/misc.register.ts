export const waitForSpinners = () => {
  Cypress.log({
    name: 'Wait for spinners',
  })
  cy.getSpinner().should('not.exist')
}
