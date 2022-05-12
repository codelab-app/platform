import * as Types from '@codelab/shared/abstract/codegen'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
export type AppFragment = {
  id: string
  name: string
  owner: { id: string }
  pages: Array<{ id: string }>
  rootProviderElement: { id: string }
  store?: { id: string } | null
}

export const AppFragmentDoc = gql`
  fragment App on App {
    id
    name
    owner {
      id
    }
    pages {
      id
    }
    rootProviderElement {
      id
    }
    store {
      id
    }
  }
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
  return {}
}
export type Sdk = ReturnType<typeof getSdk>
