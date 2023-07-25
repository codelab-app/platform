import type { IAtomBaseRecords, IAtomType } from '@codelab/shared/abstract/core'

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
