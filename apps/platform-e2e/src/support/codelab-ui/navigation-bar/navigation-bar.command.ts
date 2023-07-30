export const getCuiNavigationBarItem = (title: string) => {
  return cy
    .get(`[data-cy="navigation-bar-item-${title}"]`)
    .closest('.ant-menu-item')
}
