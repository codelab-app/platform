import * as Types from '@codelab/shared/abstract/codegen'

import { AppPreviewFragment } from '../../../../abstract/core/src/domain/app/app.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { AppPreviewFragmentDoc } from '../../../../abstract/core/src/domain/app/app.fragment.graphql.gen'
export type CreateAppsMutationVariables = Types.Exact<{
  input: Array<Types.AppCreateInput> | Types.AppCreateInput
}>

export type CreateAppsMutation = {
  createApps: { apps: Array<AppPreviewFragment> }
}

export type UpdateAppsMutationVariables = Types.Exact<{
  where: Types.AppWhere
  update: Types.AppUpdateInput
}>

export type UpdateAppsMutation = {
  updateApps: { apps: Array<AppPreviewFragment> }
}

export type DeleteAppsMutationVariables = Types.Exact<{
  where: Types.AppWhere
  delete?: Types.InputMaybe<Types.AppDeleteInput>
}>

export type DeleteAppsMutation = { deleteApps: { nodesDeleted: number } }

export type GetAppsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.AppOptions>
  where?: Types.InputMaybe<Types.AppWhere>
}>

export type GetAppsQuery = { apps: Array<AppPreviewFragment> }

export const CreateAppsDocument = gql`
  mutation CreateApps($input: [AppCreateInput!]!) {
    createApps(input: $input) {
      apps {
        ...AppPreview
      }
    }
  }
  ${AppPreviewFragmentDoc}
`
export const UpdateAppsDocument = gql`
  mutation UpdateApps($where: AppWhere!, $update: AppUpdateInput!) {
    updateApps(where: $where, update: $update) {
      apps {
        ...AppPreview
      }
    }
  }
  ${AppPreviewFragmentDoc}
`
export const DeleteAppsDocument = gql`
  mutation DeleteApps($where: AppWhere!, $delete: AppDeleteInput) {
    deleteApps(where: $where, delete: $delete) {
      nodesDeleted
    }
  }
`
export const GetAppsDocument = gql`
  query GetApps($options: AppOptions, $where: AppWhere) {
    apps(options: $options, where: $where) {
      ...AppPreview
    }
  }
  ${AppPreviewFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    CreateApps(
      variables: CreateAppsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateAppsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateAppsMutation>(CreateAppsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateApps',
        'mutation',
      )
    },
    UpdateApps(
      variables: UpdateAppsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateAppsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateAppsMutation>(UpdateAppsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UpdateApps',
        'mutation',
      )
    },
    DeleteApps(
      variables: DeleteAppsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteAppsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteAppsMutation>(DeleteAppsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeleteApps',
        'mutation',
      )
    },
    GetApps(
      variables?: GetAppsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetAppsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAppsQuery>(GetAppsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetApps',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
