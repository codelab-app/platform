import { GraphqlHookConfig } from './graphql-hook-config.schema'
import { QueryHookConfig } from './query-hook-config.schema'
import { RecoilStateHookConfig } from './recoil-state-hook-config.schema'

export type HookConfig =
  | QueryHookConfig
  | GraphqlHookConfig
  | RecoilStateHookConfig
