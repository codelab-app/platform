import { CY_DATA_SELECTOR } from '@codelab/frontend/abstract/testing'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { CypressElement } from '@codelab/testing/cypress/command'

export const getCuiSidebar = (label: string) => {
  cy.log('getCuiSidebar', label)

  return cy.get(CY_DATA_SELECTOR.cuiSidebar(label), { log: false })
}

export const getCuiSidebarViewHeader = (label: string) => {
  cy.log('getCuiSidebarViewHeader', label)

  return cy.get(CY_DATA_SELECTOR.cuiSidebarViewHeader(label), {
    log: false,
  })
}

export const getCuiSidebarViewContent = (label: string) => {
  cy.log('getCuiSidebarViewContent', label)

  return cy.get(CY_DATA_SELECTOR.cuiSidebarViewContent(label), {
    log: false,
  })
}

export const getCuiSidebarHeader = (subject: Maybe<CypressElement>) => {
  cy.log('getCuiSidebarHeader')

  return subject
    ? cy.wrap(subject).find(CY_DATA_SELECTOR.cuiSidebarHeader(), {
        log: false,
      })
    : cy.get(CY_DATA_SELECTOR.cuiSidebarHeader(), {
        log: false,
      })
}
