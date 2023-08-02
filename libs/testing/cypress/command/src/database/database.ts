import { defineConfig } from 'cypress'
import { print } from 'graphql'

export const resetDatabase = () =>
  cy.request({
    method: 'POST',
    url: '/data/admin/reset',
  })

// .graphqlRequest({
//   query: print(ResetDatabaseDocument),
//   variables: {},
// })
// .then((result) => result.body.data?.success as boolean)
