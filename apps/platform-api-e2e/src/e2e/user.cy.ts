describe('UserController', () => {
  it('should save a user', () => {
    cy.request({ url: '/data/user/save' }).as('saveUser')
    cy.get('@saveUser').then((user) => {
      expect(user).to.equal({})
    })
  })
})
