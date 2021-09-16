import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
export type QueryHookConfigFragment = { body?: Types.Maybe<string>, method?: Types.Maybe<Types.QueryMethod>, queryKey: string, url?: Types.Maybe<string>, lambdaId?: Types.Maybe<string> };

export type GraphqlHookConfigFragment = { dataKey?: Types.Maybe<string>, graphqlBody: string, graphqlUrl: string };

export type RecoilStateHookConfigFragment = { defaultValue?: Types.Maybe<string>, stateKey: string };

export type QueryPagesHookConfigFragment = { appId: string };

export type QueryPageHookConfigFragment = { pageId: string };

export type HookConfig_GraphqlQueryHookConfig_Fragment = (
  { __typename: 'GraphqlQueryHookConfig' }
  & GraphqlQueryHookConfigFragment
);

export type HookConfig_QueryHookConfig_Fragment = (
  { __typename: 'QueryHookConfig' }
  & QueryHookConfigFragment
);

export type HookConfig_QueryPageHookConfig_Fragment = (
  { __typename: 'QueryPageHookConfig' }
  & QueryPageHookConfigFragment
);

export type HookConfig_QueryPagesHookConfig_Fragment = (
  { __typename: 'QueryPagesHookConfig' }
  & QueryPagesHookConfigFragment
);

export type HookConfig_RecoilStateHookConfig_Fragment = (
  { __typename: 'RecoilStateHookConfig' }
  & RecoilStateHookConfigFragment
);

export type HookConfigFragment = HookConfig_GraphqlQueryHookConfig_Fragment | HookConfig_QueryHookConfig_Fragment | HookConfig_QueryPageHookConfig_Fragment | HookConfig_QueryPagesHookConfig_Fragment | HookConfig_RecoilStateHookConfig_Fragment;

export const QueryHookConfigFragmentDoc = gql`
    fragment QueryHookConfig on QueryHookConfig {
  body
  method
  queryKey
  url
  lambdaId
}
    `;
export const GraphqlHookConfigFragmentDoc = gql`
    fragment GraphqlHookConfig on GraphqlHookConfig {
  graphqlBody: body
  graphqlUrl: url
  dataKey
}
    `;
export const RecoilStateHookConfigFragmentDoc = gql`
    fragment RecoilStateHookConfig on RecoilStateHookConfig {
  defaultValue
  stateKey
}
    `;
export const QueryPagesHookConfigFragmentDoc = gql`
    fragment QueryPagesHookConfig on QueryPagesHookConfig {
  appId
}
    `;
export const QueryPageHookConfigFragmentDoc = gql`
    fragment QueryPageHookConfig on QueryPageHookConfig {
  pageId
}
    `;
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
${GraphqlQueryHookConfigFragmentDoc}
${RecoilStateHookConfigFragmentDoc}
${QueryPagesHookConfigFragmentDoc}
${QueryPageHookConfigFragmentDoc}`;
