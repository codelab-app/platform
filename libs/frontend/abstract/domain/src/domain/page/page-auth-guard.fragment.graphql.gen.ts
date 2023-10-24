import * as Types from '@codelab/shared/abstract/codegen'

import { AuthGuardFragment } from '../auth-guard/auth-guard.fragment.graphql.gen'
import {
  Redirect_PageRedirect_Fragment,
  Redirect_UrlRedirect_Fragment,
} from '../redirect/fragments/redirect.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import { AuthGuardFragmentDoc } from '../auth-guard/auth-guard.fragment.graphql.gen'
import { RedirectFragmentDoc } from '../redirect/fragments/redirect.fragment.graphql.gen'
export type PageAuthGuardFragment = {
  id: string
  authGuard: AuthGuardFragment
  redirect: Redirect_PageRedirect_Fragment | Redirect_UrlRedirect_Fragment
}

export const PageAuthGuardFragmentDoc = gql`
  fragment PageAuthGuard on PageAuthGuard {
    id
    authGuard {
      ...AuthGuard
    }
    redirect {
      ...Redirect
    }
  }
  ${AuthGuardFragmentDoc}
  ${RedirectFragmentDoc}
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
