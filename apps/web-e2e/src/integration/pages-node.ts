describe('App - Node Page', () => {
  before(() => {
    cy.visit('/node')
  })

  const createFromModalTitle = 'Create Node Form'

  it(`opens the modal for creating nodes`, () => {
    cy.findByButtonText('Show Create Node Form').click()
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
        cy.getSelectOptionsContent().contains(optionName),
      )

      // select first unselected item and check that it became selected
      cy.getSelectDropdown()
        .findByRole('option', { selected: false })
        .first()
        .invoke('text')
        .then((optionText) => {
          cy.getSelectOptionItemByValue(optionText.trim()).click()
          cy.getSelectedOptionByLabel(nodeTypeSelectorLabel).contains(
            optionText,
          )
        })
    })
    it('selects "Type" when "React" NodeType is selected', () => {
      cy.openSelectByLabel(nodeTypeSelectorLabel)
      cy.getSelectOptionItemByValue('React').click()

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
        cy.getSelectOptionsContent().contains(optionName),
      )

      // select first unselected item and check that it became selected
      cy.getSelectDropdown()
        .findAllByRole('option', { selected: false })
        .first()
        .invoke('text')
        .then((optionText) => {
          cy.getSelectOptionItemByValue(optionText.trim()).click()
          cy.getSelectedOptionByLabel(typeSelectorLabel).contains(optionText)
        })
    })

    it('add custom property', () => {
      cy.findByModalTitle(createFromModalTitle).findByButtonText('Add').click()
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
