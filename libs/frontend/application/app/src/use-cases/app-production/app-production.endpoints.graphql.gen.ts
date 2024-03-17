import * as Types from '@codelab/shared/abstract/codegen'

import { AppProductionFragment } from '../../../../../abstract/domain/src/app/app.fragment.graphql.gen'
import { AtomProductionFragment } from '../../../../../abstract/domain/src/atom/atom.fragment.graphql.gen'
import { ResourceFragment } from '../../../../../abstract/domain/src/resource/resource.fragment.graphql.gen'
import { GraphQLClient, RequestOptions } from 'graphql-request'
import { gql } from 'graphql-tag'
import { AppProductionFragmentDoc } from '../../../../../abstract/domain/src/app/app.fragment.graphql.gen'
import { AtomProductionFragmentDoc } from '../../../../../abstract/domain/src/atom/atom.fragment.graphql.gen'
import { ResourceFragmentDoc } from '../../../../../abstract/domain/src/resource/resource.fragment.graphql.gen'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type GetAppProductionQueryVariables = Types.Exact<{
  domain: Types.Scalars['String']['input']
  pageUrl: Types.Scalars['String']['input']
}>

export type GetAppProductionQuery = {
  apps: Array<AppProductionFragment>
  atoms: Array<AtomProductionFragment>
  resources: Array<ResourceFragment>
}

export const GetAppProductionDocument = gql`
  query GetAppProduction($domain: String!, $pageUrl: String!) {
    apps(where: { domains_SOME: { name_IN: [$domain] } }) {
      ...AppProduction
    }
    atoms(where: { type: ReactFragment }) {
      ...AtomProduction
    }
    resources {
      ...Resource
    }
  }
  ${AppProductionFragmentDoc}
  ${AtomProductionFragmentDoc}
  ${ResourceFragmentDoc}
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
  return {
    GetAppProduction(
      variables: GetAppProductionQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetAppProductionQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAppProductionQuery>(
            GetAppProductionDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetAppProduction',
        'query',
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
