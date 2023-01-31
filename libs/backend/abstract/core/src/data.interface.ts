import type { IAppExport } from './app.interface'
import type { IAtomExport } from './atom.interface'
import type { IResourceExport } from './resource.interface'
import type { ITag } from './tag.interface'
import type { ITypeExport } from './type/type.interface'

export interface ExportedData {
  apps: Array<IAppExport>
  atoms: Array<IAtomExport>
  types: Array<ITypeExport>
  resources: Array<IResourceExport>
  tags: Array<ITag>
}

export interface ExportAppWhere {
  appIds?: Array<string>
}
