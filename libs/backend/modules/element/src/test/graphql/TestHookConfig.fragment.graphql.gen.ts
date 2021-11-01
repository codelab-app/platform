import * as Types from '@codelab/shared/codegen/graphql'

import {
  QueryHookConfigFragment,
  GraphqlHookConfigFragment,
  RecoilStateHookConfigFragment,
  QueryPagesHookConfigFragment,
  QueryPageHookConfigFragment,
} from '../../../../../../frontend/modules/element/src/graphql/HookConfig.fragment.graphql.gen'
export type TestQueryHookConfigFragment = {
  body?: string | null | undefined
  method?: Types.QueryMethod | null | undefined
  queryKey: string
  url?: string | null | undefined
  lambdaId?: string | null | undefined
}

export type TestGraphqlHookConfigFragment = {
  graphqlBody: string
  graphqlUrl: string
  dataKey?: string | null | undefined
}

export type TestRecoilStateHookConfigFragment = {
  defaultValue?: string | null | undefined
  stateKey: string
  persisted: Types.PersistenceType
}

export type TestQueryPagesHookConfigFragment = { appId: string }

export type TestQueryPageHookConfigFragment = { pageId: string }

export type TestHookConfig_GraphqlHookConfig_Fragment = {
  __typename: 'GraphqlHookConfig'
} & GraphqlHookConfigFragment

export type TestHookConfig_QueryHookConfig_Fragment = {
  __typename: 'QueryHookConfig'
} & QueryHookConfigFragment

export type TestHookConfig_QueryPageHookConfig_Fragment = {
  __typename: 'QueryPageHookConfig'
} & QueryPageHookConfigFragment

export type TestHookConfig_QueryPagesHookConfig_Fragment = {
  __typename: 'QueryPagesHookConfig'
} & QueryPagesHookConfigFragment

export type TestHookConfig_RecoilStateHookConfig_Fragment = {
  __typename: 'RecoilStateHookConfig'
} & RecoilStateHookConfigFragment

export type TestHookConfigFragment =
  | TestHookConfig_GraphqlHookConfig_Fragment
  | TestHookConfig_QueryHookConfig_Fragment
  | TestHookConfig_QueryPageHookConfig_Fragment
  | TestHookConfig_QueryPagesHookConfig_Fragment
  | TestHookConfig_RecoilStateHookConfig_Fragment

export const TestQueryHookConfigFragmentDoc = gql`
  fragment TestQueryHookConfig on QueryHookConfig {
    body
    method
    queryKey
    url
    lambdaId
  }
`
export const TestGraphqlHookConfigFragmentDoc = gql`
  fragment TestGraphqlHookConfig on GraphqlHookConfig {
    graphqlBody
    graphqlUrl
    dataKey
  }
`
export const TestRecoilStateHookConfigFragmentDoc = gql`
  fragment TestRecoilStateHookConfig on RecoilStateHookConfig {
    defaultValue
    stateKey
    persisted
  }
`
export const TestQueryPagesHookConfigFragmentDoc = gql`
  fragment TestQueryPagesHookConfig on QueryPagesHookConfig {
    appId
  }
`
export const TestQueryPageHookConfigFragmentDoc = gql`
  fragment TestQueryPageHookConfig on QueryPageHookConfig {
    pageId
  }
`
export const TestHookConfigFragmentDoc = gql`
  fragment TestHookConfig on HookConfig {
    __typename
    ...QueryHookConfig
    ...GraphqlHookConfig
    ...RecoilStateHookConfig
    ...QueryPagesHookConfig
    ...QueryPageHookConfig
  }
  ${QueryHookConfigFragmentDoc}
  ${GraphqlHookConfigFragmentDoc}
  ${RecoilStateHookConfigFragmentDoc}
  ${QueryPagesHookConfigFragmentDoc}
  ${QueryPageHookConfigFragmentDoc}
`
