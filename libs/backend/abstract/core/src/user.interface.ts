import type { IAppExport } from './app.interface'
import type { IResourceExport } from './resource.interface'
import type { ITypeExport } from './type'

export type IUserDataExport = ITypeExport & {
  apps: Array<IAppExport>
  resources: Array<IResourceExport>
}
