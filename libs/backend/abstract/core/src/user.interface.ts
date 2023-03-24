import type { IAppExport } from './app.interface'
import type { IResourceExport } from './resource.interface'
import type { ITypesExport } from './type'

export type IUserDataExport = ITypesExport & {
  apps: Array<IAppExport>
  resources: Array<IResourceExport>
}
