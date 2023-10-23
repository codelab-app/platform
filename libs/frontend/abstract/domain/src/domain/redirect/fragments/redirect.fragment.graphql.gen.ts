import * as Types from '@codelab/shared/abstract/codegen'

import {
  BaseRedirect_PageRedirect_Fragment,
  BaseRedirect_UrlRedirect_Fragment,
} from './base-redirect.fragment.graphql.gen'
import { PageRedirectFragment } from './page-redirect.fragment.graphql.gen'
import { UrlRedirectFragment } from './url-redirect.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import { BaseRedirectFragmentDoc } from './base-redirect.fragment.graphql.gen'
import { PageRedirectFragmentDoc } from './page-redirect.fragment.graphql.gen'
import { UrlRedirectFragmentDoc } from './url-redirect.fragment.graphql.gen'
export type Redirect_PageRedirect_Fragment = PageRedirectFragment &
  BaseRedirect_PageRedirect_Fragment

export type Redirect_UrlRedirect_Fragment = UrlRedirectFragment &
  BaseRedirect_UrlRedirect_Fragment

export type RedirectFragment =
  | Redirect_PageRedirect_Fragment
  | Redirect_UrlRedirect_Fragment

export const RedirectFragmentDoc = gql`
  fragment Redirect on BaseRedirect {
    ...BaseRedirect
    ... on PageRedirect {
      ...PageRedirect
    }
    ... on UrlRedirect {
      ...UrlRedirect
    }
  }
  ${BaseRedirectFragmentDoc}
  ${PageRedirectFragmentDoc}
  ${UrlRedirectFragmentDoc}
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
