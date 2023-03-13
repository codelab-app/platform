import type { IAppExport } from './app.interface'
import type { IAtomExport } from './atom.interface'
import type { IResourceExport } from './resource.interface'
import type { ITag } from './tag.interface'
import type { IInterfaceTypeExport } from './type'
import type { ITypeExport } from './type/type.interface'

/**
 * This is the final complete data that is passed into our import function
 */
export interface ExportedAdminData {
  atoms: Array<IAtomExport>
  // Import api separately
  types: Array<ITypeExport>
  apis: Array<IInterfaceTypeExport>
  // resources: Array<IResourceExport>
  tags: Array<ITag>
}

export interface ExportedUserData {
  apps: Array<IAppExport>
  types: Array<ITypeExport>
  resources: Array<IResourceExport>
}

/**
 * This is the single file that we export. We'll read all the single files and aggregate them into `IAdminData`
 */
export interface ExportedAtom {
  atom: IAtomExport
  api: IInterfaceTypeExport
  types: Array<ITypeExport>
}

export interface ExportAppWhere {
  appIds?: Array<string>
}
