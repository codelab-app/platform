import { useStore } from '@codelab/frontend/application/shared/store'
import { getNameFromSlug } from '@codelab/shared/utils'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

export const useCurrentApp = () => {
  const { appService } = useStore()
  const { query } = useRouter()
  const appSlug = query.appSlug as string
  const appName = getNameFromSlug(appSlug)

  return useMemo(() => {
    const app = appService.appsList.find(({ name }) => name === appName)

    return app
  }, [appName, appService.appsList])
}
