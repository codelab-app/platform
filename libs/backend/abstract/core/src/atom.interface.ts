import type {
  IAtomDTO,
  IInterfaceTypeDTO,
} from '@codelab/frontend/abstract/core'
import type { ITypeExport } from './type'

/**
 * This is the single file that we export. We'll read all the single files and aggregate them into `IAdminData`
 */
export type IAtomExport = ITypeExport & {
  api: IInterfaceTypeDTO
  atom: IAtomDTO
}
