import { loginSession } from '@codelab/testing/cypress/nextjs-auth0'

describe('UserController', () => {
  before(() => {
    cy.resetDatabase()
    loginSession()
  })

  it('should save a user', () => {
    cy.request({ method: 'POST', url: '/api/data/user/save' }).then(
      (response) => {
        const { body } = response

        return cy.getCurrentUser().then((user) => {
          expect(body).to.deep.include(user)
        })
      },
    )
  })
})
