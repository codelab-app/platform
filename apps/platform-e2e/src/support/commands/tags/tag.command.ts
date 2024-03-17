import { MODEL_ACTION, MODEL_UI } from '@codelab/frontend/abstract/types'
import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'

const modalName = 'Create Tag'

export const createTagByUI = (name: string, parentName?: string) => {
  cy.getCuiSidebar(MODEL_UI.SidebarTag.key)
    .getCuiTreeItemByPrimaryTitle(modalName)
    .click()

  // wait for 100ms before typing into the input to avoid issue when first letters are skipped
  // https://github.com/cypress-io/cypress/issues/3817
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.findByLabelText('Name').should('be.visible').wait(100).type(name)

  if (parentName) {
    cy.setFormFieldValue({
      label: 'Parent Tag',
      type: FIELD_TYPE.SELECT,
      value: parentName,
    })
  }

  cy.getCuiPopover(MODEL_ACTION.CreateTag.key)
    .getCuiToolbarItem(MODEL_ACTION.CreateTag.key)
    .click()
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
