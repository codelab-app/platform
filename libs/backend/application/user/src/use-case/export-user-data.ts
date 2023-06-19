import type { AppWhere } from '@codelab/backend/abstract/codegen'
import type { IUserDataExport } from '@codelab/backend/abstract/core'
import { exportApps, exportComponents } from '@codelab/backend/application/app'
import { exportResources } from '@codelab/backend/application/resource'
import { exportUserTypes } from '@codelab/backend/application/type'

const nameComparator = (a: { name: string }, b: { name: string }) =>
  a.name.localeCompare(b.name)

// sort data before export to provide consistent export each time
const sortExportData = (exportData: IUserDataExport) => {
  const { apps, components, resources } = exportData

  apps.sort(nameComparator)
  components.sort(nameComparator)
  resources.sort(nameComparator)
  apps.forEach(({ pages }) => pages.sort(nameComparator))

  return exportData
}

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

  return sortExportData(exportData)
}
