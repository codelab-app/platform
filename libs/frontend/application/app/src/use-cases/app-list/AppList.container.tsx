'use client'

import { AppsConnector } from '../../views'
import { AppList } from './AppList'

export const AppListContainer = () => (
  <AppsConnector>{(apps) => <AppList apps={apps} />}</AppsConnector>
)

AppListContainer.displayName = 'AppListContainer'
