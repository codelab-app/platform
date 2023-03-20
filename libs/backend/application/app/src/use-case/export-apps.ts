import type { IAppExport } from '@codelab/backend/abstract/core'
import { getApp } from '@codelab/backend/domain/app'
import {
  appSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'

export const exportApps = async (where: OGM_TYPES.AppWhere) => {
  const App = await Repository.instance.App

  const apps = await App.find({
    selectionSet: appSelectionSet,
    where,
  })

  return apps.reduce(async (appsData, app) => {
    const { app: appExport } = await getApp(app)

    return [...(await appsData), appExport]
  }, Promise.resolve<Array<IAppExport>>([]))
}
