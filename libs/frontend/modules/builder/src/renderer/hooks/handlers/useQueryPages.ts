import { QueryPagesHookConfigFragment } from '@codelab/frontend/modules/element'
import { useGetPagesQuery } from '@codelab/frontend/modules/page'
import { HookHandler } from '../HookHandler'

export const useQueryPagesHook: HookHandler = (
  config: QueryPagesHookConfigFragment,
) => {
  const output = useGetPagesQuery({
    input: {
      byApp: { appId: config.appId },
    },
  })

  return { res: output }
}
