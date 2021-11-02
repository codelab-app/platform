import * as Types from '@codelab/frontend/abstract/codegen'

import {
  HookConfig_GraphqlHookConfig_Fragment,
  HookConfig_QueryHookConfig_Fragment,
  HookConfig_QueryPageHookConfig_Fragment,
  HookConfig_QueryPagesHookConfig_Fragment,
  HookConfig_RecoilStateHookConfig_Fragment,
} from '../../../../../../frontend/modules/element/src/graphql/HookConfig.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { HookConfigFragmentDoc } from '../../../../../../frontend/modules/element/src/graphql/HookConfig.fragment.graphql.gen'
export type TestHookFragment = {
  id: string
  type: Types.HookType
  config:
    | HookConfig_GraphqlHookConfig_Fragment
    | HookConfig_QueryHookConfig_Fragment
    | HookConfig_QueryPageHookConfig_Fragment
    | HookConfig_QueryPagesHookConfig_Fragment
    | HookConfig_RecoilStateHookConfig_Fragment
}

export const TestHookFragmentDoc = gql`
  fragment TestHook on Hook {
    id
    type
    config {
      ...HookConfig
    }
  }
  ${HookConfigFragmentDoc}
`
