import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-request'
export type StoreFragment = {
  __typename: 'Store'
  id: string
  name: string
  actions?: Array<string> | null
  state: Array<{ name: string; type: string; defaultValue: string }>
}

export const StoreFragmentDoc = gql`
  fragment Store on Store {
    __typename
    id
    name
    state {
      name
      type
      defaultValue
    }
    actions
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
