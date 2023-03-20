import type { IUserDataExport } from '@codelab/backend/abstract/core'
import { exportApps } from '@codelab/backend/application/app'
import { exportResources } from '@codelab/backend/application/resource'
import { exportUserTypes } from '@codelab/backend/application/type'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'

export const exportUserData = async (where: OGM_TYPES.AppWhere) => {
  const appsData = await exportApps(where)
  // TODO: Need to export only types used by app
  const typesData = await exportUserTypes()
  const resourcesData = await exportResources()

  const exportData: IUserDataExport = {
    apps: appsData,
    resources: resourcesData,
    ...typesData,
  }

  return exportData
}
