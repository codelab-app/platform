import { useGetPageQuery } from '@codelab/frontend/modules/page'
import { IQueryPageHookConfig } from '@codelab/shared/abstract/core'
import { HookHandler } from '../HookHandler'

export const useQueryPageHook: HookHandler = (config: IQueryPageHookConfig) => {
  const output = useGetPageQuery({
    variables: {
      input: {
        pageId: config.pageId,
      },
    },
  })

  return { res: output }
}
