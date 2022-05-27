import * as Types from '@codelab/shared/abstract/codegen'

import {
  PropFragment,
  PropMapBindingFragment,
} from '../prop/prop.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import {
  PropFragmentDoc,
  PropMapBindingFragmentDoc,
} from '../prop/prop.fragment.graphql.gen'
export type OperationFragment = {
  __typename: 'Operation'
  id: string
  name: string
  runOnInit?: boolean | null
  resource: { id: string; name: string }
  config: PropFragment
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
    config {
      ...Prop
    }
  }
  ${PropFragmentDoc}
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
