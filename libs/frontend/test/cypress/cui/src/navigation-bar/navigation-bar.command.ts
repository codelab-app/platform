import { CY_DATA, wrapCyData } from '@codelab/frontend/application/shared/data'

export const getCuiNavigationBarItem = (title: string) => {
  Cypress.log({ message: title, name: 'getCuiNavigationBarItem' })

  return cy
    .get(wrapCyData(CY_DATA.cuiNavigationBarItem(title)), { log: false })
    .closest('.ant-menu-item', { log: false })
}
