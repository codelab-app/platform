import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphHook } from '@codelab/backend/infra'
import { HookType } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Hook } from '../domain'
import { HookModel } from './hook.model'
import {
  GraphqlQueryHookConfigModel,
  HookConfigModel,
  QueryHookConfigModel,
} from './hook-config'
import { RecoilStateHookConfigModel } from './hook-config/recoil-state-hook-config.model'

export type DgraphHookInput = Omit<
  DgraphHook,
  'component' | 'children' | 'children|order'
> & {
  component?: { uid: string }
}

@Injectable()
export class HookAdapter extends BaseAdapter<DgraphHookInput, HookModel> {
  mapItem(input: DgraphHookInput) {
    const hook = new Hook({
      id: input.uid,
      type: input.hookType as HookType,
      config: input.configJson ? JSON.parse(input.configJson) : {},
    })

    return {
      id: hook.id as string,
      type: hook.type,
      config: HookAdapter.mapConfig(hook),
    }
  }

  private static mapConfig(hook: Hook): HookConfigModel {
    // we must provide concrete model types for graphql
    switch (hook.type) {
      case HookType.Query:
        return new QueryHookConfigModel(hook.config as QueryHookConfigModel)
      case HookType.GraphqlQuery:
        return new GraphqlQueryHookConfigModel(
          hook.config as GraphqlQueryHookConfigModel,
        )
      case HookType.RecoilState:
        return new RecoilStateHookConfigModel(
          hook.config as RecoilStateHookConfigModel,
        )
    }

    throw new Error(`Unrecognized hook type ${hook.type}`)
  }
}
