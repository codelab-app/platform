export const getCuiHeaderToolbar = () => {
  cy.log('getCuiHeaderToolbar')

  return cy.get('[data-cy="codelabui-header-toolbar"]', { log: false })
}
