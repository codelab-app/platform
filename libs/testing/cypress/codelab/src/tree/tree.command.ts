export const getCuiTreeItem = () => {
  cy.log('getCuiTreeItem')

  return cy.get(`[data-cy="codelabui-tree-item"]`, { log: false })
}

export const getCuiTreeItemByPrimaryTitle = (primaryTitle: string) => {
  cy.log('getCuiTreeItemByPrimaryTitle', primaryTitle)

  return cy.get(
    `[data-cy-primary-title="codelabui-tree-item-primary-title-${primaryTitle}"]`,
    { log: false },
  )
}

export const getCuiTreeItemBySecondaryTitle = (secondaryTitle: string) => {
  cy.log('getCuiTreeItemBySecondaryTitle')

  return cy.get(
    `[data-cy-secondary-title="codelabui-tree-item-secondary-title-${secondaryTitle}"]`,
    { log: false },
  )
}

export const getCuiTreeItemToolbar = () => {
  cy.log('getCuiTreeItemToolbar')

  return cy.get(`[data-cy="codelabui-tree-item-toolbar"]`, { log: false })
}
