import { QueryPagesHookConfigFragment } from '@codelab/frontend/modules/element'
import { useGetPagesQuery } from '@codelab/frontend/modules/page'
import { HookHandler } from '../HookHandler'

export const useQueryPagesHook: HookHandler = (
  config: QueryPagesHookConfigFragment,
) => {
  const {
    data,
    error,
    called,
    loading,
    previousData,
    networkStatus,
    variables,
  } = useGetPagesQuery({
    variables: {
      input: {
        byApp: { appId: config.appId },
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
