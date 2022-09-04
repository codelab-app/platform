import { AppOGM, appSelectionSet } from '@codelab/backend/adapter/neo4j'
import { IAppExport } from '@codelab/shared/abstract/core'
import { getApp } from '../../repository/app.repo'

export interface ExportAppData {
  app: IAppExport
}

export const exportApps = async () => {
  const App = await AppOGM()

  const apps = await App.find({
    selectionSet: appSelectionSet,
  })

  return apps.reduce(async (appsData, app) => {
    const { app: appExport } = await getApp(app)

    return [...(await appsData), appExport]
  }, Promise.resolve<Array<IAppExport>>([]))
}
