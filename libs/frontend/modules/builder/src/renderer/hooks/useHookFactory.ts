/* eslint-disable react-hooks/rules-of-hooks */
import { HookFragment } from '@codelab/frontend/modules/element'
import { HookType } from '@codelab/shared/abstract/core'
import { useGraphqlMutationHook } from './handlers/useGraphqlMutationHook'
import { useGraphqlQueryHook } from './handlers/useGraphqlQueryHook'
import { useQueryHook } from './handlers/useQueryHook'
import { useQueryPageHook } from './handlers/useQueryPage'
import { useQueryPagesHook } from './handlers/useQueryPages'
import { useRecoilStateHook } from './handlers/useRecoilStateHook'
import { HookHandler } from './HookHandler'

export const useHookFactory = (
  hooks: Array<HookFragment>,
  inputProps?: Record<string, any>,
) => {
  return hooks.reduce<Record<string, any>>((queryProps, hook) => {
    const hookData = getHookData(hook, inputProps) ?? {}

    return Object.assign(queryProps, hookData)
  }, {})
}

const getHookData: HookHandler = (
  { config, type }: HookFragment,
  inputProps?: Record<string, any>,
) => {
  let handler: HookHandler

  switch (type) {
    case HookType.Query:
      handler = useQueryHook
      break

    case HookType.GraphqlQuery:
      handler = useGraphqlQueryHook
      break

    case HookType.GraphqlMutation:
      handler = useGraphqlMutationHook
      break

    case HookType.RecoilState:
      handler = useRecoilStateHook
      break

    case HookType.QueryPage:
      handler = useQueryPageHook
      break

    case HookType.QueryPages:
      handler = useQueryPagesHook
      break

    default:
      return undefined
  }

  return handler(config, inputProps)
}
