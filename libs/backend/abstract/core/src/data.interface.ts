import { IAppExport } from './app.interface'
import { IAtomExport } from './atom.interface'
import { IResourceExport } from './resource.interface'
import { ITagExport } from './tag.interface'
import { ITypeExport } from './type.interface'

export interface ExportedData {
  apps: Array<IAppExport>
  atoms: Array<IAtomExport>
  types: Array<ITypeExport>
  resources: Array<IResourceExport>
  tags: Array<ITagExport>
}

export interface ExportAppWhere {
  appIds?: Array<string>
}
