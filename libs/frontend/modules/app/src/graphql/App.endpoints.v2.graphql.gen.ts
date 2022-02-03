import * as Types from '@codelab/shared/abstract/codegen-v2'

import { AppFragment } from './App.fragment.v2.graphql.gen'
import { gql } from '@apollo/client'
import { AppFragmentDoc } from './App.fragment.v2.graphql.gen'
import {
  api,
  GraphqlOperationOptions,
} from '@codelab/frontend/model/infra/redux'
export type CreateAppsMutationVariables = Types.Exact<{
  input: Array<Types.AppCreateInput> | Types.AppCreateInput
}>

export type CreateAppsMutation = { createApps: { apps: Array<AppFragment> } }

export type DeleteAppsMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.AppWhere>
  delete?: Types.InputMaybe<Types.AppDeleteInput>
}>

export type DeleteAppsMutation = { deleteApps: { nodesDeleted: number } }

export type GetAppsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.AppOptions>
  where?: Types.InputMaybe<Types.AppWhere>
}>

export type GetAppsQuery = { apps: Array<AppFragment> }

export const CreateAppsGql = gql`
  mutation CreateApps($input: [AppCreateInput!]!) {
    createApps(input: $input) {
      apps {
        ...App
      }
    }
  }
  ${AppFragmentDoc}
`
export const DeleteAppsGql = gql`
  mutation DeleteApps($where: AppWhere, $delete: AppDeleteInput) {
    deleteApps(where: $where, delete: $delete) {
      nodesDeleted
    }
  }
`
export const GetAppsGql = gql`
  query GetApps($options: AppOptions, $where: AppWhere) {
    apps: apps(options: $options, where: $where) {
      ...App
    }
  }
  ${AppFragmentDoc}
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateApps: build.mutation<
      CreateAppsMutation,
      GraphqlOperationOptions<CreateAppsMutationVariables>
    >({
      query: (options) => ({
        document: CreateAppsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    DeleteApps: build.mutation<
      DeleteAppsMutation,
      GraphqlOperationOptions<DeleteAppsMutationVariables> | void | undefined
    >({
      query: (options) => ({
        document: DeleteAppsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    GetApps: build.query<
      GetAppsQuery,
      GraphqlOperationOptions<GetAppsQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetAppsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const {
  useCreateAppsMutation,
  useDeleteAppsMutation,
  useGetAppsQuery,
  useLazyGetAppsQuery,
} = injectedRtkApi
