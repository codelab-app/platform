import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
import { AppFragmentDoc } from './App.fragment.v2.1.graphql.gen'
export type CreateAppsMutationVariables = Types.Exact<{
  input: Array<Types.AppCreateInput> | Types.AppCreateInput
}>

export type CreateAppsMutation = {
  __typename?: 'Mutation'
  createApps: {
    __typename?: 'CreateAppsMutationResponse'
    apps: Array<{
      __typename?: 'App'
      id: string
      name: string
      owner?:
        | Array<{ __typename?: 'User'; id: string } | null | undefined>
        | null
        | undefined
      pages?: Array<{ __typename?: 'Page'; id: string }> | null | undefined
      rootProviderElement: { __typename?: 'Element'; id: string }
    }>
  }
}

export type UpdateAppsMutationVariables = Types.Exact<{
  where: Types.AppWhere
  update: Types.AppUpdateInput
}>

export type UpdateAppsMutation = {
  __typename?: 'Mutation'
  updateApps: {
    __typename?: 'UpdateAppsMutationResponse'
    apps: Array<{
      __typename?: 'App'
      id: string
      name: string
      owner?:
        | Array<{ __typename?: 'User'; id: string } | null | undefined>
        | null
        | undefined
      pages?: Array<{ __typename?: 'Page'; id: string }> | null | undefined
      rootProviderElement: { __typename?: 'Element'; id: string }
    }>
  }
}

export type DeleteAppsMutationVariables = Types.Exact<{
  where: Types.AppWhere
}>

export type DeleteAppsMutation = {
  __typename?: 'Mutation'
  deleteApps: { __typename?: 'DeleteInfo'; nodesDeleted: number }
}

export type GetAppsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.AppOptions>
  where?: Types.InputMaybe<Types.AppWhere>
}>

export type GetAppsQuery = {
  __typename?: 'Query'
  apps: Array<{
    __typename?: 'App'
    id: string
    name: string
    owner?:
      | Array<{ __typename?: 'User'; id: string } | null | undefined>
      | null
      | undefined
    pages?: Array<{ __typename?: 'Page'; id: string }> | null | undefined
    rootProviderElement: { __typename?: 'Element'; id: string }
  }>
}

export const CreateAppsDocument = gql`
  mutation CreateApps($input: [AppCreateInput!]!) {
    createApps(input: $input) {
      apps {
        ...App
      }
    }
  }
  ${AppFragmentDoc}
`
export const UpdateAppsDocument = gql`
  mutation UpdateApps($where: AppWhere!, $update: AppUpdateInput!) {
    updateApps(where: $where, update: $update) {
      apps {
        ...App
      }
    }
  }
  ${AppFragmentDoc}
`
export const DeleteAppsDocument = gql`
  mutation DeleteApps($where: AppWhere!) {
    deleteApps(where: $where) {
      nodesDeleted
    }
  }
`
export const GetAppsDocument = gql`
  query GetApps($options: AppOptions, $where: AppWhere) {
    apps: apps(options: $options, where: $where) {
      ...App
    }
  }
  ${AppFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action()

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
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
