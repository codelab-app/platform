import type { Maybe } from '@codelab/shared/abstract/types'
import type { CypressElement } from '@codelab/testing/cypress/command'

export const getCuiTreeItem = () => {
  cy.log('getCuiTreeItem')

  return cy.get(`[data-cy="codelabui-tree-item"]`, { log: false })
}

export const getCuiTreeItemByPrimaryTitle = (
  subject: Maybe<CypressElement>,
  primaryTitle: string,
) => {
  cy.log('getCuiTreeItemByPrimaryTitle', primaryTitle)

  return subject
    ? cy
        .wrap(subject)
        .find(
          `[data-cy-primary-title="codelabui-tree-item-primary-title-${primaryTitle}"]`,
          { log: false },
        )
    : cy.get(
        `[data-cy-primary-title="codelabui-tree-item-primary-title-${primaryTitle}"]`,
        { log: false },
      )
}

export const getCuiTreeItemBySecondaryTitle = (
  subject: Maybe<CypressElement>,
  secondaryTitle: string,
) => {
  cy.log('getCuiTreeItemBySecondaryTitle')

  return subject
    ? cy
        .wrap(subject)
        .find(
          `[data-cy-secondary-title="codelabui-tree-item-secondary-title-${secondaryTitle}"]`,
          { log: false },
        )
    : cy.get(
        `[data-cy-secondary-title="codelabui-tree-item-secondary-title-${secondaryTitle}"]`,
        { log: false },
      )
}

export const getCuiTreeItemToolbar = (subject: Maybe<CypressElement>) => {
  cy.log('getCuiTreeItemToolbar')

  return cy
    .wrap(subject)
    .find(`[data-cy="codelabui-tree-item-toolbar"]`, { log: false })
}
