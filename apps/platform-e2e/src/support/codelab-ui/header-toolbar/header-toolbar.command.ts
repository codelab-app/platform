export const getHeaderToolbarItem = (title: string) => {
  return cy
    .get('[data-cy="codelabui-header-toolbar"]')
    .get(`[data-cy="codelabui-toolbar-item-${title}"]`)
}
