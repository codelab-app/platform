import { CY_DATA_SELECTOR } from '@codelab/frontend/application/shared/data'

export const getCuiNavigationBarItem = (title: string) => {
  cy.log('getCuiNavigationBarItem', title)

  return cy
    .get(CY_DATA_SELECTOR.cuiNavigationBarItem(title), { log: false })
    .closest('.ant-menu-item', { log: false })
}
