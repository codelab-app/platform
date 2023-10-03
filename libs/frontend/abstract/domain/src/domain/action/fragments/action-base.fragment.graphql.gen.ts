import * as Types from '@codelab/shared/abstract/codegen'

import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
export type BaseAction_ApiAction_Fragment = {
  __typename: 'ApiAction'
  id: string
  name: string
  type: Types.ActionKind
  store: { id: string; name: string }
}

export type BaseAction_CodeAction_Fragment = {
  __typename: 'CodeAction'
  id: string
  name: string
  type: Types.ActionKind
  store: { id: string; name: string }
}

export type BaseActionFragment =
  | BaseAction_ApiAction_Fragment
  | BaseAction_CodeAction_Fragment

export const BaseActionFragmentDoc = gql`
  fragment BaseAction on BaseAction {
    __typename
    id
    name
    store {
      id
      name
    }
    type
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
