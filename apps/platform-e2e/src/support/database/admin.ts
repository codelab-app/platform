import { print } from 'graphql'
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ResetDatabaseDocument } from 'libs/frontend/domain/admin/src/graphql/admin.endpoints.graphql.gen'

export const resetDatabase = () =>
  cy
    .graphqlRequest({
      query: print(ResetDatabaseDocument),
      variables: {},
    })
    .then((result) => result.body.data?.success as boolean)
