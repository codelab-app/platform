import { gql } from '@apollo/client'
import * as Types from '@codelab/frontend/abstract/codegen'
import { api, GraphqlOperationOptions } from '@codelab/frontend/model/infra/api'
import {
  AppBaseFragment,
  AppBaseFragmentDoc,
  AppFragment,
  AppFragmentDoc,
} from '../App.fragment.graphql.gen'

export type CreateAppMutationVariables = Types.Exact<{
  input: Types.CreateAppInput
}>

export type CreateAppMutation = { createApp: AppBaseFragment }

export type DeleteAppMutationVariables = Types.Exact<{
  input: Types.DeleteAppInput
}>

export type DeleteAppMutation = {
  deleteApp?: AppBaseFragment | null | undefined
}

export type GetAppQueryVariables = Types.Exact<{
  input: Types.GetAppInput
}>

export type GetAppQuery = { app?: AppFragment | null | undefined }

export type GetAppsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetAppsQuery = { apps: Array<AppFragment> }

export type UpdateAppMutationVariables = Types.Exact<{
  input: Types.UpdateAppInput
}>

export type UpdateAppMutation = {
  updateApp?: AppBaseFragment | null | undefined
}

export const CreateAppGql = gql`
  mutation CreateApp($input: CreateAppInput!) {
    createApp(input: $input) {
      ...AppBase
    }
  }
  ${AppBaseFragmentDoc}
`
export const DeleteAppGql = gql`
  mutation DeleteApp($input: DeleteAppInput!) {
    deleteApp(input: $input) {
      ...AppBase
    }
  }
  ${AppBaseFragmentDoc}
`
export const GetAppGql = gql`
  query GetApp($input: GetAppInput!) {
    app: getApp(input: $input) {
      ...App
    }
  }
  ${AppFragmentDoc}
`
export const GetAppsGql = gql`
  query GetApps {
    apps: getApps {
      ...App
    }
  }
  ${AppFragmentDoc}
`
export const UpdateAppGql = gql`
  mutation UpdateApp($input: UpdateAppInput!) {
    updateApp(input: $input) {
      ...AppBase
    }
  }
  ${AppBaseFragmentDoc}
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateApp: build.mutation<
      CreateAppMutation,
      GraphqlOperationOptions<CreateAppMutationVariables>
    >({
      query: (options) => ({ document: CreateAppGql, options }),
    }),
    DeleteApp: build.mutation<
      DeleteAppMutation,
      GraphqlOperationOptions<DeleteAppMutationVariables>
    >({
      query: (options) => ({ document: DeleteAppGql, options }),
    }),
    GetApp: build.query<
      GetAppQuery,
      GraphqlOperationOptions<GetAppQueryVariables>
    >({
      query: (options) => ({ document: GetAppGql, options }),
    }),
    GetApps: build.query<
      GetAppsQuery,
      GraphqlOperationOptions<GetAppsQueryVariables> | undefined
    >({
      query: (options) => ({ document: GetAppsGql, options }),
    }),
    UpdateApp: build.mutation<
      UpdateAppMutation,
      GraphqlOperationOptions<UpdateAppMutationVariables>
    >({
      query: (options) => ({ document: UpdateAppGql, options }),
    }),
  }),
})

export { injectedRtkApi as api }
export const {
  useCreateAppMutation,
  useDeleteAppMutation,
  useGetAppQuery,
  useLazyGetAppQuery,
  useGetAppsQuery,
  useLazyGetAppsQuery,
  useUpdateAppMutation,
} = injectedRtkApi
