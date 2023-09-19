export const getCuiSidebar = (label: string) => {
  return cy.get(`[data-cy="codelabui-sidebar-${label}"]`)
}

export const getCuiSidebarViewHeader = (label: string) => {
  return cy.get(`[data-cy="codelabui-sidebar-view-header-${label}"]`)
}

export const getCuiSidebarViewContent = (label: string) => {
  return cy.get(`[data-cy="codelabui-sidebar-view-content-${label}"]`)
}

export const getCuiSidebarToolbarItem = (label: string) => {
  return cy.get(`[data-cy="codelabui-sidebar-toolbar-item-${label}"]`)
}
