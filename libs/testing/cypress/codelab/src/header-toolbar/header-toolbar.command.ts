export const getHeaderToolbarItem = (title: string) => {
  cy.log('getHeaderToolbarItem', title)

  return cy
    .get('[data-cy="codelabui-header-toolbar"]', { log: false })
    .get(`[data-cy="codelabui-toolbar-item-${title}"]`, { log: false })
}
