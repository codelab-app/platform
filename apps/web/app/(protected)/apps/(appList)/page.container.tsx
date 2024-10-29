'use client'

import { useAppService } from '@codelab/frontend-application-app/services'
import { AppList } from '@codelab/frontend-application-app/use-cases/app-list'
import { observer } from 'mobx-react-lite'

export const AppListContainer = observer(() => {
  const { getAllFromCache } = useAppService()
  const apps = getAllFromCache()

  return <AppList apps={apps} />
})
