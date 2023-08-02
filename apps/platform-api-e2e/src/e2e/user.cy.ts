import { loginSession } from '@codelab/testing/cypress/nextjs-auth0'

describe('UserController', () => {
  before(() => {
    cy.resetDatabase()
    loginSession()
    // cy.visit('/apps')
  })

  it('should save a user', () => {
    cy.request({ url: '/data/user/save' }).as('saveUser')
    cy.get('@saveUser').then((user) => {
      expect(user).to.equal({})
    })
  })
})
