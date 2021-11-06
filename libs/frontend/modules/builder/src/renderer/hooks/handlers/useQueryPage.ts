import { QueryPageHookConfigFragment } from '@codelab/frontend/modules/element'
import { useGetPageQuery } from '@codelab/frontend/modules/page'
import { HookHandler } from '../HookHandler'

export const useQueryPageHook: HookHandler = (
  config: QueryPageHookConfigFragment,
) => {
  const output = useGetPageQuery({
    variables: {
      input: {
        pageId: config.pageId,
      },
    },
  })

  return { res: output }
}
