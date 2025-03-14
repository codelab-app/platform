'use client'

import { AppList } from '@codelab/frontend-application-app/use-cases/app-list'
import { AppsConnector } from '@codelab/frontend-application-app/views'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

export const AppListContainer = () => (
  <AppsConnector>{(apps) => <AppList apps={apps} />}</AppsConnector>
)
