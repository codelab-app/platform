const componentName = 'Test Component'
const updatedComponentName = 'Test Component updated'

describe('Components CRUD', () => {
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

      cy.getModal().findByLabelText('Name').type(componentName)
      cy.getModal()
        .getModalAction(/Create Component/)
        .click()
      cy.getModal().should('not.exist')

      cy.findByText(componentName).should('exist')
    })
  })

  describe('update', () => {
    it('should be able to update component name', () => {
      cy.searchTableRow({
        header: 'Name',
        row: componentName,
      })
        .getButton({ icon: 'edit' })
        .click()
      cy.getSpinner().should('not.exist')

      cy.getModal().findByLabelText('Name').clear().type(updatedComponentName)
      cy.getModal()
        .getModalAction(/Update Component/)
        .click()
      cy.getModal().should('not.exist')

      cy.findByText(componentName).should('not.exist')
      cy.findByText(updatedComponentName).should('exist')
    })
  })

  describe('delete', () => {
    it('should be able to delete an component', () => {
      cy.searchTableRow({
        header: 'Name',
        row: updatedComponentName,
      })
        .getButton({ icon: 'delete' })
        .click()
      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete Component/)
        .click()
      cy.getModal().should('not.exist')

      cy.findAllByText(updatedComponentName).should('not.exist')
    })
  })
})
