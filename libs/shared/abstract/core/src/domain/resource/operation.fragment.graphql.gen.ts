import * as Types from '@codelab/shared/abstract/codegen'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
export type OperationFragment = {
  __typename: 'Operation'
  id: string
  name: string
  runOnInit?: boolean | null
  config: string
  resource: { id: string; name: string }
}

export const OperationFragmentDoc = gql`
  fragment Operation on Operation {
    __typename
    id
    name
    resource {
      id
      name
    }
    runOnInit
    config
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
