describe('UserUseCase', () => {
  before(() => {
    cy.visit('/')
  })

  it('shows a signup button', () => {
    cy.findElementByText('Register', 'a').should('exist')
  })
})
