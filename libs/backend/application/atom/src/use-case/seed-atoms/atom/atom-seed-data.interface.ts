import type { IAtomType } from '@codelab/shared/abstract/core'

export interface AtomSeedData {
  /**
   * Which atoms are allowed to be used as children
   */
  allowedChildren?: Array<IAtomType>
  /**
   * File name of the CSV file containing the scraped API data for the Ant Design component
   */
  file: string | null

  /**
   * Name of the icon file
   */
  icon?: string | null
  /**
   * Name of the tag to assign
   */
  tag: string
}
