describe('App - Node Page', () => {
  before(() => {
    cy.visit('/node')
  })

  const createFromModalTitle = 'Create Node Form'

  it(`opens the modal for creating nodes`, () => {
    cy.findByButtonText('Show Create Node Form').should('exist').click()
    cy.findByModalTitle(createFromModalTitle)
      .should('exist')
      .should('be.visible')
  })
  describe('create nodes form', () => {
    const nodeTypeSelectorLabel = 'NodeType'

    it('selects NodeType', () => {
      cy.findByModalTitle(createFromModalTitle)
        .findByLabelText(nodeTypeSelectorLabel)
        .should('exist')

      cy.openSelectByLabel(nodeTypeSelectorLabel)

      const visibleOptions = ['React', 'Tree', 'Model']

      visibleOptions.forEach((optionName) =>
        cy
          .getSelectOptionsContentByLabel(nodeTypeSelectorLabel)
          .contains(optionName),
      )

      // select first unselected item and check that it became selected
      cy.getSelectDropdownByLabel(nodeTypeSelectorLabel)
        .find('.ant-select-item[aria-selected="false"]')
        .first()
        .invoke('text')
        .then((optionText) => {
          cy.getSelectDropdownByLabel(nodeTypeSelectorLabel)
            .find('.rc-virtual-list')
            .findByText(optionText.trim())
            .closest('.ant-select-item')
            .click()
          cy.getSelectedOptionByLabel(nodeTypeSelectorLabel).contains(
            optionText,
          )
        })
    })
    it('shows "Type" selector when "React" NodeType is selected', () => {
      cy.openSelectByLabel(nodeTypeSelectorLabel)
      cy.getSelectDropdownByLabel(nodeTypeSelectorLabel)
        .find('.rc-virtual-list')
        .findByText('React')
        .closest('.ant-select-item')
        .click()

      const typeSelectorLabel = 'Type'

      cy.findByModalTitle(createFromModalTitle)
        .findByLabelText(typeSelectorLabel)
        .should('exist')

      cy.openSelectByLabel(typeSelectorLabel)
      const visibleOptions = [
        'React.Fragment',
        'React.Html.div',
        'React.Html.p',
        'React.Html.a',
        'React.Html.span',
        'React.Text',
        'React.Icon',
        'React.Menu',
      ]

      visibleOptions.forEach((optionName) =>
        cy
          .getSelectOptionsContentByLabel(typeSelectorLabel)
          .contains(optionName),
      )

      // select first unselected item and check that it became selected
      cy.getSelectDropdownByLabel(typeSelectorLabel)
        .find('.ant-select-item[aria-selected="false"]')
        .first()
        .invoke('text')
        .then((optionText) => {
          cy.getSelectDropdownByLabel(typeSelectorLabel)
            .find('.rc-virtual-list')
            .findByText(optionText.trim())
            .closest('.ant-select-item')
            .click()
          cy.getSelectedOptionByLabel(typeSelectorLabel).contains(optionText)
        })
    })
  })
})
