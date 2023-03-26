// asserting both caching and data persistence
export const assertTwice = (assertion: () => void, postReload?: () => void) => {
  assertion()
  cy.reload()
  postReload?.()
  assertion()
}
