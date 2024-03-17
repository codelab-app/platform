import { CY_DATA } from '@codelab/frontend/application/shared/data'

export const getCuiNavigationBarItem = (title: string) => {
  Cypress.log({ message: title, name: 'getCuiNavigationBarItem' })

  return cy
    .get(CY_DATA.cuiNavigationBarItem(title).cySelector, { log: false })
    .closest('.ant-menu-item', { log: false })
}
