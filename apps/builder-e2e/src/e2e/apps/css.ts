const ELEMENT_BUTTON = 'Button'
const backgroundColor1 = 'rgb(48, 182, 99)'
const backgroundColor2 = 'rgb(182, 99, 48)'

const createBackgroundColorStyle = (backgroundColorValue: string) =>
  `background-color: ${backgroundColorValue} !important; visibility: visible !important;`

describe('CSS CRUD', () => {
  before(() => {
    /**
     * Expand the element tree to make the button visible (clickable)
     */
    cy.findByText('Row').click({ force: true })
    // Although the element is visible, it is not clickable unless we wait for a bit
    // Use force click instead
    // cy.wait(1000)
    cy.findByText('Col B').click({ force: true })
  })

  after(() => {
    /**
     * Collapse the element tree for the next tests to work
     */
    cy.findByText('Row').click()
  })

  describe('Add css', () => {
    it('should be able to add some css styling', () => {
      cy.findByText(ELEMENT_BUTTON).click()
      cy.get('[aria-label="format-painter"]').click()

      cy.getSpinner().should('not.exist')

      cy.get('[role="textbox"]')
        .click({ force: true })
        .type(createBackgroundColorStyle(backgroundColor1))

      cy.get('#render-root')
        .find('.ant-btn')
        .should('have.css', 'background-color', backgroundColor1)
    })
  })

  describe('Update css', () => {
    it('should be able to update the css styling', () => {
      cy.findByText(ELEMENT_BUTTON).click()
      cy.get('[aria-label="format-painter"]').click()

      cy.getSpinner().should('not.exist')

      cy.get('[role="textbox"]')
        .click({ force: true })
        .clear()
        .type(createBackgroundColorStyle(backgroundColor2))

      cy.get('#render-root')
        .find('.ant-btn')
        .should('have.css', 'background-color', backgroundColor2)
    })
  })

  describe('Remove css', () => {
    it('should be able to remove the css styling', () => {
      cy.findByText(ELEMENT_BUTTON).click()
      cy.get('[aria-label="format-painter"]').click()

      cy.getSpinner().should('not.exist')

      cy.get('[role="textbox"]').click({ force: true }).clear().type(' ')

      cy.get('#render-root')
        .find('.ant-btn')
        .should('not.have.css', 'background-color', backgroundColor1)

      cy.get('#render-root')
        .find('.ant-btn')
        .should('not.have.css', 'background-color', backgroundColor2)
    })
  })
})
