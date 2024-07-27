import { useDomainStore } from '@codelab/frontend/infra/mobx'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { useMemo } from 'react'

export const useCurrentApp = () => {
  const { appDomainService } = useDomainStore()
  const { appSlug } = useUrl()

  return useMemo(() => {
    const app = appDomainService.appsList.find((item) => item.name === appSlug)

    // assertIsDefined(app)

    return app
  }, [appSlug, appDomainService.appsList])
}
