import type { IAppExport } from './app.interface'
import type { IComponentExport } from './component.interface'
import type { IResourceExport } from './resource.interface'
import type { ITypesExport } from './type.interface'

export type IUserDataExport = ITypesExport & {
  apps: Array<IAppExport>
  resources: Array<IResourceExport>
  components: Array<IComponentExport>
}
