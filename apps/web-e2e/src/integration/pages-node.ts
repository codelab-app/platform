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
    it('selects "Type" when "React" NodeType is selected', () => {
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

    it('add custom property', () => {
      cy.findByModalTitle(createFromModalTitle)
        .findByButtonText('Add')
        .should('exist')
        .click()
      cy.findByModalTitle(createFromModalTitle)
        .findByPlaceholderText('Key')
        .should('exist')
        .type('name')
      cy.findByModalTitle(createFromModalTitle)
        .findByPlaceholderText('Value')
        .should('exist')
        .type('react-fragment')
    })

    it('submit form', () => {
      cy.server()

      cy.route('POST', '**/Node').as('submitCreateNodeForm')

      cy.findByModalTitle(createFromModalTitle)
        .findByButtonText('Submit')
        .should('exist')
        .click()

      cy.wait('@submitCreateNodeForm')
        .its('requestBody')
        .should('deep.equal', {
          nodeType: 'React',
          props: [{ key: 'name', value: 'react-fragment' }],
          parent: null,
          type: 'React.Fragment',
        })
    })
  })
})
