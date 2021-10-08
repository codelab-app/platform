import { BaseAdapter } from '@codelab/backend/abstract/core'
import { HookType, IHook, IHookConfig } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Hook } from '../domain'
import { HookModel } from './hook.model'
import {
  GraphqlHookConfig,
  QueryHookConfig,
  QueryPageHookConfig,
  QueryPagesHookConfig,
} from './hook-config'
import { RecoilStateHookConfig } from './hook-config/recoil-state-hook-config.model'

type Input = IHook | (Omit<IHook, 'config'> & { config: string })
@Injectable()
export class HookModelFactory extends BaseAdapter<Input, HookModel> {
  mapItem(input: Input) {
    const config =
      typeof input.config === 'string'
        ? JSON.parse(input.config)
        : input.config ?? {}

    const hook = new Hook({
      id: input.id,
      type: input.type,
      config,
    })

    return new HookModel({
      id: hook.id as string,
      type: hook.type,
      config: HookModelFactory.mapConfig(hook),
    })
  }

  private static mapConfig(hook: Hook): IHookConfig {
    // we must provide concrete model types for graphql
    switch (hook.type) {
      case HookType.Query:
        return new QueryHookConfig(hook.config as QueryHookConfig)
      case HookType.GraphqlQuery:
      case HookType.GraphqlMutation:
        return new GraphqlHookConfig(hook.config as GraphqlHookConfig)
      case HookType.RecoilState:
        return new RecoilStateHookConfig(hook.config as RecoilStateHookConfig)
      case HookType.QueryPage:
        return new QueryPageHookConfig(hook.config as QueryPageHookConfig)
      case HookType.QueryPages:
        return new QueryPagesHookConfig(hook.config as QueryPagesHookConfig)
    }

    throw new Error(`Unrecognized hook type ${hook.type}`)
  }
}
