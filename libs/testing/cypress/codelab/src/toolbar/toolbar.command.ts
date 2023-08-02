export const getToolbarItem = (title: string) => {
  return cy.get(`[data-cy="codelabui-toolbar-item-${title}"]`)
}
