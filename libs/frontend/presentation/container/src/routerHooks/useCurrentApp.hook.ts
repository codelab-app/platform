import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { getNameFromSlug } from '@codelab/shared/utils'
import { useMemo } from 'react'

export const useCurrentApp = () => {
  const { appDomainService } = useDomainStore()
  const { appSlug } = useUrl()
  const appName = getNameFromSlug(appSlug)

  return useMemo(() => {
    const app = appDomainService.appsList.find((item) => item.name === appName)

    return app
  }, [appName, appDomainService.appsList])
}
