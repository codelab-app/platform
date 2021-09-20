import { createUnionType } from '@nestjs/graphql'
import { GraphqlHookConfigModel } from './graphql-hook-config.model'
import { QueryHookConfigModel } from './query-hook-config.model'
import { RecoilStateHookConfigModel } from './recoil-state-hook-config.model'

export const HookConfigModel = createUnionType({
  name: 'HookConfig',
  types: () => [
    QueryHookConfigModel,
    GraphqlHookConfigModel,
    RecoilStateHookConfigModel,
  ],
})

export type HookConfigModel = typeof HookConfigModel
