export const getCuiPopover = (title: string) => {
  return cy.get(`[data-cy="codelabui-sidebar-popover-${title}"]`)
}
