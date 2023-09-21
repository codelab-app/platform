export const getCuiPopover = (title: string) => {
  cy.log('getCuiPopover', title)

  return cy.get(`[data-cy="codelabui-sidebar-popover-${title}"]`, {
    log: false,
  })
}
