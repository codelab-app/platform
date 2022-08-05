import { print } from 'graphql'
import { ResetDatabaseDocument } from '../../../../../libs/frontend/modules/admin/src/graphql/admin.endpoints.graphql.gen'

export const resetDatabase = () =>
  cy
    .graphqlRequest({
      query: print(ResetDatabaseDocument),
      variables: {},
    })
    .then((result) => result.body.data?.success as boolean)

// export const importAdminData = (data: any) =>
//   cy
//     .graphqlRequest({
//       query: print(E2eImportAdminDataDocument),
//       variables: { input: { payload: data } },
//     })
//     .then((r) => r.body.data?.importAdminData.result as boolean)
//
// export const exportAdminData = () =>
//   cy
//     .graphqlRequest({
//       query: print(E2eExportAdminDataDocument),
//       variables: {},
//     })
//     .then((r) => r.body.data?.exportAdminData.result as any)
