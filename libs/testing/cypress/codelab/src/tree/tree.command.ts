export const getCuiTreeItem = () => {
  return cy.get(`[data-cy="codelabui-tree-item"]`)
}

export const getCuiTreeItemByPrimaryTitle = (primaryTitle: string) => {
  return cy.get(
    `[data-cy-primary-title="codelabui-tree-item-primary-title-${primaryTitle}"]`,
  )
}

export const getCuiTreeItemBySecondaryTitle = (secondaryTitle: string) => {
  return cy.get(
    `[data-cy-secondary-title="codelabui-tree-item-secondary-title-${secondaryTitle}"]`,
  )
}

export const getCuiTreeItemToolbar = () => {
  return cy.get(`[data-cy="codelabui-tree-item-toolbar"]`)
}