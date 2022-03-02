import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type E2eCreateAppMutationVariables = Types.Exact<{
  input: Array<Types.AppCreateInput> | Types.AppCreateInput
}>

export type E2eCreateAppMutation = {
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
      pages?:
        | Array<{
            __typename?: 'Page'
            id: string
            name: string
            rootElement: {
              __typename?: 'Element'
              id: string
              name?: string | null | undefined
            }
          }>
        | null
        | undefined
    }>
  }
}

export type E2eDeleteAppMutationVariables = Types.Exact<{
  where: Types.AppWhere
}>

export type E2eDeleteAppMutation = {
  __typename?: 'Mutation'
  deleteApps: { __typename?: 'DeleteInfo'; nodesDeleted: number }
}

export type E2eAppFragment = {
  __typename?: 'App'
  id: string
  name: string
  owner?:
    | Array<{ __typename?: 'User'; id: string } | null | undefined>
    | null
    | undefined
  pages?:
    | Array<{
        __typename?: 'Page'
        id: string
        name: string
        rootElement: {
          __typename?: 'Element'
          id: string
          name?: string | null | undefined
        }
      }>
    | null
    | undefined
}

export const E2eAppFragmentDoc = gql`
  fragment E2eApp on App {
    id
    owner {
      id
    }
    name
    pages {
      id
      name
      rootElement {
        id
        name
      }
    }
  }
`
export const E2eCreateAppDocument = gql`
  mutation E2eCreateApp($input: [AppCreateInput!]!) {
    createApps(input: $input) {
      apps {
        ...E2eApp
      }
    }
  }
  ${E2eAppFragmentDoc}
`
export const E2eDeleteAppDocument = gql`
  mutation E2eDeleteApp($where: AppWhere!) {
    deleteApps(where: $where) {
      nodesDeleted
    }
  }
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
    E2eCreateApp(
      variables: E2eCreateAppMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eCreateAppMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eCreateAppMutation>(
            E2eCreateAppDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eCreateApp',
      )
    },
    E2eDeleteApp(
      variables: E2eDeleteAppMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eDeleteAppMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eDeleteAppMutation>(
            E2eDeleteAppDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eDeleteApp',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
