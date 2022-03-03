const componentName = 'Test Component'
const updatedComponentName = 'Test Component updated'

const findEditButtonByComponentName = (text: string) =>
  cy
    .findByText(text, { exact: true, timeout: 0 })
    .closest('.ant-table-row')
    .find('.anticon-edit')
    .closest('button')

const findDeleteButtonByComponentName = (text: string) =>
  cy
    .findByText(text, { exact: true, timeout: 0 })
    .closest('.ant-table-row')
    .find('.anticon-delete')
    .closest('button')

describe('Components', () => {
  before(() => {
    cy.resetDatabase().then(() => {
      cy.login()
    })
  })

  describe('create', () => {
    before(() => {
      cy.visit(`/components`)
    })

    it('should be able to create component', () => {
      cy.findAllByText(componentName, { exact: true, timeout: 0 }).should(
        'not.exist',
      )

      cy.findByRole('button', { name: /plus/ }).click()
      cy.getOpenedModal().findByLabelText('Name').type(componentName)
      cy.getOpenedModal()
        .findByButtonText(/Create Component/)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(componentName).should('exist')
    })
  })

  describe('update', () => {
    it('should be able to update component name', () => {
      findEditButtonByComponentName(componentName).click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByLabelText('Name')
        .clear()
        .type(updatedComponentName)

      cy.getOpenedModal()
        .findByButtonText(/Update Component/)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(componentName).should('not.exist')
      cy.findByText(updatedComponentName).should('exist')
    })
  })

  describe('delete', () => {
    it('should be able to delete an component', () => {
      findDeleteButtonByComponentName(updatedComponentName).click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByButtonText(/Delete Component/)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findAllByText(updatedComponentName).should('not.exist')
    })
  })
})
