'use client'

import { observer } from 'mobx-react-lite'

import { AppsConnector } from '../../views/Apps.connector'
import { AppList } from './AppList'

export const AppListContainer = () => (
  <AppsConnector>{(apps) => <AppList apps={apps} />}</AppsConnector>
)

AppListContainer.displayName = 'AppListContainer'
