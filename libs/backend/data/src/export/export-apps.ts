import type { ExportAppWhere, IAppExport } from '@codelab/backend/abstract/core'
import { getApp } from '@codelab/backend/domain/app'
import {
  appSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'

export const exportApps = async ({ appIds }: ExportAppWhere) => {
  const App = await Repository.instance.App
  const where = appIds ? { id_IN: appIds } : {}

  const apps = await App.find({
    where,
    selectionSet: appSelectionSet,
  })

  return apps.reduce(async (appsData, app) => {
    const { app: appExport } = await getApp(app)

    return [...(await appsData), appExport]
  }, Promise.resolve<Array<IAppExport>>([]))
}
