import { GraphqlQueryHookConfig } from './graphql-query-hook-config.schema'
import { QueryHookConfig } from './query-hook-config.schema'
import { RecoilStateHookConfig } from './recoil-state-hook-config.schema'

export type HookConfig =
  | QueryHookConfig
  | GraphqlQueryHookConfig
  | RecoilStateHookConfig
