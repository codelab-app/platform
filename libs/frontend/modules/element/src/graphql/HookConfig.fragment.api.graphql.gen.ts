import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
export type QueryHookConfigFragment = { body?: Types.Maybe<string>, method?: Types.Maybe<Types.QueryMethod>, queryKey: string, url?: Types.Maybe<string>, lambdaId?: Types.Maybe<string> };

export type GraphqlQueryHookConfigFragment = { dataKey?: Types.Maybe<string>, graphqlBody: string, graphqlUrl: string };

export type HookConfig_GraphqlQueryHookConfig_Fragment = (
  { __typename: 'GraphqlQueryHookConfig' }
  & GraphqlQueryHookConfigFragment
);

export type HookConfig_QueryHookConfig_Fragment = (
  { __typename: 'QueryHookConfig' }
  & QueryHookConfigFragment
);

export type HookConfigFragment = HookConfig_GraphqlQueryHookConfig_Fragment | HookConfig_QueryHookConfig_Fragment;

export const QueryHookConfigFragmentDoc = gql`
    fragment QueryHookConfig on QueryHookConfig {
  body
  method
  queryKey
  url
  lambdaId
}
    `;
export const GraphqlQueryHookConfigFragmentDoc = gql`
    fragment GraphqlQueryHookConfig on GraphqlQueryHookConfig {
  graphqlBody: body
  graphqlUrl: url
  dataKey
}
    `;
export const HookConfigFragmentDoc = gql`
    fragment HookConfig on HookConfig {
  __typename
  ...QueryHookConfig
  ...GraphqlQueryHookConfig
}
    ${QueryHookConfigFragmentDoc}
${GraphqlQueryHookConfigFragmentDoc}`;