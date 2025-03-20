'use client'

import { AppsConnector } from '@codelab/frontend/infra/connector'

import { AppList } from './AppList'
import { AppListPreview } from './AppListPreview'

export const AppListContainer = () => (
  <AppsConnector>{(apps) => <AppList apps={apps} />}</AppsConnector>
)
AppListContainer.displayName = 'AppListContainer'
