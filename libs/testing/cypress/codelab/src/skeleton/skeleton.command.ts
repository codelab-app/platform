export const getCuiSkeleton = () => {
  cy.log('getCuiSkeleton')

  return cy.get(`[data-cy="codelabui-skeleton"]`, { log: false })
}
