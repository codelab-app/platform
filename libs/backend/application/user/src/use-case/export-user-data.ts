import type { AppWhere } from '@codelab/backend/abstract/codegen'
import type { IUserDataExport } from '@codelab/backend/abstract/core'
import { exportApps, exportComponents } from '@codelab/backend/application/app'
import { exportResources } from '@codelab/backend/application/resource'
import { exportUserTypes } from '@codelab/backend/application/type'
import type { IAuth0Owner } from '@codelab/shared/abstract/core'

const nameComparator = (a: { name: string }, b: { name: string }) =>
  a.name.localeCompare(b.name)

const keyComparator = (a: { key: string }, b: { key: string }) =>
  a.key.localeCompare(b.key)

// sort data before export to provide consistent export each time
const sortExportData = (exportData: IUserDataExport) => {
  const { apps, components, resources } = exportData

  apps.sort(nameComparator)
  components.sort(nameComparator)
  resources.sort(nameComparator)
  apps.forEach(({ pages }) => pages.sort(nameComparator))
  components.forEach(({ api }) => api.fields.sort(keyComparator))

  return exportData
}

export const exportUserData = async (where: AppWhere, owner?: IAuth0Owner) => {
  const appsData = await exportApps(where)
  const typesData = await exportUserTypes(owner)
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
