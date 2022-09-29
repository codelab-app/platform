import { IResourceExport } from '../domain/resource'
import { ITypeExport } from '../domain/type'
import { IAppExport } from './app.interface'
import { IAtomExport } from './atom.interface'
import { ITagExport } from './tag.interface'

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
