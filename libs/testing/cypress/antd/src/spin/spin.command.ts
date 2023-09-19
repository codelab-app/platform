import {
  type CypressElement,
  domClasses,
} from '@codelab/testing/cypress/command'

export const getSpinner = (subject: any): CypressElement =>
  subject
    ? cy.wrap(subject).find(domClasses.spinner)
    : cy.get(domClasses.spinner)
