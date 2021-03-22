describe('UserUseCase', () => {
  before(() => {
    cy.visit('/')
  })

  it('shows a signup button', () => {
    cy.findByButtonText('Register').should('exist')
  })
})
