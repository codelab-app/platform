import { createUnionType } from '@nestjs/graphql'
import { GraphqlQueryHookConfigModel } from './graphql-query-hook-config.model'
import { QueryHookConfigModel } from './query-hook-config.model'
import { RecoilStateHookConfigModel } from './recoil-state-hook-config.model'

export const HookConfigModel = createUnionType({
  name: 'HookConfig',
  types: () => [
    QueryHookConfigModel,
    GraphqlQueryHookConfigModel,
    RecoilStateHookConfigModel,
  ],
})

export type HookConfigModel = typeof HookConfigModel
