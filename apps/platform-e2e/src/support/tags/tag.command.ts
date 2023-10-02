<<<<<<<< HEAD:apps/platform-e2e/src/support/commands/tags/tag.command.ts
<<<<<<< HEAD:apps/platform-e2e/src/support/commands/tags/tag.command.ts
import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
=======
import { FIELD_TYPE } from '@codelab/testing/cypress/antd'
>>>>>>> da3909c80 (test: use cli for testing import export):apps/platform-e2e/src/support/entities/tag/tag.command.ts
========
import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
>>>>>>>> e4701781d (wip: update project tags):apps/platform-e2e/src/support/tags/tag.command.ts

const modalName = 'Create Tag'

export const createTagByUI = (name: string, parentName?: string) => {
  cy.getCuiSidebar('Tags').getCuiToolbarItem(modalName).click()

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

  cy.getCuiPopover('Create Tag').getCuiToolbarItem('Create').click()
}

export const deleteTagInTableByUI = (name: string) => {
  cy.searchTableRow({
    header: 'Name',
    row: new RegExp(`^${name}$`),
  })
    .getButton({ icon: 'delete' })
    .click()
  cy.getSpinner().should('not.exist')
  cy.getModal()
    .getModalAction(/Delete Tag/)
    .click()
  cy.getModal().should('not.exist')
  cy.getTable().findAllByText(name).should('not.exist')
}
