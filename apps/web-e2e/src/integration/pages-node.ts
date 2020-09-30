describe('App - Node Page', () => {
  before(() => {
    cy.visit('/node')
  })

  it('opens the modal for nodes', () => {
    // cy.findByRole('button',{ name: /Show Create Node From/ }).should('exist')
    cy.findByButtonText(/Show Create Node Form/).should('exist')
  })
})
