import type { ModelUiKey } from '@codelab/frontend/abstract/types'
import { CY_DATA } from '@codelab/frontend/application/shared/data'
import type { CypressElement } from '@codelab/frontend/test/cypress/utils'
import type { Maybe } from '@codelab/shared/abstract/types'

export const getCuiSidebar = (key: ModelUiKey) => {
  Cypress.log({ message: key, name: 'getCuiSidebar' })

  return cy.get(CY_DATA.cuiSidebar(key).cySelector, { log: false })
}

export const getCuiSidebarViewHeader = (label: string) => {
  Cypress.log({
    message: label,
    name: 'getCuiSidebarViewHeader',
  })

  return cy.get(CY_DATA.cuiSidebarViewHeader(label).cySelector, {
    log: false,
  })
}

export const getCuiSidebarViewContent = (label: string) => {
  Cypress.log({
    message: label,
    name: 'getCuiSidebarViewContent',
  })

  return cy.get(CY_DATA.cuiSidebarViewContent(label).cySelector, {
    log: false,
  })
}

export const getCuiSidebarHeader = (subject: Maybe<CypressElement>) => {
  Cypress.log({
    name: 'getCuiSidebarHeader',
  })

  return subject
    ? cy.wrap(subject).find(CY_DATA.cuiSidebarHeader().cySelector, {
        log: false,
      })
    : cy.get(CY_DATA.cuiSidebarHeader().cySelector, {
        log: false,
      })
}
