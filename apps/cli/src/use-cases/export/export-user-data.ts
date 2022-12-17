import type {
  ExportAppWhere,
  ExportedData,
} from '@codelab/backend/abstract/core'
import { exportApps } from './export-apps'
import { exportResources } from './export-resources'
import { exportUserTypes } from './export-user-types'

export const exportUserData = async (where: ExportAppWhere) => {
  const appsData = await exportApps(where)
  // TODO: Need to export only types used by app
  const typesData = await exportUserTypes()
  const resourcesData = await exportResources()

  const exportData: Omit<ExportedData, 'atoms' | 'tags'> = {
    apps: appsData,
    types: typesData,
    resources: resourcesData,
  }

  return exportData
}
