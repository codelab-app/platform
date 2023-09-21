export const getCuiNavigationBarItem = (title: string) => {
  cy.log('getCuiNavigationBarItem', title)

  return cy
    .get(`[data-cy="navigation-bar-item-${title}"]`, { log: false })
    .closest('.ant-menu-item', { log: false })
}
