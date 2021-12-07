import { IQueryPageHookConfig } from '@codelab/shared/abstract/core'
import { useRouter } from 'next/router'
import { HookHandler } from '../HookHandler'

export const useRouterHook: HookHandler = (config: IQueryPageHookConfig) => {
  const output = useRouter()

  return { res: output }
}
