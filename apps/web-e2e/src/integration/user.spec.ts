describe('UserUseCase', () => {
  before(() => {
    cy.visit('/')
  })

  it('shows the signup form after clicking on a signup button', () => {
    cy.findByButtonText('Register').should('exist')
  })
})
