import { IHook } from '@codelab/shared/abstract/core'
import { AtomType } from '@codelab/shared/codegen/graphql'
import { attempt, get, isError, keys } from 'lodash'
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

type Props = Record<string, any>

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
  // TODO: implement useHookResponse
}

const withValues = (data: string, props: Props = {}): string => {
  return data.replace(HOOK_VARIABLE_REGEXP, (_: string, propKey: string) =>
    get(props, propKey),
  )
}

const getHookHandler = (type: IHook['type']): HookHandler => {
  if (!keys(hookHandlers).includes(type)) {
    throw new Error(`Handler not found for hook ${type}`)
  }

  return hookHandlers[type as keyof typeof hookHandlers]
}

const parseHookData = (data: string): Props => {
  const dataJson = attempt(JSON.parse, data)

  if (isError(dataJson)) {
    throw new Error(`Unable to parse hook data`)
  }

  return dataJson
}

const executeHook = (hook: IHook, props?: Props) => {
  const { type, config } = hook
  const handler = getHookHandler(type)

  return handler(parseHookData(config.data), props)
}
