import { HookType } from '@codelab/shared/abstract/core'
import { graphqlQueryHookConfigSchema } from './graphql-query-hook-config.schema'
import { HookConfig } from './hook-config.union'
import { queryHookConfigSchema } from './query-hook-config.schema'
import { recoilStateHookConfigSchema } from './recoil-state-hook-config.schema'

/**
 * Throws error if:
 * - type is not recognized
 * OR
 * - config is invalid
 * @param type
 * @param data
 */
export const parseHookConfig = (
  type: HookType,
  data: Record<string, any>,
): HookConfig => {
  switch (type) {
    case HookType.Query:
      return queryHookConfigSchema.parse(data)
    case HookType.GraphqlQuery:
      return graphqlQueryHookConfigSchema.parse(data)
    case HookType.RecoilState:
      return recoilStateHookConfigSchema.parse(data)
  }

  throw new Error(`Can't parse hook data, hook type ${type} not recognized`)
}
