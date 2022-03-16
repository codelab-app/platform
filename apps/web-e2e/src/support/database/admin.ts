import { print } from 'graphql'
import { E2eResetDatabaseDocument } from './graphql/admin.api.v2.1.graphql.gen'

export const resetDatabase = () =>
  cy
    .graphqlRequest({
      query: print(E2eResetDatabaseDocument),
      variables: {},
    })
    .then((r) => r.body.data?.success as boolean)
