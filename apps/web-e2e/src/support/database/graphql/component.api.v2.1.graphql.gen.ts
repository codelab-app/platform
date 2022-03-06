import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type E2eCreateComponentMutationVariables = Types.Exact<{
  input: Array<Types.ComponentCreateInput> | Types.ComponentCreateInput
}>

export type E2eCreateComponentMutation = {
  __typename?: 'Mutation'
  createComponents: {
    __typename?: 'CreateComponentsMutationResponse'
    components: Array<{
      __typename?: 'Component'
      id: string
      name: string
      rootElement: {
        __typename?: 'Element'
        id: string
        name?: string | null | undefined
      }
      owner: { __typename?: 'User'; id: string; auth0Id: string }
    }>
  }
}

export type E2eComponentFragment = {
  __typename?: 'Component'
  id: string
  name: string
  rootElement: {
    __typename?: 'Element'
    id: string
    name?: string | null | undefined
  }
  owner: { __typename?: 'User'; id: string; auth0Id: string }
}

export const E2eComponentFragmentDoc = gql`
  fragment E2eComponent on Component {
    id
    name
    rootElement {
      id
      name
    }
    owner {
      id
      auth0Id
    }
  }
`
export const E2eCreateComponentDocument = gql`
  mutation E2eCreateComponent($input: [ComponentCreateInput!]!) {
    createComponents(input: $input) {
      components {
        ...E2eComponent
      }
    }
  }
  ${E2eComponentFragmentDoc}
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
    E2eCreateComponent(
      variables: E2eCreateComponentMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eCreateComponentMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eCreateComponentMutation>(
            E2eCreateComponentDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eCreateComponent',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
