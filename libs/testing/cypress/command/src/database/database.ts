export const resetDatabase = () =>
  cy.request({
    method: 'POST',
    url: '/api/data/admin/reset',
  })
