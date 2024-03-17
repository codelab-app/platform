import { CY_DATA } from '@codelab/frontend/application/shared/data'
import type { CypressElement } from '@codelab/frontend/test/cypress/utils'
import type { Maybe } from '@codelab/shared/abstract/types'

export const getCuiTreeItem = () => {
  Cypress.log({
    name: 'getCuiTreeItem',
  })

  return cy.get(CY_DATA.cuiTreeItem().cySelector, { log: false })
}

/**
 *
 * @returns Traverse up to find the container
 */
export const closestCuiTreeItem = (subject: Maybe<CypressElement>) => {
  Cypress.log({
    name: 'closestCuiTreeItem',
  })

  return cy
    .wrap(subject, { log: false })
    .closest(CY_DATA.cuiTreeItem().cySelector, { log: false })
}

export const getCuiTreeItemByPrimaryTitle = (
  subject: Maybe<CypressElement>,
  primaryTitle: string,
) => {
  Cypress.log({ message: primaryTitle, name: 'getCuiTreeItemByPrimaryTitle' })

  return subject
    ? cy
        .wrap(subject, { log: false })
        .find(CY_DATA.cuiTreeItemPrimaryTitle(primaryTitle).cySelector, {
          log: false,
        })
    : cy.get(CY_DATA.cuiTreeItemPrimaryTitle(primaryTitle).cySelector, {
        log: false,
      })
}

export const getCuiTreeItemBySecondaryTitle = (
  subject: Maybe<CypressElement>,
  secondaryTitle: string,
) => {
  Cypress.log({
    message: secondaryTitle,
    name: 'getCuiTreeItemBySecondaryTitle',
  })

  return subject
    ? cy
        .wrap(subject)
        .find(CY_DATA.cuiTreeItemSecondaryTitle(secondaryTitle).cySelector, {
          log: false,
        })
    : cy.get(CY_DATA.cuiTreeItemSecondaryTitle(secondaryTitle).cySelector, {
        log: false,
      })
}

export const getCuiTreeItemToolbar = (subject: Maybe<CypressElement>) => {
  Cypress.log({
    message: 'getCuiTreeItemToolbar',
  })

  return cy
    .wrap(subject)
    .closest(CY_DATA.cuiTreeItem().cySelector, { log: false })
    .find(CY_DATA.cuiTreeItemToolbar().cySelector, { log: false })
}
