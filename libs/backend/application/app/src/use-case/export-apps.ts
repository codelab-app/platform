import type { AppWhere } from '@codelab/backend/abstract/codegen'
import type { IAppExport } from '@codelab/backend/abstract/core'
import { AppRepository, getApp } from '@codelab/backend/domain/app'

export const exportApps = async (where: AppWhere) => {
  const appRepository = new AppRepository()
  const apps = await appRepository.find(where)

  return apps.reduce(async (appsData, app) => {
    const { app: appExport } = await getApp(app)

    return [...(await appsData), appExport]
  }, Promise.resolve<Array<IAppExport>>([]))
}
