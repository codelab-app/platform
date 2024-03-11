import { CY_DATA_SELECTOR } from '@codelab/frontend/application/shared/data'

export const getCuiPopover = (title: string) => {
  Cypress.log({ message: title, name: 'getCuiPopover' })

  return cy.get(CY_DATA_SELECTOR.cuiPopover(title), {
    log: false,
  })
}
