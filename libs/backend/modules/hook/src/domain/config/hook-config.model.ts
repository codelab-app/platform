import { createUnionType } from '@nestjs/graphql'
import { GraphqlHookConfig } from './graphql-hook-config.model'
import { QueryHookConfig } from './query-config-hook-config.model'
import { QueryPageHookConfig } from './query-page-hook-config-model'
import { QueryPagesHookConfig } from './query-pages-hook-config-model'
import { RecoilStateHookConfig } from './recoil-state-hook-config.model'

export const HookConfig = createUnionType({
  name: 'HookConfig',

  types: () => [
    QueryHookConfig,
    GraphqlHookConfig,
    RecoilStateHookConfig,
    QueryPageHookConfig,
    QueryPagesHookConfig,
  ],
})

export type HookConfig = typeof HookConfig
