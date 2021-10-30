import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type QueryHookConfigFragment = { body?: string | null | undefined, method?: Types.QueryMethod | null | undefined, queryKey: string, url?: string | null | undefined, lambdaId?: string | null | undefined };

export type GraphqlHookConfigFragment = { dataKey?: string | null | undefined, graphqlBody: string, graphqlUrl: string };

export type RecoilStateHookConfigFragment = { defaultValue?: string | null | undefined, stateKey: string, persisted: Types.PersistenceType };

export type QueryPagesHookConfigFragment = { appId: string };

export type QueryPageHookConfigFragment = { pageId: string };

export type HookConfig_GraphqlHookConfig_Fragment = (
  { __typename: 'GraphqlHookConfig' }
  & GraphqlHookConfigFragment
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

export type HookConfigFragment = HookConfig_GraphqlHookConfig_Fragment | HookConfig_QueryHookConfig_Fragment | HookConfig_QueryPageHookConfig_Fragment | HookConfig_QueryPagesHookConfig_Fragment | HookConfig_RecoilStateHookConfig_Fragment;

export const QueryHookConfigFragmentDoc = `
    fragment QueryHookConfig on QueryHookConfig {
  body
  method
  queryKey
  url
  lambdaId
}
    `;
export const GraphqlHookConfigFragmentDoc = `
    fragment GraphqlHookConfig on GraphqlHookConfig {
  graphqlBody: body
  graphqlUrl: url
  dataKey
}
    `;
export const RecoilStateHookConfigFragmentDoc = `
    fragment RecoilStateHookConfig on RecoilStateHookConfig {
  defaultValue
  stateKey
  persisted
}
    `;
export const QueryPagesHookConfigFragmentDoc = `
    fragment QueryPagesHookConfig on QueryPagesHookConfig {
  appId
}
    `;
export const QueryPageHookConfigFragmentDoc = `
    fragment QueryPageHookConfig on QueryPageHookConfig {
  pageId
}
    `;
export const HookConfigFragmentDoc = `
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
${QueryPageHookConfigFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;