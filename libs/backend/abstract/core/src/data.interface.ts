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
  apis: Array<IInterfaceTypeExport>
  atoms: Array<IAtomDTO>
  // resources: Array<IResourceExport>
  tags: Array<ITag>
  // Import api separately
  types: Array<ITypeExport>
}

export interface ExportedUserData {
  apps: Array<IAppExport>
  resources: Array<IResourceExport>
  types: Array<ITypeExport>
}

/**
 * This is the single file that we export. We'll read all the single files and aggregate them into `IAdminData`
 */
export interface ExportedAtom {
  api: IInterfaceTypeExport
  atom: IAtomDTO
  types: Array<ITypeExport>
}

export interface ExportAppWhere {
  appIds?: Array<string>
}
