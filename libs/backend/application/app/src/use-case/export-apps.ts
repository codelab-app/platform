import type { IAppExport } from '@codelab/backend/abstract/core'
import { AppRepository, getApp } from '@codelab/backend/domain/app'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { removeDuplicates } from '../shared'

export const exportApps = async (where: OGM_TYPES.AppWhere) => {
  const appRepository = new AppRepository()
  const apps = await appRepository.find(where)

  return apps.reduce(async (appsData, app) => {
    const { app: appExport } = await getApp(app)

    return [...(await appsData), removeDuplicates(appExport)]
  }, Promise.resolve<Array<IAppExport>>([]))
}
