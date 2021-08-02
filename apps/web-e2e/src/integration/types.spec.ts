describe('Types', () => {
  const typeName = 'New Interface'
  const typeKind = 'Object'

  const findDeleteButtonByTypeName = (text: string) =>
    cy
      .findByText(text, { exact: true, timeout: 0 })
      .closest('.ant-table-row')
      .find('.anticon-delete')
      .closest('button')

  before(() => {
    cy.clearCookies()
    cy.login()
  })

  beforeEach(() => {
    cy.login()
  })

  describe('create', () => {
    before(() => {
      cy.visit(`/types`)
    })

    it('should be able to create interface', () => {
      cy.findAllByText(typeName, { exact: true, timeout: 0 }).should(
        'not.exist',
      )

      cy.findByRole('button', { name: /plus/i }).click()

      cy.getOpenedModal().findByLabelText('Name').type(typeName)
      cy.getOpenedModal().findByLabelText('Kind').click()
      cy.getSelectOptionItemByValue(typeKind).first().click()
      cy.getOpenedModal()
        .findByButtonText(/create/i)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(typeName).should('exist')
    })
  })

  describe('delete', () => {
    it('should be able to delete interface', () => {
      findDeleteButtonByTypeName(typeName).click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByButtonText(/delete/i)
        .click()

      cy.findAllByText(typeName).should('not.exist')
    })
  })
})
