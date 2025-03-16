'use client'

import { AppsConnector } from '@codelab/frontend-domain-app/store'

import { AppList } from './AppList'

export const AppListContainer = () => (
  <AppsConnector>{(apps) => <AppList apps={apps} />}</AppsConnector>
)

AppListContainer.displayName = 'AppListContainer'
