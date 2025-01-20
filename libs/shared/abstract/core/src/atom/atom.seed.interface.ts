import type { FilterRecordKeys } from '@codelab/shared/abstract/types'

import type { IAtomType } from './atom-type.enum'

/**
 * This is the record we still extend
 *
 * We provide a prefix to get the subset of records
 */
export type IAtomRecords<
  Prefix extends string = 'AntDesign' | 'Html' | 'React',
> = FilterRecordKeys<Record<IAtomType, IAtomData>, Prefix>

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
export type IAntdAtomRecords = IAtomRecords<'AntDesign'>

export type IHtmlAtomRecords = IAtomRecords<'Html'>

export type IReactAtomRecords = IAtomRecords<'React'>
