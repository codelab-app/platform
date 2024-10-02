'use client'

import type { IAppModel } from '@codelab/frontend/abstract/domain'

import { useAppService } from '@codelab/frontend-application-app/services'
import { AppList } from '@codelab/frontend-application-app/use-cases/app-list'

export const AppListContainer = () => {
  const apps = useAppService().getAllFromCache()

  return <AppList apps={apps} />
}
