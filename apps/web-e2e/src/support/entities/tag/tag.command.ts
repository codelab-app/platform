import { FIELD_TYPE } from '../../antd/form'
import { aliasGraphQLOperation } from '../../helpers/graphql.commands'

const modalName = 'Create Tag'

export const createTagByUI = (name: string, parentName?: string) => {
  cy.findByRole('button', { name: /plus/ }).contains(modalName).click()
  cy.getModal().findByLabelText('Name').type(name)

  if (parentName) {
    cy.getModal().setFormFieldValue({
      label: 'Parent Tag',
      value: parentName,
      type: FIELD_TYPE.SELECT,
    })
  }

  cy.getModal().getModalAction(new RegExp(modalName)).click()
  cy.getModal().should('not.exist')
}

export const deleteTagInTableByUI = (name: string) => {
  cy.searchTableRow({
    header: 'Name',
    row: name,
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
