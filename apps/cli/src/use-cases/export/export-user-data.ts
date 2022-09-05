import type { ExportedData } from '../../commands/export/export.command'
import { exportApps } from './export-apps'
import { exportResources } from './export-resources'
import { exportUserTypes } from './export-user-types'

export const exportUserData = async () => {
  const appsData = await exportApps()
  const typesData = await exportUserTypes()
  const resourcesData = await exportResources()

  const exportData: Omit<ExportedData, 'atoms' | 'tags'> = {
    apps: appsData,
    types: typesData,
    resources: resourcesData,
  }

  return exportData
}
