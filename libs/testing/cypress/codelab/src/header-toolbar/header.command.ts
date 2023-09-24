export const getCuiHeader = () => {
  cy.log('getCuiHeader')

  return cy.get('[data-cy="codelabui-header"]', { log: false })
}
