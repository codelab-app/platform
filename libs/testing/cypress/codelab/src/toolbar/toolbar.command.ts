export const getToolbarItem = (title: string) => {
  cy.log('getToolbarItem', title)

  return cy.get(`[data-cy="codelabui-toolbar-item-${title}"]`, { log: false })
}
