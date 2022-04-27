export const getCurrentUserId = () => {
  return cy.request('/api/auth/me').then((result) => {
    return result.body.sub
  })
}
