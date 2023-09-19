export const resetDatabase = () => {
  cy.getCookie('access_token').then((accessToken) => {
    if (!accessToken) {
      throw new Error('Missing access token')
    }

    cy.request({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'POST',
      timeout: 10000,
      url: '/api/data/admin/reset-all-except-user-and-atom',
    })
  })
}
