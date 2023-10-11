import * as Types from '@codelab/shared/abstract/codegen'

import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
export type RedirectFragment = {
  id: string
  targetType: Types.RedirectTargetType
  targetUrl?: string | null
  source: { id: string }
  targetPage?: { id: string } | null
  authGuard: { id: string }
}

export const RedirectFragmentDoc = gql`
  fragment Redirect on Redirect {
    id
    source {
      id
    }
    targetPage {
      id
    }
    targetType
    targetUrl
    authGuard {
      id
    }
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
