import { IHook } from '@codelab/shared/abstract/core'
import { AtomType } from '@codelab/shared/codegen/graphql'
import { useSelector } from 'react-redux'
import { builderSelectors } from '../../store'
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

export const useHookFactory = (
  elementId: string,
  hooks: Array<IHook>,
  inputProps?: Record<string, any>,
) => {
  const lastRenderedPropsForElement =
    useSelector((state) =>
      builderSelectors.lastRenderedPropsForElement(state, elementId),
    ) || {}

  return hooks.reduce<Record<string, any>>((queryProps, hook) => {
    const { config } = hook
    const { data } = config

    const dataWithValues = data.replace(
      /^${..*}$/,
      (string: string, propKey: string) => {
        return lastRenderedPropsForElement[propKey]
      },
    )

    const newHook = {
      ...hook,
      config: {
        ...config,
        data: dataWithValues,
      },
    }

    const hookData = getHookData(newHook, inputProps) ?? {}

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

    case AtomType.HookRouter:
      handler = useRouterHook
      break

    default:
      return undefined
  }

  const parsedHookConfig = JSON.parse(config.data)

  return handler(parsedHookConfig, inputProps)
}
