import {
  type CypressElement,
  domClasses,
} from '@codelab/frontend/test/cypress/utils'

export const getSpinner = (subject: any): CypressElement =>
  subject
    ? cy.wrap(subject).find(domClasses.spinner)
    : cy.get(domClasses.spinner)

export const waitForSpinners = () => {
  Cypress.log({
    name: 'wait for spinners',
  })
  cy.getSpinner().should('not.exist')
}
