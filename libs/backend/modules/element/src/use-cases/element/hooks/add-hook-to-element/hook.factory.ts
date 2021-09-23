import { Hook } from '@codelab/backend/modules/hook'
import { HookType } from '@codelab/shared/abstract/core'
import { AddHookToElementInput } from './add-hook-to-element.input'

export const hookFactory = ({
  queryHook,
  graphqlQueryHook,
  recoilStateHook,
  queryPageHook,
  queryPagesHook,
  graphqlMutationHook,
}: AddHookToElementInput) => {
  if (queryHook) {
    return new Hook({ type: HookType.Query, config: queryHook })
  }

  if (graphqlQueryHook) {
    return new Hook({ type: HookType.GraphqlQuery, config: graphqlQueryHook })
  }

  if (graphqlMutationHook) {
    return new Hook({
      type: HookType.GraphqlMutation,
      config: graphqlMutationHook,
    })
  }

  if (recoilStateHook) {
    return new Hook({ type: HookType.RecoilState, config: recoilStateHook })
  }

  if (queryPageHook) {
    return new Hook({ type: HookType.QueryPage, config: queryPageHook })
  }

  if (queryPagesHook) {
    return new Hook({ type: HookType.QueryPages, config: queryPagesHook })
  }

  throw new Error('Invalid AddHookToElementInput')
}
