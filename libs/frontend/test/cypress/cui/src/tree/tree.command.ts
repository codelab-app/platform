import { CY_DATA } from '@codelab/frontend/application/shared/data'
import type { CypressElement } from '@codelab/frontend/test/cypress/utils'
import type { Maybe } from '@codelab/shared/abstract/types'

export const getCuiTreeItem = () => {
  Cypress.log({
    name: 'getCuiTreeItem',
  })

  return cy.get(CY_DATA.cuiTreeItem().cySelector, { log: true })
}

/**
 * Traverse up to find the container.
 */
export const closestCuiTreeNode = (subject: CypressElement) => {
  Cypress.log({
    name: 'closestCuiTreeNode',
  })

  return (
    cy
      .wrap(subject, { log: false })
      // We use antd tree node since this holds the entire node, including the checker
      .closest('.ant-tree-treenode')
    // .closest(CY_DATA.cuiTreeItem().cySelector, { log: false })
  )
}

export const toggleCuiTreeNodeSwitcher = (primaryTitle: string) => {
  Cypress.log({ name: 'toggleCuiTreeNodeSwitcher' })

  // Need this step, otherwise we may click before the switcher has been added
  cy.getCuiTreeItemByPrimaryTitle(primaryTitle)
    .closestCuiTreeNode()
    .find('.ant-tree-switcher', { log: false })
    .find('.anticon', { log: false })
    .should('exist', { log: false })

  cy.getCuiTreeItemByPrimaryTitle(primaryTitle)
    .closestCuiTreeNode()
    .find('.ant-tree-switcher', { log: false })
    .click({ log: false })
}

export const toggleCuiTreeNodeCheckbox = (primaryTitle: string) => {
  Cypress.log({ name: 'toggleCuiTreeNodeCheckbox' })

  // Need this step, otherwise we may click before the checkbox has been added
  cy.getCuiTreeItemByPrimaryTitle(primaryTitle)
    .closestCuiTreeNode()
    .find('.ant-tree-checkbox', { log: false })
    .find('.anticon', { log: false })
    .should('exist')

  cy.getCuiTreeItemByPrimaryTitle(primaryTitle)
    .closestCuiTreeNode()
    .find('.ant-tree-checkbox')
    .click()
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
