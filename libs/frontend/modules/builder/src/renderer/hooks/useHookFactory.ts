import { IHook } from '@codelab/shared/abstract/core'
import { AtomType } from '@codelab/shared/codegen/graphql'
import { useGraphqlMutationHook } from './handlers/useGraphqlMutationHook'
import { useGraphqlQueryHook } from './handlers/useGraphqlQueryHook'
import { useQueryConfigHook } from './handlers/useQueryConfigHook'
import { useQueryLambdaHook } from './handlers/useQueryLambdaHook'
import { useQueryPageHook } from './handlers/useQueryPage'
import { useQueryPagesHook } from './handlers/useQueryPages'
import { useRecoilStateHook } from './handlers/useRecoilStateHook'
import { HookHandler } from './HookHandler'

export const useHookFactory = (
  hooks: Array<IHook>,
  inputProps?: Record<string, any>,
) => {
  return hooks.reduce<Record<string, any>>((queryProps, hook) => {
    const hookData = getHookData(hook, inputProps) ?? {}

    return Object.assign(queryProps, hookData)
  }, {})
}

const getHookData: HookHandler = (
  { config, type }: IHook,
  inputProps?: Record<string, any>,
) => {
  let handler: HookHandler

  switch (type) {
    case AtomType.HookQueryConfig:
      handler = useQueryConfigHook
      break
    case AtomType.HookQueryLambda:
      handler = useQueryLambdaHook
      break

    case AtomType.HookGraphqlQuery:
      handler = useGraphqlQueryHook
      break

    case AtomType.HookGraphqlMutation:
      handler = useGraphqlMutationHook
      break

    case AtomType.HookRecoilState:
      handler = useRecoilStateHook
      break

    case AtomType.HookQueryPage:
      handler = useQueryPageHook
      break

    case AtomType.HookQueryPages:
      handler = useQueryPagesHook
      break

    default:
      return undefined
  }

  const parsedHookConfig = JSON.parse(config.data)

  return handler(parsedHookConfig, inputProps)
}
