import * as Types from '@codelab/shared/abstract/codegen'

import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
export type RedirectFragment = {
  id: string
  targetType: Types.RedirectTargetType
  targetUrl?: string | null
  authGuard: { id: string }
  source: { id: string }
  targetPage?: { id: string } | null
}

export const RedirectFragmentDoc = gql`
  fragment Redirect on Redirect {
    authGuard {
      id
    }
    id
    source {
      id
    }
    targetPage {
      id
    }
    targetType
    targetUrl
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
