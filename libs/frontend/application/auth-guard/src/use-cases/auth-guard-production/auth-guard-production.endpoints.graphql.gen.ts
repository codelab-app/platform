import * as Types from '@codelab/shared/abstract/codegen'

import { AuthGuardFragment } from '../../../../../abstract/domain/src/domain/auth-guard/auth-guard.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import { AuthGuardFragmentDoc } from '../../../../../abstract/domain/src/domain/auth-guard/auth-guard.fragment.graphql.gen'
export type GetAuthGuardProductionQueryVariables = Types.Exact<{
  domain: Types.Scalars['String']['input']
  pageUrl: Types.Scalars['String']['input']
}>

export type GetAuthGuardProductionQuery = {
  authGuards: Array<AuthGuardFragment>
}

export const GetAuthGuardProductionDocument = gql`
  query GetAuthGuardProduction($domain: String!, $pageUrl: String!) {
    authGuards(
      where: {
        pages_SOME: {
          AND: [
            { app: { domains_SOME: { name: $domain } } }
            { url: $pageUrl }
            { kind: Regular }
          ]
        }
      }
    ) {
      ...AuthGuard
    }
  }
  ${AuthGuardFragmentDoc}
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
  return {
    GetAuthGuardProduction(
      variables: GetAuthGuardProductionQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetAuthGuardProductionQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAuthGuardProductionQuery>(
            GetAuthGuardProductionDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetAuthGuardProduction',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
