import type { Maybe } from '@codelab/shared/abstract/types'
import type { CypressElement } from '@codelab/testing/cypress/command'

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

export const getCuiSidebarHeader = (subject: Maybe<CypressElement>) => {
  cy.log('getCuiSidebarHeader')

  return subject
    ? cy.wrap(subject).find(`[data-cy="codelabui-sidebar-header"]`, {
        log: false,
      })
    : cy.get(`[data-cy="codelabui-sidebar-header"]`, {
        log: false,
      })
}
