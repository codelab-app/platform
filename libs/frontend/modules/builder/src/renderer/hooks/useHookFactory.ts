/* eslint-disable react-hooks/rules-of-hooks */
import { HookFragment } from '@codelab/frontend/modules/element'
import { HookType } from '@codelab/shared/abstract/core'
import { useGraphqlQueryHook } from './handlers/useGraphqlQueryHook'
import { useQueryHook } from './handlers/useQueryHook'
import { QueryHookHandler } from './QueryHookHandler'

export const useHookFactory = (hooks: Array<HookFragment>) => {
  return hooks.reduce<Record<string, any>>((queryProps, hook) => {
    const hookData = getHookData(hook) ?? {}

    return Object.assign(queryProps, hookData)
  }, {})
}

const getHookData: QueryHookHandler = ({ config, type }: HookFragment) => {
  switch (type) {
    case HookType.Query: {
      return useQueryHook(config)
    }

    case HookType.GraphqlQuery: {
      return useGraphqlQueryHook(config)
    }
  }
}
