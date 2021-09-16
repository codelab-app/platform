import { GraphqlHookConfig } from './graphql-hook-config.schema'
import { QueryHookConfig } from './query-hook-config.schema'
import { QueryPageHookConfig } from './query-page-hook-config.schema'
import { QueryPagesHookConfig } from './query-pages-hook-config.schema'
import { RecoilStateHookConfig } from './recoil-state-hook-config.schema'

export type HookConfig =
  | QueryHookConfig
  | GraphqlHookConfig
  | RecoilStateHookConfig
  | QueryPageHookConfig
  | QueryPagesHookConfig
