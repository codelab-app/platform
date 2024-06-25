import * as Types from '@codelab/shared/abstract/codegen'

import { GraphQLClient, RequestOptions } from 'graphql-request'
import { gql } from 'graphql-tag'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type HookPropFragment = { data: string; id: string }

export type HookFragment = {
  id: string
  type: Types.AtomType
  config: HookPropFragment
  element: { id: string; name: string }
}

export const HookPropFragmentDoc = gql`
  fragment HookProp on Prop {
    data
    id
  }
`
export const HookFragmentDoc = gql`
  fragment Hook on Hook {
    config {
      ...HookProp
    }
    element {
      id
      name
    }
    id
    type
  }
  ${HookPropFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {}
}
export type Sdk = ReturnType<typeof getSdk>
