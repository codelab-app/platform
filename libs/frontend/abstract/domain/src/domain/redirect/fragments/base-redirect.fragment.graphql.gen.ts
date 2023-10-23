import * as Types from '@codelab/shared/abstract/codegen'

import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
export type BaseRedirect_PageRedirect_Fragment = {
  __typename: 'PageRedirect'
  id: string
  kind: Types.RedirectKind
}

export type BaseRedirect_UrlRedirect_Fragment = {
  __typename: 'UrlRedirect'
  id: string
  kind: Types.RedirectKind
}

export type BaseRedirectFragment =
  | BaseRedirect_PageRedirect_Fragment
  | BaseRedirect_UrlRedirect_Fragment

export const BaseRedirectFragmentDoc = gql`
  fragment BaseRedirect on BaseRedirect {
    __typename
    id
    kind
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
