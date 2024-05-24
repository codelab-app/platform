import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { getNameFromSlug } from '@codelab/shared/utils'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

export const useCurrentApp = () => {
  const { appService } = useStore()
  const { query } = useRouter()
  const appSlug = query.appSlug as string
  const appName = getNameFromSlug(appSlug)

  return useMemo(() => {
    const app = appService.appDomainService.appsList.find(
      (item) => item.name === appName,
    )

    return app
  }, [appName, appService.appDomainService.appsList])
}
