export const getCuiSidebar = (label: string) => {
  cy.log('getCuiSidebar', label)

  return cy.get(`[data-cy="codelabui-sidebar-${label}"]`, { log: false })
}

export const getCuiSidebarViewHeader = (label: string) => {
  cy.log('getCuiSidebarViewHeader', label)

  return cy.get(`[data-cy="codelabui-sidebar-view-header-${label}"]`, {
    log: false,
  })
}

export const getCuiSidebarViewContent = (label: string) => {
  cy.log('getCuiSidebarViewContent', label)

  return cy.get(`[data-cy="codelabui-sidebar-view-content-${label}"]`, {
    log: false,
  })
}

export const getCuiSidebarToolbarItem = (label: string) => {
  cy.log('getCuiSidebarToolbarItem', label)

  return cy.get(`[data-cy="codelabui-sidebar-toolbar-item-${label}"]`, {
    log: false,
  })
}
