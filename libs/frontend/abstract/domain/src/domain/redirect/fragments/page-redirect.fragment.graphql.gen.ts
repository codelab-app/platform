import * as Types from '@codelab/shared/abstract/codegen'

import {
  BaseRedirect_PageRedirect_Fragment,
  BaseRedirect_UrlRedirect_Fragment,
} from './base-redirect.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import { BaseRedirectFragmentDoc } from './base-redirect.fragment.graphql.gen'
export type PageRedirectFragment = {
  page: { id: string }
} & BaseRedirect_PageRedirect_Fragment

export const PageRedirectFragmentDoc = gql`
  fragment PageRedirect on PageRedirect {
    ...BaseRedirect
    page {
      id
    }
  }
  ${BaseRedirectFragmentDoc}
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
