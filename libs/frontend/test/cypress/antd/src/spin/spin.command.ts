import {
  type CypressElement,
  domClasses,
} from '@codelab/frontend/test/cypress/utils'

export const getSpinner = (subject: any): CypressElement => {
  Cypress.log({
    name: 'getSpinner',
  })

  return subject
    ? cy.wrap(subject, { log: false }).find(domClasses.spinner, { log: false })
    : cy.get(domClasses.spinner, { log: false })
}

export const waitForSpinners = () => {
  Cypress.log({
    name: 'wait for spinners',
  })
  cy.getSpinner().should('not.exist')
}
