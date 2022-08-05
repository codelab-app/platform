describe('User', () => {
  before(() => {
    cy.visit('/')
    cy.logout()
  })

  it('shows a signup and login button', () => {
    cy.contains('a', 'Register').should('exist')
    cy.contains('a', 'Login').should('exist')
  })

  it('logs in shows email and signs out', () => {
    cy.login().then(() => {
      cy.visit('/')
      cy.request('/api/auth/me').then((r) => {
        const email = r.body.email

        if (!email) {
          throw new Error('Email is not valid!')
        }

        // the icon has a user label
        // cy.findByLabelText('user').click()
        // cy.contains('li', email).should('exist')

        cy.contains('a', 'Logout').click()
        cy.contains('a', 'Login').should('exist')
      })
    })
  })
})
