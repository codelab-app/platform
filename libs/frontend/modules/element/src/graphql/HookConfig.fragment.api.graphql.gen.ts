import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
export type QueryHookConfigFragment = { body?: Types.Maybe<string>, method?: Types.Maybe<Types.QueryMethod>, queryKey: string, url?: Types.Maybe<string>, lambdaId?: Types.Maybe<string> };

export type GraphqlHookConfigFragment = { dataKey?: Types.Maybe<string>, graphqlBody: string, graphqlUrl: string };

export type RecoilStateHookConfigFragment = { defaultValue?: Types.Maybe<string>, stateKey: string };

export type HookConfig_GraphqlHookConfig_Fragment = (
  { __typename: 'GraphqlHookConfig' }
  & GraphqlHookConfigFragment
);

export type HookConfig_QueryHookConfig_Fragment = (
  { __typename: 'QueryHookConfig' }
  & QueryHookConfigFragment
);

export type HookConfig_RecoilStateHookConfig_Fragment = (
  { __typename: 'RecoilStateHookConfig' }
  & RecoilStateHookConfigFragment
);

export type HookConfigFragment = HookConfig_GraphqlHookConfig_Fragment | HookConfig_QueryHookConfig_Fragment | HookConfig_RecoilStateHookConfig_Fragment;

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
export const HookConfigFragmentDoc = gql`
    fragment HookConfig on HookConfig {
  __typename
  ...QueryHookConfig
  ...GraphqlHookConfig
  ...RecoilStateHookConfig
}
    ${QueryHookConfigFragmentDoc}
${GraphqlHookConfigFragmentDoc}
${RecoilStateHookConfigFragmentDoc}`;