'use client'

import { AppList } from '@codelab/frontend-application-app/use-cases/app-list'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

export const AppListConnector = observer(() => {
  const { appDomainService } = useDomainStore()
  const apps = appDomainService.appsList

  return <AppList apps={apps} />
})
