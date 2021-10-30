import * as Types from '@codelab/shared/codegen/graphql';

import { HookConfig_GraphqlHookConfig_Fragment, HookConfig_QueryHookConfig_Fragment, HookConfig_QueryPageHookConfig_Fragment, HookConfig_QueryPagesHookConfig_Fragment, HookConfig_RecoilStateHookConfig_Fragment } from './HookConfig.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { HookConfigFragmentDoc } from './HookConfig.fragment.graphql.gen';
export type HookFragment = { id: string, type: Types.HookType, config: HookConfig_GraphqlHookConfig_Fragment | HookConfig_QueryHookConfig_Fragment | HookConfig_QueryPageHookConfig_Fragment | HookConfig_QueryPagesHookConfig_Fragment | HookConfig_RecoilStateHookConfig_Fragment };

export const HookFragmentDoc = `
    fragment Hook on Hook {
  id
  type
  config {
    ...HookConfig
  }
}
    ${HookConfigFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;