describe('App - Node Page', () => {
  before(() => {
    cy.visit('/node')
  })

  const openModalButtonLabel = 'Show Create Node Form'
  it(`click on the "${openModalButtonLabel}" button opens the modal for nodes`, () => {
    // cy.findByRole('button',{ name: /Show Create Node From/ }).should('exist')
    cy.findByButtonText(openModalButtonLabel).should('exist').click()
    cy.findByModalTitle('Create Node Form').should('exist').should('be.visible')
  })

  const nodeTypeSelectorLabel = 'NodeType'
  describe(`selector for ${nodeTypeSelectorLabel}`, () => {
    it(`modal form contain selector for ${nodeTypeSelectorLabel}`, () => {
      cy.findByModalTitle('Create Node Form')
        .findByLabelText(nodeTypeSelectorLabel)
        .should('exist')
    })

    it('selected options can be changed', () => {
      // TODO impove test. it should not use predefined constant
      const newValue = 'Model'
      cy.openSelectByLabel(nodeTypeSelectorLabel)
      cy.getSelectDropdownByLabel(nodeTypeSelectorLabel)
        .findByText(newValue)
        .closest('.ant-select-item')
        .click()
      //       cy.getSelectedOptionByLabel(nodeTypeSelectorLabel).
      // .should(
      //         'be.a',
      //         newValue,
      //       )
    })
  })
})
