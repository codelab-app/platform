import { print } from 'graphql'
import { ResetDatabaseDocument } from 'libs/frontend/domain/admin/src/graphql/admin.endpoints.graphql.gen'

export const resetDatabase = () =>
  cy
    .graphqlRequest({
      query: print(ResetDatabaseDocument),
      variables: {},
    })
    .then((result) => result.body.data?.success as boolean)
