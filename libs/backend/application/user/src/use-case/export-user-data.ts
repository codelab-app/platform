import type { AppWhere } from '@codelab/backend/abstract/codegen'
import type { IUserDataExport } from '@codelab/backend/abstract/core'
import { exportApps, exportComponents } from '@codelab/backend/application/app'
import { exportResources } from '@codelab/backend/application/resource'
import { exportUserTypes } from '@codelab/backend/application/type'

export const exportUserData = async (where: AppWhere) => {
  const appsData = await exportApps(where)
  // TODO: Need to export only types used by app
  const typesData = await exportUserTypes()
  const resourcesData = await exportResources()
  const components = await exportComponents(where)

  const exportData: IUserDataExport = {
    apps: appsData,
    components,
    resources: resourcesData,
    ...typesData,
  }

  return exportData
}
