import type { AppWhere } from '@codelab/backend/abstract/codegen'
import type { IAppExport } from '@codelab/backend/abstract/core'
import { AppRepository, getAppPages } from '@codelab/backend/domain/app'

export const exportApps = async (where: AppWhere) => {
  const appRepository = new AppRepository()
  const apps = await appRepository.find(where)

  return apps.reduce(async (appsData, app) => {
    const pagesData = await getAppPages(app)
    const appExport = { ...app, pages: pagesData }

    return [...(await appsData), appExport]
  }, Promise.resolve<Array<IAppExport>>([]))
}
