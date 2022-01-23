import * as Types from '@codelab/shared/abstract/codegen'

import { AppBaseFragment, AppFragment } from './App.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { AppBaseFragmentDoc, AppFragmentDoc } from './App.fragment.graphql.gen'
import {
  api,
  GraphqlOperationOptions,
} from '@codelab/frontend/model/infra/redux'
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

export type ExportAppQueryVariables = Types.Exact<{
  input: Types.ExportAppInput
}>

export type ExportAppQuery = { exportApp: { payload: string } }

export type ImportAppMutationVariables = Types.Exact<{
  input: Types.ImportAppInput
}>

export type ImportAppMutation = { importApp: AppBaseFragment }

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
export const ExportAppGql = gql`
  query ExportApp($input: ExportAppInput!) {
    exportApp(input: $input) {
      payload
    }
  }
`
export const ImportAppGql = gql`
  mutation ImportApp($input: ImportAppInput!) {
    importApp(input: $input) {
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
      query: (options) => ({
        document: CreateAppGql,
        options: options ?? undefined,
      }),
    }),
    DeleteApp: build.mutation<
      DeleteAppMutation,
      GraphqlOperationOptions<DeleteAppMutationVariables>
    >({
      query: (options) => ({
        document: DeleteAppGql,
        options: options ?? undefined,
      }),
    }),
    GetApp: build.query<
      GetAppQuery,
      GraphqlOperationOptions<GetAppQueryVariables>
    >({
      query: (options) => ({
        document: GetAppGql,
        options: options ?? undefined,
      }),
    }),
    GetApps: build.query<
      GetAppsQuery,
      GraphqlOperationOptions<GetAppsQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetAppsGql,
        options: options ?? undefined,
      }),
    }),
    UpdateApp: build.mutation<
      UpdateAppMutation,
      GraphqlOperationOptions<UpdateAppMutationVariables>
    >({
      query: (options) => ({
        document: UpdateAppGql,
        options: options ?? undefined,
      }),
    }),
    ExportApp: build.query<
      ExportAppQuery,
      GraphqlOperationOptions<ExportAppQueryVariables>
    >({
      query: (options) => ({
        document: ExportAppGql,
        options: options ?? undefined,
      }),
    }),
    ImportApp: build.mutation<
      ImportAppMutation,
      GraphqlOperationOptions<ImportAppMutationVariables>
    >({
      query: (options) => ({
        document: ImportAppGql,
        options: options ?? undefined,
      }),
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
  useExportAppQuery,
  useLazyExportAppQuery,
  useImportAppMutation,
} = injectedRtkApi
