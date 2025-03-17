import { useValidatedUrlParams } from '@codelab/frontend-application-shared-store/router'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { useMemo } from 'react'

/**
 * Used in certain cases where data requirement is deeply nested
 */
export const useCurrentApp = () => {
  const { appDomainService } = useDomainStore()
  const { appId } = useValidatedUrlParams()

  return useMemo(() => {
    const app = appDomainService.apps.get(appId)

    if (!app) {
      throw new Error('App not found')
    }

    return app
  }, [appId, appDomainService.apps])
}
