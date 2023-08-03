export const resetDatabase = () =>
  cy.request({
    method: 'POST',
    url: '/api/data/admin/reset',
  })

// .graphqlRequest({
//   query: print(ResetDatabaseDocument),
//   variables: {},
// })
// .then((result) => result.body.data?.success as boolean)
