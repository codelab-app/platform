/**
 * Asserting both caching and data persistence by reloading the page
 * should be used whenever doing a test that mutates the data in the database
 */
export const assertTwice = (assertion: () => void, postReload?: () => void) => {
  assertion()
  cy.reload()
  postReload?.()
  assertion()
}
