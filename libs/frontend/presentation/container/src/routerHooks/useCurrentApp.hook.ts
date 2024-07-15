import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { assertIsDefined, getNameFromSlug } from '@codelab/shared/utils'
import { useMemo } from 'react'

export const useCurrentApp = () => {
  const { appService } = useStore()
  const { appSlug } = useUrl()
  const appName = getNameFromSlug(appSlug)

  return useMemo(() => {
    const app = appService.appDomainService.appsList.find(
      (item) => item.name === appName,
    )

    assertIsDefined(app)

    return app
  }, [appName, appService.appDomainService.appsList])
}
