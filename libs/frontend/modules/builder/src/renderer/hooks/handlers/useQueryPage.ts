import { QueryPageHookConfigFragment } from '@codelab/frontend/modules/element'
import { useGetPageQuery } from '@codelab/frontend/modules/page'
import { HookHandler } from '../HookHandler'

export const useQueryPageHook: HookHandler = (
  config: QueryPageHookConfigFragment,
) => {
  const {
    data,
    error,
    called,
    loading,
    previousData,
    networkStatus,
    variables,
  } = useGetPageQuery({
    variables: {
      input: {
        pageId: config.pageId,
      },
    },
  })

  const res = {
    data,
    error,
    called,
    loading,
    previousData,
    networkStatus,
    variables,
  }

  return { res }
}
