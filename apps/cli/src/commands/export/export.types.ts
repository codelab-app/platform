import {
  IAppExport,
  IAtomExport,
  IResourceExport,
  ITagExport,
  ITypeExport,
} from '@codelab/shared/abstract/core'

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
