import {
  type CypressElement,
  domClasses,
} from '@codelab/frontend/test/cypress/command'

export const getSpinner = (subject: any): CypressElement =>
  subject
    ? cy.wrap(subject).find(domClasses.spinner)
    : cy.get(domClasses.spinner)
