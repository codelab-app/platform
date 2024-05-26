import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { getNameFromSlug } from '@codelab/shared/utils'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'

export const useCurrentApp = () => {
  const { appService } = useStore()
  const params = useParams()
  const appSlug = params.appSlug as string
  const appName = getNameFromSlug(appSlug)

  return useMemo(() => {
    const app = appService.appDomainService.appsList.find(
      (item) => item.name === appName,
    )

    return app
  }, [appName, appService.appDomainService.appsList])
}
