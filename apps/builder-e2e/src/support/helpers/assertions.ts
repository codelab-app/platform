// asserting both caching and data persistence
export const assertTwice = (assertion: () => void) => {
  assertion()
  cy.reload()
  assertion()
}
