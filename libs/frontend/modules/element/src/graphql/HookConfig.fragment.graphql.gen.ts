import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type QueryHookConfigFragment = {
  body?: string | null | undefined
  method?: Types.QueryMethod | null | undefined
  queryKey: string
  url?: string | null | undefined
  lambdaId?: string | null | undefined
}

export type GraphqlHookConfigFragment = {
  graphqlBody: string
  graphqlUrl: string
  dataKey?: string | null | undefined
}

export type RecoilStateHookConfigFragment = {
  defaultValue?: string | null | undefined
  stateKey: string
  persisted: Types.PersistenceType
}

export type QueryPagesHookConfigFragment = { appId: string }

export type QueryPageHookConfigFragment = { pageId: string }

export type HookConfig_GraphqlHookConfig_Fragment = {
  __typename: 'GraphqlHookConfig'
} & GraphqlHookConfigFragment

export type HookConfig_QueryHookConfig_Fragment = {
  __typename: 'QueryHookConfig'
} & QueryHookConfigFragment

export type HookConfig_QueryPageHookConfig_Fragment = {
  __typename: 'QueryPageHookConfig'
} & QueryPageHookConfigFragment

export type HookConfig_QueryPagesHookConfig_Fragment = {
  __typename: 'QueryPagesHookConfig'
} & QueryPagesHookConfigFragment

export type HookConfig_RecoilStateHookConfig_Fragment = {
  __typename: 'RecoilStateHookConfig'
} & RecoilStateHookConfigFragment

export type HookConfigFragment =
  | HookConfig_GraphqlHookConfig_Fragment
  | HookConfig_QueryHookConfig_Fragment
  | HookConfig_QueryPageHookConfig_Fragment
  | HookConfig_QueryPagesHookConfig_Fragment
  | HookConfig_RecoilStateHookConfig_Fragment

export const QueryHookConfigFragmentDoc = gql`
  fragment QueryHookConfig on QueryHookConfig {
    body
    method
    queryKey
    url
    lambdaId
  }
`
export const GraphqlHookConfigFragmentDoc = gql`
  fragment GraphqlHookConfig on GraphqlHookConfig {
    graphqlBody
    graphqlUrl
    dataKey
  }
`
export const RecoilStateHookConfigFragmentDoc = gql`
  fragment RecoilStateHookConfig on RecoilStateHookConfig {
    defaultValue
    stateKey
    persisted
  }
`
export const QueryPagesHookConfigFragmentDoc = gql`
  fragment QueryPagesHookConfig on QueryPagesHookConfig {
    appId
  }
`
export const QueryPageHookConfigFragmentDoc = gql`
  fragment QueryPageHookConfig on QueryPageHookConfig {
    pageId
  }
`
export const HookConfigFragmentDoc = gql`
  fragment HookConfig on HookConfig {
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
