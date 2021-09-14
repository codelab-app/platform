import * as Types from '@codelab/shared/codegen/graphql';

import { HookConfig_GraphqlQueryHookConfig_Fragment, HookConfig_QueryHookConfig_Fragment, HookConfig_RecoilStateHookConfig_Fragment } from './HookConfig.fragment.api.graphql.gen';
import { gql } from '@apollo/client';
import { HookConfigFragmentDoc } from './HookConfig.fragment.api.graphql.gen';
export type HookFragment = { id: string, type: Types.HookType, config: HookConfig_GraphqlQueryHookConfig_Fragment | HookConfig_QueryHookConfig_Fragment | HookConfig_RecoilStateHookConfig_Fragment };

export const HookFragmentDoc = gql`
    fragment Hook on Hook {
  id
  type
  config {
    ...HookConfig
  }
}
    ${HookConfigFragmentDoc}`;