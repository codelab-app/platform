import { MODEL_ACTION, MODEL_UI } from '@codelab/frontend/abstract/types'
import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import { NETWORK_IDLE_TIME } from '@codelab/frontend/test/cypress/shared'

export const createTagByUI = (name: string, parentName?: string) => {
  Cypress.log({
    name: 'createTagByUI',
  })

  if (parentName) {
    cy.getCuiTreeItemByPrimaryTitle(parentName).click()
  }

  cy.getCuiSidebar(MODEL_UI.SidebarTag.key)
    .getCuiSidebarHeader()
    .getCuiToolbarItem(MODEL_ACTION.CreateTag.key)
    .click()

  cy.setFormFieldValue({
    label: 'Name',
    type: FIELD_TYPE.INPUT,
    value: name,
  })

  cy.getCuiPopover(MODEL_ACTION.CreateTag.key)
    .getCuiToolbarItem(MODEL_ACTION.CreateTag.key)
    .click()

  cy.waitForNetworkIdle(NETWORK_IDLE_TIME)

  // if (parentName) {
  //   cy.toggleCuiTreeNodeSwitcher(parentName)
  // }

  // cy.getCuiTreeItemByPrimaryTitle(name).should('exist')
}

export const deleteTagInTableByUI = (name: string) => {
  cy.searchTableRow({
    header: 'Name',
    row: new RegExp(`^${name}$`),
  })
    .getButton({ icon: 'delete' })
    .click()
  cy.waitForSpinners()
  cy.getModal()
    .getModalAction(/Delete Tag/)
    .click()
  cy.getModal().should('not.exist')
  cy.getTable().findAllByText(name).should('not.exist')
}
