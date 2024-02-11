import { loginAndSetupData } from '@codelab/frontend/test/cypress/nextjs-auth0'
import type { IUserDto } from '@codelab/shared/abstract/core'

describe('UserController', () => {
  before(() => {
    loginAndSetupData()
  })

  it('should save a user', () => {
    cy.postApiRequest<IUserDto>('/user/save').then((response) => {
      const { body } = response

      return cy.getCurrentUser().then((user) => {
        expect(body).to.deep.include(user)
      })
    })
  })
})
