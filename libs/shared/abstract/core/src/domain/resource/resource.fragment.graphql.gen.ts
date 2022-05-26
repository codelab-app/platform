import * as Types from '@codelab/shared/abstract/codegen'

import {
  PropFragment,
  PropMapBindingFragment,
} from '../prop/prop.fragment.graphql.gen'
import { OperationFragment } from '../operation/operation.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import {
  PropFragmentDoc,
  PropMapBindingFragmentDoc,
} from '../prop/prop.fragment.graphql.gen'
import { OperationFragmentDoc } from '../operation/operation.fragment.graphql.gen'
export type ResourceFragment = {
  __typename: 'Resource'
  id: string
  name: string
  type: Types.ResourceType
  config?: PropFragment | null
  operations: Array<OperationFragment>
}

export const ResourceFragmentDoc = gql`
  fragment Resource on Resource {
    __typename
    id
    name
    type
    config {
      ...Prop
    }
    operations {
      ...Operation
    }
  }
  ${PropFragmentDoc}
  ${OperationFragmentDoc}
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
