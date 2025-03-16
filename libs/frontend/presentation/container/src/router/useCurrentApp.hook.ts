import { useUrlPathParams } from '@codelab/frontend-application-shared-store/router'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { useMemo } from 'react'

/**
 * Used in certain cases where data requirement is deeply nested
 */
export const useCurrentApp = () => {
  const { appDomainService } = useDomainStore()
  const { appId } = useUrlPathParams()

  return useMemo(() => {
    const app = appDomainService.apps.get(appId)

    if (!app) {
      throw new Error('App not found')
    }

    return app
  }, [appId, appDomainService.apps])
}
