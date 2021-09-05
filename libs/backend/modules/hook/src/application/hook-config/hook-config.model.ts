import { createUnionType } from '@nestjs/graphql'
import { QueryHookConfigModel } from './query-hook-config.model'

export const HookConfigModel = createUnionType({
  name: 'HookConfig',
  types: () => [QueryHookConfigModel],
})

export type HookConfigModel = typeof HookConfigModel
