import { FIELD_TYPE } from '../../antd/form'

const modalName = 'Create Tag'

export const createTagByUI = (name: string, parentName?: string) => {
  cy.findByRole('button', { name: /plus/ }).contains(modalName).click()

  // wait for 100ms before typing into the input to avoid issue when first letters are skipped
  // https://github.com/cypress-io/cypress/issues/3817
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.getModal()
    .findByLabelText('Name')
    .should('be.visible')
    .wait(100)
    .type(name)

  if (parentName) {
    cy.getModal().setFormFieldValue({
      label: 'Parent Tag',
      type: FIELD_TYPE.SELECT,
      value: parentName,
    })
  }

  cy.getModal().getModalAction(new RegExp(modalName)).click()
  cy.getModal().should('not.exist')
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
