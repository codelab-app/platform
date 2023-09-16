import { AppProperties } from '@codelab/shared/domain/mapper'
import { getNameFromSlug } from '@codelab/shared/utils'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useStore } from '../providers'

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
