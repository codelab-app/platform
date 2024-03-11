import { CY_DATA_SELECTOR } from '@codelab/frontend/application/shared/data'
import type { CypressElement } from '@codelab/frontend/test/cypress/utils'
import type { Maybe } from '@codelab/shared/abstract/types'

export const getCuiTreeItem = () => {
  Cypress.log({
    name: 'getCuiTreeItem',
  })

  return cy.get(CY_DATA_SELECTOR.cuiTreeItem(), { log: false })
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
    .wrap(subject)
    .closest(CY_DATA_SELECTOR.cuiTreeItem(), { log: false })
}

export const getCuiTreeItemByPrimaryTitle = (
  subject: Maybe<CypressElement>,
  primaryTitle: string,
) => {
  Cypress.log({ message: primaryTitle, name: 'getCuiTreeItemByPrimaryTitle' })

  return subject
    ? cy
        .wrap(subject)
        .find(CY_DATA_SELECTOR.cuiTreeItemPrimaryTitle(primaryTitle), {
          log: false,
        })
    : cy.get(CY_DATA_SELECTOR.cuiTreeItemPrimaryTitle(primaryTitle), {
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
        .find(CY_DATA_SELECTOR.cuiTreeItemSecondaryTitle(secondaryTitle), {
          log: false,
        })
    : cy.get(CY_DATA_SELECTOR.cuiTreeItemSecondaryTitle(secondaryTitle), {
        log: false,
      })
}

export const getCuiTreeItemToolbar = (subject: Maybe<CypressElement>) => {
  Cypress.log({
    message: 'getCuiTreeItemToolbar',
  })

  return cy
    .wrap(subject)
    .closest(CY_DATA_SELECTOR.cuiTreeItem(), { log: false })
    .find(CY_DATA_SELECTOR.cuiTreeItemToolbar(), { log: false })
}
