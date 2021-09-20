describe('UserUseCase', () => {
  before(() => {
    cy.visit('/')
    cy.logout()
  })

  it('shows a signup and login button', () => {
    cy.findElementByText('Register', 'a').should('exist')
    cy.findElementByText('Login', 'a').should('exist')
  })

  it('logs in shows email and signs out', () => {
    cy.login().then(() => {
      cy.visit('/')
      cy.request('/api/auth/me').then((r) => {
        const email = r.body.email
        cy.findByLabelText('user').click() // the icon has a user label
        cy.findElementByText(email, 'li', { exact: false }).should('exist')

        cy.findElementByText('Sign Out', 'a').click()
        cy.findElementByText('Login', 'a').should('exist')
      })
    })
  })
})
