import type {
  IAtomDTO,
  IInterfaceTypeDTO,
} from '@codelab/frontend/abstract/core'
import type { IAtomBaseRecords } from '@codelab/shared/abstract/core'
import type { IAtomType } from '@codelab/shared/abstract/core'
import { ObjectTyped } from 'object-typed'
import type { ITypesExport } from './type'

/**
 * This is the single file that we export. We'll read all the single files and aggregate them into `IAdminData`
 */
export type IAtomExport = ITypesExport & {
  api: IInterfaceTypeDTO
  atom: IAtomDTO
}

export type IAtomRecords = IAtomBaseRecords<IAtomData>

export type IAntdAtomRecords = IAtomBaseRecords<IAtomData, 'AntDesign'>

export type IHtmlAtomRecords = IAtomBaseRecords<IAtomData, 'Html'>

export type IReactAtomRecords = IAtomBaseRecords<IAtomData, 'React'>

export interface IAtomData {
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
