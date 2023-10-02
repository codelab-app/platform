import {
  type CypressElement,
  wrapSubject,
} from '@codelab/frontend/test/cypress/command'

export const getIcon = (
  subject: any,
  name: string,
  options?: Partial<
    Cypress.Loggable & Cypress.Shadow & Cypress.Timeoutable & Cypress.Withinable
  >,
): CypressElement => {
  return wrapSubject(subject).find(`.anticon-${name}`, options)
}
