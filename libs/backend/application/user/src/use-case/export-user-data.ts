import type {
  ExportAppWhere,
  ExportedUserData,
} from '@codelab/backend/abstract/core'
import { exportApps } from '@codelab/backend/application/app'
import { exportResources } from '@codelab/backend/application/resource'
import { exportUserTypes } from '@codelab/backend/application/type'

export const exportUserData = async (where: ExportAppWhere) => {
  const appsData = await exportApps(where)
  // TODO: Need to export only types used by app
  const typesData = await exportUserTypes()
  const resourcesData = await exportResources()

  const exportData: ExportedUserData = {
    apps: appsData,
    resources: resourcesData,
    types: typesData,
  }

  return exportData
}
