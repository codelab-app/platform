import * as Types from '@codelab/shared/codegen/graphql'

import { AppBaseFragment, AppFragment } from '../App.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { AppBaseFragmentDoc, AppFragmentDoc } from '../App.fragment.graphql.gen'
import { api } from '@codelab/frontend/model/infra/api'
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
    CreateApp: build.mutation<CreateAppMutation, CreateAppMutationVariables>({
      query: (variables) => ({ document: CreateAppGql, variables }),
    }),
    DeleteApp: build.mutation<DeleteAppMutation, DeleteAppMutationVariables>({
      query: (variables) => ({ document: DeleteAppGql, variables }),
    }),
    GetApp: build.query<GetAppQuery, GetAppQueryVariables>({
      query: (variables) => ({ document: GetAppGql, variables }),
    }),
    GetApps: build.query<GetAppsQuery, GetAppsQueryVariables | void>({
      query: (variables) => ({ document: GetAppsGql, variables }),
    }),
    UpdateApp: build.mutation<UpdateAppMutation, UpdateAppMutationVariables>({
      query: (variables) => ({ document: UpdateAppGql, variables }),
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
