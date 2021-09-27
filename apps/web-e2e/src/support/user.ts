export const getCurrentUserId = () => {
  return cy.request('/api/auth/me').then((r) => {
    return r.body.sub
  })
}

Cypress.Commands.add('getCurrentUserId', getCurrentUserId)
