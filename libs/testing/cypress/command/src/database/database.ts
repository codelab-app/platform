export const resetDatabase = () =>
  cy.request({
    method: 'POST',
    timeout: 10000,
    url: '/api/data/admin/reset',
  })
