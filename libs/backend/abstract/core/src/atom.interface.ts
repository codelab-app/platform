import type {
  IAtomDTO,
  IInterfaceTypeDTO,
} from '@codelab/frontend/abstract/core'
import type { IAtomType } from '@codelab/shared/abstract/core'
import type { ITypesExport } from './type'

/**
 * This is the single file that we export. We'll read all the single files and aggregate them into `IAdminData`
 */
export type IAtomExport = ITypesExport & {
  api: IInterfaceTypeDTO
  atom: IAtomDTO
}

export type AtomSeedRecord = Partial<Record<IAtomType, AtomSeedData>>

export interface AtomSeedData {
  /**
   * File name of the CSV file containing the scraped API data for the Ant Design component
   */
  file: string | null

  /**
   * Name of the icon file
   */
  icon?: string | null
  /**
   * Which atoms are suggested to be used as children
   */
  suggestedChildren?: Array<IAtomType>
  /**
   * Name of the tag to assign
   */
  tag: string
}
