import type { IUserDto } from '@codelab/shared/abstract/core'

describe('UserController', () => {
  it('should save a user', () => {
    cy.postApiRequest<IUserDto>('/user/save').then((response) => {
      const { body } = response

      return cy.getCurrentUser().then((user) => {
        cy.wrap(body).should('deep.include', user)
      })
    })
  })
})
