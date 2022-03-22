import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-request'
export type E2eCreateAppMutationVariables = Types.Exact<{
  input: Array<Types.AppCreateInput> | Types.AppCreateInput
}>

export type E2eCreateAppMutation = {
  createApps: { apps: Array<E2eAppFragment> }
}

export type E2eAppFragment = {
  id: string
  name: string
  owner: Array<{ id: string }>
  pages: Array<{
    id: string
    name: string
    rootElement: { id: string; name?: string | null | undefined }
  }>
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
export const E2eCreateAppGql = gql`
  mutation E2eCreateApp($input: [AppCreateInput!]!) {
    createApps(input: $input) {
      apps {
        ...E2eApp
      }
    }
  }
  ${E2eAppFragmentDoc}
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
    E2eCreateApp(
      variables: E2eCreateAppMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eCreateAppMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eCreateAppMutation>(E2eCreateAppGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'E2eCreateApp',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
