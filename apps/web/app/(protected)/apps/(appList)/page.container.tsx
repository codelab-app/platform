'use client'

import { useAppService } from '@codelab/frontend-application-app/services'
import { AppList } from '@codelab/frontend-application-app/use-cases/app-list'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

export const AppListContainer = observer(() => {
  const { appDomainService } = useDomainStore()
  const apps = appDomainService.appsList

  return <AppList apps={apps} />
})
