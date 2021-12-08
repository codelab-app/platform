import { useGetPagesQuery } from '@codelab/frontend/modules/page'
import { IQueryPagesHookConfig } from '@codelab/shared/abstract/core'
import { HookHandler } from '../HookHandler'

export const useQueryPagesHook: HookHandler = (
  config: IQueryPagesHookConfig,
) => {
  const output = useGetPagesQuery({
    variables: {
      input: {
        byApp: { appId: config.appId },
      },
    },
  })

  return { queryPagesHook: output }
}
