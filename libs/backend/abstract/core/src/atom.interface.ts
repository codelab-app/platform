import type {
  IAtomDTO,
  IInterfaceTypeDTO,
} from '@codelab/frontend/abstract/core'
import type { ITypesExport } from './type'

/**
 * This is the single file that we export. We'll read all the single files and aggregate them into `IAdminData`
 */
export type IAtomExport = ITypesExport & {
  api: IInterfaceTypeDTO
  atom: IAtomDTO
}
