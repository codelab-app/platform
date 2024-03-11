import { CY_DATA_SELECTOR } from '@codelab/frontend/application/shared/data'
import type { CypressElement } from '@codelab/frontend/test/cypress/utils'
import type { Maybe } from '@codelab/shared/abstract/types'

export const getCuiSidebar = (label: string) => {
  cy.log('getCuiSidebar', label)

  return cy.get(CY_DATA_SELECTOR.cuiSidebar(label), { log: false })
}

export const getCuiSidebarViewHeader = (label: string) => {
  Cypress.log({
    message: label,
    name: 'getCuiSidebarViewHeader',
  })

  return cy.get(CY_DATA_SELECTOR.cuiSidebarViewHeader(label), {
    log: false,
  })
}

export const getCuiSidebarViewContent = (label: string) => {
  Cypress.log({
    message: label,
    name: 'getCuiSidebarViewContent',
  })

  return cy.get(CY_DATA_SELECTOR.cuiSidebarViewContent(label), {
    log: false,
  })
}

export const getCuiSidebarHeader = (subject: Maybe<CypressElement>) => {
  Cypress.log({
    name: 'getCuiSidebarHeader',
  })

  return subject
    ? cy.wrap(subject).find(CY_DATA_SELECTOR.cuiSidebarHeader(), {
        log: false,
      })
    : cy.get(CY_DATA_SELECTOR.cuiSidebarHeader(), {
        log: false,
      })
}
