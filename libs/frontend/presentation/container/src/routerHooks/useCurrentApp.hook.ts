import type { IAppDomainService } from '@codelab/frontend/abstract/domain'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { assertIsDefined } from '@codelab/shared/utils'
import { useMemo } from 'react'

export const useCurrentApp = (appDomainService: IAppDomainService) => {
  const { appSlug } = useUrl()

  return useMemo(() => {
    const app = appDomainService.appsList.find((item) => item.name === appSlug)

    assertIsDefined(app)

    return app
  }, [appDomainService.appsList])
}
