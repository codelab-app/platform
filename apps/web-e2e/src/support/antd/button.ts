import { Label } from './types'

export const getButton = (
  label: Label,
  options?: Partial<
    Cypress.Loggable &
      Cypress.Timeoutable &
      Cypress.CaseMatchable &
      Cypress.Shadow
  >,
) => cy.contains('.ant-btn', label, options)
