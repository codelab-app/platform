import { TIMEOUT } from '../support/timeout'

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

        if (!email) {
          console.error(email)
          throw new Error('Email is not valid!')
        }

        cy.findByLabelText('user').click() // the icon has a user label
        cy.findElementByText(email, 'li', {
          exact: false,
          timeout: TIMEOUT,
        }).should('exist')

        cy.findElementByText('Sign Out', 'a').click()
        cy.findElementByText('Login', 'a').should('exist')
      })
    })
  })
})
