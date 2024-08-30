import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Validator } from '@codelab/shared/infra/schema'
import { useMemo } from 'react'

export const useCurrentApp = () => {
  const { appDomainService } = useDomainStore()
  const { appId } = useUrl()

  return useMemo(() => {
    const app = appDomainService.appsList.find(({ id }) => id === appId)

    Validator.assertsDefined(app)

    return app
  }, [appId, appDomainService.appsList])
}
