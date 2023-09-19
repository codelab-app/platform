import { absoluteRoot } from '@hon2a/cypress-without'

export const getTooltip = (
  text: string,
  options?: Partial<Cypress.Loggable & Cypress.Shadow & Cypress.Timeoutable>,
) =>
  text
    ? absoluteRoot().contains('.ant-tooltip:visible', text, options)
    : absoluteRoot().find('.ant-tooltip:visible', options)

export const expectTooltip = (
  text: string,
  options:
    | Partial<Cypress.Loggable & Cypress.Shadow & Cypress.Timeoutable>
    | undefined,
) => getTooltip(text, options).should('exist')

export const shouldHaveTooltip =
  (text: string, options?: Partial<Cypress.Loggable & Cypress.Timeoutable>) =>
  ($el: JQuery) => {
    cy.wrap($el).trigger('mouseover', { force: true, ...options })
    expectTooltip(text, options)

    cy.wrap($el).trigger('mouseout', { force: true, ...options })
    getTooltip(text).should('not.exist')
  }
