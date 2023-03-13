import type { IAtomDTO } from '@codelab/frontend/abstract/core'
import type { IAppExport } from './app.interface'
import type { IResourceExport } from './resource.interface'
import type { ITag } from './tag.interface'
import type { IInterfaceTypeExport } from './type'
import type { ITypeExport } from './type/type.interface'

/**
 * This is the final complete data that is passed into our import function
 */
export interface ExportedAdminData {
  atoms: Array<IAtomDTO>
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
  atom: IAtomDTO
  api: IInterfaceTypeExport
  types: Array<ITypeExport>
}

export interface ExportAppWhere {
  appIds?: Array<string>
}
