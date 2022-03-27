export const getIcon = (
  name: string,
  options?: Partial<
    Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow
  >,
) => cy.get(`.anticon-${name}`, options)
