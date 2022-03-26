import { print } from 'graphql'
import {
  E2eExportAdminDataDocument,
  E2eImportAdminDataDocument,
  E2eResetDatabaseDocument,
} from './graphql/admin.api.v2.1.graphql.gen'

export const resetDatabase = () =>
  cy
    .graphqlRequest({
      query: print(E2eResetDatabaseDocument),
      variables: {},
    })
    .then((r) => r.body.data?.success as boolean)

export const importAdminData = (data: any) =>
  cy
    .graphqlRequest({
      query: print(E2eImportAdminDataDocument),
      variables: { input: { payload: data } },
    })
    .then((r) => r.body.data?.importAdminData.result as boolean)

export const exportAdminData = () =>
  cy
    .graphqlRequest({
      query: print(E2eExportAdminDataDocument),
      variables: {},
    })
    .then((r) => r.body.data?.exportAdminData.result as any)
