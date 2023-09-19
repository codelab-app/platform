import { loginAndResetDatabase } from '@codelab/testing/cypress/nextjs-auth0'

describe('UserController', () => {
  before(() => {
    cy.resetDatabase()
    loginAndResetDatabase()
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
