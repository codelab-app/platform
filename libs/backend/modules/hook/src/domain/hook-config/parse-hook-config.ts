import {
  GraphqlHookConfigSchema,
  HookType,
  IHookConfig,
  QueryHookConfigSchema,
  QueryPageHookConfigSchema,
  QueryPagesHookConfigSchema,
  RecoilStateHookConfigSchema,
} from '@codelab/shared/abstract/core'

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
): IHookConfig => {
  switch (type) {
    case HookType.QueryPages:
      return QueryPagesHookConfigSchema.parse(data)
    case HookType.QueryPage:
      return QueryPageHookConfigSchema.parse(data)
    case HookType.Query:
      return QueryHookConfigSchema.parse(data)
    case HookType.GraphqlQuery:
    case HookType.GraphqlMutation:
      return GraphqlHookConfigSchema.parse(data)
    case HookType.RecoilState:
      return RecoilStateHookConfigSchema.parse(data)
  }

  throw new Error(`Can't parse hook data, hook type ${type} not recognized`)
}
