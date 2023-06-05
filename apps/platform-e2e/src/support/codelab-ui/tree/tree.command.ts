export const getCuiTreeItem = () => {
  return cy.get(`[data-cy="codelabui-tree-item"]`)
}

export const getCuiTreeItemByPrimaryTitle = (primaryTitle: string) => {
  return cy.get(
    `[data-cy*="codelabui-tree-item-primary-title-${primaryTitle}"]`,
  )
}

export const getCuiTreeItemBySecondaryTitle = (secondaryTitle: string) => {
  return cy.get(
    `[data-cy*="codelabui-tree-item-secondary-title-${secondaryTitle}"]`,
  )
}
