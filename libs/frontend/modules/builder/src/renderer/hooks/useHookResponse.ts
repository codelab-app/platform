import { IHook, PropData } from '@codelab/shared/abstract/core'
import { AtomType } from '@codelab/shared/codegen/graphql'
import { attempt, get, isError, keys, merge } from 'lodash'
import {
  useGraphqlMutationHook,
  useGraphqlQueryHook,
  useQueryConfigHook,
  useQueryLambdaHook,
  useQueryPageHook,
  useQueryPagesHook,
  useRouterHook,
} from './handlers'
import { useRecoilStateHook } from './handlers/useRecoilStateHook'
import { HookHandler } from './HookHandler'

const HOOK_VARIABLE_REGEXP = /\$\{([^}]*)\}/

const hookHandlers = {
  [AtomType.HookQueryConfig]: useQueryConfigHook,
  [AtomType.HookQueryLambda]: useQueryLambdaHook,
  [AtomType.HookGraphqlQuery]: useGraphqlQueryHook,
  [AtomType.HookGraphqlMutation]: useGraphqlMutationHook,
  [AtomType.HookRecoilState]: useRecoilStateHook,
  [AtomType.HookQueryPage]: useQueryPageHook,
  [AtomType.HookQueryPages]: useQueryPagesHook,
  [AtomType.HookRouter]: useRouterHook,
}

export const useHookResponse = () => {
  const getHooksResponse = (hooks: Array<IHook>, props: PropData) => {
    return hooks.reduce((responses, hook: IHook): PropData => {
      const mergedProps = merge(responses, props)
      const hookConfig = getHookConfig(hook, mergedProps)
      const hookResponse = executeHook(hookConfig, mergedProps)

      return merge(responses, hookResponse)
    }, {})
  }

  return { getHooksResponse }
}

const getHookConfig = (hook: IHook, props: PropData): IHook => {
  return merge(hook, {
    config: {
      data: withValues(hook.config.data, props),
    },
  })
}

const withValues = (data: string, props: PropData = {}): string => {
  return data.replace(HOOK_VARIABLE_REGEXP, (_: string, propKey: string) =>
    get(props, propKey, `Prop ${propKey} not found`),
  )
}

const getHookHandler = (type: IHook['type']): HookHandler => {
  if (!keys(hookHandlers).includes(type)) {
    throw new Error(`Handler not found for hook ${type}`)
  }

  return hookHandlers[type as keyof typeof hookHandlers]
}

const parseHookData = (data: string): PropData => {
  const dataJson = attempt(JSON.parse, data)

  if (isError(dataJson)) {
    throw new Error(`Unable to parse hook data`)
  }

  return dataJson
}

const executeHook = (hook: IHook, props?: PropData) => {
  const { type, config } = hook
  const handler = getHookHandler(type)

  return handler(parseHookData(config.data), props)
}
